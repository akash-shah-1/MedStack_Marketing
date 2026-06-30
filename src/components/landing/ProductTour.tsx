import { useState } from "react";
import { BedDouble, Wallet, HeartPulse, Users, ChevronLeft, ChevronRight } from "lucide-react";

const stops = [
  {
    id: "occupancy",
    title: "Live Bed Occupancy",
    body: "Real-time map of every ward, ICU bay and OT — color-coded by acuity. Predictive holds reserve beds before discharge.",
    pos: { top: "18%", left: "16%" },
    icon: BedDouble,
  },
  {
    id: "queue",
    title: "Consultation Queue",
    body: "Smart triage routes patients to the right consultant. Wait times surface to reception in real time.",
    pos: { top: "62%", left: "70%" },
    icon: Users,
  },
  {
    id: "vitals",
    title: "Continuous Vitals",
    body: "Wearables and bedside monitors stream into one timeline. Drift alerts go straight to the on-call nurse.",
    pos: { top: "44%", left: "76%" },
    icon: HeartPulse,
  },
  {
    id: "revenue",
    title: "Revenue Pulse",
    body: "POS, insurance and TPA collections update every 15 seconds. Claim scrubbing catches rejections before submission.",
    pos: { top: "26%", left: "54%" },
    icon: Wallet,
  },
];

export function ProductTour() {
  const [active, setActive] = useState(0);
  const stop = stops[active];

  const next = () => setActive((i) => (i + 1) % stops.length);
  const prev = () => setActive((i) => (i - 1 + stops.length) % stops.length);

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass-panel px-3 py-1 text-xs font-medium text-teal-deep">
            Interactive tour
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-ink sm:text-5xl">
            Click around the <span className="text-gradient-brand">command center</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tap any hotspot to see how each surface works in production.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <div className="relative lg:col-span-3">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-gradient-to-br from-slate-ink to-[oklch(0.2_0.04_220)] p-6 shadow-glow">
              {/* fake dashboard layers */}
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="relative grid h-full grid-cols-3 gap-3">
                <div className="col-span-2 rounded-xl bg-white/5 p-4">
                  <div className="h-3 w-24 rounded bg-white/15" />
                  <div className="mt-4 grid grid-cols-8 gap-1.5">
                    {Array.from({ length: 32 }).map((_, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded ${
                          i % 5 === 0 ? "bg-emerald/70" : i % 7 === 0 ? "bg-warn/70" : i % 11 === 0 ? "bg-critical/70" : "bg-clinical/60"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="rounded-xl bg-white/5 p-4">
                    <div className="h-3 w-16 rounded bg-white/15" />
                    <div className="mt-3 h-8 rounded bg-emerald/30" />
                  </div>
                  <div className="rounded-xl bg-white/5 p-4">
                    <div className="h-3 w-16 rounded bg-white/15" />
                    <div className="mt-3 space-y-1.5">
                      {[60, 80, 45].map((w, i) => (
                        <div key={i} className="h-2 rounded bg-white/10" style={{ width: `${w}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* hotspots */}
              {stops.map((s, i) => {
                const isActive = i === active;
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActive(i)}
                    aria-label={s.title}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ top: s.pos.top, left: s.pos.left }}
                  >
                    <span className="relative grid h-9 w-9 place-items-center rounded-full bg-white text-teal-deep shadow-glow">
                      <Icon size={16} />
                      <span
                        className={`absolute inset-0 rounded-full ${
                          isActive ? "ring-4 ring-teal-glow/60 animate-pulse-glow" : "ring-2 ring-white/40"
                        }`}
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="glass-panel flex h-full flex-col rounded-3xl p-7">
              <div className="text-xs uppercase tracking-wider text-teal-deep">
                Step {active + 1} of {stops.length}
              </div>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-ink">{stop.title}</h3>
              <p className="mt-3 flex-1 text-muted-foreground">{stop.body}</p>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex gap-1.5">
                  {stops.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`h-1.5 rounded-full transition ${
                        i === active ? "w-8 bg-teal" : "w-2 bg-slate-ink/20"
                      }`}
                      aria-label={`Go to step ${i + 1}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={prev} className="grid h-9 w-9 place-items-center rounded-full glass-panel hover:bg-white">
                    <ChevronLeft size={16} />
                  </button>
                  <button onClick={next} className="grid h-9 w-9 place-items-center rounded-full bg-brand text-primary-foreground shadow-glow">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
