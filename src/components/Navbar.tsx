import { useState, useEffect } from "react";
import { Menu, X, Navigation, Sun, Moon } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useTheme } from "next-themes";

const navLinks = ["Portfolio", "Services", "Process", "Pricing", "Contact"];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const isHome = location.pathname === "/";

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 backdrop-blur-md ${
      scrolled 
        ? "py-3.5 bg-[#FCFCFD]/95 dark:bg-background/95 border-b border-border" 
        : "py-5 bg-[#FCFCFD]/80 dark:bg-background/80 border-b border-border/50"
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between pointer-events-auto relative">
        
        {/* Left: Brand Logo */}
        <a href={isHome ? "#" : "/"} className="flex items-center overflow-visible z-[130]">
          <img 
            src="/logo.png" 
            alt="GoOnline Logo" 
            className="h-[32px] md:h-[40px] w-auto object-contain scale-[3] md:scale-[3.5] origin-left translate-y-[2px] md:translate-y-[4px] dark:invert" 
          />
        </a>

        {/* Center: Dynamic Floating Navigation Pill (Desktop) */}
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[120] hidden md:block">
          <nav 
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`flex items-center overflow-hidden rounded-full border border-border bg-background/85 dark:bg-[#0F172A]/85 shadow-lg backdrop-blur-md h-12 transition-all duration-500 relative cursor-pointer ${
              scrolled && !hovered 
                ? "w-12 pl-0 pr-0 justify-center" 
                : "w-[440px] pl-4 pr-1"
            }`}
          >
            {/* Navigation Icon (Left) - visible when expanded */}
            <div className={`flex-shrink-0 flex items-center text-primary transition-all duration-300 ${scrolled && !hovered ? "opacity-0 scale-50" : "opacity-100 scale-100"}`}>
              <Navigation size={14} className="rotate-45 fill-current" />
            </div>
            
            {/* Links Container - visible when expanded */}
            <div className={`flex items-center gap-1 pr-4 transition-all duration-500 ${scrolled && !hovered ? "opacity-0 pointer-events-none scale-95" : "opacity-100 scale-100"}`}>
              {navLinks.map((link) => {
                const isPricingLink = link === "Pricing";
                const href = isPricingLink 
                  ? "/pricing" 
                  : (isHome ? `#${link.toLowerCase().replace(/\s/g, "")}` : `/#${link.toLowerCase().replace(/\s/g, "")}`);
                
                return (
                  <div key={link}>
                    <a
                      href={href}
                      className="text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 uppercase tracking-wider inline-block font-heading"
                    >
                      {link}
                    </a>
                  </div>
                );
              })}
            </div>

            {/* Menu Hamburger Icon - visible when collapsed */}
            <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-500 ${scrolled && !hovered ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
              <Menu size={16} className="text-primary stroke-[3px]" />
            </div>
          </nav>
        </div>

        {/* Right: Theme Toggle, CTA Action & Mobile Menu Trigger */}
        <div className="z-[130] flex items-center gap-3 md:gap-4">
          {mounted && (
            <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
              className="flex items-center justify-center bg-background/40 dark:bg-[#1E293B]/40 border border-border hover:border-primary/45 h-9 w-9 rounded-full transition-all duration-300 focus:outline-none cursor-pointer text-primary"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}

          <a 
            href={isHome ? "#contact" : "/#contact"} 
            className="hidden md:inline-flex btn-primary text-xs font-bold uppercase tracking-wider shadow-sm px-6 py-3 rounded-full"
          >
            Start a Project
          </a>

          <button 
            onClick={() => setOpen(!open)} 
            className="md:hidden flex items-center justify-center bg-background/40 dark:bg-[#1E293B]/40 border border-border/40 hover:border-primary/45 h-9 w-9 rounded-full transition-all duration-300 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {open ? <X size={16} className="text-primary" /> : <Menu size={16} className="text-primary" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {open && (
        <div className="md:hidden fixed inset-0 z-[110] bg-background/95 dark:bg-background/98 backdrop-blur-xl flex flex-col justify-center px-8 animate-fade-in">
          <div className="space-y-6 flex flex-col items-center">
            {navLinks.map((link, idx) => {
              const isPricingLink = link === "Pricing";
              const href = isPricingLink 
                ? "/pricing" 
                : (isHome ? `#${link.toLowerCase().replace(/\s/g, "")}` : `/#${link.toLowerCase().replace(/\s/g, "")}`);
              
              return (
                <a
                  key={link}
                  href={href}
                  className="text-lg font-bold text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors font-heading"
                  onClick={() => setOpen(false)}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {link}
                </a>
              );
            })}
            <a 
              href={isHome ? "#contact" : "/#contact"} 
              onClick={() => setOpen(false)} 
              className="btn-primary text-sm font-bold uppercase tracking-wider w-full max-w-xs text-center py-4 rounded-full mt-8 shadow-sm"
            >
              Start a Project
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
