import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-navy text-primary-foreground/70 py-14 px-4">
    <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
      <div>
        <div className="flex items-center mb-4 overflow-visible">
          <img src="/logo.png" alt="GoOnline Logo" className="h-[32px] md:h-[40px] w-auto object-contain scale-[3] md:scale-[3.5] origin-left" />
        </div>
        <p className="text-sm leading-relaxed">
          Your all-inclusive digital store builder. Sell products to anyone, anywhere.
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-primary-foreground mb-4 text-sm">Quick Links</h4>
        <ul className="space-y-2 text-sm">
          {["Features", "Process", "Portfolio", "Pricing", "Contact"].map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className="hover:text-primary transition-all duration-300 transform hover:translate-x-1 inline-block">{l}</a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-primary-foreground mb-4 text-sm">Support</h4>
        <ul className="space-y-2 text-sm">
          <li>goonlinemedia0@gmail.com</li>
          <li>+234 803 582 6698</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-primary-foreground mb-4 text-sm">Payments We Support</h4>
        <div className="flex flex-wrap gap-4 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
           <img src="https://upload.wikimedia.org/wikipedia/commons/2/23/Paystack_Logo.png" alt="Paystack" className="h-6 object-contain" />
           <img src="https://brandlogic.com/wp-content/uploads/2021/04/Flutterwave_Logo.png" alt="Flutterwave" className="h-6 object-contain" />
        </div>
        <p className="mt-4 text-[10px] leading-relaxed">
           Secure payments powered by Nigeria's leading gateways.
        </p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px]">
      <p>© {new Date().getFullYear()} GoOnline. All rights reserved.</p>
      <div className="flex gap-6">
         <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
         <Link to="/refund-policy" className="hover:text-primary transition-colors">Refund Policy</Link>
         <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
