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
import WhatsAppWidget from "@/components/WhatsAppWidget";
import LiveActivity from "@/components/LiveActivity";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => (
  <div className="min-h-screen bg-background relative selection:bg-primary/20">
    <Navbar />
    <HeroSection />
    
    {/* 2. Problem -> Solution */}
    <ProblemSolutionSection />

    {/* 3. How It Works */}
    <HowItWorks />

    {/* 4. Benefits */}
    <div id="benefits">
      <ServicesSection />
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
