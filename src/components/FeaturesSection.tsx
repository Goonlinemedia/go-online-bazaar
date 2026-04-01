import { MessageCircle, Mail, Globe, Package, CreditCard, LayoutDashboard } from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "WhatsApp Orders",
    desc: "Receive orders and chat with customers directly on WhatsApp — no extra apps needed.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Mail,
    title: "Dedicated Support",
    desc: "Get responsive email & phone support to help your business thrive.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Globe,
    title: "Stunning Website",
    desc: "Get a professionally designed, mobile-optimized business website in minutes.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Package,
    title: "Inventory Tracking",
    desc: "Easily monitor your stock levels and manage your products — no expertise required.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: CreditCard,
    title: "Flexible Payments",
    desc: "Accept payments via bank transfer, cards, USSD — automatic or manual.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: LayoutDashboard,
    title: "Order Dashboard",
    desc: "Track pending and completed orders from a simple, elegant merchant dashboard.",
    color: "bg-accent/10 text-accent",
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
