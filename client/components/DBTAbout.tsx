import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Check, Heart, Users, Globe } from "lucide-react";

export default function DBTAbout() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Check,
      text: t("about.personalized"),
      color: "text-blue-600",
    },
    {
      icon: Heart,
      text: t("about.therapies"),
      color: "text-red-500",
    },
    {
      icon: Users,
      text: t("about.support"),
      color: "text-green-600",
    },
    {
      icon: Globe,
      text: t("about.bilingual"),
      color: "text-purple-600",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("about.title")}
          </h2>
          <div className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("about.intro").split('\n\n').map((paragraph, index) => (
              <p key={index} className={index > 0 ? 'mt-6' : ''}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="flex items-start space-x-4 p-6 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className={`flex-shrink-0 w-8 h-8 ${feature.color}`}>
                  <IconComponent className="w-full h-full" />
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {feature.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full">
            {t("about.cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
