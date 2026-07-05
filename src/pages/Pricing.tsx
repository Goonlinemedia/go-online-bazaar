import Navbar from "@/components/Navbar";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20 pb-16 md:pb-0">
      <Navbar />
      <div className="pt-16"> {/* Offsets the sticky navbar */}
        <PricingSection />
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
