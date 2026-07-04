import { Truck, CheckSquare, MessageSquare, Database } from "lucide-react";

const operations = [
  {
    icon: Database,
    title: "Product Display & Cataloging",
    desc: "Organize digital catalogs with clear categories and live specifications.",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: CheckSquare,
    title: "Order Capture & Routing",
    desc: "Seamless checkout capture routing client orders straight to your team.",
    color: "bg-indigo-500/10 text-indigo-600",
  },
  {
    icon: MessageSquare,
    title: "Inquiry Management",
    desc: "Structured messaging pipelines to eliminate manual support lag.",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: Truck,
    title: "Delivery & Fulfillment Sync",
    desc: "Automated customer address compilation for rapid courier dispatch.",
    color: "bg-purple-500/10 text-purple-600",
  },
];

const SupplyChainSection = () => {
  return (
    <section id="operations" className="section-padding relative overflow-hidden bg-secondary/10">
      {/* Subtle details */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="text-sm font-bold text-primary uppercase tracking-[0.2em] bg-primary/5 px-4 py-2 rounded-full mb-6 inline-block">
            Commerce Operations
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 font-heading tracking-tight leading-tight">
            Helping Small Businesses <br className="hidden md:block"/>
            <span className="gradient-text italic">Move Products Faster</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
            We equip growing brands with digital infrastructure to showcase inventory, route orders, structure inquiries, and simplify delivery logistics.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {operations.map((op, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-background p-8 rounded-3xl border border-gray-100 dark:border-border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full"
            >
              <div className={`w-14 h-14 rounded-2xl ${op.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                <op.icon size={26} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4 font-heading tracking-tight">
                {op.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm font-medium">
                {op.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupplyChainSection;
