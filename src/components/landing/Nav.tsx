import { useState } from "react";
import { Activity, Menu, X } from "lucide-react";
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
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-3 z-40 flex justify-center px-3 sm:top-4 sm:px-4">
      <div className="w-full max-w-6xl">
        <nav className="glass-panel flex items-center justify-between gap-2 rounded-full px-3 py-2 sm:px-6 sm:py-2.5">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-brand text-primary-foreground shadow-glow">
              <Activity size={16} strokeWidth={2.5} />
            </span>
            <span className="truncate text-base font-bold tracking-tight text-slate-ink">
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

          <div className="flex items-center gap-1.5">
            <button
              onClick={onDemo}
              className="hidden rounded-full bg-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95 sm:inline-flex"
            >
              Book a Demo
            </button>
            <button
              onClick={onDemo}
              className="rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow sm:hidden"
            >
              Demo
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-white/70 text-slate-ink md:hidden"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <div
          className={`md:hidden grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ${
            open ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0">
            <div className="glass-panel rounded-3xl p-3">
              <ul className="flex flex-col">
                {links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-ink hover:bg-teal-glow/15"
                      activeProps={{ className: "text-teal bg-teal-glow/15" }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
