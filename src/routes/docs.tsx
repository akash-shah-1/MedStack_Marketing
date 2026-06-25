import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Rocket, Code2, ShieldCheck, Workflow, Plug, ArrowRight, Search, Terminal, Sparkles } from "lucide-react";
import { PageShell } from "@/components/landing/PageShell";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Documentation — MedFlow AI" },
      { name: "description", content: "Implementation guides, API references, HL7/FHIR adapters and admin handbooks for MedFlow AI deployments." },
      { property: "og:title", content: "MedFlow AI Documentation" },
      { property: "og:description", content: "Everything your IT, clinical and revenue cycle teams need to deploy MedFlow AI confidently." },
    ],
  }),
  component: DocsPage,
});

const sections = [
  { icon: Rocket, color: "from-teal to-emerald", title: "Getting Started", desc: "From signed contract to first live ward in under 4 weeks.", items: ["Pre-flight checklist", "Tenant provisioning", "Master data import", "Go-live runbook"], time: "20 min read" },
  { icon: Workflow, color: "from-clinical to-teal", title: "Clinical Workflows", desc: "Templates for OPD, ER, ICU, OT, Maternity, and Day Care.", items: ["Order sets", "Escalation rules", "Forms designer", "e-Prescription"], time: "35 min read" },
  { icon: Plug, color: "from-emerald to-teal", title: "Integrations", desc: "HL7 v2, FHIR R4, REST APIs, webhooks and SFTP feeds.", items: ["LIS adapter", "PACS / DICOM", "TPA & payers", "ERP & GL"], time: "45 min read" },
  { icon: Code2, color: "from-teal-deep to-clinical", title: "Developer API", desc: "Typed SDKs in TypeScript and Python with full OpenAPI specs.", items: ["Authentication", "Rate limits", "Webhook signing", "Sandbox tenant"], time: "30 min read" },
  { icon: ShieldCheck, color: "from-emerald to-clinical", title: "Security & Compliance", desc: "Configure RBAC, audit exports and data residency.", items: ["Role design", "Audit trails", "Data residency", "BAA & DPA"], time: "25 min read" },
  { icon: BookOpen, color: "from-teal to-teal-deep", title: "Admin Handbook", desc: "Day-2 ops for hospital IT and operations teams.", items: ["User lifecycle", "Backup & DR", "Performance tuning", "Incident response"], time: "40 min read" },
];

const popular = [
  "How to onboard a new hospital in 4 weeks",
  "Configure FHIR R4 patient sync with your LIS",
  "Add a custom discharge summary template",
  "Set up role-based access for nursing supervisors",
  "Generate monthly TPA reconciliation report",
];

function DocsPage() {
  return (
    <PageShell
      eyebrow="Documentation"
      title={<>Build, integrate and operate <span className="text-gradient-brand">with confidence</span></>}
      subtitle="Implementation guides, API references and admin handbooks for every role in your hospital."
    >
      {/* Search + popular */}
      <section className="pb-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="glass-panel rounded-2xl p-3">
            <label className="flex items-center gap-3 px-3">
              <Search size={16} className="text-muted-foreground" />
              <input
                type="search"
                placeholder="Search 240+ articles — try ‘FHIR observation’ or ‘discharge summary’"
                className="w-full bg-transparent py-2 text-sm text-slate-ink outline-none placeholder:text-muted-foreground"
              />
              <kbd className="hidden rounded-md border border-border bg-white/70 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground sm:inline">⌘K</kbd>
            </label>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Popular:</span>
            {popular.map((p) => (
              <a key={p} href="#" className="rounded-full border border-border bg-white/60 px-3 py-1 text-xs text-slate-ink/80 transition hover:border-teal/50 hover:text-teal-deep">
                {p}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Sections grid */}
      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((s) => (
              <article key={s.title} className="glass-panel group rounded-2xl p-6 transition hover:-translate-y-1 hover:shadow-glow">
                <div className="flex items-center justify-between">
                  <span className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${s.color} text-primary-foreground shadow-glow`}>
                    <s.icon size={18} />
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{s.time}</span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-ink">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-slate-ink/80">
                  {s.items.map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-teal" /> {i}
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-deep transition group-hover:gap-2.5">
                  Browse section <ArrowRight size={14} />
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Quickstart code */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-soft/60 px-3 py-1 text-xs font-semibold text-emerald">
                <Sparkles size={12} /> 5-minute quickstart
              </span>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-ink">
                From npm install to your first FHIR call.
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Use our typed SDK to read patient encounters from your sandbox tenant. No real PHI required — every developer account gets a populated test hospital.
              </p>
              <Link to="/contact" className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow">
                Get sandbox access <ArrowRight size={14} />
              </Link>
            </div>
            <div className="glass-panel overflow-hidden rounded-2xl lg:col-span-3">
              <div className="flex items-center justify-between border-b border-border bg-white/60 px-4 py-2.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-ink">
                  <Terminal size={13} className="text-teal" /> quickstart.ts
                </div>
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-clinical/40" />
                  <span className="h-2.5 w-2.5 rounded-full bg-warn/40" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald/50" />
                </div>
              </div>
              <pre className="overflow-x-auto bg-slate-ink p-5 text-[12.5px] leading-relaxed text-white/90">
{`import { MedFlow } from "@medflow/sdk";

const mf = new MedFlow({
  tenant: "apollo-care",
  apiKey: process.env.MEDFLOW_API_KEY!,
});

// List today's encounters in the ICU
const encounters = await mf.fhir.encounter.search({
  ward: "ICU",
  date: "today",
});

console.log(\`\${encounters.length} active ICU encounters\`);`}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
