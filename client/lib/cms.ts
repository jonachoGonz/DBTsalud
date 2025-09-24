import { supabase } from "@/lib/supabase";

export type Locale = "es" | "en";

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
  try {
    const { data, error } = await supabase
      .from("content_entries")
      .select("data")
      .eq("key", key)
      .eq("locale", locale)
      .maybeSingle();

    if (error) {
      console.error(
        "fetchContent error",
        error?.message || JSON.stringify(error),
      );
      return null;
    }
    return (data?.data as T) ?? null;
  } catch (e: any) {
    console.error("fetchContent error", e?.message || e);
    return null;
  }
}

export async function upsertContent<T = any>(
  key: string,
  locale: Locale,
  data: T,
) {
  const { error } = await supabase
    .from("content_entries")
    .upsert([{ key, locale, data }], { onConflict: "key,locale" });
  if (error) throw error;
}

export async function listContentKeys(prefix?: string): Promise<string[]> {
  let query = supabase.from("content_entries").select("key");
  if (prefix) query = query.like("key", `${prefix}%`);
  const { data, error } = await query;
  if (error) throw error;
  const set = new Set<string>();
  data?.forEach((row: any) => set.add(row.key));
  return Array.from(set).sort();
}

// SETTINGS
export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .maybeSingle();
    if (error) {
      console.error(
        "fetchSiteSettings error",
        error?.message || JSON.stringify(error),
      );
      return null;
    }
    return (data as SiteSettings) ?? null;
  } catch (e: any) {
    console.error("fetchSiteSettings error", e?.message || e);
    return null;
  }
}

export async function upsertSiteSettings(
  settings: Partial<SiteSettings>["theme"],
) {
  const { data, error } = await supabase.rpc("upsert_site_settings", {
    payload: settings,
  });
  if (error) throw error;
  return data;
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
