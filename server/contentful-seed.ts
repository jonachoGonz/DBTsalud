import contentfulManagement from "contentful-management";

type ParsedContentfulError = {
  status?: number;
  message: string;
  requestId?: string;
  code?: string;
};

function parseContentfulError(e: any): ParsedContentfulError {
  const directStatus = e?.response?.status || e?.status;
  const directMessage =
    e?.response?.data?.message ||
    e?.response?.data?.details?.errors?.[0]?.message ||
    e?.message ||
    String(e);
  const directRequestId =
    e?.requestId ||
    e?.response?.headers?.["x-contentful-request-id"] ||
    e?.response?.data?.requestId;
  const directCode = e?.response?.data?.sys?.id;

  if (typeof directMessage === "string") {
    const trimmed = directMessage.trim();
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (parsed && typeof parsed === "object") {
          return {
            status: Number(parsed.status) || directStatus,
            message: String(parsed.message || directMessage),
            requestId:
              String(parsed.requestId || directRequestId || "") || undefined,
            code: String(parsed.sys?.id || directCode || "") || undefined,
          };
        }
      } catch {
        // ignore
      }
    }
  }

  return {
    status: typeof directStatus === "number" ? directStatus : undefined,
    message: String(directMessage),
    requestId: directRequestId ? String(directRequestId) : undefined,
    code: directCode ? String(directCode) : undefined,
  };
}

async function runStep<T>(label: string, fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (e: any) {
    const info = parseContentfulError(e);
    const extra = [
      info.status ? `status=${info.status}` : null,
      info.code ? `code=${info.code}` : null,
      info.requestId ? `requestId=${info.requestId}` : null,
    ]
      .filter(Boolean)
      .join(", ");

    const msg = extra
      ? `Contentful seed failed at "${label}": ${info.message} (${extra})`
      : `Contentful seed failed at "${label}": ${info.message}`;

    const err = new Error(msg);
    (err as any).cause = e;
    throw err;
  }
}

export type SeedLocale = "es" | "en";

type LocaleInfo = {
  code: string;
  default?: boolean;
};

