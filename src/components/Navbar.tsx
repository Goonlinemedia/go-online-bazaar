import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = ["Home", "Features", "Vendors", "Pricing", "Blogs", "Contact Us"];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2">
          <span className="text-2xl font-bold font-heading text-gradient-gold">Go</span>
          <span className="text-2xl font-bold font-heading text-foreground">Online</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s/g, "")}`}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        <a href="#" className="hidden md:inline-flex btn-gold text-sm">
          Get Started
        </a>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s/g, "")}`}
              className="block text-sm font-medium text-muted-foreground hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {link}
            </a>
          ))}
          <a href="#" className="btn-gold text-sm inline-block">Get Started</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
