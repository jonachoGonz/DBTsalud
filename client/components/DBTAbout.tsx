import { useLanguage } from "@/contexts/LanguageContext";
import { useContent } from "@/hooks/use-content";

export default function DBTAbout() {
  const { language, t } = useLanguage();
  const { data: about } = useContent<any>("luminous.about", language);

  return (
    <section id="nosotros" className="py-20 bg-[rgb(252,248,241)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-700 mb-6 tk-alegreya">
            {about?.title || t("about.title")}
          </h2>
          <p className="text-xl text-stone-700 max-w-4xl mx-auto leading-relaxed whitespace-pre-line tk-alegreya">
            {about?.body || t("about.intro")}
          </p>
          {about?.linkText && (
            <div className="mt-6">
              <a href={about?.linkUrl || "#nosotros"} className="inline-flex items-center justify-center bg-stone-700 hover:bg-stone-800 text-white px-8 py-4 text-lg rounded-full tk-alegreya">
                {about.linkText}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
