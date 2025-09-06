import HeroSection from './HeroSection';
import PricingPlans from './PricingPlans';

const HomePage = () => {
  return (
    <main className="relative z-20 md:mt-8">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Pricing Plans Section */}
      <section className="py-20">
        <PricingPlans />
      </section>
    </main>
  );
};

export default HomePage;
