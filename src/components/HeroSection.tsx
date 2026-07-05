import { ArrowRight } from "lucide-react";
import { useAnalytics } from "@/hooks/use-analytics";

const HeroSection = () => {
  const { trackEvent } = useAnalytics();

  return (
    <section id="home" className="pt-32 pb-16 md:pt-44 md:pb-28 px-4 relative overflow-hidden bg-background">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left — text (7 columns on desktop) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left" data-reveal>
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-6">
            Website Design &bull; Ecommerce &bull; Digital Commerce
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.1] tracking-tight mb-6">
            Premium Websites for Brands Ready to Scale
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed font-medium mb-8">
            We design refined websites, ecommerce stores, and digital commerce systems for businesses that want to look credible, sell online, and operate with confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a 
              href="#contact" 
              onClick={() => trackEvent("cta_click", { section: "hero", button: "start_a_project" })}
              className="btn-primary text-sm py-3 px-8 inline-flex items-center justify-center gap-2"
            >
              Start a Project <ArrowRight size={16} />
            </a>
            <a 
              href="#portfolio" 
              className="btn-outline text-sm py-3 px-8 inline-flex items-center justify-center"
            >
              View Our Work
            </a>
          </div>
        </div>

        {/* Right — static browser mockup (5 columns on desktop) */}
        <div className="lg:col-span-5 relative w-full select-none" data-reveal data-reveal-delay="2">
          {/* Main Visual Container */}
          <div className="w-full aspect-[4/3] rounded-2xl bg-white dark:bg-card border border-border shadow-2xl overflow-hidden flex flex-col relative">
            
            {/* Safari Browser Header */}
            <div className="bg-secondary/40 px-4 py-2.5 flex items-center justify-between border-b border-border/80">
              <div className="flex gap-1.5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-border" />
                <span className="w-2 h-2 rounded-full bg-border" />
                <span className="w-2 h-2 rounded-full bg-border" />
              </div>
              <div className="w-48 bg-background rounded py-0.5 text-[8px] text-muted-foreground font-mono text-center tracking-tight border border-border/40 select-none overflow-hidden truncate">
                goonline.studio/selected-work
              </div>
              <div className="w-3" /> {/* Spacer */}
            </div>

            {/* Minimalist Visual Mockup Canvas */}
            <div className="flex-1 bg-slate-950 p-4 flex flex-col justify-between overflow-hidden relative font-sans">
              
              {/* Mock Web Header */}
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-[8px] font-bold tracking-widest uppercase text-white/90">Olajide.Studio</span>
                <div className="flex gap-3 text-[7px] text-white/50">
                  <span>Galleries</span>
                  <span>Exhibitions</span>
                  <span>Booking</span>
                </div>
              </div>
              
              {/* Hero Image Showcase */}
              <div className="flex-1 my-3 bg-gradient-to-br from-slate-900 to-zinc-950 rounded-xl border border-white/10 p-4 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <div className="text-[6px] text-white/30 uppercase tracking-[0.2em] font-bold">Featured Series</div>
                
                <div className="space-y-1.5 z-10">
                  <h3 className="text-sm font-bold text-white tracking-tight leading-none">Vanguard Portraits</h3>
                  <p className="text-[7px] text-white/60 leading-normal max-w-[150px]">Capture clarity, structure, and artistic depth in modern portraiture.</p>
                </div>

                <div className="flex justify-between items-center z-10 pt-2 border-t border-white/5">
                  <span className="text-[8px] font-bold text-white">Lagos, 2026</span>
                  <span className="text-[6px] font-bold bg-white/15 px-2 py-0.5 rounded-full text-white uppercase tracking-wider">Visual Essay</span>
                </div>
              </div>

              {/* Layout Footer Details */}
              <div className="flex justify-between items-center text-[6px] text-white/30 pt-1">
                <span>© Meshach Olajide Photography</span>
                <span>Active Booking Portal</span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
