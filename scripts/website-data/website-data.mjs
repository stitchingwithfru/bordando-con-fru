import { createHash } from "node:crypto";

/** @typedef {import("../../lib/phase1-data").WebsiteData} WebsiteData */

export const WEBSITE_DATA_TOP_LEVEL_PROPERTIES = Object.freeze([
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
]);

const KNOWN_ORPHAN_SAL_IDS = new Set(["sal-halloween-2026"]);
const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const DATE_TIME_PATTERN = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/;

function issue(level, code, path, message) {
  return { level, code, path, message };
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function validateJsonValue(value, path, errors, ancestors = new WeakSet()) {
  if (value === null || typeof value === "string" || typeof value === "boolean") {
    return;
  }

  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      errors.push(issue("error", "NON_FINITE_NUMBER", path, "Debe ser un número JSON finito."));
    }
    return;
  }

  if (typeof value !== "object") {
    errors.push(issue("error", "NON_JSON_VALUE", path, `El tipo ${typeof value} no es válido en JSON.`));
    return;
  }

  if (ancestors.has(value)) {
    errors.push(issue("error", "CYCLIC_VALUE", path, "El payload contiene una referencia circular."));
    return;
  }

  if (!Array.isArray(value) && !isPlainObject(value)) {
    errors.push(issue("error", "NON_PLAIN_OBJECT", path, "Debe ser un objeto JSON simple."));
    return;
  }

  ancestors.add(value);
  if (Array.isArray(value)) {
    value.forEach((item, index) => validateJsonValue(item, `${path}[${index}]`, errors, ancestors));
  } else {
    Object.entries(value).forEach(([key, child]) => {
      validateJsonValue(child, path === "$" ? `$.${key}` : `${path}.${key}`, errors, ancestors);
    });
  }
  ancestors.delete(value);
}

function requireObject(value, path, errors, { nullable = false } = {}) {
  if (nullable && value === null) return false;
  if (!isPlainObject(value)) {
    errors.push(issue("error", "INVALID_OBJECT", path, nullable ? "Debe ser un objeto o null." : "Debe ser un objeto."));
    return false;
  }
  return true;
}

function requireArray(value, path, errors) {
  if (!Array.isArray(value)) {
    errors.push(issue("error", "INVALID_ARRAY", path, "Debe ser un array."));
    return false;
  }
  return true;
}

function requireProperty(object, property, path, errors) {
  if (!Object.prototype.hasOwnProperty.call(object, property)) {
    errors.push(issue("error", "MISSING_PROPERTY", `${path}.${property}`, "Falta una propiedad requerida."));
    return false;
  }
  return true;
}

function validateString(object, property, path, errors, { nonBlank = false, optional = false } = {}) {
  if (!Object.prototype.hasOwnProperty.call(object, property)) {
    if (!optional) requireProperty(object, property, path, errors);
    return;
  }

  const value = object[property];
  if (typeof value !== "string") {
    errors.push(issue("error", "INVALID_STRING", `${path}.${property}`, "Debe ser una cadena."));
  } else if (nonBlank && value.trim() === "") {
    errors.push(issue("error", "BLANK_IDENTIFIER", `${path}.${property}`, "El identificador o slug no puede estar vacío."));
  }
}

function validateNumber(object, property, path, errors) {
  if (!requireProperty(object, property, path, errors)) return;
  const value = object[property];
  if (typeof value !== "number" || !Number.isFinite(value)) {
    errors.push(issue("error", "INVALID_NUMBER", `${path}.${property}`, "Debe ser un número finito."));
  }
}

function validateBoolean(object, property, path, errors) {
  if (!requireProperty(object, property, path, errors)) return;
  if (typeof object[property] !== "boolean") {
    errors.push(issue("error", "INVALID_BOOLEAN", `${path}.${property}`, "Debe ser booleano."));
  }
}

