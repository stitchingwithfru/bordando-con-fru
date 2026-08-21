import { analyzeWebsiteData } from "./website-data.mjs";

export const WEBSITE_DATA_SOURCE = "apps_script:website-data";
export const EXPECTED_WARNING = "KNOWN_ORPHAN_SAL_DESIGN";
export const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export const SHA256_PATTERN = /^[0-9a-f]{64}$/;
export const SNAPSHOT_COLUMNS = [
  "id",
  "version",
  "payload",
  "source",
  "source_checksum",
  "status",
  "captured_at",
  "created_at",
  "validated_at",
  "activated_at",
  "validation_report",
].join(", ");

export function argumentValue(name, argv = process.argv.slice(2)) {
  const index = argv.indexOf(name);
  return index === -1 ? null : argv[index + 1] ?? null;
}

export function assertGate(condition, message) {
  if (!condition) throw new Error(message);
}

export function reportSummary(analysis) {
  return {
    validation: analysis.report.result,
    checksum: analysis.report.checksum,
    counts: analysis.report.counts,
    warnings: analysis.report.warnings.map(({ code, path }) => ({ code, path })),
    errors: analysis.report.errors.map(({ code, path }) => ({ code, path })),
  };
}

export function statusCounts(rows) {
  return {
    total: rows.length,
    pending: rows.filter(({ status }) => status === "pending").length,
    validated: rows.filter(({ status }) => status === "validated").length,
    active: rows.filter(({ status }) => status === "active").length,
    superseded: rows.filter(({ status }) => status === "superseded").length,
  };
}

export function assertKnownWarnings(analysis) {
  assertGate(
    analysis.report.warnings.every(({ code }) => code === EXPECTED_WARNING),
    "El payload contiene warnings nuevos no aprobados.",
  );
}

export function assertValidValidationReport(snapshot) {
  const report = snapshot?.validation_report;
  assertGate(report && typeof report === "object" && !Array.isArray(report), "Falta validation_report válido.");
  assertGate(report.result === "PASS", "validation_report no tiene result=PASS.");
  assertGate(report.contract === "WebsiteData@phase1", "validation_report no corresponde a WebsiteData@phase1.");
  assertGate(report.checksum === snapshot.source_checksum, "El checksum del informe no coincide con el snapshot.");
  assertGate(Array.isArray(report.errors), "validation_report.errors no es un array.");
  assertGate(report.errors.length === 0, "validation_report contiene errores.");
}

function assertTimestampInvariants(snapshot) {
  if (snapshot.status === "pending") {
    assertGate(snapshot.validated_at === null, `El snapshot pending ${snapshot.id} tiene validated_at.`);
    assertGate(snapshot.activated_at === null, `El snapshot pending ${snapshot.id} tiene activated_at.`);
    return;
  }

  assertGate(snapshot.validated_at !== null, `El snapshot ${snapshot.status} ${snapshot.id} no tiene validated_at.`);
  assertValidValidationReport(snapshot);

  if (snapshot.status === "validated") {
    assertGate(snapshot.activated_at === null, `El snapshot validated ${snapshot.id} tiene activated_at.`);
    return;
  }

  assertGate(snapshot.activated_at !== null, `El snapshot ${snapshot.status} ${snapshot.id} no tiene activated_at.`);
}

export function inspectSnapshotRows(rows, { now = () => new Date() } = {}) {
  assertGate(Array.isArray(rows), "La consulta de snapshots no devolvió un array.");
  const counts = statusCounts(rows);
  assertGate(counts.active === 1, `Debe existir exactamente un snapshot active; encontrados=${counts.active}.`);

  for (const snapshot of rows) assertTimestampInvariants(snapshot);

  const active = rows.find(({ status }) => status === "active");
  const analysis = analyzeWebsiteData(active.payload, { now });
  assertGate(analysis.report.result === "PASS", "El payload activo no supera el contrato WebsiteData.");
  assertKnownWarnings(analysis);
  assertGate(
    analysis.report.checksum === active.source_checksum,
    "El checksum canónico del payload activo no coincide con source_checksum.",
  );
  assertValidValidationReport(active);

  return { counts, active, analysis };
}

export function assertRollbackCandidate({ active, target, expectedActiveSnapshotId, expectedChecksum }) {
  assertGate(target !== null && target !== undefined, "No existe el snapshot destino del rollback.");
  assertGate(active.id === expectedActiveSnapshotId, "El snapshot activo ya no coincide con el activo esperado.");
  assertGate(target.id !== active.id, "El snapshot destino ya está activo.");
  assertGate(target.status === "superseded", "El snapshot destino debe estar superseded.");
  assertGate(target.source === active.source, "El source del snapshot destino no coincide con el activo.");
  assertGate(target.source_checksum === expectedChecksum, "El checksum del snapshot destino no coincide.");
  assertGate(target.validated_at !== null, "El snapshot destino no tiene validated_at.");
  assertValidValidationReport(target);
}

export async function readSnapshotRows(admin) {
  const { data, error } = await admin
    .from("website_data_snapshots")
    .select(SNAPSHOT_COLUMNS)
    .order("version", { ascending: true });
  if (error) throw error;
  return data;
}

export async function readSnapshotById(admin, snapshotId) {
  const { data, error } = await admin
    .from("website_data_snapshots")
    .select(SNAPSHOT_COLUMNS)
    .eq("id", snapshotId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function verifyOperationalState({ admin, anon, now = () => new Date() }) {
  const rows = await readSnapshotRows(admin);
  const inspected = inspectSnapshotRows(rows, { now });
  const { data: publicRows, error: publicError } = await anon
    .from("website_data_snapshots")
    .select("payload");
  if (publicError) throw publicError;

  assertGate(publicRows?.length === 1, `La lectura anon devolvió ${publicRows?.length ?? 0} snapshots.`);
  const publicAnalysis = analyzeWebsiteData(publicRows[0].payload, { now });
  assertGate(publicAnalysis.report.result === "PASS", "El payload visible para anon no supera el contrato.");
  assertGate(
    publicAnalysis.report.checksum === inspected.active.source_checksum,
    "El payload visible para anon no coincide con el snapshot activo.",
  );

  return {
    ...inspected,
    publicAnalysis,
    publicRowsVisible: publicRows.length,
  };
}
