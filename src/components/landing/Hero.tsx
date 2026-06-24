import { useEffect, useState } from "react";
import { ArrowRight, BedDouble, Users, Wallet, Activity, HeartPulse, Stethoscope } from "lucide-react";

export function Hero({ onDemo }: { onDemo: () => void }) {
  return (
    <section id="top" className="relative overflow-hidden bg-hero pt-32 pb-24 sm:pt-40">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute left-1/2 top-1/3 -z-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-teal-glow/30 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full glass-panel px-4 py-1.5 text-xs font-medium text-teal-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse-glow" />
            Trusted by 200+ care networks across 14 countries
          </span>
          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1.05] tracking-tight text-slate-ink sm:text-6xl lg:text-7xl">
            The Operating System for{" "}
            <span className="text-gradient-brand">Modern Hospitals</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
            Unify clinical workflows, live bed management, and revenue cycles in a single,
            high-performance platform — purpose-built for the rhythm of real hospitals.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={onDemo}
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95"
            >
              Schedule a Live Demo
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </button>
            <a
              href="#workflows"
              className="inline-flex items-center gap-2 rounded-full glass-panel px-6 py-3.5 text-sm font-semibold text-slate-ink transition hover:bg-white"
            >
              Explore Interactive Workflows
            </a>
          </div>
        </div>

        <CommandCenter />
      </div>
    </section>
  );
}

