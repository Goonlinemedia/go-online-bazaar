import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import WhatsAppAdvantage from "@/components/WhatsAppAdvantage";
import FeaturesSection from "@/components/FeaturesSection";
import WhoThisIsFor from "@/components/WhoThisIsFor";
import ServicesSection from "@/components/ServicesSection";
import VendorSpotlights from "@/components/VendorSpotlights";
import Testimonials from "@/components/Testimonials";
import PricingSection from "@/components/PricingSection";
import StatsSection from "@/components/StatsSection";
import ContactSection from "@/components/ContactSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => (
  <div className="min-h-screen bg-background relative selection:bg-primary/20">
    <Navbar />
    <HeroSection />
    <HowItWorks />
    <WhatsAppAdvantage />
    <FeaturesSection />
    <WhoThisIsFor />
    <ServicesSection />
    <PricingSection />
    <VendorSpotlights />
    <Testimonials />
    <StatsSection />
    <ContactSection />
    <FinalCTA />
    <Footer />
    <WhatsAppWidget />
    <ScrollToTop />
  </div>
);

export default Index;
