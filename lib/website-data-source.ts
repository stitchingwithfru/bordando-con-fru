import type { WebsiteData } from "./phase1-data";

export type WebsiteDataSource = "apps-script" | "supabase";

type WebsiteDataReaders = Readonly<{
  appsScript: () => Promise<WebsiteData>;
  supabase: () => Promise<WebsiteData>;
}>;

const WEBSITE_DATA_KEYS = [
  "currentReading",
  "currentReadings",
  "nextReading",
  "previousReadings",
  "recommendedReadings",
  "productNews",
  "clubStatus",
  "myReadings",
  "readingChallenge",
  "bordadoResumen",
  "bordadoMesActual",
  "bordadoWips",
  "sals",
  "salDisenos",
] as const;

const ARRAY_KEYS = [
  "currentReadings",
  "previousReadings",
  "recommendedReadings",
  "productNews",
  "myReadings",
  "bordadoMesActual",
  "bordadoWips",
  "sals",
  "salDisenos",
] as const;

const NULLABLE_OBJECT_KEYS = ["currentReading", "nextReading", "bordadoResumen"] as const;
const OBJECT_KEYS = ["clubStatus", "readingChallenge"] as const;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function resolveWebsiteDataSource(value: string | undefined): WebsiteDataSource {
  if (value === undefined || value === "apps-script") {
    return "apps-script";
  }

  if (value === "supabase") {
    return "supabase";
  }

  throw new Error(
    `Valor inválido de WEBSITE_DATA_SOURCE: ${JSON.stringify(value)}. Usa "apps-script" o "supabase".`,
  );
}

export async function readWebsiteDataFromSelectedSource(
  value: string | undefined,
  readers: WebsiteDataReaders,
): Promise<WebsiteData> {
  const source = resolveWebsiteDataSource(value);
  return source === "supabase" ? readers.supabase() : readers.appsScript();
}

export function validateWebsiteDataPayload(payload: unknown): WebsiteData {
  if (!isObject(payload)) {
    throw new Error("El payload de Supabase no es un objeto WebsiteData válido.");
  }

  for (const key of WEBSITE_DATA_KEYS) {
    if (!Object.prototype.hasOwnProperty.call(payload, key)) {
      throw new Error(`El payload de Supabase no contiene la propiedad superior ${key}.`);
    }
  }

  for (const key of ARRAY_KEYS) {
    if (!Array.isArray(payload[key])) {
      throw new Error(`El payload de Supabase requiere un array en ${key}.`);
    }
  }

  for (const key of NULLABLE_OBJECT_KEYS) {
    if (payload[key] !== null && !isObject(payload[key])) {
      throw new Error(`El payload de Supabase requiere un objeto o null en ${key}.`);
    }
  }

  for (const key of OBJECT_KEYS) {
    if (!isObject(payload[key])) {
      throw new Error(`El payload de Supabase requiere un objeto en ${key}.`);
    }
  }

  return payload as WebsiteData;
}
