const vendors = [
  { name: "Wicked Stylist", color: "from-amber-400 to-orange-500" },
  { name: "Luscents", color: "from-rose-400 to-pink-500" },
  { name: "Zack Stylist", color: "from-emerald-400 to-teal-500" },
  { name: "Labelle Outright", color: "from-violet-400 to-purple-500" },
];

const VendorSpotlights = () => (
  <section id="vendors" className="section-padding">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h5 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
          Go Online Vendor Spotlights
        </h5>
        <p className="text-muted-foreground max-w-xl mx-auto text-sm">
          Get inspired by these vendor stories and discover how they're turning their passions into
          profits.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {vendors.map((v) => (
          <div
            key={v.name}
            className="rounded-2xl overflow-hidden bg-card border border-border hover:shadow-lg transition-all duration-300 group cursor-pointer"
          >
            <div className={`h-36 bg-gradient-to-br ${v.color} group-hover:scale-105 transition-transform duration-300`} />
            <div className="p-4">
              <h4 className="font-heading font-bold text-foreground">{v.name}</h4>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <a href="#" className="btn-gold-outline text-sm">See More Stores</a>
      </div>
    </div>
  </section>
);

export default VendorSpotlights;
