import { Zap } from "lucide-react";

const Footer = () => (
  <footer className="bg-navy text-primary-foreground/70 py-14 px-4">
    <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="text-primary-foreground" size={14} />
          </div>
          <span className="text-lg font-bold font-heading text-primary-foreground">
            Go<span className="text-primary">Online</span>
          </span>
        </div>
        <p className="text-sm leading-relaxed">
          Your all-inclusive digital store builder. Sell products to anyone, anywhere.
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-primary-foreground mb-4 text-sm">Quick Links</h4>
        <ul className="space-y-2 text-sm">
          {["Features", "Vendors", "Pricing", "Contact"].map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className="hover:text-primary transition-colors">{l}</a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-primary-foreground mb-4 text-sm">Support</h4>
        <ul className="space-y-2 text-sm">
          <li>hello@goonline.com</li>
          <li>+234 902 021 9544</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-primary-foreground mb-4 text-sm">Address</h4>
        <p className="text-sm">B4-313, HFP Eastline Shopping Complex, Abraham Adesanya Estate.</p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-primary-foreground/10 text-center text-xs">
      © {new Date().getFullYear()} Go Online. All rights reserved.
    </div>
  </footer>
);

export default Footer;
