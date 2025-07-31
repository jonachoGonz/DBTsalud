import { useLanguage } from '@/contexts/LanguageContext';

const TherapySimpleFooter = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-blue-500 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - CTA */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              DBT Salud
              <br />
              <span className="text-blue-200">Tu bienestar transformado</span>
            </h2>
            <p className="text-blue-100 text-lg mb-6">
              {t('footer.quote')}
            </p>
          </div>

          {/* Right side - Navigation dots and links */}
          <div className="text-right">
            <div className="flex justify-end space-x-2 mb-6">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
              <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
              <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
            </div>
            
            <div className="space-y-2">
              <div><a href="/" className="text-blue-100 hover:text-white">{t('nav.inicio')}</a></div>
              <div><a href="/terapias" className="text-blue-100 hover:text-white">{t('nav.terapias')}</a></div>
              <div><a href="/equipo" className="text-blue-100 hover:text-white">{t('nav.equipo')}</a></div>
              <div><a href="#" className="text-blue-100 hover:text-white">{t('footer.privacy')}</a></div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-400 mt-12 pt-8 text-center">
          <p className="text-blue-100">
            &copy; 2024 DBT Salud. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default TherapySimpleFooter;