function isValidDateOnly(value) {
  const match = DATE_ONLY_PATTERN.exec(value);
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsed = new Date(Date.UTC(year, month - 1, day));

  return parsed.getUTCFullYear() === year
    && parsed.getUTCMonth() === month - 1
    && parsed.getUTCDate() === day;
}

function isValidDateTime(value) {
  const match = DATE_TIME_PATTERN.exec(value);
  if (!match) return false;

  const datePart = `${match[1]}-${match[2]}-${match[3]}`;
  const hours = Number(match[4]);
  const minutes = Number(match[5]);
  const seconds = Number(match[6]);

  return isValidDateOnly(datePart)
    && hours >= 0 && hours <= 23
    && minutes >= 0 && minutes <= 59
    && seconds >= 0 && seconds <= 59
    && !Number.isNaN(Date.parse(value.replace(" ", "T")));
}

function validateDate(object, property, path, errors) {
  if (!requireProperty(object, property, path, errors)) return;
  const value = object[property];

  if (typeof value !== "string") {
    errors.push(issue("error", "INVALID_DATE_TYPE", `${path}.${property}`, "La fecha debe ser una cadena."));
    return;
  }

  // El contrato de producción conserva cadenas vacías para fechas aún no conocidas.
  if (value === "") return;

  const valid = isValidDateOnly(value) || isValidDateTime(value);

  if (!valid) {
    errors.push(issue("error", "INVALID_DATE", `${path}.${property}`, "La fecha no tiene un valor de calendario válido."));
  }
}

function validateEnum(object, property, allowed, path, errors) {
  if (!requireProperty(object, property, path, errors)) return;
  const value = object[property];
  if (typeof value !== "string" || !allowed.includes(value)) {
    errors.push(issue("error", "INVALID_ENUM", `${path}.${property}`, `Debe ser uno de: ${allowed.join(", ")}.`));
  }
}

function validateReadingItem(value, path, errors) {
  if (!requireObject(value, path, errors)) return;
  validateString(value, "id", path, errors, { nonBlank: true });
  for (const field of ["titulo", "autor", "sinopsis", "generos", "goodreads_url", "portada_url"]) {
    validateString(value, field, path, errors);
  }
  validateString(value, "portada_local", path, errors, { optional: true });
  validateString(value, "portada_large", path, errors, { optional: true });
  validateDate(value, "fecha_inicio", path, errors);
  validateDate(value, "fecha_fin", path, errors);
  validateBoolean(value, "recomendada", path, errors);
}

function validateProductNewsItem(value, path, errors) {
  if (!requireObject(value, path, errors)) return;
  validateString(value, "id", path, errors, { nonBlank: true });
  for (const field of ["titulo", "texto", "url", "tipo"]) validateString(value, field, path, errors);
  validateDate(value, "fecha", path, errors);
}

function validateClubStatus(value, path, errors) {
  if (!requireObject(value, path, errors)) return;

  const sections = ["reading", "topic", "survey", "notice"];
  for (const section of sections) {
    if (!requireProperty(value, section, path, errors)) continue;
    if (!requireObject(value[section], `${path}.${section}`, errors)) continue;
  }

  if (isPlainObject(value.reading)) {
    validateEnum(value.reading, "state", ["current", "next", "none"], `${path}.reading`, errors);
    validateString(value.reading, "title", `${path}.reading`, errors);
    validateString(value.reading, "text", `${path}.reading`, errors);
    validateDate(value.reading, "date", `${path}.reading`, errors);
  }
  if (isPlainObject(value.topic)) {
    validateEnum(value.topic, "state", ["open", "closed", "none"], `${path}.topic`, errors);
    validateString(value.topic, "title", `${path}.topic`, errors);
    validateString(value.topic, "text", `${path}.topic`, errors);
    validateDate(value.topic, "closeDate", `${path}.topic`, errors);
  }
  if (isPlainObject(value.survey)) {
    validateEnum(value.survey, "state", ["none", "upcoming", "open", "closed"], `${path}.survey`, errors);
    for (const field of ["title", "text", "url"]) validateString(value.survey, field, `${path}.survey`, errors);
    validateDate(value.survey, "startDate", `${path}.survey`, errors);
    validateDate(value.survey, "endDate", `${path}.survey`, errors);
  }
  if (isPlainObject(value.notice)) {
    validateBoolean(value.notice, "visible", `${path}.notice`, errors);
    validateString(value.notice, "title", `${path}.notice`, errors);
    validateString(value.notice, "text", `${path}.notice`, errors);
  }
}

