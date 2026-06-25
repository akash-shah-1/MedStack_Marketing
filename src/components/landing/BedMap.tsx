import { useMemo, useState } from "react";
import { BedDouble, Wind, Sparkles, AlertTriangle } from "lucide-react";

type Status = "occupied" | "available" | "cleaning" | "critical";
type Bed = { id: string; ward: string; status: Status; patient?: string; doctor?: string; admitted?: string; vitals?: { hr: number; bp: string; spo2: number } };

const BEDS: Bed[] = [
  { id: "ICU-01", ward: "ICU", status: "critical", patient: "R. Mehta, 62", doctor: "Dr. Iyer", admitted: "2d 4h", vitals: { hr: 112, bp: "150/95", spo2: 91 } },
  { id: "ICU-02", ward: "ICU", status: "occupied", patient: "S. Kapoor, 48", doctor: "Dr. Iyer", admitted: "16h", vitals: { hr: 88, bp: "128/82", spo2: 96 } },
  { id: "ICU-03", ward: "ICU", status: "available" },
  { id: "GW-04",  ward: "General", status: "occupied", patient: "A. Khan, 34", doctor: "Dr. Rao", admitted: "1d", vitals: { hr: 76, bp: "118/76", spo2: 98 } },
  { id: "GW-05",  ward: "General", status: "cleaning" },
  { id: "GW-06",  ward: "General", status: "occupied", patient: "P. Sharma, 29", doctor: "Dr. Rao", admitted: "8h", vitals: { hr: 82, bp: "120/78", spo2: 99 } },
  { id: "MAT-07", ward: "Maternity", status: "occupied", patient: "N. Pillai, 31", doctor: "Dr. Banerjee", admitted: "6h", vitals: { hr: 86, bp: "126/80", spo2: 98 } },
  { id: "MAT-08", ward: "Maternity", status: "available" },
  { id: "PED-09", ward: "Pediatric", status: "occupied", patient: "M. Singh, 8", doctor: "Dr. Verma", admitted: "12h", vitals: { hr: 102, bp: "100/65", spo2: 97 } },
  { id: "PED-10", ward: "Pediatric", status: "cleaning" },
  { id: "OPD-11", ward: "General", status: "available" },
  { id: "OPD-12", ward: "General", status: "occupied", patient: "T. Das, 55", doctor: "Dr. Rao", admitted: "3h", vitals: { hr: 90, bp: "134/86", spo2: 95 } },
];

const FILTERS: { k: "all" | Status; label: string }[] = [
  { k: "all", label: "All" },
  { k: "occupied", label: "Occupied" },
  { k: "available", label: "Available" },
  { k: "cleaning", label: "Cleaning" },
  { k: "critical", label: "Critical" },
];

const STYLES: Record<Status, string> = {
  occupied: "bg-teal/15 border-teal/50 text-teal-deep",
  available: "bg-emerald/15 border-emerald/50 text-emerald",
  cleaning: "bg-amber-400/15 border-amber-400/50 text-amber-700",
  critical: "bg-red-500/15 border-red-500/60 text-red-600",
};

