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

type ResolvedLocales = {
  defaultLocale: string;
  localeMap: Record<Locale, string>;
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

let resolvedLocalesCache: {
  cacheKey: string;
  promise: Promise<ResolvedLocales>;
} | null = null;

function pickLocaleCodeFromList(available: string[], preferred: string[]) {
  for (const p of preferred) {
    if (!p) continue;
    const exact = available.find((a) => a === p);
    if (exact) return exact;
  }

  for (const p of preferred) {
    if (!p) continue;
    const prefix = available.find((a) =>
      a.toLowerCase().startsWith(p.toLowerCase()),
    );
    if (prefix) return prefix;
  }

  return available[0] || "en-US";
}

async function resolveLocales(
  cfg: ContentfulStoreConfig,
): Promise<ResolvedLocales> {
  const cacheKey = `${cfg.spaceId}:${cfg.environment}`;
  if (resolvedLocalesCache?.cacheKey === cacheKey) {
    return resolvedLocalesCache.promise;
  }

  const promise = (async () => {
    try {
      const client: any = getDeliveryClient(cfg, false);
      const localesRes = await client.getLocales();
      const items: any[] = localesRes?.items || [];
      const codes = items.map((l) => String(l.code)).filter(Boolean);
      if (!codes.length) throw new Error("No locales found");

      const defaultLocale =
        items.find((l) => Boolean(l.default))?.code ||
        codes[0] ||
        cfg.defaultLocale ||
        "en-US";

      const es = pickLocaleCodeFromList(codes, [
        cfg.localeMap.es,
        "es-CL",
        "es-ES",
        "es",
      ]);
      const en = pickLocaleCodeFromList(codes, [
        cfg.localeMap.en,
        "en-US",
        "en-GB",
        "en",
      ]);

      return {
        defaultLocale: String(defaultLocale),
        localeMap: { es, en },
      };
    } catch {
      return {
        defaultLocale: cfg.defaultLocale,
        localeMap: cfg.localeMap,
      };
    }
  })();

  resolvedLocalesCache = { cacheKey, promise };
  return promise;
}

function pickLocaleValue<T>(
  fieldValue: unknown,
  localeCode: string,
  fallbackLocaleCode: string,
): T | null {
  if (fieldValue == null) return null;

  if (typeof fieldValue === "object" && !Array.isArray(fieldValue)) {
    const obj = fieldValue as any;

    if (localeCode in obj || fallbackLocaleCode in obj) {
      return (obj[localeCode] ?? obj[fallbackLocaleCode] ?? null) as T | null;
    }

    const keys = Object.keys(obj);
    const byPrefix = (code: string) =>
      keys.find((k) => k.toLowerCase().startsWith(code.toLowerCase()));

    const match = byPrefix(localeCode) || byPrefix(fallbackLocaleCode);
    if (match) return (obj[match] ?? null) as T | null;
  }

  return fieldValue as T;
}

function getDeliveryClient(cfg: ContentfulStoreConfig, usePreview: boolean) {
  return createClient({
    space: cfg.spaceId,
    environment: cfg.environment,
    accessToken: usePreview
      ? cfg.previewToken || cfg.deliveryToken
      : cfg.deliveryToken,
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

async function findContentEntryByKey(
  cfg: ContentfulStoreConfig,
  key: string,
  defaultLocale: string,
) {
  const client: any = getDeliveryClient(cfg, false);
  const allLocalesClient: any = client?.withAllLocales
    ? client.withAllLocales
    : client;

  const q: Record<string, any> = {
    content_type: cfg.contentTypeContentEntry,
    limit: 1,
    include: 10,
  };
  q[`fields.${cfg.fieldKey}`] = key;

  try {
    const resAllLocales = await allLocalesClient.getEntries(q);
    if (resAllLocales.items?.length) return resAllLocales.items[0] as any;

    const resDefault = await client.getEntries({ ...q, locale: defaultLocale });
    if (resDefault.items?.length) return resDefault.items[0] as any;

    return null;
  } catch (e: any) {
    if (isUnknownContentTypeError(e)) return null;
    throw e;
  }
}

type ContentfulIncludes = {
  Entry?: any[];
  Asset?: any[];
};

type DeliveryQueryResult = {
  item: any | null;
  includes: ContentfulIncludes | null;
};

function normalizeContentfulAssetUrl(url: string) {
  const trimmed = String(url || "").trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("//")) return `https:${trimmed}`;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://"))
    return trimmed;
  return `https://${trimmed.replace(/^\/+/, "")}`;
}

function buildIncludesIndex(includes: ContentfulIncludes | null) {
  const entriesById = new Map<string, any>();
  const assetsById = new Map<string, any>();

  for (const e of includes?.Entry || []) {
    const id = e?.sys?.id;
    if (id) entriesById.set(String(id), e);
  }

  for (const a of includes?.Asset || []) {
    const id = a?.sys?.id;
    if (id) assetsById.set(String(id), a);
  }

  return { entriesById, assetsById };
}

function isLinkToAsset(v: any) {
  return v?.sys?.type === "Link" && v?.sys?.linkType === "Asset" && v?.sys?.id;
}

function isLinkToEntry(v: any) {
  return v?.sys?.type === "Link" && v?.sys?.linkType === "Entry" && v?.sys?.id;
}

function isAsset(v: any) {
  return v?.sys?.type === "Asset" && v?.sys?.id;
}

function isEntry(v: any) {
  return v?.sys?.type === "Entry" && v?.sys?.id;
}

async function findDeliveryEntryByKey(
  cfg: ContentfulStoreConfig,
  contentType: string,
  key: string,
  defaultLocale: string,
): Promise<DeliveryQueryResult> {
  const client: any = getDeliveryClient(cfg, false);
  const allLocalesClient: any = client?.withAllLocales
    ? client.withAllLocales
    : client;

  const q: Record<string, any> = {
    content_type: contentType,
    limit: 1,
    include: 10,
  };
  q[`fields.${cfg.fieldKey}`] = key;

  try {
    const resAllLocales = await allLocalesClient.getEntries(q);
    if (resAllLocales.items?.length)
      return {
        item: resAllLocales.items[0] as any,
        includes: (resAllLocales.includes || null) as any,
      };

    const resDefault = await client.getEntries({
      ...q,
      locale: defaultLocale,
    });
    if (resDefault.items?.length)
      return {
        item: resDefault.items[0] as any,
        includes: (resDefault.includes || null) as any,
      };

    return { item: null, includes: null };
  } catch (e: any) {
    if (isUnknownContentTypeError(e)) return { item: null, includes: null };
    throw e;
  }
}

async function resolveAssetUrl(
  cfg: ContentfulStoreConfig,
  value: any,
  localeCode: string,
  fallbackLocaleCode: string,
  includes: ContentfulIncludes | null,
) {
  const deliveryClient: any = getDeliveryClient(cfg, false);
  const { assetsById } = buildIncludesIndex(includes);

  const urlFromAsset = (asset: any): string => {
    const file = pickLocaleValue<any>(
      asset?.fields?.file,
      localeCode,
      fallbackLocaleCode,
    );
    const rawUrl = file?.url || "";
    return normalizeContentfulAssetUrl(String(rawUrl));
  };

  if (!value) return "";

  if (typeof value === "string") return value;

  if (isLinkToAsset(value)) {
    const id = String(value.sys.id);
    const fromIncludes = assetsById.get(id);
    if (fromIncludes) return urlFromAsset(fromIncludes);

    try {
      const asset: any = await deliveryClient.getAsset(id, { locale: "*" });
      return urlFromAsset(asset);
    } catch {
      return "";
    }
  }

  if (isAsset(value)) return urlFromAsset(value);

  return "";
}

async function resolveEntry(
  cfg: ContentfulStoreConfig,
  value: any,
  includes: ContentfulIncludes | null,
) {
  const deliveryClient: any = getDeliveryClient(cfg, false);
  const { entriesById } = buildIncludesIndex(includes);

  if (!value) return null;
  if (isEntry(value)) return value;

  if (isLinkToEntry(value)) {
    const id = String(value.sys.id);
    const fromIncludes = entriesById.get(id);
    if (fromIncludes) return fromIncludes;

    try {
      const entry: any = await deliveryClient.getEntry(id, { locale: "*" });
      return entry;
    } catch {
      return null;
    }
  }

  return null;
}

const STRUCTURED_CONTENT_TYPES = {
  seo: "dbtSeo",
  header: "dbtHeader",
  about: "dbtAbout",
  spaces: "dbtSpaces",
  therapies: "dbtTherapies",
  services: "dbtServices",
  process: "dbtProcess",
  team: "dbtTeam",
  contact: "dbtContact",
  footer: "dbtFooter",

  // styles
  stylesGenerales: "dbtStylesGenerales",
  stylesHeader: "dbtStylesHeader",
  stylesAbout: "dbtStylesAbout",
  stylesSpaces: "dbtStylesSpaces",
  stylesTherapies: "dbtStylesTherapies",
  stylesServices: "dbtStylesServices",
  stylesProcess: "dbtStylesProcess",
  stylesTeam: "dbtStylesTeam",
  stylesContact: "dbtStylesContact",
  stylesFooter: "dbtStylesFooter",

  // item types
  spacesItem: "dbtSpacesItem",
  therapiesItem: "dbtTherapiesItem",
  servicesItem: "dbtServicesItem",
  processStep: "dbtProcessStep",
  teamMember: "dbtTeamMember",
} as const;

type StructuredKeyHandler = (args: {
  cfg: ContentfulStoreConfig;
  entry: any;
  includes: ContentfulIncludes | null;
  localeCode: string;
  fallbackLocaleCode: string;
}) => Promise<any>;

const STRUCTURED_KEY_TO_CONTENT_TYPE: Record<string, string> = {
  "luminous.seo": STRUCTURED_CONTENT_TYPES.seo,
  "luminous.header": STRUCTURED_CONTENT_TYPES.header,
  "luminous.about": STRUCTURED_CONTENT_TYPES.about,
  "luminous.spaces": STRUCTURED_CONTENT_TYPES.spaces,
  "luminous.therapies": STRUCTURED_CONTENT_TYPES.therapies,
  "luminous.services": STRUCTURED_CONTENT_TYPES.services,
  "luminous.process": STRUCTURED_CONTENT_TYPES.process,
  "luminous.team": STRUCTURED_CONTENT_TYPES.team,
  "luminous.contact": STRUCTURED_CONTENT_TYPES.contact,
  "luminous.footer": STRUCTURED_CONTENT_TYPES.footer,

  // styles (legacy: separate entries/types)
  "luminous.styles.generales": STRUCTURED_CONTENT_TYPES.stylesGenerales,
  "luminous.styles.header": STRUCTURED_CONTENT_TYPES.stylesHeader,
  "luminous.styles.about": STRUCTURED_CONTENT_TYPES.stylesAbout,
  "luminous.styles.spaces": STRUCTURED_CONTENT_TYPES.stylesSpaces,
  "luminous.styles.therapies": STRUCTURED_CONTENT_TYPES.stylesTherapies,
  "luminous.styles.services": STRUCTURED_CONTENT_TYPES.stylesServices,
  "luminous.styles.process": STRUCTURED_CONTENT_TYPES.stylesProcess,
  "luminous.styles.team": STRUCTURED_CONTENT_TYPES.stylesTeam,
  "luminous.styles.contact": STRUCTURED_CONTENT_TYPES.stylesContact,
  "luminous.styles.footer": STRUCTURED_CONTENT_TYPES.stylesFooter,
};

// Unification: allow reading section styles from the same section entry.
// Example: key "luminous.styles.about" will read from entry key "luminous.about" (content type dbtAbout)
// so editors manage content + styles in one place.
const UNIFIED_STYLE_KEY_TO_BASE_KEY: Record<string, string> = {
  "luminous.styles.header": "luminous.header",
  "luminous.styles.about": "luminous.about",
  "luminous.styles.spaces": "luminous.spaces",
  "luminous.styles.therapies": "luminous.therapies",
  "luminous.styles.services": "luminous.services",
  "luminous.styles.process": "luminous.process",
  "luminous.styles.team": "luminous.team",
  "luminous.styles.contact": "luminous.contact",
  "luminous.styles.footer": "luminous.footer",
};

const structuredHandlers: Record<string, StructuredKeyHandler> = {
  "luminous.seo": async ({ entry, localeCode, fallbackLocaleCode }) => {
    const title = pickLocaleValue<string>(
      entry.fields?.title,
      localeCode,
      fallbackLocaleCode,
    );
    const description = pickLocaleValue<string>(
      entry.fields?.description,
      localeCode,
      fallbackLocaleCode,
    );
    const canonical = pickLocaleValue<string>(
      entry.fields?.canonical,
      localeCode,
      fallbackLocaleCode,
    );
    const ogUrl = pickLocaleValue<string>(
      entry.fields?.ogUrl,
      localeCode,
      fallbackLocaleCode,
    );
    const ogImage = pickLocaleValue<string>(
      entry.fields?.ogImage,
      localeCode,
      fallbackLocaleCode,
    );
    const keywords = pickLocaleValue<string>(
      entry.fields?.keywords,
      localeCode,
      fallbackLocaleCode,
    );

    return {
      title: title ?? "",
      description: description ?? "",
      canonical: canonical ?? "",
      ogUrl: ogUrl ?? "",
      ogImage: ogImage ?? "",
      keywords: keywords ?? "",
    };
  },

  "luminous.header": async ({ cfg, entry, includes, localeCode, fallbackLocaleCode }) => {
    const backgroundImage = await resolveAssetUrl(
      cfg,
      pickLocaleValue<any>(
        entry.fields?.backgroundImage,
        localeCode,
        fallbackLocaleCode,
      ),
      localeCode,
      fallbackLocaleCode,
      includes,
    );

    return {
      title1:
        pickLocaleValue<string>(entry.fields?.title1, localeCode, fallbackLocaleCode) ??
        "",
      title2:
        pickLocaleValue<string>(entry.fields?.title2, localeCode, fallbackLocaleCode) ??
        "",
      subtitle1:
        pickLocaleValue<string>(
          entry.fields?.subtitle1,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
      subtitle2:
        pickLocaleValue<string>(
          entry.fields?.subtitle2,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
      cta1:
        pickLocaleValue<string>(entry.fields?.cta1, localeCode, fallbackLocaleCode) ??
        "",
      cta1Link:
        pickLocaleValue<string>(
          entry.fields?.cta1Link,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
      cta2:
        pickLocaleValue<string>(entry.fields?.cta2, localeCode, fallbackLocaleCode) ??
        "",
      cta2Link:
        pickLocaleValue<string>(
          entry.fields?.cta2Link,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
      backgroundImage,
    };
  },

  "luminous.about": async ({ cfg, entry, includes, localeCode, fallbackLocaleCode }) => {
    const image = await resolveAssetUrl(
      cfg,
      pickLocaleValue<any>(entry.fields?.image, localeCode, fallbackLocaleCode),
      localeCode,
      fallbackLocaleCode,
      includes,
    );

    return {
      title:
        pickLocaleValue<string>(entry.fields?.title, localeCode, fallbackLocaleCode) ??
        "",
      body:
        pickLocaleValue<string>(entry.fields?.body, localeCode, fallbackLocaleCode) ??
        "",
      linkText:
        pickLocaleValue<string>(
          entry.fields?.linkText,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
      linkUrl:
        pickLocaleValue<string>(entry.fields?.linkUrl, localeCode, fallbackLocaleCode) ??
        "",
      image,
    };
  },

  "luminous.spaces": async ({ cfg, entry, includes, localeCode, fallbackLocaleCode }) => {
    const items =
      pickLocaleValue<any[]>(entry.fields?.items, localeCode, fallbackLocaleCode) ||
      [];

    const resolvedItems: any[] = [];
    for (const it of items) {
      const child = await resolveEntry(cfg, it, includes);
      if (!child) continue;

      const image = await resolveAssetUrl(
        cfg,
        pickLocaleValue<any>(
          child.fields?.image,
          localeCode,
          fallbackLocaleCode,
        ),
        localeCode,
        fallbackLocaleCode,
        includes,
      );

      resolvedItems.push({
        title:
          pickLocaleValue<string>(
            child.fields?.title,
            localeCode,
            fallbackLocaleCode,
          ) ?? "",
        href:
          pickLocaleValue<string>(
            child.fields?.href,
            localeCode,
            fallbackLocaleCode,
          ) ?? "",
        image,
      });
    }

    return {
      eyebrow:
        pickLocaleValue<string>(
          entry.fields?.eyebrow,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
      title:
        pickLocaleValue<string>(entry.fields?.title, localeCode, fallbackLocaleCode) ??
        "",
      items: resolvedItems,
    };
  },

  "luminous.therapies": async ({ cfg, entry, includes, localeCode, fallbackLocaleCode }) => {
    const items =
      pickLocaleValue<any[]>(entry.fields?.items, localeCode, fallbackLocaleCode) ||
      [];

    const resolvedItems: any[] = [];
    for (const it of items) {
      const child = await resolveEntry(cfg, it, includes);
      if (!child) continue;

      const image = await resolveAssetUrl(
        cfg,
        pickLocaleValue<any>(
          child.fields?.image,
          localeCode,
          fallbackLocaleCode,
        ),
        localeCode,
        fallbackLocaleCode,
        includes,
      );

      resolvedItems.push({
        title:
          pickLocaleValue<string>(
            child.fields?.title,
            localeCode,
            fallbackLocaleCode,
          ) ?? "",
        desc:
          pickLocaleValue<string>(
            child.fields?.desc,
            localeCode,
            fallbackLocaleCode,
          ) ?? "",
        image,
      });
    }

    return {
      title:
        pickLocaleValue<string>(entry.fields?.title, localeCode, fallbackLocaleCode) ??
        "",
      items: resolvedItems,
    };
  },

  "luminous.services": async ({ cfg, entry, includes, localeCode, fallbackLocaleCode }) => {
    const items =
      pickLocaleValue<any[]>(entry.fields?.items, localeCode, fallbackLocaleCode) ||
      [];

    const resolvedItems: any[] = [];
    for (const it of items) {
      const child = await resolveEntry(cfg, it, includes);
      if (!child) continue;

      const image = await resolveAssetUrl(
        cfg,
        pickLocaleValue<any>(
          child.fields?.image,
          localeCode,
          fallbackLocaleCode,
        ),
        localeCode,
        fallbackLocaleCode,
        includes,
      );

      resolvedItems.push({
        title:
          pickLocaleValue<string>(
            child.fields?.title,
            localeCode,
            fallbackLocaleCode,
          ) ?? "",
        desc:
          pickLocaleValue<string>(
            child.fields?.desc,
            localeCode,
            fallbackLocaleCode,
          ) ?? "",
        image,
      });
    }

    return {
      title:
        pickLocaleValue<string>(entry.fields?.title, localeCode, fallbackLocaleCode) ??
        "",
      subtitle:
        pickLocaleValue<string>(
          entry.fields?.subtitle,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
      items: resolvedItems,
    };
  },

  "luminous.process": async ({ cfg, entry, includes, localeCode, fallbackLocaleCode }) => {
    const steps =
      pickLocaleValue<any[]>(entry.fields?.steps, localeCode, fallbackLocaleCode) ||
      [];

    const resolvedSteps: any[] = [];
    for (const it of steps) {
      const child = await resolveEntry(cfg, it, includes);
      if (!child) continue;

      resolvedSteps.push({
        number:
          pickLocaleValue<string>(
            child.fields?.number,
            localeCode,
            fallbackLocaleCode,
          ) ?? "",
        title:
          pickLocaleValue<string>(
            child.fields?.title,
            localeCode,
            fallbackLocaleCode,
          ) ?? "",
        description:
          pickLocaleValue<string>(
            child.fields?.description,
            localeCode,
            fallbackLocaleCode,
          ) ?? "",
      });
    }

    return {
      title:
        pickLocaleValue<string>(entry.fields?.title, localeCode, fallbackLocaleCode) ??
        "",
      intro:
        pickLocaleValue<string>(entry.fields?.intro, localeCode, fallbackLocaleCode) ??
        "",
      steps: resolvedSteps,
    };
  },

  "luminous.team": async ({ cfg, entry, includes, localeCode, fallbackLocaleCode }) => {
    const members =
      pickLocaleValue<any[]>(
        entry.fields?.members,
        localeCode,
        fallbackLocaleCode,
      ) || [];

    const resolvedMembers: any[] = [];
    for (const it of members) {
      const child = await resolveEntry(cfg, it, includes);
      if (!child) continue;

      const image = await resolveAssetUrl(
        cfg,
        pickLocaleValue<any>(
          child.fields?.image,
          localeCode,
          fallbackLocaleCode,
        ),
        localeCode,
        fallbackLocaleCode,
        includes,
      );

      resolvedMembers.push({
        name:
          pickLocaleValue<string>(
            child.fields?.name,
            localeCode,
            fallbackLocaleCode,
          ) ?? "",
        description:
          pickLocaleValue<string>(
            child.fields?.description,
            localeCode,
            fallbackLocaleCode,
          ) ?? "",
        image,
        specialties:
          pickLocaleValue<string[]>(
            child.fields?.specialties,
            localeCode,
            fallbackLocaleCode,
          ) || [],
      });
    }

    return {
      title:
        pickLocaleValue<string>(entry.fields?.title, localeCode, fallbackLocaleCode) ??
        "",
      members: resolvedMembers,
    };
  },

  "luminous.contact": async ({ entry, localeCode, fallbackLocaleCode }) => {
    return {
      title:
        pickLocaleValue<string>(entry.fields?.title, localeCode, fallbackLocaleCode) ??
        "",
      address:
        pickLocaleValue<string>(
          entry.fields?.address,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
      whatsapp:
        pickLocaleValue<string>(
          entry.fields?.whatsapp,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
      instagram:
        pickLocaleValue<string>(
          entry.fields?.instagram,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
      email:
        pickLocaleValue<string>(entry.fields?.email, localeCode, fallbackLocaleCode) ??
        "",
      hours: {
        weekdays:
          pickLocaleValue<string>(
            entry.fields?.hoursWeekdays,
            localeCode,
            fallbackLocaleCode,
          ) ?? "",
        saturday:
          pickLocaleValue<string>(
            entry.fields?.hoursSaturday,
            localeCode,
            fallbackLocaleCode,
          ) ?? "",
        sunday:
          pickLocaleValue<string>(
            entry.fields?.hoursSunday,
            localeCode,
            fallbackLocaleCode,
          ) ?? "",
      },
    };
  },

  "luminous.footer": async ({ entry, localeCode, fallbackLocaleCode }) => {
    return {
      quote:
        pickLocaleValue<string>(entry.fields?.quote, localeCode, fallbackLocaleCode) ??
        "",
      text:
        pickLocaleValue<string>(entry.fields?.text, localeCode, fallbackLocaleCode) ??
        "",
    };
  },

  // styles handlers
  "luminous.styles.generales": async ({ entry, localeCode, fallbackLocaleCode }) => {
    return {
      colors: {
        primary:
          pickLocaleValue<string>(
            entry.fields?.primary,
            localeCode,
            fallbackLocaleCode,
          ) ?? "",
        secondary:
          pickLocaleValue<string>(
            entry.fields?.secondary,
            localeCode,
            fallbackLocaleCode,
          ) ?? "",
      },
      typography: {
        fontFamily:
          pickLocaleValue<string>(
            entry.fields?.fontFamily,
            localeCode,
            fallbackLocaleCode,
          ) ?? "",
        baseSize:
          pickLocaleValue<number>(
            entry.fields?.baseSize,
            localeCode,
            fallbackLocaleCode,
          ) ?? 16,
      },
      assets: {
        logoUrl:
          pickLocaleValue<string>(
            entry.fields?.logoUrl,
            localeCode,
            fallbackLocaleCode,
          ) ?? "",
      },
    };
  },

  "luminous.styles.header": async ({ entry, localeCode, fallbackLocaleCode }) => {
    return {
      title1Color:
        pickLocaleValue<string>(
          entry.fields?.title1Color,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
      title2Color:
        pickLocaleValue<string>(
          entry.fields?.title2Color,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
      title1Size:
        pickLocaleValue<number>(
          entry.fields?.title1Size,
          localeCode,
          fallbackLocaleCode,
        ) ?? 48,
      title2Size:
        pickLocaleValue<number>(
          entry.fields?.title2Size,
          localeCode,
          fallbackLocaleCode,
        ) ?? 40,
      subtitle1Color:
        pickLocaleValue<string>(
          entry.fields?.subtitle1Color,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
      subtitle2Color:
        pickLocaleValue<string>(
          entry.fields?.subtitle2Color,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
    };
  },

  "luminous.styles.about": async ({ cfg, entry, includes, localeCode, fallbackLocaleCode }) => {
    const backgroundImage = await resolveAssetUrl(
      cfg,
      pickLocaleValue<any>(
        entry.fields?.backgroundImage,
        localeCode,
        fallbackLocaleCode,
      ),
      localeCode,
      fallbackLocaleCode,
      includes,
    );

    return {
      titleColor:
        pickLocaleValue<string>(
          entry.fields?.titleColor,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
      bodyColor:
        pickLocaleValue<string>(
          entry.fields?.bodyColor,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
      backgroundColor:
        pickLocaleValue<string>(
          entry.fields?.backgroundColor,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
      titleSize:
        pickLocaleValue<number>(
          entry.fields?.titleSize,
          localeCode,
          fallbackLocaleCode,
        ) ?? 50,
      bodySize:
        pickLocaleValue<number>(
          entry.fields?.bodySize,
          localeCode,
          fallbackLocaleCode,
        ) ?? 18,
      backgroundImage,
    };
  },

  "luminous.styles.spaces": async ({ entry, localeCode, fallbackLocaleCode }) => {
    return {
      textColor:
        pickLocaleValue<string>(
          entry.fields?.textColor,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
      speedSeconds:
        pickLocaleValue<number>(
          entry.fields?.speedSeconds,
          localeCode,
          fallbackLocaleCode,
        ) ?? 25.6,
    };
  },

  "luminous.styles.therapies": async ({ entry, localeCode, fallbackLocaleCode }) => {
    return {
      titleColor:
        pickLocaleValue<string>(
          entry.fields?.titleColor,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
      itemTitleColor:
        pickLocaleValue<string>(
          entry.fields?.itemTitleColor,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
      itemDescColor:
        pickLocaleValue<string>(
          entry.fields?.itemDescColor,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
    };
  },

  "luminous.styles.services": async ({ entry, localeCode, fallbackLocaleCode }) => {
    return {
      titleColor:
        pickLocaleValue<string>(
          entry.fields?.titleColor,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
      subtitleColor:
        pickLocaleValue<string>(
          entry.fields?.subtitleColor,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
      itemTitleColor:
        pickLocaleValue<string>(
          entry.fields?.itemTitleColor,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
    };
  },

  "luminous.styles.process": async ({ entry, localeCode, fallbackLocaleCode }) => {
    return {
      titleColor:
        pickLocaleValue<string>(
          entry.fields?.titleColor,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
      introColor:
        pickLocaleValue<string>(
          entry.fields?.introColor,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
      stepTitleColor:
        pickLocaleValue<string>(
          entry.fields?.stepTitleColor,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
      stepDescColor:
        pickLocaleValue<string>(
          entry.fields?.stepDescColor,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
    };
  },

  "luminous.styles.team": async ({ entry, localeCode, fallbackLocaleCode }) => {
    return {
      titleColor:
        pickLocaleValue<string>(
          entry.fields?.titleColor,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
      nameColor:
        pickLocaleValue<string>(
          entry.fields?.nameColor,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
      roleColor:
        pickLocaleValue<string>(
          entry.fields?.roleColor,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
    };
  },

  "luminous.styles.contact": async ({ entry, localeCode, fallbackLocaleCode }) => {
    return {
      titleColor:
        pickLocaleValue<string>(
          entry.fields?.titleColor,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
      infoColor:
        pickLocaleValue<string>(
          entry.fields?.infoColor,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
    };
  },

  "luminous.styles.footer": async ({ entry, localeCode, fallbackLocaleCode }) => {
    return {
      textColor:
        pickLocaleValue<string>(
          entry.fields?.textColor,
          localeCode,
          fallbackLocaleCode,
        ) ?? "",
    };
  },
};

const STRUCTURED_EMPTY = Symbol("structured-empty");

function isStructuredResultEmpty(key: string, data: any) {
  if (!data || typeof data !== "object") return true;

  const hasAnyText = (...values: any[]) =>
    values.some((v) => typeof v === "string" && v.trim().length > 0);

  if (key === "luminous.header") {
    return !hasAnyText(
      data.title1,
      data.title2,
      data.subtitle1,
      data.subtitle2,
      data.cta1,
      data.cta2,
      data.backgroundImage,
    );
  }

  if (key === "luminous.about") {
    return !hasAnyText(data.title, data.body, data.image);
  }

  if (key === "luminous.spaces") {
    return !hasAnyText(data.eyebrow, data.title) && !(data.items?.length > 0);
  }

  if (key === "luminous.therapies" || key === "luminous.services") {
    return !hasAnyText(data.title, data.subtitle) && !(data.items?.length > 0);
  }

  if (key === "luminous.process") {
    return !hasAnyText(data.title, data.intro) && !(data.steps?.length > 0);
  }

  if (key === "luminous.team") {
    return !hasAnyText(data.title) && !(data.members?.length > 0);
  }

  if (key === "luminous.contact") {
    return !hasAnyText(
      data.title,
      data.address,
      data.whatsapp,
      data.instagram,
      data.email,
      data?.hours?.weekdays,
      data?.hours?.saturday,
      data?.hours?.sunday,
    );
  }

  if (key === "luminous.footer") {
    return !hasAnyText(data.quote, data.text);
  }

  if (key === "luminous.seo") {
    return !hasAnyText(data.title, data.description, data.canonical, data.ogUrl);
  }

  // styles
  if (key.startsWith("luminous.styles.")) {
    // If nothing is set, keep using legacy JSON so existing styling doesn't change.
    const stack: any[] = [data];
    while (stack.length) {
      const cur = stack.pop();
      if (typeof cur === "string" && cur.trim().length > 0) return false;
      if (typeof cur === "number" && Number.isFinite(cur)) return false;
      if (cur && typeof cur === "object") {
        for (const v of Object.values(cur)) stack.push(v);
      }
    }
    return true;
  }

  return false;
}

async function tryGetStructuredContent(
  cfg: ContentfulStoreConfig,
  locale: Locale,
  resolved: ResolvedLocales,
  key: string,
) {
  const contentType = STRUCTURED_KEY_TO_CONTENT_TYPE[key];
  const handler = structuredHandlers[key];
  if (!contentType || !handler) return undefined;

  const { item, includes } = await findDeliveryEntryByKey(
    cfg,
    contentType,
    key,
    resolved.defaultLocale,
  );

  if (!item) return STRUCTURED_EMPTY;

  const localeCode = resolved.localeMap[locale] || resolved.defaultLocale;
  const data = await handler({
    cfg,
    entry: item,
    includes,
    localeCode,
    fallbackLocaleCode: resolved.defaultLocale,
  });

  if (isStructuredResultEmpty(key, data)) return STRUCTURED_EMPTY;

  return data;
}

export async function contentfulGetContent<T = any>(
  key: string,
  locale: Locale,
) {
  const cfg = getConfig();
  if (!cfg) return { configured: false as const, data: null as T | null };

  const resolved = await resolveLocales(cfg);

  try {
    const structured = await tryGetStructuredContent(cfg, locale, resolved, key);
    if (structured !== undefined && structured !== STRUCTURED_EMPTY) {
      return { configured: true as const, data: (structured as any) as T | null };
    }

    const entry: any = await findContentEntryByKey(
      cfg,
      key,
      resolved.defaultLocale,
    );
    if (!entry) return { configured: true as const, data: null as T | null };

    const localeCode = resolved.localeMap[locale] || resolved.defaultLocale;
    const data = pickLocaleValue<T>(
      entry.fields?.[cfg.fieldData],
      localeCode,
      resolved.defaultLocale,
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
  const allLocalesClient: any = client?.withAllLocales
    ? client.withAllLocales
    : client;

  const keys = new Set<string>();
  let skip = 0;
  const limit = 1000;

  const resolved = await resolveLocales(cfg);

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
          resolved.defaultLocale,
          resolved.defaultLocale,
        );
        if (typeof k === "string" && (!prefix || k.startsWith(prefix)))
          keys.add(k);
      }

      const total = page.total ?? 0;
      skip += page.items.length;
      if (skip >= total || page.items.length === 0) break;
    }

    // Also include structured types (if they exist). This keeps the in-app admin
    // key list useful even when the site is managed via structured Contentful models.
    const structuredTypes = Array.from(
      new Set(Object.values(STRUCTURED_KEY_TO_CONTENT_TYPE)),
    );

    for (const ct of structuredTypes) {
      try {
        let s = 0;
        while (true) {
          const page = await allLocalesClient.getEntries({
            content_type: ct,
            select: `fields.${cfg.fieldKey}`,
            limit,
            skip: s,
          });

          for (const item of page.items as any[]) {
            const k = pickLocaleValue<string>(
              item.fields?.[cfg.fieldKey],
              resolved.defaultLocale,
              resolved.defaultLocale,
            );
            if (typeof k === "string" && (!prefix || k.startsWith(prefix)))
              keys.add(k);
          }

          const total = page.total ?? 0;
          s += page.items.length;
          if (s >= total || page.items.length === 0) break;
        }
      } catch (e: any) {
        if (!isUnknownContentTypeError(e)) throw e;
      }
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
  const allLocalesClient: any = client?.withAllLocales
    ? client.withAllLocales
    : client;

  try {
    const page = await allLocalesClient.getEntries({
      content_type: cfg.contentTypeSiteSettings,
      limit: 1,
    });

    const item: any = page.items?.[0];
    if (!item) return { configured: true as const, settings: null as any };

    const resolved = await resolveLocales(cfg);
    const theme = pickLocaleValue<any>(
      item.fields?.[cfg.fieldTheme],
      resolved.defaultLocale,
      resolved.defaultLocale,
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

async function findManagementEntryByKey(
  cfg: ContentfulStoreConfig,
  key: string,
) {
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

export async function contentfulUpsertContent(
  key: string,
  locale: Locale,
  data: unknown,
) {
  const cfg = getConfig();
  if (!cfg) return { configured: false as const, ok: false as const };
  if (!cfg.managementToken) {
    throw new Error("Contentful management token not configured");
  }

  const envApi = await getManagementEnvironment(cfg);
  const existing = await findManagementEntryByKey(cfg, key);

  const resolved = await resolveLocales(cfg);
  const localeCode = resolved.localeMap[locale] || resolved.defaultLocale;

  if (existing) {
    existing.fields[cfg.fieldKey] = existing.fields[cfg.fieldKey] || {};
    existing.fields[cfg.fieldKey][resolved.defaultLocale] = key;

    existing.fields[cfg.fieldData] = existing.fields[cfg.fieldData] || {};
    existing.fields[cfg.fieldData][localeCode] = data;

    const updated = await existing.update();
    await safePublish(updated as any);
    return { configured: true as const, ok: true as const };
  }

  const fields: any = {
    [cfg.fieldKey]: { [resolved.defaultLocale]: key },
    [cfg.fieldData]: { [localeCode]: data },
  };

  const created = await envApi.createEntry(cfg.contentTypeContentEntry, {
    fields,
  });
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
    const resolved = await resolveLocales(cfg);
    existing.fields[cfg.fieldTheme] = existing.fields[cfg.fieldTheme] || {};
    existing.fields[cfg.fieldTheme][resolved.defaultLocale] = theme;
    const updated = await existing.update();
    await safePublish(updated as any);
    return { configured: true as const, ok: true as const };
  }

  const resolved = await resolveLocales(cfg);
  const created = await envApi.createEntry(cfg.contentTypeSiteSettings, {
    fields: { [cfg.fieldTheme]: { [resolved.defaultLocale]: theme } },
  });
  await safePublish(created as any);
  return { configured: true as const, ok: true as const };
}
