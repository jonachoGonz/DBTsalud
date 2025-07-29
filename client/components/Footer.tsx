export default function Footer() {
  const navigationLinks = [
    { label: "Nosotros", href: "/nosotros" },
    { label: "Terapias", href: "/terapias" },
    { label: "Servicios", href: "/servicios" },
    { label: "Equipo", href: "/equipo" },
    { label: "Contacto", href: "/contacto" }
  ];

  const legalLinks = [
    { label: "Política de Privacidad", href: "/privacy-policy" },
    { label: "Términos y Condiciones", href: "/terms-conditions" },
    { label: "Código de Ética", href: "/codigo-etica" },
    { label: "Preguntas Frecuentes", href: "/faq" }
  ];

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/psi.karlagg",
      icon: (
        <svg width="100%" height="100%" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M25 13.2812C21.8174 13.2812 21.4183 13.2947 20.1684 13.3518C18.921 13.4087 18.0692 13.6068 17.3237 13.8965C16.5531 14.196 15.8996 14.5967 15.2481 15.2482C14.5966 15.8997 14.1959 16.5532 13.8964 17.3238C13.6067 18.0692 13.4087 18.921 13.3517 20.1684C13.2947 21.4183 13.2812 21.8174 13.2812 25C13.2812 28.1826 13.2947 28.5817 13.3517 29.8316C13.4087 31.079 13.6067 31.9308 13.8964 32.6762C14.1959 33.4468 14.5966 34.1003 15.2481 34.7519C15.8996 35.4034 16.5531 35.8041 17.3237 36.1036C18.0692 36.3932 18.921 36.5913 20.1684 36.6482C21.4183 36.7053 21.8174 36.7188 25 36.7188C28.1826 36.7188 28.5817 36.7053 29.8316 36.6482C31.079 36.5913 31.9308 36.3932 32.6762 36.1036C33.4468 35.8041 34.1003 35.4034 34.7519 34.7519C35.4034 34.1003 35.8041 33.4468 36.1036 32.6762C36.3932 31.9308 36.5913 31.079 36.6482 29.8316C36.7053 28.5817 36.7188 28.1826 36.7188 25C36.7188 21.8174 36.7053 21.4183 36.6482 20.1684C36.5913 18.921 36.3932 18.0692 36.1036 17.3238C35.8041 16.5532 35.4034 15.8997 34.7519 15.2482C34.1003 14.5967 33.4468 14.196 32.6762 13.8965C31.9308 13.6068 31.079 13.4087 29.8316 13.3518C28.5817 13.2947 28.1826 13.2812 25 13.2812ZM25 15.3927C28.1291 15.3927 28.4997 15.4047 29.7354 15.4611C30.878 15.5132 31.4984 15.7041 31.9114 15.8646C32.4584 16.0771 32.8488 16.3311 33.2588 16.7412C33.6689 17.1512 33.9229 17.5417 34.1354 18.0886C34.2959 18.5016 34.4868 19.122 34.5389 20.2646C34.5953 21.5003 34.6073 21.8709 34.6073 25C34.6073 28.1291 34.5953 28.4997 34.5389 29.7354C34.4868 30.878 34.2959 31.4984 34.1354 31.9114C33.9229 32.4584 33.6689 32.8488 33.2588 33.2588C32.8488 33.6689 32.4584 33.9229 31.9114 34.1354C31.4984 34.2959 30.878 34.4868 29.7354 34.5389C28.4999 34.5953 28.1293 34.6073 25 34.6073C21.8707 34.6073 21.5002 34.5953 20.2646 34.5389C19.122 34.4868 18.5016 34.2959 18.0886 34.1354C17.5416 33.9229 17.1512 33.6689 16.7411 33.2588C16.3311 32.8488 16.0771 32.4584 15.8646 31.9114C15.7041 31.4984 15.5132 30.878 15.461 29.7354C15.4046 28.4997 15.3927 28.1291 15.3927 25C15.3927 21.8709 15.4046 21.5003 15.461 20.2646C15.5132 19.122 15.7041 18.5016 15.8646 18.0886C16.0771 17.5417 16.3311 17.1512 16.7411 16.7412C17.1512 16.3311 17.5416 16.0771 18.0886 15.8646C18.5016 15.7041 19.122 15.5132 20.2646 15.4611C21.5003 15.4047 21.8709 15.3927 25 15.3927ZM25 18.9823C21.6765 18.9823 18.9823 21.6765 18.9823 25C18.9823 28.3235 21.6765 31.0177 25 31.0177C28.3235 31.0177 31.0177 28.3235 31.0177 25C31.0177 21.6765 28.3235 18.9823 25 18.9823ZM25 28.9062C22.8427 28.9062 21.0938 27.1573 21.0938 25C21.0938 22.8427 22.8427 21.0938 25 21.0938C27.1573 21.0938 28.9062 22.8427 28.9062 25C28.9062 27.1573 27.1573 28.9062 25 28.9062ZM32.6618 18.7445C32.6618 19.5212 32.0321 20.1507 31.2555 20.1507C30.4789 20.1507 29.8493 19.5212 29.8493 18.7445C29.8493 17.9679 30.4789 17.3383 31.2555 17.3383C32.0321 17.3383 32.6618 17.9679 32.6618 18.7445Z" fill="currentColor"/>
        </svg>
      )
    }
  ];

  const paymentMethods = [
    { name: "PayPal", src: "https://cdn.prod.website-files.com/671898ae57fbee5bf1da9fba/671b83d3df8f35516fe3654a_Paypal%20Logo%201.svg", width: "90px" },
    { name: "Mastercard", src: "https://cdn.prod.website-files.com/671898ae57fbee5bf1da9fba/671b83d35ef571f18754f1d9_mastercard.svg", width: "40px" },
    { name: "Maestro", src: "https://cdn.prod.website-files.com/671898ae57fbee5bf1da9fba/671b83d332502896ff0a6677_maestro-seeklogo%201.svg", width: "40px" },
    { name: "VISA", src: "https://cdn.prod.website-files.com/671898ae57fbee5bf1da9fba/671b83d3e35ea2884ff9c21d_Visa%20Inc.%20logo%201.svg", width: "60px" },
    { name: "American Express", src: "https://cdn.prod.website-files.com/671898ae57fbee5bf1da9fba/671b83d35c1ff059444f715d_american.svg", width: "72px" },
    { name: "Klarna", src: "https://cdn.prod.website-files.com/671898ae57fbee5bf1da9fba/671b83d38561e455c7a5523f_Klarna%20Logo%20black%201.svg", width: "72px" },
    { name: "JCB", src: "https://cdn.prod.website-files.com/671898ae57fbee5bf1da9fba/671b83d3683e74b31559ccff_JCB%20logo%201.svg", width: "39px" },
    { name: "Venmo", src: "https://cdn.prod.website-files.com/671898ae57fbee5bf1da9fba/671b83d3b160e90e4f7f07a3_Venmo%20Logo%201.svg", width: "82px" },
    { name: "Apple Pay", src: "https://cdn.prod.website-files.com/671898ae57fbee5bf1da9fba/671b83d3041007db7bdb4455_Apple%20Pay%20logo%201.svg", width: "49px" },
    { name: "Google Pay", src: "https://cdn.prod.website-files.com/671898ae57fbee5bf1da9fba/671b83d3cc6fd600174e2acb_Google%20Pay%20Logo%201.svg", width: "42px" }
  ];

  return (
    <div className="overflow-hidden relative bg-[rgb(252,248,241)]">
      <div className="mx-auto max-w-[1800px] px-[30px]">
        <div className="bg-black rounded-[40px] flex flex-col px-20 pt-20 pb-[62px] transition-all duration-800">
          <div className="grid grid-cols-4 grid-rows-4 justify-start items-start pb-[143px] pr-[194px]">
            
            {/* Logo and Social Media */}
            <div className="grid-area-[1_/_1_/_2_/_2] text-[rgb(252,248,241)]">
              <a href="/" className="inline-block max-w-full">
                <div className="text-3xl font-bold" style={{ fontFamily: '"saans trial", sans-serif' }}>
                  DBT Salud
                </div>
              </a>
              
              <div className="flex gap-[6px] mt-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    target="_blank"
                    href={social.href}
                    className="bg-[rgba(255,255,255,0.1)] rounded-[10px] w-[50px] h-[50px] overflow-hidden transition-all duration-400 hover:bg-[rgba(255,255,255,0.2)]"
                    rel="noopener noreferrer"
                  >
                    <div className="text-[rgb(252,248,241)] p-3">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Main Navigation */}
            <div className="grid-area-[1_/_2_/_3_/_3] flex flex-col gap-4 items-start justify-start">
              {navigationLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[rgb(252,248,241)] max-w-full relative group"
                >
                  <div>{link.label}</div>
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[rgb(252,248,241)] opacity-40 w-0 group-hover:w-full transition-all duration-600" />
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="grid-area-[1_/_3_/_4_/_4] flex flex-col gap-4 items-start justify-start">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-[rgba(242,236,226,0.5)] max-w-full relative group"
                >
                  <div>{link.label}</div>
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[rgba(242,236,226,0.5)] opacity-40 w-0 group-hover:w-full transition-all duration-600" />
                </a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-4 mr-[194px] mt-[46px] w-[260px]">
              <div className="flex items-center gap-[10px] justify-start">
                <div className="h-6 min-h-6 min-w-6 w-6">
                  <svg width="100%" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#FCF8F1"/>
                  </svg>
                </div>
                <div className="text-[rgb(252,248,241)] text-xs leading-[14.4px]">
                  Almirante Pastene 185, Providencia (oficina 204)
                </div>
              </div>

              <div className="flex items-center gap-[10px] justify-start">
                <div className="h-6 min-h-6 min-w-6 w-6">
                  <svg width="100%" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.2c.27-.27.35-.67.24-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" fill="#FCF8F1"/>
                  </svg>
                </div>
                <div className="text-[rgb(252,248,241)] text-xs leading-[14.4px]">
                  WhatsApp: +56949897699
                </div>
              </div>

              <div className="flex items-center gap-[10px] justify-start">
                <div className="h-6 min-h-6 min-w-6 w-6">
                  <svg width="100%" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="#FCF8F1"/>
                  </svg>
                </div>
                <div className="text-[rgb(252,248,241)] text-xs leading-[14.4px]">
                  Atención presencial y online
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="col-span-2 pt-[74px]">
              <p className="text-[rgba(252,248,241,0.4)] text-xs leading-[14.4px]">
                These statements have not been evaluated by the Food and Drug Administration. 
                In the European Union, the intended use of our products does not fall within the scope or article 2 section 1 of 2017/45 MDR. 
                Our products are not intended to diagnose, treat, cure, or prevent any disease.
              </p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center justify-between">
            {paymentMethods.map((payment) => (
              <div key={payment.name} style={{ width: payment.width }}>
                <img
                  src={payment.src}
                  alt={`${payment.name} logo`}
                  className="inline-block h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
