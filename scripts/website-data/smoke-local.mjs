import { performance } from "node:perf_hooks";
import { extractWebsiteDataFromAppsScript } from "./apps-script-extractor.mjs";
import { createSupabaseAnonClientFromEnvironment } from "./supabase-node-clients.mjs";

function argumentValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#(?:39|x27);/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function textContent(value) {
  return decodeHtml(value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
}

function extractOne(html, tag) {
  const match = html.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? textContent(match[1]) : "";
}

function extractMany(html, tag) {
  return [...html.matchAll(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi"))]
    .map((match) => textContent(match[1]))
    .filter(Boolean);
}

async function timed(action) {
  const start = performance.now();
  const value = await action();
  return { value, ms: Math.round((performance.now() - start) * 10) / 10 };
}

async function readPayload(source) {
  if (source === "apps-script") {
    return timed(() => extractWebsiteDataFromAppsScript());
  }

  if (source === "supabase") {
    return timed(async () => {
      const client = createSupabaseAnonClientFromEnvironment();
      const { data, error } = await client.from("website_data_snapshots").select("payload");
      if (error) throw error;
      if (!data || data.length !== 1) {
        throw new Error(`Supabase devolvió ${data?.length ?? 0} filas públicas.`);
      }
      return data[0].payload;
    });
  }

  throw new Error(`Origen inválido: ${JSON.stringify(source)}.`);
}

function expectedTokens(pathname, data) {
  const firstPrevious = data.previousReadings[0]?.titulo;
  const firstWip = data.bordadoWips[0]?.titulo;
  const firstSal = data.sals[0]?.titulo;

  if (pathname === "/") return ["Punto de cruz, inspiración y herramientas"];
  if (pathname === "/club-de-lectura") return [data.currentReading?.titulo];
  if (pathname === "/club-de-lectura/archivo") return [firstPrevious];
  if (pathname === "/club-de-lectura/estadisticas") return ["Estadísticas del Club"];
  if (pathname === "/mis-lecturas") return ["Mis lecturas personales"];
  if (pathname === "/mis-lecturas/archivo") return ["Archivo de mis lecturas"];
  if (pathname === "/mis-lecturas/estadisticas") return ["Estadísticas lectoras"];
  if (pathname === "/mi-progreso") return [];
  if (pathname === "/mis-bordados") return ["Mis bordados"];
  if (pathname === "/mis-bordados/wips") return ["Mis WIPs activos", firstWip];
  if (pathname === "/sals") return ["SALs disponibles", firstSal];
  if (pathname.startsWith("/sals/")) {
    return [data.sals.find(({ slug }) => pathname === `/sals/${slug}`)?.titulo];
  }
  return [];
}

async function inspectRoute(baseUrl, pathname, data) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45_000);
  const started = performance.now();

  try {
    const response = await fetch(new URL(pathname, baseUrl), {
      redirect: "follow",
      signal: controller.signal,
      headers: { accept: pathname === "/sitemap.xml" ? "application/xml" : "text/html" },
    });
    const body = await response.text();
    const durationMs = Math.round((performance.now() - started) * 10) / 10;
    const tokens = expectedTokens(pathname, data).filter(Boolean);
    const tokenChecks = Object.fromEntries(tokens.map((token) => [token, body.includes(token)]));
    const isSitemap = pathname === "/sitemap.xml";
    const salUrls = data.sals.map(({ slug }) => `/sals/${slug}`);
    const sitemapUrlsPresent = isSitemap
      ? Object.fromEntries(salUrls.map((url) => [url, body.includes(url)]))
      : undefined;
    const documentValid = isSitemap
      ? body.includes("<urlset") && body.includes("</urlset>")
      : body.includes("<html") && body.includes("</html>");
    const contentValid = Object.values(tokenChecks).every(Boolean)
      && (!sitemapUrlsPresent || Object.values(sitemapUrlsPresent).every(Boolean));

    return {
      path: pathname,
      status: response.status,
      durationMs,
      timeout: false,
      error: null,
      documentValid,
      contentValid,
      title: isSitemap ? "XML sitemap" : extractOne(body, "title"),
      headings: isSitemap
        ? []
        : [...extractMany(body, "h1"), ...extractMany(body, "h2"), ...extractMany(body, "h3")],
      tokenChecks,
      sitemapUrlsPresent,
    };
  } catch (error) {
    return {
      path: pathname,
      status: null,
      durationMs: Math.round((performance.now() - started) * 10) / 10,
      timeout: controller.signal.aborted,
      error: error instanceof Error ? error.message : String(error),
      documentValid: false,
      contentValid: false,
      title: "",
      headings: [],
      tokenChecks: {},
    };
  } finally {
    clearTimeout(timeout);
  }
}

const source = argumentValue("--source");
const baseUrl = argumentValue("--base-url");
if (!source || !baseUrl) {
  throw new Error("Uso: smoke-local.mjs --source <apps-script|supabase> --base-url <url>.");
}

const payloadRead = await readPayload(source);
const baseRoutes = [
  "/",
  "/club-de-lectura",
  "/club-de-lectura/archivo",
  "/club-de-lectura/estadisticas",
  "/mis-lecturas",
  "/mis-lecturas/archivo",
  "/mis-lecturas/estadisticas",
  "/mi-progreso",
  "/mis-bordados",
  "/mis-bordados/wips",
  "/sals",
  "/sitemap.xml",
];
const salRoutes = payloadRead.value.sals.map(({ slug }) => `/sals/${slug}`);
const routes = [...baseRoutes, ...salRoutes];
const results = [];

for (let index = 0; index < routes.length; index += 3) {
  const batch = routes.slice(index, index + 3);
  results.push(...await Promise.all(batch.map((route) => inspectRoute(baseUrl, route, payloadRead.value))));
}

const failed = results.filter((result) =>
  result.status !== 200 || result.timeout || result.error || !result.documentValid || !result.contentValid);

console.log(JSON.stringify({
  source,
  sourceEvidence: source === "supabase"
    ? "WEBSITE_DATA_SOURCE=supabase + payload anon directo"
    : "WEBSITE_DATA_SOURCE=apps-script + extractor Apps Script directo",
  payloadReadMs: payloadRead.ms,
  salSlugs: payloadRead.value.sals.map(({ slug }) => slug),
  routesTested: routes.length,
  passed: results.length - failed.length,
  failed: failed.length,
  results,
}, null, 2));

if (failed.length > 0) process.exitCode = 1;
