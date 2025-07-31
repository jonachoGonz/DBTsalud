import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DBTHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
                href="/"
                className="flex items-center justify-center text-[rgb(252,248,241)] text-base leading-[20.8px] px-5 py-2.5 relative border border-transparent rounded-full transition-all duration-400 hover:border-[rgba(242,236,226,0.5)]"
              >
                {t('nav.inicio')}
              </a>
              <a
                href="/nosotros"
                className="flex items-center justify-center text-[rgb(252,248,241)] text-base leading-[20.8px] px-5 py-2.5 relative border border-transparent rounded-full transition-all duration-400 hover:border-[rgba(242,236,226,0.5)]"
              >
                {t('nav.nosotros')}
              </a>
              <a
                href="/terapias"
                className="flex items-center justify-center text-[rgb(252,248,241)] text-base leading-[20.8px] px-5 py-2.5 relative border border-transparent rounded-full transition-all duration-400 hover:border-[rgba(242,236,226,0.5)]"
              >
                {t('nav.terapias')}
              </a>
              <a
                href="/servicios"
                className="flex items-center justify-center text-[rgb(252,248,241)] text-base leading-[20.8px] px-5 py-2.5 relative border border-transparent rounded-full transition-all duration-400 hover:border-[rgba(242,236,226,0.5)]"
              >
                {t('nav.servicios')}
              </a>
              <a
                href="/equipo"
                className="flex items-center justify-center text-[rgb(252,248,241)] text-base leading-[20.8px] px-5 py-2.5 relative border border-transparent rounded-full transition-all duration-400 hover:border-[rgba(242,236,226,0.5)]"
              >
                {t('nav.equipo')}
              </a>
              <a
                href="/recursos"
                className="flex items-center justify-center text-[rgb(252,248,241)] text-base leading-[20.8px] px-5 py-2.5 relative border border-transparent rounded-full transition-all duration-400 hover:border-[rgba(242,236,226,0.5)]"
              >
                {t('nav.recursos')}
              </a>
              <a
                href="/contacto"
                className="flex items-center justify-center text-[rgb(252,248,241)] text-base leading-[20.8px] px-5 py-2.5 ml-6 relative border border-[rgba(242,236,226,0.5)] rounded-full transition-all duration-400 hover:bg-[rgba(242,236,226,0.1)]"
              >
                {t('nav.contacto')}
              </a>
            </nav>

            {/* Right side controls */}
            <div className="flex items-center gap-6">
              {/* Language Selector */}
              <div className="flex items-center gap-1 relative">
                <div 
                  className="text-[rgb(252,248,241)] text-[13.5px] leading-[17.55px] cursor-pointer"
                  onClick={toggleLanguage}
                >
                  {language === 'es' ? 'EN' : 'ES'}
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

              {/* CTA Button */}
              <a
                href="/agenda"
                className="hidden lg:flex items-center justify-center bg-[rgb(252,248,241)] text-black text-sm font-medium px-6 py-3 rounded-full transition-all duration-400 hover:bg-[rgba(252,248,241,0.9)]"
              >
                {t('cta.agenda')}
              </a>

              {/* Mobile menu button */}
              <button
                className="lg:hidden flex flex-col items-center justify-center w-[37px] h-[37px] gap-1"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="w-[15px] h-[1px] bg-[rgb(252,248,241)] transition-all duration-300"></div>
                <div className="w-[15px] h-[1px] bg-[rgb(252,248,241)] transition-all duration-300"></div>
                <div className="w-[15px] h-[1px] bg-[rgb(252,248,241)] transition-all duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-[120px] left-0 right-0 bg-[rgb(252,248,241)] mx-[30px] rounded-lg p-6 z-[97]">
          <nav className="flex flex-col gap-4">
            <a href="/" className="text-black text-base font-medium py-2">{t('nav.inicio')}</a>
            <a href="/nosotros" className="text-black text-base font-medium py-2">{t('nav.nosotros')}</a>
            <a href="/terapias" className="text-black text-base font-medium py-2">{t('nav.terapias')}</a>
            <a href="/servicios" className="text-black text-base font-medium py-2">{t('nav.servicios')}</a>
            <a href="/equipo" className="text-black text-base font-medium py-2">{t('nav.equipo')}</a>
            <a href="/recursos" className="text-black text-base font-medium py-2">{t('nav.recursos')}</a>
            <a href="/contacto" className="text-black text-base font-medium py-2">{t('nav.contacto')}</a>
            <div className="pt-4 border-t border-gray-200">
              <a
                href="/agenda"
                className="flex items-center justify-center bg-black text-white text-sm font-medium px-6 py-3 rounded-full"
              >
                {t('cta.agenda')}
              </a>
            </div>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-end h-full relative rounded-b-[40px] overflow-hidden pb-16 mb-0">
        {/* Background Image */}
        <img
          src="https://cdn.prod.website-files.com/671898ae57fbee5bf1da9fba/673daa20f8d824dc60d87727_6ca5979b6f014ba47a22c3f88928aabc_bg-1.webp"
          alt="Terapia DBT Salud"
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
        <div className="flex flex-col items-center justify-end text-center max-w-4xl mx-auto px-6">
          <div
            className="text-[rgba(242,236,226,0.6)] text-lg leading-6 text-center mb-6"
            style={{ letterSpacing: "-0.18px" }}
          >
            {t('hero.subtitle')}
          </div>
          <h1
            className="text-[rgb(252,248,241)] font-medium text-6xl md:text-7xl leading-tight text-center mb-8"
            style={{
              fontFamily: '"saans trial", sans-serif',
              letterSpacing: "-0.72px",
            }}
          >
            {t('hero.title')}
          </h1>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/comenzar"
              className="inline-flex items-center justify-center bg-[rgb(252,248,241)] text-black text-lg font-medium px-8 py-4 rounded-full transition-all duration-400 hover:bg-[rgba(252,248,241,0.9)]"
            >
              {t('hero.cta1')}
            </a>
            <a
              href="/programa-dbt"
              className="inline-flex items-center justify-center border-2 border-[rgb(252,248,241)] text-[rgb(252,248,241)] text-lg font-medium px-8 py-4 rounded-full transition-all duration-400 hover:bg-[rgba(252,248,241,0.1)]"
            >
              {t('hero.cta2')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
