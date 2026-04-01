import { MessageCircle, Mail, Globe, Search, CreditCard, Palette } from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "Get orders on WhatsApp",
    desc: "Effortlessly connect with customers through WhatsApp integration, enabling real-time communication.",
  },
  {
    icon: Mail,
    title: "Email Support",
    desc: "Rely on responsive email support to address inquiries, resolve issues, and provide guidance.",
  },
  {
    icon: Globe,
    title: "Beautiful Business Website",
    desc: "Get a very beautiful business website, equipped with essential features.",
  },
  {
    icon: Search,
    title: "SEO",
    desc: "Boost your website's online presence with powerful SEO system.",
  },
  {
    icon: CreditCard,
    title: "Multiple Payment Options",
    desc: "Collect payments via multiple payment options; both manually and automatically.",
  },
  {
    icon: Palette,
    title: "Customizable Website",
    desc: "Tailor your website's appearance and functionality to match your brand identity.",
  },
];

const FeaturesSection = () => (
  <section id="features" className="section-padding bg-secondary/50">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
          Customize your website <span className="text-gradient-gold">without hassle.</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Stand out and sell more, design your website your way that gets you noticed.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-card rounded-2xl p-8 border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-xl gold-gradient flex items-center justify-center mb-5">
              <f.icon className="text-primary-foreground" size={24} />
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
