import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";

export function StickyMobileCTA({ onDemo }: { onDemo: () => void }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={`fixed inset-x-0 bottom-3 z-40 px-3 md:hidden transition-all duration-300 ${
        show ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"
      }`}
    >
      <button
        onClick={onDemo}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow"
      >
        <Calendar size={16} />
        Book a 20-min demo
      </button>
    </div>
  );
}
