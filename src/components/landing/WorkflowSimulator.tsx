import { useState } from "react";
import { UserPlus, Stethoscope, Receipt, FlaskConical, CreditCard, Check, BedDouble } from "lucide-react";

const stages = [
  {
    key: "reception",
    title: "Reception & Booking",
    icon: UserPlus,
    short: "Patient registers, MRN generated, appointment scheduled.",
    bedState: "occupied",
    bullets: [
      "Self-serve or front-desk intake with photo capture",
      "Auto-generated MRN with deduplication",
      "Appointment slotted to correct specialty queue",
    ],
  },
  {
    key: "consult",
    title: "Clinical Consultation",
    icon: Stethoscope,
    short: "Doctor logs vitals, signs consult, places Pathology / Radiology orders.",
    bedState: "occupied",
    bullets: [
      "Structured vitals & SOAP notes",
      "One-click Pathology / Radiology / Pharmacy orders",
      "Digital signature locks the encounter",
    ],
  },
  {
    key: "billing",
    title: "Instant Billing Integration",
    icon: Receipt,
    short: "Orders auto-populate the active invoice as GST line items, in real time.",
    bedState: "occupied",
    bullets: [
      "Live invoice mirrors clinical orders",
      "GST / VAT and TPA preauth applied automatically",
      "Zero double-entry between clinical and finance",
    ],
  },
  {
    key: "queues",
    title: "Departmental Queues",
    icon: FlaskConical,
    short: "Pharmacy dispenses meds, Labs upload pathology, results flow back to EHR.",
    bedState: "watch",
    bullets: [
      "Pharmacy dispense queue with stock alerts",
      "Lab uploads results — EHR updated instantly",
      "Imaging viewer linked to consult timeline",
    ],
  },
  {
    key: "discharge",
    title: "Payment & Auto Bed Freeing",
    icon: CreditCard,
    short: "POS payment triggers discharge, frees the bed, and closes the nurse shift.",
    bedState: "vacant",
    bullets: [
      "POS / Insurance / TPA collection workflows",
      "Invoice → Paid automatically discharges patient",
      "Bed status flips to Vacant · Housekeeping queued",
    ],
  },
];

