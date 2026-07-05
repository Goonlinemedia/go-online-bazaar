import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";

const navLinks = ["Portfolio", "Services", "Process", "Pricing", "Contact"];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href={isHome ? "#" : "/"} className="flex items-center overflow-visible">
          <img 
            src="/logo.png" 
            alt="GoOnline Logo" 
            className="h-[32px] md:h-[40px] w-auto object-contain scale-[3] md:scale-[3.5] origin-left translate-y-[2px] md:translate-y-[4px]" 
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isPricingLink = link === "Pricing";
            const href = isPricingLink 
              ? "/pricing" 
              : (isHome ? `#${link.toLowerCase().replace(/\s/g, "")}` : `/#${link.toLowerCase().replace(/\s/g, "")}`);
            
            return (
              <a
                key={link}
                href={href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link}
              </a>
            );
          })}
        </div>

        <a 
          href={isHome ? "#contact" : "/#contact"} 
          className="hidden md:inline-flex btn-primary text-sm shadow-sm px-5 py-2.5 rounded-xl"
        >
          Start a Project
        </a>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 space-y-3">
          {navLinks.map((link) => {
            const isPricingLink = link === "Pricing";
            const href = isPricingLink 
              ? "/pricing" 
              : (isHome ? `#${link.toLowerCase().replace(/\s/g, "")}` : `/#${link.toLowerCase().replace(/\s/g, "")}`);
            
            return (
              <a
                key={link}
                href={href}
                className="block text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {link}
              </a>
            );
          })}
          <a 
            href={isHome ? "#contact" : "/#contact"} 
            onClick={() => setOpen(false)} 
            className="btn-primary text-sm inline-block w-full text-center py-2.5 rounded-xl"
          >
            Start a Project
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
