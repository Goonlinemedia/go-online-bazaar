import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import IndustrySections from "@/components/IndustrySections";
import VendorSpotlights from "@/components/VendorSpotlights";
import ServicesSection from "@/components/ServicesSection";
import SupplyChainSection from "@/components/SupplyChainSection";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Index = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20 pb-16 md:pb-0">
      <Navbar />
      
      {/* 1. Hero */}
      <HeroSection />

      {/* Trust Badging Block */}
      <TrustSection />

      {/* 2. Industry Sections */}
      <IndustrySections />

      {/* 3. Selected Work (Portfolio) */}
      <div className="bg-white dark:bg-background">
        <VendorSpotlights />
      </div>

      {/* 4. Services */}
      <div className="bg-[#FFF7ED]/30 dark:bg-orange-950/10">
        <ServicesSection />
      </div>

      {/* 5. Ecommerce & Operations */}
      <div className="bg-white dark:bg-background">
        <SupplyChainSection />
      </div>

      {/* 6. Process */}
      <div className="bg-[#FAFAFA] dark:bg-slate-900/40">
        <HowItWorks />
      </div>

      {/* 7. Pricing & Quotes */}
      <div className="bg-white dark:bg-background">
        <PricingSection />
      </div>

      {/* 8. Testimonials */}
      <div className="bg-[#FFF7ED]/30 dark:bg-orange-950/10">
        <Testimonials />
      </div>

      {/* 9. FAQ */}
      <div className="bg-white dark:bg-background">
        <FAQSection />
      </div>

      {/* 10. Contact */}
      <div className="bg-[#FAFAFA] dark:bg-slate-900/40">
        <ContactSection />
      </div>

      {/* Footer & Scroll Utilities */}
      <Footer />
      <ScrollToTop />

      {/* Sticky Bottom CTA for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-card/95 backdrop-blur-md border-t border-border px-6 py-3.5 md:hidden flex justify-between items-center shadow-lg">
        <div>
          <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Start Accepting Orders</div>
          <div className="text-xs font-bold text-foreground">Projects start from ₦150,000</div>
        </div>
        <a href="#contact" className="btn-primary text-xs py-2.5 px-5 shadow-sm">
          Start a Project
        </a>
      </div>
    </div>
  );
};

export default Index;
