import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { FileText, ShieldCheck, Globe2, Mail } from "lucide-react";

export const Route = createFileRoute("/dpa")({
  head: () => ({
    meta: [
      { title: "Data Processing Addendum — MedFlow AI" },
      { name: "description", content: "MedFlow AI's Data Processing Addendum, including SCCs and sub-processor disclosure for GDPR and HIPAA compliance." },
      { property: "og:title", content: "MedFlow AI Data Processing Addendum" },
      { property: "og:description", content: "GDPR-aligned DPA with Standard Contractual Clauses and sub-processor list." },
    ],
  }),
  component: DPAPage,
});

const highlights = [
  { icon: ShieldCheck, title: "GDPR + HIPAA aligned", body: "Combined BAA and DPA executed at contract signing; one document covers EU and US frameworks." },
  { icon: Globe2, title: "Standard Contractual Clauses", body: "EU SCCs (Module 2 & 3) attached for any data transfer outside the customer's chosen region." },
  { icon: FileText, title: "Sub-processor registry", body: "Maintained, versioned list with 30-day advance notice for new sub-processors. Right to object." },
  { icon: Mail, title: "Single point of contact", body: "DPO: dpo@medflow.ai · Security: security@medflow.ai · Legal: legal@medflow.ai" },
];

const subprocessors = [
  { name: "AWS", purpose: "Primary hosting (multi-region)", location: "Customer-selected region" },
  { name: "Cloudflare", purpose: "Edge security, DDoS, WAF", location: "Global" },
  { name: "Datadog", purpose: "Telemetry & observability", location: "Region-matched" },
  { name: "Twilio", purpose: "SMS / WhatsApp notifications", location: "Region-matched" },
  { name: "Resend", purpose: "Transactional email", location: "Region-matched" },
];

function DPAPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title={<>Data Processing <span className="text-gradient-brand">Addendum</span></>}
      subtitle="Our DPA, BAA-equivalent terms, SCCs, and sub-processor list. Available pre-signed at contracting."
    >
      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h) => (
              <div key={h.title} className="glass-panel rounded-2xl p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-primary-foreground shadow-glow">
                  <h.icon size={18} />
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-ink">{h.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-bold text-slate-ink">Sub-processors</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We notify customers at least 30 days before adding a new sub-processor. Customers may object in writing.
          </p>
          <div className="mt-6 overflow-hidden glass-panel rounded-2xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-6 py-3 font-semibold">Sub-processor</th>
                  <th className="px-6 py-3 font-semibold">Purpose</th>
                  <th className="px-6 py-3 font-semibold">Location</th>
                </tr>
              </thead>
              <tbody>
                {subprocessors.map((s) => (
                  <tr key={s.name} className="border-b border-border/60 last:border-0">
                    <td className="px-6 py-4 font-medium text-slate-ink">{s.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{s.purpose}</td>
                    <td className="px-6 py-4 text-muted-foreground">{s.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
