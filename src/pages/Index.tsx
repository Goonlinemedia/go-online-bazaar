import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import AllInclusiveSection from "@/components/AllInclusiveSection";
import VendorSpotlights from "@/components/VendorSpotlights";
import PricingSection from "@/components/PricingSection";
import StatsSection from "@/components/StatsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import logo from "@/assets/logo.png";

const Index = () => (
  <div className="min-h-screen bg-background relative">
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
      <HeroSection />
      <FeaturesSection />
      <AllInclusiveSection />
      <VendorSpotlights />
      <PricingSection />
      <StatsSection />
      <ContactSection />
      <Footer />
    </div>
  </div>
);

export default Index;
