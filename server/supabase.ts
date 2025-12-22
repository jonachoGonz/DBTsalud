import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function sanitizeEnv(v?: string) {
  return (v || "").trim().replace(/^['\"]+|['\"]+$/g, "");
}

function getEnv(...keys: string[]) {
  for (const k of keys) {
    const v = sanitizeEnv(process.env[k]);
    if (v) return v;
  }
  return "";
}

const supabaseUrl = getEnv(
  "SUPABASE_URL",
  "VITE_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_URL",
);

const supabaseAnonKey = getEnv(
  "SUPABASE_ANON_KEY",
  "VITE_SUPABASE_ANON_KEY",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
);

export const supabaseServer: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null;
