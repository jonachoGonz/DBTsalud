import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const TherapyHero = () => {
  const { t } = useLanguage();

  return (
    <section id="inicio" className="relative bg-gray-50 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Floating Cards */}
        <div className="absolute top-8 left-8 md:left-16">
          <Card className="bg-emerald-400 text-white p-6 w-72 shadow-lg transform -rotate-2">
            <h3 className="font-semibold text-lg mb-2">
              ¿En qué te podemos ayudar?
            </h3>
            <p className="text-sm text-emerald-100">ej. Ansiedad, Depresión</p>
          </Card>
        </div>

        <div className="absolute top-8 right-8 md:right-16">
          <Card className="bg-blue-500 text-white p-6 w-64 shadow-lg transform rotate-3">
            <h3 className="font-semibold text-lg mb-2">
              ¿Dónde te encuentras?
            </h3>
            <p className="text-sm text-blue-100">ej. Providencia, Santiago</p>
          </Card>
        </div>

        {/* Main Content */}
        <div className="text-center mt-24 mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8">
            DBT Salud
          </h1>

          {/* Living Room Illustration Area */}
          <div className="relative max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-3xl p-8 md:p-16 shadow-sm">
              {/* Simple Living Room SVG Illustration */}
              <div className="relative h-64 md:h-80">
                {/* Floor */}
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gray-100 rounded-full"></div>

                {/* Orange Chair */}
                <div className="absolute bottom-4 left-8 w-20 h-16 bg-orange-400 rounded-lg"></div>
                <div className="absolute bottom-20 left-10 w-16 h-12 bg-orange-500 rounded-t-lg"></div>

                {/* Blue Sofa */}
                <div className="absolute bottom-4 right-16 w-32 h-20 bg-blue-500 rounded-lg"></div>
                <div className="absolute bottom-24 right-20 w-24 h-16 bg-blue-600 rounded-t-lg"></div>
                <div className="absolute bottom-24 right-44 w-6 h-16 bg-blue-600 rounded-l-lg"></div>

                {/* Lamp */}
                <div className="absolute bottom-20 left-32 w-2 h-16 bg-gray-600"></div>
                <div className="absolute bottom-36 left-28 w-10 h-8 bg-purple-300 rounded-full"></div>

                {/* Plant */}
                <div className="absolute bottom-4 right-4 w-4 h-12 bg-green-600"></div>
                <div className="absolute bottom-16 right-2 w-8 h-8 bg-green-400 rounded-full"></div>

                {/* Coffee Table */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-gray-300 rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Real Connections Text */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {t("hero.title")}
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/56949897699"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg rounded-full transition-colors"
              >
                {t("hero.cta1")}
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center justify-center border-2 border-blue-500 text-blue-500 hover:bg-blue-50 px-8 py-3 text-lg rounded-full transition-colors"
              >
                {t("hero.cta2")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TherapyHero;
