import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import AllInclusiveSection from "@/components/AllInclusiveSection";
import VendorSpotlights from "@/components/VendorSpotlights";
import PricingSection from "@/components/PricingSection";
import StatsSection from "@/components/StatsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <FeaturesSection />
    <AllInclusiveSection />
    <VendorSpotlights />
    <PricingSection />
    <StatsSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
