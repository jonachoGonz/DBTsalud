import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const TherapyHeader = () => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-semibold text-gray-900">DBT Salud</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
              {t('nav.inicio')}
            </a>
            <a href="/nosotros" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
              {t('nav.nosotros')}
            </a>
            <a href="/terapias" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
              {t('nav.terapias')}
            </a>
            <a href="/servicios" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
              {t('nav.servicios')}
            </a>
            <a href="/equipo" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
              {t('nav.equipo')}
            </a>
            <div
              className="text-gray-600 hover:text-gray-900 text-sm font-medium cursor-pointer transition-colors"
              onClick={toggleLanguage}
            >
              {language === 'es' ? 'EN' : 'ES'}
            </div>
            <Button className="bg-blue-500 text-white hover:bg-blue-600">
              {t('cta.agenda')}
            </Button>
          </nav>

          {/* Mobile - simplified */}
          <div className="md:hidden">
            <Button variant="outline" size="sm">
              Menu
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TherapyHeader;
