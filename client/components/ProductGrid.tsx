export default function ProductGrid() {
  const services = [
    {
      id: 1,
      title: "Construye una vida con propósito y equilibrio emocional",
      category: "Programa DBT Completo",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=600&fit=crop",
      alt: "persona en sesión de terapia individual",
      link: "/servicios/dbt-completo",
      gradient: {
        from: "#6366F1",
        via: "#E0E7FF",
        to: "#4F46E5"
      }
    },
    {
      id: 2,
      title: "Terapia personalizada para tus necesidades únicas",
      category: "Terapia Individual",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=500&h=600&fit=crop",
      alt: "consultorio de psicología acogedor",
      link: "/servicios/terapia-individual",
      gradient: {
        from: "#10B981",
        via: "#D1FAE5",
        to: "#059669"
      }
    },
    {
      id: 3,
      title: "Comprende y transforma tu bienestar emocional",
      category: "Evaluaciones",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=600&fit=crop",
      alt: "profesional realizando evaluación psicológica",
      link: "/servicios/evaluaciones",
      gradient: {
        from: "#F59E0B",
        via: "#FEF3C7",
        to: "#D97706"
      }
    }
  ];

  return (
    <div className="bg-[rgb(252,248,241)] px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14 mb-16 max-w-7xl mx-auto">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-[rgb(252,248,241)] rounded-[40px] shadow-[rgba(197,16,16,0.03)_0px_4px_44px_10px] flex flex-col overflow-hidden relative group transition-all duration-800 hover:scale-105"
          >
            {/* Service Link Overlay */}
            <a
              href={service.link}
              className="absolute inset-0 z-10 cursor-pointer"
              aria-label={`Ver servicio de ${service.category}`}
            />

            {/* Image Container */}
            <div className="relative rounded-[40px] overflow-hidden">
              <img
                src={service.image}
                alt={service.alt}
                className="w-full h-64 lg:h-72 object-cover"
                loading="lazy"
              />
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(252,248,241,0.7)] via-transparent to-transparent rounded-[32px]" />
            </div>

            {/* Content Container */}
            <div className="flex flex-col flex-1 justify-between gap-8 p-6 lg:p-8">
              {/* Title */}
              <div className="max-w-[224px]">
                <p className="text-[rgba(0,0,0,0.5)] text-base leading-[22.4px]">
                  {service.title}
                </p>
              </div>

              {/* Category Badge */}
              <div className="relative flex items-center h-[59px] bg-[rgb(252,248,241)] border border-[rgba(194,189,181,0.5)] rounded-[30px] pl-12 overflow-hidden transition-all duration-600 hover:border-[rgba(194,189,181,0.8)]">
                {/* Gradient Circle */}
                <div
                  className="absolute left-4 w-5 h-5 rounded-full z-10 transition-all duration-600"
                  style={{
                    background: `radial-gradient(circle, ${service.gradient.from} 0%, ${service.gradient.via} 60%, ${service.gradient.to} 100%)`
                  }}
                />

                {/* Category Text */}
                <span
                  className="relative z-20 font-medium text-[16.5px] leading-[21.45px]"
                  style={{ fontFamily: '"saans trial", sans-serif' }}
                >
                  {service.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
