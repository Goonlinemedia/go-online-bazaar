import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SEO from "@/components/SEO";

const Contact = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20 pb-16 md:pb-0">
      <SEO 
        title="Get in Touch - Start Your Project | GoOnline"
        description="Ready to establish your premium online presence? Contact GoOnline today to discuss your website design or ecommerce development needs."
        path="/contact"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Contact - GoOnline",
          "description": "Ready to establish your premium online presence? Contact GoOnline today.",
          "url": "https://www.goonline.com.ng/contact"
        }}
      />
      <Navbar />
      <div className="pt-16">
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
