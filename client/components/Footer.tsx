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

            {/* Stats */}
            <div className="flex flex-col gap-4 mr-[194px] mt-[46px] w-[260px]">
              <div className="flex items-center gap-[10px] justify-start">
                <div className="h-6 min-h-6 min-w-6 w-6">
                  <svg width="100%" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_profile_icon)">
                      <path d="M12 13.7998C13.5802 13.7998 15.9727 14.2912 17.9629 15.2725C19.97 16.2621 21.4502 17.6865 21.4502 19.5V22.2002H2.5498V19.5C2.54981 17.6865 4.02999 16.2621 6.03711 15.2725C8.02729 14.2912 10.4198 13.7998 12 13.7998ZM10.1055 2.17676C10.897 1.8489 11.7583 1.73279 12.6045 1.83691L12.9658 1.89551C13.8059 2.06264 14.5858 2.44446 15.2314 3.00098L15.5 3.25C16.1057 3.85567 16.5428 4.60629 16.7705 5.42773L16.8545 5.78418C17.0216 6.62422 16.9682 7.49133 16.7012 8.30078L16.5732 8.64453C16.2454 9.43587 15.7187 10.1267 15.0469 10.6514L14.75 10.8662C13.936 11.41 12.9789 11.7002 12 11.7002C10.7693 11.7002 9.58573 11.242 8.67773 10.4199L8.5 10.25C7.5717 9.3217 7.0498 8.06282 7.0498 6.75C7.04981 5.89329 7.27237 5.05346 7.69238 4.31152L7.88379 4C8.35966 3.28781 9.01122 2.71266 9.77246 2.3291L10.1055 2.17676Z" stroke="#FCF8F1" strokeWidth="0.6"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_profile_icon">
                        <rect width="24" height="24" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="text-[rgb(252,248,241)] text-xs leading-[14.4px]">
                  Combined across all platforms: 11k followers
                </div>
              </div>

              <div className="flex items-center gap-[10px] justify-start">
                <div className="h-6 min-h-6 min-w-6 w-6">
                  <svg width="100%" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_bell_icon)">
                      <path d="M14.9414 20.5498C14.7194 20.9122 14.4325 21.2314 14.0938 21.4902L13.8887 21.6357C13.3273 22.0033 12.671 22.1985 12 22.1992C11.4129 22.1985 10.8369 22.0494 10.3262 21.7656L10.1113 21.6357C9.6828 21.3551 9.32411 20.9833 9.05859 20.5498H14.9414Z" stroke="#FCF8F1" strokeWidth="0.6"/>
                      <path d="M13.6211 1.7998L13.9541 3.7998L13.9873 3.99805L14.1836 4.04297C15.7087 4.38987 16.7658 5.23914 17.4482 6.39453C18.1356 7.55828 18.4502 9.04638 18.4502 10.6631V13.5996L18.5098 13.6797L20.7002 16.5996V18.4502H3.2998V16.5996L5.49023 13.6797L5.5498 13.5996V10.6631C5.5498 9.04027 5.86213 7.55263 6.54785 6.39062C7.22859 5.23715 8.28512 4.39 9.81641 4.04297L10.0127 3.99805L10.0459 3.7998L10.3789 1.7998H13.6211Z" stroke="#FCF8F1" strokeWidth="0.6"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_bell_icon">
                        <rect width="24" height="24" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="text-[rgb(252,248,241)] text-xs leading-[14.4px]">
                  Daily: 50 requests/DMs
                </div>
              </div>

              <div className="flex items-center gap-[10px] justify-start">
                <div className="h-6 min-h-6 min-w-6 w-6">
                  <svg width="100%" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_columns_icon)">
                      <path d="M5.7002 14.5498V22.9502H2.5498V14.5498H5.7002Z" stroke="#FCF8F1" strokeWidth="0.6"/>
                      <path d="M16.2002 10.0498V22.9502H13.0498V10.0498H16.2002Z" stroke="#FCF8F1" strokeWidth="0.6"/>
                      <path d="M21.4502 4.7998V22.9502H18.2998V4.7998H21.4502Z" stroke="#FCF8F1" strokeWidth="0.6"/>
                      <path d="M10.9502 1.0498V22.9502H7.7998V1.0498H10.9502Z" stroke="#FCF8F1" strokeWidth="0.6"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_columns_icon">
                        <rect width="24" height="24" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="text-[rgb(252,248,241)] text-xs leading-[14.4px]">
                  Growth: 2% organic growth monthly
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
