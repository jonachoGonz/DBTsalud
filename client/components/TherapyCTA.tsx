import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MessageCircle, Clock, Shield, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TherapyCTA = () => {
  const { t } = useLanguage();

  return (
    <section id="contacto" className="py-20 bg-gradient-to-br from-blue-800 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("process.quote")}
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            {t("process.cta")} - Inicia tu proceso terapéutico con nosotros.
          </p>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          {/* Contact Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center">
              <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                WhatsApp
              </h3>
              <p className="text-blue-100">
                +56 9 4989 7699
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Instagram
              </h3>
              <p className="text-blue-100">
                @psi.karlagg
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Dirección
              </h3>
              <p className="text-blue-100">
                Almirante Pastene 185, Providencia, oficina 204
              </p>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div className="pt-6">
            <a
              href="https://wa.me/56994748507"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-blue-800 hover:bg-gray-100 px-8 py-4 text-lg font-medium rounded-full transition-colors"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Contactar por WhatsApp
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Mental Health Tips & Resources
          </h3>
          <p className="text-blue-100 mb-6">
            Subscribe to receive helpful articles and updates from mental health
            professionals.
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="Enter your email" className="h-12 bg-white" />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TherapyCTA;
