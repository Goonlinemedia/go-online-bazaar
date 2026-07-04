import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import SupplyChainSection from "@/components/SupplyChainSection";
import VendorSpotlights from "@/components/VendorSpotlights";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";
import StatsSection from "@/components/StatsSection";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import LiveActivity from "@/components/LiveActivity";
import ScrollToTop from "@/components/ScrollToTop";
import Watermark from "@/components/Watermark";
import MouseGlow from "@/components/MouseGlow";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Index = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20">
      <MouseGlow />
      <Watermark />
      <Navbar />
      
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Trust Stats */}
      <StatsSection />

      {/* 3. Services */}
      <ServicesSection />

      {/* 4. Supply Chain / Operations Support */}
      <SupplyChainSection />

      {/* 5. Portfolio / Projects */}
      <VendorSpotlights />

      {/* 6. Process */}
      <HowItWorks />

      {/* 7. Pricing */}
      <PricingSection />

      {/* 8. Testimonials */}
      <Testimonials />

      {/* 9. FAQ */}
      <FAQSection />

      {/* 10. Contact & Final Call-To-Action */}
      <FinalCTA />
      <ContactSection />

      {/* Footer & Helpers */}
      <Footer />
      <WhatsAppWidget />
      <LiveActivity />
      <ScrollToTop />
    </div>
  );
};

export default Index;