export function BedMap() {
  const [filter, setFilter] = useState<"all" | Status>("all");
  const [active, setActive] = useState<Bed | null>(BEDS[0]);
  const visible = useMemo(() => BEDS.filter(b => filter === "all" || b.status === filter), [filter]);
  const counts = useMemo(() => ({
    occupied: BEDS.filter(b=>b.status==="occupied").length,
    available: BEDS.filter(b=>b.status==="available").length,
    cleaning: BEDS.filter(b=>b.status==="cleaning").length,
    critical: BEDS.filter(b=>b.status==="critical").length,
  }), []);

  return (
    <section id="bedmap" className="container mx-auto px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-soft/60 px-3 py-1 text-xs font-semibold text-teal-deep">
          <BedDouble size={12} /> Command Center
        </span>
        <h2 className="mt-4 text-4xl md:text-5xl font-bold text-slate-ink tracking-tight">Every bed, every ward — in one glance.</h2>
        <p className="mt-3 text-muted-foreground">Real-time occupancy, vitals, and housekeeping status across your facility.</p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-3xl border border-[color:var(--card-border)] bg-white/80 p-6 shadow-glow">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {FILTERS.map(f => (
                <button key={f.k} onClick={() => setFilter(f.k)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition ${filter===f.k ? "bg-slate-ink text-white ring-slate-ink" : "bg-white text-slate-ink ring-border hover:ring-teal/50"}`}>
                  {f.label}{f.k !== "all" && <span className="ml-1 opacity-60">{counts[f.k as Status]}</span>}
                </button>
              ))}
            </div>
            <div className="text-xs text-muted-foreground inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald animate-pulse-glow"/>Live</div>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {visible.map(b => {
              const isActive = active?.id === b.id;
              return (
                <button key={b.id} onMouseEnter={()=>setActive(b)} onClick={()=>setActive(b)}
                  className={`relative aspect-[4/3] rounded-xl border-2 p-3 text-left transition hover:scale-[1.03] ${STYLES[b.status]} ${isActive?"ring-2 ring-teal":""}`}>
                  <div className="text-[10px] uppercase tracking-wide opacity-70">{b.ward}</div>
                  <div className="font-mono font-bold">{b.id}</div>
                  <BedDouble size={18} className="absolute right-2 bottom-2 opacity-50"/>
                  {b.status === "critical" && <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 animate-pulse-glow"/>}
                </button>
              );
            })}
          </div>
        </div>

        <aside className="rounded-3xl border border-[color:var(--card-border)] bg-slate-ink p-6 text-white shadow-glow min-h-[360px]">
          {active ? (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-white/50">{active.ward}</div>
                  <div className="text-2xl font-bold font-mono">{active.id}</div>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${STYLES[active.status].replace("text-","text-").replace("border-","")}`}>{active.status}</span>
              </div>
              {active.patient ? (
                <>
                  <div className="mt-5 rounded-xl bg-white/5 p-3 text-sm">
                    <div className="text-white/50 text-[11px]">Patient</div>
                    <div className="font-semibold">{active.patient}</div>
                    <div className="text-[11px] text-white/60 mt-1">{active.doctor} · admitted {active.admitted}</div>
                  </div>
                  {active.vitals && (
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px]">
                      <div className="rounded-md bg-white/5 p-2"><div className="text-teal-glow font-semibold text-base">{active.vitals.hr}</div>HR</div>
                      <div className="rounded-md bg-white/5 p-2"><div className="font-semibold text-base">{active.vitals.bp}</div>BP</div>
                      <div className="rounded-md bg-white/5 p-2"><div className="text-emerald font-semibold text-base">{active.vitals.spo2}%</div>SpO₂</div>
                    </div>
                  )}
                  {active.status === "critical" && (
                    <div className="mt-3 rounded-lg border border-red-500/40 bg-red-500/15 p-2.5 text-[11px] text-red-200 flex items-start gap-2">
                      <AlertTriangle size={14} className="mt-0.5"/> AI: deteriorating trend detected. Page rapid response?
                    </div>
                  )}
                </>
              ) : active.status === "available" ? (
                <div className="mt-5 rounded-xl border border-emerald/30 bg-emerald/10 p-4 text-sm text-emerald flex items-center gap-2"><Sparkles size={14}/> Ready for admission</div>
              ) : (
                <div className="mt-5 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200 flex items-center gap-2"><Wind size={14}/> Housekeeping in progress · ETA 12m</div>
              )}
              <div className="mt-5 grid grid-cols-2 gap-2">
                <button className="rounded-lg bg-emerald py-2 text-xs font-semibold text-slate-ink">Assign patient</button>
                <button className="rounded-lg border border-white/15 py-2 text-xs font-semibold">View chart</button>
              </div>
            </>
          ) : <div className="text-white/50 text-sm">Hover any bed for details.</div>}
        </aside>
      </div>
    </section>
  );
}
