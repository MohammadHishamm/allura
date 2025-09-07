import HeroSection from './HeroSection';
import PricingPlans from './PricingPlans';
import StatCard from './StatCard';

const HomePage = () => {
  return (
    <main className="relative z-20">
      {/* Hero Section */}
      <HeroSection />
            {/* Pricing Plans Section */}
      <section className="py-20">
       <StatCard/>
      </section>
      {/* Pricing Plans Section */}
      <section className="py-20">
        <PricingPlans />
      </section>

    </main>
  );
};

export default HomePage;
