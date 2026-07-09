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
  <section id="features" className="section-padding relative overflow-hidden">
    <div className="section-number" aria-hidden="true">01</div>
    <div className="aura-blob bg-teal w-[400px] h-[400px] -right-20 top-0" />

    <div className="max-w-7xl mx-auto relative z-10">
      <div className="max-w-3xl mb-20" data-reveal>
        <span className="text-sm font-black text-primary uppercase tracking-[0.2em] text-glow">Advantage</span>
        <h2 className="mt-6 text-4xl md:text-6xl font-heading font-black text-foreground leading-[1.1] tracking-tighter">
          Everything you need to
          <br />
          <span className="gradient-text italic">sell online successfully.</span>
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div
            key={f.title}
            data-reveal
            data-reveal-delay={(i % 3) + 1}
            className="group glass-panel p-10 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500 border-white/10"
          >
            <div className={`w-14 h-14 rounded-2xl ${f.color} flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
              <f.icon size={26} />
            </div>
            <h3 className="text-2xl font-bold font-heading text-foreground mb-4 tracking-tight">{f.title}</h3>
            <p className="text-muted-foreground leading-relaxed font-medium">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
