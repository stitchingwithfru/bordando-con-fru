import { readFile } from "node:fs/promises";
import { extractWebsiteDataFromAppsScript } from "./apps-script-extractor.mjs";
import { createWebsiteDataPublisher, SupabaseSnapshotRepository } from "./publisher.mjs";
import {
  createSupabaseAdminClientFromEnvironment,
  createSupabaseAnonClientFromEnvironment,
} from "./supabase-node-clients.mjs";
import { analyzeWebsiteData } from "./website-data.mjs";

const WRITE_FLAG = "--write-validated-snapshot";
const SOURCE = "apps_script:website-data";
const EXPECTED_WARNING = "KNOWN_ORPHAN_SAL_DESIGN";
const writeAuthorized = process.argv.includes(WRITE_FLAG);

function reportSummary(analysis) {
  return {
    validation: analysis.report.result,
    checksum: analysis.report.checksum,
    counts: analysis.report.counts,
    warnings: analysis.report.warnings.map(({ code, path }) => ({ code, path })),
    errors: analysis.report.errors.map(({ code, path }) => ({ code, path })),
  };
}

function statusCounts(rows) {
  return {
    total: rows.length,
    pending: rows.filter(({ status }) => status === "pending").length,
    validated: rows.filter(({ status }) => status === "validated").length,
    active: rows.filter(({ status }) => status === "active").length,
    superseded: rows.filter(({ status }) => status === "superseded").length,
  };
}

function assertGate(condition, message) {
  if (!condition) throw new Error(message);
}

async function readSnapshotRows(admin, columns) {
  const { data, error } = await admin
    .from("website_data_snapshots")
    .select(columns)
    .order("version", { ascending: true });
  if (error) throw error;
  return data;
}

const backup = JSON.parse(await readFile("website-data-backup.json", "utf8"));
const live1 = await extractWebsiteDataFromAppsScript();
const live2 = await extractWebsiteDataFromAppsScript();
const capturedAt = new Date().toISOString();

const backupAnalysis = analyzeWebsiteData(backup);
const live1Analysis = analyzeWebsiteData(live1);
const live2Analysis = analyzeWebsiteData(live2);

const checks = {
  backup: reportSummary(backupAnalysis),
  reading1: reportSummary(live1Analysis),
  reading2: reportSummary(live2Analysis),
  liveChecksumsMatch: live1Analysis.report.checksum === live2Analysis.report.checksum,
  liveMatchesBackup: live1Analysis.report.checksum === backupAnalysis.report.checksum
    && live2Analysis.report.checksum === backupAnalysis.report.checksum,
};

assertGate(backupAnalysis.report.result === "PASS", "El backup no supera la validación.");
assertGate(live1Analysis.report.result === "PASS", "La primera lectura live no supera la validación.");
assertGate(live2Analysis.report.result === "PASS", "La segunda lectura live no supera la validación.");
assertGate(checks.liveChecksumsMatch, "Las dos lecturas live tienen checksums diferentes.");
assertGate(checks.liveMatchesBackup, "El contenido live no coincide con el backup aprobado.");
assertGate(
  live2Analysis.report.warnings.every(({ code }) => code === EXPECTED_WARNING),
  "La lectura live contiene warnings nuevos no aprobados.",
);

if (!writeAuthorized) {
  console.log(JSON.stringify({
    mode: "check-only",
    checks,
    plannedOperation: `run again with ${WRITE_FLAG} to create one validated snapshot`,
    supabaseWrites: 0,
  }, null, 2));
  process.exit(0);
}

const admin = createSupabaseAdminClientFromEnvironment();
const anon = createSupabaseAnonClientFromEnvironment();
const beforeRows = await readSnapshotRows(admin, "id, version, status, source, source_checksum");
const before = statusCounts(beforeRows);

assertGate(before.total === 0, `El estado previo no está vacío: total=${before.total}.`);
assertGate(before.active === 0, `El estado previo contiene ${before.active} snapshots active.`);
assertGate(before.validated === 0, `El estado previo contiene ${before.validated} snapshots validated.`);

const repository = new SupabaseSnapshotRepository(admin);
const publisher = createWebsiteDataPublisher({ repository });

const firstPrepare = await publisher.prepare(live2, {
  source: SOURCE,
  capturedAt,
  dryRun: false,
  allowRemoteWrites: true,
});

assertGate(firstPrepare.outcome === "prepared", "El primer prepare no terminó como prepared.");
assertGate(firstPrepare.snapshot?.status === "validated", "El primer snapshot no quedó validated.");