function CommandCenter() {
  const [revenue, setRevenue] = useState(14250);
  useEffect(() => {
    const id = setInterval(() => setRevenue((r) => r + Math.floor(Math.random() * 60) + 10), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto mt-20 max-w-6xl">
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-teal-glow/20 blur-3xl" />
      <div className="glass-panel rounded-3xl p-3 shadow-glow sm:p-5">
        <div className="rounded-2xl bg-gradient-to-br from-slate-ink to-[oklch(0.2_0.04_220)] p-6 text-white sm:p-8">
          {/* Window chrome */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-critical/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-warn/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald/80" />
              <span className="ml-3 text-xs text-white/60">command.medflow.ai / overview</span>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald/15 px-2.5 py-1 text-[11px] font-medium text-emerald">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse-glow" />
                Live
              </span>
              <span className="text-xs text-white/50">St. Marien Hospital · Floor B</span>
            </div>
          </div>

          {/* KPI strip */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <KPI
              icon={<BedDouble size={16} />}
              label="Bed Occupancy"
              value="84%"
              detail="General: 12 vacant · ICU: 2 vacant"
              tone="teal"
            />
            <KPI
              icon={<Users size={16} />}
              label="Active Consultations"
              value="8"
              detail="Patients in queue · 3 priority"
              tone="clinical"
            />
            <KPI
              icon={<Wallet size={16} />}
              label="Revenue Collected Today"
              value={`$${revenue.toLocaleString()}`}
              detail="POS · Insurance · TPA"
              tone="emerald"
            />
          </div>

          {/* Main grid */}
          <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="glass-dark rounded-2xl p-5 lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-sm font-semibold">Ward Floor Map · Wing B</h4>
                <span className="text-[11px] text-white/50">Updated 2s ago</span>
              </div>
              <FloorMap />
              <div className="mt-4 flex items-center gap-4 text-[11px] text-white/60">
                <Legend color="bg-emerald" label="Vacant" />
                <Legend color="bg-clinical" label="Occupied" />
                <Legend color="bg-warn" label="Watch" />
                <Legend color="bg-critical" label="Critical" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="glass-dark rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold">Vitals · Bed 14C</h4>
                  <HeartPulse size={14} className="text-emerald animate-pulse-glow" />
                </div>
                <VitalsSpark />
                <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
                  <Vital label="HR" value="78" unit="bpm" />
                  <Vital label="SpO₂" value="98" unit="%" />
                  <Vital label="BP" value="118/76" unit="" />
                </div>
              </div>

              <div className="glass-dark rounded-2xl p-5">
                <h4 className="text-sm font-semibold">Consultation Queue</h4>
                <ul className="mt-3 space-y-2 text-xs">
                  {[
                    ["MRN-08842 · R. Mehta", "Dr. Iyer · 10:24", "emerald"],
                    ["MRN-08851 · K. Schmidt", "Dr. Patel · 10:32", "clinical"],
                    ["MRN-08855 · L. Hoffman", "Dr. Iyer · 10:45", "warn"],
                  ].map(([who, when, tone]) => (
                    <li key={who} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                      <span className="text-white/85">{who}</span>
                      <span className="flex items-center gap-2 text-white/55">
                        <span className={`h-1.5 w-1.5 rounded-full bg-${tone}`} />
                        {when}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating widgets */}
      <FloatChip
        className="absolute -left-4 top-24 hidden lg:flex"
        icon={<Stethoscope size={14} />}
        title="Dr. Iyer signed consult"
        sub="MRN-08842 · Pathology ordered"
        tone="teal"
      />
      <FloatChip
        className="absolute -right-4 top-44 hidden lg:flex"
        icon={<Activity size={14} />}
        title="Bed 7A freed"
        sub="Auto-discharge · Cleaning queued"
        tone="emerald"
      />
    </div>
  );
}

function KPI({ icon, label, value, detail, tone }: { icon: React.ReactNode; label: string; value: string; detail: string; tone: "teal" | "clinical" | "emerald" }) {
  const toneMap = {
    teal: "from-teal/25 to-teal/5 text-teal-glow",
    clinical: "from-clinical/25 to-clinical/5 text-clinical",
    emerald: "from-emerald/25 to-emerald/5 text-emerald",
  };
  return (
    <div className={`rounded-2xl border border-white/10 bg-gradient-to-br ${toneMap[tone]} p-4`}>
      <div className="flex items-center justify-between text-white/60">
        <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wider">{icon}{label}</span>
      </div>
      <div className="mt-2 text-2xl font-bold tabular-nums text-white">{value}</div>
      <div className="mt-1 text-[11px] text-white/55">{detail}</div>
    </div>
  );
}

function FloorMap() {
  const beds = [
    "e","e","c","o","o","e","w","o",
    "o","c","o","e","o","o","e","o",
    "e","o","w","o","e","c","o","o",
  ];
  const tone: Record<string, string> = {
    e: "bg-emerald/80",
    o: "bg-clinical/70",
    w: "bg-warn/80",
    c: "bg-critical/80",
  };
  return (
    <div className="grid grid-cols-8 gap-1.5">
      {beds.map((b, i) => (
        <div
          key={i}
          className={`aspect-square rounded-md ${tone[b]} transition hover:scale-110`}
          style={{ animationDelay: `${i * 30}ms` }}
        />
      ))}
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-sm ${color}`} />
      {label}
    </span>
  );
}

function Vital({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="rounded-lg bg-white/5 p-2">
      <div className="text-white/50">{label}</div>
      <div className="font-semibold text-white">
        {value}
        <span className="ml-0.5 text-[10px] font-normal text-white/50">{unit}</span>
      </div>
    </div>
  );
}

function VitalsSpark() {
  return (
    <svg viewBox="0 0 200 60" className="mt-3 h-16 w-full">
      <defs>
        <linearGradient id="vg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.72 0.12 190)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="oklch(0.72 0.12 190)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 40 L20 40 L28 20 L34 50 L42 30 L60 40 L80 40 L88 18 L94 52 L102 32 L120 40 L140 40 L148 22 L154 48 L162 30 L200 40"
        fill="none"
        stroke="oklch(0.72 0.12 190)"
        strokeWidth="1.6"
      />
      <path
        d="M0 40 L20 40 L28 20 L34 50 L42 30 L60 40 L80 40 L88 18 L94 52 L102 32 L120 40 L140 40 L148 22 L154 48 L162 30 L200 40 L200 60 L0 60 Z"
        fill="url(#vg)"
      />
    </svg>
  );
}

function FloatChip({ className = "", icon, title, sub, tone }: { className?: string; icon: React.ReactNode; title: string; sub: string; tone: "teal" | "emerald" }) {
  const dot = tone === "emerald" ? "bg-emerald" : "bg-teal-glow";
  return (
    <div className={`glass-panel animate-float items-center gap-3 rounded-2xl px-4 py-3 shadow-glow ${className}`}>
      <span className={`grid h-8 w-8 place-items-center rounded-xl bg-white text-teal-deep`}>{icon}</span>
      <div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-ink">
          <span className={`h-1.5 w-1.5 rounded-full ${dot} animate-pulse-glow`} />
          {title}
        </div>
        <div className="text-[11px] text-muted-foreground">{sub}</div>
      </div>
    </div>
  );
}
