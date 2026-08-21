import {
  createSupabaseAdminClientFromEnvironment,
  createSupabaseAnonClientFromEnvironment,
} from "./supabase-node-clients.mjs";
import { reportSummary, verifyOperationalState } from "./operational-guards.mjs";

const admin = createSupabaseAdminClientFromEnvironment();
const anon = createSupabaseAnonClientFromEnvironment();
const state = await verifyOperationalState({ admin, anon });

console.log(JSON.stringify({
  operation: "website-data-check",
  result: "PASS",
  writes: 0,
  counts: state.counts,
  active: {
    id: state.active.id,
    version: state.active.version,
    source: state.active.source,
    checksum: state.active.source_checksum,
    capturedAt: state.active.captured_at,
    validatedAt: state.active.validated_at,
    activatedAt: state.active.activated_at,
  },
  contract: reportSummary(state.analysis),
  publicAnon: {
    rowsVisible: state.publicRowsVisible,
    checksum: state.publicAnalysis.report.checksum,
    matchesActive: state.publicAnalysis.report.checksum === state.active.source_checksum,
  },
}, null, 2));
