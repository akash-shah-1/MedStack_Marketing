import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { ShieldCheck, Lock, MapPin, FileCheck2, UserCheck, Mail, Calendar } from "lucide-react";

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
  { id: "overview", icon: ShieldCheck, title: "1. Overview", body: "MedFlow AI, Inc. operates as a data processor on behalf of hospital customers (the data controller). We process Protected Health Information (PHI) strictly to deliver the services described in our Master Services Agreement and BAA." },
  { id: "collect", icon: FileCheck2, title: "2. What we collect", body: "Account data (name, work email, role), telemetry needed to keep the service reliable, and the clinical and operational data your hospital chooses to store in MedFlow AI." },
  { id: "use", icon: Lock, title: "3. How we use it", body: "We use customer data only to provide, secure, and support the service. We never sell customer data. We do not use PHI to train general-purpose models." },
  { id: "residency", icon: MapPin, title: "4. Data residency", body: "Hospitals choose a primary region (EU, US, India, UAE, Singapore, or Australia). All PHI is stored and processed within the chosen region; cross-region replication is opt-in." },
  { id: "retention", icon: Calendar, title: "5. Retention", body: "Customer data is retained for the life of the contract plus a 30-day grace period. After grace, data is securely destroyed and a destruction certificate is issued." },
  { id: "rights", icon: UserCheck, title: "6. Subject rights", body: "Hospitals act as the controller for patient subject rights (access, rectification, erasure, portability). We assist customers in fulfilling such requests within statutory timelines." },
  { id: "contact", icon: Mail, title: "7. Contact", body: "Privacy questions: privacy@medflow.ai. EU representative and DPO contact details are available on request." },
];

function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal · Privacy"
      title={<>Privacy <span className="text-gradient-brand">Policy</span></>}
      subtitle="Last updated June 25, 2026. Plain-English commitments for how MedFlow AI handles personal and health data."
    >
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6 grid gap-10 lg:grid-cols-[240px_1fr]">
          {/* TOC */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="glass-panel rounded-2xl p-5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">On this page</div>
              <ul className="mt-3 space-y-2 text-sm">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-slate-ink/80 transition hover:bg-emerald-soft/40 hover:text-teal-deep">
                      <s.icon size={13} className="text-teal" /> {s.title.replace(/^\d+\.\s/, "")}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl border border-border bg-white/60 p-3 text-[11px] text-muted-foreground">
                <div className="font-semibold text-slate-ink">Need a signed BAA / DPA?</div>
                <a href="/contact" className="mt-1 inline-block text-teal-deep hover:text-teal">Request from legal team →</a>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="space-y-5">
            <div className="glass-panel flex items-center gap-3 rounded-2xl p-5 text-sm">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-soft text-emerald">
                <ShieldCheck size={16} />
              </span>
              <div>
                <div className="font-semibold text-slate-ink">HIPAA · GDPR · ISO 27001 aligned</div>
                <div className="text-xs text-muted-foreground">Independently audited annually. SOC 2 Type II report available under NDA.</div>
              </div>
            </div>

            {sections.map((s) => (
              <article key={s.id} id={s.id} className="glass-panel scroll-mt-28 rounded-2xl p-7">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-primary-foreground">
                    <s.icon size={16} />
                  </span>
                  <h2 className="text-lg font-bold text-slate-ink">{s.title}</h2>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
