import { useState } from "react";
import { Check, X, Sparkles, Store, Smartphone, MessageCircle, ArrowRight } from "lucide-react";
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
      name: "Hustle",
      type: "Launch",
      prices: {
        monthly: 5000,
        quarterly: 14500,
        biannual: 27500,
        annual: 55000
      },
      desc: "Perfect to start selling today",
      getFeatures: (cycle: BillingCycle) => [
        `Up to ${cycle === "annual" ? "50" : "20"} products`,
        "Unlimited orders",
        "WhatsApp checkout (instant orders)",
        "Coupons & discounts",
        "Payment setup",
        "Sales tracking",
        "Delivery & shipping setup",
        "Email + WhatsApp support"
      ],
      unavailable: [
        "No custom domain"
      ],
      tagline: "Start small, sell fast",
      ctaText: "Start Selling"
    },
    {
      name: "Pro Seller",
      type: "Grow",
      prices: {
        monthly: 10000,
        quarterly: 28500,
        biannual: 55000,
        annual: 110000
      },
      desc: "For serious sellers ready to grow fast",
      popular: true,
      badge: "MOST POPULAR",
      getFeatures: (cycle: BillingCycle) => [
        "Everything in Hustle, plus:",
        "Up to 200 products",
        "Custom domain connection",
        "3 premium store designs",
        "Facebook/Instagram tracking pixel",
        "Advanced customization",
        "Email notifications",
        "No Free Custom Domain"
      ],
      unavailable: [],
      tagline: "Grow your sales daily",
      ctaText: "Start Growing Now",
      recommended: "💡 Recommended: Most sellers choose this plan to grow faster"
    },
    {
      name: "Empire",
      type: "Scale",
      prices: {
        monthly: 20000,
        quarterly: 57000,
        biannual: 110000,
        annual: 220000
      },
      desc: "Build a full business, not just a store",
      badge: "BEST VALUE",
      getFeatures: (cycle: BillingCycle) => [
        "Everything in Pro Seller, plus:",
        "Up to 1000 products",
        "Blog (SEO + content marketing)",
        "Priority support (calls + WhatsApp)",
        "Advanced control & scaling tools",
        cycle === "annual" ? "Free .com.ng Custom Domain" : "No Free Custom Domain"
      ],
      unavailable: [],
      tagline: "Run a serious business",
      ctaText: "Build My Business"
    }
  ];

  const handlePlanClick = (planName: string, planType: string) => {
    const plan = plans.find(p => p.name === planName);
    const price = plan ? getPrice(plan.prices) : "";
    const period = getPeriodText();
    
    // 1. Track the event in our dashboard
    trackEvent("plan_selected", { 
      plan_name: planName, 
      plan_type: planType, 
      billing_cycle: billingCycle,
      price: plan?.prices[billingCycle]
    });

    // 2. Generate WhatsApp Message
    const whatsappNumber = "2348035826698"; 
    let message = "";

    if (planName === "Hustle") {
      message = `Hi GoOnline! 👋 I'm interested in the Hustle plan for ${price}/${period}. I want to get my store built fast! 🚀`;
    } else if (planName === "Pro Seller") {
      message = `Hello GoOnline! 🔥 I want to start my store now with the Pro Seller plan for ${price}/${period}. Let's build a real brand! ⚡`;
    } else {
      message = `Hi there! 🚀 I'm ready to build my store today with the Empire plan for ${price}/${period}. I want to go big! 💎`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // 3. Open WhatsApp and keep them on our page in case they want to browse more
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div id="pricing" className="w-full bg-background pb-20">
      {/* 🚀 HERO SECTION */}
      <section className="relative pt-24 pb-16 px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold font-heading text-foreground tracking-tight mb-6 mt-16 animate-fade-in" style={{ animationDelay: "100ms" }}>
          Choose the Plan That Fits Your Hustle
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
          Start small, grow fast, and scale into a full business — no hidden fees.
        </p>
      </section>

      {/* 💎 BILLING OPTIONS SECTION */}
      <section className="max-w-4xl mx-auto px-6 mb-16 animate-fade-in" style={{ animationDelay: "400ms" }}>
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold font-heading">💰 Save more with long-term plans</h3>
          <p className="text-muted-foreground mt-2">👉 The longer we partner, the more your business saves.</p>
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
                <span className="absolute -top-3 -right-2 bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm whitespace-nowrap animate-bounce">
                  Best Value 💎
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* 💳 PRICING CARDS SECTION */}
      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        {plans.map((plan, i) => (
          <div
            key={plan.name}
            className={`group relative flex flex-col h-full rounded-3xl p-6 md:p-8 transition-all duration-500 cursor-pointer ${
              plan.popular 
                ? "bg-foreground text-background shadow-2xl scale-[1.02] ring-4 ring-primary/20 hover:scale-[1.04] hover:bg-black dark:hover:bg-white hover:shadow-[0_0_40px_rgba(34,197,94,0.3)] hover:ring-green-500/50" 
                : "bg-card border border-border shadow-sm hover:scale-105 hover:bg-green-50/50 dark:hover:bg-green-950/20 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] hover:border-green-500/50 hover:z-10"
            }`}
            style={{ animationDelay: `${500 + i * 100}ms` }}
          >
            {plan.badge && (
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 ${plan.popular ? 'bg-gradient-to-r from-orange-400 to-primary' : 'bg-primary'} text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg z-20`}>
                <Sparkles size={14} className="fill-white" /> ⭐ {plan.badge}
              </div>
            )}
              
            <div className="mb-6 mt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className={`text-2xl font-bold ${plan.popular ? "text-background" : "text-foreground"}`}>{plan.name}</h3>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${plan.popular ? "bg-white/20" : "bg-secondary text-secondary-foreground"}`}>
                  {plan.type}
                </span>
              </div>
              <p className={`text-sm mt-4 min-h-[40px] leading-relaxed ${plan.popular ? "text-gray-300" : "text-muted-foreground"}`}>{plan.desc}</p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className={`text-3xl md:text-4xl font-black ${plan.popular ? "text-white" : "text-foreground"}`}>{getPrice(plan.prices)}</span>
                <span className={`text-sm font-medium ${plan.popular ? "text-gray-400" : "text-muted-foreground"}`}>/{getPeriodText()}</span>
              </div>
            </div>

            <div className="flex-grow space-y-6">
              <ul className="space-y-3.5">
                {plan.getFeatures(billingCycle).map((f, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className={`mt-0.5 rounded-full p-0.5 ${plan.popular ? "bg-white/20" : "bg-primary/10"}`}>
                      <Check size={14} className={plan.popular ? "text-white" : "text-primary"} />
                    </div>
                    <span className={`text-sm font-medium ${plan.popular ? "text-gray-100" : "text-foreground"}`}>{f}</span>
                  </li>
                ))}
                {plan.unavailable.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-3 opacity-50">
                    <div className="mt-0.5 rounded-full p-0.5 bg-muted">
                      <X size={14} className="text-muted-foreground" />
                    </div>
                    <span className={`text-sm font-medium ${plan.popular ? "text-gray-300" : "text-muted-foreground"}`}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-8 border-t border-border/10">
              {plan.name === "Pro Seller" && (
                <p className="text-xs font-bold text-center mb-4 text-green-500 bg-green-500/10 py-2 rounded-lg">
                  {plan.recommended}
                </p>
              )}
              <p className={`text-sm font-black text-center mb-4 ${plan.popular ? "text-white" : "text-foreground"}`}>
                {plan.tagline}
              </p>
              <Button 
                onClick={() => handlePlanClick(plan.name, plan.type)}
                className={`w-full py-6 text-sm font-bold rounded-xl transition-all duration-300 ${
                  plan.popular 
                    ? "bg-white text-foreground hover:-translate-y-1 hover:bg-green-500 hover:text-white hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]" 
                    : "bg-foreground text-background hover:-translate-y-1 hover:bg-green-500 hover:text-white hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]"
                }`}
              >
                {plan.ctaText}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* 🛡️ RISK REMOVAL & URGENCY */}
      <div className="max-w-3xl mx-auto px-6 mb-24 text-center">

        <div className="bg-secondary/40 border border-border/50 rounded-3xl p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16" />
          <div className="relative z-10">
            <h4 className="text-xl font-bold mb-4 font-heading">💡 Not sure which plan to choose?</h4>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Start with the <span className="text-foreground font-bold underline decoration-primary/30">Hustle</span> plan today and upgrade any time as your business grows. 
              <br className="hidden md:block" />
              <span className="text-foreground font-bold">No hidden fees. No commissions. You keep 100% of your sales.</span>
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white dark:bg-background rounded-full border border-border shadow-sm">
                <span className="flex h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-bold text-foreground">⏱️ Your store will be ready in 2-5 days</span>
            </div>
          </div>
        </div>
      </div>

      {/* ⚡ TRUST / VALUE SECTION */}
      <section className="bg-secondary/40 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Outcome-Driven Results ⚡</h2>
            <p className="text-muted-foreground text-lg">We don't just build sites; we build high-converting sales machines. 🚀</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-2xl shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow border border-border/50">
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center p-2.5">
                <img src="/favicon.png" alt="GoOnline Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">We Build It For You</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Skip the learning curve. We handle the design, setup, and launch so you can stay focused on your products.</p>
              </div>
            </div>
            <div className="bg-background p-8 rounded-2xl shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow border border-border/50">
              <div className="bg-green-500/10 w-12 h-12 rounded-xl flex items-center justify-center"><MessageCircle className="text-green-500 w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-lg mb-2">Direct WhatsApp Sales</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Convert visitors into buyers instantly. Orders land directly in your WhatsApp, closing sales in real-time.</p>
              </div>
            </div>
            <div className="bg-background p-8 rounded-2xl shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow border border-border/50">
              <div className="bg-blue-500/10 w-12 h-12 rounded-xl flex items-center justify-center"><Smartphone className="text-blue-500 w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-lg mb-2">Mobile-First Experience</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Your customers shop on their phones. We ensure your store looks stunning and works flawlessly on every screen size.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingSection;

