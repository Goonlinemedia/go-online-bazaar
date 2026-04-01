import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <button
        type="button"
        onClick={scrollToTop}
        className={`p-4 rounded-full bg-primary text-white shadow-2xl shadow-primary/40 hover:bg-teal-dark hover:-translate-y-1 active:scale-95 transition-all duration-300 border-2 border-white/20 group ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6 group-hover:animate-bounce" />
      </button>
    </div>
  );
};

export default ScrollToTop;
