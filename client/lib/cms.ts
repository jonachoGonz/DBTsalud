export type Locale = "es" | "en";

const API_BASE = "/api/cms";

async function apiFetchJson<T>(
  input: string,
  init?: RequestInit,
  opts?: { timeoutMs?: number; retries?: number; retryDelayMs?: number },
): Promise<
  { ok: true; data: T } | { ok: false; error: string; status?: number }
> {
  const timeoutMs = Math.max(1_000, opts?.timeoutMs ?? 15_000);
  const retries = Math.max(0, opts?.retries ?? 0);
  const retryDelayMs = Math.max(0, opts?.retryDelayMs ?? 500);

  const isLikelyAbortMessage = (msg: string) =>
    msg.toLowerCase().includes("aborted") ||
    msg.toLowerCase().includes("abort") ||
    msg.toLowerCase().includes("signal is aborted");

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      try {
        controller.abort();
      } catch {
        // ignore
      }
    }, timeoutMs);

    try {
      const res = await fetch(input, {
        ...init,
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          ...(init?.headers || {}),
        },
      });

      const status = res.status;

      let json: any = null;
      try {
        json = await res.json();
      } catch {
        json = null;
      }

      if (!res.ok) {
        const baseMsg =
          (json && typeof json === "object" && (json.error || json.message)) ||
          `HTTP ${status}`;

        const reqId =
          json && typeof json === "object"
            ? json.requestId || json.requestID || json.request_id
            : undefined;
        const code =
          json && typeof json === "object"
            ? json.code || json.sysId
            : undefined;

        const suffixParts: string[] = [];
        if (code) suffixParts.push(`code=${String(code)}`);
        if (reqId) suffixParts.push(`requestId=${String(reqId)}`);

        const msg =
          suffixParts.length > 0
            ? `${String(baseMsg)} (${suffixParts.join(", ")})`
            : String(baseMsg);

        return { ok: false, error: msg, status };
      }

      return { ok: true, data: json as T };
    } catch (e: any) {
      const rawMessage = e?.message || String(e);
      const isAbort =
        e?.name === "AbortError" ||
        rawMessage === "signal is aborted without reason" ||
        isLikelyAbortMessage(rawMessage);

      const message = isAbort
        ? `Request timed out after ${timeoutMs}ms`
        : rawMessage;

      const isNetwork =
        !isAbort &&
        (rawMessage === "Failed to fetch" ||
          rawMessage.toLowerCase().includes("network") ||
          rawMessage.toLowerCase().includes("load failed"));

      const canRetry = (isNetwork || isAbort) && attempt < retries;
      if (canRetry) {
        await new Promise((r) => setTimeout(r, retryDelayMs));
        continue;
      }

      return { ok: false, error: message };
    } finally {
      clearTimeout(timeout);
    }
  }

  return { ok: false, error: "Unknown error" };
}

function getAdminAuthHeader(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const token = window.sessionStorage.getItem("adminBasicAuth");
  if (!token) return undefined;
  return `Basic ${token}`;
}

export type ContentEntry<T = any> = {
  id: string;
  key: string; // e.g. "header.hero", "about.section"
  locale: Locale;
  data: T; // JSON content per section
  updated_at: string;
};

export type SiteSettings = {
  id: string;
  theme: {
    colors: {
      primary: string;
      secondary: string;
      background?: string;
      foreground?: string;
    };
    typography: {
      fontFamily: string;
      baseSize: number; // px
      headingsScale?: number; // multiplier
    };
    assets: {
      logoUrl?: string;
      faviconUrl?: string;
      images?: Record<string, string>; // per-section image URLs
    };
  };
  updated_at: string;
};

// CONTENT
export async function fetchContent<T = any>(
  key: string,
  locale: Locale,
): Promise<T | null> {
  const url = `${API_BASE}/content?key=${encodeURIComponent(key)}&locale=${encodeURIComponent(locale)}`;
  const res = await apiFetchJson<{ data: T | null }>(url);
  if (res.ok === false) {
    console.error("fetchContent error", res.error);
    return null;
  }
  return res.data.data ?? null;
}

