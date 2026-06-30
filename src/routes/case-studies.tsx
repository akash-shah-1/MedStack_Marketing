import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { Reveal } from "@/components/landing/Reveal";
import { ArrowRight, Building2, TrendingUp, Clock, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — MedFlow AI" },
      { name: "description", content: "How real hospitals cut claim rejections, lifted bed turnover and shortened AR cycles with MedFlow AI." },
      { property: "og:title", content: "Case Studies — MedFlow AI" },
      { property: "og:description", content: "Three hospital networks. Three rollouts. Real measurable outcomes." },
    ],
  }),
  component: CaseStudies,
});

const stories = [
  {
    slug: "apollo-care",
    hospital: "Apollo Care Network",
    region: "Bengaluru · 4 facilities · 820 beds",
    problem:
      "Disconnected EHR, billing and bed boards meant 38-minute discharge cycles and a 14% claim rejection rate.",
    rollout: "Replaced 3 systems across 4 facilities in 11 weeks, with parallel run on the cardiology wing first.",
    outcomes: [
      { icon: TrendingUp, value: "+27%", label: "bed turnover" },
      { icon: Clock, value: "-62%", label: "discharge time" },
      { icon: ShieldCheck, value: "-71%", label: "claim rejections" },
    ],
    quote:
      "We unified four hospitals on MedFlow without a single missed shift. The bed map alone paid for the rollout.",
    by: "Dr. Anjali Rao · CMO",
  },
  {
    slug: "st-marien",
    hospital: "St. Marien Hospital",
    region: "Munich · 1 tertiary care · 540 beds",
    problem:
      "Manual roster planning was burning 90 hours/week and OT utilization hovered at 61%.",
    rollout: "Phased: roster → OT scheduling → ER triage. Live in 6 weeks with HL7 v2 bridges to legacy LIS.",
    outcomes: [
      { icon: TrendingUp, value: "+22%", label: "OT utilization" },
      { icon: Clock, value: "82 hrs/wk", label: "staff time saved" },
      { icon: ShieldCheck, value: "100%", label: "NABH audit pass" },
    ],
    quote:
      "MedFlow doesn't fight our workflow — it amplifies it. Our consultants notice the difference within a shift.",
    by: "Dr. K. Schmidt · Chief of Surgery",
  },
  {
    slug: "northbay",
    hospital: "NorthBay Children's",
    region: "Toronto · pediatric specialty · 180 beds",
    problem:
      "Pediatric dosing errors and family communication gaps were the top patient-safety incidents in 2024.",
    rollout: "Replaced charting and BCMA in 4 weeks. Custom weight-based dosing rules and family portal launched together.",
    outcomes: [
      { icon: TrendingUp, value: "0", label: "dosing incidents since launch" },
      { icon: Clock, value: "-44%", label: "med-pass time" },
      { icon: ShieldCheck, value: "+38 NPS", label: "from families" },
    ],
    quote:
      "The pediatric dosing engine has caught what 12 years of double-checks never could. It's our safety net.",
    by: "L. Hoffman · Director of Nursing",
  },
];

function CaseStudies() {
  return (
    <PageShell
      eyebrow="Customer stories"
      title={<>Real hospitals. <span className="text-gradient-brand">Real outcomes.</span></>}
      subtitle="Problem → rollout → measurable results, from three networks running MedFlow today."
    >
      <section className="mx-auto max-w-7xl space-y-10 px-4 pb-24 sm:px-6">
        {stories.map((s, idx) => (
          <Reveal key={s.slug}>
            <article className="glass-panel grid gap-8 rounded-3xl p-7 sm:p-10 lg:grid-cols-3">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-teal-glow/20 px-3 py-1 text-xs font-medium text-teal-deep">
                  <Building2 size={13} /> Case study {String(idx + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-ink">{s.hospital}</h2>
                <div className="mt-1 text-sm text-muted-foreground">{s.region}</div>
                <blockquote className="mt-6 border-l-2 border-teal pl-4 text-sm italic text-slate-ink/85">
                  "{s.quote}"
                  <footer className="mt-2 not-italic text-xs text-muted-foreground">— {s.by}</footer>
                </blockquote>
              </div>
              <div className="space-y-5 lg:col-span-2">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-critical">Problem</div>
                  <p className="mt-1 text-slate-ink/85">{s.problem}</p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-clinical">Rollout</div>
                  <p className="mt-1 text-slate-ink/85">{s.rollout}</p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-emerald">Outcomes</div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {s.outcomes.map((o) => (
                      <div key={o.label} className="rounded-2xl border border-border bg-white/60 p-4">
                        <o.icon size={16} className="text-teal" />
                        <div className="mt-2 text-2xl font-bold text-slate-ink">{o.value}</div>
                        <div className="text-xs text-muted-foreground">{o.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}

        <div className="text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-95"
          >
            Talk to a customer like yours <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
