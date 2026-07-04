import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-heading tracking-tight leading-tight">
          Ready to Look Established?
        </h2>
        
        <p className="text-base md:text-lg text-white/80 mb-8 font-medium leading-relaxed max-w-xl mx-auto">
          We design and deploy premium web solutions, product catalogs, and digital commerce integrations that support your operations.
        </p>

        <div className="flex flex-col items-center">
          <a 
            href="#contact" 
            className="group bg-white text-primary hover:bg-white/95 text-sm font-bold py-3.5 px-8 rounded-xl shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            Start a Project
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
