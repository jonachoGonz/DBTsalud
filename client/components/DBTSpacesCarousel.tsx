import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContent } from "@/hooks/use-content";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

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
  mutedTextColor?: string;
  borderColor?: string;
  arrowBg?: string;
  arrowFg?: string;
};

const FALLBACK: Record<"es" | "en", Required<Pick<SpacesContent, "eyebrow" | "title" | "ctaText" | "ctaLink">> & { items: SpaceItem[] }> = {
  es: {
    eyebrow: "NUESTROS ESPACIOS",
    title: "Conoce el centro y sus espacios",
    ctaText: "VER TODAS LAS FOTOS",
    ctaLink: "#contacto",
    items: [
      {
        title: "Recepción",
        image:
          "https://images.unsplash.com/photo-1550565118-3a14e8d0386f?q=80&w=1400&auto=format&fit=crop",
      },
      {
        title: "Sala de espera",
        image:
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1400&auto=format&fit=crop",
      },
      {
        title: "Consulta",
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1400&auto=format&fit=crop",
      },
      {
        title: "Espacios",
        image:
          "https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?q=80&w=1400&auto=format&fit=crop",
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
        title: "Reception",
        image:
          "https://images.unsplash.com/photo-1550565118-3a14e8d0386f?q=80&w=1400&auto=format&fit=crop",
      },
      {
        title: "Waiting room",
        image:
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1400&auto=format&fit=crop",
      },
      {
        title: "Office",
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1400&auto=format&fit=crop",
      },
      {
        title: "Spaces",
        image:
          "https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?q=80&w=1400&auto=format&fit=crop",
      },
    ],
  },
};

const DEFAULT_STYLES: Required<SpacesStyles> = {
  outerBg: "#E2DCD5",
  innerBg: "#1C1C1C",
  textColor: "#FFFFFF",
  mutedTextColor: "rgba(242,236,226,0.5)",
  borderColor: "rgba(255,255,255,0.9)",
  arrowBg: "transparent",
  arrowFg: "#FFFFFF",
};

export default function DBTSpacesCarousel() {
  const { language } = useLanguage();
  const { data: content } = useContent<SpacesContent>("luminous.spaces", language);
  const { data: styles } = useContent<SpacesStyles>(
    "luminous.styles.spaces",
    language,
  );

  const [api, setApi] = useState<any>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

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

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setCanPrev(Boolean(api.canScrollPrev?.()));
      setCanNext(Boolean(api.canScrollNext?.()));
    };
    update();
    api.on?.("select", update);
    api.on?.("reInit", update);
    return () => {
      api.off?.("select", update);
      api.off?.("reInit", update);
    };
  }, [api]);

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

          <div className="mx-auto max-w-[2200px] -mt-[220px] sm:-mt-[290px] px-4 sm:px-[68px] pb-10">
            <div className="mx-auto max-w-[1454px]">
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  aria-label="Previous slide"
                  disabled={!canPrev}
                  onClick={() => api?.scrollPrev?.()}
                  className="h-12 w-12 rounded-full border transition-opacity disabled:opacity-50 disabled:pointer-events-none"
                  style={{ borderColor: mergedStyles.borderColor }}
                >
                  <ChevronLeft
                    className="mx-auto h-5 w-5"
                    style={{ color: mergedStyles.textColor }}
                  />
                </button>
                <button
                  type="button"
                  aria-label="Next slide"
                  disabled={!canNext}
                  onClick={() => api?.scrollNext?.()}
                  className="h-12 w-12 rounded-full border transition-opacity disabled:opacity-50 disabled:pointer-events-none"
                  style={{ borderColor: mergedStyles.borderColor }}
                >
                  <ChevronRight
                    className="mx-auto h-5 w-5"
                    style={{ color: mergedStyles.textColor }}
                  />
                </button>
              </div>

              <div className="mt-6">
                <Carousel
                  setApi={setApi}
                  opts={{ align: "start", loop: false }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-6">
                    {slides.map((it, idx) => {
                      const href = it.href || ctaLink;
                      return (
                        <CarouselItem
                          key={`${it.title}-${idx}`}
                          className="pl-6 basis-[85vw] sm:basis-[650px]"
                        >
                          <a
                            href={href}
                            className="group block"
                            aria-label={`${idx + 1} / ${slides.length}: ${it.title}`}
                          >
                            <div className="overflow-hidden">
                              <img
                                src={it.image}
                                alt={it.title}
                                loading="lazy"
                                className="w-full h-auto object-cover select-none"
                              />
                            </div>
                            <div
                              className="flex items-center justify-between py-6"
                              style={{ color: mergedStyles.textColor }}
                            >
                              <span className="text-2xl sm:text-[44px] leading-tight font-light">
                                {it.title}
                              </span>
                              <span className="h-10 w-10 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <ArrowRight className="h-6 w-6" />
                              </span>
                            </div>
                          </a>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
