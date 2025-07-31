import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LuminousHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(0);
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <div className="bg-[rgb(252,248,241)] flex flex-col h-[928px] max-h-[928px] max-w-[1800px] min-h-[600px] pb-[30px] px-[30px] pt-[30px] relative z-[99]">
      {/* Header Section */}
      <section className="absolute left-0 right-0 top-[30px] mx-auto max-w-[calc(100%-60px)] z-[98]">
        <div className="relative z-[99]">
          <div className="flex items-center justify-between mx-auto pb-[30px] px-[30px] pt-[30px]">
            {/* Logo */}
            <a
              href="/"
              className="text-[rgb(252,248,241)] cursor-pointer float-left relative"
            >
              <div
                className="text-2xl font-bold"
                style={{ fontFamily: '"saans trial", sans-serif' }}
              >
                DBT Salud
              </div>
            </a>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-1 relative">
              <a
                href="/nosotros"
                className="flex items-center justify-center text-[rgb(252,248,241)] text-base leading-[20.8px] px-5 py-2.5 relative border border-transparent rounded-full transition-all duration-400 hover:border-[rgba(242,236,226,0.5)]"
              >
                Nosotros
              </a>
              <a
                href="/terapias"
                className="flex items-center justify-center text-[rgb(252,248,241)] text-base leading-[20.8px] px-5 py-2.5 relative border border-transparent rounded-full transition-all duration-400 hover:border-[rgba(242,236,226,0.5)]"
              >
                Terapias
              </a>
              <a
                href="/servicios"
                className="flex items-center justify-center text-[rgb(252,248,241)] text-base leading-[20.8px] px-5 py-2.5 relative border border-transparent rounded-full transition-all duration-400 hover:border-[rgba(242,236,226,0.5)]"
              >
                Servicios
              </a>
              <a
                href="/equipo"
                className="flex items-center justify-center text-[rgb(252,248,241)] text-base leading-[20.8px] px-5 py-2.5 relative border border-transparent rounded-full transition-all duration-400 hover:border-[rgba(242,236,226,0.5)]"
              >
                Equipo
              </a>
              <a
                href="/contacto"
                className="flex items-center justify-center text-[rgb(252,248,241)] text-base leading-[20.8px] px-5 py-2.5 ml-6 relative border border-[rgba(242,236,226,0.5)] rounded-full transition-all duration-400 hover:bg-[rgba(242,236,226,0.1)]"
              >
                Contacto
              </a>
            </nav>

            {/* Right side controls */}
            <div className="flex items-center gap-6">
              {/* Language Selector */}
              <div className="flex items-center gap-1 relative">
                <div className="text-[rgb(252,248,241)] text-[13.5px] leading-[17.55px] cursor-pointer">
                  EN
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="6"
                  viewBox="0 0 12 6"
                  fill="none"
                  className="text-[rgb(252,248,241)]"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.130033 0.163667C0.315787 -0.0406617 0.632011 -0.05572 0.83634 0.130033L6 4.82427L11.1637 0.130033C11.368 -0.05572 11.6842 -0.0406617 11.87 0.163667C12.0557 0.367996 12.0407 0.68422 11.8363 0.869974L6.33634 5.86997C6.14563 6.04335 5.85438 6.04335 5.66367 5.86997L0.163667 0.869974C-0.0406617 0.68422 -0.05572 0.367996 0.130033 0.163667Z"
                    fill="currentColor"
                    fillOpacity="0.5"
                  />
                </svg>
              </div>

              {/* Cart */}
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="text-[rgb(252,248,241)] text-[13.5px] leading-[17.55px] cursor-pointer">
                  Cart
                </div>
                <div className="relative flex items-center justify-center w-[37px] h-[37px] border border-[rgb(252,248,241)] rounded-full transition-all duration-400">
                  {cartCount > 0 && (
                    <div className="absolute -right-1 -top-1 bg-[rgb(252,248,241)] text-black text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </div>
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 37 38"
                    fill="none"
                    className="text-[rgb(252,248,241)]"
                  >
                    <path
                      d="M22.3373 13.8193H14.6641C13.5595 13.8193 12.6641 14.7148 12.6641 15.8193V23.4926C12.6641 24.5971 13.5595 25.4926 14.6641 25.4926H22.3373C23.4419 25.4926 24.3373 24.5971 24.3373 23.4926V15.8193C24.3373 14.7148 23.4419 13.8193 22.3373 13.8193Z"
                      stroke="currentColor"
                    />
                    <path
                      d="M20.7456 15.8955V12.5078C20.7456 11.4032 19.8501 10.5078 18.7456 10.5078H18.2559C17.1513 10.5078 16.2559 11.4032 16.2559 12.5078V15.8955"
                      stroke="currentColor"
                    />
                  </svg>
                </div>
              </div>

              {/* Mobile menu button */}
              <button
                className="lg:hidden flex flex-col items-center justify-center w-[37px] h-[37px] gap-1"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="w-[15px] h-[1px] bg-black transition-all duration-300"></div>
                <div className="w-[15px] h-[1px] bg-black transition-all duration-300"></div>
                <div className="w-[15px] h-[1px] bg-black transition-all duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-end h-full relative rounded-b-[40px] overflow-hidden pb-16 mb-0">
        {/* Background Image */}
        <img
          src="https://cdn.prod.website-files.com/671898ae57fbee5bf1da9fba/673daa20f8d824dc60d87727_6ca5979b6f014ba47a22c3f88928aabc_bg-1.webp"
          alt="Young woman looking for beauty and anti-aging interventions that are non-invasive and fun to use. She found Luminous Labs Red Light Therapy."
          className="absolute inset-0 w-full h-full object-cover -z-20 rounded-b-[40px]"
        />

        {/* Overlay Image with Animation */}
        <img
          src="https://cdn.prod.website-files.com/671898ae57fbee5bf1da9fba/673af047ffda0bac4655c97f_db80b98027f9694237c7f771a092fe61_bg-2.avif"
          alt=""
          className="absolute inset-0 w-full h-full object-cover -z-10 rounded-b-[40px] mix-blend-overlay"
          style={{
            animation: "fadeinout 4s ease-in-out infinite",
          }}
        />

        {/* Content */}
        <div className="flex flex-col items-center justify-end text-center">
          <div
            className="text-[rgba(242,236,226,0.6)] text-lg leading-6 text-center mb-4"
            style={{ letterSpacing: "-0.18px" }}
          >
            Terapia basada en evidencia: segura, efectiva y personalizada
          </div>
          <h1
            className="text-[rgb(252,248,241)] font-medium text-7xl leading-[79.2px] text-center"
            style={{
              fontFamily: '"saans trial", sans-serif',
              letterSpacing: "-0.72px",
            }}
          >
            Tu bienestar, transformado
          </h1>
        </div>
      </div>
    </div>
  );
}
