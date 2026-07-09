import { Building2, BookOpen, GraduationCap, Heart, ShoppingCart, Check } from "lucide-react";

const industries = [
  {
    icon: Building2,
    title: "For Businesses",
    desc: "Grow your brand, generate leads, and establish instant corporate credibility.",
    features: ["Corporate Landing Pages", "Lead Generation Forms", "Service Catalog Showcases", "SEO & Business Email Mapping"],
    bgColor: "bg-blue-500/5 text-blue-600 dark:bg-blue-500/10",
  },
  {
    icon: BookOpen,
    title: "For Churches",
    desc: "Share sermons, list events, accept online giving, and update your community.",
    features: ["Sermon Media Player", "Online Giving & Tithes", "Upcoming Events Calendar", "Ministry Group Pages"],
    bgColor: "bg-amber-500/5 text-amber-600 dark:bg-amber-500/10",
  },
  {
    icon: GraduationCap,
    title: "For Schools",
    desc: "Manage admissions, announcements, resources, and student information portals.",
    features: ["Admissions Inquiry Forms", "News & Event Announcements", "Parent Resources Download", "Student Portal Routing"],
    bgColor: "bg-indigo-500/5 text-indigo-600 dark:bg-indigo-500/10",
  },
  {
    icon: Heart,
    title: "For NGOs",
    desc: "Highlight your mission, showcase community impact, and collect secure donations.",
    features: ["Secure Donation Checkouts", "Project Impact Showcases", "Volunteer Sign-up Forms", "Interactive Story Pages"],
    bgColor: "bg-rose-500/5 text-rose-600 dark:bg-rose-500/10",
  },
  {
    icon: ShoppingCart,
    title: "For E-commerce",
    desc: "Sell products online with integrated payments, inventory sync, and order capturing.",
    features: ["Product Catalog Database", "Integrated Paystack Checkouts", "Automated Invoice Compilations", "Fulfillment Courier Mapping"],
    bgColor: "bg-emerald-500/5 text-emerald-600 dark:bg-emerald-500/10",
  },
];

const IndustrySections = () => {
  return (
    <section id="industries" className="py-24 md:py-32 bg-white dark:bg-card border-b border-border/50 relative overflow-hidden">
      <div className="section-number" aria-hidden="true">03</div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20" data-reveal>
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Industries We Serve</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight font-heading">
            Websites Designed to Build Trust and Drive Growth
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto font-medium">
            We design and build modern websites and custom portals tailored for specific operational workflows.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((ind, i) => (
            <div
              key={ind.title}
              data-reveal
              data-reveal-delay={i + 1}
              className="bg-card dark:bg-background p-8 rounded-3xl border border-border shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:-translate-y-[6px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl ${ind.bgColor} flex items-center justify-center mb-6 shrink-0`}>
                  <ind.icon size={22} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 font-heading tracking-tight">
                  {ind.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6 font-medium">
                  {ind.desc}
                </p>
                <ul className="space-y-3 mb-8 border-t border-border/50 pt-6">
                  {ind.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-xs text-foreground font-semibold">
                      <Check size={12} className="text-primary shrink-0 stroke-[3px]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a 
                href="/contact" 
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

export default IndustrySections;