export async function upsertContent<T = any>(
  key: string,
  locale: Locale,
  data: T,
) {
  const auth = getAdminAuthHeader();
  const res = await apiFetchJson<{ ok: true }>(`${API_BASE}/content`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(auth ? { Authorization: auth } : {}),
    },
    body: JSON.stringify({ key, locale, data }),
  });
  if (res.ok === false) throw new Error(res.error);
}

export type CmsBackend = "contentful" | "supabase" | "local";

export async function listContentKeys(
  prefix?: string,
): Promise<{ keys: string[]; backend?: CmsBackend }> {
  const url = prefix
    ? `${API_BASE}/keys?prefix=${encodeURIComponent(prefix)}`
    : `${API_BASE}/keys`;
  const res = await apiFetchJson<{ keys: string[]; backend?: CmsBackend }>(url);
  if (res.ok === false) throw new Error(res.error);

  return {
    keys: Array.from(new Set(res.data.keys)).sort(),
    backend: res.data.backend,
  };
}

// SETTINGS
export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  const res = await apiFetchJson<{ settings: SiteSettings | null }>(
    `${API_BASE}/settings`,
    undefined,
    { retries: 1, retryDelayMs: 600 },
  );
  if (res.ok === false) {
    console.error("fetchSiteSettings error", res.error);
    return null;
  }
  return res.data.settings ?? null;
}

export async function upsertSiteSettings(
  settings: Partial<SiteSettings>["theme"],
) {
  const auth = getAdminAuthHeader();
  const res = await apiFetchJson<{ ok: true }>(`${API_BASE}/settings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(auth ? { Authorization: auth } : {}),
    },
    body: JSON.stringify({ theme: settings }),
  });
  if (res.ok === false) throw new Error(res.error);
  return null;
}

export type SeedContentfulResult = {
  ok: true;
  backend: "contentful";
  environment: string;
  locales: {
    defaultLocale: string;
    es: string;
    en: string;
  };
  seeded: {
    contentKeys: string[];
    styleKeys: string[];
    settings: true;
  };
  warnings?: string[];
  structured?: {
    stylesEnabled?: boolean;
  };
};

export async function seedContentful(): Promise<SeedContentfulResult> {
  const auth = getAdminAuthHeader();
  const res = await apiFetchJson<SeedContentfulResult>(
    `${API_BASE}/seed`,
    {
      method: "POST",
      headers: {
        ...(auth ? { Authorization: auth } : {}),
      },
    },
    { timeoutMs: 120_000 },
  );

  if (res.ok === false) throw new Error(res.error);
  return res.data;
}

export const SUPABASE_SCHEMA_SQL = `
-- enable extension for uuid
create extension if not exists pgcrypto;

-- content entries table
create table if not exists public.content_entries (
  id uuid primary key default gen_random_uuid(),
  key text not null,
  locale text not null check (locale in ('es','en')),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  unique (key, locale)
);

-- site wide settings
create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  theme jsonb not null default jsonb_build_object(
    'colors', jsonb_build_object('primary','#2e4c47','secondary','#CBEDE0'),
    'typography', jsonb_build_object('fontFamily','alegreya-sans, sans-serif','baseSize',16),
    'assets', jsonb_build_object('logoUrl','', 'faviconUrl','', 'images', '{}')
  ),
  updated_at timestamptz not null default now()
);

-- RLS and policies
alter table public.content_entries enable row level security;
alter table public.site_settings enable row level security;

-- public read policies
create policy if not exists public_read_content on public.content_entries for select using (true);
create policy if not exists public_read_settings on public.site_settings for select using (true);

-- temporary write policies (optional, can tighten later)
create policy if not exists admin_write_content on public.content_entries for insert with check (true);
create policy if not exists admin_update_content on public.content_entries for update using (true) with check (true);
create policy if not exists admin_write_settings on public.site_settings for insert with check (true);
create policy if not exists admin_update_settings on public.site_settings for update using (true) with check (true);

-- helper to upsert settings (single row)
create or replace function upsert_site_settings(payload jsonb)
returns void as $$
begin
  if exists (select 1 from site_settings) then
    update site_settings set theme = coalesce(theme, '{}'::jsonb) || payload, updated_at = now();
  else
    insert into site_settings(theme) values (payload);
  end if;
end;
$$ language plpgsql security definer;
`;
