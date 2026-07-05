import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VendorSpotlights from "@/components/VendorSpotlights";
import ServicesSection from "@/components/ServicesSection";
import SupplyChainSection from "@/components/SupplyChainSection";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Index = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20">
      <Navbar />
      
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Selected Work (Portfolio) */}
      <VendorSpotlights />

      {/* 3. Services */}
      <ServicesSection />

      {/* 4. Ecommerce & Operations */}
      <SupplyChainSection />

      {/* 5. Process */}
      <HowItWorks />

      {/* 6. Pricing & Quotes */}
      <PricingSection />

      {/* 7. Testimonials */}
      <Testimonials />

      {/* 8. Contact */}
      <ContactSection />

      {/* Footer & Scroll Utilities */}
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