const afterFirstRows = await readSnapshotRows(
  admin,
  "id, version, payload, source, source_checksum, status, captured_at, created_at, validated_at, activated_at, validation_report",
);
const afterFirst = statusCounts(afterFirstRows);
const stored = afterFirstRows[0];
const storedPayloadAnalysis = analyzeWebsiteData(stored?.payload);

assertGate(afterFirst.total === 1, `Tras el primer prepare hay ${afterFirst.total} snapshots.`);
assertGate(afterFirst.pending === 0, "El snapshot quedó pending.");
assertGate(afterFirst.validated === 1, "No existe exactamente un snapshot validated.");
assertGate(afterFirst.active === 0, "Apareció un snapshot active.");
assertGate(afterFirst.superseded === 0, "Apareció un snapshot superseded.");
assertGate(stored?.source === SOURCE, "El source almacenado no es el esperado.");
assertGate(stored?.source_checksum === live2Analysis.report.checksum, "El checksum almacenado no coincide con live.");
assertGate(storedPayloadAnalysis.report.checksum === live2Analysis.report.checksum, "El payload almacenado no coincide con live.");
assertGate(stored?.validated_at !== null, "validated_at es null.");
assertGate(stored?.activated_at === null, "activated_at no es null.");
assertGate(stored?.validation_report !== null, "Falta validation_report.");
assertGate(
  Array.isArray(stored.validation_report?.warnings)
    && stored.validation_report.warnings.length === live2Analysis.report.warnings.length,
  "Los warnings almacenados no coinciden con la validación.",
);

const { data: publicRows, error: publicError } = await anon
  .from("website_data_snapshots")
  .select("payload");
if (publicError) throw publicError;
assertGate(publicRows.length === 0, "El snapshot validated es visible para anon.");

const secondPrepare = await publisher.prepare(live2, {
  source: SOURCE,
  capturedAt,
  dryRun: false,
  allowRemoteWrites: true,
});

assertGate(secondPrepare.operation === "reused-existing", "El segundo prepare no reutilizó el snapshot existente.");
assertGate(secondPrepare.snapshot?.id === stored.id, "El segundo prepare devolvió otro snapshot.");

const finalRows = await readSnapshotRows(
  admin,
  "id, version, source, source_checksum, status, captured_at, created_at, validated_at, activated_at, validation_report",
);
const final = statusCounts(finalRows);
const finalSnapshot = finalRows[0];

assertGate(final.total === 1, `La prueba de idempotencia dejó ${final.total} snapshots.`);
assertGate(final.pending === 0, `Estado final pending=${final.pending}.`);
assertGate(final.validated === 1, `Estado final validated=${final.validated}.`);
assertGate(final.active === 0, `Estado final active=${final.active}.`);
assertGate(final.superseded === 0, `Estado final superseded=${final.superseded}.`);

console.log(JSON.stringify({
  mode: "write-validated-snapshot",
  checks,
  before,
  firstPrepare: {
    outcome: firstPrepare.outcome,
    operation: firstPrepare.operation,
    id: stored.id,
    version: stored.version,
    status: stored.status,
  },
  storedVerification: {
    source: stored.source,
    checksum: stored.source_checksum,
    payloadChecksum: storedPayloadAnalysis.report.checksum,
    payloadMatchesLive: storedPayloadAnalysis.report.checksum === live2Analysis.report.checksum,
    capturedAt: stored.captured_at,
    createdAt: stored.created_at,
    validatedAt: stored.validated_at,
    activatedAt: stored.activated_at,
    validationReportPresent: stored.validation_report !== null,
    warningCodes: stored.validation_report.warnings.map(({ code, path }) => ({ code, path })),
  },
  publicAnon: {
    rowsVisible: publicRows.length,
    validatedSnapshotHidden: publicRows.length === 0,
  },
  secondPrepare: {
    outcome: secondPrepare.outcome,
    operation: secondPrepare.operation,
    id: secondPrepare.snapshot.id,
    reusedSameSnapshot: secondPrepare.snapshot.id === stored.id,
  },
  final: {
    ...final,
    id: finalSnapshot.id,
    version: finalSnapshot.version,
    source: finalSnapshot.source,
    checksum: finalSnapshot.source_checksum,
    capturedAt: finalSnapshot.captured_at,
    createdAt: finalSnapshot.created_at,
    validatedAt: finalSnapshot.validated_at,
    activatedAt: finalSnapshot.activated_at,
  },
  activationCalled: false,
}, null, 2));
