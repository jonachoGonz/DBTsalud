import fs from "node:fs/promises";
import path from "node:path";

type Locale = "es" | "en";

type StoreFile = {
  content: Record<string, unknown>;
  settings: unknown | null;
};

const STORE_PATH = path.join(process.cwd(), "server", ".cms-store.json");

let store: StoreFile = { content: {}, settings: null };
let loaded = false;
let writeTimer: NodeJS.Timeout | null = null;

function contentId(key: string, locale: Locale) {
  return `${key}::${locale}`;
}

async function ensureLoaded() {
  if (loaded) return;
  loaded = true;
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      store = {
        content:
          parsed.content && typeof parsed.content === "object"
            ? parsed.content
            : {},
        settings: "settings" in parsed ? parsed.settings : null,
      };
    }
  } catch {
    store = { content: {}, settings: null };
  }
}

async function persistSoon() {
  if (writeTimer) return;
  writeTimer = setTimeout(async () => {
    writeTimer = null;
    try {
      await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
    } catch {
      // ignore (serverless / read-only environments)
    }
  }, 150);
}

export async function getLocalContent(key: string, locale: Locale) {
  await ensureLoaded();
  return store.content[contentId(key, locale)] ?? null;
}

export async function setLocalContent(key: string, locale: Locale, data: unknown) {
  await ensureLoaded();
  store.content[contentId(key, locale)] = data;
  await persistSoon();
}

export async function listLocalKeys(prefix?: string) {
  await ensureLoaded();
  const keys = new Set<string>();
  for (const id of Object.keys(store.content)) {
    const k = id.split("::")[0] || "";
    if (!prefix || k.startsWith(prefix)) keys.add(k);
  }
  return Array.from(keys).sort();
}

export async function getLocalSettings() {
  await ensureLoaded();
  return store.settings;
}

export async function setLocalSettings(settings: unknown) {
  await ensureLoaded();
  store.settings = settings;
  await persistSoon();
}
