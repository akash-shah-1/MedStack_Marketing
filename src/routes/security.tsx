import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { Trust } from "@/components/landing/Trust";
import { ShieldCheck, Lock, FileCheck, Activity, KeyRound, ServerCog } from "lucide-react";

const pillars = [
  {
    icon: Lock,
    title: "Encryption at every layer",
    desc: "AES-256 at rest, TLS 1.3 in transit, and per-tenant key isolation. Optional BYOK with HSM-backed key custody on Enterprise.",
  },
  {
    icon: ShieldCheck,
    title: "Role-based access control",
    desc: "Granular permissions for clinical, billing and administrative roles, with SSO/SAML, SCIM provisioning and step-up auth for sensitive actions.",
  },
  {
    icon: Activity,
    title: "Full audit trails",
    desc: "Every clinical write, prescription, billing edit and record view is signed, timestamped, and exportable for compliance review.",
  },
  {
    icon: FileCheck,
    title: "HIPAA · GDPR · HL7/FHIR",
    desc: "Aligned with HIPAA Security Rule and GDPR Article 32 controls. Native HL7 v2 and FHIR R4 interfaces for safe data exchange.",
  },
  {
    icon: KeyRound,
    title: "Data residency",
    desc: "Choose your region — US, EU, India or Middle East — with documented sub-processors and zero cross-region replication by default.",
  },
  {
    icon: ServerCog,
    title: "Resilience & recovery",
    desc: "Multi-AZ deployment, point-in-time recovery up to 35 days, and quarterly DR drills with documented RPO/RTO targets.",
  },
];

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security & Compliance — MedFlow AI" },
      {
        name: "description",
        content:
          "How MedFlow AI protects patient data: encryption, access controls, audit trails, HIPAA, GDPR, HL7/FHIR alignment, and resilience.",
      },
      { property: "og:title", content: "Security & Compliance — MedFlow AI" },
      {
        property: "og:description",
        content: "Defense-in-depth controls protecting every patient record, every clinical action and every transaction.",
      },
    ],
  }),
  component: SecurityPage,
});

function SecurityPage() {
  return (
    <PageShell
      eyebrow="Trust · Security"
      title={<>Patient data, <span className="text-gradient-brand">protected at every layer.</span></>}
      subtitle="MedFlow AI is engineered for healthcare's strictest regulatory environments — with defense-in-depth controls baked into every module."
    >
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <article key={p.title} className="glass-panel rounded-3xl p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand text-primary-foreground shadow-glow">
                    <Icon size={18} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-slate-ink">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <Trust />
    </PageShell>
  );
}
