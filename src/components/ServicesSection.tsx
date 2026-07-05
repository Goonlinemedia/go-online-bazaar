import { Building2, Book, GraduationCap, Heart, ShoppingBag, FileText, User, Calendar } from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Business Websites",
    description: "High-performance websites tailored for corporate presence, lead capture, and brand authority.",
  },
  {
    icon: Book,
    title: "Church Websites",
    description: "Fully-featured sermon players, upcoming ministry events directories, and integrated tithing portals.",
  },
  {
    icon: GraduationCap,
    title: "School Portals",
    description: "Robust admissions inquiry tracking, class timetables, event news, and portal logins integrations.",
  },
  {
    icon: Heart,
    title: "NGO Websites",
    description: "Polished templates showcasing community projects, volunteer sign-up channels, and donation checkouts.",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce Stores",
    description: "Dynamic storefronts with custom inventory cataloging, shopping carts, and Paystack payments.",
  },
  {
    icon: FileText,
    title: "Landing Pages",
    description: "Single-page layouts optimized for product launches, lead magnets, and targeted conversion campaigns.",
  },
  {
    icon: User,
    title: "Portfolio Websites",
    description: "Stunning visual showcases for creatives, consultants, and professionals looking to attract clients.",
  },
  {
    icon: Calendar,
    title: "Booking Websites",
    description: "Real-time calendar interfaces, appointment scheduling routing, and confirmation automation.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding relative overflow-hidden bg-transparent border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 inline-block">
            Services
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 font-heading tracking-tight">
            Website & Ecommerce Services
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed font-medium">
            We design, build, and configure digital systems that position your organization for growth.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-card p-8 rounded-3xl border border-border shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:-translate-y-[6px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-500 group flex flex-col h-full justify-between"
            >
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-accent text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                    <service.icon size={18} />
                  </div>
                  <span className="text-3xl font-bold text-foreground/5 group-hover:text-primary/10 transition-colors duration-500">0{idx + 1}</span>
                </div>
                <h3 className="text-base font-bold text-foreground mb-3 font-heading tracking-tight">
                  {service.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-medium mb-6">
                  {service.description}
                </p>
              </div>
              <a 
                href="#contact" 
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1 group/link mt-2"
              >
                Learn More <span className="group-hover/link:translate-x-1 transition-transform">&rarr;</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
