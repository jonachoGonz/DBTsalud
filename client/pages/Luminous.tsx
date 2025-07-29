import LuminousHeader from '@/components/LuminousHeader';
import ProductGrid from '@/components/ProductGrid';
import BenefitsSection from '@/components/BenefitsSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

export default function Luminous() {
  return (
    <div className="min-h-screen">
      <LuminousHeader />
      <ProductGrid />
      <BenefitsSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
