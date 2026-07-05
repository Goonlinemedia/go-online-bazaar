import { ArrowRight } from "lucide-react";
import { useAnalytics } from "@/hooks/use-analytics";

const PricingSection = () => {
  const { trackEvent } = useAnalytics();

  const handleCTA = () => {
    trackEvent("pricing_cta_click", { action_id: "request_quote" });
    
    // Smooth scroll to contact section
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="pricing" className="w-full bg-background py-24 md:py-32 relative overflow-hidden border-b border-border/30">
      {/* Background blobs */}
      <div className="aura-blob bg-primary w-[300px] h-[300px] -left-12 bottom-0 opacity-[0.03]" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10" data-reveal>
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 inline-block">
          Pricing
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-12 font-heading">
          Plans for Growing Businesses
        </h2>
        
        <div className="glass-panel p-10 md:p-16 max-w-2xl mx-auto border-border/50 bg-card/40 backdrop-blur-md shadow-sm">
          <div className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading tracking-tight">
            Projects start from ₦150,000
          </div>
          <p className="text-sm md:text-base text-muted-foreground mb-8 font-medium leading-relaxed max-w-md mx-auto">
            Custom quotes available for companies, ecommerce brands, and organizations.
          </p>
          <button 
            onClick={handleCTA}
            className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3.5 shadow-sm text-sm"
          >
            Start a Project <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
