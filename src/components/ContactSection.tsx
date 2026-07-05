import { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";
import { useAnalytics } from "@/hooks/use-analytics";
import emailjs from "@emailjs/browser";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", message: "" });
  const [loading, setLoading] = useState(false);
  const { trackEvent } = useAnalytics();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      // 1. Save lead to Firestore
      await addDoc(collection(db, "leads"), {
        ...form,
        status: "New",
        createdAt: serverTimestamp(),
      });

      // 2. Send email notification via EmailJS (non-blocking)
      emailjs
        .send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            from_name: form.name,
            from_email: form.email,
            mobile: form.mobile || "Not provided",
            message: form.message,
            to_email: "goonlinemedia0@gmail.com",
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
        .catch((err) => console.error("[EmailJS Error]", err));

      trackEvent("contact_form_success", { name: form.name });
      toast.success("Message sent successfully! We'll get back to you soon.");
      setForm({ name: "", email: "", mobile: "", message: "" });
    } catch (error: any) {
      console.error("[Contact Error] Full Error Object:", error);
      trackEvent("contact_form_error", { error: error.message || "Unknown error" });

      if (error.code === "permission-denied") {
        toast.error("Security access denied. Please contact site admin.");
      } else {
        toast.error("Failed to send message. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-transparent border-b border-border/50">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
        <div>
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Contact</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-heading font-bold text-foreground">
            Start a Project
          </h2>
          <p className="mt-4 text-sm text-muted-foreground max-w-md leading-relaxed font-medium">
            GoOnline is a digital solutions agency designing high-performance websites and custom portals for businesses, churches, schools, NGOs, and growing brands.
          </p>

          <div className="mt-10 space-y-6">
            {[
              { icon: Mail, label: "Email Us", value: "goonlinemedia0@gmail.com", href: "mailto:goonlinemedia0@gmail.com" },
              { icon: Phone, label: "Call Us", value: "+234 708 115 0770", href: "tel:+2347081150770" },
              { icon: MapPin, label: "Visit Us", value: "9, Bashiru Yakubu Street, Irepo Estate, Ikotun, Lagos" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent text-primary flex items-center justify-center shrink-0">
                  <item.icon className="text-primary" size={18} />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground font-medium">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card p-8 rounded-3xl border border-border shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
          <h3 className="text-lg font-heading font-bold text-foreground mb-6">Send a Message</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full rounded-xl border border-border bg-background px-4.5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full rounded-xl border border-border bg-background px-4.5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
              <input
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full rounded-xl border border-border bg-background px-4.5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            </div>
            <textarea
              name="message"
              required
              value={form.message}
              onChange={handleChange}
              placeholder="Your message..."
              rows={4}
              className="w-full rounded-xl border border-border bg-background px-4.5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>Sending... <Loader2 className="animate-spin" size={16} /></>
              ) : (
                <>Send Message <Send size={16} /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
