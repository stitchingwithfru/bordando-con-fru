import {
  argumentValue,
  assertGate,
  assertRollbackCandidate,
  readSnapshotById,
  reportSummary,
  SHA256_PATTERN,
  UUID_PATTERN,
  verifyOperationalState,
} from "./operational-guards.mjs";
import { createWebsiteDataPublisher, SupabaseSnapshotRepository } from "./publisher.mjs";
import {
  createSupabaseAdminClientFromEnvironment,
  createSupabaseAnonClientFromEnvironment,
} from "./supabase-node-clients.mjs";
import { analyzeWebsiteData } from "./website-data.mjs";

const CONFIRMATION_FLAG = "--confirm-rollback-approved-snapshot";
const snapshotId = argumentValue("--snapshot-id");
const expectedActiveSnapshotId = argumentValue("--expected-active-snapshot-id");
const expectedChecksum = argumentValue("--expected-checksum");

assertGate(snapshotId !== null, "Falta --snapshot-id <uuid>.");
assertGate(UUID_PATTERN.test(snapshotId), "--snapshot-id no es un UUID válido.");
assertGate(expectedActiveSnapshotId !== null, "Falta --expected-active-snapshot-id <uuid>.");
assertGate(UUID_PATTERN.test(expectedActiveSnapshotId), "--expected-active-snapshot-id no es un UUID válido.");
assertGate(expectedChecksum !== null, "Falta --expected-checksum <sha256>.");
assertGate(SHA256_PATTERN.test(expectedChecksum), "--expected-checksum no es un SHA-256 válido.");
assertGate(
  process.argv.includes(CONFIRMATION_FLAG),
  `Falta la confirmación explícita ${CONFIRMATION_FLAG}.`,
);

const admin = createSupabaseAdminClientFromEnvironment();
const anon = createSupabaseAnonClientFromEnvironment();
const before = await verifyOperationalState({ admin, anon });
const target = await readSnapshotById(admin, snapshotId);

assertRollbackCandidate({
  active: before.active,
  target,
  expectedActiveSnapshotId,
  expectedChecksum,
});

const targetAnalysis = analyzeWebsiteData(target.payload);
assertGate(targetAnalysis.report.result === "PASS", "El payload destino no supera el contrato WebsiteData.");
assertGate(targetAnalysis.report.checksum === expectedChecksum, "El payload destino no coincide con el checksum esperado.");

const repository = new SupabaseSnapshotRepository(admin);
const publisher = createWebsiteDataPublisher({ repository });
const rollback = await publisher.rollback(snapshotId, expectedActiveSnapshotId, expectedChecksum, {
  dryRun: false,
  allowRemoteWrites: true,
});

assertGate(rollback.outcome === "rolled-back", "El rollback no terminó correctamente.");
assertGate(rollback.snapshot?.id === snapshotId, "La RPC devolvió un snapshot diferente.");
const after = await verifyOperationalState({ admin, anon });
assertGate(after.active.id === snapshotId, "El destino del rollback no quedó como único active.");
assertGate(after.publicAnalysis.report.checksum === expectedChecksum, "Anon no sirve el snapshot restaurado.");

console.log(JSON.stringify({
  operation: "website-data-rollback",
  result: "PASS",
  transition: {
    previousActiveId: before.active.id,
    restoredActiveId: after.active.id,
  },
  active: {
    id: after.active.id,
    version: after.active.version,
    source: after.active.source,
    checksum: after.active.source_checksum,
    activatedAt: after.active.activated_at,
  },
  contract: reportSummary(after.analysis),
  publicAnonVerified: true,
}, null, 2));
