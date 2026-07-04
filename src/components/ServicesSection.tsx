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
    <section id="services" className="py-24 bg-white dark:bg-background relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="text-sm font-bold text-primary uppercase tracking-widest bg-primary/5 px-4 py-2 rounded-full mb-6 inline-block">Our Solutions</span>
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-8 font-heading tracking-tight">
            Services <span className="gradient-text italic">We Offer</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
            We design, build, and configure complete digital solutions that elevate your brand and optimize your sales process.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-[#fafafa] dark:bg-secondary/20 p-10 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full"
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <service.icon size={22} />
                </div>
                <span className="text-4xl font-black text-foreground/5 group-hover:text-primary/10 transition-colors duration-500">0{idx + 1}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-6 font-heading tracking-tight">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm font-medium">
                {service.description}
              </p>
              <div className="mt-auto pt-8 flex items-center gap-2 text-primary font-bold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 text-sm">
                <span>Enquire now</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
