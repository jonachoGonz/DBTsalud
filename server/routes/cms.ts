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
import {
  contentfulGetContent,
  contentfulGetSiteSettings,
  contentfulListKeys,
  contentfulUpsertContent,
  contentfulUpsertSiteSettings,
  isContentfulManagementConfigured,
} from "../contentful-store";
import { seedContentfulFromDefaults } from "../contentful-seed";

function sanitizeEnv(v?: string) {
  return (v || "").trim().replace(/^['\"]+|['\"]+$/g, "");
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

type Locale = z.infer<typeof localeSchema>;

const getContentQuerySchema = z.object({
  key: z.string().min(1),
  locale: localeSchema,
});

const upsertContentBodySchema = z.object({
  key: z.string().min(1),
  locale: localeSchema,
  data: z.unknown(),
});

function isContentfulUnknownContentType(err: any) {
  const status = err?.response?.status || err?.status;
  const errors = err?.response?.data?.details?.errors;
  if (status === 400 && Array.isArray(errors)) {
    return errors.some((e: any) => e?.name === "unknownContentType");
  }

  const msg =
    typeof err === "string" ? err : err?.message || String(err || "");
  return typeof msg === "string" && msg.includes("unknownContentType");
}

function shouldFallback(err: unknown) {
  if (isContentfulUnknownContentType(err as any)) return true;

  const msg =
    typeof err === "string" ? err : (err as any)?.message || String(err);
  return (
    msg.includes("fetch failed") ||
    msg.includes("ENOTFOUND") ||
    msg.includes("getaddrinfo") ||
    msg.includes("ECONNRESET") ||
    msg.includes("ETIMEDOUT")
  );
}

function hasSupabase() {
  return Boolean(supabaseServer);
}

export const handleGetContent: RequestHandler = async (req, res) => {
  const parsed = getContentQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid query" });
  }

  const { key, locale } = parsed.data;

  try {
    const cf = await contentfulGetContent(key, locale as Locale);
    if (cf.configured) {
      return res
        .status(200)
        .json({ data: cf.data ?? null, backend: "contentful" });
    }
  } catch (e: any) {
    if (!shouldFallback(e)) {
      return res.status(500).json({ error: e?.message || String(e) });
    }
  }

  if (hasSupabase()) {
    try {
      const { data, error } = await supabaseServer!
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

  if (isContentfulManagementConfigured()) {
    try {
      await contentfulUpsertContent(key, locale as Locale, data);
      return res.status(200).json({ ok: true, backend: "contentful" });
    } catch (e: any) {
      if (!shouldFallback(e)) {
        return res.status(500).json({ error: e?.message || String(e) });
      }
    }
  }

  if (hasSupabase()) {
    try {
      const { error } = await supabaseServer!
        .from("content_entries")
        .upsert([{ key, locale, data }], { onConflict: "key,locale" });

      if (!error) {
        return res.status(200).json({ ok: true, backend: "supabase" });
      }

      if (!shouldFallback(error)) {
        return res.status(500).json({ error: error.message });
      }
    } catch (e: any) {
      if (!shouldFallback(e)) {
        return res.status(500).json({ error: e?.message || String(e) });
      }
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
    const cf = await contentfulListKeys(prefix);
    if (cf.configured) {
      return res.status(200).json({ keys: cf.keys, backend: "contentful" });
    }
  } catch (e: any) {
    if (!shouldFallback(e)) {
      return res.status(500).json({ error: e?.message || String(e) });
    }
  }

  if (hasSupabase()) {
    try {
      let query = supabaseServer!.from("content_entries").select("key");
      if (prefix) query = query.like("key", `${prefix}%`);

      const { data, error } = await query;
      if (!error) {
        const set = new Set<string>();
        (data || []).forEach((row: any) => set.add(String(row.key)));
        return res
          .status(200)
          .json({ keys: Array.from(set).sort(), backend: "supabase" });
      }

      if (!shouldFallback(error)) {
        return res.status(500).json({ error: error.message });
      }
    } catch (e: any) {
      if (!shouldFallback(e)) {
        return res.status(500).json({ error: e?.message || String(e) });
      }
    }
  }

  const keys = await listLocalKeys(prefix);
  return res.status(200).json({ keys, backend: "local" });
};

export const handleGetSiteSettings: RequestHandler = async (_req, res) => {
  try {
    const cf = await contentfulGetSiteSettings();
    if (cf.configured) {
      return res
        .status(200)
        .json({ settings: cf.settings ?? null, backend: "contentful" });
    }
  } catch (e: any) {
    if (!shouldFallback(e)) {
      return res.status(500).json({ error: e?.message || String(e) });
    }
  }

  if (hasSupabase()) {
    try {
      const { data, error } = await supabaseServer!
        .from("site_settings")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (!error) {
        return res
          .status(200)
          .json({ settings: data ?? null, backend: "supabase" });
      }

      if (!shouldFallback(error)) {
        return res.status(500).json({ error: error.message });
      }
    } catch (e: any) {
      if (!shouldFallback(e)) {
        return res.status(500).json({ error: e?.message || String(e) });
      }
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

  if (isContentfulManagementConfigured()) {
    try {
      await contentfulUpsertSiteSettings(theme);
      return res.status(200).json({ ok: true, backend: "contentful" });
    } catch (e: any) {
      if (!shouldFallback(e)) {
        return res.status(500).json({ error: e?.message || String(e) });
      }
    }
  }

  if (hasSupabase()) {
    try {
      const { error } = await supabaseServer!.rpc("upsert_site_settings", {
        payload: theme,
      });

      if (!error) {
        return res.status(200).json({ ok: true, backend: "supabase" });
      }

      if (!shouldFallback(error)) {
        return res.status(500).json({ error: error.message });
      }
    } catch (e: any) {
      if (!shouldFallback(e)) {
        return res.status(500).json({ error: e?.message || String(e) });
      }
    }
  }

  await setLocalSettings(theme);
  return res.status(200).json({ ok: true, backend: "local" });
};

function formatContentfulError(e: any) {
  let status: any = e?.response?.status || e?.status;

  const requestId: any =
    e?.requestId ||
    e?.response?.headers?.["x-contentful-request-id"] ||
    e?.response?.headers?.["X-Contentful-Request-Id"] ||
    e?.response?.data?.requestId ||
    e?.response?.data?.sys?.id;

  let message: any =
    e?.response?.data?.message ||
    e?.response?.data?.details?.errors?.[0]?.message ||
    e?.message ||
    String(e);

  if (!status && typeof message === "string") {
    const trimmed = message.trim();
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (parsed && typeof parsed === "object") {
          status = parsed.status || status;
          message = parsed.message || message;
        }
      } catch {
        // ignore
      }
    }
  }

  if (status === 401 || status === 403) {
    return {
      status,
      requestId,
      message: `Contentful auth error (${status}): ${String(
        message,
      )}. Verifica que CONTENTFUL_MANAGEMENT_TOKEN sea un CMA (Personal Access Token) válido y que su usuario tenga acceso al Space y al Environment.`,
    };
  }

  return { status, requestId, message: String(message) };
}

export const handleSeedContentful: RequestHandler = async (req, res) => {
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const result = await seedContentfulFromDefaults();
    return res.status(200).json(result);
  } catch (e: any) {
    const err = formatContentfulError(e);
    return res
      .status(500)
      .json({ error: err.message, status: err.status, requestId: err.requestId });
  }
};
