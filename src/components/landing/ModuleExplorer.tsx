import { useState } from "react";
import { Stethoscope, HeartPulse, Building2, Wallet, CheckCircle2 } from "lucide-react";

const personas = [
  {
    id: "doctor",
    label: "Doctor",
    icon: Stethoscope,
    headline: "Less charting, more patients.",
    sub: "Voice-to-note, smart order sets, and a unified patient timeline from triage to discharge.",
    benefits: [
      "Voice-dictated SOAP notes in under 90 seconds",
      "Specialty order sets for cardiology, ortho, OB-GYN",
      "Allergy / interaction checks at the point of order",
      "One-tap referrals with structured handoff",
    ],
    metric: { value: "42%", label: "less charting time" },
  },
  {
    id: "nurse",
    label: "Nurse",
    icon: HeartPulse,
    headline: "Your shift, one screen.",
    sub: "Live vitals, MAR, bed assignments and care tasks — sorted by acuity, not by chaos.",
    benefits: [
      "Barcode-verified medication administration (BCMA)",
      "Smart escalation if vitals drift out of range",
      "Auto-priority task list with shift handover",
      "Family communication log built-in",
    ],
    metric: { value: "3.1×", label: "faster med pass" },
  },
  {
    id: "admin",
    label: "Admin",
    icon: Building2,
    headline: "Run the hospital, not the spreadsheet.",
    sub: "Live occupancy, OT scheduling, departmental queues, and incident reporting in one console.",
    benefits: [
      "Live bed & OT utilization with predictive holds",
      "Roster planning with fatigue + compliance guards",
      "Vendor SLA tracking and asset lifecycles",
      "NABH / JCI audit trails out of the box",
    ],
    metric: { value: "27%", label: "higher bed turnover" },
  },
  {
    id: "cfo",
    label: "CFO",
    icon: Wallet,
    headline: "Close the books, not the gap.",
    sub: "Charge capture, payer mix, claim aging and denial analytics — refreshed every 15 minutes.",
    benefits: [
      "Auto-coded charges with payer rule engine",
      "Claim scrubbing reduces rejections by 38%",
      "Cash-flow forecasting across TPAs & insurance",
      "Drill-down P&L by department and consultant",
    ],
    metric: { value: "18 days", label: "shorter AR cycle" },
  },
] as const;

type PersonaId = (typeof personas)[number]["id"];

export function ModuleExplorer() {
  const [active, setActive] = useState<PersonaId>("doctor");
  const p = personas.find((x) => x.id === active)!;

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass-panel px-3 py-1 text-xs font-medium text-teal-deep">
            Built for every role
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-ink sm:text-5xl">
            Pick a role. See <span className="text-gradient-brand">your day in MedFlow</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Each persona gets a tailored workspace — same platform, same data, zero friction.
          </p>
        </div>

        <div className="mt-10 grid gap-2 sm:grid-cols-4">
          {personas.map((x) => {
            const Icon = x.icon;
            const isActive = x.id === active;
            return (
              <button
                key={x.id}
                onClick={() => setActive(x.id)}
                className={`group flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-brand text-primary-foreground shadow-glow"
                    : "glass-panel text-slate-ink hover:bg-white"
                }`}
              >
                <Icon size={16} />
                {x.label}
              </button>
            );
          })}
        </div>

        <div key={p.id} className="mt-8 grid gap-6 lg:grid-cols-5 animate-fade-in">
          <div className="glass-panel rounded-3xl p-8 lg:col-span-3">
            <h3 className="text-3xl font-bold tracking-tight text-slate-ink">{p.headline}</h3>
            <p className="mt-2 text-muted-foreground">{p.sub}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {p.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-slate-ink/85">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-panel rounded-3xl bg-gradient-to-br from-teal-glow/30 to-emerald-soft/40 p-8 lg:col-span-2">
            <div className="text-xs uppercase tracking-wider text-teal-deep">Average impact</div>
            <div className="mt-3 text-6xl font-bold tracking-tight text-slate-ink">{p.metric.value}</div>
            <div className="mt-1 text-sm font-medium text-slate-ink/80">{p.metric.label}</div>
            <p className="mt-6 text-xs text-muted-foreground">
              Measured across 60+ deployments in the last 12 months.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
