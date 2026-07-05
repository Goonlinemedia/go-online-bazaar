import { Star } from "lucide-react";

const TrustSection = () => {
  const logos = [
    "Youth On Fire Ministries",
    "Meshach Photography",
    "Print Hub",
    "GoOnline Estate"
  ];

  // Repeat the logos list to make sure it covers the sliding viewport width seamlessly
  const slidingLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="py-12 bg-white dark:bg-card border-b border-border/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Social Proof */}
          <div className="lg:col-span-4 flex flex-col items-start gap-2" data-reveal>
            <div className="flex items-center gap-1 text-[#F97316]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" className="stroke-none" />
              ))}
              <span className="text-sm font-bold text-foreground ml-2">4.9/5 Rating</span>
            </div>
            <p className="text-xs text-muted-foreground font-medium">
              Trusted by local businesses, professionals, communities, and NGOs.
            </p>
          </div>

          {/* Center Stats Grid */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4 border-l border-r border-border/50 px-8 py-2 md:py-0" data-reveal data-reveal-delay="1">
            <div>
              <div className="text-2xl font-bold text-primary font-impact tracking-wider">Up to 10+</div>
              <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Websites Launched</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary font-impact tracking-wider">100%</div>
              <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Mobile & SEO Ready</div>
            </div>
          </div>

          {/* Right Sliding Logos (Infinite Marquee) */}
          <div className="lg:col-span-4 overflow-hidden relative opacity-40 select-none grayscale w-full py-1.5" data-reveal data-reveal-delay="2">
            {/* Fade Gradients for a premium visual finish */}
            <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white dark:from-card to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white dark:from-card to-transparent z-10 pointer-events-none" />
            
            <div className="animate-marquee flex gap-12 items-center">
              {slidingLogos.map((logo, idx) => (
                <span 
                  key={idx} 
                  className="text-[10px] font-extrabold tracking-widest text-muted-foreground font-heading hover:text-foreground hover:opacity-100 transition-all duration-300 whitespace-nowrap"
                >
                  {logo.toUpperCase()}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustSection;