function validateMyReadingItem(value, path, errors) {
  if (!requireObject(value, path, errors)) return;
  validateString(value, "id", path, errors, { nonBlank: true });
  for (const field of ["titulo", "autor", "portada_url", "goodreads_url", "generos", "formato", "estado", "nota"]) {
    validateString(value, field, path, errors);
  }
  validateString(value, "portada_local", path, errors, { optional: true });
  for (const field of ["paginas_totales", "pagina_actual", "porcentaje_actual", "progressPercent"]) {
    validateNumber(value, field, path, errors);
  }
  validateDate(value, "fecha_inicio", path, errors);
  validateDate(value, "fecha_fin", path, errors);
  validateDate(value, "ultimo_progreso", path, errors);
}

function validateReadingChallenge(value, path, errors) {
  if (!requireObject(value, path, errors)) return;
  for (const field of ["year", "goal", "completed", "progressPercent"]) validateNumber(value, field, path, errors);
}

function validateBordadoResumen(value, path, errors) {
  if (value === null) return;
  if (!requireObject(value, path, errors, { nullable: true })) return;
  for (const field of ["anio", "mes", "total_mes", "total_anual", "dias_activos_mes"]) validateNumber(value, field, path, errors);
  for (const field of ["mes_nombre", "proyecto_mas_trabajado_mes", "visible"]) validateString(value, field, path, errors);
  validateDate(value, "ultima_actualizacion", path, errors);
}

function validateBordadoMesActualItem(value, path, errors) {
  if (!requireObject(value, path, errors)) return;
  validateDate(value, "fecha", path, errors);
  validateString(value, "proyecto", path, errors);
  validateString(value, "visible", path, errors);
  for (const field of ["dia", "cruces", "total_dia", "orden"]) validateNumber(value, field, path, errors);
}

function validateBordadoWipItem(value, path, errors) {
  if (!requireObject(value, path, errors)) return;
  validateString(value, "id", path, errors, { nonBlank: true });
  validateString(value, "slug", path, errors, { nonBlank: true });
  for (const field of ["titulo", "progreso", "estado", "imagen_url", "notas", "visible"]) validateString(value, field, path, errors);
  validateDate(value, "fecha_inicio", path, errors);
  validateDate(value, "fecha_fin", path, errors);
  for (const field of ["cruces_anio", "cruces_previas", "cruces_acumuladas", "total_cruces", "orden"]) {
    validateNumber(value, field, path, errors);
  }
}

function validateSalItem(value, path, errors) {
  if (!requireObject(value, path, errors)) return;
  validateString(value, "id", path, errors, { nonBlank: true });
  validateString(value, "slug", path, errors, { nonBlank: true });
  for (const field of [
    "titulo", "estado", "descripcion_corta", "descripcion_larga", "tipo",
    "whatsapp_url", "imagen_principal_url", "visible",
  ]) validateString(value, field, path, errors);
  validateDate(value, "fecha_inicio", path, errors);
  validateDate(value, "fecha_fin", path, errors);
  validateNumber(value, "orden", path, errors);
}

function validateSalDisenoItem(value, path, errors) {
  if (!requireObject(value, path, errors)) return;
  validateString(value, "id", path, errors, { nonBlank: true });
  validateString(value, "sal_id", path, errors, { nonBlank: true });
  for (const field of ["titulo", "descripcion", "imagen_url", "enlace_compra", "count_info", "visible"]) {
    validateString(value, field, path, errors);
  }
  validateNumber(value, "orden", path, errors);
}

