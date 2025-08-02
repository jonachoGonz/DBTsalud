import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Monitor, Users, User, FileText } from "lucide-react";

export default function DBTServices() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Users,
      title: t("services.dbt.complete"),
      description: t("services.dbt.complete.desc"),
      color: "bg-blue-100 text-blue-800",
      iconColor: "text-blue-600",
    },
    {
      icon: Monitor,
      title: t("services.dbt.sud"),
      description: t("services.dbt.sud.desc"),
      color: "bg-green-100 text-green-800",
      iconColor: "text-green-600",
    },
    {
      icon: User,
      title: t("services.individual"),
      description: t("services.individual.desc"),
      color: "bg-purple-100 text-purple-800",
      iconColor: "text-purple-600",
    },
    {
      icon: FileText,
      title: t("services.evaluations"),
      description: t("services.evaluations.desc"),
      color: "bg-orange-100 text-orange-800",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("services.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center ${service.iconColor}`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">
                        {service.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <Badge key={featureIndex} className={service.color}>
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full">
            {t("services.cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
