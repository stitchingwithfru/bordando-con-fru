import { createWebsiteDataPublisher, SupabaseSnapshotRepository } from "./publisher.mjs";
import { createSupabaseAdminClientFromEnvironment } from "./supabase-node-clients.mjs";

const CONFIRMATION_FLAG = "--confirm-activate-approved-snapshot";
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const SHA256_PATTERN = /^[0-9a-f]{64}$/;

function argumentValue(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? null : process.argv[index + 1] ?? null;
}

function assertGate(condition, message) {
  if (!condition) throw new Error(message);
}

const snapshotId = argumentValue("--snapshot-id");
const expectedChecksum = argumentValue("--expected-checksum");

assertGate(snapshotId !== null, "Falta --snapshot-id <uuid>.");
assertGate(UUID_PATTERN.test(snapshotId), "--snapshot-id no es un UUID válido.");
assertGate(
  process.argv.includes(CONFIRMATION_FLAG),
  `Falta la confirmación explícita ${CONFIRMATION_FLAG}.`,
);
if (expectedChecksum !== null) {
  assertGate(SHA256_PATTERN.test(expectedChecksum), "--expected-checksum no es un SHA-256 válido.");
}

const admin = createSupabaseAdminClientFromEnvironment();
const repository = new SupabaseSnapshotRepository(admin);
const publisher = createWebsiteDataPublisher({ repository });

const { data: snapshot, error: snapshotError } = await admin
  .from("website_data_snapshots")
  .select("id, version, source, source_checksum, status, captured_at, created_at, validated_at, activated_at")
  .eq("id", snapshotId)
  .maybeSingle();

if (snapshotError) throw snapshotError;
assertGate(snapshot !== null, `No existe el snapshot ${snapshotId}.`);
assertGate(snapshot.status === "validated", `El snapshot ${snapshotId} no está validated.`);
if (expectedChecksum !== null) {
  assertGate(
    snapshot.source_checksum === expectedChecksum,
    "El checksum almacenado no coincide con --expected-checksum.",
  );
}

console.log(JSON.stringify({
  operation: "activate-approved-snapshot",
  mechanism: "public.activate_website_data_snapshot(uuid) via Supabase RPC",
  confirmation: "accepted",
  snapshot: {
    id: snapshot.id,
    version: snapshot.version,
    source: snapshot.source,
    checksum: snapshot.source_checksum,
    status: snapshot.status,
  },
}, null, 2));

const activation = await publisher.activate(snapshotId, {
  dryRun: false,
  allowRemoteWrites: true,
});

assertGate(activation.outcome === "activated", "La activación no terminó correctamente.");
assertGate(activation.snapshot?.id === snapshotId, "El RPC devolvió un snapshot diferente.");
assertGate(activation.snapshot?.status === "active", "El RPC no devolvió status active.");

console.log(JSON.stringify({
  result: activation.outcome,
  snapshot: {
    id: activation.snapshot.id,
    version: activation.snapshot.version,
    source: activation.snapshot.source,
    checksum: activation.snapshot.source_checksum,
    status: activation.snapshot.status,
    activatedAt: activation.snapshot.activated_at,
  },
}, null, 2));