function validateArrayItems(root, property, validator, errors) {
  const value = root[property];
  if (!requireArray(value, `$.${property}`, errors)) return;
  value.forEach((item, index) => validator(item, `$.${property}[${index}]`, errors));
}

function validateUniqueField(items, field, collection, errors) {
  if (!Array.isArray(items)) return;
  const seen = new Map();

  items.forEach((item, index) => {
    if (!isPlainObject(item) || typeof item[field] !== "string" || item[field].trim() === "") return;
    const previousIndex = seen.get(item[field]);
    if (previousIndex !== undefined) {
      errors.push(issue(
        "error",
        "DUPLICATE_IDENTIFIER",
        `$.${collection}[${index}].${field}`,
        `Valor duplicado; ya aparece en $.${collection}[${previousIndex}].${field}.`,
      ));
    } else {
      seen.set(item[field], index);
    }
  });
}

function collectionCounts(value) {
  const arrayCount = (property) => Array.isArray(value?.[property]) ? value[property].length : null;
  const objectCount = (property) => value?.[property] === null
    ? 0
    : isPlainObject(value?.[property]) ? 1 : null;

  return {
    currentReading: objectCount("currentReading"),
    currentReadings: arrayCount("currentReadings"),
    nextReading: objectCount("nextReading"),
    previousReadings: arrayCount("previousReadings"),
    recommendedReadings: arrayCount("recommendedReadings"),
    productNews: arrayCount("productNews"),
    clubStatus: objectCount("clubStatus"),
    myReadings: arrayCount("myReadings"),
    readingChallenge: objectCount("readingChallenge"),
    bordadoResumen: objectCount("bordadoResumen"),
    bordadoMesActual: arrayCount("bordadoMesActual"),
    bordadoWips: arrayCount("bordadoWips"),
    sals: arrayCount("sals"),
    salDisenos: arrayCount("salDisenos"),
  };
}

/**
 * Serializa JSON con claves de objetos ordenadas recursivamente. El orden de los
 * arrays y todos los valores JSON se conservan exactamente.
 */
