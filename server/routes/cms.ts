import type { RequestHandler } from "express";
import { z } from "zod";
import { supabaseServer } from "../supabase";
import {
  getLocalContent,
  getLocalSettings,
  listLocalKeys,
  setLocalContent,
  setLocalSettings,
} from "../cms-store";

function sanitizeEnv(v?: string) {
  return (v || "").trim().replace(/^['"]+|['"]+$/g, "");
}

function getAdminCreds() {
  const user =
    sanitizeEnv(process.env.ADMIN_USER) ||
    sanitizeEnv(process.env.VITE_ADMIN_USER) ||
    "admin";
  const password =
    sanitizeEnv(process.env.ADMIN_PASSWORD) ||
    sanitizeEnv(process.env.VITE_ADMIN_PASSWORD) ||
    "qpsych2025!";
  return { user, password };
}

function isAuthorized(req: any) {
  const header = String(req.headers?.authorization || "");
  if (!header.startsWith("Basic ")) return false;
  const token = header.slice("Basic ".length).trim();
  if (!token) return false;

  let decoded = "";
  try {
    decoded = Buffer.from(token, "base64").toString("utf8");
  } catch {
    return false;
  }

  const idx = decoded.indexOf(":");
  if (idx < 0) return false;
  const u = decoded.slice(0, idx);
  const p = decoded.slice(idx + 1);

  const { user, password } = getAdminCreds();
  return u === user && p === password;
}

const localeSchema = z.enum(["es", "en"]);

const getContentQuerySchema = z.object({
  key: z.string().min(1),
  locale: localeSchema,
});

const upsertContentBodySchema = z.object({
  key: z.string().min(1),
  locale: localeSchema,
  data: z.unknown(),
});

function shouldFallback(err: unknown) {
  const msg =
    typeof err === "string" ? err : (err as any)?.message || String(err);
  return (
    msg.includes("fetch failed") ||
    msg.includes("ENOTFOUND") ||
    msg.includes("getaddrinfo")
  );
}

export const handleGetContent: RequestHandler = async (req, res) => {
  const parsed = getContentQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid query" });
  }

  const { key, locale } = parsed.data;

  try {
    const { data, error } = await supabaseServer
      .from("content_entries")
      .select("data")
      .eq("key", key)
      .eq("locale", locale)
      .maybeSingle();

    if (!error) {
      return res.status(200).json({ data: (data as any)?.data ?? null });
    }

    if (!shouldFallback(error)) {
      return res.status(500).json({ error: error.message });
    }
  } catch (e: any) {
    if (!shouldFallback(e)) {
      return res.status(500).json({ error: e?.message || String(e) });
    }
  }

  const local = await getLocalContent(key, locale);
  return res.status(200).json({ data: local, backend: "local" });
};

export const handleUpsertContent: RequestHandler = async (req, res) => {
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const parsed = upsertContentBodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid body" });
  }

  const { key, locale, data } = parsed.data;

  try {
    const { error } = await supabaseServer
      .from("content_entries")
      .upsert([{ key, locale, data }], { onConflict: "key,locale" });

    if (!error) {
      return res.status(200).json({ ok: true });
    }

    if (!shouldFallback(error)) {
      return res.status(500).json({ error: error.message });
    }
  } catch (e: any) {
    if (!shouldFallback(e)) {
      return res.status(500).json({ error: e?.message || String(e) });
    }
  }

  await setLocalContent(key, locale, data);
  return res.status(200).json({ ok: true, backend: "local" });
};

const listKeysQuerySchema = z.object({
  prefix: z.string().optional(),
});

export const handleListKeys: RequestHandler = async (req, res) => {
  const parsed = listKeysQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid query" });
  }

  const prefix = parsed.data.prefix;

  try {
    let query = supabaseServer.from("content_entries").select("key");
    if (prefix) query = query.like("key", `${prefix}%`);

    const { data, error } = await query;
    if (!error) {
      const set = new Set<string>();
      (data || []).forEach((row: any) => set.add(String(row.key)));
      return res.status(200).json({ keys: Array.from(set).sort() });
    }

    if (!shouldFallback(error)) {
      return res.status(500).json({ error: error.message });
    }
  } catch (e: any) {
    if (!shouldFallback(e)) {
      return res.status(500).json({ error: e?.message || String(e) });
    }
  }

  const keys = await listLocalKeys(prefix);
  return res.status(200).json({ keys, backend: "local" });
};

export const handleGetSiteSettings: RequestHandler = async (_req, res) => {
  try {
    const { data, error } = await supabaseServer
      .from("site_settings")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (!error) {
      return res.status(200).json({ settings: data ?? null });
    }

    if (!shouldFallback(error)) {
      return res.status(500).json({ error: error.message });
    }
  } catch (e: any) {
    if (!shouldFallback(e)) {
      return res.status(500).json({ error: e?.message || String(e) });
    }
  }

  const local = await getLocalSettings();
  return res.status(200).json({ settings: local ?? null, backend: "local" });
};

const upsertSettingsBodySchema = z.object({
  theme: z.record(z.any()),
});

export const handleUpsertSiteSettings: RequestHandler = async (req, res) => {
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const parsed = upsertSettingsBodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid body" });
  }

  const { theme } = parsed.data;

  try {
    const { error } = await supabaseServer.rpc("upsert_site_settings", {
      payload: theme,
    });

    if (!error) {
      return res.status(200).json({ ok: true });
    }

    if (!shouldFallback(error)) {
      return res.status(500).json({ error: error.message });
    }
  } catch (e: any) {
    if (!shouldFallback(e)) {
      return res.status(500).json({ error: e?.message || String(e) });
    }
  }

  await setLocalSettings(theme);
  return res.status(200).json({ ok: true, backend: "local" });
};
