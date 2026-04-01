import { useState } from "react";
import { Check, X, Sparkles } from "lucide-react";

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
    period: "mo",
    desc: "Perfect for new businesses going digital.",
    products: "20",
    themes: "1",
    features: [
      "Unlimited Orders", "Coupons", "WhatsApp Notifications",
      "Customizable Store", "Auto & Manual Payment",
      "Sales Reporting", "Shipping & Delivery", "Email & WhatsApp Support",
    ],
    unavailable: ["Custom Domain"],
  },
  {
    name: "Deluxe",
    price: "₦10,000",
    period: "mo",
    desc: "For growing brands with bigger inventory.",
    products: "200",
    themes: "3",
    features: [
      "Unlimited Orders", "Coupons", "Custom Domain", "WhatsApp Notifications",
      "Role Management", "Tracking Pixel", "Customizable Store",
      "Auto & Manual Payment", "Sales Reporting", "Shipping & Delivery",
      "Email & WhatsApp Support", "SMTP Notifications",
    ],
    unavailable: [],
    popular: true,
  },
  {
    name: "Ultimate",
    price: "₦20,000",
    period: "mo",
    desc: "For power sellers with large catalogs.",
    products: "1000",
    themes: "3",
    features: [
      "Unlimited Orders", "Coupons", "Custom Domain", "Blogs",
      "WhatsApp Notifications", "Role Management", "Tracking Pixel",
      "Customizable Store", "Auto & Manual Payment", "Sales Reporting",
      "Shipping & Delivery", "Phone, Email & WhatsApp Support", "SMTP Notifications",
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
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Pricing</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-heading font-bold text-foreground">
            Simple, transparent <span className="gradient-text">pricing</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            No hidden fees. Pick a plan, launch your store, and start selling today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`glass-card overflow-hidden transition-all duration-300 hover:shadow-xl ${
                plan.popular ? "ring-2 ring-primary shadow-lg shadow-primary/10 scale-[1.02]" : ""
              }`}
            >
              {plan.popular && (
                <div className="bg-primary text-center py-2 text-sm font-semibold text-primary-foreground flex items-center justify-center gap-1.5">
                  <Sparkles size={14} /> Most Popular
                </div>
              )}
              <div className="p-7">
                <h3 className="text-lg font-heading font-bold text-foreground">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold font-heading gradient-text">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">/{plan.period}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{plan.desc}</p>

                <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                  <div className="bg-secondary/80 rounded-xl py-3">
                    <div className="text-lg font-bold text-foreground">{plan.products}</div>
                    <div className="text-[11px] text-muted-foreground">Products</div>
                  </div>
                  <div className="bg-secondary/80 rounded-xl py-3">
                    <div className="text-lg font-bold text-foreground">∞</div>
                    <div className="text-[11px] text-muted-foreground">Orders</div>
                  </div>
                  <div className="bg-secondary/80 rounded-xl py-3">
                    <div className="text-lg font-bold text-foreground">{plan.themes}</div>
                    <div className="text-[11px] text-muted-foreground">Themes</div>
                  </div>
                </div>

                <button
                  onClick={() => setExpandedPlan(expandedPlan === i ? null : i)}
                  className="mt-5 text-xs text-primary hover:underline font-medium"
                >
                  {expandedPlan === i ? "Hide details ↑" : "Show details ↓"}
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

                <a
                  href="#"
                  className={`mt-8 block text-center ${plan.popular ? "btn-primary" : "btn-outline"}`}
                >
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
