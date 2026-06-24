import { Activity, BedDouble, Receipt, FlaskConical, CalendarClock } from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Clinical Command Center",
    desc: "Electronic Health Records, dynamic doctor consult queues, and vitals history charting in one focused workspace.",
    bullets: ["EHR with longitudinal timeline", "SOAP notes + voice-to-text", "Vitals trends & alerts"],
  },
  {
    icon: BedDouble,
    title: "Bed & Ward Control",
    desc: "Live floor-plan map of every ward — General, ICU, Pediatrics — with acuity levels and nurse assignments.",
    bullets: ["Real-time floor map", "Acuity: Stable · Watch · Critical", "Auto bed-freeing on discharge"],
  },
  {
    icon: Receipt,
    title: "Revenue & POS Billing",
    desc: "Dynamic invoices that mirror clinical orders, with insurance preauth, TPA claims, GST, and full voiding audits.",
    bullets: ["Live invoice from clinical orders", "TPA / insurance preauth", "GST invoicing + audit trail"],
  },
  {
    icon: FlaskConical,
    title: "Departmental Queues",
    desc: "Purpose-built interfaces for Pharmacy, Pathology, and Radiology — with stock, results, and imaging in flow.",
    bullets: ["Pharmacy dispense + reorder", "Lab results → EHR", "Radiology viewer + reports"],
  },
  {
    icon: CalendarClock,
    title: "Shift & Roster Scheduler",
    desc: "Countdown timers for nurse shifts and automated provisioning of HR, Reception, Billing, Doctor, Nurse, Pharmacist roles.",
    bullets: ["Live shift countdowns", "Role-based provisioning", "Handoff & roster compliance"],
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass-panel px-3 py-1 text-xs font-medium text-teal-deep">
            Core Modules
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-ink sm:text-5xl">
            Built for every corner of the hospital.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Five tightly integrated modules — no plug-ins, no syncing, no reconciliation.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            const featured = i === 1;
            return (
              <article
                key={f.title}
                className={`group relative overflow-hidden rounded-3xl p-7 transition hover:-translate-y-1 hover:shadow-glow ${
                  featured ? "glass-panel lg:row-span-2" : "glass-panel"
                }`}
              >
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-teal-glow/20 blur-3xl transition group-hover:bg-emerald/25" />
                <div className="relative">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand text-primary-foreground shadow-glow">
                    <Icon size={18} />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-slate-ink">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                  <ul className="mt-5 space-y-2 text-sm text-slate-ink/80">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-emerald" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {featured && (
                    <div className="mt-6 rounded-2xl border border-border bg-white/60 p-4">
                      <div className="mb-2 flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
                        <span>WARD B · LIVE</span>
                        <span className="text-emerald">3 freed today</span>
                      </div>
                      <div className="grid grid-cols-10 gap-1">
                        {Array.from({ length: 30 }).map((_, idx) => {
                          const tones = ["bg-emerald/80", "bg-clinical/70", "bg-warn/80", "bg-critical/80"];
                          const t = tones[(idx * 7) % 4];
                          return <div key={idx} className={`aspect-square rounded-sm ${t}`} />;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
