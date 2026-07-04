import { useState } from "react";
import { Check, X, Smartphone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/hooks/use-analytics";

type BillingCycle = "monthly" | "quarterly" | "biannual" | "annual";

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const { trackEvent } = useAnalytics();

  const getPrice = (prices: Record<BillingCycle, number>) => {
    return `₦${prices[billingCycle].toLocaleString()}`;
  };

  const getPeriodText = () => {
    switch(billingCycle) {
      case "monthly": return "mo";
      case "quarterly": return "3mo";
      case "biannual": return "6mo";
      case "annual": return "yr";
    }
  }

  const plans = [
    {
      name: "Starter Website",
      type: "Launch",
      prices: {
        monthly: 5000,
        quarterly: 14500,
        biannual: 27500,
        annual: 55000
      },
      desc: "Perfect to launch your online brand presence",
      getFeatures: (cycle: BillingCycle) => [
        `Up to ${cycle === "annual" ? "50" : "20"} pages / products`,
        "Online ordering & WhatsApp checkout",
        "Coupons & discount codes setup",
        "Payment integration & sales tracker",
        "Standard email & chat support"
      ],
      unavailable: [
        "No custom domain mapping"
      ],
      tagline: "Start selling professionally",
      ctaText: "Launch Starter Site"
    },
    {
      name: "Business Store",
      type: "Professional",
      prices: {
        monthly: 10000,
        quarterly: 28500,
        biannual: 55000,
        annual: 110000
      },
      desc: "For growing businesses ready to scale commerce",
      popular: true,
      badge: "MOST POPULAR",
      getFeatures: (cycle: BillingCycle) => [
        "Everything in Starter Website, plus:",
        "Up to 200 pages / products",
        "Custom domain mapping",
        "3 premium layout designs",
        "Facebook & Instagram pixel setup",
        "Instant email notifications"
      ],
      unavailable: [],
      tagline: "Expand your online operations",
      ctaText: "Build My Business Store",
      recommended: "Recommended: Selected by 80% of retail brands"
    },
    {
      name: "Growth Commerce",
      type: "Commerce Plus",
      prices: {
        monthly: 20000,
        quarterly: 57000,
        biannual: 110000,
        annual: 220000
      },
      desc: "Complete digital commerce infrastructure",
      badge: "BEST VALUE",
      getFeatures: (cycle: BillingCycle) => [
        "Everything in Business Store, plus:",
        "Up to 1,000 pages / products",
        "Integrated business blog & SEO",
        "Priority phone & chat support",
        "Advanced order routing tools",
        cycle === "annual" ? "Free .com.ng domain registry" : "No free domain registry"
      ],
      unavailable: [],
      tagline: "Complete operations setup",
      ctaText: "Deploy Growth Commerce"
    }
  ];

  const handlePlanClick = (planName: string, planType: string) => {
    const plan = plans.find(p => p.name === planName);
    const price = plan ? getPrice(plan.prices) : "";
    const period = getPeriodText();
    
    trackEvent("plan_selected", { 
      plan_name: planName, 
      plan_type: planType, 
      billing_cycle: billingCycle,
      price: plan?.prices[billingCycle]
    });

    const whatsappNumber = "2348035826698"; 
    let message = "";

    if (planName === "Starter Website") {
      message = `Hi GoOnline! I am interested in the Starter Website plan for ${price}/${period}. Let's discuss getting my website built.`;
    } else if (planName === "Business Store") {
      message = `Hello GoOnline! I want to start our store with the Business Store plan for ${price}/${period}. Let's build a professional brand site.`;
    } else {
      message = `Hi GoOnline! I am ready to build our store with the Growth Commerce plan for ${price}/${period}. Let's set up the complete commerce infrastructure.`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div id="pricing" className="w-full bg-background pb-32 relative overflow-hidden">
      <div className="section-number">04</div>
      <div className="aura-blob bg-primary w-[700px] h-[700px] -right-48 top-1/4 opacity-10" />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto text-center" data-reveal>
        <span className="text-sm font-black text-primary uppercase tracking-[0.2em] text-glow">Pricing Plans</span>
        <h1 className="text-4xl md:text-7xl font-heading font-black text-foreground tracking-tighter leading-[0.95] mt-8 mb-8">
          Choose the Plan That 
          <br />
          <span className="gradient-text italic font-black">Fits Your Business</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium">
          Start with professional design, expand your online presence, and scale into a robust commerce hub.
        </p>
      </section>

      {/* BILLING OPTIONS SECTION */}
      <section className="max-w-4xl mx-auto px-6 mb-16 animate-fade-in" style={{ animationDelay: "400ms" }}>
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold font-heading">Save more with long-term plans</h3>
          <p className="text-muted-foreground mt-2">Annual plans provide the maximum discount and launch support.</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 p-2 bg-secondary/50 rounded-2xl md:rounded-full">
          {(["monthly", "quarterly", "biannual", "annual"] as BillingCycle[]).map((cycle) => (
            <button
              key={cycle}
              onClick={() => {
                setBillingCycle(cycle);
                trackEvent("billing_cycle_changed", { cycle });
              }}
              className={`relative px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                billingCycle === cycle 
                  ? "bg-foreground text-background shadow-lg scale-105" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
              {cycle === "annual" && (
                <span className="absolute -top-3 -right-2 bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm whitespace-nowrap">
                  Annual Discount
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* PRICING CARDS SECTION */}
      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl mx-auto px-6 lg:px-8 mb-32">
        {plans.map((plan, i) => (
          <div
            key={plan.name}
            data-reveal
            data-reveal-delay={i + 1}
            onClick={() => handlePlanClick(plan.name, plan.type)}
            className={`group relative flex flex-col h-full rounded-[2.5rem] p-10 md:p-12 transition-all duration-700 cursor-pointer overflow-hidden ${
              plan.popular 
                ? "bg-foreground text-background shadow-2xl scale-[1.05] z-10" 
                : "glass-panel shadow-sm hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-3"
              }`}
          >
            {plan.popular && (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-50" />
            )}

            {plan.badge && (
              <div className={`absolute top-8 right-8 ${plan.popular ? 'bg-primary text-white' : 'bg-primary/10 text-primary'} text-[10px] font-black px-3 py-1 rounded-full tracking-[0.1em] z-20 uppercase shadow-lg`}>
                {plan.badge}
              </div>
            )}
              
            <div className="relative z-20 mb-10">
              <div className="flex flex-col gap-2 mb-6">
                <span className={`text-xs font-black tracking-[0.2em] uppercase ${plan.popular ? "text-primary" : "text-primary/60"}`}>
                  {plan.type}
                </span>
                <h3 className={`text-4xl font-black font-heading ${plan.popular ? "text-background" : "text-foreground"} tracking-tighter`}>
                  {plan.name}
                </h3>
              </div>
              <p className={`text-lg font-medium leading-relaxed ${plan.popular ? "text-gray-400" : "text-muted-foreground"}`}>
                {plan.desc}
              </p>
            </div>

            <div className="relative z-20 mb-10 pb-10 border-b border-border/10">
              <div className="flex items-baseline gap-2">
                <span className={`text-5xl font-black ${plan.popular ? "text-white" : "text-foreground"} tracking-tight`}>
                  {getPrice(plan.prices)}
                </span>
                <span className={`text-lg font-bold ${plan.popular ? "text-gray-500" : "text-muted-foreground"}`}>
                  /{getPeriodText()}
                </span>
              </div>
            </div>

            <div className="relative z-20 flex-grow space-y-8 mb-12">
              <ul className="space-y-5">
                {plan.getFeatures(billingCycle).map((f, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className={`mt-1.5 rounded-full p-1 ${plan.popular ? "bg-primary text-white" : "bg-primary/10 text-primary"}`}>
                      <Check size={14} className="stroke-[3px]" />
                    </div>
                    <span className={`text-lg font-semibold ${plan.popular ? "text-gray-200" : "text-foreground"} tracking-tight`}>
                      {f}
                    </span>
                  </li>
                ))}
                {plan.unavailable.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-4 opacity-30">
                    <div className="mt-1.5 rounded-full p-1 bg-muted">
                      <X size={14} className="stroke-[3px]" />
                    </div>
                    <span className={`text-lg font-bold ${plan.popular ? "text-gray-500" : "text-muted-foreground"}`}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative z-20 mt-auto">
              <Button 
                className={`w-full py-8 text-lg font-black rounded-2xl transition-all duration-500 ${
                  plan.popular 
                    ? "bg-white text-foreground hover:bg-primary hover:text-white hover:shadow-2xl hover:shadow-primary/40" 
                    : "bg-primary text-white hover:shadow-2xl hover:shadow-primary/20"
                }`}
              >
                {plan.ctaText}
              </Button>
              <p className={`text-sm font-bold text-center mt-6 ${plan.popular ? "text-gray-500" : "text-muted-foreground"} italic`}>
                {plan.tagline}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* RISK REMOVAL & URGENCY */}
      <div className="max-w-3xl mx-auto px-6 mb-24 text-center">
        <div className="bg-secondary/40 border border-border/50 rounded-3xl p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16" />
          <div className="relative z-10">
            <h4 className="text-xl font-bold mb-4 font-heading">Not sure which plan to choose?</h4>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Start with the <span className="text-foreground font-bold underline decoration-primary/30">Starter Website</span> plan today and upgrade any time as your business grows. 
              <br className="hidden md:block" />
              <span className="text-foreground font-bold">No hidden fees. You keep 100% of your sales.</span>
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white dark:bg-background rounded-full border border-border shadow-sm">
                <span className="flex h-2.5 w-2.5 rounded-full bg-green-500" />
                <span className="text-sm font-bold text-foreground">Your website will be ready in 2-5 business days</span>
            </div>
          </div>
        </div>
      </div>

      {/* TRUST / VALUE SECTION */}
      <section className="bg-secondary/40 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Outcome-Driven Results</h2>
            <p className="text-muted-foreground text-lg">We design and build digital commerce platforms that drive real business growth.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-2xl shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow border border-border/50">
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center p-2.5">
                <img src="/favicon.png" alt="GoOnline Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">We Build It For You</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Skip the learning curve. We handle the design, setup, and launch so you can stay focused on your operations.</p>
              </div>
            </div>
            <div className="bg-background p-8 rounded-2xl shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow border border-border/50">
              <div className="bg-green-500/10 w-12 h-12 rounded-xl flex items-center justify-center"><MessageCircle className="text-green-500 w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-lg mb-2">Direct Order Flow</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Convert visitors into buyers instantly. Orders land directly in your messaging channels, closing inquiries in real-time.</p>
              </div>
            </div>
            <div className="bg-background p-8 rounded-2xl shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow border border-border/50">
              <div className="bg-blue-500/10 w-12 h-12 rounded-xl flex items-center justify-center"><Smartphone className="text-blue-500 w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-lg mb-2">Mobile-First Experience</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Your customers shop on their phones. We ensure your storefront looks stunning and works flawlessly on every screen.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingSection;
