import Navbar from "@/components/Navbar";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SEO from "@/components/SEO";

const Process = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20 pb-16 md:pb-0">
      <SEO 
        title="Our Design & Development Methodology | GoOnline"
        description="Learn how GoOnline takes projects from initial concept to high-fidelity design, custom development, testing, and launch."
        path="/process"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Process - GoOnline",
          "description": "Learn how GoOnline takes projects from initial concept to high-fidelity design, custom development, testing, and launch.",
          "url": "https://www.goonline.com.ng/process"
        }}
      />
      <Navbar />
      <div className="pt-16">
        <HowItWorks />
      </div>
      <Footer />
    </div>
  );
};

export default Process;
