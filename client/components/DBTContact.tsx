import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, MessageCircle, Instagram, Phone } from "lucide-react";

export default function DBTContact() {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: MapPin,
      title: t("contact.address"),
      color: "text-blue-600",
    },
    {
      icon: MessageCircle,
      title: t("contact.whatsapp"),
      color: "text-green-600",
    },
    {
      icon: Instagram,
      title: t("contact.instagram"),
      color: "text-pink-600",
    },
  ];

  return (
    <section id="contacto" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("contact.title")}
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div key={index} className="text-center">
                  <div
                    className={`w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 ${info.color}`}
                  >
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-lg text-gray-700 font-medium">{info.title}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Hours */}
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t("contact.hours.title")}
            </h3>
            <div className="space-y-2 text-gray-600">
              <p>{t("contact.hours.weekdays")}</p>
              <p>{t("contact.hours.saturday")}</p>
              <p>{t("contact.hours.sunday")}</p>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div className="text-center">
            <a
              href="https://wa.me/56949897699"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-full transition-colors"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
