import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { Integrations } from "@/components/landing/Integrations";
import { Plug, Webhook, Code2, ShieldCheck, ArrowRight, Database, Server, Hospital, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/integrations")({
  head: () => ({
    meta: [
      { title: "HL7 / FHIR Integrations — MedFlow AI" },
      { name: "description", content: "HL7 v2, FHIR R4, REST APIs, webhooks and pre-built adapters for LIS, PACS, ERP, TPA and more." },
      { property: "og:title", content: "Integrations — MedFlow AI" },
      { property: "og:description", content: "Connect MedFlow AI to your existing clinical, financial and communication stack." },
    ],
  }),
  component: IntegrationsPage,
});

const standards = [
  { icon: Plug, name: "HL7 v2.x", desc: "ADT, ORM, ORU, MDM, BAR, DFT message flows out of the box.", messages: ["ADT^A01–A60", "ORM^O01", "ORU^R01", "MDM^T02"] },
  { icon: Code2, name: "FHIR R4", desc: "Patient, Encounter, Observation, MedicationRequest and 40+ resources.", messages: ["Patient", "Encounter", "Observation", "Bundle"] },
  { icon: Webhook, name: "REST + Webhooks", desc: "Typed SDKs, signed webhooks, idempotent retries, sandbox tenant.", messages: ["OpenAPI 3.1", "HMAC SHA-256", "Idempotency-Key", "Cursor pagination"] },
  { icon: ShieldCheck, name: "Security", desc: "mTLS, OAuth 2.0, IP allow-lists, per-tenant key isolation.", messages: ["OAuth 2.0", "mTLS", "JWT", "IP allow-list"] },
];

const adapters = [
  { name: "Roche cobas / Sysmex LIS", category: "Laboratory", protocol: "HL7 v2.5 + ASTM" },
  { name: "GE / Philips PACS", category: "Imaging", protocol: "DICOM + HL7" },
  { name: "SAP S/4HANA Finance", category: "ERP", protocol: "REST + iDoc" },
  { name: "Bajaj Allianz / Aetna TPA", category: "Insurance", protocol: "Swagger REST" },
  { name: "Twilio · MSG91 · WhatsApp", category: "Comms", protocol: "REST + webhook" },
  { name: "Razorpay · Stripe · Adyen", category: "Payments", protocol: "REST + webhook" },
  { name: "ABDM (India) / NHS England", category: "Health network", protocol: "FHIR R4" },
  { name: "Workday HCM / SAP SuccessFactors", category: "HR & roster", protocol: "REST + SCIM" },
];

const flow = [
  { icon: Hospital, label: "Your hospital systems", sub: "LIS · PACS · ERP · TPA" },
  { icon: Server, label: "MedFlow Gateway", sub: "Routing · transform · retry" },
  { icon: Database, label: "MedFlow Platform", sub: "EHR · Billing · Reporting" },
];

function IntegrationsPage() {
  return (
    <PageShell
      eyebrow="HL7 · FHIR · REST"
      title={<>Connect <span className="text-gradient-brand">everything in your hospital</span></>}
      subtitle="From bedside monitors to your group accounting system — MedFlow AI speaks every standard the modern hospital runs on."
    >
      {/* Standards */}
      <section className="pb-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {standards.map((s) => (
              <div key={s.name} className="glass-panel rounded-2xl p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-primary-foreground shadow-glow">
                  <s.icon size={18} />
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-ink">{s.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {s.messages.map((m) => (
                    <span key={m} className="rounded-md bg-emerald-soft/60 px-2 py-0.5 font-mono text-[10px] font-semibold text-teal-deep">{m}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture diagram */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="glass-panel rounded-3xl p-8">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-soft/60 px-3 py-1 text-xs font-semibold text-emerald">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse-glow" /> How data flows
              </span>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-ink">A single gateway, every protocol</h3>
            </div>
            <div className="relative mt-10 grid items-center gap-6 md:grid-cols-3">
              {/* connector lines */}
              <div className="pointer-events-none absolute inset-x-12 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-teal/40 via-emerald/40 to-teal/40 md:block" />
              {flow.map((f, i) => (
                <div key={f.label} className="relative z-10 flex flex-col items-center text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-2xl bg-brand text-primary-foreground shadow-glow">
                    <f.icon size={26} />
                  </span>
                  <div className="mt-3 text-sm font-bold text-slate-ink">{f.label}</div>
                  <div className="text-[11px] text-muted-foreground">{f.sub}</div>
                  {i < flow.length - 1 && (
                    <span className="mt-3 text-xs text-teal md:hidden">↓</span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-3 text-sm text-slate-ink/80 sm:grid-cols-3">
              {[
                "End-to-end TLS 1.3 with mTLS option per endpoint",
                "Automatic schema mapping with side-by-side diff viewer",
                "Replay, retry, and dead-letter queues per integration",
              ].map((t) => (
                <div key={t} className="flex items-start gap-2 rounded-xl border border-border bg-white/60 p-3">
                  <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald" /> {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Adapter directory */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-ink">Pre-built adapters</h2>
              <p className="mt-1 text-sm text-muted-foreground">80+ certified connectors. New adapters ship monthly.</p>
            </div>
            <Link to="/contact" className="hidden text-sm font-semibold text-teal-deep hover:text-teal sm:inline-flex">
              Request an adapter →
            </Link>
          </div>
          <div className="mt-6 glass-panel overflow-hidden rounded-2xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3 font-semibold">Adapter</th>
                  <th className="px-5 py-3 font-semibold">Category</th>
                  <th className="px-5 py-3 font-semibold">Protocol</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {adapters.map((a) => (
                  <tr key={a.name} className="border-b border-border/60 last:border-0 hover:bg-emerald-soft/20">
                    <td className="px-5 py-4 font-medium text-slate-ink">{a.name}</td>
                    <td className="px-5 py-4 text-muted-foreground">{a.category}</td>
                    <td className="px-5 py-4 font-mono text-[12px] text-slate-ink/80">{a.protocol}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald/10 px-2.5 py-1 text-[11px] font-semibold text-emerald">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald" /> Certified
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 text-center">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
              Don't see your system? Talk to our integrations team <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Integrations />
    </PageShell>
  );
}
