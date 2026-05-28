import Hero from "@/components/Hero";
import FeaturesOverview from "@/components/FeaturesOverview";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import PricingPlans from "@/components/PricingPlans";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturesOverview />
      <HowItWorks />
      <Testimonials />
      <PricingPlans />
    </div>
  );
}
