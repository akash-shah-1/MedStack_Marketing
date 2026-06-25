import { Building2, Users, Globe2, ShieldCheck } from "lucide-react";

const stats = [
  { icon: Building2, value: "200+", label: "Hospitals onboarded", detail: "From 80-bed clinics to 1,200-bed networks" },
  { icon: Users, value: "38,000+", label: "Daily clinical users", detail: "Doctors, nurses, billing & ops teams" },
  { icon: Globe2, value: "14", label: "Countries deployed", detail: "Multi-region, multi-currency, multi-tenant" },
  { icon: ShieldCheck, value: "99.99%", label: "Platform uptime", detail: "Active-active across 3 regions" },
];

export function Stats() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass-panel px-3 py-1 text-xs font-medium text-teal-deep">
            By the numbers
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-ink sm:text-5xl">
            Trusted at the scale of <span className="text-gradient-brand">real hospital systems</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="glass-panel rounded-2xl p-6">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-primary-foreground shadow-glow">
                <s.icon size={18} />
              </span>
              <div className="mt-4 text-4xl font-bold tracking-tight text-slate-ink tabular-nums">{s.value}</div>
              <div className="mt-1 text-sm font-semibold text-slate-ink">{s.label}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
