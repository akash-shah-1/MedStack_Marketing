import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { Reveal } from "@/components/landing/Reveal";
import { ArrowRight, Clock } from "lucide-react";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Insights — MedFlow AI Blog" },
      { name: "description", content: "Playbooks, benchmarks and product deep-dives for modern hospital teams." },
      { property: "og:title", content: "Insights — MedFlow AI Blog" },
      { property: "og:description", content: "HL7 vs FHIR, reducing claim rejections, and other hard-won lessons." },
    ],
  }),
  component: Blog,
});

export const POSTS = [
  {
    slug: "hl7-vs-fhir",
    category: "Interoperability",
    title: "HL7 v2 vs FHIR R4: which one should your hospital adopt first?",
    excerpt:
      "FHIR is the future — but most hospital systems still speak HL7 v2. A practical guide to deciding what to integrate now, and what to defer.",
    read: "8 min",
    date: "Jun 24, 2026",
  },
  {
    slug: "claim-rejections",
    category: "Revenue cycle",
    title: "Reducing claim rejections by 38% — without hiring more billers",
    excerpt:
      "What 60 hospitals taught us about pre-submission scrubbing, payer rule libraries and denial root-cause analytics.",
    read: "11 min",
    date: "Jun 12, 2026",
  },
  {
    slug: "bed-turnover",
    category: "Operations",
    title: "The bed turnover playbook: from 9.4 hours to 3.1",
    excerpt:
      "Predictive discharge holds, cleaning queue automation, and the unglamorous SOPs that actually move the needle.",
    read: "7 min",
    date: "May 30, 2026",
  },
  {
    slug: "nurse-burnout",
    category: "Workforce",
    title: "Nurse burnout is a UI problem (mostly)",
    excerpt:
      "We watched 240 hours of shifts. The friction wasn't volume — it was navigation. Here's what we redesigned.",
    read: "9 min",
    date: "May 18, 2026",
  },
  {
    slug: "rbac-for-hospitals",
    category: "Security",
    title: "Role-based access for hospitals isn't optional anymore",
    excerpt:
      "Why the 'all consultants see all charts' model fails HIPAA audits — and how to fix it without breaking workflows.",
    read: "6 min",
    date: "May 04, 2026",
  },
  {
    slug: "ai-triage",
    category: "AI",
    title: "Where AI actually helps in the ER (and where it doesn't)",
    excerpt:
      "A skeptical look at AI triage: what beats clinicians, what augments them, and what to skip until 2027.",
    read: "12 min",
    date: "Apr 22, 2026",
  },
];

function Blog() {
  return (
    <PageShell
      eyebrow="Insights"
      title={<>Field notes from <span className="text-gradient-brand">running hospitals</span></>}
      subtitle="Playbooks, benchmarks and product deep-dives. Written by clinicians and engineers, not marketers."
    >
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p) => (
            <Reveal key={p.slug}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group glass-panel flex h-full flex-col rounded-3xl p-6 transition hover:bg-white"
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-teal">{p.category}</div>
                <h3 className="mt-2 text-lg font-bold text-slate-ink">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
                <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><Clock size={12} /> {p.read} · {p.date}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-teal transition group-hover:translate-x-0.5">
                    Read <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
