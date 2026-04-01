import { ArrowRight, ShoppingBag, Globe, TrendingUp } from "lucide-react";

const HeroSection = () => (
  <section id="home" className="pt-24 pb-12 md:pt-32 md:pb-20 px-4">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      {/* Left — text */}
      <div>
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Launching your online store made simple
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-extrabold text-foreground leading-[1.05] tracking-tighter">
          We build your store. 
          <br />
          <span className="gradient-text">You focus on cash.</span>
        </h1>

        <p className="mt-4 text-sm font-bold text-muted-foreground uppercase tracking-widest">
          Trusted by businesses to turn WhatsApp into a sales machine.
        </p>

        <p className="mt-6 text-xl text-muted-foreground max-w-lg leading-relaxed font-medium">
          No tech. No stress. No delays. We build your store, you focus on making money. 
          <span className="block mt-4 font-black text-foreground underline decoration-primary/30 underline-offset-4">No commissions. No hidden fees. You keep 100% of your sales.</span>
        </p>

        <div className="mt-8">
          <a href="#pricing" className="btn-primary text-xl py-6 px-12 inline-flex items-center gap-3 shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all border-2 border-white/20 hover:-translate-y-1">
            Start Getting Orders <ArrowRight size={22} />
          </a>
        </div>

        <div className="mt-10 flex gap-8">
          <div>
            <div className="text-2xl font-bold font-heading text-foreground">4K+</div>
            <div className="text-xs text-muted-foreground">Active Stores</div>
          </div>
          <div className="w-px bg-border" />
          <div>
            <div className="text-2xl font-bold font-heading text-foreground">500K+</div>
            <div className="text-xs text-muted-foreground">Orders Processed</div>
          </div>
          <div className="w-px bg-border" />
          <div>
            <div className="text-2xl font-bold font-heading text-foreground">102K+</div>
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
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse-glow">
              <span className="text-3xl font-bold font-heading text-primary-foreground">GO</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
