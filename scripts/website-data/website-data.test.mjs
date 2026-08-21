import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { extractWebsiteDataFromAppsScript, WebsiteDataExtractionError } from "./apps-script-extractor.mjs";
import { createWebsiteDataPublisher } from "./publisher.mjs";
import { analyzeWebsiteData, canonicalizeJson, contentIdentity, sha256Hex } from "./website-data.mjs";

const backupUrl = new URL("../../website-data-backup.json", import.meta.url);
const backup = JSON.parse(await readFile(backupUrl, "utf8"));
const fixedNow = () => new Date("2026-08-21T12:00:00.000Z");
const clone = (value) => structuredClone(value);

test("backup actual: PASS con únicamente los warnings SAL conocidos", () => {
  const analysis = analyzeWebsiteData(backup, { now: fixedNow });
  assert.equal(analysis.report.result, "PASS");
  assert.equal(analysis.report.errors.length, 0);
  assert.equal(analysis.report.warnings.length, 2);
  assert.ok(analysis.report.warnings.every((warning) => warning.code === "KNOWN_ORPHAN_SAL_DESIGN"));
});

test("JSON estructuralmente inválido: falla", () => {
  const analysis = analyzeWebsiteData([], { now: fixedNow });
  assert.equal(analysis.report.result, "FAIL");
  assert.ok(analysis.report.errors.some((error) => error.code === "INVALID_OBJECT"));
});

test("propiedad superior requerida ausente: falla", () => {
  const candidate = clone(backup);
  delete candidate.productNews;
  const analysis = analyzeWebsiteData(candidate, { now: fixedNow });
  assert.equal(analysis.report.result, "FAIL");
  assert.ok(analysis.report.errors.some((error) => error.path === "$.productNews"));
});

test("ID duplicado dentro de una colección: falla", () => {
  const candidate = clone(backup);
  candidate.myReadings.push(clone(candidate.myReadings[0]));
  const analysis = analyzeWebsiteData(candidate, { now: fixedNow });
  assert.equal(analysis.report.result, "FAIL");
  assert.ok(analysis.report.errors.some((error) => error.code === "DUPLICATE_IDENTIFIER"));
});

test("SAL huérfano conocido: warning y no fallo", () => {
  const candidate = clone(backup);
  candidate.salDisenos = candidate.salDisenos.filter((design) => design.sal_id === "sal-halloween-2026");
  const analysis = analyzeWebsiteData(candidate, { now: fixedNow });
  assert.equal(analysis.report.result, "PASS");
  assert.equal(analysis.report.warnings.length, 2);
});

test("SAL huérfano desconocido: falla", () => {
  const candidate = clone(backup);
  candidate.salDisenos[0].sal_id = "sal-inexistente-no-conocido";
  const analysis = analyzeWebsiteData(candidate, { now: fixedNow });
  assert.equal(analysis.report.result, "FAIL");
  assert.ok(analysis.report.errors.some((error) => error.code === "ORPHAN_SAL_DESIGN"));
});

test("fecha manifiestamente inválida: falla sin corregir el valor", () => {
  const candidate = clone(backup);
  candidate.productNews[0].fecha = "2026-02-30";
  const analysis = analyzeWebsiteData(candidate, { now: fixedNow });
  assert.equal(analysis.report.result, "FAIL");
  assert.equal(candidate.productNews[0].fecha, "2026-02-30");
  assert.ok(analysis.report.errors.some((error) => error.code === "INVALID_DATE"));
});

test("canonicalización: el orden de claves no cambia el checksum", () => {
  const first = { z: 1, nested: { b: true, a: null }, a: "" };
  const second = { a: "", nested: { a: null, b: true }, z: 1 };
  assert.equal(sha256Hex(canonicalizeJson(first)), sha256Hex(canonicalizeJson(second)));
});

test("canonicalización: el orden de arrays sí cambia el checksum", () => {
  const first = { items: ["a", "b"] };
  const second = { items: ["b", "a"] };
  assert.notEqual(sha256Hex(canonicalizeJson(first)), sha256Hex(canonicalizeJson(second)));
});

test("idempotencia lógica: el mismo source + checksum identifica el mismo contenido", () => {
  const checksum = sha256Hex(canonicalizeJson(backup));
  assert.equal(
    contentIdentity("apps-script:website-data", checksum),
    contentIdentity("apps-script:website-data", checksum),
  );
  assert.notEqual(
    contentIdentity("apps-script:website-data", checksum),
    contentIdentity("future-app:website-data", checksum),
  );
});

test("dry-run: prepara el plan sin invocar el repositorio", async () => {
  const repository = new Proxy({}, {
    get() {
      throw new Error("El repositorio no debe tocarse en dry-run.");
    },
  });
  const publisher = createWebsiteDataPublisher({ repository, now: fixedNow });
  const result = await publisher.prepare(backup, {
    source: "local-test",
    dryRun: true,
  });
  assert.equal(result.outcome, "dry-run");
  assert.equal(result.supabaseWrites, 0);
});

test("prepare simulado: reutiliza el mismo source + checksum", async () => {
  const calls = [];
  const existing = { id: "snapshot-mock", status: "validated" };
  const repository = {
    async findBySourceAndChecksum(source, checksum) {
      calls.push(["find", source, checksum]);
      return existing;
    },
    async insertPending() {
      calls.push(["insert"]);
      throw new Error("No debe insertar contenido idempotente.");
    },
    async markValidated() {
      calls.push(["validate"]);
      throw new Error("No debe revalidar un snapshot ya validado.");
    },
  };
  const publisher = createWebsiteDataPublisher({ repository, now: fixedNow });
  const result = await publisher.prepare(backup, {
    source: "apps-script:website-data",
    dryRun: false,
    allowRemoteWrites: true,
  });
  assert.equal(result.operation, "reused-existing");
  assert.deepEqual(calls.map(([name]) => name), ["find"]);
});

test("extractor Apps Script: sigue redirects, añade mode y limita reintentos", async () => {
  const calls = [];
  const fetchImpl = async (url, options) => {
    calls.push({ url: String(url), options });
    if (calls.length === 1) return { ok: false, status: 503, text: async () => "" };
    return { ok: true, status: 200, text: async () => JSON.stringify({ ok: true }) };
  };
  const result = await extractWebsiteDataFromAppsScript({
    baseUrl: "https://example.test/exec?existing=1",
    fetchImpl,
    timeoutMs: 100,
    maxAttempts: 2,
    retryDelayMs: 0,
    waitImpl: async () => {},
  });
  assert.deepEqual(result, { ok: true });
  assert.equal(calls.length, 2);
  assert.ok(calls[0].url.includes("mode=website-data"));
  assert.equal(calls[0].options.redirect, "follow");
});

test("extractor Apps Script: JSON inválido produce error controlado sin reintento infinito", async () => {
  let calls = 0;
  await assert.rejects(
    extractWebsiteDataFromAppsScript({
      baseUrl: "https://example.test/exec",
      fetchImpl: async () => {
        calls += 1;
        return { ok: true, status: 200, text: async () => "{roto" };
      },
      maxAttempts: 3,
      timeoutMs: 100,
    }),
    (error) => error instanceof WebsiteDataExtractionError && error.code === "INVALID_JSON",
  );
  assert.equal(calls, 1);
});
