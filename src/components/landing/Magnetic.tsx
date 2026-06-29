import { useRef, type ReactNode, type ElementType, type ComponentPropsWithoutRef } from "react";

type MagneticProps<T extends ElementType> = {
  as?: T;
  strength?: number;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

export function Magnetic<T extends ElementType = "button">({
  as,
  strength = 0.35,
  children,
  className = "",
  ...rest
}: MagneticProps<T>) {
  const Tag = (as || "button") as ElementType;
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

  return (
    <Tag
      ref={ref as never}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`inline-block transition-transform duration-300 ease-out will-change-transform ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
