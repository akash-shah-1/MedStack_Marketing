import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Rocket, Code2, ShieldCheck, Workflow, Plug, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/landing/PageShell";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Documentation — MedFlow AI" },
      { name: "description", content: "Implementation guides, API references, HL7/FHIR adapters, and admin handbooks for MedFlow AI deployments." },
      { property: "og:title", content: "MedFlow AI Documentation" },
      { property: "og:description", content: "Everything your IT, clinical, and revenue cycle teams need to deploy MedFlow AI confidently." },
    ],
  }),
  component: DocsPage,
});

const sections = [
  { icon: Rocket, title: "Getting Started", desc: "From signed contract to first live ward in under 4 weeks.", items: ["Pre-flight checklist", "Tenant provisioning", "Master data import", "Go-live runbook"] },
  { icon: Workflow, title: "Clinical Workflows", desc: "Templates for OPD, ER, ICU, OT, Maternity, and Day Care.", items: ["Order sets", "Escalation rules", "Forms designer", "e-Prescription"] },
  { icon: Plug, title: "Integrations", desc: "HL7 v2, FHIR R4, REST APIs, webhooks, and SFTP feeds.", items: ["LIS adapter", "PACS / DICOM", "TPA & payers", "ERP & GL"] },
  { icon: Code2, title: "Developer API", desc: "Typed SDKs in TypeScript and Python with full OpenAPI specs.", items: ["Authentication", "Rate limits", "Webhook signing", "Sandbox tenant"] },
  { icon: ShieldCheck, title: "Security & Compliance", desc: "Configure RBAC, audit exports, and data residency.", items: ["Role design", "Audit trails", "Data residency", "BAA & DPA"] },
  { icon: BookOpen, title: "Admin Handbook", desc: "Day-2 ops for hospital IT and operations teams.", items: ["User lifecycle", "Backup & DR", "Performance tuning", "Incident response"] },
];

function DocsPage() {
  return (
    <PageShell
      eyebrow="Documentation"
      title={<>Build, integrate, and operate <span className="text-gradient-brand">with confidence</span></>}
      subtitle="Implementation guides, API references, and admin handbooks for every role in your hospital."
    >
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((s) => (
              <div key={s.title} className="glass-panel group rounded-2xl p-6 transition hover:-translate-y-0.5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-primary-foreground shadow-glow">
                  <s.icon size={18} />
                </span>
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
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
              Need a private knowledge base? Talk to us <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
