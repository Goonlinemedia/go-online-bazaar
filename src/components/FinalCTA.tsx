import { Rocket, ArrowRight } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-white" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-white)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="bg-white/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-2xl backdrop-blur-sm border border-white/20 transform rotate-12">
          <Rocket className="text-white w-10 h-10" />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-black text-white mb-8 font-heading tracking-tight">
          Launch Your <br className="md:hidden" />
          <span className="text-yellow-300 underline decoration-white/20 underline-offset-8">Professional Website Today</span>
        </h2>
        
        <p className="text-lg md:text-xl text-white/90 mb-12 font-medium leading-relaxed max-w-2xl mx-auto">
          We design and deploy premium web solutions, product catalogs, and commerce integrations that elevate your business.
          <span className="block mt-2 font-bold text-white uppercase tracking-widest text-xs">Full domain registry, business email, and launch support included.</span>
        </p>

        <div className="flex flex-col items-center">
          <a 
            href="#pricing" 
            className="group bg-white text-primary hover:bg-yellow-300 hover:text-primary-foreground text-lg md:text-xl font-black py-5 px-10 md:py-6 md:px-12 rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.4)] transition-all duration-300 flex items-center gap-3 hover:-translate-y-2"
          >
            Build My Website
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
