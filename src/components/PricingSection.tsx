import { Check, ArrowRight } from "lucide-react";
import { useAnalytics } from "@/hooks/use-analytics";

const PricingSection = () => {
  const { trackEvent } = useAnalytics();

  const packages = [
    {
      name: "Custom Brand Website",
      tag: "Establish Credibility",
      priceLabel: "Starting from ₦150,000",
      desc: "For growing brands, service firms, ministries, and professionals who need an elite, high-performance web presence.",
      features: [
        "Custom visual layout design",
        "Mobile-first responsive engineering",
        "Search engine optimization (SEO) basics",
        "Domain mapping & professional emails",
        "Integrated inquiry forms",
        "Launch support & layout documentation",
      ],
      ctaText: "Start a Project",
      actionId: "custom_brand_site",
    },
    {
      name: "Enterprise Commerce & Operations",
      tag: "Operational Infrastructure",
      priceLabel: "Request a Custom Quote",
      desc: "For retail operations requiring dynamic digital catalogs, ordering pipelines, and fulfillment integrations.",
      features: [
        "Dynamic digital catalog databases",
        "Direct checkout routing to WhatsApp",
        "Paystack & Flutterwave gateway setup",
        "Logistics address capture & routing",
        "Advanced custom analytics sync",
        "1-on-1 operational support",
      ],
      ctaText: "Request a Quote",
      actionId: "enterprise_commerce",
    },
  ];

  const handleCTA = (pkgName: string, actionId: string) => {
    trackEvent("pricing_cta_click", { package_name: pkgName, action_id: actionId });
    
    // Smooth scroll to contact section
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="pricing" className="w-full bg-background py-20 relative overflow-hidden border-b border-border/30">
      <div className="section-number">04</div>

      {/* Header */}
      <section className="relative px-6 lg:px-8 max-w-7xl mx-auto text-center mb-16" data-reveal>
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] bg-secondary px-3 py-1.5 rounded-full mb-4 inline-block">
          Pricing & Engagement
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mt-4 mb-4">
          Transparent Flat-Rate Models
        </h2>
        <p className="text-base text-muted-foreground max-w-xl mx-auto font-medium">
          Professional design for brands ready to look established, and customized operational integrations for scaling retailers.
        </p>
      </section>

      {/* Pricing Cards Grid (2 Columns) */}
      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto px-6 lg:px-8 mb-16">
        {packages.map((pkg, i) => (
          <div
            key={pkg.name}
            data-reveal
            data-reveal-delay={i + 1}
            onClick={() => handleCTA(pkg.name, pkg.actionId)}
            className="group relative flex flex-col justify-between rounded-3xl p-8 md:p-10 transition-all duration-300 cursor-pointer overflow-hidden border border-border bg-card hover:shadow-xl hover:-translate-y-1"
          >
            <div>
              <div className="flex flex-col gap-1 mb-6">
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.1em]">
                  {pkg.tag}
                </span>
                <h3 className="text-2xl font-bold font-heading text-foreground tracking-tight">
                  {pkg.name}
                </h3>
              </div>
              <p className="text-sm font-medium text-muted-foreground leading-relaxed mb-6">
                {pkg.desc}
              </p>
              
              <div className="border-t border-b border-border/50 py-4 mb-8">
                <span className="text-xl font-bold text-foreground">
                  {pkg.priceLabel}
                </span>
              </div>

              <ul className="space-y-4 mb-10">
                {pkg.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 rounded-full p-0.5 bg-primary/10 text-primary">
                      <Check size={12} className="stroke-[3px]" />
                    </div>
                    <span className="text-sm font-medium text-foreground tracking-tight">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <button 
              className="w-full py-4 text-sm font-bold rounded-xl transition-all duration-300 bg-primary text-white hover:bg-primary/95 flex items-center justify-center gap-2"
            >
              {pkg.ctaText} <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Quote Prompt */}
      <div className="max-w-xl mx-auto px-6 text-center">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Need a completely bespoke workflow or custom operations portal? 
          <br className="hidden md:block" />
          <a href="#contact" className="text-primary font-bold hover:underline ml-1">
            Connect with our lead developer directly
          </a>
        </p>
      </div>
    </div>
  );
};

export default PricingSection;
