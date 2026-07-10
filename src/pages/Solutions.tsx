import Navbar from "@/components/Navbar";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SEO from "@/components/SEO";

const Solutions = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20 pb-16 md:pb-0">
      <SEO 
        title="Tailored Ecommerce & Web Solutions | GoOnline"
        description="Explore GoOnline's professional website design and ecommerce solutions tailored for businesses in Nigeria. Launch, run, and scale your brand online."
        path="/solutions"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Solutions - GoOnline",
          "description": "Explore GoOnline's professional website design and ecommerce solutions tailored for businesses in Nigeria.",
          "url": "https://www.goonline.com.ng/solutions"
        }}
      />
      <Navbar />
      <div className="pt-16"> {/* Offsets the sticky navbar */}
        <PricingSection />
      </div>
      <Footer />
    </div>
  );
};

export default Solutions;
