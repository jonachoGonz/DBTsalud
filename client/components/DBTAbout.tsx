import { useLanguage } from "@/contexts/LanguageContext";
import { useContent } from "@/hooks/use-content";
import { ArrowRight } from "lucide-react";

export default function DBTAbout() {
  const { language, t } = useLanguage();
  const { data: about } = useContent<any>("luminous.about", language);

  const title = about?.title || t("about.title");
  const body = about?.body || t("about.intro");
  const linkText = about?.linkText;
  const linkUrl = about?.linkUrl || "#nosotros";
  const imageUrl = about?.image ||
    "https://images.unsplash.com/photo-1529336953121-a1d79f36d1f0?q=80&w=1200&auto=format&fit=crop";

  return (
    <section id="nosotros" className="relative py-20 bg-white">
      {/* Decorative huge background text */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute inset-x-0 -top-28 -z-10 text-[22vw] leading-none text-white"
        style={{ textShadow: "0 1px 0 #BAA184" }}
      >
        <span className="block pl-2 pr-4 truncate">
          {title}
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left: text */}
          <div className="flex flex-col gap-6 z-[1]">
            <div className="space-y-3">
              <h2 className="font-bold text-4xl md:text-5xl leading-tight tk-alegreya tracking-tight">
                {title}
              </h2>
              <div className="flex items-center gap-7">
                <div className="h-0.5 w-16 bg-[rgb(186,161,132)]" />
              </div>
            </div>
            <p className="text-stone-700 text-base md:text-lg leading-7 whitespace-pre-line tk-alegreya">
              {body}
            </p>
            {linkText && (
              <div className="rounded-full shadow-[inset_0_1px_0_0_#BAA184] inline-flex w-max">
                <a
                  href={linkUrl}
                  className="inline-flex items-center gap-2 pl-9 pr-3 py-4 text-stone-900 hover:text-stone-700 transition-colors"
                >
                  <span className="tk-alegreya font-medium">{linkText}</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            )}
          </div>

          {/* Right: image */}
          <div className="md:row-start-1">
            <div className="aspect-square w-3/4 ml-auto rounded-xl overflow-hidden">
              <img
                src={imageUrl}
                alt="About"
                className="w-full h-full object-cover align-middle"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
