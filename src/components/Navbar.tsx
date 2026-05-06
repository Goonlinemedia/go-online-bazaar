import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = ["Benefits", "Results", "Process", "Pricing", "FAQ"];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#" className="flex items-center overflow-visible">
          <img src="/logo.png" alt="GoOnline Logo" className="h-[32px] md:h-[40px] w-auto object-contain scale-[3] md:scale-[3.5] origin-left translate-y-[2px] md:translate-y-[4px]" />
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

        <a href="https://wa.me/2348035826698?text=Hello%20Go%20Online!%20I'm%20ready%20to%20start%20getting%20orders." target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex btn-primary text-sm shadow-lg shadow-primary/20">
          Start Getting Orders
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
          <a href="https://wa.me/2348035826698?text=Hello%20Go%20Online!%20I'm%20ready%20to%20start%20getting%20orders." target="_blank" rel="noopener noreferrer" className="btn-primary text-sm inline-block w-full text-center">Start Getting Orders</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
