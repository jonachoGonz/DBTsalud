import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Brain, Users, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const TherapyServices = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Brain,
      title: t('therapies.dbt.title'),
      description: t('therapies.dbt.desc'),
      categories: ["Regulación Emocional", "Mindfulness", "Tolerancia al Malestar"],
      color: "bg-blue-100 text-blue-800"
    },
    {
      icon: Users,
      title: t('therapies.tcc.title'),
      description: t('therapies.tcc.desc'),
      categories: ["Reestructuración", "Exposición", "Activación Conductual"],
      color: "bg-green-100 text-green-800"
    },
    {
      icon: Heart,
      title: t('therapies.act.title'),
      description: t('therapies.act.desc'),
      categories: ["Valores", "Aceptación", "Compromiso"],
      color: "bg-purple-100 text-purple-800"
    },
    {
      icon: Star,
      title: t('therapies.pbt.title'),
      description: t('therapies.pbt.desc'),
      categories: ["Personalizada", "Basada en Procesos", "Flexible"],
      color: "bg-orange-100 text-orange-800"
    }
  ];

  return (
    <section id="therapy-types" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('therapies.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Terapias de tercera generación con enfoque personalizado y basadas en evidencia científica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 rounded-full ${service.color} flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {service.categories.map((category, catIndex) => (
                      <span 
                        key={catIndex}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    Find Therapists
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-blue-800 hover:bg-blue-900 text-white">
            {t('therapies.cta')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TherapyServices;
