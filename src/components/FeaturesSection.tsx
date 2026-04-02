import { BadgeDollarSign, Zap, Smartphone, LineChart, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: BadgeDollarSign,
    title: "Close More Sales",
    desc: "Get orders instantly on WhatsApp. No complicated checkout — just a simple chat to close the deal.",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: Zap,
    title: "Set Up in Minutes",
    desc: "No tech skills? No problem. We build your store fast so you can start selling immediately.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Smartphone,
    title: "Run from Your Phone",
    desc: "Manage your products, track orders, and talk to customers — all from the palm of your hand.",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: LineChart,
    title: "Track Sales Easily",
    desc: "Simple, easy-to-read dashboards so you know exactly how your business is growing.",
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    icon: ShieldCheck,
    title: "Look Professional & Trusted",
    desc: "A stunning, mobile-first storefront that builds immediate trust with your Nigerian audience.",
    color: "bg-purple-500/10 text-purple-600",
  },
];

const FeaturesSection = () => (
  <section id="features" className="section-padding">
    <div className="max-w-7xl mx-auto">
      <div className="max-w-2xl mb-16">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Features</span>
        <h2 className="mt-3 text-2xl md:text-4xl font-heading font-bold text-foreground leading-tight">
          Everything you need to
          <br />
          <span className="gradient-text">sell online successfully.</span>
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f) => (
          <div
            key={f.title}
            className="group glass-card p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-5`}>
              <f.icon size={22} />
            </div>
            <h3 className="text-lg font-semibold font-heading text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
