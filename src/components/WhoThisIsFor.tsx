import { Store, Instagram, Smartphone, Users } from "lucide-react";

const targetAudience = [
  {
    icon: Instagram,
    title: "Instagram Vendors",
    desc: "Turn your followers into customers with a professional link-in-bio storefront. No more 'DM for Price'.",
    color: "bg-pink-500/10 text-pink-600",
  },
  {
    icon: Smartphone,
    title: "WhatsApp Sellers",
    desc: "Stop manually sending catalogs. Let customers browse and order directly from you while you sleep.",
    color: "bg-green-500/10 text-green-600",
  },
  {
    icon: Store,
    title: "Small Business Owners",
    desc: "Take your physical shop online. We build the digital bridge between your shop and your customers.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Users,
    title: "Side Hustlers",
    desc: "If you sell anything online, we give you the professional edge to start making real money immediately.",
    color: "bg-blue-500/10 text-blue-600",
  },
];

const WhoThisIsFor = () => {
  return (
    <section className="py-24 bg-secondary/20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-foreground font-heading">
            Who is <span className="text-primary">GoOnline</span> for?
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            We build for growth-minded entrepreneurs who want to sell more, faster.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {targetAudience.map((audience, idx) => (
            <div
              key={idx}
              className="bg-background p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50 group"
            >
              <div className={`w-14 h-14 rounded-2xl ${audience.color} flex items-center justify-center mb-6 shadow-lg shadow-current/10 transition-transform group-hover:rotate-6`}>
                <audience.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading">{audience.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {audience.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoThisIsFor;
