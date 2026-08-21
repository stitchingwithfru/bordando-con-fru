import assert from "node:assert/strict";
import test from "node:test";
import {
  readWebsiteDataFromSelectedSource,
  validateWebsiteDataPayload,
} from "../../lib/website-data-source.ts";

function minimalPayload() {
  return {
    currentReading: null,
    currentReadings: [],
    nextReading: null,
    previousReadings: [],
    recommendedReadings: [],
    productNews: [],
    clubStatus: {},
    myReadings: [],
    readingChallenge: {},
    bordadoResumen: null,
    bordadoMesActual: [],
    bordadoWips: [],
    sals: [],
    salDisenos: [],
  };
}

function readers(calls) {
  return {
    async appsScript() {
      calls.push("apps-script");
      return minimalPayload();
    },
    async supabase() {
      calls.push("supabase");
      return minimalPayload();
    },
  };
}

test("WEBSITE_DATA_SOURCE ausente selecciona Apps Script", async () => {
  const calls = [];
  await readWebsiteDataFromSelectedSource(undefined, readers(calls));
  assert.deepEqual(calls, ["apps-script"]);
});

test("WEBSITE_DATA_SOURCE=apps-script selecciona Apps Script", async () => {
  const calls = [];
  await readWebsiteDataFromSelectedSource("apps-script", readers(calls));
  assert.deepEqual(calls, ["apps-script"]);
});

test("WEBSITE_DATA_SOURCE=supabase selecciona Supabase", async () => {
  const calls = [];
  await readWebsiteDataFromSelectedSource("supabase", readers(calls));
  assert.deepEqual(calls, ["supabase"]);
});

test("WEBSITE_DATA_SOURCE inválido produce error de configuración", async () => {
  const calls = [];
  await assert.rejects(
    readWebsiteDataFromSelectedSource("otro", readers(calls)),
    /Valor inválido de WEBSITE_DATA_SOURCE/,
  );
  assert.deepEqual(calls, []);
});

test("un fallo Supabase se propaga sin fallback a Apps Script", async () => {
  const calls = [];
  const expectedError = new Error("Supabase no disponible");

  await assert.rejects(
    readWebsiteDataFromSelectedSource("supabase", {
      async appsScript() {
        calls.push("apps-script");
        return minimalPayload();
      },
      async supabase() {
        calls.push("supabase");
        throw expectedError;
      },
    }),
    (error) => error === expectedError,
  );

  assert.deepEqual(calls, ["supabase"]);
});

test("un payload Supabase mínimo válido se acepta sin transformación", () => {
  const payload = minimalPayload();
  assert.equal(validateWebsiteDataPayload(payload), payload);
});

test("payloads Supabase con forma mínima inválida se rechazan", () => {
  assert.throws(() => validateWebsiteDataPayload(null), /no es un objeto/);

  const missingProperty = minimalPayload();
  delete missingProperty.productNews;
  assert.throws(() => validateWebsiteDataPayload(missingProperty), /productNews/);

  const invalidArray = { ...minimalPayload(), sals: {} };
  assert.throws(() => validateWebsiteDataPayload(invalidArray), /array en sals/);

  const invalidNullableObject = { ...minimalPayload(), nextReading: [] };
  assert.throws(() => validateWebsiteDataPayload(invalidNullableObject), /objeto o null en nextReading/);

  const invalidObject = { ...minimalPayload(), clubStatus: null };
  assert.throws(() => validateWebsiteDataPayload(invalidObject), /objeto en clubStatus/);
});
