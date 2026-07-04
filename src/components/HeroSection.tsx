import { useState, useEffect } from "react";
import { ArrowRight, ShoppingBag, TrendingUp, Check, Truck, MessageSquare, MessageCircle, Settings, Sliders, Eye } from "lucide-react";
import { useAnalytics } from "@/hooks/use-analytics";

const HeroSection = () => {
  const { trackEvent } = useAnalytics();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { label: "1. Brand Customizer", desc: "Design & styling" },
    { label: "2. WhatsApp Checkout", desc: "Direct ordering" },
    { label: "3. Logistics Dispatch", desc: "Operations sync" },
  ];

  return (
    <section id="home" className="pt-24 pb-12 md:pt-40 md:pb-32 px-4 relative overflow-hidden bg-background">
      {/* Background Auras */}
      <div className="aura-blob bg-primary w-[500px] h-[500px] -top-48 -left-48" />
      <div className="aura-blob bg-accent w-[600px] h-[600px] top-1/2 -right-48" style={{ animationDelay: "2s" }} />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left — text */}
        <div data-reveal>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-8 border border-primary/20 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            GoOnline helps brands launch premium websites and ecommerce stores that sell
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black text-foreground leading-[1.0] tracking-tighter mb-8">
            Launch a Website <span className="text-glow">That Makes Your Brand</span>
            <br />
            <span className="gradient-text italic">Look Ready for Business</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed font-medium">
            We design and deploy clean, mobile-first websites and digital catalogs. Build credibility, simplify ordering, and manage operations in one unified system.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a 
              href="#pricing" 
              onClick={() => trackEvent("cta_click", { section: "hero", button: "build_my_website" })}
              className="btn-primary text-lg md:text-xl py-4 px-10 md:py-5 md:px-12 inline-flex items-center justify-center gap-3"
            >
              Build My Website <ArrowRight size={22} />
            </a>
            <a 
              href="#portfolio" 
              className="btn-outline text-lg md:text-xl py-4 px-10 md:py-5 md:px-12 inline-flex items-center justify-center gap-3"
            >
              View Our Work
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

        {/* Right — Reworked visual animation */}
        <div className="relative hidden lg:block" data-reveal data-reveal-delay="2">
          {/* Main Visual Container */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col gap-6">
            
            {/* Step Controls */}
            <div className="grid grid-cols-3 gap-2 bg-secondary/60 p-1.5 rounded-2xl border border-border/40 backdrop-blur-md">
              {steps.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveStep(idx);
                    trackEvent("hero_animation_tab", { step: idx });
                  }}
                  className={`px-3 py-2 rounded-xl text-left transition-all duration-300 ${
                    activeStep === idx 
                      ? "bg-foreground text-background shadow-md scale-102" 
                      : "hover:bg-muted text-muted-foreground"
                  }`}
                >
                  <div className="text-[10px] font-black uppercase tracking-wider opacity-85">{s.label}</div>
                  <div className="text-[9px] font-bold mt-0.5 truncate hidden sm:block">{s.desc}</div>
                </button>
              ))}
            </div>

            {/* Interactive Browser Sandbox */}
            <div className="bg-slate-950 text-white rounded-3xl border border-slate-800/80 shadow-2xl overflow-hidden aspect-[4/3] flex flex-col relative group">
              {/* Browser Header Bar */}
              <div className="bg-slate-900/90 px-4 py-3.5 flex items-center justify-between border-b border-slate-800/80 relative z-20">
                <div className="flex gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <div className="w-64 bg-slate-950/60 rounded-md py-1 text-[9px] text-slate-400 font-mono text-center tracking-tight truncate border border-white/5 select-none">
                  goonline.co/my-brand-store
                </div>
                <div className="w-4 h-4 rounded bg-slate-800/80 flex items-center justify-center shrink-0">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                </div>
              </div>

              {/* Main Sandbox Area */}
              <div className="flex-1 flex overflow-hidden relative">
                
                {/* Editor Settings Sidebar */}
                <div className="w-1/3 bg-slate-900/40 border-r border-slate-800/60 p-4 flex flex-col gap-5 justify-between select-none">
                  <div className="space-y-4">
                    <div>
                      <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Builder Options</div>
                      <div className="space-y-1.5">
                        <div className={`p-1.5 rounded-md flex items-center gap-1.5 text-[10px] font-bold ${activeStep === 0 ? 'bg-primary/20 text-primary border border-primary/20' : 'text-slate-400'}`}>
                          <Sliders size={10} />
                          Layout Theme
                        </div>
                        <div className={`p-1.5 rounded-md flex items-center gap-1.5 text-[10px] font-bold ${activeStep === 1 ? 'bg-primary/20 text-primary border border-primary/20' : 'text-slate-400'}`}>
                          <ShoppingBag size={10} />
                          Products
                        </div>
                        <div className={`p-1.5 rounded-md flex items-center gap-1.5 text-[10px] font-bold ${activeStep === 2 ? 'bg-primary/20 text-primary border border-primary/20' : 'text-slate-400'}`}>
                          <Truck size={10} />
                          Operations
                        </div>
                      </div>
                    </div>

                    {activeStep === 0 && (
                      <div className="animate-fade-in space-y-2">
                        <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Brand Colors</div>
                        <div className="flex gap-1.5">
                          <span className="w-4 h-4 rounded-full bg-primary ring-2 ring-white/20 cursor-pointer" />
                          <span className="w-4 h-4 rounded-full bg-indigo-500 cursor-pointer" />
                          <span className="w-4 h-4 rounded-full bg-pink-500 cursor-pointer" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-2 rounded-xl bg-slate-800/40 border border-white/5 flex items-center gap-1.5 text-[9px] text-slate-400 font-medium">
                    <Settings size={10} className="animate-spin-slow" />
                    Custom setup live
                  </div>
                </div>

                {/* Preview Window Canvas */}
                <div className="flex-1 bg-slate-950 p-5 flex flex-col justify-between overflow-hidden relative">
                  
                  {/* Step 1: Branding Customizer */}
                  {activeStep === 0 && (
                    <div className="w-full h-full flex flex-col justify-between animate-fade-in relative z-10">
                      <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <span className="text-[10px] font-black tracking-tight font-heading">Luxury Chrono</span>
                        <div className="flex gap-2">
                          <span className="w-2.5 h-1 bg-primary rounded-full" />
                          <span className="w-2.5 h-1 bg-primary/30 rounded-full" />
                        </div>
                      </div>
                      
                      {/* Product Preview Card */}
                      <div className="bg-slate-900/90 rounded-2xl p-3 border border-white/10 flex flex-col items-center gap-2 transform hover:scale-102 transition-transform shadow-lg relative overflow-hidden">
                        <div className="absolute top-1 right-1 bg-primary/20 text-primary text-[6px] font-black px-1.5 py-0.5 rounded-full uppercase">NEW</div>
                        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-accent/50 flex items-center justify-center p-2 relative">
                          <span className="text-white text-3xl font-black">⌚</span>
                        </div>
                        <div className="text-center">
                          <div className="text-[10px] font-bold text-white leading-tight">Chrono Gold</div>
                          <div className="text-[8px] text-primary font-black mt-0.5">₦85,000.00</div>
                        </div>
                      </div>

                      {/* Custom Theme Preview Button */}
                      <button className="w-full bg-primary text-white text-[9px] font-bold py-2 rounded-lg shadow-lg shadow-primary/30 border border-primary/20 flex items-center justify-center gap-1">
                        <Eye size={10} /> Preview Store
                      </button>
                    </div>
                  )}

                  {/* Step 2: One-Click WhatsApp Ordering */}
                  {activeStep === 1 && (
                    <div className="w-full h-full flex flex-col justify-between animate-fade-in relative z-10">
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-white/10 flex items-center gap-2">
                        <span className="text-xs">🛍️</span>
                        <div>
                          <div className="text-[9px] font-bold">Checkout Page</div>
                          <div className="text-[7px] text-slate-400">Order verification</div>
                        </div>
                      </div>

                      {/* WhatsApp order process simulation */}
                      <div className="space-y-2">
                        <div className="bg-slate-900/60 p-2 rounded-xl border border-white/5 max-w-[90%]">
                          <div className="text-[8px] font-bold text-slate-400">Product Info</div>
                          <div className="text-[9px] font-bold text-white flex justify-between mt-0.5">
                            <span>Luxury Chrono x 1</span>
                            <span className="text-primary">₦85,000</span>
                          </div>
                        </div>

                        {/* Order button click animation */}
                        <div className="relative">
                          <button className="w-full bg-green-600 text-white text-[9px] font-bold py-2.5 rounded-xl shadow-lg border border-green-500 flex items-center justify-center gap-1.5 animate-pulse-glow">
                            <MessageCircle size={10} /> Order on WhatsApp
                          </button>
                          
                          {/* Animated Cursor Click */}
                          <div className="absolute right-4 bottom-[-10px] text-lg animate-bounce pointer-events-none">
                            👆
                          </div>
                        </div>
                      </div>

                      {/* Client order card floating */}
                      <div className="bg-green-950/80 border border-green-500/20 p-2 rounded-xl flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                        <span className="text-[8px] text-green-300 font-bold">Flow status: Order details sent directly to merchant!</span>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Fulfillment & Logistics Sync */}
                  {activeStep === 2 && (
                    <div className="w-full h-full flex flex-col justify-between animate-fade-in relative z-10">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Logistics Hub</span>
                        <span className="text-[8px] font-bold bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/20">Transit</span>
                      </div>

                      {/* Live delivery status dashboard mockup */}
                      <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-3 space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 text-xs font-bold">
                            <Truck size={12} />
                          </div>
                          <div>
                            <div className="text-[9px] font-bold">Order #1248 Dispatch</div>
                            <div className="text-[7px] text-slate-400">Destination: Ikeja, Lagos</div>
                          </div>
                        </div>

                        {/* Delivery Progress Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[7px] font-bold text-slate-400">
                            <span>Warehouse</span>
                            <span className="text-indigo-400">En Route (65%)</span>
                            <span>Delivered</span>
                          </div>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-indigo-500 h-full rounded-full animate-pulse" style={{ width: "65%" }} />
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-900/60 p-2 rounded-xl border border-white/5 flex items-center justify-between text-[8px] text-slate-400">
                        <span>Courier: GoOnline Logistics</span>
                        <span className="font-bold text-white">Status: Updated 1m ago</span>
                      </div>
                    </div>
                  )}

                  {/* Glowing background flow indicator */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Floating Operations Indicators */}
            <div className="absolute -top-12 -left-8 glass-card p-4 animate-float shadow-2xl border-white/40 max-w-[200px]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Check size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">Payment Approved</div>
                  <div className="text-[9px] text-muted-foreground">₦85,000 — Instant settlement</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-10 -right-8 glass-card p-4 animate-float shadow-2xl border-white/40 max-w-[180px]" style={{ animationDelay: "1.5s" }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">Traffic Analytics</div>
                  <div className="text-[9px] text-accent font-black">+142% page views today</div>
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
