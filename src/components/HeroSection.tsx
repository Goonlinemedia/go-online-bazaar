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

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.1] tracking-tight">
          Get your online store
          <br />
          <span className="gradient-text">built for you.</span>
        </h1>

        <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
          Start receiving orders on WhatsApp — without stress. We handle the 
          setup and technology; you handle the sales.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#pricing" className="btn-primary text-[17px] py-4 px-8 inline-flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
            Get My Store Live <ArrowRight size={18} />
          </a>
          <a href="#features" className="btn-outline text-base">
            See How it Works
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
