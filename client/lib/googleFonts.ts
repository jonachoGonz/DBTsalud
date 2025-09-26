export type GoogleFont = {
  family: string;
  category?: string;
  variants?: string[];
};

function extractFamilyName(input: string): string {
  const beforeComma = input.split(",")[0] || input;
  return beforeComma.replace(/^\s*["']?|["']?\s*$/g, "").trim();
}

export function ensureGoogleFontLoaded(
  fontFamilyCss: string,
  weights: number[] = [400, 700],
) {
  if (typeof document === "undefined") return;
  const family = extractFamilyName(fontFamilyCss);
  if (!family) return;
  const slug = family.toLowerCase().replace(/\s+/g, "-");
  const existing = document.getElementById(`gfont-${slug}`) as HTMLLinkElement | null;
  if (existing) return; // already added

  const familyParam = family.replace(/\s+/g, "+");
  const weightParam = weights.length ? `:wght@${weights.join(";")}` : "";
  const href = `https://fonts.googleapis.com/css2?family=${familyParam}${weightParam}&display=swap`;

  const link = document.createElement("link");
  link.id = `gfont-${slug}`;
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

export function formatFontFamilyCSS(
  family: string,
  category?: string,
): string {
  const fallback =
    category === "serif"
      ? "serif"
      : category === "monospace"
        ? "monospace"
        : "sans-serif";
  return `"${family}", ${fallback}`;
}

export async function listGoogleFonts(apiKey?: string): Promise<GoogleFont[]> {
  try {
    if (apiKey) {
      const url = `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=popularity`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Google Fonts API error: ${res.status}`);
      const json = await res.json();
      const items = Array.isArray(json.items) ? json.items : [];
      return items.map((it: any) => ({
        family: it.family as string,
        category: it.category as string,
        variants: Array.isArray(it.variants) ? (it.variants as string[]) : [],
      }));
    }
  } catch (e) {
    console.warn("Falling back to curated fonts list", e);
  }
  // Fallback curated list
  const curated = [
    { family: "Inter", category: "sans-serif" },
    { family: "Roboto", category: "sans-serif" },
    { family: "Open Sans", category: "sans-serif" },
    { family: "Lato", category: "sans-serif" },
    { family: "Montserrat", category: "sans-serif" },
    { family: "Poppins", category: "sans-serif" },
    { family: "Source Sans 3", category: "sans-serif" },
    { family: "Nunito", category: "sans-serif" },
    { family: "Work Sans", category: "sans-serif" },
    { family: "Rubik", category: "sans-serif" },
    { family: "Manrope", category: "sans-serif" },
    { family: "DM Sans", category: "sans-serif" },
    { family: "Merriweather", category: "serif" },
    { family: "Playfair Display", category: "serif" },
    { family: "Lora", category: "serif" },
    { family: "Roboto Mono", category: "monospace" },
    { family: "Fira Code", category: "monospace" },
  ];
  return curated;
}
