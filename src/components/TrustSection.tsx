import { Star } from "lucide-react";

const TrustSection = () => {
  const logos = [
    "ApexCorp",
    "Faith Chapel",
    "Premier Prep",
    "Luxe Fashion",
    "BuildCorp"
  ];

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
              Trusted by 100+ businesses, schools, churches, and NGOs across Nigeria.
            </p>
          </div>

          {/* Center Stats Grid */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4 border-l border-r border-border/50 px-8 py-2 md:py-0" data-reveal data-reveal-delay="1">
            <div>
              <div className="text-2xl font-bold text-primary font-heading">100+</div>
              <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Websites Launched</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary font-heading">100%</div>
              <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Mobile & SEO Ready</div>
            </div>
          </div>

          {/* Right Logos Grid */}
          <div className="lg:col-span-4 flex flex-wrap items-center justify-between gap-6 opacity-40 select-none grayscale" data-reveal data-reveal-delay="2">
            {logos.map((logo) => (
              <span 
                key={logo} 
                className="text-xs font-bold tracking-widest text-muted-foreground font-heading hover:text-foreground hover:opacity-100 transition-all duration-300"
              >
                {logo.toUpperCase()}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustSection;
