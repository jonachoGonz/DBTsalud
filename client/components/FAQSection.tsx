import { useState } from 'react';

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "When can I see/measure effects?",
      answer: "Consistent and correct usage is very important. Generally speaking after 3-4 weeks of use, you should be able to track the difference of the relevant biomarker for you. Contact us for more information."
    },
    {
      id: 2,
      question: "What is the difference between red light and NIR light?",
      answer: "Both Red Light and NIR light are a part of the light spectrum of the sun. Red Light emits wavelengths of between 600-700 nm and near-Infrared Light (NIR) is invisible to the naked eye and has a wavelength of 700nm to 1000nm. NIR can penetrate the skin much deeper than red light, including all soft tissue, connective tissue, and bone."
    },
    {
      id: 3,
      question: "Is red light an alternative to sunlight?",
      answer: "Natural sunlight offers massive benefits, but excess exposure to sunlight, however, can cause problems. This is where red light technology comes in. In recent years, using red light (photobiomodulation) has gained popularity as an alternative to sunlight, because of the amount of convenience and control it offers (like setting the intensity and wavelength). However, while red light is helpful for improving your overall well-being, increasing energy, and optimising sleep IT IS NOT a substitute for natural full-spectrum sunlight. Ideally, you want to get both in your daily routine – sunlight in the morning to help you wake up, boost vitamin D levels, improve mood, etc., and red light from a red light therapy device to boost mitochondrial function and improve your overall health and wellness. However, since getting regular doses of sunlight might not be possible for everyone (due to location, season, schedule, lifestyle, etc.), then red light technology is a great and convenient alternative to make up for the low amount of natural light!"
    },
    {
      id: 4,
      question: "Why does it look like that the LEDs are switched off in the NIR setting?",
      answer: "The near-infrared light spectrum is not visible to the human eye, and therefore any light that has a wavelength greater than around 750nm, you will not be able to see with your naked eye. Your body will still be feeling all the powers of the light wave lengths though!"
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
