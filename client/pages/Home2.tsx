import TherapyHeader from '@/components/TherapyHeader';
import TherapyHero from '@/components/TherapyHero';
import TherapyServices from '@/components/TherapyServices';
import TherapyArticles from '@/components/TherapyArticles';
import TherapyHowTo from '@/components/TherapyHowTo';
import TherapyTestimonials from '@/components/TherapyTestimonials';
import TherapyCTA from '@/components/TherapyCTA';
import TherapySimpleFooter from '@/components/TherapySimpleFooter';

const Home2 = () => {
  return (
    <div className="min-h-screen bg-white">
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
