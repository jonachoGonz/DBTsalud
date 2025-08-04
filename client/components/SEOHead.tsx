import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogUrl?: string;
}

const SEOHead = ({ 
  title = "Terapia DBT en Chile | Psicólogos online y presenciales | DBT Salud",
  description = "Acompañamos procesos terapéuticos en Chile con terapias DBT, TCC, ACT y PBT. Atención online y presencial, en español e inglés. Agenda tu sesión hoy.",
  canonical = "https://www.dbtsalud.cl/",
  ogImage = "https://www.dbtsalud.cl/assets/og-image.jpg",
  ogUrl = "https://www.dbtsalud.cl/"
}: SEOHeadProps) => {
  
  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper function to set or update meta tags
    const setMetaTag = (name: string, content: string, property?: string) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Helper function to set canonical link
    const setCanonical = (url: string) => {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', url);
    };

    // Basic meta tags
    setMetaTag('description', description);
    setMetaTag('robots', 'index, follow');
    
    // Open Graph tags
    setMetaTag('og:title', 'Terapias psicológicas en Chile | DBT Salud', true);
    setMetaTag('og:description', 'Terapias online y presenciales basadas en evidencia. Atención en español e inglés.', true);
    setMetaTag('og:image', ogImage, true);
    setMetaTag('og:url', ogUrl, true);
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:site_name', 'DBT Salud', true);
    setMetaTag('og:locale', 'es_CL', true);

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', 'Terapias psicológicas en Chile | DBT Salud');
    setMetaTag('twitter:description', 'Psicoterapia DBT, TCC, ACT y PBT en Chile. Atención empática y profesional.');
    setMetaTag('twitter:image', ogImage);

    // Additional SEO meta tags
    setMetaTag('keywords', 'terapia DBT, psicólogos Chile, terapia online, TCC, ACT, PBT, psicoterapia, salud mental');
    setMetaTag('author', 'DBT Salud');
    setMetaTag('language', 'es');
    setMetaTag('geo.region', 'CL');
    setMetaTag('geo.placename', 'Chile');

    // Canonical link
    setCanonical(canonical);

    // JSON-LD Structured Data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "DBT Salud",
      "description": "Centro de terapias psicológicas especializadas en DBT, TCC, ACT y PBT en Chile",
      "url": "https://www.dbtsalud.cl",
      "telephone": "+56949897699",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Almirante Pastene 185, oficina 204",
        "addressLocality": "Providencia",
        "addressRegion": "Región Metropolitana",
        "addressCountry": "CL"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-33.4489",
        "longitude": "-70.6693"
      },
      "openingHours": [
        "Mo-Fr 09:00-19:00",
        "Sa 09:00-14:00"
      ],
      "medicalSpecialty": [
        "Terapia Dialéctico-Conductual (DBT)",
        "Terapia Cognitivo-Conductual (TCC)",
        "Terapia de Aceptación y Compromiso (ACT)",
        "Terapia Basada en Procesos (PBT)"
      ],
      "serviceType": "Psicoterapia",
      "paymentAccepted": ["Cash", "Credit Card", "Transfer"],
      "currenciesAccepted": "CLP",
      "availableLanguage": ["Spanish", "English"],
      "sameAs": [
        "https://instagram.com/psi.karlagg"
      ]
    };

    // Add or update JSON-LD script
    let jsonLdScript = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.type = 'application/ld+json';
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = JSON.stringify(structuredData);

    // Cleanup function
    return () => {
      // We don't remove meta tags on cleanup to avoid flickering
      // Meta tags will be updated when component mounts again
    };
  }, [title, description, canonical, ogImage, ogUrl]);

  return null; // This component doesn't render anything
};

export default SEOHead;
