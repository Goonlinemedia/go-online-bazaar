import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Twitter, Instagram, ArrowRight } from "lucide-react";

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter mock handler
  };

  return (
    <footer className="bg-[#0F172A] text-slate-400 py-20 px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand & Socials Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center overflow-visible">
            <img 
              src="/logo.png" 
              alt="GoOnline Logo" 
              className="h-[32px] md:h-[40px] w-auto object-contain scale-[3] md:scale-[3.5] origin-left translate-y-[2px] md:translate-y-[4px]" 
            />
          </div>
          <p className="text-xs leading-relaxed mt-4 text-slate-400">
            GoOnline is a digital solutions agency designing high-performance websites and custom portals for businesses, churches, schools, NGOs, and growing brands.
          </p>
          <div className="flex gap-4 mt-2">
            <a 
              href="https://wa.me/2348035826698" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-primary hover:text-white transition-colors"
            >
              <Phone size={14} />
            </a>
            <a 
              href="https://twitter.com/GoOnline" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-primary hover:text-white transition-colors"
            >
              <Twitter size={14} />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-primary hover:text-white transition-colors"
            >
              <Instagram size={14} />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="font-bold text-white mb-6 text-xs uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-3 text-xs font-medium">
            {["Portfolio", "Services", "Process", "Pricing", "Contact"].map((l) => (
              <li key={l}>
                <a 
                  href={`#${l.toLowerCase()}`} 
                  className="hover:text-primary transition-all duration-300 transform hover:translate-x-1 inline-block"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Support Column */}
        <div>
          <h4 className="font-bold text-white mb-6 text-xs uppercase tracking-wider">Contact & Support</h4>
          <ul className="space-y-4 text-xs font-medium">
            <li className="flex items-center gap-3">
              <Mail size={14} className="text-primary shrink-0" />
              <a href="mailto:goonlinemedia0@gmail.com" className="hover:text-primary transition-colors">
                goonlinemedia0@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={14} className="text-primary shrink-0" />
              <a href="tel:+2348035826698" className="hover:text-primary transition-colors">
                +234 803 582 6698
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
              <span>Irepo Estate, Ikotun Lagos, Nigeria</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div>
          <h4 className="font-bold text-white mb-6 text-xs uppercase tracking-wider">Newsletter</h4>
          <p className="text-xs leading-relaxed mb-4">
            Get design insights, ecommerce tips, and business growth tools directly to your inbox.
          </p>
          <form className="flex gap-2" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              required
              placeholder="Email address"
              className="bg-slate-900 border border-slate-800 text-xs rounded-xl px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-primary w-full"
            />
            <button 
              type="submit" 
              className="bg-primary text-white p-2 rounded-xl hover:bg-[#EA580C] transition-colors shrink-0"
            >
              <ArrowRight size={14} />
            </button>
          </form>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-slate-500">
        <p>© {new Date().getFullYear()} GoOnline Media. All rights reserved.</p>
        <div className="flex gap-6 font-medium">
          <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/refund-policy" className="hover:text-primary transition-colors">Refund Policy</Link>
          <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