function sanitize(v?: string) {
  return (v || "").trim().replace(/^['\"]+|['\"]+$/g, "");
}

function requireEnv(key: string) {
  const v = sanitize(process.env[key]);
  if (!v) throw new Error(`Missing required env var: ${key}`);
  return v;
}

function env(key: string, fallback?: string) {
  const v = sanitize(process.env[key]);
  return v || fallback || "";
}

function pickLocale(locales: LocaleInfo[], preferred: string[]) {
  for (const p of preferred) {
    const exact = locales.find((l) => l.code === p);
    if (exact) return exact.code;
  }
  for (const p of preferred) {
    const prefix = locales.find((l) =>
      l.code.toLowerCase().startsWith(p.toLowerCase()),
    );
    if (prefix) return prefix.code;
  }
  const def = locales.find((l) => l.default);
  return def?.code || locales[0]?.code || "en-US";
}

async function ensureLocale(
  envApi: any,
  code: string,
  name: string,
  fallbackCode: string,
) {
  try {
    await envApi.getLocale(code);
    return;
  } catch (e: any) {
    const info = parseContentfulError(e);
    if ((info.status || 0) !== 404) throw e;
  }

  await envApi.createLocale({
    code,
    name,
    fallbackCode,
    optional: false,
  });
}

async function ensureContentType(envApi: any, id: string, spec: any) {
  try {
    await envApi.getContentType(id);
    return;
  } catch (e: any) {
    const info = parseContentfulError(e);
    const status = info.status || 0;
    if (status !== 404) throw e;
  }

  const created = await envApi.createContentTypeWithId(id, spec);
  await created.publish();
}

function guessImageContentType(url: string) {
  const u = String(url || "").toLowerCase();
  if (u.includes(".png")) return "image/png";
  if (u.includes(".webp")) return "image/webp";
  if (u.includes(".avif")) return "image/avif";
  if (u.includes(".gif")) return "image/gif";
  return "image/jpeg";
}

function guessImageFileExtension(url: string) {
  const u = String(url || "").toLowerCase();
  if (u.includes(".png")) return "png";
  if (u.includes(".webp")) return "webp";
  if (u.includes(".avif")) return "avif";
  if (u.includes(".gif")) return "gif";
  return "jpg";
}

async function ensureAssetFromUrl(envApi: any, defaultLocale: string, title: string, url: string) {
  const safeTitle = title.trim();
  if (!safeTitle) throw new Error("Missing asset title");
  if (!url) throw new Error(`Missing asset url for ${safeTitle}`);

  try {
    const existing = await envApi.getAssets({
      limit: 1,
      "fields.title": safeTitle,
    });
    if (existing?.items?.length) {
      return existing.items[0];
    }
  } catch {
    // ignore search errors
  }

  const fileName = `${safeTitle}.${guessImageFileExtension(url)}`;

  const asset = await envApi.createAsset({
    fields: {
      title: { [defaultLocale]: safeTitle },
      file: {
        [defaultLocale]: {
          contentType: guessImageContentType(url),
          fileName,
          upload: url,
        },
      },
    },
  });

  const processed = await asset.processForAllLocales();

  // Processing is async in Contentful. We retry a few times until the file URL appears.
  let ready = processed;
  for (let i = 0; i < 10; i++) {
    const reloaded = await ready.reload();
    const file = reloaded?.fields?.file?.[defaultLocale];
    if (file?.url) {
      ready = reloaded;
      break;
    }
    await new Promise((r) => setTimeout(r, 1000));
    ready = reloaded;
  }

  try {
    await ready.publish();
  } catch {
    // ignore publish errors (e.g., already published)
  }

  return ready;
}

function linkToAsset(asset: any) {
  return { sys: { type: "Link", linkType: "Asset", id: asset.sys.id } };
}

function linkToEntry(entry: any) {
  return { sys: { type: "Link", linkType: "Entry", id: entry.sys.id } };
}

async function findEntryByKey(envApi: any, contentType: string, key: string) {
  const q: Record<string, any> = { content_type: contentType, limit: 1 };
  q["fields.key"] = key;
  const res: any = await envApi.getEntries(q);
  return (res?.items && res.items[0]) || null;
}

async function upsertEntryByKey(envApi: any, contentType: string, key: string, fields: any) {
  const existing = await findEntryByKey(envApi, contentType, key);

  if (existing) {
    existing.fields = { ...existing.fields, ...fields };
    const updated = await existing.update();
    try {
      await updated.publish();
    } catch {
      // ignore
    }
    return updated;
  }

  const created = await envApi.createEntry(contentType, { fields });
  try {
    await created.publish();
  } catch {
    // ignore
  }
  return created;
}

export async function seedContentfulFromDefaults() {
  const spaceId = requireEnv("CONTENTFUL_SPACE_ID");
  const managementToken = requireEnv("CONTENTFUL_MANAGEMENT_TOKEN");
  const environmentId = env("CONTENTFUL_ENVIRONMENT", "master");

  const contentTypeContentEntry = env(
    "CONTENTFUL_CONTENT_ENTRY_TYPE",
    "contentEntry",
  );
  const contentTypeSiteSettings = env(
    "CONTENTFUL_SITE_SETTINGS_TYPE",
    "siteSettings",
  );

  const cmAny: any = contentfulManagement as any;
  const createMgmtClient = cmAny?.createClient || cmAny?.default?.createClient;
  if (typeof createMgmtClient !== "function") {
    throw new Error("contentful-management client factory not found");
  }

  const mgmtClient = createMgmtClient({
    accessToken: managementToken,
  });

  const space = await runStep("getSpace", async () =>
    mgmtClient.getSpace(spaceId),
  );
  const envApi = await runStep("getEnvironment", async () =>
    space.getEnvironment(environmentId),
  );

  let localesRes = await runStep("getLocales", async () => envApi.getLocales());
  let locales: LocaleInfo[] = (localesRes?.items || []).map((l: any) => ({
    code: String(l.code),
    default: Boolean(l.default),
  }));

  if (!locales.length) {
    throw new Error("No locales found in Contentful environment");
  }

  const defaultLocale = locales.find((l) => l.default)?.code || locales[0].code;

  const desiredEs = env("CONTENTFUL_LOCALE_ES") || "es-CL";
  const desiredEn = env("CONTENTFUL_LOCALE_EN") || "en-US";

  if (!locales.some((l) => l.code.toLowerCase().startsWith("es"))) {
    await runStep(`ensureLocale:${desiredEs}`, async () =>
      ensureLocale(envApi, desiredEs, "Spanish", defaultLocale),
    );
  }

  if (!locales.some((l) => l.code.toLowerCase().startsWith("en"))) {
    await runStep(`ensureLocale:${desiredEn}`, async () =>
      ensureLocale(envApi, desiredEn, "English", defaultLocale),
    );
  }

  localesRes = await runStep("getLocales:afterEnsure", async () =>
    envApi.getLocales(),
  );
  locales = (localesRes?.items || []).map((l: any) => ({
    code: String(l.code),
    default: Boolean(l.default),
  }));

  const localeEs = pickLocale(locales, [desiredEs, "es-CL", "es-ES", "es"]);
  const localeEn = pickLocale(locales, [desiredEn, "en-US", "en-GB", "en"]);

  process.env.CONTENTFUL_DEFAULT_LOCALE = defaultLocale;
  process.env.CONTENTFUL_LOCALE_ES = localeEs;
  process.env.CONTENTFUL_LOCALE_EN = localeEn;

  await runStep(`ensureContentType:${contentTypeContentEntry}`, async () =>
    ensureContentType(envApi, contentTypeContentEntry, {
      name: "Content Entry",
      displayField: "key",
      fields: [
        {
          id: "key",
          name: "Key",
          type: "Symbol",
          required: true,
          localized: false,
        },
        {
          id: "data",
          name: "Data",
          type: "Object",
          required: false,
          localized: true,
        },
      ],
    }),
  );

  await runStep(`ensureContentType:${contentTypeSiteSettings}`, async () =>
    ensureContentType(envApi, contentTypeSiteSettings, {
      name: "Site Settings",
      displayField: "name",
      fields: [
        {
          id: "name",
          name: "Name",
          type: "Symbol",
          required: true,
          localized: false,
        },
        {
          id: "theme",
          name: "Theme",
          type: "Object",
          required: false,
          localized: false,
        },
      ],
    }),
  );

  // Structured types for managing content directly in Contentful (field editors + asset uploads)
  await runStep("ensureContentType:dbtSeo", async () =>
    ensureContentType(envApi, "dbtSeo", {
      name: "DBT SEO",
      displayField: "key",
      fields: [
        { id: "key", name: "Key", type: "Symbol", required: true, localized: false },
        { id: "title", name: "Title", type: "Symbol", required: false, localized: true },
        { id: "description", name: "Description", type: "Text", required: false, localized: true },
        { id: "canonical", name: "Canonical", type: "Symbol", required: false, localized: true },
        { id: "ogUrl", name: "OG Url", type: "Symbol", required: false, localized: true },
        { id: "ogImage", name: "OG Image", type: "Symbol", required: false, localized: true },
        { id: "keywords", name: "Keywords", type: "Text", required: false, localized: true },
      ],
    }),
  );

  await runStep("ensureContentType:dbtHeader", async () =>
    ensureContentType(envApi, "dbtHeader", {
      name: "DBT Header",
      displayField: "key",
      fields: [
        { id: "key", name: "Key", type: "Symbol", required: true, localized: false },
        { id: "title1", name: "Title 1", type: "Symbol", required: false, localized: true },
        { id: "title2", name: "Title 2", type: "Symbol", required: false, localized: true },
        { id: "subtitle1", name: "Subtitle 1", type: "Text", required: false, localized: true },
        { id: "subtitle2", name: "Subtitle 2", type: "Text", required: false, localized: true },
        { id: "cta1", name: "CTA 1", type: "Symbol", required: false, localized: true },
        { id: "cta1Link", name: "CTA 1 Link", type: "Symbol", required: false, localized: true },
        { id: "cta2", name: "CTA 2", type: "Symbol", required: false, localized: true },
        { id: "cta2Link", name: "CTA 2 Link", type: "Symbol", required: false, localized: true },
        {
          id: "backgroundImage",
          name: "Background Image",
          type: "Link",
          linkType: "Asset",
          required: false,
          localized: false,
        },
      ],
    }),
  );

  await runStep("ensureContentType:dbtAbout", async () =>
    ensureContentType(envApi, "dbtAbout", {
      name: "DBT About",
      displayField: "key",
      fields: [
        { id: "key", name: "Key", type: "Symbol", required: true, localized: false },
        { id: "title", name: "Title", type: "Symbol", required: false, localized: true },
        { id: "body", name: "Body", type: "Text", required: false, localized: true },
        { id: "linkText", name: "Link Text", type: "Symbol", required: false, localized: true },
        { id: "linkUrl", name: "Link Url", type: "Symbol", required: false, localized: true },
        {
          id: "image",
          name: "Image",
          type: "Link",
          linkType: "Asset",
          required: false,
          localized: false,
        },
      ],
    }),
  );

  await runStep("ensureContentType:dbtSpacesItem", async () =>
    ensureContentType(envApi, "dbtSpacesItem", {
      name: "DBT Spaces Item",
      displayField: "key",
      fields: [
        { id: "key", name: "Key", type: "Symbol", required: true, localized: false },
        { id: "title", name: "Title", type: "Symbol", required: false, localized: true },
        { id: "href", name: "Href", type: "Symbol", required: false, localized: true },
        {
          id: "image",
          name: "Image",
          type: "Link",
          linkType: "Asset",
          required: false,
          localized: false,
        },
      ],
    }),
  );

  await runStep("ensureContentType:dbtSpaces", async () =>
    ensureContentType(envApi, "dbtSpaces", {
      name: "DBT Spaces",
      displayField: "key",
      fields: [
        { id: "key", name: "Key", type: "Symbol", required: true, localized: false },
        { id: "eyebrow", name: "Eyebrow", type: "Symbol", required: false, localized: true },
        { id: "title", name: "Title", type: "Symbol", required: false, localized: true },
        {
          id: "items",
          name: "Items",
          type: "Array",
          required: false,
          localized: false,
          items: {
            type: "Link",
            linkType: "Entry",
            validations: [{ linkContentType: ["dbtSpacesItem"] }],
          },
        },
      ],
    }),
  );

  await runStep("ensureContentType:dbtTherapiesItem", async () =>
    ensureContentType(envApi, "dbtTherapiesItem", {
      name: "DBT Therapy Item",
      displayField: "key",
      fields: [
        { id: "key", name: "Key", type: "Symbol", required: true, localized: false },
        { id: "title", name: "Title", type: "Symbol", required: false, localized: true },
        { id: "desc", name: "Description", type: "Text", required: false, localized: true },
        {
          id: "image",
          name: "Image",
          type: "Link",
          linkType: "Asset",
          required: false,
          localized: false,
        },
      ],
    }),
  );

  await runStep("ensureContentType:dbtTherapies", async () =>
    ensureContentType(envApi, "dbtTherapies", {
      name: "DBT Therapies",
      displayField: "key",
      fields: [
        { id: "key", name: "Key", type: "Symbol", required: true, localized: false },
        { id: "title", name: "Title", type: "Symbol", required: false, localized: true },
        {
          id: "items",
          name: "Items",
          type: "Array",
          required: false,
          localized: false,
          items: {
            type: "Link",
            linkType: "Entry",
            validations: [{ linkContentType: ["dbtTherapiesItem"] }],
          },
        },
      ],
    }),
  );

  await runStep("ensureContentType:dbtServicesItem", async () =>
    ensureContentType(envApi, "dbtServicesItem", {
      name: "DBT Services Item",
      displayField: "key",
      fields: [
        { id: "key", name: "Key", type: "Symbol", required: true, localized: false },
        { id: "title", name: "Title", type: "Symbol", required: false, localized: true },
        { id: "desc", name: "Description", type: "Text", required: false, localized: true },
        {
          id: "image",
          name: "Image",
          type: "Link",
          linkType: "Asset",
          required: false,
          localized: false,
        },
      ],
    }),
  );

  await runStep("ensureContentType:dbtServices", async () =>
    ensureContentType(envApi, "dbtServices", {
      name: "DBT Services",
      displayField: "key",
      fields: [
        { id: "key", name: "Key", type: "Symbol", required: true, localized: false },
        { id: "title", name: "Title", type: "Symbol", required: false, localized: true },
        { id: "subtitle", name: "Subtitle", type: "Text", required: false, localized: true },
        {
          id: "items",
          name: "Items",
          type: "Array",
          required: false,
          localized: false,
          items: {
            type: "Link",
            linkType: "Entry",
            validations: [{ linkContentType: ["dbtServicesItem"] }],
          },
        },
      ],
    }),
  );

  await runStep("ensureContentType:dbtProcessStep", async () =>
    ensureContentType(envApi, "dbtProcessStep", {
      name: "DBT Process Step",
      displayField: "key",
      fields: [
        { id: "key", name: "Key", type: "Symbol", required: true, localized: false },
        { id: "number", name: "Number", type: "Symbol", required: false, localized: true },
        { id: "title", name: "Title", type: "Symbol", required: false, localized: true },
        { id: "description", name: "Description", type: "Text", required: false, localized: true },
      ],
    }),
  );

  await runStep("ensureContentType:dbtProcess", async () =>
    ensureContentType(envApi, "dbtProcess", {
      name: "DBT Process",
      displayField: "key",
      fields: [
        { id: "key", name: "Key", type: "Symbol", required: true, localized: false },
        { id: "title", name: "Title", type: "Symbol", required: false, localized: true },
        { id: "intro", name: "Intro", type: "Text", required: false, localized: true },
        {
          id: "steps",
          name: "Steps",
          type: "Array",
          required: false,
          localized: false,
          items: {
            type: "Link",
            linkType: "Entry",
            validations: [{ linkContentType: ["dbtProcessStep"] }],
          },
        },
      ],
    }),
  );

  await runStep("ensureContentType:dbtTeamMember", async () =>
    ensureContentType(envApi, "dbtTeamMember", {
      name: "DBT Team Member",
      displayField: "key",
      fields: [
        { id: "key", name: "Key", type: "Symbol", required: true, localized: false },
        { id: "name", name: "Name", type: "Symbol", required: false, localized: true },
        { id: "description", name: "Description", type: "Text", required: false, localized: true },
        {
          id: "image",
          name: "Image",
          type: "Link",
          linkType: "Asset",
          required: false,
          localized: false,
        },
        {
          id: "specialties",
          name: "Specialties",
          type: "Array",
          required: false,
          localized: true,
          items: { type: "Symbol" },
        },
      ],
    }),
  );

  await runStep("ensureContentType:dbtTeam", async () =>
    ensureContentType(envApi, "dbtTeam", {
      name: "DBT Team",
      displayField: "key",
      fields: [
        { id: "key", name: "Key", type: "Symbol", required: true, localized: false },
        { id: "title", name: "Title", type: "Symbol", required: false, localized: true },
        {
          id: "members",
          name: "Members",
          type: "Array",
          required: false,
          localized: false,
          items: {
            type: "Link",
            linkType: "Entry",
            validations: [{ linkContentType: ["dbtTeamMember"] }],
          },
        },
      ],
    }),
  );

  await runStep("ensureContentType:dbtContact", async () =>
    ensureContentType(envApi, "dbtContact", {
      name: "DBT Contact",
      displayField: "key",
      fields: [
        { id: "key", name: "Key", type: "Symbol", required: true, localized: false },
        { id: "title", name: "Title", type: "Symbol", required: false, localized: true },
        { id: "address", name: "Address", type: "Text", required: false, localized: true },
        { id: "whatsapp", name: "WhatsApp", type: "Symbol", required: false, localized: true },
        { id: "instagram", name: "Instagram", type: "Symbol", required: false, localized: true },
        { id: "email", name: "Email", type: "Symbol", required: false, localized: true },
        { id: "hoursWeekdays", name: "Hours Weekdays", type: "Symbol", required: false, localized: true },
        { id: "hoursSaturday", name: "Hours Saturday", type: "Symbol", required: false, localized: true },
        { id: "hoursSunday", name: "Hours Sunday", type: "Symbol", required: false, localized: true },
      ],
    }),
  );

  await runStep("ensureContentType:dbtFooter", async () =>
    ensureContentType(envApi, "dbtFooter", {
      name: "DBT Footer",
      displayField: "key",
      fields: [
        { id: "key", name: "Key", type: "Symbol", required: true, localized: false },
        { id: "quote", name: "Quote", type: "Text", required: false, localized: true },
        { id: "text", name: "Text", type: "Symbol", required: false, localized: true },
      ],
    }),
  );

  // Styles types (optional but enables editing style values as fields)
  await runStep("ensureContentType:dbtStylesGenerales", async () =>
    ensureContentType(envApi, "dbtStylesGenerales", {
      name: "DBT Styles Generales",
      displayField: "key",
      fields: [
        { id: "key", name: "Key", type: "Symbol", required: true, localized: false },
        { id: "primary", name: "Primary", type: "Symbol", required: false, localized: false },
        { id: "secondary", name: "Secondary", type: "Symbol", required: false, localized: false },
        { id: "fontFamily", name: "Font Family", type: "Symbol", required: false, localized: false },
        { id: "baseSize", name: "Base Size", type: "Number", required: false, localized: false },
        { id: "logoUrl", name: "Logo URL", type: "Symbol", required: false, localized: false },
      ],
    }),
  );

  await runStep("ensureContentType:dbtStylesHeader", async () =>
    ensureContentType(envApi, "dbtStylesHeader", {
      name: "DBT Styles Header",
      displayField: "key",
      fields: [
        { id: "key", name: "Key", type: "Symbol", required: true, localized: false },
        { id: "title1Color", name: "Title 1 Color", type: "Symbol", required: false, localized: false },
        { id: "title2Color", name: "Title 2 Color", type: "Symbol", required: false, localized: false },
        { id: "title1Size", name: "Title 1 Size", type: "Number", required: false, localized: false },
        { id: "title2Size", name: "Title 2 Size", type: "Number", required: false, localized: false },
        { id: "subtitle1Color", name: "Subtitle 1 Color", type: "Symbol", required: false, localized: false },
        { id: "subtitle2Color", name: "Subtitle 2 Color", type: "Symbol", required: false, localized: false },
      ],
    }),
  );

  await runStep("ensureContentType:dbtStylesAbout", async () =>
    ensureContentType(envApi, "dbtStylesAbout", {
      name: "DBT Styles About",
      displayField: "key",
      fields: [
        { id: "key", name: "Key", type: "Symbol", required: true, localized: false },
        { id: "titleColor", name: "Title Color", type: "Symbol", required: false, localized: false },
        { id: "bodyColor", name: "Body Color", type: "Symbol", required: false, localized: false },
        { id: "backgroundColor", name: "Background Color", type: "Symbol", required: false, localized: false },
        { id: "titleSize", name: "Title Size", type: "Number", required: false, localized: false },
        { id: "bodySize", name: "Body Size", type: "Number", required: false, localized: false },
        { id: "backgroundImage", name: "Background Image", type: "Symbol", required: false, localized: false },
      ],
    }),
  );

  await runStep("ensureContentType:dbtStylesSpaces", async () =>
    ensureContentType(envApi, "dbtStylesSpaces", {
      name: "DBT Styles Spaces",
      displayField: "key",
      fields: [
        { id: "key", name: "Key", type: "Symbol", required: true, localized: false },
        { id: "textColor", name: "Text Color", type: "Symbol", required: false, localized: false },
        { id: "speedSeconds", name: "Speed Seconds", type: "Number", required: false, localized: false },
      ],
    }),
  );

  await runStep("ensureContentType:dbtStylesTherapies", async () =>
    ensureContentType(envApi, "dbtStylesTherapies", {
      name: "DBT Styles Therapies",
      displayField: "key",
      fields: [
        { id: "key", name: "Key", type: "Symbol", required: true, localized: false },
        { id: "titleColor", name: "Title Color", type: "Symbol", required: false, localized: false },
        { id: "itemTitleColor", name: "Item Title Color", type: "Symbol", required: false, localized: false },
        { id: "itemDescColor", name: "Item Desc Color", type: "Symbol", required: false, localized: false },
      ],
    }),
  );

  await runStep("ensureContentType:dbtStylesServices", async () =>
    ensureContentType(envApi, "dbtStylesServices", {
      name: "DBT Styles Services",
      displayField: "key",
      fields: [
        { id: "key", name: "Key", type: "Symbol", required: true, localized: false },
        { id: "titleColor", name: "Title Color", type: "Symbol", required: false, localized: false },
        { id: "subtitleColor", name: "Subtitle Color", type: "Symbol", required: false, localized: false },
        { id: "itemTitleColor", name: "Item Title Color", type: "Symbol", required: false, localized: false },
      ],
    }),
  );

  await runStep("ensureContentType:dbtStylesProcess", async () =>
    ensureContentType(envApi, "dbtStylesProcess", {
      name: "DBT Styles Process",
      displayField: "key",
      fields: [
        { id: "key", name: "Key", type: "Symbol", required: true, localized: false },
        { id: "titleColor", name: "Title Color", type: "Symbol", required: false, localized: false },
        { id: "introColor", name: "Intro Color", type: "Symbol", required: false, localized: false },
        { id: "stepTitleColor", name: "Step Title Color", type: "Symbol", required: false, localized: false },
        { id: "stepDescColor", name: "Step Desc Color", type: "Symbol", required: false, localized: false },
      ],
    }),
  );

  await runStep("ensureContentType:dbtStylesTeam", async () =>
    ensureContentType(envApi, "dbtStylesTeam", {
      name: "DBT Styles Team",
      displayField: "key",
      fields: [
        { id: "key", name: "Key", type: "Symbol", required: true, localized: false },
        { id: "titleColor", name: "Title Color", type: "Symbol", required: false, localized: false },
        { id: "nameColor", name: "Name Color", type: "Symbol", required: false, localized: false },
        { id: "roleColor", name: "Role Color", type: "Symbol", required: false, localized: false },
      ],
    }),
  );

  await runStep("ensureContentType:dbtStylesContact", async () =>
    ensureContentType(envApi, "dbtStylesContact", {
      name: "DBT Styles Contact",
      displayField: "key",
      fields: [
        { id: "key", name: "Key", type: "Symbol", required: true, localized: false },
        { id: "titleColor", name: "Title Color", type: "Symbol", required: false, localized: false },
        { id: "infoColor", name: "Info Color", type: "Symbol", required: false, localized: false },
      ],
    }),
  );

  await runStep("ensureContentType:dbtStylesFooter", async () =>
    ensureContentType(envApi, "dbtStylesFooter", {
      name: "DBT Styles Footer",
      displayField: "key",
      fields: [
        { id: "key", name: "Key", type: "Symbol", required: true, localized: false },
        { id: "textColor", name: "Text Color", type: "Symbol", required: false, localized: false },
      ],
    }),
  );

  const { contentfulUpsertContent, contentfulUpsertSiteSettings } =
    await import("./contentful-store");

  const SEO: Record<SeedLocale, any> = {
    es: {
      title: "Terapia DBT en Chile | DBT Salud",
      description:
        "Psicoterapia DBT, TCC, ACT y PBT en Chile. Online y presencial.",
      canonical: "https://www.dbtsalud.cl/",
      ogUrl: "https://www.dbtsalud.cl/",
      ogImage: "https://www.dbtsalud.cl/assets/og-image.jpg",
      keywords: "terapia DBT, psicólogos Chile, TCC, ACT",
    },
    en: {
      title: "DBT therapy in Chile | DBT Salud",
      description: "DBT, CBT, ACT and PBT in Chile. Online and in-person.",
      canonical: "https://www.dbtsalud.cl/",
      ogUrl: "https://www.dbtsalud.cl/",
      ogImage: "https://www.dbtsalud.cl/assets/og-image.jpg",
      keywords: "DBT therapy, psychologists Chile, CBT, ACT",
    },
  };

  const HEADER: Record<SeedLocale, any> = {
    es: {
      title1: "No necesitas tenerlo todo claro.",
      title2: "A veces, solo hace falta tomar el primer paso.",
      subtitle1:
        "Acompañamos procesos terapéuticos con calidez, evidencia y humanidad.",
      subtitle2:
        "Atención psicológica online y presencial, en español e inglés, desde Chile.",
      cta1: "Quiero comenzar terapia",
      cta1Link: "https://wa.me/56949897699",
      cta2: "Conoce el Programa DBT",
      cta2Link: "#servicios",
      backgroundImage:
        "https://cdn.prod.website-files.com/671898ae57fbee5bf1da9fba/673daa20f8d824dc60d87727_6ca5979b6f014ba47a22c3f88928aabc_bg-1.webp",
    },
    en: {
      title1: "You don't need to have it all figured out.",
      title2: "Sometimes, you just need to take the first step.",
      subtitle1:
        "We accompany therapeutic processes with warmth, evidence and humanity.",
      subtitle2:
        "Online and in-person psychological care, in Spanish and English, from Chile.",
      cta1: "I want to start therapy",
      cta1Link: "https://wa.me/56949897699",
      cta2: "Learn about DBT Program",
      cta2Link: "#servicios",
      backgroundImage:
        "https://cdn.prod.website-files.com/671898ae57fbee5bf1da9fba/673daa20f8d824dc60d87727_6ca5979b6f014ba47a22c3f88928aabc_bg-1.webp",
    },
  };

  const ABOUT: Record<SeedLocale, any> = {
    es: {
      title: "Somos DBT Salud",
      body: "En DBT Salud creemos que cada persona, sin importar su historia, tiene el potencial de sanar y construir una vida con propósito. Por eso creamos un espacio profesional, humano y cercano, donde puedas sentirte escuchado, acompañado y comprendido.\n\nNos especializamos en tratar dificultades emocionales complejas como desregulación emocional, ansiedad, trastornos de personalidad, depresión, relaciones conflictivas y más. También acompañamos procesos de crecimiento personal, toma de decisiones importantes y desarrollo emocional.\n\nOfrecemos psicoterapia basada en evidencia, con un enfoque flexible y adaptado a tus necesidades. Integramos terapias como DBT, TCC, ACT y PBT.",
      linkText: "Conócenos",
      linkUrl: "/#nosotros",
      image:
        "https://images.unsplash.com/photo-1529336953121-a1d79f36d1f0?q=80&w=1200&auto=format&fit=crop",
    },
    en: {
      title: "We are DBT Salud",
      body: "At DBT Salud we believe that every person, regardless of their history, has the potential to heal and build a life with purpose. That's why we create a professional, human and close space, where you can feel heard, accompanied and understood.\n\nWe specialize in treating complex emotional difficulties such as emotional dysregulation, anxiety, personality disorders, depression, conflictual relationships and more. We also accompany personal growth processes, important decision making and emotional development.\n\nWe offer evidence-based psychotherapy, with a flexible approach adapted to your needs. We integrate therapies such as DBT, CBT, ACT and PBT.",
      linkText: "About us",
      linkUrl: "/#nosotros",
      image:
        "https://images.unsplash.com/photo-1529336953121-a1d79f36d1f0?q=80&w=1200&auto=format&fit=crop",
    },
  };

  const SPACES: Record<SeedLocale, any> = {
    es: {
      eyebrow: "NUESTROS ESPACIOS",
      title: "Conoce el centro y sus espacios",
      items: [
        {
          title: "Espacio 1",
          image:
            "https://cdn.prod.website-files.com/68d563f4fd5681015e6537de/692cce3b0202b2d312f5d46f_Frame%20147.avif",
        },
        {
          title: "Espacio 2",
          image:
            "https://cdn.prod.website-files.com/68d563f4fd5681015e6537de/692cce3b26ca1b096a6eda7c_Frame%2098.avif",
        },
        {
          title: "Espacio 3",
          image:
            "https://cdn.prod.website-files.com/68d563f4fd5681015e6537de/692cce3bfd4346c3a790d01a_Frame%20143.avif",
        },
        {
          title: "Espacio 4",
          image:
            "https://cdn.prod.website-files.com/68d563f4fd5681015e6537de/692cce3bd7bea7f2504f39de_Frame%20142.avif",
        },
      ],
    },
    en: {
      eyebrow: "OUR SPACES",
      title: "Discover our center and spaces",
      items: [
        {
          title: "Space 1",
          image:
            "https://cdn.prod.website-files.com/68d563f4fd5681015e6537de/692cce3b0202b2d312f5d46f_Frame%20147.avif",
        },
        {
          title: "Space 2",
          image:
            "https://cdn.prod.website-files.com/68d563f4fd5681015e6537de/692cce3b26ca1b096a6eda7c_Frame%2098.avif",
        },
        {
          title: "Space 3",
          image:
            "https://cdn.prod.website-files.com/68d563f4fd5681015e6537de/692cce3bfd4346c3a790d01a_Frame%20143.avif",
        },
        {
          title: "Space 4",
          image:
            "https://cdn.prod.website-files.com/68d563f4fd5681015e6537de/692cce3bd7bea7f2504f39de_Frame%20142.avif",
        },
      ],
    },
  };

  const THERAPIES: Record<SeedLocale, any> = {
    es: {
      title: "Terapias que ofrecemos",
      items: [
        {
          title: "DBT (Terapia Dialéctico-Conductual)",
          desc: "Enfoque intensivo ideal para crisis emocionales, impulsividad y relaciones conflictivas.",
          image:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=450&fit=crop",
        },
        {
          title: "TCC (Terapia Cognitivo-Conductual)",
          desc: "Identifica y transforma pensamientos y conductas que afectan tu bienestar.",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=450&fit=crop",
        },
        {
          title: "ACT (Aceptación y Compromiso)",
          desc: "Conecta con tus valores y aprende a vivir con sentido, incluso en la dificultad.",
          image:
            "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=450&fit=crop",
        },
        {
          title: "PBT (Process-Based Therapy)",
          desc: "Terapia flexible centrada en procesos específicos, no solo en diagnósticos.",
          image:
            "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=450&fit=crop",
        },
      ],
    },
    en: {
      title: "Therapies we offer",
      items: [
        {
          title: "DBT (Dialectical Behavior Therapy)",
          desc: "Intensive approach ideal for emotional crises, impulsivity and conflictual relationships.",
          image:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=450&fit=crop",
        },
        {
          title: "CBT (Cognitive-Behavioral Therapy)",
          desc: "Identifies and transforms thoughts and behaviors that affect your well-being.",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=450&fit=crop",
        },
        {
          title: "ACT (Acceptance and Commitment)",
          desc: "Connect with your values and learn to live meaningfully, even in difficulty.",
          image:
            "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=450&fit=crop",
        },
        {
          title: "PBT (Process-Based Therapy)",
          desc: "Flexible therapy focused on specific processes, not just diagnoses.",
          image:
            "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=450&fit=crop",
        },
      ],
    },
  };

  const SERVICES: Record<SeedLocale, any> = {
    es: {
      title: "Nuestros servicios",
      subtitle: "Atención online y presencial | Español e inglés",
      items: [
        {
          title: "Programa DBT Completo",
          desc: "Incluye sesiones individuales, talleres de habilidades, coaching entre sesiones y equipo clínico.",
        },
        {
          title: "DBT-SUD (Consumo problemático de sustancias)",
          desc: "Programa especializado para quienes enfrentan adicción y desregulación emocional.",
        },
        {
          title: "Sesiones individuales personalizadas",
          desc: "Espacios de psicoterapia flexibles, empáticos y confidenciales.",
        },
        {
          title: "Evaluaciones psicológicas",
          desc: "Informes clínicos claros, adaptados a contextos escolares, médicos o familiares.",
        },
      ],
    },
    en: {
      title: "Our services",
      subtitle: "Online and in-person care | Spanish and English",
      items: [
        {
          title: "Complete DBT Program",
          desc: "Includes individual sessions, skills workshops, between-session coaching and clinical team.",
        },
        {
          title: "DBT-SUD (Problematic substance use)",
          desc: "Specialized program for those facing addiction and emotional dysregulation.",
        },
        {
          title: "Personalized individual sessions",
          desc: "Flexible, empathetic and confidential psychotherapy spaces.",
        },
        {
          title: "Psychological evaluations",
          desc: "Clear clinical reports, adapted to school, medical or family contexts.",
        },
      ],
    },
  };

  const PROCESS: Record<SeedLocale, any> = {
    es: {
      title: "Nuestro proceso",
      intro:
        "Iniciar terapia puede generar dudas. En DBT Salud queremos que te sientas acompañado desde el primer contacto.",
      steps: [
        {
          title: "Primer contacto",
          description:
            "Escríbenos por WhatsApp o correo para orientación o agendar sesión.",
        },
        {
          title: "Cuestionario de ingreso",
          description: "Breve formulario para conocerte mejor.",
        },
        {
          title: "Primera sesión de evaluación",
          description: "Exploramos tu historia, necesidades y objetivos.",
        },
        {
          title: "Derivación o plan terapéutico",
          description: "Definimos el tipo de terapia y frecuencia.",
        },
        {
          title: "Inicio del tratamiento",
          description:
            "Trabajamos tus objetivos con herramientas basadas en evidencia.",
        },
      ],
    },
    en: {
      title: "Our process",
      intro:
        "Starting therapy can generate doubts. At DBT Salud we want you to feel supported from the first contact.",
      steps: [
        {
          title: "First contact",
          description:
            "Write to us via WhatsApp or email for guidance or to schedule a session.",
        },
        {
          title: "Intake questionnaire",
          description: "Brief form to get to know you better.",
        },
        {
          title: "First evaluation session",
          description: "We explore your history, needs and objectives.",
        },
        {
          title: "Referral or therapeutic plan",
          description: "We define the type of therapy and frequency.",
        },
        {
          title: "Start of treatment",
          description: "We work on your goals with evidence-based tools.",
        },
      ],
    },
  };

  const TEAM: Record<SeedLocale, any> = {
    es: {
      title: "Conoce al equipo",
      members: [
        {
          name: "Karla González Guerra",
          description:
            "Psicóloga clínica con formación en DBT, ACT y TCA. Magíster en Psicología Clínica (UAI).",
          image:
            "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
          specialties: ["DBT", "TCA", "ACT"],
        },
        {
          name: "Daniel Henríquez",
          description:
            "Psicólogo clínico con formación en DBT y TCC. Experiencia en psicopatología y regulación emocional.",
          image:
            "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
          specialties: ["DBT", "TCC", "Psicopatología"],
        },
      ],
    },
    en: {
      title: "Meet the team",
      members: [
        {
          name: "Karla González Guerra",
          description:
            "Clinical psychologist with training in DBT, ACT and ED. Master's in Clinical Psychology (UAI).",
          image:
            "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
          specialties: ["DBT", "ED", "ACT"],
        },
        {
          name: "Daniel Henríquez",
          description:
            "Clinical psychologist with training in DBT and CBT. Experience in psychopathology and emotion regulation.",
          image:
            "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
          specialties: ["DBT", "CBT", "Psychopathology"],
        },
      ],
    },
  };

  const CONTACT: Record<SeedLocale, any> = {
    es: {
      title: "Contacto directo",
      address: "Almirante Pastene 185, Providencia, oficina 204",
      whatsapp: "+56 9 4989 7699",
      instagram: "@psi.karlagg",
      email: "contacto@dbtsalud.cl",
      hours: {
        weekdays: "Lun-Vie 10:00-19:00",
        saturday: "Sáb 9:00-14:00",
        sunday: "Domingo: Cerrado",
      },
    },
    en: {
      title: "Direct contact",
      address: "Almirante Pastene 185, Providencia, office 204",
      whatsapp: "+56 9 4989 7699",
      instagram: "@psi.karlagg",
      email: "contacto@dbtsalud.cl",
      hours: {
        weekdays: "Mon-Fri 10:00-19:00",
        saturday: "Sat 9:00-14:00",
        sunday: "Sunday: Closed",
      },
    },
  };

  const FOOTER: Record<SeedLocale, any> = {
    es: {
      text: "© 2025 DBT Salud",
      quote:
        "Tu historia merece ser escuchada. Tu vida merece ser vivida con sentido.",
    },
    en: {
      text: "© 2025 DBT Salud",
      quote:
        "Your story deserves to be heard. Your life deserves to be lived with meaning.",
    },
  };

  const STYLES: Record<string, any> = {
    "luminous.styles.generales": {
      colors: { primary: "#2e4c47", secondary: "#CBEDE0" },
      typography: { fontFamily: "alegreya-sans, sans-serif", baseSize: 16 },
      assets: { logoUrl: "" },
    },
    "luminous.styles.header": {
      title1Color: "#ffffff",
      title2Color: "#ffffff",
      title1Size: 48,
      title2Size: 40,
      subtitle1Color: "#ffffff",
      subtitle2Color: "#ffffff",
    },
    "luminous.styles.about": {
      titleColor: "#111111",
      bodyColor: "#333333",
      backgroundColor: "#ffffff",
      titleSize: 50,
      bodySize: 18,
      backgroundImage: "",
    },
    "luminous.styles.spaces": {
      textColor: "#1C1C1C",
      speedSeconds: 25.6,
    },
    "luminous.styles.therapies": {
      titleColor: "#111111",
      itemTitleColor: "#111111",
      itemDescColor: "#555555",
    },
    "luminous.styles.services": {
      titleColor: "#111111",
      subtitleColor: "#333333",
      itemTitleColor: "#111111",
    },
    "luminous.styles.process": {
      titleColor: "#111111",
      introColor: "#333333",
      stepTitleColor: "#111111",
      stepDescColor: "#555555",
    },
    "luminous.styles.team": {
      titleColor: "#111111",
      nameColor: "#111111",
      roleColor: "#555555",
    },
    "luminous.styles.contact": {
      titleColor: "#111111",
      infoColor: "#333333",
    },
    "luminous.styles.footer": {
      textColor: "#111111",
    },
  };

  const CONTENT: Record<string, Record<SeedLocale, any>> = {
    "luminous.seo": SEO,
    "luminous.header": HEADER,
    "luminous.about": ABOUT,
    "luminous.spaces": SPACES,
    "luminous.therapies": THERAPIES,
    "luminous.services": SERVICES,
    "luminous.process": PROCESS,
    "luminous.team": TEAM,
    "luminous.contact": CONTACT,
    "luminous.footer": FOOTER,
  };

  const localesToSeed: SeedLocale[] = ["es", "en"];

  for (const key of Object.keys(CONTENT)) {
    for (const locale of localesToSeed) {
      await runStep(`upsertContent:${key}:${locale}`, async () =>
        contentfulUpsertContent(key, locale, CONTENT[key][locale]),
      );
    }
  }

  for (const styleKey of Object.keys(STYLES)) {
    for (const locale of localesToSeed) {
      await runStep(`upsertStyle:${styleKey}:${locale}`, async () =>
        contentfulUpsertContent(styleKey, locale, STYLES[styleKey]),
      );
    }
  }

  await runStep("upsertSiteSettings", async () =>
    contentfulUpsertSiteSettings(STYLES["luminous.styles.generales"]),
  );

  return {
    ok: true as const,
    backend: "contentful" as const,
    environment: environmentId,
    locales: {
      defaultLocale,
      es: localeEs,
      en: localeEn,
    },
    seeded: {
      contentKeys: Object.keys(CONTENT),
      styleKeys: Object.keys(STYLES),
      settings: true,
    },
  };
}
