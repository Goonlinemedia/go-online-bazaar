import { ArrowRight, Globe, Book, GraduationCap, ShoppingBag } from "lucide-react";
import { useAnalytics } from "@/hooks/use-analytics";

const HeroSection = () => {
  const { trackEvent } = useAnalytics();

  const handleWorkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackEvent("cta_click", { section: "hero", button: "view_our_work" });
    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-28 px-4 relative overflow-hidden bg-[#FCFCFD] dark:bg-background">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/30 rounded-full blur-[150px] pointer-events-none opacity-5" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Left Column — Copwriting and CTA */}
        <div className="lg:col-span-7 flex flex-col items-start text-left" data-reveal>
          <div className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-6">
            Digital Website Partner
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-bold text-foreground leading-[1.1] tracking-tight mb-6">
            Professional Websites That Grow Your Business
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed mb-8">
            We design and build modern websites for businesses, churches, schools, NGOs, startups, and online stores—helping you attract customers, build credibility, and grow online.
          </p>

          {/* SaaS bulleted checks */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 mb-10 w-full max-w-md">
            {[
              "Free setup & onboarding",
              "Mobile responsive designs",
              "Payment gateways integrated",
              "Delivered in days, not months"
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2.5 text-sm font-semibold text-muted-foreground">
                <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] shrink-0">✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a 
              href="#contact" 
              onClick={() => trackEvent("cta_click", { section: "hero", button: "get_started" })}
              className="btn-primary text-sm py-4 px-8 inline-flex items-center justify-center gap-2 shadow-md"
            >
              Get Started <ArrowRight size={16} />
            </a>
            <a 
              href="#portfolio" 
              onClick={handleWorkClick}
              className="btn-outline text-sm py-4 px-8 inline-flex items-center justify-center border border-border bg-transparent text-foreground hover:bg-secondary"
            >
              View Our Work
            </a>
          </div>
        </div>

        {/* Right Column — Grid Collage of Mockup Websites */}
        <div className="lg:col-span-5 relative w-full h-[400px] select-none flex items-center justify-center" data-reveal data-reveal-delay="2">
          
          {/* Collage Container */}
          <div className="relative w-full h-full max-w-[450px]">
            
            {/* CARD 1: Corporate Business Site (Left-Top Back) */}
            <div className="absolute top-2 left-2 z-10 w-[210px] aspect-[4/3] rounded-2xl bg-white dark:bg-card border border-border shadow-lg p-3 flex flex-col justify-between animate-float">
              <div className="flex items-center justify-between pb-1 border-b border-border/80 text-[7px] text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Globe size={10} className="text-blue-500" />
                  <span className="font-bold text-foreground">ApexCorp</span>
                </div>
                <span>Services &bull; About</span>
              </div>
              <div className="flex-1 my-2 bg-slate-50 dark:bg-slate-900 rounded p-2 flex flex-col justify-center gap-1.5">
                <div className="h-2 w-20 bg-slate-300 dark:bg-slate-700 rounded" />
                <div className="h-1.5 w-28 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="h-1.5 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="h-3 w-10 bg-primary/20 rounded mt-1" />
              </div>
              <div className="text-[6px] text-muted-foreground">© ApexCorp Industries</div>
            </div>

            {/* CARD 2: Church Website (Right-Top Back) */}
            <div className="absolute top-6 right-2 z-10 w-[200px] aspect-[4/3] rounded-2xl bg-white dark:bg-card border border-border shadow-lg p-3 flex flex-col justify-between animate-float [animation-delay:1.5s]">
              <div className="flex items-center justify-between pb-1 border-b border-border/80 text-[7px] text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Book size={10} className="text-amber-500" />
                  <span className="font-bold text-foreground">Faith Chapel</span>
                </div>
                <span>Media</span>
              </div>
              <div className="flex-1 my-2 bg-amber-50/50 dark:bg-amber-950/10 rounded p-2 flex flex-col justify-between">
                <div>
                  <div className="text-[8px] font-bold text-amber-700 dark:text-amber-500">Live Sunday Stream</div>
                  <div className="h-1 w-20 bg-amber-200 dark:bg-amber-800 rounded mt-1" />
                </div>
                <div className="h-3 w-full bg-[#FFF7ED] dark:bg-amber-950/20 text-[7px] text-primary flex items-center justify-center rounded font-semibold border border-primary/10">
                  Give Online
                </div>
              </div>
              <div className="text-[6px] text-muted-foreground">Faith Chapel Ministry</div>
            </div>

            {/* CARD 3: School Portal (Left-Bottom Mid) */}
            <div className="absolute bottom-6 left-6 z-20 w-[200px] aspect-[4/3] rounded-2xl bg-white dark:bg-card border border-border shadow-xl p-3 flex flex-col justify-between animate-float [animation-delay:2s]">
              <div className="flex items-center justify-between pb-1 border-b border-border/80 text-[7px] text-muted-foreground">
                <div className="flex items-center gap-1">
                  <GraduationCap size={10} className="text-indigo-500" />
                  <span className="font-bold text-foreground">Premier Prep</span>
                </div>
                <span>Portals</span>
              </div>
              <div className="flex-1 my-2 bg-indigo-50/50 dark:bg-indigo-950/10 rounded p-2 flex flex-col justify-between">
                <div>
                  <div className="text-[8px] font-bold text-indigo-700 dark:text-indigo-400">Admissions Open</div>
                  <div className="text-[6px] text-muted-foreground mt-0.5">2026/2027 Academic Year</div>
                </div>
                <div className="h-3 w-16 bg-indigo-600 text-[6px] text-white flex items-center justify-center rounded font-bold">
                  Apply Now
                </div>
              </div>
              <div className="text-[6px] text-indigo-600/80">Active Portal</div>
            </div>

            {/* CARD 4: E-commerce Store (Center-Front Foreground) */}
            <div className="absolute bottom-2 right-4 z-30 w-[220px] aspect-[4/3] rounded-2xl bg-white dark:bg-card border-2 border-primary/20 shadow-2xl p-3.5 flex flex-col justify-between animate-float [animation-delay:0.7s]">
              <div className="flex items-center justify-between pb-1 border-b border-border/80 text-[7px] text-muted-foreground">
                <div className="flex items-center gap-1">
                  <ShoppingBag size={10} className="text-emerald-500" />
                  <span className="font-bold text-foreground">Luxe Fashion</span>
                </div>
                <span>Catalog</span>
              </div>
              <div className="flex-1 my-2 bg-slate-50 dark:bg-slate-900 rounded p-2 flex gap-2">
                <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded shrink-0" />
                <div className="flex-1 flex flex-col justify-center gap-1">
                  <div className="h-2 w-16 bg-slate-300 dark:bg-slate-700 rounded" />
                  <div className="h-1.5 w-10 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="text-[8px] font-bold text-primary">₦24,500.00</div>
                </div>
              </div>
              <div className="h-4.5 w-full bg-primary text-[8px] text-white flex items-center justify-center rounded-lg font-bold hover:bg-[#EA580C] transition-colors">
                Checkout
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