export function canonicalizeJson(value) {
  if (value === null) return "null";
  if (typeof value === "string" || typeof value === "boolean") return JSON.stringify(value);
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new TypeError("No se pueden canonicalizar números no finitos.");
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map((item) => canonicalizeJson(item)).join(",")}]`;
  if (!isPlainObject(value)) throw new TypeError("Solo se pueden canonicalizar valores JSON.");

  return `{${Object.keys(value)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${canonicalizeJson(value[key])}`)
    .join(",")}}`;
}

export function sha256Hex(value) {
  return createHash("sha256").update(value).digest("hex");
}

/**
 * Valida un candidato desconocido sin corregirlo ni transformarlo.
 * @returns {{data: WebsiteData | null, canonicalJson: string | null, report: object}}
 */
export function analyzeWebsiteData(candidate, { now = () => new Date() } = {}) {
  const errors = [];
  const warnings = [];

  validateJsonValue(candidate, "$", errors);

  if (!requireObject(candidate, "$", errors)) {
    return finalizeAnalysis(candidate, errors, warnings, now);
  }

  for (const property of WEBSITE_DATA_TOP_LEVEL_PROPERTIES) {
    requireProperty(candidate, property, "$", errors);
  }

  if (Object.prototype.hasOwnProperty.call(candidate, "currentReading") && candidate.currentReading !== null) {
    validateReadingItem(candidate.currentReading, "$.currentReading", errors);
  }
  if (Object.prototype.hasOwnProperty.call(candidate, "nextReading") && candidate.nextReading !== null) {
    validateReadingItem(candidate.nextReading, "$.nextReading", errors);
  }
  validateArrayItems(candidate, "currentReadings", validateReadingItem, errors);
  validateArrayItems(candidate, "previousReadings", validateReadingItem, errors);
  validateArrayItems(candidate, "recommendedReadings", validateReadingItem, errors);
  validateArrayItems(candidate, "productNews", validateProductNewsItem, errors);
  if (Object.prototype.hasOwnProperty.call(candidate, "clubStatus")) validateClubStatus(candidate.clubStatus, "$.clubStatus", errors);
  validateArrayItems(candidate, "myReadings", validateMyReadingItem, errors);
  if (Object.prototype.hasOwnProperty.call(candidate, "readingChallenge")) {
    validateReadingChallenge(candidate.readingChallenge, "$.readingChallenge", errors);
  }
  if (Object.prototype.hasOwnProperty.call(candidate, "bordadoResumen")) {
    validateBordadoResumen(candidate.bordadoResumen, "$.bordadoResumen", errors);
  }
  validateArrayItems(candidate, "bordadoMesActual", validateBordadoMesActualItem, errors);
  validateArrayItems(candidate, "bordadoWips", validateBordadoWipItem, errors);
  validateArrayItems(candidate, "sals", validateSalItem, errors);
  validateArrayItems(candidate, "salDisenos", validateSalDisenoItem, errors);

  for (const collection of [
    "currentReadings", "previousReadings", "recommendedReadings", "productNews",
    "myReadings", "bordadoWips", "sals", "salDisenos",
  ]) validateUniqueField(candidate[collection], "id", collection, errors);
  validateUniqueField(candidate.bordadoWips, "slug", "bordadoWips", errors);
  validateUniqueField(candidate.sals, "slug", "sals", errors);

  if (Array.isArray(candidate.sals) && Array.isArray(candidate.salDisenos)) {
    const publicSalIds = new Set(candidate.sals
      .filter((sal) => isPlainObject(sal) && typeof sal.id === "string")
      .map((sal) => sal.id));

    candidate.salDisenos.forEach((design, index) => {
      if (!isPlainObject(design) || typeof design.sal_id !== "string" || publicSalIds.has(design.sal_id)) return;
      const known = KNOWN_ORPHAN_SAL_IDS.has(design.sal_id);
      const target = known ? warnings : errors;
      target.push(issue(
        known ? "warning" : "error",
        known ? "KNOWN_ORPHAN_SAL_DESIGN" : "ORPHAN_SAL_DESIGN",
        `$.salDisenos[${index}].sal_id`,
        known
          ? `El diseño ${String(design.id)} conserva la referencia conocida al SAL no público ${design.sal_id}.`
          : `El diseño ${String(design.id)} referencia un SAL inexistente: ${design.sal_id}.`,
      ));
    });
  }

  return finalizeAnalysis(candidate, errors, warnings, now);
}

function finalizeAnalysis(candidate, errors, warnings, now) {
  let canonicalJson = null;
  let checksum = null;

  try {
    canonicalJson = canonicalizeJson(candidate);
    checksum = sha256Hex(canonicalJson);
  } catch (error) {
    errors.push(issue(
      "error",
      "CANONICALIZATION_FAILED",
      "$",
      error instanceof Error ? error.message : "No se pudo canonicalizar el payload.",
    ));
  }

  const report = {
    result: errors.length === 0 ? "PASS" : "FAIL",
    validatedAt: now().toISOString(),
    contract: "WebsiteData@phase1",
    counts: collectionCounts(candidate),
    errors,
    warnings,
    checksum,
  };

  return {
    data: errors.length === 0 ? /** @type {WebsiteData} */ (candidate) : null,
    canonicalJson,
    report,
  };
}

export function contentIdentity(source, checksum) {
  if (typeof source !== "string" || source.trim() === "" || source !== source.trim()) {
    throw new TypeError("source debe ser una cadena no vacía y sin espacios exteriores.");
  }
  if (typeof checksum !== "string" || !/^[0-9a-f]{64}$/.test(checksum)) {
    throw new TypeError("checksum debe ser un SHA-256 hexadecimal en minúsculas.");
  }
  return JSON.stringify([source, checksum]);
}
