import Navbar from "@/components/Navbar";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Pricing = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20">
      <Navbar />

      <main className="pt-16">
        <PricingSection />

        <div className="bg-[#FAFAFA] dark:bg-slate-900/40">
          <ContactSection />
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Pricing;
