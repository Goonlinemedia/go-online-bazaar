import { useState } from "react";
import { ExternalLink, ShoppingBag, Home, Printer, Briefcase, Heart, User } from "lucide-react";

type ProjectCategory = "All" | "Ecommerce" | "Real Estate" | "Branding" | "Personal Brands" | "Nonprofits" | "Service Businesses";

const categories: { name: ProjectCategory; icon: any }[] = [
  { name: "All", icon: null },
  { name: "Ecommerce", icon: ShoppingBag },
  { name: "Real Estate", icon: Home },
  { name: "Branding", icon: Printer },
  { name: "Personal Brands", icon: User },
  { name: "Nonprofits", icon: Heart },
  { name: "Service Businesses", icon: Briefcase },
];

const projects = [
  {
    name: "Meshach Photography",
    category: "Personal Brands",
    tag: "Photography Portfolio",
    image: "/photography-cover.png",
    fallbackBg: "from-slate-800 to-zinc-950",
    link: "https://mesh-photography.vercel.app/",
    description: "A premium visual portfolio for bookings, galleries, and client inquiries.",
  },
  {
    name: "GoOnline Estates",
    category: "Real Estate",
    tag: "Real Estate Showcase",
    image: "/estate-cover.png",
    fallbackBg: "from-blue-900 to-slate-900",
    link: "https://goonline-estate.vercel.app/",
    description: "An elegant property listings directory with automated communication channels.",
  },
  {
    name: "PrintHub",
    category: "Branding",
    tag: "Branding & Print Hub",
    image: "/printhub-cover.png",
    fallbackBg: "from-amber-700 to-slate-900",
    link: "https://print-powerhouse-hub.vercel.app/",
    description: "A clean corporate template and custom catalog configuration portal.",
  },
  {
    name: "Youth On Fire",
    category: "Nonprofits",
    tag: "Youth Community Platform",
    image: "/youth-fire-cover.png",
    fallbackBg: "from-orange-700 to-red-950",
    link: "https://vibrant-youth-link.vercel.app/",
    description: "A high-performance community portal for events, calendars, and digital resources.",
  },
  {
    name: "Bitswitch Portal",
    category: "Service Businesses",
    tag: "Crypto Support Portal",
    image: "/bitswitch-cover.png",
    fallbackBg: "from-purple-900 to-slate-900",
    link: "https://bitswitch.vercel.app/",
    description: "A corporate landing page detailing transaction workflows and customer service routes.",
  },
];

const VendorSpotlights = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");

  const filteredProjects = projects.filter(
    (p) => selectedCategory === "All" || p.category === selectedCategory
  );

  return (
    <section id="portfolio" className="section-padding relative overflow-hidden bg-secondary/15">
      <div className="section-number">02</div>
      <div className="aura-blob bg-primary w-[500px] h-[500px] -right-24 bottom-0 opacity-[0.03]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-8" data-reveal>
          <div>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Portfolio</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-heading font-bold text-foreground tracking-tight leading-tight">
              Selected Work
            </h2>
            <p className="mt-4 text-muted-foreground text-base max-w-xl font-medium">
              We design and deploy high-performance digital solutions that support brand operations, showcase portfolios, and capture engagements.
            </p>
          </div>
          <div className="flex flex-col items-start lg:items-end gap-2">
            <a href="#contact" className="btn-primary text-sm px-6 py-3">
              Start a Project
            </a>
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-border/40 pb-6 overflow-x-auto whitespace-nowrap" data-reveal>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-2 border ${
                selectedCategory === cat.name
                  ? "bg-foreground text-background border-foreground shadow-sm"
                  : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground border-border/50"
              }`}
            >
              {cat.icon && <cat.icon size={12} />}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((p, i) => {
            const isClickable = p.link !== "#";
            const CardWrapper = (isClickable ? "a" : "div") as any;
            
            return (
              <CardWrapper
                key={p.name}
                href={isClickable ? p.link : undefined}
                target={isClickable ? "_blank" : undefined}
                rel={isClickable ? "noopener noreferrer" : undefined}
                data-reveal
                data-reveal-delay={(i % 3) + 1}
                className={`group glass-panel overflow-hidden hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col h-full border-border/40 bg-background ${isClickable ? 'cursor-pointer' : ''}`}
              >
                {/* Image area */}
                <div className="h-52 relative overflow-hidden bg-slate-950 shrink-0">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        const div = document.createElement('div');
                        div.className = `w-full h-full bg-gradient-to-br ${p.fallbackBg} flex items-center justify-center p-6 text-center text-white font-heading font-bold text-lg tracking-tight`;
                        div.innerText = p.name;
                        parent.appendChild(div);
                      }
                    }}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/5 transition-colors duration-500" />
                  <div className="absolute bottom-4 left-4 z-10">
                    <span className="text-[9px] font-bold bg-white/95 dark:bg-black/95 shadow-md text-foreground px-3 py-1.5 rounded-full uppercase tracking-wider border border-border/30">
                      {p.tag}
                    </span>
                  </div>
                </div>

                {/* Details area */}
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-bold font-heading text-foreground tracking-tight">{p.name}</h4>
                      {isClickable && (
                        <div
                          className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors"
                        >
                          <ExternalLink size={12} className="text-muted-foreground group-hover:text-white transition-colors" />
                        </div>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                  
                  {isClickable && (
                    <div className="mt-6 pt-4 border-t border-border/50 text-xs font-bold text-primary flex items-center gap-1.5 group-hover:translate-x-1.5 transition-transform duration-300">
                      View Project <ExternalLink size={10} />
                    </div>
                  )}
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VendorSpotlights;
