import { useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContent } from "@/hooks/use-content";

type SpaceItem = {
  title: string;
  image: string;
  href?: string;
};

type SpacesContent = {
  eyebrow?: string;
  title?: string;
  items?: SpaceItem[];
};

type SpacesStyles = {
  textColor?: string;
  speedSeconds?: number;
};

const FALLBACK: Record<
  "es" | "en",
  Required<Pick<SpacesContent, "eyebrow" | "title">> & { items: SpaceItem[] }
> = {
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

const DEFAULT_STYLES: Required<SpacesStyles> = {
  textColor: "#1C1C1C",
  speedSeconds: 25.6,
};

export default function DBTSpacesCarousel() {
  const { language } = useLanguage();

  const { data: content } = useContent<SpacesContent>(
    "luminous.spaces",
    language,
  );
  const { data: styles } = useContent<SpacesStyles>(
    "luminous.styles.spaces",
    language,
  );

  const fallback = FALLBACK[language === "en" ? "en" : "es"];

  const mergedStyles = useMemo(
    () => ({ ...DEFAULT_STYLES, ...(styles || {}) }),
    [styles],
  );

  const slides = useMemo(() => {
    const items = Array.isArray(content?.items) ? content!.items! : [];
    const safe = items
      .map((it) => ({
        title: String(it?.title || "").trim(),
        image: String(it?.image || "").trim(),
        href: it?.href ? String(it.href) : undefined,
      }))
      .filter((it) => it.title && it.image);

    return safe.length ? safe : fallback.items;
  }, [content, fallback.items]);

  const marqueeSlides = useMemo(() => {
    if (slides.length === 0) return [];
    return [...slides, ...slides];
  }, [slides]);

  const eyebrow = content?.eyebrow || fallback.eyebrow;
  const title = content?.title || fallback.title;

  return (
    <section aria-label={eyebrow} className="py-12 sm:py-14">
      <style>{`
        @keyframes dbtSpacesTranslateX {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .dbt-spaces-track { animation: none !important; transform: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center tk-alegreya">
          <div
            className="text-sm tracking-[0.08em] font-medium uppercase"
            style={{ color: mergedStyles.textColor }}
          >
            {eyebrow}
          </div>
          <h2
            className="mt-6 text-4xl sm:text-5xl font-light uppercase"
            style={{ color: mergedStyles.textColor }}
          >
            {title}
          </h2>
        </div>
      </div>

      <div className="mt-10 w-full overflow-hidden">
        <div
          className="dbt-spaces-track flex items-center justify-start"
          style={{
            animation: `dbtSpacesTranslateX ${mergedStyles.speedSeconds}s linear infinite`,
            width: "max-content",
          }}
        >
          {marqueeSlides.map((it, idx) => {
            const baseIndex = slides.length ? idx % slides.length : idx;
            const large = baseIndex % 2 === 0;
            const width = large
              ? "clamp(240px, 40vw, 444px)"
              : "clamp(220px, 34vw, 356px)";

            return (
              <div key={`${it.title}-${idx}`} className="overflow-hidden pr-20">
                <div
                  className="relative aspect-square"
                  style={{ width }}
                  aria-label={it.title}
                >
                  <div className="absolute inset-0 h-[110%] w-full">
                    <img
                      loading="lazy"
                      alt={it.title}
                      src={it.image}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
