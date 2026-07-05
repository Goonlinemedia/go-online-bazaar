import { Globe, ShoppingBag, MessageCircle, TrendingUp } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Brand Websites",
    description:
      "High-performance websites tailored for corporate presence, personal portfolios, and organizations.",
  },
  {
    icon: ShoppingBag,
    title: "Ecommerce Stores",
    description:
      "Custom storefronts with visual catalog display, digital checkouts, and payment integrations.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Commerce",
    description:
      "Direct checkout flows routing product queries and orders straight to messaging channels.",
  },
  {
    icon: TrendingUp,
    title: "Business Growth Setup",
    description:
      "Professional business email setup, domain registration, basic SEO, and analytics mapping.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-white dark:bg-background relative overflow-hidden border-b border-border/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 inline-block">
            Services
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 font-heading tracking-tight">
            Website & Ecommerce Services
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed font-medium">
            We design, build, and configure digital commerce frameworks that position your brand for growth.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-background p-8 rounded-2xl border border-border/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group flex flex-col h-full"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <service.icon size={18} />
                </div>
                <span className="text-3xl font-bold text-foreground/5 group-hover:text-primary/10 transition-colors duration-500">0{idx + 1}</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-4 font-heading tracking-tight">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm font-medium">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
