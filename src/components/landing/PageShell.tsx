import { useState, type ReactNode } from "react";
import { Nav } from "./Nav";
import { LeadCapture } from "./LeadCapture";
import { DemoModal } from "./DemoModal";

export function PageShell({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  children: ReactNode;
}) {
  const [demoOpen, setDemoOpen] = useState(false);
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav onDemo={() => setDemoOpen(true)} />

      <section className="relative pt-36 pb-16">
        <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-gradient-hero" />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass-panel px-3 py-1 text-xs font-medium text-teal-deep">
            {eyebrow}
          </span>
          <h1 className="mt-5 text-5xl font-bold tracking-tight text-slate-ink sm:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
        </div>
      </section>

      {children}

      <LeadCapture />
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </main>
  );
}
