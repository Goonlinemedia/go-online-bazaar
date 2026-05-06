import { useEffect, useState } from "react";

const FloatingBlobs = () => {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.6), transparent 70%)",
          filter: "blur(80px)",
          transform: `translate3d(0, ${y * 0.15}px, 0)`,
        }}
      />
      <div
        className="absolute top-1/3 -right-60 w-[700px] h-[700px] rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, hsl(var(--accent) / 0.7), transparent 70%)",
          filter: "blur(90px)",
          transform: `translate3d(0, ${-y * 0.2}px, 0)`,
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, hsl(var(--teal-light) / 0.6), transparent 70%)",
          filter: "blur(80px)",
          transform: `translate3d(0, ${-y * 0.1}px, 0)`,
        }}
      />
    </div>
  );
};

export default FloatingBlobs;
