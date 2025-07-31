import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { PhoneCall, FileCheck, Search, Route, Play } from "lucide-react";

export default function DBTProcess() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: PhoneCall,
      title: t('process.step1'),
      number: "01"
    },
    {
      icon: FileCheck,
      title: t('process.step2'),
      number: "02"
    },
    {
      icon: Search,
      title: t('process.step3'),
      number: "03"
    },
    {
      icon: Route,
      title: t('process.step4'),
      number: "04"
    },
    {
      icon: Play,
      title: t('process.step5'),
      number: "05"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('process.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-blue-200 -translate-y-1/2"></div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-8 italic">
            "{t('process.quote')}"
          </blockquote>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full">
            {t('process.cta')}
          </Button>
        </div>
      </div>
    </section>
  );
}
