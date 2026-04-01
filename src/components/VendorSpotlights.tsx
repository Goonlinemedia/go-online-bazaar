import { ExternalLink } from "lucide-react";

const vendors = [
  { name: "PrintHub", tag: "Printing & Branding", image: "/printhub-cover.png", link: "https://print-powerhouse-hub.vercel.app/" },
  { name: "Wicked Stylist", tag: "Fashion", gradient: "from-teal to-teal-light", link: "#" },
  { name: "Luscents", tag: "Fragrances", gradient: "from-accent to-purple", link: "#" },
  { name: "Zack Stylist", tag: "Men's Wear", gradient: "from-teal-dark to-teal", link: "#" },
];

const VendorSpotlights = () => (
  <section id="portfolio" className="section-padding bg-secondary/10">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-6">
        <div>
          <span className="text-sm font-bold text-primary uppercase tracking-widest bg-primary/5 px-4 py-2 rounded-full">Portfolio</span>
          <h2 className="mt-6 text-3xl md:text-5xl font-black font-heading text-foreground tracking-tight leading-tight">
            Trusted by <br/>
            <span className="gradient-text">Growing Businesses.</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl italic">
            "Your store doesn't just look pretty—it's built to sell directly on WhatsApp."
          </p>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-4">
          <a href="#pricing" className="btn-primary text-sm shadow-lg shadow-primary/20 hover:shadow-xl transition-all">
            Get My Store Live
          </a>
          <p className="text-xs text-muted-foreground">👉 No tech skills required</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {vendors.map((v) => (
          <a
            key={v.name}
            href={v.link}
            target={v.link !== "#" ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="group glass-card overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer block"
          >
            <div className={`h-40 relative overflow-hidden ${v.image ? 'bg-[#151515]' : `bg-gradient-to-br ${v.gradient}`}`}>
              {v.image && (
                <img 
                  src={v.image} 
                  alt={v.name} 
                  className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                />
              )}
              <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/20 transition-colors" />
              <div className="absolute bottom-3 left-3 z-10">
                <span className="text-xs font-medium bg-background/90 shadow-sm backdrop-blur-sm text-foreground px-3 py-1 rounded-full">
                  {v.tag}
                </span>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <h4 className="font-heading font-bold text-foreground">{v.name}</h4>
              <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default VendorSpotlights;
