import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import AllInclusiveSection from "@/components/AllInclusiveSection";
import VendorSpotlights from "@/components/VendorSpotlights";
import PricingSection from "@/components/PricingSection";
import StatsSection from "@/components/StatsSection";
import ContactSection from "@/components/ContactSection";
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

export default Index;
