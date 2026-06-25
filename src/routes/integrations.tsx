import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { Integrations } from "@/components/landing/Integrations";
import { Plug, Webhook, Code2, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/integrations")({
  head: () => ({
    meta: [
      { title: "HL7 / FHIR Integrations — MedFlow AI" },
      { name: "description", content: "HL7 v2, FHIR R4, REST APIs, webhooks, and pre-built adapters for LIS, PACS, ERP, TPA and more." },
      { property: "og:title", content: "Integrations — MedFlow AI" },
      { property: "og:description", content: "Connect MedFlow AI to your existing clinical, financial, and communication stack." },
    ],
  }),
  component: IntegrationsPage,
});

const standards = [
  { icon: Plug, name: "HL7 v2.x", desc: "ADT, ORM, ORU, MDM, BAR, DFT message flows out of the box." },
  { icon: Code2, name: "FHIR R4", desc: "Patient, Encounter, Observation, MedicationRequest and 40+ resources." },
  { icon: Webhook, name: "REST + Webhooks", desc: "Typed SDKs, signed webhooks, idempotent retries, sandbox tenant." },
  { icon: ShieldCheck, name: "Security", desc: "mTLS, OAuth 2.0, IP allow-lists, per-tenant key isolation." },
];

function IntegrationsPage() {
  return (
    <PageShell
      eyebrow="Integrations"
      title={<>Connect <span className="text-gradient-brand">everything in your hospital</span></>}
      subtitle="From bedside monitors to your group accounting system — MedFlow AI speaks every standard the modern hospital runs on."
    >
      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {standards.map((s) => (
              <div key={s.name} className="glass-panel rounded-2xl p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-primary-foreground shadow-glow">
                  <s.icon size={18} />
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-ink">{s.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Integrations />
    </PageShell>
  );
}
