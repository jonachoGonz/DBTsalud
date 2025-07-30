import TherapyHeader from '@/components/TherapyHeader';
import TherapyHero from '@/components/TherapyHero';
import TherapyServices from '@/components/TherapyServices';
import TherapistFinder from '@/components/TherapistFinder';
import TherapyTestimonials from '@/components/TherapyTestimonials';
import TherapyCTA from '@/components/TherapyCTA';
import TherapyFooter from '@/components/TherapyFooter';

const Home2 = () => {
  return (
    <div className="min-h-screen bg-white">
      <TherapyHeader />
      <TherapyHero />
      <TherapyServices />
      <TherapistFinder />
      <TherapyTestimonials />
      <TherapyCTA />
      <TherapyFooter />
    </div>
  );
};

export default Home2;
