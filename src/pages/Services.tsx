import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SEO from "@/components/SEO";

const Services = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20 pb-16 md:pb-0">
      <SEO 
        title="Premium Web Development & Design Services | GoOnline"
        description="From bespoke web design to fully integrated ecommerce systems, explore the digital commerce and development services offered by GoOnline."
        path="/services"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Services - GoOnline",
          "description": "From bespoke web design to fully integrated ecommerce systems, explore the digital commerce and development services offered by GoOnline.",
          "url": "https://www.goonline.com.ng/services"
        }}
      />
      <Navbar />
      <div className="pt-16">
        <ServicesSection />
      </div>
      <Footer />
    </div>
  );
};

export default Services;
