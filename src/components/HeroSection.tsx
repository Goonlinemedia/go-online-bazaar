import { ArrowRight } from "lucide-react";
import { useAnalytics } from "@/hooks/use-analytics";
import { useLocation } from "react-router-dom";

const HeroSection = () => {
  const { trackEvent } = useAnalytics();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleWorkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackEvent("cta_click", { section: "hero", button: "view_our_work" });
    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#portfolio";
    }
  };

  return (
    <section id="home" className="pt-36 pb-20 lg:pt-48 lg:pb-32 px-6 relative overflow-hidden bg-[#FCFCFD] dark:bg-background">
      {/* Calm glowing blur backdrops */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-primary/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[350px] h-[350px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-5" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Left Column — Core Copy */}
        <div className="lg:col-span-6 flex flex-col items-start text-left" data-reveal>
          <div className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-6">
            Digital Website Partner
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-foreground leading-[1.15] tracking-tight mb-6 font-heading">
            Professional Websites That Grow Your Business
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground max-w-lg leading-relaxed mb-10 font-medium">
            We design and build modern websites for businesses, schools, churches, and NGOs—helping you attract customers, build credibility, and grow online.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a 
              href={isHome ? "#contact" : "/#contact"} 
              onClick={() => trackEvent("cta_click", { section: "hero", button: "get_started" })}
              className="btn-primary text-sm py-4 px-8 inline-flex items-center justify-center gap-2 shadow-sm"
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

        {/* Right Column — Single Premium Mockup */}
        <div className="lg:col-span-6 relative w-full select-none flex items-center justify-center" data-reveal data-reveal-delay="2">
          {/* Subtle Radial Glow Behind Mockup */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />

          {/* Device Mockup */}
          <div className="w-full max-w-[500px] aspect-[4/3] rounded-[24px] bg-[#0F172A] border border-[#334155] shadow-2xl p-3 flex flex-col relative overflow-hidden group">
            
            {/* Browser Header Bar */}
            <div className="bg-[#1E293B] border-b border-[#334155]/60 px-4 py-2 flex items-center justify-between shrink-0 text-white/40">
              <div className="flex gap-1.5 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
              </div>
              <div className="w-40 bg-[#0F172A] rounded py-0.5 text-[6px] text-slate-500 font-mono text-center tracking-tight border border-slate-800/40 truncate">
                goonline.agency/showcase
              </div>
              <div className="w-3" />
            </div>

            {/* Mock website screen with custom slow parallax background scroll */}
            <div className="flex-1 bg-slate-900 rounded-lg p-4 flex flex-col justify-between relative overflow-hidden font-sans text-white/90">
              <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
              
              {/* Mock Header */}
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-[8px] font-bold tracking-wider text-white">Apex Digital</span>
                <div className="flex gap-2 text-[6px] text-slate-400">
                  <span>Solutions</span>
                  <span>Portfolios</span>
                  <span>Contact</span>
                </div>
              </div>

              {/* Mock Hero Area */}
              <div className="flex-1 flex flex-col justify-center my-4 gap-2">
                <div className="text-[10px] font-bold text-primary">Web Solutions</div>
                <div className="h-4 w-32 bg-white rounded-sm" />
                <div className="h-2 w-48 bg-slate-700 rounded-sm" />
                <div className="h-2 w-32 bg-slate-700 rounded-sm" />
              </div>

              {/* Mock Content Stats */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800">
                <div>
                  <div className="text-[8px] font-bold text-white">99%</div>
                  <div className="text-[5px] text-slate-500 uppercase">Conversion</div>
                </div>
                <div>
                  <div className="text-[8px] font-bold text-white">100+</div>
                  <div className="text-[5px] text-slate-500 uppercase">Launches</div>
                </div>
                <div>
                  <div className="text-[8px] font-bold text-white">24/7</div>
                  <div className="text-[5px] text-slate-500 uppercase">Support</div>
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
