import { useState } from "react";
import { ExternalLink, Building2, Book, GraduationCap, Heart, ShoppingBag } from "lucide-react";

type ProjectCategory = "All" | "Businesses" | "Churches" | "Schools" | "NGOs" | "E-commerce";

const categories: { name: ProjectCategory; icon: any }[] = [
  { name: "All", icon: null },
  { name: "Businesses", icon: Building2 },
  { name: "Churches", icon: Book },
  { name: "Schools", icon: GraduationCap },
  { name: "NGOs", icon: Heart },
  { name: "E-commerce", icon: ShoppingBag },
];

const projects = [
  {
    name: "Meshach Photography",
    category: "Businesses",
    tag: "Photography Portfolio",
    image: "/photography-cover.webp",
    fallbackBg: "from-slate-800 to-zinc-950",
    link: "https://mesh-photography.vercel.app/",
    description: "A premium visual portfolio for bookings, galleries, and client inquiries.",
    tech: ["React", "Tailwind CSS", "Vercel"],
    outcome: "Established high-end digital booking portal and gallery."
  },
  {
    name: "GoOnline Estates",
    category: "Businesses",
    tag: "Real Estate Showcase",
    image: "/estate-cover.webp",
    fallbackBg: "from-blue-900 to-slate-900",
    link: "https://goonline-estate.vercel.app/",
    description: "An elegant property listings directory with automated communication channels.",
    tech: ["TypeScript", "Tailwind CSS", "Inquiry Forms"],
    outcome: "Automated property listings directory leading to 3x user inquiry capture."
  },
  {
    name: "PrintHub",
    category: "Businesses",
    tag: "Branding & Print Hub",
    image: "/printhub-cover.webp",
    fallbackBg: "from-amber-700 to-slate-900",
    link: "https://print-powerhouse-hub.vercel.app/",
    description: "A clean corporate template and custom catalog configuration portal.",
    tech: ["HTML5", "Vite", "Vanilla CSS"],
    outcome: "Seamless corporate templates & custom catalog download sync."
  },
  {
    name: "Youth On Fire",
    category: "NGOs",
    tag: "Youth Community Platform",
    image: "/youth-fire-cover.webp",
    fallbackBg: "from-orange-700 to-red-950",
    link: "https://vibrant-youth-link.vercel.app/",
    description: "A high-performance community portal for events, calendars, and digital resources.",
    tech: ["React", "Tailwind CSS", "Event Calendars"],
    outcome: "Active community portal for event planning and resources download."
  },
  {
    name: "Bitswitch Portal",
    category: "Businesses",
    tag: "Crypto Support Portal",
    image: "/bitswitch-cover.webp",
    fallbackBg: "from-purple-900 to-slate-900",
    link: "https://bitswitch.vercel.app/",
    description: "A corporate landing page detailing transaction workflows and customer service routes.",
    tech: ["TypeScript", "CSS", "API Integrations"],
    outcome: "High-performance landing page outlining secure transaction routes."
  },
];

const VendorSpotlights = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");

  const filteredProjects = projects.filter(
    (p) => selectedCategory === "All" || p.category === selectedCategory
  );

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-transparent relative overflow-hidden border-b border-border/50">
      <div className="section-number" aria-hidden="true">05</div>
      <div className="aura-blob bg-primary w-[500px] h-[500px] -right-24 bottom-0 opacity-[0.02]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-8" data-reveal>
          <div>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Portfolio</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-heading font-bold text-foreground tracking-tight leading-tight">
              Recent Projects
            </h2>
            <p className="mt-4 text-base text-muted-foreground max-w-xl font-medium">
              See how we help organizations design clean digital solutions that increase credibility and streamline operations.
            </p>
          </div>
          <div className="flex flex-col items-start lg:items-end gap-2 shrink-0">
            <a href="/contact" className="btn-primary text-sm px-6 py-3.5 shadow-sm">
              Start a Project
            </a>
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-border pb-6 overflow-x-auto whitespace-nowrap" data-reveal>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4.5 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-2 border ${
                selectedCategory === cat.name
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "bg-card text-muted-foreground hover:text-primary hover:border-primary/30 border-border"
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
                className="group bg-card rounded-3xl border border-border shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:-translate-y-[6px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-500 flex flex-col h-full overflow-hidden"
              >
                {/* Safari Browser Mockup Frame */}
                <div className="bg-[#1E293B] border-b border-[#334155]/60 px-4 py-2.5 flex items-center justify-between shrink-0 select-none">
                  <div className="flex gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                  </div>
                  <div className="w-32 bg-[#0F172A] rounded py-0.5 text-[6px] text-slate-400 font-mono text-center tracking-tight border border-slate-800/40 truncate">
                    goonline.agency/{p.name.toLowerCase().replace(/\s/g, "-")}
                  </div>
                  <div className="w-3" />
                </div>

                {/* Screenshot / Falling gradient */}
                <div className="h-52 relative overflow-hidden bg-slate-950 shrink-0">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    width={400}
                    height={208}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        const div = document.createElement('div');
                        div.className = `w-full h-full bg-gradient-to-br ${p.fallbackBg} flex items-center justify-center p-6 text-center text-white font-heading font-bold text-base tracking-tight`;
                        div.innerText = p.name;
                        parent.appendChild(div);
                      }
                    }}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-[#0F172A]/10 group-hover:bg-[#0F172A]/5 transition-colors duration-500" />
                  <div className="absolute bottom-4 left-4 z-10">
                    <span className="text-[9px] font-bold bg-[#FCFCFD]/95 dark:bg-[#0F172A]/95 shadow-md text-foreground px-3 py-1.5 rounded-full uppercase tracking-wider border border-border/30">
                      {p.tag}
                    </span>
                  </div>
                </div>

                {/* Details area */}
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold font-heading text-foreground tracking-tight">{p.name}</h3>
                      {isClickable && (
                        <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                          <ExternalLink size={12} className="text-muted-foreground group-hover:text-white transition-colors" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                      {p.description}
                    </p>
                    
                    {/* Tech stacks */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {p.tech.map((t) => (
                        <span key={t} className="text-[9px] font-semibold bg-secondary text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Outcome */}
                  <div className="mt-6 pt-4 border-t border-border text-[10px] font-semibold text-primary flex flex-col gap-1">
                    <span className="text-muted-foreground uppercase text-[8px] tracking-wider leading-none">Outcome:</span>
                    <span className="text-foreground leading-normal">{p.outcome}</span>
                  </div>
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
