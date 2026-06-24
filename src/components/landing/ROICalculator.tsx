import { useState, useMemo } from "react";
import { Clock, TrendingUp, BedDouble } from "lucide-react";

export function ROICalculator() {
  const [beds, setBeds] = useState(120);
  const [admissions, setAdmissions] = useState(35);

  const metrics = useMemo(() => {
    const hours = Math.round(beds * 6 + admissions * 14);
    const revenue = Math.round(beds * 80 + admissions * 320);
    const turnaround = Math.min(58, Math.round(28 + (admissions / 100) * 30));
    return { hours, revenue, turnaround };
  }, [beds, admissions]);

  return (
    <section id="roi" className="relative py-28">
      <div className="absolute inset-0 -z-10 bg-hero opacity-60" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass-panel px-3 py-1 text-xs font-medium text-teal-deep">
            Calculator for Administrators
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-ink sm:text-5xl">
            See your <span className="text-gradient-brand">ROI in 10 seconds.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Move the sliders to model staff hours, recovered revenue, and bed turnaround for your hospital.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <div className="glass-panel rounded-3xl p-8 lg:col-span-2">
            <Slider
              label="Number of beds"
              min={10}
              max={500}
              value={beds}
              onChange={setBeds}
              format={(v) => `${v} beds`}
            />
            <div className="mt-8">
              <Slider
                label="Average daily admissions"
                min={5}
                max={100}
                value={admissions}
                onChange={setAdmissions}
                format={(v) => `${v} / day`}
              />
            </div>
            <p className="mt-8 text-xs text-muted-foreground">
              Estimates based on aggregated MedFlow AI deployment data from 200+ hospitals (2024).
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-1 lg:col-span-3">
            <Metric
              icon={<Clock size={18} />}
              tone="teal"
              label="Hours saved / month"
              value={metrics.hours.toLocaleString()}
              suffix="hours"
              detail="Staff documentation, handoffs, and reconciliation eliminated."
            />
            <Metric
              icon={<TrendingUp size={18} />}
              tone="emerald"
              label="Revenue leakage recovered"
              value={`$${metrics.revenue.toLocaleString()}`}
              suffix="/ month"
              detail="Unbilled lab, pharmacy, and consumable orders captured automatically."
            />
            <Metric
              icon={<BedDouble size={18} />}
              tone="clinical"
              label="Bed turnaround improvement"
              value={`${metrics.turnaround}%`}
              suffix="faster"
              detail="Auto-discharge & housekeeping queue speeds vacancy detection."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider({ label, min, max, value, onChange, format }: { label: string; min: number; max: number; value: number; onChange: (v: number) => void; format: (v: number) => string }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-semibold text-slate-ink">{label}</label>
        <span className="text-lg font-bold text-teal-deep tabular-nums">{format(value)}</span>
      </div>
      <div className="relative mt-3">
        <div className="h-2 rounded-full bg-secondary" />
        <div
          className="absolute left-0 top-0 h-2 rounded-full bg-brand"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(+e.target.value)}
          className="absolute inset-0 h-2 w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-glow [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-teal [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-teal"
        />
      </div>
      <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
        <span>{min}</span><span>{max}</span>
      </div>
    </div>
  );
}

function Metric({ icon, tone, label, value, suffix, detail }: { icon: React.ReactNode; tone: "teal" | "emerald" | "clinical"; label: string; value: string; suffix: string; detail: string }) {
  const accent = {
    teal: "text-teal bg-teal/10",
    emerald: "text-emerald bg-emerald/10",
    clinical: "text-clinical bg-clinical/10",
  }[tone];
  return (
    <div className="glass-panel relative overflow-hidden rounded-3xl p-6">
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald/10 blur-3xl" />
      <div className="flex items-center gap-3">
        <span className={`grid h-10 w-10 place-items-center rounded-xl ${accent}`}>{icon}</span>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-4xl font-bold tabular-nums text-slate-ink">{value}</span>
        <span className="text-sm text-muted-foreground">{suffix}</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
    </div>
  );
}
