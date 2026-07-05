import { Truck, CheckSquare, MessageSquare, Database } from "lucide-react";

const operations = [
  {
    icon: Database,
    title: "Product Display & Cataloging",
    desc: "Organize digital catalogs with clear categories and live specifications.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: CheckSquare,
    title: "Order Capture & Routing",
    desc: "Seamless checkout capture routing client orders straight to your team.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: MessageSquare,
    title: "Inquiry Management",
    desc: "Structured messaging pipelines to eliminate manual support lag.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Truck,
    title: "Delivery & Fulfillment Sync",
    desc: "Automated customer address compilation for rapid courier dispatch.",
    color: "bg-primary/10 text-primary",
  },
];

const SupplyChainSection = () => {
  return (
    <section id="operations" className="py-24 md:py-32 bg-transparent relative overflow-hidden border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 inline-block">
            Ecommerce & Operations
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 font-heading tracking-tight leading-tight">
            Built for Commerce Operations
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed font-medium">
            We equip growing brands with digital infrastructure to showcase inventory, route orders, structure inquiries, and simplify delivery logistics.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {operations.map((op, idx) => (
            <div
              key={idx}
              className="bg-card p-8 rounded-3xl border border-border shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:-translate-y-[6px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-500 group flex flex-col h-full"
            >
              <div className={`w-10 h-10 rounded-xl ${op.color} flex items-center justify-center mb-6`}>
                <op.icon size={18} />
              </div>
              <h3 className="text-base font-bold text-foreground mb-3 font-heading tracking-tight">
                {op.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-xs font-medium">
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
