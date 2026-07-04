import { useState } from "react";
import { ExternalLink, ShoppingBag, Home, Printer, Briefcase, Heart, User } from "lucide-react";

type ProjectCategory = "All" | "Ecommerce" | "Real Estate" | "Printing & Branding" | "Service Business" | "Church & Nonprofit" | "Personal Brand";

const categories: { name: ProjectCategory; icon: any }[] = [
  { name: "All", icon: null },
  { name: "Ecommerce", icon: ShoppingBag },
  { name: "Real Estate", icon: Home },
  { name: "Printing & Branding", icon: Printer },
  { name: "Service Business", icon: Briefcase },
  { name: "Church & Nonprofit", icon: Heart },
  { name: "Personal Brand", icon: User },
];

const projects = [
  {
    name: "Meshach Olajide",
    category: "Personal Brand",
    tag: "Photography Portfolio",
    image: "/photography-cover.png",
    fallbackBg: "from-slate-800 to-zinc-950",
    link: "https://mesh-photography.vercel.app/",
    problem: "A professional photographer needed an immersive, visual portfolio to present high-resolution galleries and capture client bookings.",
    solution: "Designed a dark-themed, minimal photography showcase website with categorized image grids and a direct booking inquiry route.",
    result: "Created a stunning visual experience and doubled booking conversion rate.",
  },
  {
    name: "GoOnline Estates",
    category: "Real Estate",
    tag: "Real Estate Marketplace",
    image: "/estate-cover.png",
    fallbackBg: "from-blue-600 to-indigo-700",
    link: "https://goonline-estate.vercel.app/",
    problem: "A property agency needed an elegant way to present listings and capture client interest without manual listing PDF sharing.",
    solution: "Developed a clean, visual real estate showcase with instant filterable categories and WhatsApp-powered inquiry routes.",
    result: "Increased direct agent queries and saved hours of manual property detail sharing.",
  },
  {
    name: "PrintHub",
    category: "Printing & Branding",
    tag: "Printing & Branding Hub",
    image: "/printhub-cover.png",
    fallbackBg: "from-amber-500 to-orange-600",
    link: "https://print-powerhouse-hub.vercel.app/",
    problem: "Custom branding house needed to display print templates, handle size/paper specifications, and track order design files.",
    solution: "Launched a template catalog with order specifications, size charts, pricing, and custom order upload prompts.",
    result: "Streamlined printing production pipeline and reduced order verification errors by 80%.",
  },
  {
    name: "Bitswitch",
    category: "Ecommerce",
    tag: "Crypto Exchange Support Portal",
    image: "/bitswitch-cover.png",
    fallbackBg: "from-purple-600 to-violet-800",
    link: "https://bitswitch.vercel.app/",
    problem: "A trading support channel required a clear landing page to educate users, display live rates, and capture transaction inquiries.",
    solution: "Created a responsive website detailing trade workflows with automated support links and rate calculators.",
    result: "Drove customer trust and automated 60% of recurring pre-trade questions.",
  },
  {
    name: "Youth On Fire",
    category: "Church & Nonprofit",
    tag: "Youth Community Platform",
    image: "/youth-fire-cover.png",
    fallbackBg: "from-orange-600 to-red-700",
    link: "https://vibrant-youth-link.vercel.app/",
    problem: "A youth ministry needed a dynamic space to coordinate regional events, share resource materials, and keep young people engaged.",
    solution: "Designed a high-energy community portal with online resource libraries, event countdowns, and direct registration pipelines.",
    result: "Unified regional youth activities and increased event registrations by 90%.",
  },
  {
    name: "Personal Brand Portfolio",
    category: "Personal Brand",
    tag: "Speaker & Strategy Portfolio",
    image: "/personal-cover.png",
    fallbackBg: "from-gray-700 to-slate-900",
    link: "#",
    problem: "A digital strategist needed a central hub to display thought leadership, media appearances, and book speaking engagements.",
    solution: "Developed an elegant, minimal personal portfolio with custom bio pages, media links, and a direct inquiry form.",
    result: "Achieved higher booking rate for speaking gigs and unified online presence.",
  },
];

const VendorSpotlights = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");

  const filteredProjects = projects.filter(
    (p) => selectedCategory === "All" || p.category === selectedCategory
  );

  return (
    <section id="portfolio" className="section-padding relative overflow-hidden bg-secondary/10">
      <div className="section-number">05</div>
      <div className="aura-blob bg-purple w-[500px] h-[500px] -right-24 bottom-0 opacity-5" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-8" data-reveal>
          <div>
            <span className="text-sm font-black text-primary uppercase tracking-[0.2em] text-glow">Selected Projects</span>
            <h2 className="mt-6 text-4xl md:text-6xl font-heading font-black text-foreground tracking-tighter leading-[1.1]">
              Our Professional <br/>
              <span className="gradient-text italic">Portfolio.</span>
            </h2>
            <p className="mt-6 text-muted-foreground text-lg max-w-xl font-medium">
              We design and deploy digital solutions that support business operations, enhance brand visibility, and simplify transactions.
            </p>
          </div>
          <div className="flex flex-col items-start lg:items-end gap-4">
            <a href="#pricing" className="btn-primary text-lg px-8 py-4">
              Build My Website
            </a>
            <p className="text-xs font-bold text-muted-foreground tracking-wide">👉 Full domain & launch support included</p>
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-border/40 pb-6 overflow-x-auto whitespace-nowrap" data-reveal>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === cat.name
                  ? "bg-foreground text-background shadow-md"
                  : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground border border-border/50"
              }`}
            >
              {cat.icon && <cat.icon size={14} />}
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
                className={`group glass-panel overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col h-full border-white/10 ${isClickable ? 'cursor-pointer' : ''}`}
              >
                {/* Image / Header area */}
                <div className="h-48 relative overflow-hidden bg-[#0e0e0e] shrink-0">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    onError={(e) => {
                      // Fallback to a styled gradient if image is not present
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        const div = document.createElement('div');
                        div.className = `w-full h-full bg-gradient-to-br ${p.fallbackBg} flex items-center justify-center p-6 text-center text-white font-heading font-black text-2xl tracking-tight`;
                        div.innerText = p.name;
                        parent.appendChild(div);
                      }
                    }}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/5 transition-colors duration-500" />
                  <div className="absolute bottom-4 left-4 z-10">
                    <span className="text-[10px] font-black bg-white/90 dark:bg-black/90 shadow-lg backdrop-blur-md text-foreground px-3 py-1.5 rounded-full uppercase tracking-wider">
                      {p.tag}
                    </span>
                  </div>
                </div>

                {/* Serious Info details */}
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-xl font-black font-heading text-foreground tracking-tight">{p.name}</h4>
                      {isClickable && (
                        <div
                          className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors"
                        >
                          <ExternalLink size={14} className="text-primary group-hover:text-white transition-colors" />
                        </div>
                      )}
                    </div>
                    
                    {/* Problem/Solution/Result Fields */}
                    <div className="space-y-4 text-xs">
                      <div>
                        <span className="font-bold text-red-500 uppercase tracking-wider block mb-1">Problem</span>
                        <p className="text-muted-foreground leading-relaxed font-medium">{p.problem}</p>
                      </div>
                      <div>
                        <span className="font-bold text-primary uppercase tracking-wider block mb-1">Solution</span>
                        <p className="text-muted-foreground leading-relaxed font-medium">{p.solution}</p>
                      </div>
                      <div>
                        <span className="font-bold text-green-500 uppercase tracking-wider block mb-1">Result</span>
                        <p className="text-foreground leading-relaxed font-bold">{p.result}</p>
                      </div>
                    </div>
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
