export default function BenefitsSection() {
  const benefits = [
    {
      id: 1,
      title: "Optimized female health",
      subtitle: "Red light therapy can effectively support your fertility in the long-term.",
      description: "By increasing blood flow, supporting tissue regeneration and balancing hormones, CellLight™ supports your uterus and ovaries naturally.",
      image: "https://cdn.prod.website-files.com/671898ae57fbee5bf1da9fba/674033244546d6ee0abb7478_Frame%202087331480-2.webp",
      alt: "A young girl is watching from holding a small child in her arms",
      link: "/blog/red-light-therapy-lighting-the-road-to-fertility",
      features: ["Promotes healthy tissue", "Balances your hormones"],
      metrics: {
        title: "uterine blood flow: OPtimal",
        data: [
          { label: "PI", value: "0.65" },
          { label: "RI", value: "0.55" },
          { label: "S/D", value: "2.3" }
        ]
      }
    },
    {
      id: 2,
      title: "Enhanced deep sleep",
      subtitle: "Near-infrared light enhances mitochondrial function in neurons, helping improve deep sleep.",
      description: "CellLight™ will not disturb your natural sleep-wake-cycle and melatonin production.",
      image: "https://cdn.prod.website-files.com/671898ae57fbee5bf1da9fba/67403324759d4ba06050c510_Frame%202087331480-1.webp",
      alt: "Man is sleeping",
      link: "/blog/the-ultimate-guide-to-better-sleep-7-tips-for-a-restful-nights-sleep",
      features: ["Longer deep sleep", "Enhanced neuronal function", "Balances sleep hormone secretion"],
      sleepMetrics: [
        { label: "Deep Sleep Score", value: "Optimal", progress: 84 },
        { label: "Sleep efficiency", value: "Optimal", progress: 84 }
      ]
    },
    {
      id: 3,
      title: "Youthful skin",
      subtitle: "CellLight™ accelerates cellular repair and stem cell proliferation, leading to higher natural collagen and elastin production.",
      description: "This results in youthful, glowing and clear skin, allowing you to look as young as you feel in your heart.",
      image: "https://cdn.prod.website-files.com/671898ae57fbee5bf1da9fba/67409518627cee8a92540085_face.webp",
      alt: "young woman smiles",
      link: "/blog/how-red-light-therapy-is-an-anti-aging-game-changer",
      features: ["Accelerated cellular repair", "Non-invasively stimulated skin cell proliferation", "More natural collagen and elastin"],
      skinDiagram: "https://cdn.prod.website-files.com/671898ae57fbee5bf1da9fba/6745b4de9f1a61d812aad114_skin.svg"
    },
    {
      id: 4,
      title: "Extended longevity",
      subtitle: "CellLight™ helps mitochondria produce more energy (ATP), supporting long-term health and protecting against chronic conditions.",
      description: "Increasing cellular energy not only adds years to your life (lifespan) but also ensures those years are lived in good health (healthspan).",
      image: "https://cdn.prod.website-files.com/671898ae57fbee5bf1da9fba/674033242fdd7bd921085f15_Frame%202087331480.webp",
      alt: "The athletic girl is smiling",
      link: "/blog/unlocking-mitochondrial-power-enhancing-resilience-and-longevity",
      features: ["Improved cellular energy production", "Better functioning mitochondria", "Reduced aging velocity"],
      ageMetrics: {
        biological: "49",
        chronological: "52"
      }
    },
    {
      id: 5,
      title: "Boosted mental & physical resilience",
      subtitle: "Studies show consistent use of CellLight™ improves heart rate variability (HRV) over time and reduces oxidative stress.",
      description: "Higher HRV scores reflect greater mental and physical resilience. Lowering oxidative stress helps prevent conditions like atherosclerosis, hypertension, Alzheimer's disease, diabetes, infertility, chronic fatigue syndrome, and slows the aging process.",
      image: "https://cdn.prod.website-files.com/671898ae57fbee5bf1da9fba/6740332425a33e3de6ea9d44_Frame%202087331482.webp",
      alt: "A man is running on a treadmill",
      link: "/blog/maximize-your-fitness-gains-pair-your-workouts-with-red-light-therapy",
      features: ["Reduced oxidative stress", "Higher HRV"],
      hrvMetrics: {
        score: "152",
        status: "Energetic"
      }
    }
  ];

  return (
    <div className="max-w-[1280px] px-[160px] bg-[rgb(252,248,241)] mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center justify-start gap-2 pt-[120px] text-center">
        <div className="text-[rgba(0,0,0,0.3)] text-[13.5px] font-medium leading-[17.55px] text-center transition-all duration-800">
          Benefits
        </div>
        <h2 
          className="text-2xl font-medium leading-[28.8px] text-center transition-all duration-800"
          style={{ 
            fontFamily: '"saans trial", sans-serif',
            letterSpacing: '-0.24px'
          }}
        >
          Feel the difference in every aspect
        </h2>
      </div>

      {/* Benefits List */}
      <div className="flex flex-col gap-[10px] mt-10 pb-20">
        {benefits.map((benefit) => (
          <a
            key={benefit.id}
            href={benefit.link}
            className="flex bg-[rgb(242,236,226)] rounded-[40px] h-[450px] max-w-full cursor-pointer transition-all duration-800 hover:shadow-lg"
          >
            {/* Image Section */}
            <div 
              className="relative w-[400px] flex-shrink-0 rounded-[40px] overflow-hidden cursor-pointer"
              style={{
                backgroundImage: 'url("https://d3e54v103j8qbb.cloudfront.net/img/background-image.svg")',
                backgroundPosition: '0px 0px'
              }}
            >
              <img
                src={benefit.image}
                alt={benefit.alt}
                className="w-full h-full object-cover rounded-[40px] pointer-events-none"
                loading="lazy"
              />

              {/* Metrics Overlays */}
              {benefit.metrics && (
                <div className="absolute bottom-[30px] left-[30px] w-[251px] h-[103px] bg-[rgba(255,255,255,0.17)] backdrop-blur-[30px] rounded-lg p-5 flex flex-col gap-4">
                  <div className="text-[rgb(252,248,241)] font-mono text-[8px] leading-[9.6px] uppercase tracking-[-0.24px]">
                    {benefit.metrics.title}
                  </div>
                  <div className="flex gap-[26px]">
                    {benefit.metrics.data.map((item, index) => (
                      <div key={index} className="flex flex-col gap-[1.6px] w-[53px]">
                        <div className="text-[rgb(252,248,241)] font-mono text-[8px] leading-[9.6px] tracking-[-0.24px]">
                          {item.label}
                        </div>
                        <div className="text-[rgb(252,248,241)] text-[13.5px] font-medium leading-[17.55px]">
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {benefit.sleepMetrics && (
                <div className="absolute left-[40px] space-y-4">
                  {benefit.sleepMetrics.map((metric, index) => (
                    <div
                      key={index}
                      className={`bg-[rgba(255,255,255,0.17)] backdrop-blur-[30px] rounded-lg p-4 w-[250.88px] ${
                        index === 0 ? 'bottom-[104px]' : 'bottom-[40px]'
                      }`}
                      style={{ position: 'absolute', bottom: index === 0 ? '104px' : '40px' }}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <div className="text-[rgb(252,248,241)] font-mono text-[8px] leading-[9.6px] uppercase tracking-[-0.24px]">
                          {metric.label}
                        </div>
                        <div className="text-[rgb(252,248,241)] font-mono text-[8px] leading-[9.6px] tracking-[-0.24px]">
                          {metric.value}
                        </div>
                      </div>
                      <div className="w-full h-[3px] bg-[rgba(252,248,241,0.4)] rounded flex items-center">
                        <div 
                          className="h-full bg-[rgb(252,248,241)] rounded"
                          style={{ width: `${metric.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {benefit.skinDiagram && (
                <div className="absolute bottom-[30px] left-[30px] w-[240px] flex flex-col gap-[7px]">
                  <div className="bg-[rgba(255,255,255,0.17)] backdrop-blur-[30px] rounded-lg p-4 w-full h-[144px] flex flex-col justify-center gap-3">
                    <div className="relative flex items-center justify-center h-full">
                      <img
                        src={benefit.skinDiagram}
                        alt=""
                        className="h-[80px] object-cover"
                      />
                      <div className="absolute left-0 text-[rgb(252,248,241)] font-mono text-[8px] leading-[9.6px] uppercase tracking-[-0.24px]">
                        skin glow
                      </div>
                      <div className="absolute right-0 text-[rgb(252,248,241)] font-mono text-[8px] leading-[9.6px] uppercase tracking-[-0.24px] max-w-[62.4px]">
                        skin firmness
                      </div>
                      <div className="absolute top-0 text-[rgb(252,248,241)] font-mono text-[8px] leading-[9.6px] uppercase tracking-[-0.24px]">
                        skin tone evenness
                      </div>
                      <div className="absolute bottom-0 text-[rgb(252,248,241)] font-mono text-[8px] leading-[9.6px] uppercase tracking-[-0.24px]">
                        skin tone evenness
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {benefit.ageMetrics && (
                <div className="absolute bottom-[30px] left-[30px] w-[250px] h-[96px] bg-[rgba(255,255,255,0.17)] backdrop-blur-[30px] rounded-lg p-4 flex gap-5">
                  <div className="flex flex-col gap-[7px] justify-between">
                    <div className="text-[rgb(252,248,241)] font-mono text-[10px] leading-[12px] tracking-[-0.3px]">
                      BIOLOGICAL AGE
                    </div>
                    <div className="flex items-end gap-1">
                      <div className="text-[rgb(252,248,241)] text-[26px] leading-[28.6px] tracking-[-0.78px] min-w-[29.952px]">
                        {benefit.ageMetrics.biological}
                      </div>
                      <div className="text-[rgb(252,248,241)] text-base font-medium">
                        years
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[7px] justify-between">
                    <div className="text-[rgb(252,248,241)] font-mono text-[10px] leading-[12px] tracking-[-0.3px]">
                      CHRONOLOGICAL AGE
                    </div>
                    <div className="flex items-end gap-1">
                      <div className="text-[rgb(252,248,241)] text-[26px] leading-[28.6px] tracking-[-0.78px] min-w-[29.952px]">
                        {benefit.ageMetrics.chronological}
                      </div>
                      <div className="text-[rgb(252,248,241)] text-base font-medium">
                        years
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {benefit.hrvMetrics && (
                <div className="absolute bottom-[30px] left-[30px] w-[186px] h-[142px] bg-[rgba(255,255,255,0.17)] backdrop-blur-[30px] rounded-lg p-4 flex flex-col justify-start gap-3">
                  <div className="flex flex-col items-center justify-start gap-3">
                    <div className="text-[rgb(252,248,241)] font-mono text-[8px] leading-[9.6px] uppercase tracking-[-0.24px]">
                      heart rate variability
                    </div>
                    <div className="relative flex items-end justify-center">
                      {/* HRV Circle Chart */}
                      <svg width="108" height="54" viewBox="0 0 108 54" fill="none" className="cursor-pointer">
                        <path 
                          opacity="0.1" 
                          d="M3.38384 53.3387C3.38384 46.657 4.69991 40.0407 7.2569 33.8675C9.8139 27.6944 13.5617 22.0854 18.2864 17.3607C23.0111 12.636 28.6202 8.88812 34.7933 6.33112C40.9664 3.77413 47.5828 2.45806 54.2645 2.45806C60.9462 2.45806 67.5626 3.77413 73.7357 6.33112C79.9088 8.88812 85.5179 12.636 90.2426 17.3607C94.9673 22.0854 98.7151 27.6944 101.272 33.8675C103.829 40.0407 105.145 46.657 105.145 53.3387" 
                          stroke="#FCF8F1" 
                          strokeWidth="4.84581"
                        />
                        <path 
                          d="M3.38385 53.3254C3.38725 40.3642 8.33689 27.893 17.2225 18.457C26.1081 9.02112 38.2598 3.3319 51.1974 2.55059C64.1349 1.76928 76.883 5.95479 86.8396 14.2528C96.7961 22.5509 103.211 34.3358 104.774 47.2024" 
                          stroke="#FCF8F1" 
                          strokeWidth="4.84581" 
                          strokeDasharray="200" 
                          strokeDashoffset="0"
                        />
                      </svg>
                      <div className="absolute top-[28.8px] flex flex-col items-center justify-start">
                        <div className="text-[rgb(252,248,241)] text-[26px] leading-[28.6px] tracking-[-0.78px]">
                          {benefit.hrvMetrics.score}
                        </div>
                        <div className="text-[rgb(252,248,241)] text-base font-medium">
                          {benefit.hrvMetrics.status}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-1 justify-between p-10">
              <div className="flex flex-col gap-3 pr-[60px]">
                <div 
                  className="text-[36px] font-medium leading-[39.6px]"
                  style={{ 
                    fontFamily: '"saans trial", sans-serif',
                    letterSpacing: '-0.36px'
                  }}
                >
                  {benefit.title}
                </div>
                <p className="text-[rgba(0,0,0,0.5)] text-base leading-[22.4px]">
                  {benefit.subtitle}
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <p className="text-[rgba(0,0,0,0.5)] text-[13.5px] leading-[17.55px]">
                  {benefit.description}
                </p>
                <div className="flex gap-[10px]">
                  {benefit.features.map((feature, index) => (
                    <div 
                      key={index}
                      className="flex-1 border-b border-[rgba(0,0,0,0.1)] rounded-b-[12px] h-[78px] px-[14px] pt-[14px] pb-8"
                    >
                      <div className="flex flex-wrap gap-1 mt-[-3px] w-[130px]">
                        <div className="text-[rgba(0,0,0,0.5)] text-[13.5px] leading-[17.55px]">
                          {feature}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
