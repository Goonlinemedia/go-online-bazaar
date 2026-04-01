import { ExternalLink } from "lucide-react";

const vendors = [
  { name: "Wicked Stylist", tag: "Fashion", gradient: "from-teal to-teal-light" },
  { name: "Luscents", tag: "Fragrances", gradient: "from-accent to-purple" },
  { name: "Zack Stylist", tag: "Men's Wear", gradient: "from-teal-dark to-teal" },
  { name: "Labelle Outright", tag: "Beauty", gradient: "from-purple to-accent" },
];

const VendorSpotlights = () => (
  <section id="vendors" className="section-padding">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
        <div>
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Spotlights</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-heading font-bold text-foreground">
            Merchants thriving with <span className="gradient-text">Go Online</span>
          </h2>
        </div>
        <a href="#" className="btn-outline text-sm shrink-0 inline-flex items-center gap-2 self-start sm:self-auto">
          See All Stores <ExternalLink size={14} />
        </a>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {vendors.map((v) => (
          <div
            key={v.name}
            className="group glass-card overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className={`h-40 bg-gradient-to-br ${v.gradient} relative overflow-hidden`}>
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
              <div className="absolute bottom-3 left-3">
                <span className="text-xs font-medium bg-background/80 backdrop-blur-sm text-foreground px-3 py-1 rounded-full">
                  {v.tag}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-heading font-bold text-foreground">{v.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default VendorSpotlights;
