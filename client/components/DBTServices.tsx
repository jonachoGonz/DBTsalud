import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DBTServices() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      id: 1,
      title: "Your health, quantified",
      description: "Get insights into your heart, hormones, metabolism, and more – know exactly what's happening across your whole body.",
      image: "https://cdn.prod.website-files.com/63792ff4f3d6aa3d62071b61/687840f766efbcbe63d20869_how-it-works-health.avif",
      overlay: {
        title: "Health score",
        subtitle: "100+ markers",
        items: [
          { icon: "A", label: "Liver health", color: "bg-green-500/20 border-green-500/30" },
          { icon: "C", label: "Skin & hair", color: "bg-pink-500/20 border-pink-500/30" },
          { icon: "A", label: "Kidney", color: "bg-green-500/20 border-green-500/30" },
          { icon: "A", label: "Nutrition", color: "bg-green-500/20 border-green-500/30" },
          { icon: "A", label: "Metabolism", color: "bg-green-500/20 border-green-500/30" },
          { icon: "B", label: "Toxin exposure", color: "bg-yellow-500/20 border-yellow-500/30" },
          { icon: "B", label: "Heart", color: "bg-yellow-500/20 border-yellow-500/30" },
          { icon: "B", label: "Stress", color: "bg-yellow-500/20 border-yellow-500/30" },
          { icon: "B", label: "Sex hormones", color: "bg-yellow-500/20 border-yellow-500/30" },
          { icon: "A", label: "Energy", color: "bg-green-500/20 border-green-500/30" },
          { icon: "B", label: "Thyroid health", color: "bg-yellow-500/20 border-yellow-500/30" },
          { icon: "A", label: "Brain health", color: "bg-green-500/20 border-green-500/30" },
        ]
      }
    },
    {
      id: 2,
      title: "Your biological age, unlocked",
      description: "Chronological age is surface-level. Biological age reveals how fast or slow your body is really aging.",
      image: "https://cdn.prod.website-files.com/63792ff4f3d6aa3d62071b61/687840f8df9e00f24c4e2180_how-it-works-bio-age.avif",
      overlay: {
        type: "age",
        age: "25"
      }
    },
    {
      id: 3,
      title: "Next steps, simplified",
      description: "We've analyzed your lab results and have translated them to a clear plan. Built around your biology, goals, and what matters most.",
      image: "https://cdn.prod.website-files.com/63792ff4f3d6aa3d62071b61/687840f8d7089bca838d30d7_how-it-works-simplified.avif",
      overlay: {
        type: "plan"
      }
    }
  ];

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.children[0]?.clientWidth || 0;
      sliderRef.current.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }
  }, [currentSlide]);

  const renderOverlay = (slide: typeof slides[0]) => {
    if (slide.overlay?.type === "age") {
      return (
        <div className="absolute bottom-0 left-0 right-0 -mt-[35%] flex justify-center z-10">
          <div className="relative">
            <img
              src="https://cdn.prod.website-files.com/63792ff4f3d6aa3d62071b61/68889b79d1a5b7466ab894e3_superpower-bio-card.png"
              alt="Bio age card"
              className="rounded-[20.7px] h-[380px] shadow-[rgba(0,0,0,0.1)_-1px_6px_12px_0px,rgba(0,0,0,0.09)_-2px_22px_22px_0px,rgba(0,0,0,0.05)_-5px_50px_30px_0px,rgba(0,0,0,0.01)_-9px_88px_36px_0px]"
            />
            <div className="absolute top-[21.6941px] right-[30.9916px] text-[67.7941px] text-white font-bold leading-none">
              {slide.overlay.age}
            </div>
          </div>
        </div>
      );
    }

    if (slide.overlay?.type === "plan") {
      return (
        <div className="absolute bottom-0 left-0 right-0 -mt-[35%] flex justify-center z-10">
          <img
            src="https://cdn.prod.website-files.com/63792ff4f3d6aa3d62071b61/6873bd6a13db5127a736a18f_Content%20Container%20(1).avif"
            alt="Plan overview"
            className="rounded-[20.7px] h-[380px] shadow-[rgba(0,0,0,0.1)_-1px_6px_12px_0px,rgba(0,0,0,0.09)_-2px_22px_22px_0px,rgba(0,0,0,0.05)_-5px_50px_30px_0px,rgba(0,0,0,0.01)_-9px_88px_36px_0px]"
          />
        </div>
      );
    }

    // Default health score overlay
    return (
      <div className="absolute bottom-0 left-0 right-0 -mt-[35%] flex justify-center z-10">
        <div className="backdrop-blur-[100px] bg-[rgba(37,41,39,0.4)] rounded-[20.7px] p-[23.2437px] w-[400px] h-[380px] flex flex-col justify-between shadow-[rgba(0,0,0,0.1)_-1px_6px_12px_0px,rgba(0,0,0,0.09)_-2px_22px_22px_0px,rgba(0,0,0,0.05)_-5px_50px_30px_0px,rgba(0,0,0,0.01)_-9px_88px_36px_0px]">
          <div className="flex justify-between items-center text-white">
            <h4 className="text-[23.2437px] font-medium leading-[30.9141px] tracking-[-0.348655px]">
              {slide.overlay.title}
            </h4>
            <div className="opacity-30">
              {slide.overlay.subtitle}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[7.7479px] text-white">
            {slide.overlay.items?.map((item, index) => (
              <div key={index} className={`flex items-center gap-[10px] bg-white/10 border border-white/20 rounded-full px-[5px] py-[5px] ${item.color}`}>
                <div className="flex items-center justify-center h-[28px] w-[29px]">
                  <div className="text-sm font-bold">{item.icon}</div>
                </div>
                <div className="text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-white overflow-hidden relative">
      <div className="px-[38.7395px] pr-[38.7395px]">
        <div className="pb-[61.9832px] pt-[61.9832px] relative">
          <div className="justify-center ml-auto mr-auto max-w-[1239.66px] w-full">
            <div className="flex flex-col gap-0">
              <div className="flex items-end gap-[77.479px] justify-between">
                <div className="w-full">
                  <div className="flex-grow">
                    <div className="mb-[15.4958px]">
                      <div className="font-['nb_international_mono_pro',arial,sans-serif] text-[13.5588px] tracking-[-0.309916px] leading-[20.3382px] opacity-60 uppercase">
                        How it works
                      </div>
                    </div>
                    <div className="flex items-start justify-between">
                      <div className="max-w-[991.731px] w-full">
                        <div className="mb-[15.4958px]">
                          <h2 className="text-[61.9832px] tracking-[-1.23966px] leading-[69.7311px]">
                            Test to know what's finally happening on the inside
                          </h2>
                        </div>
                      </div>
                      <div className="flex items-center flex-wrap gap-[15.4958px] justify-end">
                        <a
                          href="#"
                          className="bg-[rgb(252,95,43)] rounded-full text-white cursor-pointer text-[19.3697px] tracking-[-0.242122px] leading-[27.1176px] px-[23.2437px] py-[15.4958px] text-center transition-all duration-200 hover:bg-[rgb(242,85,33)]"
                        >
                          Start testing
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ml-[-7.7479px] mr-[-7.7479px] mt-[38.7395px] relative touch-pan-y w-full z-10">
                <div
                  ref={sliderRef}
                  className="flex gap-0 h-full relative transition-transform duration-300 ease-in-out z-10"
                  style={{ transform: `translateX(-${currentSlide * 619.484}px)` }}
                >
                  {slides.map((slide, index) => (
                    <div
                      key={slide.id}
                      className="flex items-center justify-center flex-shrink-0 px-[7.7479px] relative w-1/2 min-w-[526.857px]"
                      role="group"
                      aria-label={`${index + 1} / ${slides.length}`}
                    >
                      <div className="h-full relative w-full">
                        <a href="#" className="cursor-pointer inline-block max-w-full min-w-[526.857px] relative w-full">
                          <div className="cursor-pointer w-full">
                            <div className="cursor-pointer max-w-[309.916px] w-full">
                              <div className="cursor-pointer mb-[7.7479px]">
                                <div className="cursor-pointer font-['nb_international_mono_pro',arial,sans-serif] text-[13.5588px] tracking-[-0.309916px] leading-[20.3382px] opacity-60 uppercase">
                                  [{index + 1}]
                                </div>
                              </div>
                              <div className="cursor-pointer mb-[7.7479px]">
                                <h4 className="cursor-pointer text-[23.2437px] tracking-[-0.348655px] leading-[30.9141px]">
                                  {slide.title}
                                </h4>
                              </div>
                              <div className="cursor-pointer flex justify-between mb-[30.9916px]">
                                <div className="cursor-pointer">
                                  {slide.description}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="cursor-pointer h-[311.466px] overflow-hidden relative w-full">
                            <img
                              alt=""
                              src={slide.image}
                              className="absolute bottom-0 cursor-pointer h-[311.466px] left-0 max-w-full object-cover right-0 top-0 w-full"
                            />
                          </div>

                          {renderOverlay(slide)}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center flex-wrap gap-[30.9916px] justify-between mt-[61.9832px]">
                <div className="flex items-stretch flex-wrap gap-[15.4958px] justify-center w-full">
                  {/* Previous Button */}
                  <div className="cursor-pointer" onClick={goToPrevious}>
                    <a
                      href="#"
                      className="flex items-center bg-[rgba(0,0,0,0.05)] rounded-full cursor-pointer h-[46.4874px] justify-center max-w-full transition-colors duration-300 hover:bg-[rgba(0,0,0,0.1)] w-[46.4874px]"
                    >
                      <ChevronLeft className="h-[23.2437px] w-[23.2437px]" />
                    </a>
                  </div>

                  {/* Slide Indicators */}
                  <div className="flex items-center bg-[rgba(0,0,0,0.05)] rounded-full gap-[7.7479px] justify-start px-[23.2437px] py-[15.4958px]">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-[7.7479px] h-[7.7479px] rounded-full cursor-pointer text-center transition-colors duration-300 ${
                          index === currentSlide
                            ? 'bg-black'
                            : 'bg-[rgba(0,0,0,0.25)] hover:bg-[rgba(0,0,0,0.4)]'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={index === currentSlide ? 'true' : undefined}
                      />
                    ))}
                  </div>

                  {/* Next Button */}
                  <div
                    className={`cursor-pointer ${currentSlide === slides.length - 1 ? 'opacity-25 pointer-events-none' : ''}`}
                    onClick={currentSlide < slides.length - 1 ? goToNext : undefined}
                  >
                    <div className="flex items-center bg-[rgba(0,0,0,0.05)] rounded-full cursor-pointer h-[46.4874px] justify-center transition-colors duration-300 hover:bg-[rgba(0,0,0,0.1)] w-[46.4874px]">
                      <ChevronRight className="h-[23.2437px] w-[23.2437px]" />
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
