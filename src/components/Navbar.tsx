import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";

const navLinks = ["Features", "Process", "Portfolio", "Pricing", "Contact"];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="text-primary-foreground" size={18} />
          </div>
          <span className="text-xl font-bold font-heading text-foreground tracking-tight">
            Go<span className="text-primary">Online</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s/g, "")}`}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        <a href="https://wa.me/2348035826698?text=Hello%20Go%20Online!%20I%20would%20like%20to%20get%20started%20building%20my%20store." target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex btn-primary text-sm shadow-lg shadow-primary/20">
          Get My Store Built
        </a>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s/g, "")}`}
              className="block text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              {link}
            </a>
          ))}
          <a href="https://wa.me/2348035826698?text=Hello%20Go%20Online!%20I%20would%20like%20to%20get%20started%20building%20my%20store." target="_blank" rel="noopener noreferrer" className="btn-primary text-sm inline-block w-full text-center">Get My Store Built</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
