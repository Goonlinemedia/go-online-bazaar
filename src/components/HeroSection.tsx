import { ArrowRight, ShoppingBag, Globe, TrendingUp } from "lucide-react";
import { useAnalytics } from "@/hooks/use-analytics";

const HeroSection = () => {
  const { trackEvent } = useAnalytics();

  return (
    <section id="home" className="pt-24 pb-12 md:pt-32 md:pb-20 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left — text */}
        <div>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Launching your online store made simple
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-heading font-extrabold text-foreground leading-[1.05] tracking-tighter">
            Start Your Online Store & 
            <br />
            <span className="gradient-text">Receive Orders on WhatsApp</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed font-medium">
            Build your store, upload products, and start selling in minutes — all from your phone. No tech skills needed.
          </p>

          <div className="mt-8">
            <a 
              href="#pricing" 
              onClick={() => trackEvent("cta_click", { section: "hero", button: "start_selling_now" })}
              className="btn-primary text-lg md:text-xl py-4 px-8 md:py-6 md:px-12 inline-flex items-center gap-3 shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all border-2 border-white/20 hover:-translate-y-1"
            >
              Start Selling Now <ArrowRight size={22} />
            </a>
          </div>

          <p className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
            <span className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-background bg-muted overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                </div>
              ))}
            </span>
            <span className="font-medium">Trusted by 500+ Nigerian sellers</span>
          </p>

          <div className="mt-10 flex gap-8">
            <div>
              <div className="text-2xl font-bold font-heading text-foreground">10+</div>
              <div className="text-xs text-muted-foreground">Active Stores</div>
            </div>
            <div className="w-px bg-border" />
            <div>
              <div className="text-2xl font-bold font-heading text-foreground">100+</div>
              <div className="text-xs text-muted-foreground">Orders Processed</div>
            </div>
            <div className="w-px bg-border" />
            <div>
              <div className="text-2xl font-bold font-heading text-foreground">900+</div>
              <div className="text-xs text-muted-foreground">Happy Customers</div>
            </div>
          </div>
        </div>

        {/* Right — visual */}
        <div className="relative hidden lg:block">
          <div className="w-full aspect-square max-w-lg mx-auto relative">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-full blur-3xl" />

            {/* Floating cards */}
            <div className="absolute top-8 left-4 glass-card p-5 animate-float shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                  <ShoppingBag className="text-primary" size={20} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">New Order</div>
                  <div className="text-xs text-muted-foreground">₦45,000 — Sneakers</div>
                </div>
              </div>
            </div>

            <div className="absolute top-1/3 right-0 glass-card p-5 animate-float shadow-xl" style={{ animationDelay: "1s" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
                  <Globe className="text-accent" size={20} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Site Live!</div>
                  <div className="text-xs text-muted-foreground">wickedstylist.com</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-16 left-12 glass-card p-5 animate-float shadow-xl" style={{ animationDelay: "2s" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                  <TrendingUp className="text-primary" size={20} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Revenue Up</div>
                  <div className="text-xs text-primary font-semibold">+34% this month</div>
                </div>
              </div>
            </div>

            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-dashed border-primary/30 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse-glow shadow-2xl p-6">
                <img src="/favicon.png" alt="GoOnline Logo" className="w-full h-full object-contain filter drop-shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
