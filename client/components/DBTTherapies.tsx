import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";

export default function DBTTherapies() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const therapies = [
    {
      title: t("therapies.dbt.title"),
      description: t("therapies.dbt.desc"),
      color: "from-blue-500 to-blue-600",
      icon: "🧠",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=450&fit=crop",
      altText: "DBT Therapy",
      benefits: ["Mindfulness & Tolerancia", "Regulación Emocional"],
      details: "La Terapia Dialéctico-Conductual es especialmente efectiva para crisis emocionales y relaciones interpersonales complejas.",
      overlay: {
        title: "Regulación Emocional: ÓPTIMA",
        metrics: [
          { label: "DBT", value: "95%" },
          { label: "MIN", value: "8.5" },
          { label: "TOL", value: "9.2" }
        ]
      }
    },
    {
      title: t("therapies.tcc.title"),
      description: t("therapies.tcc.desc"),
      color: "from-green-500 to-green-600",
      icon: "💭",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=450&fit=crop",
      altText: "TCC Therapy",
      benefits: ["Reestructuración Cognitiva", "Activación Conductual", "Técnicas de Exposición"],
      details: "La TCC te ayuda a identificar patrones de pensamiento y desarrollar estrategias prácticas para el cambio.",
      overlay: {
        type: "progress",
        bars: [
          { label: "Pensamientos Negativos", percentage: 84, status: "Óptimo" },
          { label: "Reestructuración", percentage: 90, status: "Óptimo" }
        ]
      }
    },
    {
      title: t("therapies.act.title"),
      description: t("therapies.act.desc"),
      color: "from-purple-500 to-purple-600",
      icon: "🎯",
      image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=450&fit=crop",
      altText: "ACT Therapy",
      benefits: ["Aceptación Radical", "Clarificación de Valores", "Compromiso y Acción"],
      details: "ACT te ayuda a aceptar las experiencias difíciles mientras te conectas con lo que realmente valoras en la vida.",
      overlay: {
        type: "values",
        score: "8.9",
        label: "Propósito",
        directions: ["Valores Personales", "Aceptación", "Flexibilidad", "Compromiso"]
      }
    },
    {
      title: t("therapies.pbt.title"),
      description: t("therapies.pbt.desc"),
      color: "from-orange-500 to-orange-600",
      icon: "🔄",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=450&fit=crop",
      altText: "PBT Therapy",
      benefits: ["Procesos de Cambio Personalizados", "Flexibilidad Terapéutica", "Adaptación Continua"],
      details: "La terapia basada en procesos se centra en los mecanismos específicos de cambio más que en protocolos rígidos.",
      overlay: {
        type: "comparison",
        items: [
          { label: "PROCESO ACTUAL", icon: "A", text: "Personalizado" },
          { label: "PROCESO ESTÁNDAR", icon: "B", text: "Genérico" }
        ]
      }
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const startAutoSlide = () => {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % therapies.length);
      }, 5000); // Change slide every 5 seconds
    };

    startAutoSlide();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [therapies.length]);

  // Navigation functions
  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % therapies.length);
    resetAutoSlide();
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + therapies.length) % therapies.length);
    resetAutoSlide();
  };

  const resetAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % therapies.length);
    }, 5000);
  };

  // Slide transform calculation
  useEffect(() => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth;
      sliderRef.current.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }
  }, [currentSlide]);

  const renderOverlay = (therapy: typeof therapies[0]) => {
    if (therapy.overlay.type === "progress") {
      return (
        <>
          <div className="absolute bottom-[104px] left-[40px] backdrop-blur-[30px] bg-white/17 rounded-lg p-4 w-[250px]">
            <div className="flex justify-between items-center mb-3">
              <div className="text-xs uppercase text-[rgb(252,248,241)] font-mono">{therapy.overlay.bars?.[0].label}</div>
              <div className="text-xs text-[rgb(252,248,241)] font-mono">{therapy.overlay.bars?.[0].status}</div>
            </div>
            <div className="bg-white/40 rounded h-[3px] w-full">
              <div className="bg-[rgb(252,248,241)] rounded h-full" style={{ width: `${therapy.overlay.bars?.[0].percentage}%` }}></div>
            </div>
          </div>
          <div className="absolute bottom-[40px] left-[40px] backdrop-blur-[30px] bg-white/17 rounded-lg p-4 w-[250px]">
            <div className="flex justify-between items-center mb-3">
              <div className="text-xs uppercase text-[rgb(252,248,241)] font-mono">{therapy.overlay.bars?.[1].label}</div>
              <div className="text-xs text-[rgb(252,248,241)] font-mono">{therapy.overlay.bars?.[1].status}</div>
            </div>
            <div className="bg-white/40 rounded h-[3px] w-full">
              <div className="bg-[rgb(252,248,241)] rounded h-full" style={{ width: `${therapy.overlay.bars?.[1].percentage}%` }}></div>
            </div>
          </div>
        </>
      );
    }

    if (therapy.overlay.type === "values") {
      return (
        <div className="absolute bottom-[30px] left-[30px] backdrop-blur-[30px] bg-white/17 rounded-lg p-4 w-[240px] flex flex-col gap-2">
          <div className="flex items-center justify-center h-full relative">
            <div className="absolute text-xs uppercase text-[rgb(252,248,241)] font-mono top-0">{therapy.overlay.directions?.[0]}</div>
            <div className="absolute text-xs uppercase text-[rgb(252,248,241)] font-mono left-0">{therapy.overlay.directions?.[1]}</div>
            <div className="absolute text-xs uppercase text-[rgb(252,248,241)] font-mono right-0 max-w-[62px]">{therapy.overlay.directions?.[2]}</div>
            <div className="absolute text-xs uppercase text-[rgb(252,248,241)] font-mono bottom-0">{therapy.overlay.directions?.[3]}</div>
            <div className="flex flex-col items-center">
              <div className="text-[26px] leading-[28.6px] text-[rgb(252,248,241)]">{therapy.overlay.score}</div>
              <div className="text-base font-medium text-[rgb(252,248,241)]">{therapy.overlay.label}</div>
            </div>
          </div>
        </div>
      );
    }

    if (therapy.overlay.type === "comparison") {
      return (
        <div className="absolute bottom-[30px] left-[30px] backdrop-blur-[30px] bg-white/17 rounded-lg p-4 w-[250px] h-[96px] flex justify-between">
          <div className="flex flex-col justify-between">
            <div className="text-[10px] leading-3 text-[rgb(252,248,241)] font-mono">{therapy.overlay.items?.[0].label}</div>
            <div className="flex items-end gap-1">
              <div className="text-[26px] leading-[28.6px] text-[rgb(252,248,241)] min-w-[30px]">{therapy.overlay.items?.[0].icon}</div>
              <div className="text-base font-medium text-[rgb(252,248,241)]">{therapy.overlay.items?.[0].text}</div>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div className="text-[10px] leading-3 text-[rgb(252,248,241)] font-mono">{therapy.overlay.items?.[1].label}</div>
            <div className="flex items-end gap-1">
              <div className="text-[26px] leading-[28.6px] text-[rgb(252,248,241)] min-w-[30px]">{therapy.overlay.items?.[1].icon}</div>
              <div className="text-base font-medium text-[rgb(252,248,241)]">{therapy.overlay.items?.[1].text}</div>
            </div>
          </div>
        </div>
      );
    }

    // Default metrics overlay
    return (
      <div className="absolute bottom-[30px] left-[30px] backdrop-blur-[30px] bg-white/17 rounded-lg p-5 w-[251px] h-[103px] flex flex-col justify-between">
        <div className="text-xs uppercase tracking-wide text-[rgb(252,248,241)] font-mono opacity-80">
          {therapy.overlay.title}
        </div>
        <div className="flex gap-[26px]">
          {therapy.overlay.metrics?.map((metric, index) => (
            <div key={index} className="flex flex-col gap-[1.6px] w-[53px]">
              <div className="text-xs text-[rgb(252,248,241)] font-mono">{metric.label}</div>
              <div className="text-[13.5px] font-medium text-[rgb(252,248,241)]">{metric.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="terapias" className="py-20 bg-[rgb(252,248,241)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-2 text-center pt-[120px] mb-10">
          <div className="text-[13.5px] font-medium leading-[17.55px] text-center opacity-70 transition-all duration-700">
            Terapias
          </div>
          <h2 className="font-medium text-2xl leading-[28.8px] text-center transition-all duration-700"
              style={{ fontFamily: '"saans trial", sans-serif', letterSpacing: '-0.24px' }}>
            {t("therapies.title")}
          </h2>
        </div>

        {/* Therapy Cards */}
        <div className="flex flex-col gap-[10px] pb-[80px]">
          {/* DBT Card */}
          <div className="bg-[rgb(242,236,226)] rounded-[40px] flex h-[450px] max-w-full cursor-pointer transition-all duration-700 hover:shadow-lg">
            <div className="relative w-[400px] flex-shrink-0 overflow-hidden rounded-[40px]"
                 style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=450&fit=crop")', backgroundPosition: '0px 0px' }}>
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=450&fit=crop"
                alt="DBT Therapy"
                className="w-full h-full object-cover rounded-[40px]"
              />

              {/* Overlay with metrics */}
              <div className="absolute bottom-[30px] left-[30px] backdrop-blur-[30px] bg-white/17 rounded-lg p-5 w-[251px] h-[103px] flex flex-col justify-between">
                <div className="text-xs uppercase tracking-wide text-[rgb(252,248,241)] font-mono opacity-80">
                  Regulación Emocional: ÓPTIMA
                </div>
                <div className="flex gap-[26px]">
                  <div className="flex flex-col gap-[1.6px] w-[53px]">
                    <div className="text-xs text-[rgb(252,248,241)] font-mono">DBT</div>
                    <div className="text-[13.5px] font-medium text-[rgb(252,248,241)]">95%</div>
                  </div>
                  <div className="flex flex-col gap-[1.6px] w-[53px]">
                    <div className="text-xs text-[rgb(252,248,241)] font-mono">MIN</div>
                    <div className="text-[13.5px] font-medium text-[rgb(252,248,241)]">8.5</div>
                  </div>
                  <div className="flex flex-col gap-[1.6px] w-[53px]">
                    <div className="text-xs text-[rgb(252,248,241)] font-mono">TOL</div>
                    <div className="text-[13.5px] font-medium text-[rgb(252,248,241)]">9.2</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between flex-1 px-[40px] py-[40px]">
              <div className="flex flex-col gap-3 pr-[60px]">
                <h3 className="text-[36px] font-medium leading-[39.6px]"
                    style={{ fontFamily: '"saans trial", sans-serif', letterSpacing: '-0.36px' }}>
                  {therapies[0].title}
                </h3>
                <p className="text-base leading-[22.4px] text-gray-700">
                  {therapies[0].description}
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <p className="text-[13.5px] leading-[17.55px] text-gray-600">
                  La Terapia Dialéctico-Conductual es especialmente efectiva para crisis emocionales y relaciones interpersonales complejas.
                </p>
                <div className="flex gap-[10px]">
                  <div className="flex-1 border border-gray-200 rounded-xl h-[78px] p-[14px] pb-8">
                    <div className="text-[13.5px] leading-[17.55px] text-gray-700">
                      Mindfulness & Tolerancia
                    </div>
                  </div>
                  <div className="flex-1 border border-gray-200 rounded-xl h-[78px] p-[14px] pb-8">
                    <div className="text-[13.5px] leading-[17.55px] text-gray-700">
                      Regulación Emocional
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TCC Card */}
          <div className="bg-[rgb(242,236,226)] rounded-[40px] flex h-[450px] max-w-full cursor-pointer transition-all duration-700 hover:shadow-lg">
            <div className="relative w-[400px] flex-shrink-0 overflow-hidden rounded-[40px]"
                 style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=450&fit=crop")', backgroundPosition: '0px 0px' }}>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=450&fit=crop"
                alt="TCC Therapy"
                className="w-full h-full object-cover rounded-[40px]"
              />

              {/* Progress bars overlay */}
              <div className="absolute bottom-[104px] left-[40px] backdrop-blur-[30px] bg-white/17 rounded-lg p-4 w-[250px]">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-xs uppercase text-[rgb(252,248,241)] font-mono">Pensamientos Negativos</div>
                  <div className="text-xs text-[rgb(252,248,241)] font-mono">Óptimo</div>
                </div>
                <div className="bg-white/40 rounded h-[3px] w-full">
                  <div className="bg-[rgb(252,248,241)] rounded h-full w-[84%]"></div>
                </div>
              </div>

              <div className="absolute bottom-[40px] left-[40px] backdrop-blur-[30px] bg-white/17 rounded-lg p-4 w-[250px]">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-xs uppercase text-[rgb(252,248,241)] font-mono">Reestructuración</div>
                  <div className="text-xs text-[rgb(252,248,241)] font-mono">Óptimo</div>
                </div>
                <div className="bg-white/40 rounded h-[3px] w-full">
                  <div className="bg-[rgb(252,248,241)] rounded h-full w-[90%]"></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between flex-1 px-[40px] py-[40px]">
              <div className="flex flex-col gap-3 pr-[60px]">
                <h3 className="text-[36px] font-medium leading-[39.6px]"
                    style={{ fontFamily: '"saans trial", sans-serif', letterSpacing: '-0.36px' }}>
                  {therapies[1].title}
                </h3>
                <p className="text-base leading-[22.4px] text-gray-700">
                  {therapies[1].description}
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <p className="text-[13.5px] leading-[17.55px] text-gray-600">
                  La TCC te ayuda a identificar patrones de pensamiento y desarrollar estrategias prácticas para el cambio.
                </p>
                <div className="flex gap-[10px]">
                  <div className="flex-1 border border-gray-200 rounded-xl h-[78px] p-[14px] pb-8">
                    <div className="text-[13.5px] leading-[17.55px] text-gray-700">
                      Reestructuración Cognitiva
                    </div>
                  </div>
                  <div className="flex-1 border border-gray-200 rounded-xl h-[78px] p-[14px] pb-8">
                    <div className="text-[13.5px] leading-[17.55px] text-gray-700">
                      Activación Conductual
                    </div>
                  </div>
                  <div className="flex-1 border border-gray-200 rounded-xl h-[78px] p-[14px] pb-8">
                    <div className="text-[13.5px] leading-[17.55px] text-gray-700">
                      Técnicas de Exposición
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ACT Card */}
          <div className="bg-[rgb(242,236,226)] rounded-[40px] flex h-[450px] max-w-full cursor-pointer transition-all duration-700 hover:shadow-lg">
            <div className="relative w-[400px] flex-shrink-0 overflow-hidden rounded-[40px]">
              <img
                src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=450&fit=crop"
                alt="ACT Therapy"
                className="w-full h-full object-cover rounded-[40px]"
              />

              {/* Values diagram overlay */}
              <div className="absolute bottom-[30px] left-[30px] backdrop-blur-[30px] bg-white/17 rounded-lg p-4 w-[240px] flex flex-col gap-2">
                <div className="flex items-center justify-center h-full relative">
                  <div className="absolute text-xs uppercase text-[rgb(252,248,241)] font-mono top-0">Valores Personales</div>
                  <div className="absolute text-xs uppercase text-[rgb(252,248,241)] font-mono left-0">Aceptación</div>
                  <div className="absolute text-xs uppercase text-[rgb(252,248,241)] font-mono right-0 max-w-[62px]">Flexibilidad</div>
                  <div className="absolute text-xs uppercase text-[rgb(252,248,241)] font-mono bottom-0">Compromiso</div>

                  <div className="flex flex-col items-center">
                    <div className="text-[26px] leading-[28.6px] text-[rgb(252,248,241)]">8.9</div>
                    <div className="text-base font-medium text-[rgb(252,248,241)]">Propósito</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between flex-1 px-[40px] py-[40px]">
              <div className="flex flex-col gap-3">
                <h3 className="text-[36px] font-medium leading-[39.6px]"
                    style={{ fontFamily: '"saans trial", sans-serif', letterSpacing: '-0.36px' }}>
                  {therapies[2].title}
                </h3>
                <p className="text-base leading-[22.4px] text-gray-700">
                  {therapies[2].description}
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <p className="text-[13.5px] leading-[17.55px] text-gray-600">
                  ACT te ayuda a aceptar las experiencias difíciles mientras te conectas con lo que realmente valoras en la vida.
                </p>
                <div className="flex gap-[10px]">
                  <div className="flex-1 border border-gray-200 rounded-xl h-[78px] p-[14px] pb-8">
                    <div className="text-[13.5px] leading-[17.55px] text-gray-700">
                      Aceptación Radical
                    </div>
                  </div>
                  <div className="flex-1 border border-gray-200 rounded-xl h-[78px] p-[14px] pb-8">
                    <div className="text-[13.5px] leading-[17.55px] text-gray-700">
                      Clarificación de Valores
                    </div>
                  </div>
                  <div className="flex-1 border border-gray-200 rounded-xl h-[78px] p-[14px] pb-8">
                    <div className="text-[13.5px] leading-[17.55px] text-gray-700">
                      Compromiso y Acción
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PBT Card */}
          <div className="bg-[rgb(242,236,226)] rounded-[40px] flex h-[450px] max-w-full cursor-pointer transition-all duration-700 hover:shadow-lg">
            <div className="relative w-[400px] flex-shrink-0 overflow-hidden rounded-[40px]">
              <img
                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=450&fit=crop"
                alt="PBT Therapy"
                className="w-full h-full object-cover rounded-[40px]"
              />

              {/* Age comparison overlay */}
              <div className="absolute bottom-[30px] left-[30px] backdrop-blur-[30px] bg-white/17 rounded-lg p-4 w-[250px] h-[96px] flex justify-between">
                <div className="flex flex-col justify-between">
                  <div className="text-[10px] leading-3 text-[rgb(252,248,241)] font-mono">PROCESO ACTUAL</div>
                  <div className="flex items-end gap-1">
                    <div className="text-[26px] leading-[28.6px] text-[rgb(252,248,241)] min-w-[30px]">A</div>
                    <div className="text-base font-medium text-[rgb(252,248,241)]">Personalizado</div>
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="text-[10px] leading-3 text-[rgb(252,248,241)] font-mono">PROCESO ESTÁNDAR</div>
                  <div className="flex items-end gap-1">
                    <div className="text-[26px] leading-[28.6px] text-[rgb(252,248,241)] min-w-[30px]">B</div>
                    <div className="text-base font-medium text-[rgb(252,248,241)]">Genérico</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between flex-1 px-[40px] py-[40px]">
              <div className="flex flex-col gap-3">
                <h3 className="text-[36px] font-medium leading-[39.6px]"
                    style={{ fontFamily: '"saans trial", sans-serif', letterSpacing: '-0.36px' }}>
                  {therapies[3].title}
                </h3>
                <p className="text-base leading-[22.4px] text-gray-700">
                  {therapies[3].description}
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <p className="text-[13.5px] leading-[17.55px] text-gray-600">
                  La terapia basada en procesos se centra en los mecanismos específicos de cambio más que en protocolos rígidos.
                </p>
                <div className="flex gap-[10px]">
                  <div className="flex-1 border border-gray-200 rounded-xl h-[78px] p-[14px] pb-8">
                    <div className="text-[13.5px] leading-[17.55px] text-gray-700 w-full">
                      Procesos de Cambio Personalizados
                    </div>
                  </div>
                  <div className="flex-1 border border-gray-200 rounded-xl h-[78px] p-[14px] pb-8">
                    <div className="text-[13.5px] leading-[17.55px] text-gray-700">
                      Flexibilidad Terapéutica
                    </div>
                  </div>
                  <div className="flex-1 border border-gray-200 rounded-xl h-[78px] p-[14px] pb-8">
                    <div className="text-[13.5px] leading-[17.55px] text-gray-700">
                      Adaptación Continua
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
