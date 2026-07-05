import { Check, ArrowRight } from "lucide-react";
import { useAnalytics } from "@/hooks/use-analytics";

const PricingSection = () => {
  const { trackEvent } = useAnalytics();

  const handleCTA = (pkgName: string) => {
    trackEvent("pricing_cta_click", { package_name: pkgName });
    
    // Smooth scroll to contact section
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const packages = [
    {
      name: "Starter Web Presence",
      tag: "Business & Portfolios",
      priceLabel: "₦150,000",
      desc: "For businesses, consultants, and startups looking to establish an elegant online showcase.",
      features: [
        "Custom landing page layout",
        "Mobile responsive design",
        "Core SEO implementation",
        "Contact & inquiry form",
        "Domain & hosting mapping",
      ],
      isPopular: false,
    },
    {
      name: "Professional Platform",
      tag: "Churches, Schools & NGOs",
      priceLabel: "₦250,000",
      desc: "For organizations requiring interactive portals, online giving setups, admissions, or listings directories.",
      features: [
        "Everything in Starter tier",
        "Custom database collections",
        "Online donations & giving setup",
        "Timetables & event managers",
        "Payment gateways integration",
        "Admissions or registration channels",
      ],
      isPopular: true,
    },
    {
      name: "Enterprise Solutions",
      tag: "Bespoke Systems",
      priceLabel: "Custom Quote",
      desc: "For full-scale e-commerce stores, logistics platforms, or organizations requiring bespoke operational databases.",
      features: [
        "Bespoke system flows",
        "Multi-merchant e-commerce setups",
        "Courier & tracking integrations",
        "Custom student or membership databases",
        "Priority 24/7 account management",
      ],
      isPopular: false,
    },
  ];

  return (
    <div id="pricing" className="w-full bg-transparent py-24 md:py-32 relative overflow-hidden border-b border-border/50">
      <div className="section-number">04</div>

      {/* Header */}
      <section className="relative px-6 lg:px-8 max-w-7xl mx-auto text-center mb-20" data-reveal>
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 inline-block">
          Website Investment
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mt-2 mb-4 font-heading">
          Clear Packages for Serious Growth
        </h2>
        <p className="text-base text-muted-foreground max-w-xl mx-auto font-medium">
          Choose a focused package for a polished digital presence, or request a custom quote for advanced portals, commerce, and operational systems.
        </p>
      </section>

      {/* Pricing Cards Grid (3 Columns) */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 lg:px-8 mb-16 items-center">
        {packages.map((pkg, i) => (
          <div
            key={pkg.name}
            data-reveal
            data-reveal-delay={i + 1}
            onClick={() => handleCTA(pkg.name)}
            className={`group relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-500 cursor-pointer overflow-hidden bg-card ${
              pkg.isPopular
                ? "border-2 border-primary shadow-[0_20px_50px_rgba(249,115,22,0.1)] md:-translate-y-3 hover:-translate-y-4"
                : "border border-border shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:-translate-y-[6px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
            }`}
          >
            {pkg.isPopular && (
              <div className="absolute top-4 right-4 bg-primary text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
            )}
            
            <div>
              <div className="flex flex-col gap-1 mb-6">
                <span className={`text-[10px] font-bold uppercase tracking-[0.1em] ${pkg.isPopular ? 'text-primary' : 'text-muted-foreground'}`}>
                  {pkg.tag}
                </span>
                <h3 className="text-xl font-bold font-heading text-foreground tracking-tight">
                  {pkg.name}
                </h3>
              </div>
              <p className="text-xs font-medium text-muted-foreground leading-relaxed mb-6">
                {pkg.desc}
              </p>
              
              <div className="border-t border-b border-border/50 py-4 mb-8">
                <span className="text-2xl font-bold text-foreground font-heading">
                  {pkg.priceLabel}
                </span>
              </div>

              <ul className="space-y-4 mb-10">
                {pkg.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className={`mt-1 rounded-full p-0.5 ${pkg.isPopular ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                      <Check size={12} className="stroke-[3px]" />
                    </div>
                    <span className="text-xs font-medium text-foreground tracking-tight leading-relaxed">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <button 
              className={`w-full py-3.5 text-xs font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                pkg.isPopular
                  ? "bg-primary text-white hover:bg-primary/95 shadow-sm"
                  : "bg-secondary text-foreground hover:bg-border"
              }`}
            >
              Get Started <ArrowRight size={12} />
            </button>
          </div>
        ))}
      </div>

      {/* Quote Prompt */}
      <div className="max-w-xl mx-auto px-6 text-center">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Need a completely custom ordering workflow or bespoke catalog configurations? 
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
