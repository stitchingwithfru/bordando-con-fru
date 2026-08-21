import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createWebsiteDataPublisher } from "./publisher.mjs";

const inputPath = resolve(process.argv[2] || "website-data-backup.json");
const source = "local-backup:website-data-backup.json";

let raw;
let candidate;

try {
  raw = await readFile(inputPath);
  candidate = JSON.parse(raw.toString("utf8"));
} catch (error) {
  console.error(JSON.stringify({
    mode: "dry-run",
    input: inputPath,
    validation: "FAIL",
    errors: [{
      code: "INPUT_READ_FAILED",
      message: error instanceof Error ? error.message : "No se pudo leer el backup.",
    }],
    supabaseWrites: 0,
  }, null, 2));
  process.exitCode = 1;
  process.exit();
}

const publisher = createWebsiteDataPublisher();
const result = await publisher.prepare(candidate, { source, dryRun: true });
const output = {
  mode: "dry-run",
  input: inputPath,
  source,
  validation: result.analysis.report.result,
  rawFileChecksum: createHash("sha256").update(raw).digest("hex"),
  canonicalChecksum: result.analysis.report.checksum,
  counts: result.analysis.report.counts,
  warnings: result.analysis.report.warnings,
  errors: result.analysis.report.errors,
  plannedOperation: result.operation,
  supabaseWrites: result.supabaseWrites,
};

console.log(JSON.stringify(output, null, 2));
if (output.validation !== "PASS") process.exitCode = 1;
