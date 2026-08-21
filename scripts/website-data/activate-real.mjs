import {
  argumentValue,
  assertGate,
  assertValidValidationReport,
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

const CONFIRMATION_FLAG = "--confirm-activate-approved-snapshot";
const snapshotId = argumentValue("--snapshot-id");
const expectedChecksum = argumentValue("--expected-checksum");

assertGate(snapshotId !== null, "Falta --snapshot-id <uuid>.");
assertGate(UUID_PATTERN.test(snapshotId), "--snapshot-id no es un UUID válido.");
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

assertGate(target !== null, `No existe el snapshot ${snapshotId}.`);
assertGate(target.status === "validated", `El snapshot ${snapshotId} no está validated.`);
assertGate(target.source_checksum === expectedChecksum, "El checksum almacenado no coincide con --expected-checksum.");
assertValidValidationReport(target);
const targetAnalysis = analyzeWebsiteData(target.payload);
assertGate(targetAnalysis.report.result === "PASS", "El payload candidato no supera el contrato.");
assertGate(targetAnalysis.report.checksum === expectedChecksum, "El payload candidato no coincide con el checksum esperado.");

const repository = new SupabaseSnapshotRepository(admin);
const publisher = createWebsiteDataPublisher({ repository });
const activation = await publisher.activate(snapshotId, {
  dryRun: false,
  allowRemoteWrites: true,
});

assertGate(activation.outcome === "activated", "La activación no terminó correctamente.");
assertGate(activation.snapshot?.id === snapshotId, "La RPC devolvió un snapshot diferente.");
const after = await verifyOperationalState({ admin, anon });
assertGate(after.active.id === snapshotId, "El snapshot solicitado no quedó como único active.");
assertGate(after.publicAnalysis.report.checksum === expectedChecksum, "Anon no sirve el snapshot recién activado.");

console.log(JSON.stringify({
  operation: "website-data-activate",
  result: "PASS",
  transition: {
    previousActiveId: before.active.id,
    newActiveId: after.active.id,
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
