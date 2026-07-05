import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

const ProblemSolutionSection = () => {
  const problems = [
    "Repeating product specs and pricing manually in chats",
    "Losing client orders in crowded WhatsApp thread histories",
    "Chasing and verifying unstructured bank transfers",
    "Manually compiling delivery and courier addresses"
  ];

  const solutions = [
    "Clean, professional digital catalog showcase",
    "Orders structured and sent directly to your WhatsApp",
    "Automated invoicing and integrated payment gateways",
    "Compiled customer details ready for courier dispatch"
  ];

  return (
    <section id="solution" className="section-padding relative overflow-hidden bg-[#FAFAFA] dark:bg-slate-900/10">
      <div className="section-number">02</div>
      <div className="aura-blob bg-primary/5 w-[500px] h-[500px] -left-24 bottom-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20" data-reveal>
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">The Transition</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-foreground leading-[1.1] tracking-tight max-w-3xl mx-auto font-heading">
            Stop Losing Customers to Messy WhatsApp DMs
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto font-medium">
            Start accepting orders 24/7, collect payments automatically, and grow your business beyond unstructured chat windows.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          
          {/* BEFORE: Friction */}
          <div className="glass-panel p-10 md:p-12 border-red-500/10 bg-white dark:bg-card shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col justify-between" data-reveal data-reveal-delay="1">
            <div className="absolute -top-10 -right-10 opacity-[0.02] rotate-12">
              <AlertCircle size={200} className="text-red-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-red-500/80 tracking-tight font-heading">
                <XCircle size={24} /> Before: Messy Chat Flow
              </h3>
              <ul className="space-y-6">
                {problems.map((p, i) => (
                  <li key={i} className="flex items-start gap-4 text-muted-foreground group">
                    <div className="w-2 h-2 rounded-full bg-red-400/30 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                    <span className="text-sm font-medium leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 pt-8 border-t border-border/50 text-xs text-muted-foreground/80 font-medium italic">
              Result: Lost interest, manual bottleneck, and slow scaling.
            </div>
          </div>

          {/* AFTER: Growth */}
          <div className="glass-panel p-10 md:p-12 border-primary/20 bg-[#FFF7ED]/30 dark:bg-orange-950/10 shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col justify-between" data-reveal data-reveal-delay="2">
             <div className="absolute -top-10 -right-10 opacity-[0.03] rotate-12 text-primary">
              <CheckCircle2 size={200} fill="currentColor" className="text-primary/10" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-primary tracking-tight font-heading">
                <CheckCircle2 size={24} /> After: Automated Store
              </h3>
              <ul className="space-y-6">
                {solutions.map((s, i) => (
                  <li key={i} className="flex items-start gap-4 group text-foreground">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                    <span className="text-sm font-bold leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-10 pt-8 border-t border-primary/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-sm font-bold text-foreground font-heading">Automate Your Operations</p>
                <p className="text-xs text-muted-foreground font-medium">We design the store, you capture the sales.</p>
              </div>
              <a href="#contact" className="btn-primary py-2.5 px-6 text-xs shadow-sm inline-flex items-center justify-center shrink-0">
                Build My Store
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
