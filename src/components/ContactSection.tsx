import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="section-padding bg-secondary/50">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
        <div>
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Contact</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-heading font-bold text-foreground">
            Got questions? <span className="gradient-text">Let's talk.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md">
            Our team is here to help you get started and grow your online business.
          </p>

          <div className="mt-10 space-y-5">
            {[
              { icon: Mail, label: "Email Us", value: "goonlinemedia0@gmail.com", href: "mailto:goonlinemedia0@gmail.com" },
              { icon: Phone, label: "Call Us", value: "+234 803 582 6698", href: "tel:+2348035826698" },
              { icon: MapPin, label: "Visit Us", value: "B4-313, HFP Eastline Shopping Complex, Abraham Adesanya Estate." },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="text-primary" size={18} />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-8">
          <h3 className="text-lg font-heading font-bold text-foreground mb-6">Send a Message</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your message..."
              rows={4}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
            <button type="submit" className="btn-primary w-full inline-flex items-center justify-center gap-2">
              Send Message <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
