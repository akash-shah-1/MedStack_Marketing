import { Activity } from "lucide-react";
import { Link } from "@tanstack/react-router";

const links = [
  { label: "Features", to: "/features" },
  { label: "Pricing", to: "/pricing" },
  { label: "Security", to: "/security" },
  { label: "Team", to: "/team" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;


export function Nav({ onDemo }: { onDemo: () => void }) {
  return (
    <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-4">
      <nav className="glass-panel flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-2.5 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand text-primary-foreground shadow-glow">
            <Activity size={16} strokeWidth={2.5} />
          </span>
          <span className="text-base font-bold tracking-tight text-slate-ink">
            MedFlow<span className="text-teal">AI</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-slate-ink/75 transition hover:text-teal"
              activeProps={{ className: "text-teal" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <button
          onClick={onDemo}
          className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95"
        >
          Book a Demo
        </button>
      </nav>
    </header>
  );
}
