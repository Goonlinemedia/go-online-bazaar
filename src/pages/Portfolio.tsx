import Navbar from "@/components/Navbar";
import VendorSpotlights from "@/components/VendorSpotlights";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Portfolio = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20 pb-16 md:pb-0">
      <Navbar />
      <div className="pt-16">
        <VendorSpotlights />
      </div>
      <Footer />
    </div>
  );
};

export default Portfolio;
