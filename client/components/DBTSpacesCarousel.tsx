import { useMemo } from "react";
import { ArrowRight } from "lucide-react";
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
  ctaText?: string;
  ctaLink?: string;
  items?: SpaceItem[];
};

type SpacesStyles = {
  outerBg?: string;
  innerBg?: string;
  textColor?: string;
  trackBg?: string;
  speedSeconds?: number;
};

const FALLBACK: Record<
  "es" | "en",
  Required<Pick<SpacesContent, "eyebrow" | "title" | "ctaText" | "ctaLink">> & {
    items: SpaceItem[];
  }
> = {
  es: {
    eyebrow: "NUESTROS ESPACIOS",
    title: "Conoce el centro y sus espacios",
    ctaText: "VER TODAS LAS FOTOS",
    ctaLink: "#contacto",
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
    ctaText: "VIEW ALL PHOTOS",
    ctaLink: "#contact",
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
  outerBg: "#E2DCD5",
  innerBg: "#1C1C1C",
  textColor: "#FFFFFF",
  trackBg: "#F2EFEA",
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
  const ctaText = content?.ctaText || fallback.ctaText;
  const ctaLink = content?.ctaLink || fallback.ctaLink;

  return (
    <section
      aria-label={eyebrow}
      className="py-12 sm:py-14"
      style={{ backgroundColor: mergedStyles.outerBg }}
    >
      <style>{`
        @keyframes dbtSpacesTranslateX {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .dbt-spaces-track { animation: none !important; transform: none !important; }
        }
      `}</style>

      <div className="px-4 sm:px-10">
        <div
          className="mx-auto max-w-[2200px] relative"
          style={{ backgroundColor: mergedStyles.innerBg }}
        >
          <div className="mx-auto max-w-[1454px] px-4 sm:px-[68px] pt-14 sm:pt-[100px] pb-[220px] sm:pb-[290px]">
            <div className="mx-auto max-w-[780px] text-center flex flex-col items-center">
              <div
                className="text-sm tracking-[0.08em] font-medium uppercase"
                style={{ color: mergedStyles.textColor }}
              >
                {eyebrow}
              </div>
              <h2
                className="mt-8 text-4xl sm:text-5xl md:text-[60px] md:leading-[65px] font-light uppercase"
                style={{ color: mergedStyles.textColor }}
              >
                {title}
              </h2>

              <a
                href={ctaLink}
                className="mt-12 inline-flex items-center gap-3 text-xs sm:text-[13px] font-medium tracking-[0.08em] uppercase transition-opacity"
                style={{ color: mergedStyles.textColor }}
              >
                <span>{ctaText}</span>
                <ArrowRight
                  className="h-[13px] w-[13px]"
                  style={{ color: mergedStyles.textColor }}
                />
              </a>
            </div>
          </div>

          <div className="mx-auto max-w-[2200px] -mt-[220px] sm:-mt-[290px] pb-10">
            <div
              className="overflow-hidden"
              style={{ backgroundColor: mergedStyles.trackBg }}
            >
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
          </div>
        </div>
      </div>
    </section>
  );
}
