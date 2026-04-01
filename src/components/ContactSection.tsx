import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section id="contactus" className="section-padding">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Questions or <span className="text-gradient-gold">Concerns?</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Our friendly support team is here to answer all your inquiries and guide you on your
            e-commerce journey.
          </p>

          <div className="mt-10 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center shrink-0">
                <Mail className="text-primary-foreground" size={18} />
              </div>
              <div>
                <div className="font-semibold text-foreground">Email Us</div>
                <a href="mailto:hello@goonline.com" className="text-sm text-muted-foreground hover:text-primary">
                  hello@goonline.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center shrink-0">
                <Phone className="text-primary-foreground" size={18} />
              </div>
              <div>
                <div className="font-semibold text-foreground">Call Us</div>
                <a href="tel:+2349020219544" className="text-sm text-muted-foreground hover:text-primary">
                  +234 902 021 9544
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center shrink-0">
                <MapPin className="text-primary-foreground" size={18} />
              </div>
              <div>
                <div className="font-semibold text-foreground">Address</div>
                <p className="text-sm text-muted-foreground">
                  B4-313, HFP Eastline Shopping Complex, Abraham Adesanya Estate.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-8">
          <h3 className="text-xl font-heading font-bold text-foreground mb-6">Contact Us</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Mobile"
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message"
              rows={4}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
            <button type="submit" className="btn-gold w-full">Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
