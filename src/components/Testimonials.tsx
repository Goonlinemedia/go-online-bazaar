const testimonials = [
  {
    quote: "Got our first order in 48 hours. They handled every single technical detail from design to launching our catalogs. Now we just fulfill orders.",
    author: "Binta K.",
    role: "Jewelry Merchant",
    stars: 5,
  },
  {
    quote: "Our customer order flow started running seamlessly the day we went live. The checkout process is clean and intuitive for our buyers.",
    author: "Ade O.",
    role: "Fashion Retailer",
    stars: 5,
  },
  {
    quote: "Professional, clean, and direct. We finally have a brand website that looks high-end and displays our catalogs without complexity.",
    author: "Tobi S.",
    role: "Electronics Vendor",
    stars: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-background border-b border-border/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 px-4">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 inline-block">
            Proof
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground font-heading tracking-tight">
            Client Results
          </h2>
          <p className="mt-4 text-muted-foreground text-base max-w-xl mx-auto leading-relaxed font-medium">
            Read how we help companies establish digital credibility and grow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-background p-8 rounded-2xl border border-border hover:shadow-lg transition-all duration-300 relative group"
            >
              <div className="flex gap-1 mb-2">
                 <p className="text-primary font-bold text-[10px] uppercase tracking-wider mb-4 px-2.5 py-1 bg-primary/10 rounded-full border border-primary/20">
                   Verified Client
                 </p>
              </div>
              <p className="text-foreground leading-relaxed mb-6 text-sm font-medium">
                "{t.quote}"
              </p>
              <div>
                <h4 className="font-bold text-foreground text-sm font-heading">{t.author}</h4>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
