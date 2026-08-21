import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  argumentValue,
  assertRollbackCandidate,
  inspectSnapshotRows,
} from "./operational-guards.mjs";
import { createWebsiteDataPublisher } from "./publisher.mjs";
import { analyzeWebsiteData } from "./website-data.mjs";

const backupUrl = new URL("../../website-data-backup.json", import.meta.url);
const backup = JSON.parse(await readFile(backupUrl, "utf8"));
const fixedNow = () => new Date("2026-08-21T12:00:00.000Z");
const analysis = analyzeWebsiteData(backup, { now: fixedNow });

function snapshot(overrides = {}) {
  return {
    id: "00000000-0000-4000-8000-000000000001",
    version: 1,
    payload: structuredClone(backup),
    source: "apps_script:website-data",
    source_checksum: analysis.report.checksum,
    status: "active",
    captured_at: "2026-08-21T11:00:00.000Z",
    created_at: "2026-08-21T11:00:01.000Z",
    validated_at: "2026-08-21T11:00:02.000Z",
    activated_at: "2026-08-21T11:00:03.000Z",
    validation_report: structuredClone(analysis.report),
    ...overrides,
  };
}

test("estado operativo válido: exige exactamente un active y contrato/checksum coherentes", () => {
  const active = snapshot();
  const historical = snapshot({
    id: "00000000-0000-4000-8000-000000000002",
    version: 2,
    status: "superseded",
  });
  const result = inspectSnapshotRows([historical, active], { now: fixedNow });
  assert.equal(result.counts.active, 1);
  assert.equal(result.active.id, active.id);
  assert.equal(result.analysis.report.checksum, active.source_checksum);
});

test("estado operativo inválido: rechaza múltiples snapshots active", () => {
  assert.throws(
    () => inspectSnapshotRows([
      snapshot(),
      snapshot({ id: "00000000-0000-4000-8000-000000000002", version: 2 }),
    ], { now: fixedNow }),
    /exactamente un snapshot active/,
  );
});

test("rollback local: valida active esperado, source, checksum e informe sin errores", () => {
  const active = snapshot();
  const target = snapshot({
    id: "00000000-0000-4000-8000-000000000002",
    version: 2,
    status: "superseded",
  });
  assert.doesNotThrow(() => assertRollbackCandidate({
    active,
    target,
    expectedActiveSnapshotId: active.id,
    expectedChecksum: target.source_checksum,
  }));
});

test("rollback local: rechaza source diferente e informe con errores", () => {
  const active = snapshot();
  const differentSource = snapshot({
    id: "00000000-0000-4000-8000-000000000002",
    status: "superseded",
    source: "tracking_app:website-data",
  });
  assert.throws(
    () => assertRollbackCandidate({
      active,
      target: differentSource,
      expectedActiveSnapshotId: active.id,
      expectedChecksum: differentSource.source_checksum,
    }),
    /source/,
  );

  const invalidReport = snapshot({
    id: "00000000-0000-4000-8000-000000000003",
    status: "superseded",
    validation_report: {
      ...structuredClone(analysis.report),
      errors: [{ code: "TEST_ERROR" }],
    },
  });
  assert.throws(
    () => assertRollbackCandidate({
      active,
      target: invalidReport,
      expectedActiveSnapshotId: active.id,
      expectedChecksum: invalidReport.source_checksum,
    }),
    /errores/,
  );
});

test("publicación normal: crea pending y lo deja validated sin activar", async () => {
  const calls = [];
  const repository = {
    async findBySourceAndChecksum() {
      calls.push("find");
      return null;
    },
    async insertPending(candidate) {
      calls.push("insert");
      return {
        id: "00000000-0000-4000-8000-000000000010",
        status: "pending",
        source_checksum: candidate.checksum,
      };
    },
    async markValidated(id) {
      calls.push("validate");
      return { id, status: "validated", source_checksum: analysis.report.checksum };
    },
  };
  const publisher = createWebsiteDataPublisher({ repository, now: fixedNow });
  const result = await publisher.prepare(backup, {
    source: "apps_script:website-data",
    dryRun: false,
    allowRemoteWrites: true,
  });
  assert.equal(result.operation, "created-and-validated");
  assert.equal(result.snapshot.status, "validated");
  assert.deepEqual(calls, ["find", "insert", "validate"]);
});

test("publicación normal: no revalida silenciosamente un snapshot superseded", async () => {
  const historical = { id: "snapshot-historical", status: "superseded" };
  const repository = {
    async findBySourceAndChecksum() {
      return historical;
    },
    async markValidated() {
      throw new Error("No debe cambiar un superseded a validated.");
    },
  };
  const publisher = createWebsiteDataPublisher({ repository, now: fixedNow });
  const result = await publisher.prepare(backup, {
    source: "apps_script:website-data",
    dryRun: false,
    allowRemoteWrites: true,
  });
  assert.equal(result.outcome, "blocked");
  assert.equal(result.operation, "historical-snapshot-requires-rollback");
  assert.equal(result.snapshot.id, historical.id);
});

test("activación del publicador: delega en la RPC para un snapshot identificado", async () => {
  const calls = [];
  const repository = {
    async activateValidated(snapshotId) {
      calls.push(snapshotId);
      return { id: snapshotId, status: "active" };
    },
  };
  const publisher = createWebsiteDataPublisher({ repository, now: fixedNow });
  const result = await publisher.activate(
    "00000000-0000-4000-8000-000000000001",
    { dryRun: false, allowRemoteWrites: true },
  );
  assert.equal(result.outcome, "activated");
  assert.equal(result.snapshot.status, "active");
  assert.deepEqual(calls, ["00000000-0000-4000-8000-000000000001"]);
});

test("rollback del publicador: llama únicamente a la RPC con las tres precondiciones", async () => {
  const calls = [];
  const repository = {
    async rollbackToSuperseded(snapshotId, expectedActiveSnapshotId, expectedChecksum) {
      calls.push({ snapshotId, expectedActiveSnapshotId, expectedChecksum });
      return { id: snapshotId, status: "active" };
    },
  };
  const publisher = createWebsiteDataPublisher({ repository, now: fixedNow });
  const result = await publisher.rollback(
    "00000000-0000-4000-8000-000000000001",
    "00000000-0000-4000-8000-000000000002",
    analysis.report.checksum,
    { dryRun: false, allowRemoteWrites: true },
  );
  assert.equal(result.outcome, "rolled-back");
  assert.equal(result.snapshot.status, "active");
  assert.deepEqual(calls, [{
    snapshotId: "00000000-0000-4000-8000-000000000001",
    expectedActiveSnapshotId: "00000000-0000-4000-8000-000000000002",
    expectedChecksum: analysis.report.checksum,
  }]);
});

test("argumentValue exige que el valor siga inmediatamente al argumento", () => {
  assert.equal(argumentValue("--snapshot-id", ["--snapshot-id", "abc", "--flag"]), "abc");
  assert.equal(argumentValue("--missing", ["--snapshot-id", "abc"]), null);
  assert.equal(argumentValue("--snapshot-id", ["--snapshot-id"]), null);
});
