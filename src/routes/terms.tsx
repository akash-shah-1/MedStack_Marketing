import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — MedFlow AI" },
      { name: "description", content: "The terms governing your use of the MedFlow AI hospital management platform." },
      { property: "og:title", content: "MedFlow AI Terms of Service" },
      { property: "og:description", content: "Acceptable use, service levels, fees, and liability for the MedFlow AI platform." },
    ],
  }),
  component: TermsPage,
});

const sections = [
  { title: "1. Agreement", body: "These Terms govern access to the MedFlow AI platform. Enterprise customers operate under a signed Master Services Agreement that supersedes any conflicting clause here." },
  { title: "2. Acceptable use", body: "Customers may not attempt to compromise platform security, reverse engineer the service, or use it to violate applicable law, including healthcare regulations in the country of operation." },
  { title: "3. Service levels", body: "Production tenants are covered by a 99.95% uptime SLA, with credits issued for any month that falls below the threshold. Maintenance windows are announced 7 days in advance." },
  { title: "4. Fees and renewal", body: "Subscriptions auto-renew for successive terms unless either party gives 60 days' notice. Fees are billed annually in advance unless otherwise agreed." },
  { title: "5. Confidentiality", body: "Each party will protect the other's confidential information with at least the standard of care used for its own confidential information, and never less than reasonable care." },
  { title: "6. Liability", body: "Except for breach of confidentiality, indemnification obligations, or willful misconduct, each party's aggregate liability is capped at fees paid in the prior 12 months." },
  { title: "7. Governing law", body: "These Terms are governed by the laws of Delaware, USA, with exclusive jurisdiction in state and federal courts located in Wilmington, Delaware." },
];

function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title={<>Terms of <span className="text-gradient-brand">Service</span></>}
      subtitle="Last updated June 25, 2026. The terms that govern access to the MedFlow AI platform."
    >
      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-6 space-y-6">
          {sections.map((s) => (
            <div key={s.title} className="glass-panel rounded-2xl p-7">
              <h2 className="text-lg font-bold text-slate-ink">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
