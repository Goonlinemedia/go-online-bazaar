import { ExternalLink } from "lucide-react";

const vendors = [
  { name: "Bitswitch", tag: "Crypto Trading Platform", image: "/bitswitch-cover.png", link: "https://bitswitch.vercel.app/" },
  { name: "GoOnline Estates", tag: "Real Estate Marketplace", image: "/estate-cover.png", link: "https://goonline-estate.vercel.app/" },
  { name: "PrintHub", tag: "Printing & Branding", image: "/printhub-cover.png", link: "https://print-powerhouse-hub.vercel.app/" },
];

const VendorSpotlights = () => (
  <section id="portfolio" className="section-padding relative overflow-hidden bg-secondary/10">
    <div className="section-number">05</div>
    <div className="aura-blob bg-purple w-[500px] h-[500px] -right-24 bottom-0 opacity-5" />

    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-20 gap-8" data-reveal>
        <div>
          <span className="text-sm font-black text-primary uppercase tracking-[0.2em] text-glow">Portfolio</span>
          <h2 className="mt-6 text-4xl md:text-6xl font-heading font-black text-foreground tracking-tighter leading-[1.1]">
            Trusted by <br/>
            <span className="gradient-text italic">Growing Businesses.</span>
          </h2>
          <p className="mt-8 text-muted-foreground text-xl max-w-xl font-medium italic">
            "Your store doesn't just look pretty—it's built to sell directly on WhatsApp."
          </p>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-6">
          <a href="#pricing" className="btn-primary text-lg px-8 py-4">
            Get My Store Live
          </a>
          <p className="text-sm font-bold text-muted-foreground tracking-wide">👉 No tech skills required</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {vendors.map((v, i) => (
          <a
            key={v.name}
            href={v.link}
            target={v.link !== "#" ? "_blank" : "_self"}
            rel="noopener noreferrer"
            data-reveal
            data-reveal-delay={(i % 3) + 1}
            className="group glass-panel overflow-hidden hover:-translate-y-3 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 cursor-pointer block border-white/10"
          >
            <div className="h-60 relative overflow-hidden bg-[#0e0e0e]">
              {v.image && (
                <img 
                  src={v.image} 
                  alt={v.name} 
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
                />
              )}
              <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/5 transition-colors duration-500" />
              <div className="absolute bottom-5 left-5 z-10">
                <span className="text-xs font-black bg-white/90 dark:bg-black/90 shadow-2xl backdrop-blur-md text-foreground px-4 py-2 rounded-full uppercase tracking-wider">
                  {v.tag}
                </span>
              </div>
            </div>
            <div className="p-8 flex items-center justify-between">
              <h4 className="text-2xl font-black font-heading text-foreground tracking-tight">{v.name}</h4>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0">
                <ExternalLink size={18} className="text-primary" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default VendorSpotlights;
