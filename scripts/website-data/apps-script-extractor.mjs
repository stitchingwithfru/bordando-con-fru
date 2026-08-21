export class WebsiteDataExtractionError extends Error {
  constructor(code, message, options = {}) {
    super(message, options);
    this.name = "WebsiteDataExtractionError";
    this.code = code;
  }
}

function websiteDataUrl(baseUrl) {
  if (typeof baseUrl !== "string" || baseUrl.trim() === "") {
    throw new WebsiteDataExtractionError("MISSING_ENDPOINT", "Falta GOOGLE_APPS_SCRIPT_WEBHOOK_URL.");
  }

  try {
    const url = new URL(baseUrl);
    url.searchParams.set("mode", "website-data");
    return url;
  } catch (error) {
    throw new WebsiteDataExtractionError("INVALID_ENDPOINT", "GOOGLE_APPS_SCRIPT_WEBHOOK_URL no es una URL válida.", { cause: error });
  }
}

function shouldRetryStatus(status) {
  return status === 408 || status === 429 || status >= 500;
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

/**
 * Adaptador reemplazable para el origen Apps Script. Solo extrae JSON; la
 * validación de WebsiteData pertenece a la capa posterior.
 */
export async function extractWebsiteDataFromAppsScript({
  baseUrl = process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL,
  fetchImpl = globalThis.fetch,
  timeoutMs = 8_000,
  maxAttempts = 3,
  retryDelayMs = 250,
  waitImpl = wait,
} = {}) {
  if (typeof fetchImpl !== "function") {
    throw new WebsiteDataExtractionError("FETCH_UNAVAILABLE", "No existe una implementación de fetch disponible.");
  }
  if (!Number.isInteger(maxAttempts) || maxAttempts < 1 || maxAttempts > 5) {
    throw new WebsiteDataExtractionError("INVALID_RETRY_POLICY", "maxAttempts debe estar entre 1 y 5.");
  }
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
    throw new WebsiteDataExtractionError("INVALID_TIMEOUT", "timeoutMs debe ser mayor que cero.");
  }

  const url = websiteDataUrl(baseUrl);

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetchImpl(url, {
        method: "GET",
        redirect: "follow",
        headers: { accept: "application/json" },
        signal: controller.signal,
      });

      if (!response.ok) {
        if (attempt < maxAttempts && shouldRetryStatus(response.status)) {
          await waitImpl(retryDelayMs * attempt);
          continue;
        }
        throw new WebsiteDataExtractionError("HTTP_ERROR", `Apps Script respondió con HTTP ${response.status}.`);
      }

      const raw = await response.text();
      try {
        return JSON.parse(raw);
      } catch (error) {
        throw new WebsiteDataExtractionError("INVALID_JSON", "Apps Script devolvió JSON inválido.", { cause: error });
      }
    } catch (error) {
      if (error instanceof WebsiteDataExtractionError) throw error;
      if (attempt < maxAttempts) {
        await waitImpl(retryDelayMs * attempt);
        continue;
      }
      const timedOut = controller.signal.aborted;
      throw new WebsiteDataExtractionError(
        timedOut ? "TIMEOUT" : "NETWORK_ERROR",
        timedOut ? "La lectura de Apps Script agotó el tiempo máximo." : "No se pudo conectar con Apps Script.",
        { cause: error },
      );
    } finally {
      clearTimeout(timeout);
    }
  }

  throw new WebsiteDataExtractionError("RETRY_EXHAUSTED", "Se agotaron los intentos de lectura de Apps Script.");
}
