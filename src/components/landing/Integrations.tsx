import { Plug, Database, CreditCard, MessageSquare, FlaskConical, Stethoscope, Radio, FileText } from "lucide-react";

const groups = [
  {
    title: "Clinical & Diagnostics",
    items: [
      { icon: FlaskConical, name: "LIS / Pathology", note: "Auto-result sync" },
      { icon: Stethoscope, name: "PACS / Radiology", note: "DICOM & reports" },
      { icon: Radio, name: "ICU Monitors", note: "HL7 vitals feed" },
      { icon: FileText, name: "e-Prescription", note: "DSCSA-ready" },
    ],
  },
  {
    title: "Finance & Communications",
    items: [
      { icon: CreditCard, name: "TPA & Insurance", note: "150+ payers" },
      { icon: Database, name: "GL / ERP", note: "Tally · SAP · NetSuite" },
      { icon: MessageSquare, name: "WhatsApp / SMS", note: "Patient nudges" },
      { icon: Plug, name: "HL7 / FHIR R4", note: "Open APIs" },
    ],
  },
];

export function Integrations() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-transparent via-teal/5 to-transparent">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:items-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full glass-panel px-3 py-1 text-xs font-medium text-teal-deep">
              Plays well with your stack
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-ink sm:text-5xl">
              Connects to <span className="text-gradient-brand">everything you already run</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              First-class HL7 v2, FHIR R4, and REST APIs. Pre-built adapters for the systems your billing,
              radiology, and pharmacy teams already depend on.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {groups.map((g) => (
              <div key={g.title} className="glass-panel rounded-2xl p-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-teal-deep">{g.title}</div>
                <ul className="mt-4 space-y-3">
                  {g.items.map((i) => (
                    <li key={i.name} className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-teal/10 text-teal-deep">
                        <i.icon size={16} />
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-slate-ink">{i.name}</div>
                        <div className="text-xs text-muted-foreground">{i.note}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
