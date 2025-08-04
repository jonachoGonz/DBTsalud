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
    <section id="nosotros" className="py-20 bg-[rgb(252,248,241)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-700 mb-10 tk-alegreya">
            {t("about.title")}
          </h2>
          <p className="text-xl text-stone-700 max-w-4xl mx-auto leading-relaxed tk-alegreya">
            Creemos que cada persona tiene el potencial de sanar y construir una vida con propósito.
            Te ayudamos a encontrar tu camino hacia el bienestar emocional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Card 1 - Enfoque Profesional */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="text-sm opacity-80 mb-4 tk-alegreya">Nuestro Enfoque</div>
              <h3 className="text-2xl font-bold mb-4 leading-tight tk-alegreya">
                Espacio Profesional y Humano
              </h3>
              <p className="text-blue-100 leading-relaxed mb-6 tk-alegreya">
                Creamos un ambiente donde puedas sentirte escuchado, acompañado y comprendido desde el primer momento.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {features.slice(0, 2).map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <div key={index} className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <IconComponent className="w-4 h-4" />
                      </div>
                    );
                  })}
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                  <span className="text-white text-xl">→</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Especialización */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <div className="text-sm text-gray-500 mb-4 tk-alegreya">Nuestra Especialidad</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight tk-alegreya">
                Dificultades Emocionales Complejas
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6 tk-alegreya">
                Especializados en desregulación emocional, ansiedad, trastornos de personalidad, depresión y relaciones conflictivas.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <div className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">DBT</div>
                  <div className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">TCC</div>
                  <div className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">ACT</div>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                  <span className="text-gray-700 text-xl">→</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 - Enfoque Terapéutico */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 border border-green-200 relative overflow-hidden">
            <div className="relative z-10">
              <div className="text-sm text-green-600 mb-4 tk-alegreya">Nuestro Método</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight tk-alegreya">
                Psicoterapia Basada en Evidencia
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6 tk-alegreya">
                Enfoque flexible y adaptado a tus necesidades. Integramos terapias de tercera generación: DBT, TCC, ACT y PBT.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {features.slice(2, 4).map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <div key={index} className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
                        <IconComponent className="w-4 h-4 text-green-700" />
                      </div>
                    );
                  })}
                </div>
                <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-300 transition-colors">
                  <span className="text-green-700 text-xl">→</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button className="bg-stone-700 hover:bg-stone-800 text-white px-8 py-4 text-lg rounded-full tk-alegreya">
            {t("about.cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
