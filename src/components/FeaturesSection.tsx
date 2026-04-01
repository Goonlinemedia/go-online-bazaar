import { Wrench, MessageCircle, Smartphone, BadgeDollarSign, Rocket } from "lucide-react";

const features = [
  {
    icon: Wrench,
    title: "We Build Everything for You",
    desc: "From domain setup to store configuration, we handle the heavy lifting while you focus on your business.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Orders Instantly",
    desc: "Your customers order directly on WhatsApp. No complicated cart or checkout — just a simple chat to close the deal.",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: Smartphone,
    title: "Mobile-Optimized for Real Buyers",
    desc: "A stunning, responsive storefront built for mobile-first shopping experiences where your customers are.",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: BadgeDollarSign,
    title: "Built to Convert Visitors into Sales",
    desc: "Not just a pretty site — our layouts are optimized based on top-performing WhatsApp stores.",
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    icon: Rocket,
    title: "Scale Your Business with Ease",
    desc: "Need more products? Special tools? Upgrade anytime as your sales grow without any technical stress.",
    color: "bg-purple-500/10 text-purple-600",
  },
];

const FeaturesSection = () => (
  <section id="features" className="section-padding">
    <div className="max-w-7xl mx-auto">
      <div className="max-w-2xl mb-16">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Features</span>
        <h2 className="mt-3 text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
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
