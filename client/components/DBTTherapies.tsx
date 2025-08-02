import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DBTTherapies() {
  const { t } = useLanguage();

  const therapies = [
    {
      title: t("therapies.dbt.title"),
      description: t("therapies.dbt.desc"),
      color: "from-blue-500 to-blue-600",
      icon: "🧠",
    },
    {
      title: t("therapies.tcc.title"),
      description: t("therapies.tcc.desc"),
      color: "from-green-500 to-green-600",
      icon: "💭",
    },
    {
      title: t("therapies.act.title"),
      description: t("therapies.act.desc"),
      color: "from-purple-500 to-purple-600",
      icon: "🎯",
    },
    {
      title: t("therapies.pbt.title"),
      description: t("therapies.pbt.desc"),
      color: "from-orange-500 to-orange-600",
      icon: "🔄",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("therapies.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("therapies.intro")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {therapies.map((therapy, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300 border-0"
            >
              <CardHeader className="text-center pb-4">
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${therapy.color} flex items-center justify-center mx-auto mb-4 text-2xl`}
                >
                  {therapy.icon}
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">
                  {therapy.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 leading-relaxed">
                  {therapy.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full">
            {t("therapies.cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
