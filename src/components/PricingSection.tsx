import { useState } from "react";
import { Check, X } from "lucide-react";

type Plan = {
  name: string;
  price: string;
  period: string;
  desc: string;
  products: string;
  themes: string;
  features: string[];
  unavailable: string[];
  popular?: boolean;
};

const plans: Plan[] = [
  {
    name: "Starter",
    price: "₦5,000",
    period: "1 Month",
    desc: "Ideal for new businesses taking their first steps online.",
    products: "20",
    themes: "1",
    features: [
      "Unlimited Orders", "Coupons", "Sound Notification", "WhatsApp Message",
      "Customizable Store", "Automatic Payment", "Manual Payment",
      "Sales Record & Reporting", "Shipping & Delivery", "Email Support", "WhatsApp Support",
    ],
    unavailable: ["Custom Domain"],
  },
  {
    name: "Deluxe",
    price: "₦10,000",
    period: "1 Month",
    desc: "Ideal for businesses with a small team and sizeable inventory.",
    products: "200",
    themes: "3",
    features: [
      "Unlimited Orders", "Coupons", "Custom Domain", "Sound Notification", "WhatsApp Message",
      "Role Management", "Tracking Pixel", "Customizable Store", "Automatic Payment",
      "Manual Payment", "Sales Record & Reporting", "Shipping & Delivery",
      "Email Support", "WhatsApp Support", "Email Notifications (SMTP)",
    ],
    unavailable: [],
    popular: true,
  },
  {
    name: "Ultimate",
    price: "₦20,000",
    period: "1 Month",
    desc: "Ideal for growing businesses with a large inventory.",
    products: "1000",
    themes: "3",
    features: [
      "Unlimited Orders", "Coupons", "Custom Domain", "Blogs", "Sound Notification",
      "WhatsApp Message", "Role Management", "Tracking Pixel", "Customizable Store",
      "Automatic Payment", "Manual Payment", "Sales Record & Reporting",
      "Shipping & Delivery", "Email Support", "Phone Call Support",
      "WhatsApp Support", "Email Notifications (SMTP)",
    ],
    unavailable: [],
  },
];

const PricingSection = () => {
  const [expandedPlan, setExpandedPlan] = useState<number | null>(1);

  return (
    <section id="pricing" className="section-padding bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Choose Your <span className="text-gradient-gold">Subscription Plan</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Go Online offers a variety of subscription plans to fit your business needs. Choose the
            features you need to succeed and start selling online today!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`bg-card rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-xl ${
                plan.popular ? "border-primary shadow-lg scale-[1.02]" : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="gold-gradient text-center py-2 text-sm font-semibold text-primary-foreground">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-xl font-heading font-bold text-foreground">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-gradient-gold">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">/ {plan.period}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{plan.desc}</p>

                <div className="mt-6 flex gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{plan.products}</div>
                    <div className="text-xs text-muted-foreground">Products</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">∞</div>
                    <div className="text-xs text-muted-foreground">Orders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{plan.themes}</div>
                    <div className="text-xs text-muted-foreground">Themes</div>
                  </div>
                </div>

                <button
                  onClick={() => setExpandedPlan(expandedPlan === i ? null : i)}
                  className="mt-4 text-xs text-primary hover:underline"
                >
                  {expandedPlan === i ? "Hide features" : "Show features"}
                </button>

                {expandedPlan === i && (
                  <ul className="mt-4 space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                        <Check size={14} className="text-primary shrink-0" /> {f}
                      </li>
                    ))}
                    {plan.unavailable.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground line-through">
                        <X size={14} className="text-destructive shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                )}

                <a href="#" className={`mt-8 block text-center ${plan.popular ? "btn-gold" : "btn-gold-outline"}`}>
                  Get Started
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
