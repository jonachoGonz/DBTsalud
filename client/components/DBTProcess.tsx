import { useLanguage } from "@/contexts/LanguageContext";
import { PhoneCall, FileCheck, Search, Route, Play } from "lucide-react";
import { useContent } from "@/hooks/use-content";

const DEFAULT_ICONS = [PhoneCall, FileCheck, Search, Route, Play];

export default function DBTProcess() {
  const { t, language } = useLanguage();
  const { data: process } = useContent<any>("luminous.process", language);

  const fallback = [
    {
      icon: PhoneCall,
      title: t("process.step1"),
      description: t("process.step1.desc"),
    },
    {
      icon: FileCheck,
      title: t("process.step2"),
      description: t("process.step2.desc"),
    },
    {
      icon: Search,
      title: t("process.step3"),
      description: t("process.step3.desc"),
    },
    {
      icon: Route,
      title: t("process.step4"),
      description: t("process.step4.desc"),
    },
    {
      icon: Play,
      title: t("process.step5"),
      description: t("process.step5.desc"),
    },
  ];

  const steps = Array.isArray(process?.steps) && process!.steps.length > 0
    ? (process!.steps as any[])
    : fallback;

  return (
    <section
      id="proceso"
      className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {process?.title || t("process.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {process?.intro || t("process.intro")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16">
          {steps.map((step: any, index: number) => {
            const IconComponent = step.icon || DEFAULT_ICONS[index % DEFAULT_ICONS.length];
            const number = step.number || String(index + 1).padStart(2, "0");
            const title = step.title || step.name || "";
            const description = step.description || step.desc || "";
            return (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                    {IconComponent ? (
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    ) : (
                      <span className="text-blue-600 font-bold text-xl">{number}</span>
                    )}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-blue-200 -translate-y-1/2"></div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-8 italic">
            "{t("process.quote")}"
          </blockquote>
          <a
            href="https://wa.me/56949897699"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full transition-colors"
          >
            {t("process.cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
