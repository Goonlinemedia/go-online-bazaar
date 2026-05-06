import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

const ProblemSolutionSection = () => {
  const problems = [
    "Selling through WhatsApp can be unstructured and difficult to manage",
    "Customers often show interest but don’t complete purchases",
    "Repeating product details manually takes time",
    "Without a proper store, your business may not appear credible",
  ];

  const solutions = [
    "We build a clean, professional online store for your business",
    "Your customers can place orders easily, with full details sent to your WhatsApp",
    "All your products are organized and presented in one place",
    "You save time and focus on growing your business",
  ];

  return (
    <section id="solution" className="section-padding relative overflow-hidden bg-secondary/10">
      <div className="section-number">02</div>
      <div className="aura-blob bg-accent w-[500px] h-[500px] -left-24 bottom-0 opacity-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20" data-reveal>
          <span className="text-sm font-black text-primary uppercase tracking-[0.2em] text-glow">The Transition</span>
          <h2 className="mt-6 text-4xl md:text-6xl font-heading font-black text-foreground leading-[1.1] tracking-tighter max-w-4xl mx-auto">
            Stop Losing Sales to <span className="text-red-500/80 italic">"DM for Price"</span>
          </h2>
          <p className="mt-8 text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            You work too hard to let messy WhatsApp chats kill your business. 
            GoOnline turns your phone into a professional sales machine.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Problem */}
          <div className="glass-panel p-10 md:p-14 border-red-500/10 shadow-inner relative overflow-hidden" data-reveal data-reveal-delay="1">
            <div className="absolute -top-10 -right-10 opacity-[0.03] rotate-12">
              <AlertCircle size={200} className="text-red-500" />
            </div>
            <h3 className="text-2xl font-black mb-10 flex items-center gap-3 text-red-500/80 tracking-tight">
              <XCircle size={28} /> The Friction
            </h3>
            <ul className="space-y-8">
              {problems.map((p, i) => (
                <li key={i} className="flex items-start gap-5 text-muted-foreground group">
                  <div className="w-2 h-2 rounded-full bg-red-400/30 mt-3 flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
                  <span className="text-xl font-medium leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution */}
          <div className="bg-primary text-primary-foreground rounded-[2rem] p-10 md:p-14 shadow-2xl shadow-primary/30 relative overflow-hidden" data-reveal data-reveal-delay="2">
             <div className="absolute -top-10 -right-10 opacity-10 rotate-12">
              <CheckCircle2 size={200} className="text-white" />
            </div>
            <h3 className="text-2xl font-black mb-10 flex items-center gap-3 tracking-tight">
              <CheckCircle2 size={28} /> The Growth
            </h3>
            <ul className="space-y-8">
              {solutions.map((s, i) => (
                <li key={i} className="flex items-start gap-5 group">
                  <div className="w-2 h-2 rounded-full bg-white/30 mt-3 flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
                  <span className="text-xl font-bold leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
            <div className="mt-12 pt-10 border-t border-white/10">
                <p className="text-2xl font-black mb-3 font-heading">Automate Your Success</p>
                <p className="text-base opacity-80 mb-8 font-medium italic">We handle the tech, you handle the growth.</p>
                <a href="#pricing" className="btn-primary bg-white text-primary hover:bg-white/90 shadow-2xl shadow-black/20 w-full sm:w-auto text-center justify-center">
                    Start Receiving Orders
                </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
