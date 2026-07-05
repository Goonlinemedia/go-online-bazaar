import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-navy text-primary-foreground/70 py-16 px-6 lg:px-8">
    <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
      {/* Brand Column */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center overflow-visible">
          <img src="/logo.png" alt="GoOnline Logo" className="h-[32px] md:h-[40px] w-auto object-contain scale-[3] md:scale-[3.5] origin-left translate-y-[2px] md:translate-y-[4px]" />
        </div>
        <p className="text-xs leading-relaxed mt-4">
          GoOnline is a digital commerce studio helping brands build credible websites, ecommerce stores, and online systems that support sales, ordering, and business growth.
        </p>
      </div>

      {/* Services Column */}
      <div>
        <h4 className="font-bold text-primary-foreground mb-6 text-xs uppercase tracking-wider">Services</h4>
        <ul className="space-y-3 text-xs">
          <li>Brand Websites</li>
          <li>Ecommerce Stores</li>
          <li>WhatsApp Commerce</li>
          <li>Business Growth Setup</li>
        </ul>
      </div>

      {/* Quick Links Column */}
      <div>
        <h4 className="font-bold text-primary-foreground mb-6 text-xs uppercase tracking-wider">Quick Links</h4>
        <ul className="space-y-3 text-xs font-semibold">
          {["Portfolio", "Services", "Process", "Pricing", "Contact"].map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className="hover:text-primary transition-all duration-300 transform hover:translate-x-1 inline-block">{l}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Support & Location Column */}
      <div>
        <h4 className="font-bold text-primary-foreground mb-6 text-xs uppercase tracking-wider">Contact & Location</h4>
        <ul className="space-y-3 text-xs">
          <li>goonlinemedia0@gmail.com</li>
          <li>+234 803 582 6698</li>
          <li className="text-primary-foreground/50">Lagos, Nigeria</li>
        </ul>
      </div>
    </div>

    <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px]">
      <p>© {new Date().getFullYear()} GoOnline Media. All rights reserved.</p>
      <div className="flex gap-6">
         <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
         <Link to="/refund-policy" className="hover:text-primary transition-colors">Refund Policy</Link>
         <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
