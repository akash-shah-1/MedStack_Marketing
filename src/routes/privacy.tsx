import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — MedFlow AI" },
      { name: "description", content: "How MedFlow AI collects, processes, and protects personal and health information." },
      { property: "og:title", content: "MedFlow AI Privacy Policy" },
      { property: "og:description", content: "Our commitments around PHI, data residency, retention, and subject rights." },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  { title: "1. Overview", body: "MedFlow AI, Inc. operates as a data processor on behalf of hospital customers (the data controller). We process Protected Health Information (PHI) strictly to deliver the services described in our Master Services Agreement and BAA." },
  { title: "2. What we collect", body: "Account data (name, work email, role), telemetry needed to keep the service reliable, and the clinical and operational data your hospital chooses to store in MedFlow AI." },
  { title: "3. How we use it", body: "We use customer data only to provide, secure, and support the service. We never sell customer data. We do not use PHI to train general-purpose models." },
  { title: "4. Data residency", body: "Hospitals choose a primary region (EU, US, India, UAE, Singapore, or Australia). All PHI is stored and processed within the chosen region; cross-region replication is opt-in." },
  { title: "5. Retention", body: "Customer data is retained for the life of the contract plus a 30-day grace period. After grace, data is securely destroyed and a destruction certificate is issued." },
  { title: "6. Subject rights", body: "Hospitals act as the controller for patient subject rights (access, rectification, erasure, portability). We assist customers in fulfilling such requests within statutory timelines." },
  { title: "7. Contact", body: "Privacy questions: privacy@medflow.ai. EU representative and DPO contact details are available on request." },
];

function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title={<>Privacy <span className="text-gradient-brand">Policy</span></>}
      subtitle="Last updated June 25, 2026. This policy explains how MedFlow AI handles personal and health data."
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
