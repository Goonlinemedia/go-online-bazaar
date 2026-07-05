const testimonials = [
  {
    headline: "Established a high-end digital booking portal",
    quote: "My photography booking site is flawless. The gallery loading speeds are incredible, and clients can easily reserve slots and make direct inquiries. It elevated my business profile instantly.",
    author: "Meshach S.",
    role: "Founder, Meshach Photography",
    location: "Lagos, NG",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    stars: 5,
  },
  {
    headline: "Automated listings captured 3x more inquiries",
    quote: "Our property showcase platform operates completely on autopilot. Real estate clients browse our active listings and contact us directly, which tripled our lead generation rate.",
    author: "Audu K.",
    role: "Director, GoOnline Estates",
    location: "Abuja, NG",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    stars: 5,
  },
  {
    headline: "Seamless custom catalog configurations",
    quote: "The template-based ordering and download portal is exactly what we needed. Our corporate clients can customize catalog structures and request quotes without any manual bottlenecks.",
    author: "Tobi S.",
    role: "Lead Designer, PrintHub",
    location: "Port Harcourt, NG",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    stars: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-padding bg-transparent border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 px-4">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 inline-block">
            Proof
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground font-heading tracking-tight">
            Client Results
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto leading-relaxed font-medium">
            Read feedback directly from the organizations and brands that trust us to power their platforms.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-card p-8 rounded-3xl border border-border shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:-translate-y-[6px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-500 relative group flex flex-col justify-between"
            >
              <div>
                {/* Star Ratings */}
                <div className="flex gap-1 text-[#F97316] mb-4">
                  {[...Array(t.stars)].map((_, i) => (
                    <span key={i} className="text-base">★</span>
                  ))}
                </div>
                
                {/* Bold Headline */}
                <h3 className="text-sm font-bold font-heading text-foreground mb-3 tracking-tight">
                  "{t.headline}"
                </h3>
                
                {/* Quote Text */}
                <p className="text-[13px] text-muted-foreground/90 leading-relaxed mb-6 font-medium font-display italic">
                  "{t.quote}"
                </p>
              </div>

              {/* User Identity Footer */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/50">
                <img 
                  src={t.avatar} 
                  alt={t.author} 
                  className="w-9 h-9 rounded-full object-cover border border-border bg-muted"
                />
                <div>
                  <h4 className="font-bold text-foreground text-xs font-heading leading-tight">{t.author}</h4>
                  <p className="text-[10px] text-muted-foreground leading-none mt-1">{t.role} &bull; {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
