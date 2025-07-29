export default function BenefitsSection() {
  const therapies = [
    {
      id: 1,
      title: "Terapia Dialéctico-Conductual (DBT)",
      subtitle: "Tratamiento intensivo para desregulación emocional, crisis frecuentes y relaciones conflictivas.",
      description: "Incluye terapia individual, talleres de habilidades, coaching telefónico y trabajo en equipo para construir una vida con mayor equilibrio y sentido.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop",
      alt: "Persona en sesión de terapia DBT",
      link: "/terapias/dbt",
      features: ["Regulación emocional", "Tolerancia al malestar"],
      metrics: {
        title: "Efectividad: ALTA",
        data: [
          { label: "Sesiones", value: "16-24" },
          { label: "Duración", value: "6-12m" },
          { label: "Éxito", value: "85%" }
        ]
      }
    },
    {
      id: 2,
      title: "Terapia Cognitivo-Conductual (TCC)",
      subtitle: "Enfoque directo y práctico para transformar pensamientos y comportamientos problemáticos.",
      description: "Trabajo con metas claras, monitoreo del progreso y herramientas efectivas para ansiedad, depresión, trastornos alimentarios y más.",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=400&fit=crop",
      alt: "Consultorio de TCC",
      link: "/terapias/tcc",
      features: ["Técnicas estructuradas", "Herramientas prácticas", "Monitoreo constante"],
      progressMetrics: [
        { label: "Progreso semanal", value: "Óptimo", progress: 88 },
        { label: "Adherencia", value: "Excelente", progress: 92 }
      ]
    },
    {
      id: 3,
      title: "Terapia de Aceptación y Compromiso (ACT)",
      subtitle: "Acepta lo que no puedes controlar y comprométete con acciones alineadas a tus valores.",
      description: "Cultiva flexibilidad psicológica, reduce la lucha interna y avanza hacia una vida con mayor significado y autenticidad.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      alt: "Persona en meditación mindfulness",
      link: "/terapias/act",
      features: ["Flexibilidad psicológica", "Aceptación radical", "Valores personales"],
      mindfulnessChart: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop"
    },
    {
      id: 4,
      title: "Process-Based Therapy (PBT)",
      subtitle: "Enfoque innovador y personalizado que combina estrategias de distintas terapias basadas en evidencia.",
      description: "No se basa solo en diagnósticos, sino en entender los procesos únicos que sostienen tu malestar para intervenir de manera precisa y efectiva.",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop",
      alt: "Proceso terapéutico personalizado",
      link: "/terapias/pbt",
      features: ["Enfoque personalizado", "Procesos individuales", "Intervención precisa"],
      processMetrics: {
        personalization: "95%",
        effectiveness: "90%"
      }
    }
  ];

  return (
    <div className="max-w-[1280px] px-[160px] bg-[rgb(252,248,241)] mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center justify-start gap-2 pt-[120px] text-center">
        <div className="text-[rgba(0,0,0,0.3)] text-[13.5px] font-medium leading-[17.55px] text-center transition-all duration-800">
          Enfoques Terapéuticos
        </div>
        <h2
          className="text-2xl font-medium leading-[28.8px] text-center transition-all duration-800"
          style={{
            fontFamily: '"saans trial", sans-serif',
            letterSpacing: '-0.24px'
          }}
        >
          Transformación basada en evidencia
        </h2>
      </div>

      {/* Therapies List */}
      <div className="flex flex-col gap-[10px] mt-10 pb-20">
        {therapies.map((therapy) => (
          <a
            key={therapy.id}
            href={therapy.link}
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
                src={therapy.image}
                alt={therapy.alt}
                className="w-full h-full object-cover rounded-[40px] pointer-events-none"
                loading="lazy"
              />

              {/* Metrics Overlays */}
              {therapy.metrics && (
                <div className="absolute bottom-[30px] left-[30px] w-[251px] h-[103px] bg-[rgba(255,255,255,0.17)] backdrop-blur-[30px] rounded-lg p-5 flex flex-col gap-4">
                  <div className="text-[rgb(252,248,241)] font-mono text-[8px] leading-[9.6px] uppercase tracking-[-0.24px]">
                    {therapy.metrics.title}
                  </div>
                  <div className="flex gap-[26px]">
                    {therapy.metrics.data.map((item, index) => (
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

              {therapy.progressMetrics && (
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
