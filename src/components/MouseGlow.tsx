import { useEffect, useRef, useState } from "react";

const MouseGlow = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Instant movement for the dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovering interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = !!target.closest("a, button, [role='button'], input, textarea, select, .interactive-hover");
      setIsHovering(isInteractive);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);
    const onMouseDown = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = `${ringRef.current.style.transform} scale(0.85)`;
      }
    };
    const onMouseUp = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = ringRef.current.style.transform.replace(" scale(0.85)", "");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Smooth lerping for the ring
    let rafId: number;
    const animateRing = () => {
      const lerp = 0.15; // Smoothness factor
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId = requestAnimationFrame(animateRing);
    };
    rafId = requestAnimationFrame(animateRing);

    // Hide default cursor globally
    const style = document.createElement("style");
    style.innerHTML = `
      * { cursor: none !important; }
      a, button, [role='button'] { cursor: none !important; }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(rafId);
      document.head.removeChild(style);
    };
  }, [isVisible]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* Trailing Ring */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40 transition-all duration-300 ease-out"
        style={{
          width: isHovering ? "60px" : "30px",
          height: isHovering ? "60px" : "30px",
          backgroundColor: isHovering ? "hsl(var(--accent) / 0.1)" : "transparent",
          borderColor: isHovering ? "hsl(var(--accent) / 0.6)" : "hsl(var(--accent) / 0.3)",
          opacity: isVisible ? 1 : 0,
          boxShadow: isHovering ? "0 0 20px hsl(var(--accent) / 0.2)" : "none",
        }}
      />

      {/* Center Dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"
        style={{
          opacity: isVisible ? 1 : 0,
          boxShadow: "0 0 10px hsl(var(--primary) / 0.5)",
        }}
      />
    </div>
  );
};

export default MouseGlow;
