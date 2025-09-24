import DBTHeader from "@/components/DBTHeader";
import DBTAbout from "@/components/DBTAbout";
import DBTTherapies from "@/components/DBTTherapies";
import DBTServices from "@/components/DBTServices";
import DBTProcess from "@/components/DBTProcess";
import DBTTeam from "@/components/DBTTeam";
import DBTContact from "@/components/DBTContact";
import DBTFooter from "@/components/DBTFooter";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContent } from "@/hooks/use-content";

export default function Luminous() {
  const { language } = useLanguage();
  const { data: seo } = useContent<any>("luminous.seo", language);
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title={seo?.title}
        description={seo?.description}
        canonical={seo?.canonical || "https://www.dbtsalud.cl/"}
        ogUrl={seo?.ogUrl || seo?.canonical}
        ogImage={seo?.ogImage}
      />
      <DBTHeader />
      <DBTAbout />
      <DBTTherapies />
      <DBTServices />
      <DBTProcess />
      <DBTTeam />
      <DBTContact />
      <DBTFooter />
    </div>
  );
}
