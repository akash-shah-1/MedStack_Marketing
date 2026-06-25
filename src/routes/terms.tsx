import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { FileText, ShieldCheck, Activity, Wallet, Lock, Scale, Gavel } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — MedFlow AI" },
      { name: "description", content: "The terms governing your use of the MedFlow AI hospital management platform." },
      { property: "og:title", content: "MedFlow AI Terms of Service" },
      { property: "og:description", content: "Acceptable use, service levels, fees and liability for the MedFlow AI platform." },
    ],
  }),
  component: TermsPage,
});

const sections = [
  { id: "agreement", icon: FileText, title: "1. Agreement", body: "These Terms govern access to the MedFlow AI platform. Enterprise customers operate under a signed Master Services Agreement that supersedes any conflicting clause here." },
  { id: "use", icon: ShieldCheck, title: "2. Acceptable use", body: "Customers may not attempt to compromise platform security, reverse engineer the service, or use it to violate applicable law, including healthcare regulations in the country of operation." },
  { id: "sla", icon: Activity, title: "3. Service levels", body: "Production tenants are covered by a 99.95% uptime SLA, with credits issued for any month that falls below the threshold. Maintenance windows are announced 7 days in advance." },
  { id: "fees", icon: Wallet, title: "4. Fees and renewal", body: "Subscriptions auto-renew for successive terms unless either party gives 60 days' notice. Fees are billed annually in advance unless otherwise agreed." },
  { id: "confidentiality", icon: Lock, title: "5. Confidentiality", body: "Each party will protect the other's confidential information with at least the standard of care used for its own confidential information, and never less than reasonable care." },
  { id: "liability", icon: Scale, title: "6. Liability", body: "Except for breach of confidentiality, indemnification obligations, or willful misconduct, each party's aggregate liability is capped at fees paid in the prior 12 months." },
  { id: "law", icon: Gavel, title: "7. Governing law", body: "These Terms are governed by the laws of Delaware, USA, with exclusive jurisdiction in state and federal courts located in Wilmington, Delaware." },
];

function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal · Terms"
      title={<>Terms of <span className="text-gradient-brand">Service</span></>}
      subtitle="Last updated June 25, 2026. The terms that govern access to the MedFlow AI platform."
    >
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6 grid gap-10 lg:grid-cols-[240px_1fr]">
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
                <div className="font-semibold text-slate-ink">Need MSA / order form?</div>
                <a href="/contact" className="mt-1 inline-block text-teal-deep hover:text-teal">Request from legal →</a>
              </div>
            </div>
          </aside>

          <div className="space-y-5">
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