export function WorkflowSimulator() {
  const [active, setActive] = useState(0);
  const Stage = stages[active];

  return (
    <section id="workflows" className="relative py-28">
      <div className="absolute inset-x-0 top-1/2 -z-10 mx-auto h-[420px] max-w-5xl -translate-y-1/2 rounded-full bg-emerald-soft/40 blur-3xl" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass-panel px-3 py-1 text-xs font-medium text-teal-deep">
            The Patient Lifecycle
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-ink sm:text-5xl">
            One workflow. <span className="text-gradient-brand">Every department.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Click through a real patient journey — from intake to discharge — and watch billing,
            beds, and clinical orders stay perfectly in sync.
          </p>
        </div>

        {/* Stepper */}
        <div className="relative mt-14">
          <div className="absolute left-0 right-0 top-6 h-px bg-border" />
          <div
            className="absolute left-0 top-6 h-px bg-brand transition-all duration-500"
            style={{ width: `${(active / (stages.length - 1)) * 100}%` }}
          />
          <ol className="relative grid grid-cols-5 gap-2">
            {stages.map((s, i) => {
              const Icon = s.icon;
              const done = i < active;
              const cur = i === active;
              return (
                <li key={s.key} className="flex flex-col items-center text-center">
                  <button
                    onClick={() => setActive(i)}
                    className={`grid h-12 w-12 place-items-center rounded-2xl border transition ${
                      cur
                        ? "border-teal bg-brand text-primary-foreground shadow-glow scale-110"
                        : done
                        ? "border-emerald/40 bg-emerald-soft text-emerald"
                        : "border-border bg-white text-muted-foreground hover:border-teal/40"
                    }`}
                  >
                    {done ? <Check size={18} /> : <Icon size={18} />}
                  </button>
                  <div className={`mt-3 text-[11px] font-semibold uppercase tracking-wider ${cur ? "text-teal-deep" : "text-muted-foreground"}`}>
                    Stage {i + 1}
                  </div>
                  <div className="mt-1 hidden text-xs font-medium text-slate-ink sm:block">
                    {s.title}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Detail panel */}
        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <div className="glass-panel rounded-3xl p-8 lg:col-span-3">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-primary-foreground">
                <Stage.icon size={18} />
              </span>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-teal">Stage {active + 1}</div>
                <h3 className="text-2xl font-bold text-slate-ink">{Stage.title}</h3>
              </div>
            </div>
            <p className="mt-4 text-muted-foreground">{Stage.short}</p>
            <ul className="mt-6 space-y-3">
              {Stage.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-slate-ink">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-soft text-emerald">
                    <Check size={12} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Bed visualization */}
          <div className="glass-panel rounded-3xl p-8 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Bed 7A · Ward B</div>
                <h4 className="mt-1 text-lg font-bold text-slate-ink">Live status</h4>
              </div>
              <BedStatus state={Stage.bedState as "occupied" | "watch" | "vacant"} />
            </div>

            <div className="relative mt-6 aspect-[4/3] rounded-2xl border border-border bg-clinical-soft/40 p-4">
              <BedSvg state={Stage.bedState as "occupied" | "watch" | "vacant"} />
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[11px]">
              <Pill label="Housekeeping" value={Stage.bedState === "vacant" ? "Queued" : "—"} active={Stage.bedState === "vacant"} />
              <Pill label="Nurse shift" value={Stage.bedState === "vacant" ? "Closed" : "Active"} active={Stage.bedState === "vacant"} />
              <Pill label="Invoice" value={active >= 2 ? (active === 4 ? "Paid" : "Open") : "—"} active={active === 4} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BedStatus({ state }: { state: "occupied" | "watch" | "vacant" }) {
  const map = {
    occupied: { label: "Occupied", cls: "bg-clinical/15 text-clinical" },
    watch: { label: "Watch", cls: "bg-warn/15 text-[oklch(0.5_0.14_75)]" },
    vacant: { label: "Vacant", cls: "bg-emerald/15 text-emerald" },
  } as const;
  const s = map[state];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${s.cls}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse-glow" />
      {s.label}
    </span>
  );
}

function BedSvg({ state }: { state: "occupied" | "watch" | "vacant" }) {
  const fill =
    state === "vacant"
      ? "oklch(0.66 0.16 155)"
      : state === "watch"
      ? "oklch(0.78 0.14 75)"
      : "oklch(0.7 0.08 220)";
  return (
    <svg viewBox="0 0 200 140" className="h-full w-full">
      <rect x="20" y="80" width="160" height="40" rx="8" fill={fill} opacity="0.35" />
      <rect x="20" y="80" width="160" height="14" rx="6" fill={fill} />
      <rect x="32" y="60" width="40" height="24" rx="6" fill="white" stroke={fill} strokeWidth="1.5" />
      <rect x="30" y="120" width="6" height="14" rx="2" fill={fill} />
      <rect x="164" y="120" width="6" height="14" rx="2" fill={fill} />
      {state !== "vacant" && (
        <>
          <circle cx="52" cy="56" r="8" fill="white" stroke={fill} strokeWidth="1.5" />
          <path d="M44 76 Q52 72 60 76" stroke={fill} strokeWidth="1.5" fill="none" />
        </>
      )}
      <g opacity="0.7">
        <BedDoubleIconMarker x={150} y={32} color={fill} />
      </g>
    </svg>
  );
}
function BedDoubleIconMarker({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="14" fill="white" stroke={color} strokeWidth="1.5" />
      <g transform="translate(-7 -7)" stroke={color} strokeWidth="1.5" fill="none">
        <path d="M2 8h10v3H2z" />
        <path d="M2 5v6M12 5v6" />
      </g>
    </g>
  );
}

function Pill({ label, value, active }: { label: string; value: string; active: boolean }) {
  return (
    <div className={`rounded-lg border px-2 py-2 transition ${active ? "border-emerald/40 bg-emerald-soft/60" : "border-border bg-white/60"}`}>
      <div className="text-muted-foreground">{label}</div>
      <div className={`mt-0.5 text-xs font-semibold ${active ? "text-emerald" : "text-slate-ink"}`}>{value}</div>
    </div>
  );
}
