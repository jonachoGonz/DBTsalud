import { useState } from 'react';

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "¿Cuándo puedo ver resultados en la terapia?",
      answer: "La constancia y el compromiso son fundamentales. Generalmente, después de 3-4 semanas de terapia regular, puedes empezar a notar cambios en tu bienestar emocional. Cada proceso es único y depende de tu historia personal y objetivos."
    },
    {
      id: 2,
      question: "¿Cuál es la diferencia entre DBT y TCC?",
      answer: "DBT (Terapia Dialéctico-Conductual) está especialmente diseñada para personas con desregulación emocional intensa, incluyendo talleres de habilidades y coaching telefónico. TCC (Terapia Cognitivo-Conductual) es más directa y práctica, enfocándose en identificar y cambiar patrones de pensamiento problemáticos. Ambas son efectivas, pero para diferentes necesidades."
    },
    {
      id: 3,
      question: "¿Ofrecen atención en español e inglés?",
      answer: "Sí, ofrecemos todos nuestros servicios tanto en español como en inglés. Nuestro equipo está capacitado para brindar terapia de calidad en ambos idiomas, adaptándose a tus necesidades lingüísticas y culturales."
    },
    {
      id: 4,
      question: "¿Cómo funciona la modalidad online?",
      answer: "Nuestras sesiones online tienen la misma efectividad que las presenciales. Utilizamos plataformas seguras y confidenciales que te permiten acceder a terapia desde la comodidad de tu hogar. Solo necesitas una conexión estable a internet y un dispositivo con cámara y micrófono."
    }
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="bg-[rgb(252,248,241)]">
      <div className="mx-auto max-w-[1280px] px-[160px]">
        <div className="flex items-start justify-between gap-[110px] py-[130px] pb-[200px]">
          {/* Left Content */}
          <div className="flex flex-col items-start gap-10 w-[449px] transition-all duration-800">
            <h4 
              className="text-2xl font-medium leading-[28.8px]"
              style={{ fontFamily: '"saans trial", sans-serif' }}
            >
              <span className="text-[rgba(0,0,0,0.3)]">
                We believe in meaningful conversations. To help you out, we provide{" "}
              </span>
              <span className="inline-block">
                a free 20-minute call
              </span>
              <span> to answer your questions.</span>
            </h4>
            
            <a 
              target="_blank" 
              href="https://calendly.com/luminousred/20-minutes-with-the-founders"
              className="flex items-center justify-center bg-black text-[rgb(252,248,241)] rounded-full h-[60px] px-10 gap-[10px] max-w-full transition-opacity duration-400 hover:opacity-80"
            >
              <div className="text-[15.2px] font-medium leading-[16.72px] transition-transform duration-400">
                Book a free call
              </div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="18" 
                viewBox="0 0 20 18" 
                fill="none"
                className="transition-transform duration-400"
              >
                <path 
                  d="M1 9L19 9M19 9L11.35 17M19 9L11.35 1" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* FAQ List */}
          <div className="w-[520px]">
            <div className="flex flex-col gap-[10px]">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-[rgb(242,236,226)] rounded-2xl cursor-pointer transition-opacity duration-400"
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <div className="flex items-start justify-between gap-16 p-6">
                    <div className="text-base font-medium leading-[22.4px]">
                      {faq.question}
                    </div>
                    <div className="mt-[3.2px] min-w-4 w-4 transition-transform duration-400">
                      <svg 
                        width="100%" 
                        height="auto" 
                        viewBox="0 0 18 21" 
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-transform duration-400 ${
                          openFAQ === faq.id ? 'rotate-180' : ''
                        }`}
                      >
                        <path 
                          d="M9 1.5L9 19.5M9 19.5L1 11.85M9 19.5L17 11.85" 
                          stroke="currentcolor" 
                          strokeWidth="1.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Answer */}
                  <div 
                    className={`flex flex-col overflow-hidden transition-all duration-400 ease-in-out ${
                      openFAQ === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="flex flex-col px-6 pb-6 transition-transform duration-400">
                      <div className="h-[10px]" />
                      <div className="text-[rgba(0,0,0,0.5)] text-[13.5px] leading-[17.55px]">
                        <p>{faq.answer}</p>
                      </div>
                      <div className="h-6" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
