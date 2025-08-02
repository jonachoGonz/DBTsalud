import DBTHeader from "@/components/DBTHeader";
import DBTAbout from "@/components/DBTAbout";
import DBTTherapies from "@/components/DBTTherapies";
import DBTServices from "@/components/DBTServices";
import DBTProcess from "@/components/DBTProcess";
import DBTTeam from "@/components/DBTTeam";
import DBTContact from "@/components/DBTContact";
import DBTFooter from "@/components/DBTFooter";
import SEOHead from "@/components/SEOHead";

export default function Luminous() {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        canonical="https://www.dbtsalud.cl/luminous"
        ogUrl="https://www.dbtsalud.cl/luminous"
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
