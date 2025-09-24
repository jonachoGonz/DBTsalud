import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import { useContent } from "@/hooks/use-content";

export default function DBTTherapies() {
  const { t, language } = useLanguage();
  const { data: content } = useContent<any>("luminous.therapies", language);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const therapies = (content?.items || []).map((it: any) => ({
    title: it.title,
    description: it.desc,
    image: it.image,
    altText: it.title,
    benefits: [],
    details: it.desc,
    overlay: { title: it.title, metrics: [{ label: 'INFO', value: '' }] }
  }));
  if (!therapies.length) {
    // fallback minimal items
    therapies.push(
      { title: t("therapies.dbt.title"), description: t("therapies.dbt.desc"), image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=450&fit=crop", altText: 'DBT', benefits: [], details: t("therapies.dbt.desc"), overlay: { title: 'DBT', metrics: [{ label: 'INFO', value: '' }] } },
      { title: t("therapies.tcc.title"), description: t("therapies.tcc.desc"), image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=450&fit=crop", altText: 'CBT', benefits: [], details: t("therapies.tcc.desc"), overlay: { title: 'CBT', metrics: [{ label: 'INFO', value: '' }] } }
    );
  }

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
        <div className="flex flex-col items-center gap-2 text-center pt-[120px] mb-20">
          <h2 className="font-bold text-stone-700 text-5xl text-center transition-all duration-700 tk-alegreya">
            {content?.title || t("therapies.title")}
          </h2>
        </div>

        {/* Therapy Cards Slider */}
        <div className="pb-[80px]">
          <div className="max-w-full overflow-hidden">
            <div
              ref={sliderRef}
              className="flex transition-transform duration-1000 ease-in-out"
              style={{ width: `${therapies.length * 100}%` }}
            >
              {therapies.map((therapy, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0"
                >
                  <div className="bg-[rgb(242,236,226)] rounded-[40px] flex h-[450px] max-w-full cursor-pointer transition-all duration-700 hover:shadow-lg">
                    <div className="relative w-[400px] flex-shrink-0 overflow-hidden rounded-[40px]"
                         style={{ backgroundImage: `url("${therapy.image}")`, backgroundPosition: '0px 0px' }}>
                      <img
                        src={therapy.image}
                        alt={therapy.altText}
                        className="w-full h-full object-cover rounded-[40px]"
                      />

                      {/* Dynamic overlay */}
                      {renderOverlay(therapy)}
                    </div>

                    <div className="flex flex-col justify-between flex-1 px-[40px] py-[40px]">
                      <div className="flex flex-col gap-3 pr-[60px]">
                        <h3 className="text-[36px] font-medium leading-[39.6px]"
                            style={{ fontFamily: '"saans trial", sans-serif', letterSpacing: '-0.36px' }}>
                          {therapy.title}
                        </h3>
                        <p className="text-base leading-[22.4px] text-gray-700">
                          {therapy.description}
                        </p>
                      </div>

                      <div className="flex flex-col gap-6">
                        <p className="text-[13.5px] leading-[17.55px] text-gray-600">
                          {therapy.details}
                        </p>
                        <div className="flex gap-[10px]">
                          {therapy.benefits.map((benefit, benefitIndex) => (
                            <div key={benefitIndex} className="flex-1 border border-gray-200 rounded-xl h-[78px] p-[14px] pb-8">
                              <div className="text-[13.5px] leading-[17.55px] text-gray-700">
                                {benefit}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-2 justify-center mt-10">
            <button
              onClick={goToPrevious}
              className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-[rgb(242,236,226)] transition-all duration-300 hover:bg-[rgb(232,226,216)] cursor-pointer"
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                className="w-full h-full text-current"
              >
                <path
                  d="M19 9L1 9M1 9L8.65 17M1 9L8.65 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-[rgb(242,236,226)] transition-all duration-300 hover:bg-[rgb(232,226,216)] cursor-pointer"
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                className="w-full h-full text-current"
              >
                <path
                  d="M1 9L19 9M19 9L11.35 17M19 9L11.35 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="flex gap-2 justify-center mt-4">
            {therapies.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  resetAutoSlide();
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-gray-800'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
