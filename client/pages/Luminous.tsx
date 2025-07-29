import LuminousHeader from '@/components/LuminousHeader';
import ProductGrid from '@/components/ProductGrid';
import BenefitsSection from '@/components/BenefitsSection';

export default function Luminous() {
  return (
    <div className="min-h-screen">
      <LuminousHeader />
      <ProductGrid />
      <BenefitsSection />
    </div>
  );
}
