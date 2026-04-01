import { useState } from "react";
import { Check, X, Sparkles, Zap, Store, Smartphone, MessageCircle, ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

type BillingCycle = "monthly" | "quarterly" | "biannual" | "annual";

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

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
      name: "Launch",
      type: "Starter",
      prices: {
        monthly: 5000,
        quarterly: 14500,
        biannual: 27500,
        annual: 55000
      },
      desc: "💡 Perfect for testing your idea or starting your first online business.",
      getFeatures: (cycle: BillingCycle) => [
        `Up to ${cycle === "annual" ? "50" : "20"} products`,
        "Unlimited orders",
        "1 clean store design",
        "WhatsApp checkout (get orders instantly)",
        "Coupons & discounts",
        "Manual + automatic payments",
        "Sales tracking",
        "Delivery & shipping setup",
        "Email + WhatsApp support"
      ],
      unavailable: [
        "No custom domain (yourstore.yoursite.com)"
      ],
      tagline: "👉 Keep it simple. Start selling fast.",
      ctaText: "Start Free / Get Started"
    },
    {
      name: "Grow",
      type: "Deluxe",
      prices: {
        monthly: 10000,
        quarterly: 28500,
        biannual: 55000,
        annual: 110000
      },
      desc: "🔥 For small businesses ready to level up.",
      popular: true,
      getFeatures: (cycle: BillingCycle) => [
        "Everything in Launch, plus:",
        "Up to 200 products",
        "3 premium store designs",
        "Connect your custom domain",
        "Role management (team access)",
        "Tracking pixel (run ads like a pro)",
        "Advanced store customization",
        "Email notifications (SMTP)",
        "No Free Custom Domain"
      ],
      unavailable: [],
      tagline: "👉 Build a real brand, not just a store.",
      ctaText: "Upgrade & Grow"
    },
    {
      name: "Scale",
      type: "Ultimate",
      prices: {
        monthly: 20000,
        quarterly: 57000,
        biannual: 110000,
        annual: 220000
      },
      desc: "🚀 For serious sellers ready to go big.",
      getFeatures: (cycle: BillingCycle) => [
        "Everything in Grow, plus:",
        "Up to 1000 products",
        "Blog (for SEO & content marketing)",
        "Priority support (email + WhatsApp + calls)",
        "More control, more customization",
        "Built for high-volume businesses",
        cycle === "annual" ? "Free .com.ng Custom Domain" : "No Free Custom Domain"
      ],
      unavailable: [],
      tagline: "👉 Turn your store into a full business engine.",
      ctaText: "Scale My Business"
    },
    {
      name: "Boss Mode",
      type: "POS Plan",
      prices: {
        monthly: 40000,
        quarterly: 116000,
        biannual: 220000,
        annual: 440000
      },
      desc: "🏪 For businesses selling both online & offline.",
      getFeatures: (cycle: BillingCycle) => [
        "Everything in Scale, plus:",
        "Built-in POS (Point of Sale)",
        "Sell in-store + online seamlessly",
        "Manage inventory across channels",
        "Perfect for shops, stores & large operations"
      ],
      unavailable: [],
      tagline: "👉 Run your entire business from one place.",
      ctaText: "Go Boss Mode"
    }
  ];

  return (
    <div className="w-full bg-background pb-20">
      {/* 🚀 HERO SECTION */}
      <section className="relative pt-24 pb-16 px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
          <Zap size={16} className="fill-primary" />
          Start selling in minutes
        </div>
        <h1 className="text-4xl md:text-6xl font-bold font-heading text-foreground tracking-tight mb-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
          Get paid on <span className="text-green-500">WhatsApp.</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "200ms" }}>
          Build your online store, add your products, and start receiving orders instantly — no coding, no stress.
        </p>
        <p className="text-foreground font-medium text-lg animate-fade-in" style={{ animationDelay: "300ms" }}>
          👉 Pick a plan and launch today.
        </p>
      </section>

      {/* 💎 BILLING OPTIONS SECTION */}
      <section className="max-w-4xl mx-auto px-6 mb-16 animate-fade-in" style={{ animationDelay: "400ms" }}>
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold">💰 Save more when you go long-term</h3>
          <p className="text-muted-foreground mt-2">👉 The longer you commit, the more you save.</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 p-2 bg-secondary/50 rounded-2xl md:rounded-full">
          {(["monthly", "quarterly", "biannual", "annual"] as BillingCycle[]).map((cycle) => (
            <button
              key={cycle}
              onClick={() => setBillingCycle(cycle)}
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

      {/* 🚀 PRICING PLANS */}
      <section className="max-w-[1400px] mx-auto px-6 mb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 items-start">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`group relative flex flex-col h-full rounded-3xl p-8 transition-all duration-500 cursor-pointer ${
                plan.popular 
                  ? "bg-foreground text-background shadow-2xl scale-[1.02] ring-4 ring-primary/20 hover:scale-[1.04] hover:bg-black dark:hover:bg-white hover:shadow-[0_0_40px_rgba(34,197,94,0.3)] hover:ring-green-500/50" 
                  : "bg-card border border-border shadow-sm hover:scale-105 hover:bg-green-50/50 dark:hover:bg-green-950/20 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] hover:border-green-500/50 hover:z-10"
              }`}
              style={{ animationDelay: `${500 + i * 100}ms` }}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-400 to-primary text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Sparkles size={14} className="fill-white" /> ⭐ MOST POPULAR
                </div>
              )}
              
              <div className="mb-6">
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
                  <span className={`text-4xl font-black ${plan.popular ? "text-white" : "text-foreground"}`}>{getPrice(plan.prices)}</span>
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
                <p className={`text-sm font-bold text-center mb-4 ${plan.popular ? "text-white" : "text-foreground"}`}>
                  {plan.tagline}
                </p>
                <Button 
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
      </section>

      {/* ⚡ TRUST / VALUE SECTION */}
      <section className="bg-secondary/40 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why people love this ⚡</h2>
            <p className="text-muted-foreground">Join hundreds of entrepreneurs already selling online 🚀</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-2xl shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-3 rounded-xl"><Zap className="text-primary w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-lg mb-1">Launch in minutes</h4>
                <p className="text-sm text-muted-foreground">Skip the complex setup. Pick a plan and your store is live instantly.</p>
              </div>
            </div>
            <div className="bg-background p-6 rounded-2xl shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-3 rounded-xl"><Store className="text-primary w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-lg mb-1">No coding needed</h4>
                <p className="text-sm text-muted-foreground">If you can use WhatsApp, you can manage your store and inventory here.</p>
              </div>
            </div>
            <div className="bg-background p-6 rounded-2xl shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="bg-green-500/10 p-3 rounded-xl"><MessageCircle className="text-green-500 w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-lg mb-1">Orders on WhatsApp</h4>
                <p className="text-sm text-muted-foreground">Get notified directly where you already talk to your customers.</p>
              </div>
            </div>
            <div className="bg-background p-6 rounded-2xl shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-3 rounded-xl"><Smartphone className="text-primary w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-lg mb-1">Mobile Perfect</h4>
                <p className="text-sm text-muted-foreground">Designed for the modern buyer, works flawlessly on any device.</p>
              </div>
            </div>
            <div className="bg-background p-6 rounded-2xl shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-2">
              <div className="bg-primary/10 p-3 rounded-xl"><Sparkles className="text-primary w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-lg mb-1">Built for modern businesses</h4>
                <p className="text-sm text-muted-foreground">Coupons, manual & auto payments, pixels, domains—everything you need to scale, baked right in without extra costly plugins.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ❓ FAQ SECTION */}
      <section className="max-w-3xl mx-auto py-24 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Got questions? ❓</h2>
          <p className="text-muted-foreground">We've got answers.</p>
        </div>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="bg-card border px-6 rounded-2xl">
            <AccordionTrigger className="hover:no-underline font-semibold text-left">Do I need technical skills?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Nope. If you can use WhatsApp, you can use this. We've simplified everything so you can focus on selling.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="bg-card border px-6 rounded-2xl">
            <AccordionTrigger className="hover:no-underline font-semibold text-left">How do I receive orders?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Customers browse your website, add items to their cart, and their order is sent directly to your WhatsApp instantly. You can chat with them and finalize the sale immediately.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="bg-card border px-6 rounded-2xl">
            <AccordionTrigger className="hover:no-underline font-semibold text-left">Can I upgrade later?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Yes! You can upgrade anytime as your business grows. We make it easy to scale up seamlessly without any downtime.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="bg-card border px-6 rounded-2xl">
            <AccordionTrigger className="hover:no-underline font-semibold text-left">Do you take commissions?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              No. We charge a flat subscription fee. What you earn from your sales is 100% yours to keep.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5" className="bg-card border px-6 rounded-2xl">
            <AccordionTrigger className="hover:no-underline font-semibold text-left">Can I use my own domain?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Yes — custom domains are available on the Grow plan and above. You can easily connect your own perfectly branded domain name.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* 🎯 FINAL CTA */}
      <section className="max-w-5xl mx-auto px-6 mb-10">
        <div className="bg-gradient-to-br from-foreground to-gray-800 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/20 rounded-full blur-3xl -ml-20 -mb-20"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Ready to start <span className="text-primary">selling?</span> 🚀
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Create your store in minutes and start receiving orders today. <br className="hidden md:block"/>
              <span className="font-semibold text-white">No coding. No stress. Just sales.</span>
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 text-lg rounded-full group">
              Get Started Now 
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingSection;

