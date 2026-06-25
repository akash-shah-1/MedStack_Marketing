const logos = [
  "Apollo Care",
  "St. Marien",
  "Medanta",
  "NovaHealth",
  "Cleveland Reach",
  "Sunrise Group",
  "Aster Medix",
];

export function LogoCloud() {
  return (
    <section className="relative border-y border-border/70 bg-white/40 py-12 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Powering care delivery at
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {logos.map((l) => (
            <span
              key={l}
              className="font-display text-lg font-bold tracking-tight text-slate-ink/40 transition hover:text-teal-deep"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
