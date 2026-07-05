const testimonials = [
  {
    headline: "Our giving and sermon streams grew 40%",
    quote: "They designed a beautiful sermon archiving media library and integrated secure donations. Our members can easily support the ministry and catch up on services from anywhere.",
    author: "Pastor David E.",
    role: "Senior Pastor, Faith Community",
    location: "Lagos, NG",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    stars: 5,
  },
  {
    headline: "Admissions portal simplified student tracking",
    quote: "We needed a portal that handles admissions inquiries, newsletters, and fees documentation. GoOnline built a highly functional platform that parents trust.",
    author: "Dr. Kunle A.",
    role: "Administrator, Premier Prep Academy",
    location: "Abuja, NG",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    stars: 5,
  },
  {
    headline: "Secured international shipments with credibility",
    quote: "Corporate clients expect an established web presence. The professional site designed by GoOnline gave us the exact authority we needed to secure shipping contracts.",
    author: "Sarah B.",
    role: "Director of Ops, Apex Logistics",
    location: "Port Harcourt, NG",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    stars: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-transparent border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 px-4">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 inline-block">
            Proof
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground font-heading tracking-tight">
            Client Results
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto leading-relaxed font-medium">
            Read how we help organizations establish digital credibility and grow.
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
                <p className="text-xs text-muted-foreground leading-relaxed mb-6 font-medium">
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
