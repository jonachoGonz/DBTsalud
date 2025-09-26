import { createClient } from "@supabase/supabase-js";

function sanitizeEnv(v?: string) {
  return (v || "").trim().replace(/^['"]+|['"]+$/g, "");
}

const supabaseUrl = sanitizeEnv(import.meta.env.VITE_SUPABASE_URL);
const supabaseAnonKey = sanitizeEnv(import.meta.env.VITE_SUPABASE_ANON_KEY);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
