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
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("contact.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center ${info.color}`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-lg text-gray-700">{info.title}</p>
                  </div>
                </div>
              );
            })}

            <div className="pt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Horarios de atención
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>Lunes a Viernes: 9:00 - 19:00</p>
                <p>Sábados: 9:00 - 14:00</p>
                <p>Domingos: Cerrado</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Agenda tu primera consulta
              </h3>
              <form className="space-y-6">
                <div>
                  <Input placeholder="Nombre completo" className="h-12" />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Correo electrónico"
                    className="h-12"
                  />
                </div>
                <div>
                  <Input type="tel" placeholder="Teléfono" className="h-12" />
                </div>
                <div>
                  <Textarea
                    placeholder="Cuéntanos brevemente qué te trae por aquí..."
                    className="min-h-[120px]"
                  />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg">
                  Enviar mensaje
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="outline"
                    className="flex-1 border-green-600 text-green-600 hover:bg-green-50"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Llamar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
