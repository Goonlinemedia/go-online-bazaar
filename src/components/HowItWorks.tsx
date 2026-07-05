import { PhoneCall, PenTool, Code, Rocket } from "lucide-react";

const steps = [
  {
    icon: PhoneCall,
    title: "1. Discovery Call",
    desc: "We discuss your goals, page counts, features, integrations, and visual layout preferences.",
  },
  {
    icon: PenTool,
    title: "2. Design & Planning",
    desc: "We design custom layout wireframes and organize database structures for your validation.",
  },
  {
    icon: Code,
    title: "3. Development",
    desc: "We handcraft responsive code, integrate payment checkouts, and build administrative dashboards.",
  },
  {
    icon: Rocket,
    title: "4. Launch & Support",
    desc: "We configure secure hosting, point custom domains, set up emails, and provide priority maintenance.",
  },
];

const HowItWorks = () => {
  return (
    <section id="process" className="py-24 md:py-32 relative overflow-hidden bg-transparent border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20" data-reveal>
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">
            Process
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight font-heading">
            Our Process
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto font-medium">
            A structured, collaborative approach to delivering your digital flagship.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              data-reveal 
              data-reveal-delay={idx + 1}
              className="flex flex-col items-center text-center group relative bg-card p-8 rounded-3xl border border-border shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:-translate-y-[6px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent text-primary flex items-center justify-center mb-6 shrink-0 group-hover:scale-105 transition-transform duration-300">
                <step.icon size={22} />
              </div>
              <h3 className="text-base font-bold mb-3 font-heading tracking-tight">{step.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
