import { ArrowRight, ShoppingBag, Globe, TrendingUp } from "lucide-react";
import { useAnalytics } from "@/hooks/use-analytics";

const HeroSection = () => {
  const { trackEvent } = useAnalytics();

  return (
    <section id="home" className="pt-24 pb-12 md:pt-40 md:pb-32 px-4 relative overflow-hidden">
      {/* Background Auras */}
      <div className="aura-blob bg-primary w-[500px] h-[500px] -top-48 -left-48" />
      <div className="aura-blob bg-accent w-[600px] h-[600px] top-1/2 -right-48" style={{ animationDelay: "2s" }} />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left — text */}
        <div data-reveal>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-8 border border-primary/20 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Launching your online store made simple
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-heading font-black text-foreground leading-[0.95] tracking-tighter mb-8">
            Start Your <span className="text-glow">Online Store</span>
            <br />
            <span className="gradient-text italic">& Receive Orders</span>
          </h1>

          <p className="mt-6 text-lg md:text-2xl text-muted-foreground max-w-xl leading-relaxed font-medium">
            Build your store, upload products, and start selling in minutes — all from your phone. No tech skills needed.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a 
              href="#pricing" 
              onClick={() => trackEvent("cta_click", { section: "hero", button: "start_selling_now" })}
              className="btn-primary text-lg md:text-xl py-4 px-10 md:py-5 md:px-12 inline-flex items-center justify-center gap-3"
            >
              Start Selling Now <ArrowRight size={22} />
            </a>
            <a 
              href="#how-it-works" 
              className="btn-outline text-lg md:text-xl py-4 px-10 md:py-5 md:px-12 inline-flex items-center justify-center gap-3"
            >
              See How It Works
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-border/50 flex flex-wrap gap-12">
            <div>
              <div className="text-3xl font-black font-heading text-foreground">10+</div>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Active Stores</div>
            </div>
            <div>
              <div className="text-3xl font-black font-heading text-foreground">100+</div>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Orders Processed</div>
            </div>
            <div>
              <div className="text-3xl font-black font-heading text-foreground">900+</div>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Happy Customers</div>
            </div>
          </div>
        </div>

        {/* Right — visual */}
        <div className="relative hidden lg:block" data-reveal data-reveal-delay="2">
          <div className="w-full aspect-square max-w-lg mx-auto relative">
            {/* Main Visual Container */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 w-full h-full glass-panel flex items-center justify-center p-12 overflow-hidden">
               <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
               
               {/* Center circle */}
               <div className="w-64 h-64 rounded-full border border-dashed border-primary/20 flex items-center justify-center animate-spin-slow">
                 <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl p-8 animate-pulse-glow">
                   <img src="/favicon.png" alt="GoOnline Logo" className="w-full h-full object-contain filter drop-shadow-2xl" />
                 </div>
               </div>

               {/* Floating Cards Integrated into Panel */}
               <div className="absolute top-12 left-6 glass-card p-4 animate-float shadow-2xl border-white/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <ShoppingBag className="text-primary" size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">New Order</div>
                    <div className="text-[10px] text-muted-foreground font-bold">₦45,000 — Sneakers</div>
                  </div>
                </div>
               </div>

               <div className="absolute bottom-12 right-6 glass-card p-4 animate-float shadow-2xl border-white/40" style={{ animationDelay: "1.5s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <TrendingUp className="text-accent" size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">Growth</div>
                    <div className="text-[10px] text-primary font-bold">+34% Growth</div>
                  </div>
                </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
