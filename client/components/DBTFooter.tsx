import { useLanguage } from "@/contexts/LanguageContext";
import { useContent } from "@/hooks/use-content";

export default function DBTFooter() {
  const { t, language } = useLanguage();
  const { data: footer } = useContent<any>("luminous.footer", language);

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">DBT Salud</h3>
            <p className="text-gray-300 leading-relaxed">
              {footer?.quote || t("footer.quote")}
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Navegación</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("nav.inicio")}
                </a>
              </li>
              <li>
                <a
                  href="/terapias"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("nav.terapias")}
                </a>
              </li>
              <li>
                <a
                  href="/equipo"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("nav.equipo")}
                </a>
              </li>
              <li>
                <a
                  href="/recursos"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("nav.recursos")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("footer.privacy")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contacto</h4>
            <div className="space-y-3 text-gray-300">
              <p>Almirante Pastene 185</p>
              <p>Providencia, oficina 204</p>
              <p className="pt-2">
                <a
                  href="https://wa.me/56949897699"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: +56 9 4989 7699
                </a>
              </p>
              <p>
                <a
                  href="https://instagram.com/psi.karlagg"
                  className="hover:text-white transition-colors"
                >
                  Instagram: @psi.karlagg
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 DBT Salud. Todos los derechos reservados.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-400 text-sm">
                Desarrollado con 💙 para tu bienestar
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
