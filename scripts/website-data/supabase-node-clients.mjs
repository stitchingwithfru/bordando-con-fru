import { existsSync } from "node:fs";
import { loadEnvFile } from "node:process";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const localEnvironmentPath = fileURLToPath(new URL("../../.env.local", import.meta.url));
if (existsSync(localEnvironmentPath)) loadEnvFile(localEnvironmentPath);

function requireEnvironment(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Falta la variable de entorno ${name}.`);
  return value;
}

const auth = Object.freeze({
  persistSession: false,
  autoRefreshToken: false,
  detectSessionInUrl: false,
});

/** Cliente privilegiado exclusivo para procesos Node server-side. */
export function createSupabaseAdminClientFromEnvironment() {
  return createClient(
    requireEnvironment("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnvironment("SUPABASE_SECRET_KEY"),
    { auth },
  );
}

/** Cliente público sin sesión para verificar RLS exactamente como anon. */
export function createSupabaseAnonClientFromEnvironment() {
  return createClient(
    requireEnvironment("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnvironment("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"),
    { auth },
  );
}
