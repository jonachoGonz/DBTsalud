import { createClient } from "contentful";
import contentfulManagement from "contentful-management";

export type Locale = "es" | "en";

type ContentfulStoreConfig = {
  spaceId: string;
  environment: string;
  deliveryToken: string;
  previewToken?: string;
  managementToken?: string;
  defaultLocale: string;
  localeMap: Record<Locale, string>;
  contentTypeContentEntry: string;
  contentTypeSiteSettings: string;
  fieldKey: string;
  fieldData: string;
  fieldTheme: string;
};

function sanitizeEnv(v?: string) {
  return (v || "").trim().replace(/^['"]+|['"]+$/g, "");
}

function env(key: string) {
  return sanitizeEnv(process.env[key]);
}

function normalizeContentfulId(value: string, fallback: string) {
  const v = sanitizeEnv(value);
  if (!v) return fallback;
  if (v.toUpperCase() === "DOESNOTEXIST") return fallback;
  return v;
}

function isUnknownContentTypeError(e: any) {
  const status = e?.response?.status || e?.status;
  const errs = e?.response?.data?.details?.errors;
  if (status !== 400 || !Array.isArray(errs)) return false;
  return errs.some((x: any) => x?.name === "unknownContentType");
}

function getConfig(): ContentfulStoreConfig | null {
  const spaceId = env("CONTENTFUL_SPACE_ID");
  const deliveryToken = env("CONTENTFUL_DELIVERY_TOKEN");

  if (!spaceId || !deliveryToken) return null;

  const environment = env("CONTENTFUL_ENVIRONMENT") || "master";

  const defaultLocale =
    env("CONTENTFUL_DEFAULT_LOCALE") ||
    env("CONTENTFUL_DEFAULT_LOCALE_CODE") ||
    "en-US";

  const localeEs = env("CONTENTFUL_LOCALE_ES") || "es";
  const localeEn = env("CONTENTFUL_LOCALE_EN") || "en";

  const contentTypeContentEntry = normalizeContentfulId(
    env("CONTENTFUL_CONTENT_ENTRY_TYPE"),
    "contentEntry",
  );
  const contentTypeSiteSettings = normalizeContentfulId(
    env("CONTENTFUL_SITE_SETTINGS_TYPE"),
    "siteSettings",
  );

  const fieldKey = env("CONTENTFUL_FIELD_KEY") || "key";
  const fieldData = env("CONTENTFUL_FIELD_DATA") || "data";
  const fieldTheme = env("CONTENTFUL_FIELD_THEME") || "theme";

  const previewToken = env("CONTENTFUL_PREVIEW_TOKEN") || undefined;
  const managementToken = env("CONTENTFUL_MANAGEMENT_TOKEN") || undefined;

  return {
    spaceId,
    environment,
    deliveryToken,
    previewToken,
    managementToken,
    defaultLocale,
    localeMap: { es: localeEs, en: localeEn },
    contentTypeContentEntry,
    contentTypeSiteSettings,
    fieldKey,
    fieldData,
    fieldTheme,
  };
}

function mappedLocale(cfg: ContentfulStoreConfig, locale: Locale) {
  return cfg.localeMap[locale] || cfg.defaultLocale;
}

function pickLocaleValue<T>(
  fieldValue: unknown,
  localeCode: string,
  fallbackLocaleCode: string,
): T | null {
  if (fieldValue == null) return null;

  if (
    typeof fieldValue === "object" &&
    !Array.isArray(fieldValue) &&
    (localeCode in (fieldValue as any) || fallbackLocaleCode in (fieldValue as any))
  ) {
    const obj = fieldValue as any;
    return (obj[localeCode] ?? obj[fallbackLocaleCode] ?? null) as T | null;
  }

  return fieldValue as T;
}

function getDeliveryClient(cfg: ContentfulStoreConfig, usePreview: boolean) {
  return createClient({
    space: cfg.spaceId,
    environment: cfg.environment,
    accessToken: usePreview ? cfg.previewToken || cfg.deliveryToken : cfg.deliveryToken,
    host: usePreview ? "preview.contentful.com" : undefined,
  });
}

export function isContentfulDeliveryConfigured() {
  return getConfig() != null;
}

export function isContentfulManagementConfigured() {
  const cfg = getConfig();
  return Boolean(cfg?.managementToken);
}

async function findContentEntryByKey(cfg: ContentfulStoreConfig, key: string) {
  const client: any = getDeliveryClient(cfg, false);
  const allLocalesClient: any = client?.withAllLocales ? client.withAllLocales : client;

  const q: Record<string, any> = {
    content_type: cfg.contentTypeContentEntry,
    limit: 1,
  };
  q[`fields.${cfg.fieldKey}`] = key;

  try {
    const resAllLocales = await allLocalesClient.getEntries(q);
    if (resAllLocales.items?.length) return resAllLocales.items[0] as any;

    const resDefault = await client.getEntries({ ...q, locale: cfg.defaultLocale });
    if (resDefault.items?.length) return resDefault.items[0] as any;

    return null;
  } catch (e: any) {
    if (isUnknownContentTypeError(e)) return null;
    throw e;
  }
}

export async function contentfulGetContent<T = any>(key: string, locale: Locale) {
  const cfg = getConfig();
  if (!cfg) return { configured: false as const, data: null as T | null };

  try {
    const entry: any = await findContentEntryByKey(cfg, key);
    if (!entry) return { configured: true as const, data: null as T | null };

    const localeCode = mappedLocale(cfg, locale);
    const data = pickLocaleValue<T>(
      entry.fields?.[cfg.fieldData],
      localeCode,
      cfg.defaultLocale,
    );
    return { configured: true as const, data };
  } catch (e: any) {
    if (isUnknownContentTypeError(e)) {
      return { configured: false as const, data: null as T | null };
    }
    throw e;
  }
}

export async function contentfulListKeys(prefix?: string) {
  const cfg = getConfig();
  if (!cfg) return { configured: false as const, keys: [] as string[] };

  const client: any = getDeliveryClient(cfg, false);
  const allLocalesClient: any = client?.withAllLocales ? client.withAllLocales : client;

  const keys = new Set<string>();
  let skip = 0;
  const limit = 1000;

  try {
    while (true) {
      const q: Record<string, any> = {
        content_type: cfg.contentTypeContentEntry,
        select: `fields.${cfg.fieldKey}`,
        limit,
        skip,
      };

      const page = await allLocalesClient.getEntries(q);
      for (const item of page.items as any[]) {
        const k = pickLocaleValue<string>(
          item.fields?.[cfg.fieldKey],
          cfg.defaultLocale,
          cfg.defaultLocale,
        );
        if (typeof k === "string" && (!prefix || k.startsWith(prefix))) keys.add(k);
      }

      const total = page.total ?? 0;
      skip += page.items.length;
      if (skip >= total || page.items.length === 0) break;
    }

    return { configured: true as const, keys: Array.from(keys).sort() };
  } catch (e: any) {
    if (isUnknownContentTypeError(e)) {
      return { configured: false as const, keys: [] as string[] };
    }
    throw e;
  }
}

export async function contentfulGetSiteSettings() {
  const cfg = getConfig();
  if (!cfg) return { configured: false as const, settings: null as any };

  const client: any = getDeliveryClient(cfg, false);
  const allLocalesClient: any = client?.withAllLocales ? client.withAllLocales : client;

  try {
    const page = await allLocalesClient.getEntries({
      content_type: cfg.contentTypeSiteSettings,
      limit: 1,
    });

    const item: any = page.items?.[0];
    if (!item) return { configured: true as const, settings: null as any };

    const theme = pickLocaleValue<any>(
      item.fields?.[cfg.fieldTheme],
      cfg.defaultLocale,
      cfg.defaultLocale,
    );
    const settings = theme
      ? {
          id: item.sys?.id || "contentful",
          theme,
          updated_at: item.sys?.updatedAt || new Date().toISOString(),
        }
      : null;

    return { configured: true as const, settings };
  } catch (e: any) {
    if (isUnknownContentTypeError(e)) {
      return { configured: false as const, settings: null as any };
    }
    throw e;
  }
}

async function getManagementEnvironment(cfg: ContentfulStoreConfig) {
  if (!cfg.managementToken) {
    throw new Error("Contentful management token not configured");
  }

  const client = (contentfulManagement as any).createClient({
    accessToken: cfg.managementToken,
  });
  const space = await client.getSpace(cfg.spaceId);
  return space.getEnvironment(cfg.environment);
}

async function findManagementEntryByKey(cfg: ContentfulStoreConfig, key: string) {
  const envApi = await getManagementEnvironment(cfg);
  const q: Record<string, any> = {
    content_type: cfg.contentTypeContentEntry,
    limit: 1,
  };
  q[`fields.${cfg.fieldKey}`] = key;
  const res: any = await envApi.getEntries(q);
  return (res?.items && res.items[0]) || null;
}

async function safePublish(entry: any) {
  try {
    if (typeof entry?.publish !== "function") return entry;
    return await entry.publish();
  } catch {
    return entry;
  }
}

export async function contentfulUpsertContent(key: string, locale: Locale, data: unknown) {
  const cfg = getConfig();
  if (!cfg) return { configured: false as const, ok: false as const };
  if (!cfg.managementToken) {
    throw new Error("Contentful management token not configured");
  }

  const envApi = await getManagementEnvironment(cfg);
  const existing = await findManagementEntryByKey(cfg, key);

  const localeCode = mappedLocale(cfg, locale);

  if (existing) {
    existing.fields[cfg.fieldKey] = existing.fields[cfg.fieldKey] || {};
    existing.fields[cfg.fieldKey][cfg.defaultLocale] = key;

    existing.fields[cfg.fieldData] = existing.fields[cfg.fieldData] || {};
    existing.fields[cfg.fieldData][localeCode] = data;

    const updated = await existing.update();
    await safePublish(updated as any);
    return { configured: true as const, ok: true as const };
  }

  const fields: any = {
    [cfg.fieldKey]: { [cfg.defaultLocale]: key },
    [cfg.fieldData]: { [localeCode]: data },
  };

  const created = await envApi.createEntry(cfg.contentTypeContentEntry, { fields });
  await safePublish(created as any);
  return { configured: true as const, ok: true as const };
}

export async function contentfulUpsertSiteSettings(theme: unknown) {
  const cfg = getConfig();
  if (!cfg) return { configured: false as const, ok: false as const };
  if (!cfg.managementToken) {
    throw new Error("Contentful management token not configured");
  }

  const envApi = await getManagementEnvironment(cfg);
  const res: any = await envApi.getEntries({
    content_type: cfg.contentTypeSiteSettings,
    limit: 1,
  });

  const existing = (res.items && res.items[0]) || null;

  if (existing) {
    existing.fields[cfg.fieldTheme] = existing.fields[cfg.fieldTheme] || {};
    existing.fields[cfg.fieldTheme][cfg.defaultLocale] = theme;
    const updated = await existing.update();
    await safePublish(updated as any);
    return { configured: true as const, ok: true as const };
  }

  const created = await envApi.createEntry(cfg.contentTypeSiteSettings, {
    fields: { [cfg.fieldTheme]: { [cfg.defaultLocale]: theme } },
  });
  await safePublish(created as any);
  return { configured: true as const, ok: true as const };
}
