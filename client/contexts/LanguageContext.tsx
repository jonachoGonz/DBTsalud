import { createContext, useContext, useState, ReactNode } from "react";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

interface Translations {
  [key: string]: {
    es: string;
    en: string;
  };
}

const translations: Translations = {
  // Header
  "nav.inicio": { es: "Inicio", en: "Home" },
  "nav.nosotros": { es: "Sobre Nosotros", en: "About Us" },
  "nav.terapias": { es: "Terapias", en: "Therapies" },
  "nav.servicios": { es: "Servicios", en: "Services" },
  "nav.equipo": { es: "Equipo", en: "Team" },
  "nav.recursos": { es: "Recursos", en: "Resources" },
  "nav.contacto": { es: "Contacto", en: "Contact" },
  "cta.agenda": {
    es: "Agenda tu primera sesión",
    en: "Schedule your first session",
  },

  // Hero Section
  "hero.title": {
    es: "No necesitas tenerlo todo claro. A veces, solo hace falta tomar el primer paso.",
    en: "You don't need to have it all figured out. Sometimes, you just need to take the first step.",
  },
  "hero.subtitle": {
    es: "Acompañamos procesos terapéuticos con calidez, evidencia y humanidad. Atención psicológica online y presencial, en español e inglés, desde Chile.",
    en: "We accompany therapeutic processes with warmth, evidence and humanity. Online and in-person psychological care, in Spanish and English, from Chile.",
  },
  "hero.cta1": { es: "Quiero comenzar terapia", en: "I want to start therapy" },
  "hero.cta2": { es: "Conoce el Programa DBT", en: "Learn about DBT Program" },

  // About Section
  "about.title": { es: "Somos DBT Salud", en: "We are DBT Salud" },
  "about.intro": {
    es: "En DBT Salud creemos que cada persona, sin importar su historia, tiene el potencial de sanar y construir una vida con propósito. Por eso creamos un espacio profesional, humano y cercano, donde puedas sentirte escuchado, acompañado y comprendido.\n\nNos especializamos en tratar dificultades emocionales complejas como desregulación emocional, ansiedad, trastornos de personalidad, depresión, relaciones conflictivas y más. También acompañamos procesos de crecimiento personal, toma de decisiones importantes y desarrollo emocional.\n\nOfrecemos psicoterapia basada en evidencia, con un enfoque flexible y adaptado a tus necesidades. Integramos terapias como DBT, TCC, ACT y PBT.",
    en: "At DBT Salud we believe that every person, regardless of their history, has the potential to heal and build a life with purpose. That's why we create a professional, human and close space, where you can feel heard, accompanied and understood.\n\nWe specialize in treating complex emotional difficulties such as emotional dysregulation, anxiety, personality disorders, depression, conflictual relationships and more. We also accompany personal growth processes, important decision making and emotional development.\n\nWe offer evidence-based psychotherapy, with a flexible approach adapted to your needs. We integrate therapies such as DBT, CBT, ACT and PBT.",
  },
  "about.personalized": {
    es: "Enfoque personalizado",
    en: "Personalized approach",
  },
  "about.therapies": {
    es: "Terapias de tercera generación",
    en: "Third generation therapies",
  },
  "about.support": {
    es: "Acompañamiento empático en procesos complejos",
    en: "Empathetic accompaniment in complex processes",
  },
  "about.bilingual": {
    es: "Atención en español e inglés",
    en: "Care in Spanish and English",
  },
  "about.cta": { es: "Conoce nuestra visión", en: "Learn about our vision" },

  // Therapies Section
  "therapies.title": { es: "Terapias que ofrecemos", en: "Therapies we offer" },
  "therapies.intro": {
    es: "Sabemos que cada proceso terapéutico es único. Por eso, adaptamos las terapias a tu historia y necesidades personales.",
    en: "We know that each therapeutic process is unique. That's why we adapt therapies to your history and personal needs.",
  },
  "therapies.dbt.title": {
    es: "DBT (Terapia Dialéctico-Conductual)",
    en: "DBT (Dialectical Behavior Therapy)",
  },
  "therapies.dbt.desc": {
    es: "Enfoque intensivo ideal para crisis emocionales, impulsividad y relaciones conflictivas.",
    en: "Intensive approach ideal for emotional crises, impulsivity and conflictual relationships.",
  },
  "therapies.tcc.title": {
    es: "TCC (Terapia Cognitivo-Conductual)",
    en: "CBT (Cognitive-Behavioral Therapy)",
  },
  "therapies.tcc.desc": {
    es: "Identifica y transforma pensamientos y conductas que afectan tu bienestar.",
    en: "Identifies and transforms thoughts and behaviors that affect your well-being.",
  },
  "therapies.act.title": {
    es: "ACT (Aceptación y Compromiso)",
    en: "ACT (Acceptance and Commitment)",
  },
  "therapies.act.desc": {
    es: "Conecta con tus valores y aprende a vivir con sentido, incluso en la dificultad.",
    en: "Connect with your values and learn to live meaningfully, even in difficulty.",
  },
  "therapies.pbt.title": {
    es: "PBT (Process-Based Therapy)",
    en: "PBT (Process-Based Therapy)",
  },
  "therapies.pbt.desc": {
    es: "Terapia flexible centrada en procesos específicos, no solo en diagnósticos.",
    en: "Flexible therapy focused on specific processes, not just diagnoses.",
  },
  "therapies.cta": {
    es: "Más sobre nuestras terapias",
    en: "More about our therapies",
  },

  // Services Section
  "services.title": { es: "Nuestros servicios", en: "Our services" },
  "services.subtitle": {
    es: "Atención online y presencial | Español e inglés",
    en: "Online and in-person care | Spanish and English",
  },
  "services.dbt.complete": {
    es: "Programa DBT Completo",
    en: "Complete DBT Program",
  },
  "services.dbt.complete.desc": {
    es: "Incluye sesiones individuales, talleres de habilidades, coaching entre sesiones y equipo clínico.",
    en: "Includes individual sessions, skills workshops, between-session coaching and clinical team.",
  },
  "services.dbt.sud": {
    es: "DBT-SUD (Consumo problemático de sustancias)",
    en: "DBT-SUD (Problematic substance use)",
  },
  "services.dbt.sud.desc": {
    es: "Programa especializado para quienes enfrentan adicción y desregulación emocional.",
    en: "Specialized program for those facing addiction and emotional dysregulation.",
  },
  "services.individual": {
    es: "Sesiones individuales personalizadas",
    en: "Personalized individual sessions",
  },
  "services.individual.desc": {
    es: "Espacios de psicoterapia flexibles, empáticos y confidenciales.",
    en: "Flexible, empathetic and confidential psychotherapy spaces.",
  },
  "services.evaluations": {
    es: "Evaluaciones psicológicas",
    en: "Psychological evaluations",
  },
  "services.evaluations.desc": {
    es: "Informes clínicos claros, adaptados a contextos escolares, médicos o familiares.",
    en: "Clear clinical reports, adapted to school, medical or family contexts.",
  },
  "services.cta": { es: "Ver todos los servicios", en: "See all services" },

  // Process Section
  "process.title": { es: "Nuestro proceso", en: "Our process" },
  "process.intro": {
    es: "Iniciar terapia puede generar dudas. En DBT Salud queremos que te sientas acompañado desde el primer contacto.",
    en: "Starting therapy can generate doubts. At DBT Salud we want you to feel supported from the first contact.",
  },
  "process.step1": { es: "Primer contacto", en: "First contact" },
  "process.step1.desc": {
    es: "Escríbenos por WhatsApp o correo para orientación o agendar sesión.",
    en: "Write to us via WhatsApp or email for guidance or to schedule a session.",
  },
  "process.step2": {
    es: "Cuestionario de ingreso",
    en: "Intake questionnaire",
  },
  "process.step2.desc": {
    es: "Breve formulario para conocerte mejor.",
    en: "Brief form to get to know you better.",
  },
  "process.step3": {
    es: "Primera sesión de evaluación",
    en: "First evaluation session"
  },
  "process.step3.desc": {
    es: "Exploramos tu historia, necesidades y objetivos.",
    en: "We explore your history, needs and objectives.",
  },
  "process.step4": {
    es: "Derivación o plan terapéutico",
    en: "Referral or therapeutic plan",
  },
  "process.step4.desc": {
    es: "Definimos el tipo de terapia y frecuencia.",
    en: "We define the type of therapy and frequency.",
  },
  "process.step5": {
    es: "Inicio del tratamiento",
    en: "Start of treatment",
  },
  "process.step5.desc": {
    es: "Trabajamos tus objetivos con herramientas basadas en evidencia.",
    en: "We work on your goals with evidence-based tools.",
  },
  "process.quote": {
    es: "Queremos que te sientas acompañado desde el primer momento.",
    en: "We want you to feel supported from the first moment.",
  },
  "process.cta": { es: "Empieza tu proceso", en: "Start your process" },

  // Team Section
  "team.title": { es: "Conoce al equipo", en: "Meet the team" },
  "team.karla.name": {
    es: "Karla González Guerra",
    en: "Karla González Guerra",
  },
  "team.karla.desc": {
    es: "Psicóloga clínica con formación en DBT, ACT y TCA. Magíster en Psicología Clínica (UAI).",
    en: "Clinical psychologist with training in DBT, ACT and ED. Master's in Clinical Psychology (UAI).",
  },
  "team.daniel.name": {
    es: "Daniel Henríquez Uribe",
    en: "Daniel Henríquez Uribe",
  },
  "team.daniel.desc": {
    es: "Psicólogo clínico con formación en DBT y TCC. Magíster en Psicología Clínica (UAI).",
    en: "Clinical psychologist with training in DBT and CBT. Master's in Clinical Psychology (UAI).",
  },
  "team.cta": { es: "Ver perfil completo", en: "View full profile" },

  // Contact Section
  "contact.title": { es: "Contacto directo", en: "Direct contact" },
  "contact.address": {
    es: "Dirección: Almirante Pastene 185, Providencia, oficina 204",
    en: "Address: Almirante Pastene 185, Providencia, office 204",
  },
  "contact.whatsapp": {
    es: "WhatsApp: +569 4989 7699",
    en: "WhatsApp: +569 4989 7699",
  },
  "contact.instagram": {
    es: "Instagram: @psi.karlagg",
    en: "Instagram: @psi.karlagg",
  },

  // Footer
  "footer.quote": {
    es: "Tu historia merece ser escuchada. Tu vida merece ser vivida con sentido.",
    en: "Your story deserves to be heard. Your life deserves to be lived with meaning.",
  },
  "footer.privacy": { es: "Políticas de privacidad", en: "Privacy policies" },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("es");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "es" ? "en" : "es"));
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
