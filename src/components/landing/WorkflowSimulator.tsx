import { useEffect, useRef, useState } from "react";
import {
  UserPlus,
  Stethoscope,
  Receipt,
  FlaskConical,
  CreditCard,
  Check,
  Pause,
  Play,
  Activity,
  HeartPulse,
  Pill,
  ClipboardList,
} from "lucide-react";

type BedState = "occupied" | "watch" | "vacant";

const stages = [
  {
    key: "reception",
    title: "Reception & Booking",
    icon: UserPlus,
    short: "Patient registers, MRN generated, appointment scheduled.",
    bedState: "occupied" as BedState,
    patient: { name: "Aarav S.", mrn: "MRN-04821", age: 42, dept: "General Med" },
    vitals: { hr: 78, bp: "118/76", spo2: 98, temp: 98.4 },
    bullets: [
      "Self-serve or front-desk intake with photo capture",
      "Auto-generated MRN with deduplication",
      "Appointment slotted to correct specialty queue",
    ],
    timeline: [
      { t: "09:02", label: "Patient arrived at reception" },
      { t: "09:04", label: "MRN-04821 generated" },
      { t: "09:06", label: "Token #B-17 assigned to Dr. Mehta" },
    ],
  },
  {
    key: "consult",
    title: "Clinical Consultation",
    icon: Stethoscope,
    short: "Doctor logs vitals, signs consult, places Pathology / Radiology orders.",
    bedState: "occupied" as BedState,
    patient: { name: "Aarav S.", mrn: "MRN-04821", age: 42, dept: "General Med" },
    vitals: { hr: 88, bp: "126/82", spo2: 97, temp: 99.1 },
    bullets: [
      "Structured vitals & SOAP notes",
      "One-click Pathology / Radiology / Pharmacy orders",
      "Digital signature locks the encounter",
    ],
    timeline: [
      { t: "09:14", label: "Vitals captured · BP 126/82" },
      { t: "09:18", label: "CBC + LFT ordered (Pathology)" },
      { t: "09:21", label: "Consult signed by Dr. Mehta" },
    ],
  },
  {
    key: "billing",
    title: "Instant Billing Integration",
    icon: Receipt,
    short: "Orders auto-populate the active invoice as GST line items, in real time.",
    bedState: "occupied" as BedState,
    patient: { name: "Aarav S.", mrn: "MRN-04821", age: 42, dept: "General Med" },
    vitals: { hr: 84, bp: "122/80", spo2: 98, temp: 98.9 },
    bullets: [
      "Live invoice mirrors clinical orders",
      "GST / VAT and TPA preauth applied automatically",
      "Zero double-entry between clinical and finance",
    ],
    timeline: [
      { t: "09:22", label: "Invoice #INV-7720 opened" },
      { t: "09:22", label: "CBC ₹450 · LFT ₹820 added" },
      { t: "09:23", label: "TPA preauth submitted → Approved" },
    ],
  },
  {
    key: "queues",
    title: "Departmental Queues",
    icon: FlaskConical,
    short: "Pharmacy dispenses meds, Labs upload pathology, results flow back to EHR.",
    bedState: "watch" as BedState,
    patient: { name: "Aarav S.", mrn: "MRN-04821", age: 42, dept: "General Med" },
    vitals: { hr: 92, bp: "130/84", spo2: 96, temp: 100.2 },
    bullets: [
      "Pharmacy dispense queue with stock alerts",
      "Lab uploads results — EHR updated instantly",
      "Imaging viewer linked to consult timeline",
    ],
    timeline: [
      { t: "10:02", label: "Pharmacy dispensed Paracetamol 500mg" },
      { t: "10:34", label: "CBC results uploaded → EHR" },
      { t: "10:41", label: "Radiology: Chest X-ray scheduled" },
    ],
  },
  {
    key: "discharge",
    title: "Payment & Auto Bed Freeing",
    icon: CreditCard,
    short: "POS payment triggers discharge, frees the bed, and closes the nurse shift.",
    bedState: "vacant" as BedState,
    patient: { name: "Aarav S.", mrn: "MRN-04821", age: 42, dept: "General Med" },
    vitals: { hr: 76, bp: "118/74", spo2: 99, temp: 98.2 },
    bullets: [
      "POS / Insurance / TPA collection workflows",
      "Invoice → Paid automatically discharges patient",
      "Bed status flips to Vacant · Housekeeping queued",
    ],
    timeline: [
      { t: "11:48", label: "Invoice ₹4,210 settled · UPI" },
      { t: "11:48", label: "Bed 7A → Vacant (housekeeping queued)" },
      { t: "11:49", label: "Discharge summary emailed to patient" },
    ],
  },
];

const AUTO_MS = 4500;

