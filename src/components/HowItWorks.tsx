import { Users, Code, Rocket } from "lucide-react";

const steps = [
  {
    icon: Users,
    title: "Discovery & Alignment",
    desc: "We define your website's layout options, page requirements, and operational goals.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Code,
    title: "Professional Build",
    desc: "We design premium interfaces, structure product catalogs, and map checkout flows.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Rocket,
    title: "Launch & Support",
    desc: "We configure custom domains, set up business emails, and test order pipelines.",
    color: "bg-primary/10 text-primary",
  },
];

const HowItWorks = () => {
  return (
    <section id="process" className="py-20 relative overflow-hidden bg-white dark:bg-background border-b border-border/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16" data-reveal>
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 inline-block">
            Process
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
            Our Process
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto font-medium">
            A structured, collaborative approach to delivering your digital flagship.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              data-reveal 
              data-reveal-delay={idx + 1}
              className="flex flex-col items-center text-center group relative bg-background p-8 rounded-2xl border border-border"
            >
              <div className={`w-16 h-16 rounded-xl ${step.color} flex items-center justify-center mb-6`}>
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold mb-3 font-heading tracking-tight">{step.title}</h3>
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
