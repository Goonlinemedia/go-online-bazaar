import { useEffect, useRef, useState } from "react";

const MouseGlow = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    target.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    ring.current = { ...target.current };

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 5}px, ${e.clientY - 5}px, 0)`;
      }
      const t = e.target as HTMLElement | null;
      const isInteractive = !!t?.closest("a, button, [role='button'], input, textarea, select, label");
      setHovering(isInteractive);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    let raf = 0;
    const tick = () => {
      ring.current.x += (target.current.x - ring.current.x) * 0.18;
      ring.current.y += (target.current.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x - 18}px, ${ring.current.y - 18}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    document.documentElement.style.cursor = "none";
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
      document.documentElement.style.cursor = "";
    };
  }, [visible]);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border transition-[width,height,opacity,background-color,border-color] duration-200 ease-out"
        style={{
          width: hovering ? 56 : 36,
          height: hovering ? 56 : 36,
          marginLeft: hovering ? -10 : 0,
          marginTop: hovering ? -10 : 0,
          borderColor: "hsl(var(--accent) / 0.7)",
          backgroundColor: hovering ? "hsl(var(--accent) / 0.15)" : "transparent",
          opacity: visible ? 1 : 0,
          willChange: "transform",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-2.5 h-2.5 rounded-full"
        style={{
          backgroundColor: "hsl(var(--primary))",
          boxShadow: "0 0 12px hsl(var(--primary) / 0.7)",
          opacity: visible ? 1 : 0,
          willChange: "transform",
        }}
      />
    </>
  );
};

export default MouseGlow;
