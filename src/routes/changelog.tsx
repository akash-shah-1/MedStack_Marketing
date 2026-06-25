import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";

export const Route = createFileRoute("/changelog")({
  head: () => ({
    meta: [
      { title: "Changelog — MedFlow AI" },
      { name: "description", content: "New features, improvements, and fixes shipped to the MedFlow AI hospital management platform." },
      { property: "og:title", content: "MedFlow AI Changelog" },
      { property: "og:description", content: "What we shipped this month — clinical, billing, integrations, and platform updates." },
    ],
  }),
  component: ChangelogPage,
});

const entries = [
  {
    date: "June 18, 2026",
    tag: "Release",
    title: "Bed Forecasting v2",
    points: [
      "New ML-based 6-hour bed availability forecast per ward",
      "Auto-notifies ER charge nurse 90 minutes before saturation",
      "Available on Professional and Enterprise plans",
    ],
  },
  {
    date: "June 04, 2026",
    tag: "Improvement",
    title: "Faster claims worklist",
    points: [
      "Claims queue loads 3.4× faster on hospitals with 50K+ monthly encounters",
      "New bulk actions: re-bill, write-off, escalate to TPA",
    ],
  },
  {
    date: "May 22, 2026",
    tag: "Integration",
    title: "FHIR R4 MedicationDispense",
    points: [
      "Pharmacy dispense events now emit MedicationDispense FHIR resources",
      "Two new partner integrations: PharmEasy Hospital, Apollo Pharmacy",
    ],
  },
  {
    date: "May 06, 2026",
    tag: "Security",
    title: "Per-tenant KMS rotation",
    points: [
      "Customer-managed keys now rotate on a configurable schedule",
      "Audit log surfaces rotation events with operator attribution",
    ],
  },
];

const tagTone: Record<string, string> = {
  Release: "bg-teal/15 text-teal-deep",
  Improvement: "bg-emerald/15 text-emerald",
  Integration: "bg-clinical/15 text-clinical",
  Security: "bg-warn/15 text-amber-700",
};

function ChangelogPage() {
  return (
    <PageShell
      eyebrow="Changelog"
      title={<>What we <span className="text-gradient-brand">shipped recently</span></>}
      subtitle="A running log of releases, improvements, integrations, and security updates. Updated weekly."
    >
      <section className="pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-6">
            {entries.map((e) => (
              <article key={e.title} className="glass-panel rounded-2xl p-7">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="text-muted-foreground">{e.date}</span>
                  <span className={`rounded-full px-2.5 py-0.5 font-semibold ${tagTone[e.tag]}`}>{e.tag}</span>
                </div>
                <h3 className="mt-3 text-xl font-bold text-slate-ink">{e.title}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {e.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" /> {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