export function WorkflowSimulator() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(performance.now());

  useEffect(() => {
    startRef.current = performance.now();
    setProgress(0);
    if (!playing) return;
    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const p = Math.min(1, elapsed / AUTO_MS);
      setProgress(p);
      if (p >= 1) {
        setActive((a) => (a + 1) % stages.length);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, playing]);

  const Stage = stages[active];

  return (
    <section id="workflows" className="relative py-28">
      <div className="absolute inset-x-0 top-1/2 -z-10 mx-auto h-[420px] max-w-5xl -translate-y-1/2 rounded-full bg-emerald-soft/40 blur-3xl" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass-panel px-3 py-1 text-xs font-medium text-teal-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse-glow" />
            The Patient Lifecycle · Live demo
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-ink sm:text-5xl">
            One workflow. <span className="text-gradient-brand">Every department.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Watch a real patient journey advance automatically — from intake to discharge — and see
            billing, beds, and clinical orders stay perfectly in sync.
          </p>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="mt-5 inline-flex items-center gap-2 rounded-full glass-panel px-4 py-2 text-xs font-semibold text-slate-ink hover:shadow-glow"
          >
            {playing ? <Pause size={13} /> : <Play size={13} />}
            {playing ? "Pause auto-play" : "Resume auto-play"}
          </button>
        </div>

        {/* Stepper */}
        <div className="relative mt-14">
          {/* Track + progress are inset to align with first/last icon centers (10% .. 90% for 5 cols) */}
          <div className="absolute left-[10%] right-[10%] top-6 h-px bg-border" />
          <div
            className="absolute left-[10%] top-6 h-px bg-gradient-to-r from-teal to-emerald"
            style={{
              width: `${((active + (playing ? progress : 0)) / (stages.length - 1)) * 80}%`,
            }}
          />
          <ol className="relative grid grid-cols-5 gap-2">
            {stages.map((s, i) => {
              const Icon = s.icon;
              const done = i < active;
              const cur = i === active;
              return (
                <li key={s.key} className="flex flex-col items-center text-center">
                  <button
                    onClick={() => {
                      setActive(i);
                      setPlaying(true);
                    }}
                    aria-label={`Go to ${s.title}`}
                    className={`relative z-10 grid h-12 w-12 place-items-center rounded-full transition overflow-visible ${
                      cur
                        ? "bg-brand text-primary-foreground shadow-glow scale-110 ring-1 ring-teal/30"
                        : done
                          ? "bg-emerald-soft text-emerald ring-1 ring-emerald/30"
                          : "bg-white text-muted-foreground ring-1 ring-border hover:ring-teal/40"
                    }`}
                  >
                    {done ? <Check size={18} /> : <Icon size={18} />}
                    {cur && (
                      <svg
                        className="pointer-events-none absolute -inset-[6px] h-[60px] w-[60px] overflow-visible"
                        viewBox="0 0 60 60"
                        aria-hidden
                      >
                        <circle
                          cx="30"
                          cy="30"
                          r="28"
                          fill="none"
                          stroke="oklch(0.55 0.10 200)"
                          strokeOpacity="0.16"
                          strokeWidth="2"
                        />
                        <circle
                          cx="30"
                          cy="30"
                          r="28"
                          fill="none"
                          stroke="oklch(0.55 0.10 200)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 28}
                          strokeDashoffset={2 * Math.PI * 28 * (1 - progress)}
                          transform="rotate(-90 30 30)"
                          style={{ transition: "stroke-dashoffset 80ms linear" }}
                        />
                      </svg>
                    )}
                  </button>
                  <div
                    className={`mt-3 text-[11px] font-semibold uppercase tracking-wider ${
                      cur ? "text-teal-deep" : "text-muted-foreground"
                    }`}
                  >
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
        <div className="mt-12 grid gap-6 lg:grid-cols-5" key={active}>
          <div className="glass-panel rounded-3xl p-8 lg:col-span-3 animate-rise">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-primary-foreground">
                <Stage.icon size={18} />
              </span>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-teal">
                  Stage {active + 1} of {stages.length}
                </div>
                <h3 className="text-2xl font-bold text-slate-ink">{Stage.title}</h3>
              </div>
            </div>
            <p className="mt-4 text-muted-foreground">{Stage.short}</p>
            <ul className="mt-6 space-y-3">
              {Stage.bullets.map((b, i) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-sm text-slate-ink animate-rise"
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-soft text-emerald">
                    <Check size={12} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            {/* Live timeline */}
            <div className="mt-7 rounded-2xl border border-border bg-white/60 p-5">
              <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <ClipboardList size={12} className="text-teal" /> Live activity
              </div>
              <ol className="relative space-y-3 pl-7">
                <span className="absolute left-[10px] top-2 bottom-2 w-px bg-border" />
                {Stage.timeline.map((row, i) => (
                  <li
                    key={`${active}-${row.t}-${i}`}
                    className="relative animate-rise"
                    style={{ animationDelay: `${i * 140 + 120}ms` }}
                  >
                    <span className="absolute left-[-20px] top-1.5 grid h-3 w-3 place-items-center rounded-full bg-emerald ring-2 ring-white animate-blip">
                      <span className="h-1 w-1 rounded-full bg-white" />
                    </span>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-sm text-slate-ink">{row.label}</span>
                      <span className="shrink-0 font-mono text-[11px] text-muted-foreground tabular-nums">
                        {row.t}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right panel — patient + vitals + bed */}
          <div className="glass-panel rounded-3xl p-7 lg:col-span-2 animate-rise" style={{ animationDelay: "120ms" }}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-brand text-sm font-bold text-primary-foreground">
                  {Stage.patient.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <div>
                  <div className="text-sm font-bold text-slate-ink">{Stage.patient.name}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {Stage.patient.mrn} · {Stage.patient.age}y · {Stage.patient.dept}
                  </div>
                </div>
              </div>
              <BedStatus state={Stage.bedState} />
            </div>

            {/* Vitals grid */}
            <div className="mt-5 grid grid-cols-2 gap-2">
              <Vital
                icon={<HeartPulse size={13} />}
                label="Heart rate"
                value={`${Stage.vitals.hr}`}
                unit="bpm"
                tone={Stage.vitals.hr > 90 ? "warn" : "ok"}
              />
              <Vital
                icon={<Activity size={13} />}
                label="Blood pressure"
                value={Stage.vitals.bp}
                unit="mmHg"
                tone="ok"
              />
              <Vital
                icon={<Pill size={13} />}
                label="SpO₂"
                value={`${Stage.vitals.spo2}`}
                unit="%"
                tone={Stage.vitals.spo2 < 97 ? "warn" : "ok"}
              />
              <Vital
                icon={<Activity size={13} />}
                label="Temp"
                value={`${Stage.vitals.temp}`}
                unit="°F"
                tone={Stage.vitals.temp >= 100 ? "warn" : "ok"}
              />
            </div>

            {/* EKG */}
            <div className="mt-4 rounded-xl border border-border bg-clinical-soft/30 p-3">
              <div className="mb-1 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                <span>Bed 7A · Ward B · live monitor</span>
                <span className="text-emerald">● streaming</span>
              </div>
              <svg viewBox="0 0 300 60" className="h-12 w-full">
                <path
                  d="M0 30 L40 30 L48 30 L54 10 L60 50 L66 30 L120 30 L128 30 L134 14 L140 46 L146 30 L200 30 L208 30 L214 8 L220 52 L226 30 L300 30"
                  fill="none"
                  stroke="oklch(0.66 0.16 155)"
                  strokeWidth="1.5"
                  className="animate-ekg"
                />
              </svg>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px]">
              <Pill2
                label="Housekeeping"
                value={Stage.bedState === "vacant" ? "Queued" : "—"}
                active={Stage.bedState === "vacant"}
              />
              <Pill2
                label="Nurse shift"
                value={Stage.bedState === "vacant" ? "Closed" : "Active"}
                active={Stage.bedState === "vacant"}
              />
              <Pill2
                label="Invoice"
                value={active >= 2 ? (active === 4 ? "Paid" : "Open") : "—"}
                active={active === 4}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BedStatus({ state }: { state: BedState }) {
  const map = {
    occupied: { label: "Occupied", cls: "bg-clinical/15 text-clinical" },
    watch: { label: "Watch", cls: "bg-warn/15 text-[oklch(0.5_0.14_75)]" },
    vacant: { label: "Vacant", cls: "bg-emerald/15 text-emerald" },
  } as const;
  const s = map[state];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${s.cls}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse-glow" />
      {s.label}
    </span>
  );
}

function Vital({
  icon,
  label,
  value,
  unit,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  tone: "ok" | "warn";
}) {
  const cls =
    tone === "warn"
      ? "border-warn/40 bg-warn/10"
      : "border-emerald/30 bg-emerald-soft/40";
  return (
    <div className={`rounded-xl border p-3 ${cls}`}>
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        <span className={tone === "warn" ? "text-warn" : "text-emerald"}>{icon}</span>
        {label}
      </div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-lg font-bold tabular-nums text-slate-ink">{value}</span>
        <span className="text-[10px] text-muted-foreground">{unit}</span>
      </div>
    </div>
  );
}

function Pill2({ label, value, active }: { label: string; value: string; active: boolean }) {
  return (
    <div
      className={`rounded-lg border px-2 py-2 transition ${active ? "border-emerald/40 bg-emerald-soft/60" : "border-border bg-white/60"}`}
    >
      <div className="text-muted-foreground">{label}</div>
      <div className={`mt-0.5 text-xs font-semibold ${active ? "text-emerald" : "text-slate-ink"}`}>
        {value}
      </div>
    </div>
  );
}
