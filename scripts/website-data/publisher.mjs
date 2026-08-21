import { analyzeWebsiteData, contentIdentity } from "./website-data.mjs";

function requireWritesEnabled({ dryRun, allowRemoteWrites }) {
  if (dryRun || allowRemoteWrites !== true) {
    throw new Error("Las escrituras requieren dryRun=false y allowRemoteWrites=true de forma explícita.");
  }
}

/**
 * Adaptador futuro para @supabase/supabase-js. Recibe un cliente administrativo
 * server-side ya creado; este módulo nunca lee credenciales ni crea clientes.
 */
export class SupabaseSnapshotRepository {
  constructor(client) {
    if (!client) throw new TypeError("Falta el cliente Supabase administrativo.");
    this.client = client;
  }

  async findBySourceAndChecksum(source, checksum) {
    const { data, error } = await this.client
      .from("website_data_snapshots")
      .select("id, version, source, source_checksum, status, captured_at, validated_at, activated_at")
      .eq("source", source)
      .eq("source_checksum", checksum)
      .maybeSingle();
    if (error) throw error;
    return data;
  }

  async insertPending(candidate) {
    const { data, error } = await this.client
      .from("website_data_snapshots")
      .insert({
        payload: candidate.payload,
        source: candidate.source,
        source_checksum: candidate.checksum,
        captured_at: candidate.capturedAt,
        status: "pending",
        validation_report: candidate.validationReport,
      })
      .select("id, version, source, source_checksum, status, captured_at, validated_at, activated_at")
      .single();
    if (error) throw error;
    return data;
  }

  async markValidated(snapshotId, validationReport, validatedAt) {
    const { data, error } = await this.client
      .from("website_data_snapshots")
      .update({
        status: "validated",
        validation_report: validationReport,
        validated_at: validatedAt,
      })
      .eq("id", snapshotId)
      .select("id, version, source, source_checksum, status, captured_at, validated_at, activated_at")
      .single();
    if (error) throw error;
    return data;
  }

  async activateValidated(snapshotId) {
    const { data, error } = await this.client.rpc("activate_website_data_snapshot", {
      p_snapshot_id: snapshotId,
    });
    if (error) throw error;
    return data;
  }
}

export function createWebsiteDataPublisher({ repository = null, now = () => new Date() } = {}) {
  return {
    async prepare(candidate, {
      source,
      capturedAt = now().toISOString(),
      dryRun = true,
      allowRemoteWrites = false,
    } = {}) {
      const analysis = analyzeWebsiteData(candidate, { now });

      if (analysis.report.result === "FAIL") {
        return {
          outcome: "blocked",
          operation: "none-validation-failed",
          identity: null,
          analysis,
          supabaseWrites: 0,
        };
      }

      const identity = contentIdentity(source, analysis.report.checksum);
      if (dryRun) {
        return {
          outcome: "dry-run",
          operation: "would-check-idempotency-then-create-or-reuse-pending-and-mark-validated",
          identity,
          analysis,
          supabaseWrites: 0,
        };
      }

      requireWritesEnabled({ dryRun, allowRemoteWrites });
      if (!repository) throw new Error("Falta un repositorio de snapshots para preparar la publicación.");

      let snapshot = await repository.findBySourceAndChecksum(source, analysis.report.checksum);
      let operation = "reused-existing";

      if (!snapshot) {
        snapshot = await repository.insertPending({
          payload: JSON.parse(analysis.canonicalJson),
          source,
          checksum: analysis.report.checksum,
          capturedAt,
          validationReport: analysis.report,
        });
        operation = "created-pending";
      }

      if (snapshot.status !== "validated" && snapshot.status !== "active") {
        snapshot = await repository.markValidated(snapshot.id, analysis.report, analysis.report.validatedAt);
        operation = operation === "created-pending" ? "created-and-validated" : "reused-and-validated";
      }

      return {
        outcome: "prepared",
        operation,
        identity,
        analysis,
        snapshot,
      };
    },

    async activate(snapshotId, { dryRun = true, allowRemoteWrites = false } = {}) {
      if (typeof snapshotId !== "string" || snapshotId.trim() === "") {
        throw new TypeError("snapshotId debe ser una cadena no vacía.");
      }

      if (dryRun) {
        return {
          outcome: "dry-run",
          operation: "would-call-activate_website_data_snapshot",
          snapshotId,
          supabaseWrites: 0,
        };
      }

      requireWritesEnabled({ dryRun, allowRemoteWrites });
      if (!repository) throw new Error("Falta un repositorio de snapshots para activar la publicación.");

      return {
        outcome: "activated",
        operation: "called-activate_website_data_snapshot",
        snapshot: await repository.activateValidated(snapshotId),
      };
    },
  };
}
