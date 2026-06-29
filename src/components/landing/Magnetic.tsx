import { useRef, type ReactNode } from "react";

type MagneticProps = {
  as?: "button" | "a";
  strength?: number;
  className?: string;
  children: ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  type?: "button" | "submit" | "reset";
};

export function Magnetic({
  as = "button",
  strength = 0.35,
  children,
  className = "",
  ...rest
}: MagneticProps) {
  const ref = useRef<HTMLElement | null>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };
  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0,0)";
  };

  const sharedProps = {
    ref: ref as never,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    className: `inline-block transition-transform duration-300 ease-out will-change-transform ${className}`,
    ...rest,
  };

  if (as === "a") {
    return <a {...(sharedProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>{children}</a>;
  }
  return <button {...(sharedProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}>{children}</button>;
}
