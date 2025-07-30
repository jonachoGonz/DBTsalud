import TherapyHeader from '@/components/TherapyHeader';
import TherapyHero from '@/components/TherapyHero';
import TherapyArticles from '@/components/TherapyArticles';
import TherapyHowTo from '@/components/TherapyHowTo';
import TherapyFeatured from '@/components/TherapyFeatured';
import TherapistSignup from '@/components/TherapistSignup';
import TherapySimpleFooter from '@/components/TherapySimpleFooter';

const Home2 = () => {
  return (
    <div className="min-h-screen bg-white">
      <TherapyHeader />
      <TherapyHero />
      <TherapyArticles />
      <TherapyHowTo />
      <TherapyFeatured />
      <TherapistSignup />
      <TherapySimpleFooter />
    </div>
  );
};

export default Home2;
