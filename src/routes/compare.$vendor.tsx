import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { Reveal } from "@/components/landing/Reveal";
import { Check, X, ArrowRight } from "lucide-react";

type Row = { feature: string; us: string | boolean; them: string | boolean };

const VENDORS: Record<
  string,
  { name: string; tagline: string; summary: string; rows: Row[] }
> = {
  epic: {
    name: "Epic",
    tagline: "MedFlow AI vs Epic",
    summary:
      "Epic is the gold-standard EHR for very large academic networks. MedFlow gives mid-market hospitals 80% of that capability with a fraction of the cost, weeks (not years) to live, and a modern API surface.",
    rows: [
      { feature: "Time to go-live", us: "4–11 weeks", them: "12–36 months" },
      { feature: "Implementation cost", us: "Transparent, flat-fee", them: "$10M–$100M+" },
      { feature: "Modern REST + FHIR R4 API", us: true, them: "Partial" },
      { feature: "Built-in revenue cycle", us: true, them: true },
      { feature: "Live bed & OT command center", us: true, them: "Add-on" },
      { feature: "Voice-to-SOAP notes (native)", us: true, them: false },
      { feature: "Self-serve sandbox", us: true, them: false },
      { feature: "Pricing without enterprise sales cycle", us: true, them: false },
    ],
  },
  cerner: {
    name: "Cerner",
    tagline: "MedFlow AI vs Cerner (Oracle Health)",
    summary:
      "Cerner powers many large US hospital chains, with deep tenured workflows. MedFlow is faster to deploy, cheaper to operate, and ships modern AI + integrations that don't require a multi-year roadmap commitment.",
    rows: [
      { feature: "Time to go-live", us: "4–11 weeks", them: "9–24 months" },
      { feature: "Total cost of ownership (5y)", us: "1×", them: "5–10×" },
      { feature: "Native HL7 v2 + FHIR R4", us: true, them: true },
      { feature: "Multi-tenant cloud (single region opt-in)", us: true, them: "Limited" },
      { feature: "AI charting & summarization", us: true, them: "Roadmap" },
      { feature: "Built-in BCMA", us: true, them: true },
      { feature: "Open marketplace for adapters", us: true, them: false },
      { feature: "Hospital-grade SLA (99.99%)", us: true, them: true },
    ],
  },
};

export const Route = createFileRoute("/compare/$vendor")({
  head: ({ params }) => {
    const v = VENDORS[params.vendor.toLowerCase()];
    const title = v ? `${v.tagline} — MedFlow AI` : "Compare — MedFlow AI";
    const desc = v?.summary ?? "Compare MedFlow AI with leading hospital management systems.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  loader: ({ params }) => {
    const v = VENDORS[params.vendor.toLowerCase()];
    if (!v) throw notFound();
    return { v };
  },
  notFoundComponent: () => (
    <PageShell eyebrow="404" title="Comparison not found" subtitle="Try one of our published comparisons.">
      <div className="mx-auto max-w-3xl px-6 pb-24 text-center">
        <Link to="/" className="text-sm font-semibold text-teal">← Back home</Link>
      </div>
    </PageShell>
  ),
  component: Compare,
});

function Cell({ value }: { value: string | boolean }) {
  if (typeof value === "boolean")
    return value ? (
      <span className="inline-flex items-center gap-1.5 text-emerald"><Check size={16} /> Yes</span>
    ) : (
      <span className="inline-flex items-center gap-1.5 text-muted-foreground"><X size={16} /> No</span>
    );
  return <span className="text-slate-ink/85">{value}</span>;
}

function Compare() {
  const { v } = Route.useLoaderData();
  return (
    <PageShell
      eyebrow="Comparison"
      title={<>{v.tagline.split(" vs ")[0]} vs <span className="text-gradient-brand">{v.name}</span></>}
      subtitle={v.summary}
    >
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-border bg-white/70 shadow-glow">
            <div className="grid grid-cols-3 border-b border-border bg-gradient-to-br from-teal-glow/10 to-transparent text-sm font-semibold text-slate-ink">
              <div className="p-5">Feature</div>
              <div className="p-5 text-teal">MedFlow AI</div>
              <div className="p-5 text-slate-ink/70">{v.name}</div>
            </div>
            {v.rows.map((r: Row, i: number) => (
              <div
                key={r.feature}
                className={`grid grid-cols-3 items-center border-b border-border last:border-0 ${
                  i % 2 ? "bg-white/40" : ""
                }`}
              >
                <div className="p-5 text-sm font-medium text-slate-ink">{r.feature}</div>
                <div className="p-5 text-sm"><Cell value={r.us} /></div>
                <div className="p-5 text-sm"><Cell value={r.them} /></div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <div className="glass-panel rounded-3xl p-7">
            <h3 className="text-lg font-bold text-slate-ink">When to pick MedFlow</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-ink/85">
              <li>• You want to be live this quarter, not next year.</li>
              <li>• You need a modern API + AI surface out of the box.</li>
              <li>• Your TCO needs to fit a mid-market hospital budget.</li>
            </ul>
          </div>
          <div className="glass-panel rounded-3xl p-7">
            <h3 className="text-lg font-bold text-slate-ink">When to pick {v.name}</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-ink/85">
              <li>• You're a 2,000+ bed academic medical center.</li>
              <li>• You already have a multi-year strategic contract.</li>
              <li>• You need very long-tenured specialty workflows.</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-95"
          >
            See MedFlow on your data <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
