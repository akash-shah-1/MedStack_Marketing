import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      setP(pct);
      raf = 0;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-[3px] bg-transparent pointer-events-none"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-teal-deep via-teal to-emerald shadow-[0_0_12px_rgba(45,200,180,0.6)] transition-[width] duration-75"
        style={{ width: `${p}%` }}
      />
    </div>
  );
}
