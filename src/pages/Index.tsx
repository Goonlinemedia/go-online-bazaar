import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
import HowItWorks from "@/components/HowItWorks";
import WhatsAppAdvantage from "@/components/WhatsAppAdvantage";
import FeaturesSection from "@/components/FeaturesSection";
import ServicesSection from "@/components/ServicesSection";
import VendorSpotlights from "@/components/VendorSpotlights";
import Testimonials from "@/components/Testimonials";
import PricingSection from "@/components/PricingSection";
import StatsSection from "@/components/StatsSection";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import MouseGlow from "@/components/MouseGlow";
import FloatingBlobs from "@/components/FloatingBlobs";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import logo from "@/assets/logo.png";

const Index = () => {
  useScrollReveal();
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <FloatingBlobs />
      <MouseGlow />

      {/* Watermark */}
      <div
        className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center"
        aria-hidden="true"
      >
        <img
          src={logo}
          alt=""
          className="w-[500px] max-w-[80vw] opacity-[0.04] select-none"
          draggable={false}
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <div data-reveal><HeroSection /></div>
        <div data-reveal><FeaturesSection /></div>
        <div data-reveal><AllInclusiveSection /></div>
        <div data-reveal><VendorSpotlights /></div>
        <div data-reveal><PricingSection /></div>
        <div data-reveal><StatsSection /></div>
        <div data-reveal><ContactSection /></div>
        <Footer />
      </div>
    </div>
  );
};
import WhatsAppWidget from "@/components/WhatsAppWidget";
import LiveActivity from "@/components/LiveActivity";
import ScrollToTop from "@/components/ScrollToTop";
import Watermark from "@/components/Watermark";


const Index = () => (
  <div className="min-h-screen bg-background relative selection:bg-primary/20">
    <Watermark />
    <Navbar />
    <HeroSection />
    
    {/* 2. Problem -> Solution */}
    <ProblemSolutionSection />

    {/* 3. How It Works */}
    <HowItWorks />

    {/* 4. Benefits Section */}
    <div id="benefits">
      <FeaturesSection />
      <WhatsAppAdvantage />
    </div>

    {/* 5. Social Proof */}
    <div id="results">
      <StatsSection />
      <VendorSpotlights />
      <Testimonials />
    </div>

    {/* 6. Pricing */}
    <PricingSection />

    {/* 7. FAQ */}
    <FAQSection />

    {/* Final CTA & Contact */}
    <FinalCTA />
    <ContactSection />
    
    <Footer />
    <WhatsAppWidget />
    <LiveActivity />
    <ScrollToTop />
  </div>
);

export default Index;
