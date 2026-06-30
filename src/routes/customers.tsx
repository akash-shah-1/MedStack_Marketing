import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { Reveal } from "@/components/landing/Reveal";
import { ArrowRight, BedDouble, Activity, Wallet } from "lucide-react";

export const Route = createFileRoute("/customers")({
  head: () => ({
    meta: [
      { title: "Customers — MedFlow AI" },
      { name: "description", content: "200+ hospitals across 14 countries run their daily operations on MedFlow AI." },
      { property: "og:title", content: "Customers — MedFlow AI" },
      { property: "og:description", content: "From 80-bed clinics to 1,200-bed networks — see who runs on MedFlow." },
    ],
  }),
  component: Customers,
});

const logos = [
  "Apollo Care", "St. Marien", "NorthBay", "Greenfield Health", "Sunrise Medical",
  "Lakeside Heart", "Cedar Children's", "Harbor Ortho", "MetroCity Med", "BlueRidge Care",
  "Pinewood ICU", "Riverbend Group",
];

const featured = [
  {
    name: "Apollo Care Network",
    region: "India · 820 beds",
    blurb: "Unified 4 facilities, lifted bed turnover by 27%.",
    icon: BedDouble,
  },
  {
    name: "St. Marien Hospital",
    region: "Germany · 540 beds",
    blurb: "OT utilization 61% → 83% in two quarters.",
    icon: Activity,
  },
  {
    name: "NorthBay Children's",
    region: "Canada · 180 beds",
    blurb: "Zero dosing incidents since launch.",
    icon: Wallet,
  },
];

function Customers() {
  return (
    <PageShell
      eyebrow="Our customers"
      title={<>200+ care networks <span className="text-gradient-brand">choose MedFlow</span></>}
      subtitle="From neighborhood clinics to multi-site networks, MedFlow runs daily clinical and revenue operations across 14 countries."
    >
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <Reveal>
          <div className="glass-panel rounded-3xl p-8">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-ink">
              Trusted by clinical leaders worldwide
            </div>
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
              {logos.map((l) => (
                <div
                  key={l}
                  className="grid place-items-center rounded-xl border border-border bg-white/60 px-4 py-5 text-center text-sm font-semibold text-slate-ink/80"
                >
                  {l}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {featured.map((f) => (
              <div key={f.name} className="glass-panel rounded-3xl p-6">
                <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-ink to-teal-deep p-5">
                  <div className="grid h-full grid-cols-6 gap-1.5 opacity-80">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded ${
                          i % 4 === 0 ? "bg-emerald/70" : i % 5 === 0 ? "bg-warn/70" : "bg-white/15"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-2 text-teal">
                  <f.icon size={16} />
                  <span className="text-xs font-semibold uppercase tracking-wider">{f.region}</span>
                </div>
                <h3 className="mt-1 text-lg font-bold text-slate-ink">{f.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.blurb}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 text-center">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-95"
          >
            Read the case studies <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
