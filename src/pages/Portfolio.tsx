import Navbar from "@/components/Navbar";
import VendorSpotlights from "@/components/VendorSpotlights";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SEO from "@/components/SEO";

const Portfolio = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20 pb-16 md:pb-0">
      <SEO 
        title="Selected Work & Case Studies | GoOnline"
        description="View our portfolio of premium websites, web apps, and ecommerce platforms designed by GoOnline for businesses across Nigeria."
        path="/portfolio"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Portfolio - GoOnline",
          "description": "View our portfolio of premium websites, web apps, and ecommerce platforms designed by GoOnline.",
          "url": "https://www.goonline.com.ng/portfolio"
        }}
      />
      <Navbar />
      <div className="pt-16">
        <VendorSpotlights />
      </div>
      <Footer />
    </div>
  );
};

export default Portfolio;
