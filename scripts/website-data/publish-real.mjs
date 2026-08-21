import { extractWebsiteDataFromAppsScript } from "./apps-script-extractor.mjs";
import {
  assertGate,
  assertKnownWarnings,
  readSnapshotById,
  reportSummary,
  verifyOperationalState,
  WEBSITE_DATA_SOURCE,
} from "./operational-guards.mjs";
import { createWebsiteDataPublisher, SupabaseSnapshotRepository } from "./publisher.mjs";
import {
  createSupabaseAdminClientFromEnvironment,
  createSupabaseAnonClientFromEnvironment,
} from "./supabase-node-clients.mjs";
import { analyzeWebsiteData } from "./website-data.mjs";

const firstCapture = await extractWebsiteDataFromAppsScript();
const secondCapture = await extractWebsiteDataFromAppsScript();
const capturedAt = new Date().toISOString();
const firstAnalysis = analyzeWebsiteData(firstCapture);
const secondAnalysis = analyzeWebsiteData(secondCapture);

assertGate(firstAnalysis.report.result === "PASS", "La primera captura no supera el contrato WebsiteData.");
assertGate(secondAnalysis.report.result === "PASS", "La segunda captura no supera el contrato WebsiteData.");
assertKnownWarnings(firstAnalysis);
assertKnownWarnings(secondAnalysis);
assertGate(
  firstAnalysis.report.checksum === secondAnalysis.report.checksum,
  "Las dos capturas consecutivas tienen checksums diferentes.",
);

const admin = createSupabaseAdminClientFromEnvironment();
const anon = createSupabaseAnonClientFromEnvironment();
const before = await verifyOperationalState({ admin, anon });
const repository = new SupabaseSnapshotRepository(admin);
const publisher = createWebsiteDataPublisher({ repository });
const prepared = await publisher.prepare(secondCapture, {
  source: WEBSITE_DATA_SOURCE,
  capturedAt,
  dryRun: false,
  allowRemoteWrites: true,
});

assertGate(
  prepared.operation !== "historical-snapshot-requires-rollback",
  `El contenido ya existe como superseded (${prepared.snapshot?.id}); usa website-data:rollback.`,
);
assertGate(prepared.outcome === "prepared", "La publicación no terminó como prepared.");

const stored = await readSnapshotById(admin, prepared.snapshot.id);
assertGate(stored !== null, "El snapshot preparado no se puede releer.");
assertGate(["validated", "active"].includes(stored.status), `Estado inesperado tras publish: ${stored.status}.`);
const storedAnalysis = analyzeWebsiteData(stored.payload);
assertGate(storedAnalysis.report.result === "PASS", "El payload almacenado no supera el contrato.");
assertGate(
  storedAnalysis.report.checksum === secondAnalysis.report.checksum,
  "El checksum del payload almacenado no coincide con la captura.",
);
assertGate(
  stored.source_checksum === secondAnalysis.report.checksum,
  "source_checksum no coincide con la captura.",
);

const after = await verifyOperationalState({ admin, anon });
assertGate(
  after.active.id === before.active.id,
  "El activo cambió durante publish; el candidato permanece sin activar y requiere revisión.",
);

console.log(JSON.stringify({
  operation: "website-data-publish-without-activation",
  result: "PASS",
  capturesMatch: true,
  source: WEBSITE_DATA_SOURCE,
  candidate: {
    id: stored.id,
    version: stored.version,
    status: stored.status,
    checksum: stored.source_checksum,
    capturedAt: stored.captured_at,
    validatedAt: stored.validated_at,
    operation: prepared.operation,
  },
  contract: reportSummary(storedAnalysis),
  activeUnchanged: {
    id: after.active.id,
    version: after.active.version,
    checksum: after.active.source_checksum,
  },
  activationRequired: stored.status === "validated",
  activationCommand: stored.status === "validated"
    ? `npm run website-data:activate -- --snapshot-id ${stored.id} --expected-checksum ${stored.source_checksum} --confirm-activate-approved-snapshot`
    : null,
}, null, 2));
