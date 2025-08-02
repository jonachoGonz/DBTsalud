import TherapyHeader from "@/components/TherapyHeader";
import TherapyHero from "@/components/TherapyHero";
import TherapyServices from "@/components/TherapyServices";
import TherapyArticles from "@/components/TherapyArticles";
import TherapyHowTo from "@/components/TherapyHowTo";
import TherapyTestimonials from "@/components/TherapyTestimonials";
import TherapyCTA from "@/components/TherapyCTA";
import TherapySimpleFooter from "@/components/TherapySimpleFooter";
import SEOHead from "@/components/SEOHead";

const Home2 = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        canonical="https://www.dbtsalud.cl/home2"
        ogUrl="https://www.dbtsalud.cl/home2"
      />
      <TherapyHeader />
      <TherapyHero />
      <TherapyServices />
      <TherapyArticles />
      <TherapyHowTo />
      <TherapyTestimonials />
      <TherapyCTA />
      <TherapySimpleFooter />
    </div>
  );
};

export default Home2;
