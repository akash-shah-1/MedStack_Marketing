import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How long does implementation take?",
    a: "Most single-site hospitals go live in 3–4 weeks. Multi-site networks complete phased rollouts in 8–12 weeks with parallel-run safety nets.",
  },
  {
    q: "Will MedFlow AI replace our existing LIS, PACS, or pharmacy systems?",
    a: "No. MedFlow AI is the connective tissue. Pre-built HL7 v2 and FHIR R4 adapters keep your existing diagnostics, imaging, and pharmacy systems in place.",
  },
  {
    q: "How is patient data secured?",
    a: "AES-256 at rest, TLS 1.3 in transit, per-tenant key isolation, full audit trail, and SOC 2 Type II + HIPAA + GDPR compliance. Data residency available in 14 regions.",
  },
  {
    q: "Can we customize clinical workflows by department?",
    a: "Yes. Every department — ER, ICU, OPD, OT, Maternity — gets its own workflow templates, forms, escalation rules, and KPI dashboards.",
  },
  {
    q: "What happens if the internet goes down?",
    a: "An offline-capable client keeps consultations, vitals capture, and pharmacy dispense flowing. Records sync automatically when connectivity returns.",
  },
  {
    q: "Do you offer training for our staff?",
    a: "Every deployment includes role-based training (clinicians, billing, admin), a sandbox tenant, and a dedicated success manager for the first 90 days.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass-panel px-3 py-1 text-xs font-medium text-teal-deep">
            Frequently asked
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-ink sm:text-5xl">
            Answers for <span className="text-gradient-brand">decision-makers</span>
          </h2>
        </div>
        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="glass-panel overflow-hidden rounded-2xl">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-base font-semibold text-slate-ink">{f.q}</span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-teal/10 text-teal-deep">
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
