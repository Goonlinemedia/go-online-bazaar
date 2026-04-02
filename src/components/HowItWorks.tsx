import { MousePointer2, Settings2, Rocket } from "lucide-react";

const steps = [
  {
    icon: MousePointer2,
    title: "1. Create Your Store",
    desc: "Sign up and get your store ready instantly. No tech skills needed.",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: Settings2,
    title: "2. Add Products",
    desc: "Upload pictures, prices, and descriptions. Manage everything from your phone.",
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    icon: Rocket,
    title: "3. Start Receiving Orders",
    desc: "Customers order directly to your WhatsApp. Close sales instantly in your DM.",
    color: "bg-primary/10 text-primary",
  },
];

const HowItWorks = () => {
  return (
    <section id="process" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="text-sm font-bold text-primary uppercase tracking-widest bg-primary/5 px-4 py-2 rounded-full">Process</span>
          <h2 className="mt-6 text-3xl md:text-5xl font-black text-foreground font-heading tracking-tight">
            How We Get You <span className="text-primary">Online</span>
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple, transparent, and completely handled by us.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-dashed border-t-2 border-dashed border-gray-100 -z-10" />
          
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl md:rounded-[2rem] ${step.color} flex items-center justify-center mb-6 md:mb-8 shadow-xl shadow-current/5 group-hover:scale-110 transition-transform duration-500 ring-4 md:ring-8 ring-white`}>
                <step.icon className="w-10 h-10 md:w-12 md:h-12" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 font-heading">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
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
