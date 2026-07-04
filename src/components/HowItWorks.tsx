import { Users, Code, Rocket } from "lucide-react";

const steps = [
  {
    icon: Users,
    title: "1. Discovery & Alignment",
    desc: "We discuss your brand's requirements, custom design options, and plan the ideal user experience.",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: Code,
    title: "2. Professional Build",
    desc: "Our team designs and builds your clean website, structures your product catalog, and integrates payment options.",
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    icon: Rocket,
    title: "3. Launch & Operations Support",
    desc: "We configure your custom domain, set up professional email, test order flows, and support your official launch.",
    color: "bg-primary/10 text-primary",
  },
];

const HowItWorks = () => {
  return (
    <section id="process" className="section-padding relative overflow-hidden bg-white">
      <div className="section-number">03</div>
      <div className="aura-blob bg-teal w-[600px] h-[600px] -left-32 -top-32 opacity-5" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24" data-reveal>
          <span className="text-sm font-black text-primary uppercase tracking-[0.2em] text-glow">The Workflow</span>
          <h2 className="mt-6 text-4xl md:text-6xl font-heading font-black text-foreground tracking-tighter leading-tight">
            How We Get You <span className="gradient-text italic">Online</span>
          </h2>
          <p className="mt-8 text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Simple, transparent, and completely handled by us.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-16 relative">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              data-reveal 
              data-reveal-delay={idx + 1}
              className="flex flex-col items-center text-center group relative"
            >
              <div className={`w-28 h-28 rounded-[2.5rem] ${step.color} flex items-center justify-center mb-10 shadow-2xl shadow-current/10 group-hover:scale-110 transition-transform duration-700 ring-[12px] ring-secondary/20`}>
                <step.icon className="w-14 h-14" />
              </div>
              <h3 className="text-2xl font-black mb-6 font-heading tracking-tight">{step.title}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed font-medium px-4">
                {step.desc}
              </p>
              
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-14 left-[calc(100%-2rem)] w-full h-px border-t-2 border-dashed border-primary/20 -z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
