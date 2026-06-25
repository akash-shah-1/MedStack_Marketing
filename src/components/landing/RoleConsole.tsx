import { useState } from "react";
import { Stethoscope, ClipboardList, HeartPulse, FlaskConical, Wallet, ArrowUpRight, CheckCircle2, AlertTriangle, Clock, FileText, Activity, IndianRupee } from "lucide-react";

type RoleKey = "doctor" | "reception" | "nurse" | "lab" | "revenue";

const ROLES: { key: RoleKey; label: string; icon: any; tag: string }[] = [
  { key: "doctor", label: "Doctor", icon: Stethoscope, tag: "Clinical Cockpit" },
  { key: "reception", label: "Reception", icon: ClipboardList, tag: "Front Desk OS" },
  { key: "nurse", label: "Nurse", icon: HeartPulse, tag: "Ward Station" },
  { key: "lab", label: "Path Lab", icon: FlaskConical, tag: "Sample-to-Report" },
  { key: "revenue", label: "Revenue", icon: Wallet, tag: "Finance HQ" },
];

export function RoleConsole() {
  const [role, setRole] = useState<RoleKey>("doctor");
  return (
    <section id="roles" className="container mx-auto px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-soft/60 px-3 py-1 text-xs font-semibold text-teal-deep">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse-glow" /> Choose your experience
        </span>
        <h2 className="mt-4 text-4xl md:text-5xl font-bold text-slate-ink tracking-tight">One platform. Five command centers.</h2>
        <p className="mt-3 text-muted-foreground">Switch roles to see the exact console your team will use on day one.</p>
      </div>

      <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-2">
        {ROLES.map((r) => {
          const Icon = r.icon;
          const active = role === r.key;
          return (
            <button
              key={r.key}
              onClick={() => setRole(r.key)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ring-1 ${
                active ? "bg-slate-ink text-white ring-slate-ink shadow-glow" : "bg-white/80 text-slate-ink ring-border hover:ring-teal/50"
              }`}
            >
              <Icon size={15} /> {r.label}
            </button>
          );
        })}
      </div>

      <div className="mt-10 rounded-3xl border border-[color:var(--card-border)] bg-gradient-to-b from-white to-slate-50 p-2 shadow-glow">
        <div className="rounded-[20px] bg-white p-6 md:p-8 text-slate-ink border border-[color:var(--card-border)]">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-soft text-teal-deep">
                {(() => { const I = ROLES.find(r => r.key === role)!.icon; return <I size={18} />; })()}
              </div>
              <div>
                <div className="text-xs text-muted-foreground">{ROLES.find(r => r.key === role)!.tag}</div>
                <div className="text-sm font-semibold">{ROLES.find(r => r.key === role)!.label} workspace</div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald animate-pulse-glow" /> Live • synced 2s ago
            </div>
          </div>
          <div className="pt-6">
            {role === "doctor" && <DoctorView />}
            {role === "reception" && <ReceptionView />}
            {role === "nurse" && <NurseView />}
            {role === "lab" && <LabView />}
            {role === "revenue" && <RevenueView />}
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({ children, title, action }: any) {
  return (
    <div className="rounded-xl border border-[color:var(--card-border)] bg-slate-50/60 p-4">
      <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-semibold tracking-wide uppercase">{title}</span>
        {action}
      </div>
      {children}
    </div>
  );
}

function Row({ children }: any) {
  return <div className="rounded-lg bg-white border border-border px-3 py-2">{children}</div>;
}

function DoctorView() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Panel title="Today's queue" action={<span className="text-emerald font-semibold">12 patients</span>}>
        <ul className="space-y-2 text-sm">
          {[
            { n: "Priya Sharma", t: "09:40", s: "In room", c: "bg-emerald text-white" },
            { n: "Rohan Mehta", t: "10:00", s: "Waiting", c: "bg-amber-400 text-slate-ink" },
            { n: "Aisha Khan", t: "10:20", s: "Vitals done", c: "bg-teal-glow text-slate-ink" },
          ].map((p) => (
            <li key={p.n} className="flex items-center justify-between rounded-lg bg-white border border-border px-3 py-2">
              <div>
                <div className="font-medium text-slate-ink">{p.n}</div>
                <div className="text-[11px] text-muted-foreground">{p.s}</div>
              </div>
              <span className={`text-[10px] rounded-full px-2 py-0.5 font-semibold ${p.c}`}>{p.t}</span>
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title="Active consult — Priya Sharma" action={<span className="text-muted-foreground font-mono">EHR #A-2941</span>}>
        <div className="text-sm space-y-2">
          <div className="flex items-center gap-2 text-slate-ink"><Activity size={14} className="text-emerald" /> Chief complaint: persistent cough, 7 days</div>
          <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
            <div className="rounded-md bg-white border border-border p-2"><div className="text-emerald font-semibold">98.4°F</div>Temp</div>
            <div className="rounded-md bg-white border border-border p-2"><div className="text-teal-deep font-semibold">82</div>HR</div>
            <div className="rounded-md bg-white border border-border p-2"><div className="font-semibold">120/78</div>BP</div>
          </div>
          <div className="rounded-lg border border-emerald/30 bg-emerald-soft/50 p-2 text-[11px] text-teal-deep"><b>AI suggests:</b> chest X-ray + CBC. Rule out: bronchitis, early pneumonia.</div>
        </div>
      </Panel>
      <Panel title="E-Prescription" action={<button className="text-emerald font-semibold">Send →</button>}>
        <div className="space-y-2 text-sm">
          <Row>Azithromycin 500mg · 1-0-0 · 5d</Row>
          <Row>Levocetirizine 5mg · 0-0-1 · 7d</Row>
          <div className="rounded-md bg-amber-50 border border-amber-300 px-3 py-2 text-[11px] text-amber-700">⚠ Interaction check passed · allergy: none</div>
        </div>
      </Panel>
    </div>
  );
}

function ReceptionView() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Panel title="Walk-ins" action={<span className="text-emerald font-semibold">+4 today</span>}>
        <div className="text-3xl font-bold text-slate-ink">28</div>
        <div className="mt-1 text-[11px] text-muted-foreground">Avg wait 6m 12s</div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200"><div className="h-full w-3/4 bg-emerald" /></div>
      </Panel>
      <Panel title="Quick register">
        <div className="space-y-2 text-sm">
          <input placeholder="Patient name" className="w-full rounded-md bg-white border border-border px-3 py-2 outline-none placeholder:text-muted-foreground" />
          <div className="grid grid-cols-2 gap-2">
            <input placeholder="Phone" className="rounded-md bg-white border border-border px-3 py-2 outline-none placeholder:text-muted-foreground" />
            <select className="rounded-md bg-white border border-border px-3 py-2 text-slate-ink"><option>Cardiology</option><option>Pediatrics</option></select>
          </div>
          <button className="w-full rounded-md bg-emerald py-2 text-white font-semibold hover:opacity-90">Register & assign token</button>
        </div>
      </Panel>
      <Panel title="Live token board">
        <div className="grid grid-cols-3 gap-2 text-center">
          {["A-12","A-13","A-14","B-07","B-08","C-21"].map((t,i)=>(
            <div key={t} className={`rounded-md py-3 text-sm font-mono border ${i===0?"bg-emerald text-white border-emerald":"bg-white border-border text-slate-ink"}`}>{t}</div>
          ))}
        </div>
        <div className="mt-3 text-[11px] text-muted-foreground">Now serving: <b className="text-emerald">A-12</b> · Room 4</div>
      </Panel>
    </div>
  );
}

function NurseView() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Panel title="My ward — 3W" action={<span className="font-semibold">8/12 beds</span>}>
        <div className="grid grid-cols-4 gap-1.5">
          {Array.from({length:12}).map((_,i)=>{
            const s = i<8 ? "bg-emerald" : i===8 ? "bg-amber-400" : "bg-slate-200";
            return <div key={i} className={`aspect-square rounded ${s}`} />;
          })}
        </div>
        <div className="mt-3 text-[11px] text-muted-foreground flex items-center gap-3"><span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald"/>Occupied</span><span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-400"/>Cleaning</span></div>
      </Panel>
      <Panel title="Medication round — 14:00">
        <ul className="space-y-2 text-sm">
          {[{b:"Bed 04",m:"Insulin 4u",d:false},{b:"Bed 07",m:"Amox 500mg",d:true},{b:"Bed 09",m:"Saline drip",d:false}].map(x=>(
            <li key={x.b} className="flex items-center justify-between rounded-md bg-white border border-border px-3 py-2">
              <div><div className="font-medium text-slate-ink">{x.b}</div><div className="text-[11px] text-muted-foreground">{x.m}</div></div>
              <CheckCircle2 size={18} className={x.d?"text-emerald":"text-slate-300"} />
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title="Alerts" action={<span className="text-amber-600 font-semibold">2 active</span>}>
        <div className="space-y-2 text-sm">
          <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-amber-800">
            <div className="flex items-center gap-2 font-medium"><AlertTriangle size={14}/> Bed 09 · HR ↑ 118 bpm</div>
            <div className="text-[11px] mt-1 text-amber-700">Threshold breach for 90s</div>
          </div>
          <div className="rounded-md border border-border bg-white p-3 text-slate-ink">
            <div className="flex items-center gap-2 font-medium"><Clock size={14}/> Bed 04 · IV due in 5m</div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

function LabView() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Panel title="Pending samples" action={<span className="text-emerald font-semibold">14 in queue</span>}>
        <ul className="space-y-2 text-sm">
          {[{id:"L-2941",t:"CBC",p:"P. Sharma",e:"12m"},{id:"L-2942",t:"LFT",p:"R. Mehta",e:"24m"},{id:"L-2943",t:"COVID PCR",p:"A. Khan",e:"45m"}].map(s=>(
            <li key={s.id} className="rounded-md bg-white border border-border p-3">
              <div className="flex justify-between"><span className="font-mono text-[11px] text-muted-foreground">{s.id}</span><span className="text-emerald text-[11px] font-semibold">ETA {s.e}</span></div>
              <div className="font-medium text-slate-ink">{s.t}</div><div className="text-[11px] text-muted-foreground">{s.p}</div>
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title="Result — CBC L-2941" action={<button className="text-emerald font-semibold">Sign & send</button>}>
        <table className="w-full text-xs">
          <tbody className="divide-y divide-border">
            {[["Hemoglobin","13.2","g/dL","13–17","ok"],["WBC","11.4","×10⁹/L","4–10","high"],["Platelets","240","×10⁹/L","150–400","ok"],["RBC","4.8","×10¹²/L","4.5–5.5","ok"]].map(r=>(
              <tr key={r[0] as string}><td className="py-1.5 text-slate-ink">{r[0]}</td><td className={r[4]==="high"?"text-amber-600 font-semibold":"font-semibold text-slate-ink"}>{r[1]}</td><td className="text-muted-foreground">{r[2]}</td><td className="text-muted-foreground">{r[3]}</td></tr>
            ))}
          </tbody>
        </table>
      </Panel>
      <Panel title="TAT performance">
        <div className="text-3xl font-bold text-emerald">94<span className="text-base text-muted-foreground">%</span></div>
        <div className="text-[11px] text-muted-foreground">Reports within SLA · 7d</div>
        <div className="mt-3 flex items-end gap-1 h-16">
          {[60,72,68,80,76,90,94].map((v,i)=>(<div key={i} className="flex-1 rounded-t bg-gradient-to-t from-teal to-emerald" style={{height:`${v}%`}}/>))}
        </div>
      </Panel>
    </div>
  );
}

function RevenueView() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Panel title="Today's collection" action={<span className="text-emerald inline-flex items-center font-semibold"><ArrowUpRight size={12}/>+12%</span>}>
        <div className="text-3xl font-bold flex items-center text-slate-ink"><IndianRupee size={20}/>4,28,940</div>
        <div className="mt-2 text-[11px] text-muted-foreground">Cash 32% · UPI 41% · Card 19% · Insurance 8%</div>
        <div className="mt-3 flex h-2 overflow-hidden rounded-full">
          <div className="bg-emerald" style={{width:"32%"}}/><div className="bg-teal-glow" style={{width:"41%"}}/><div className="bg-amber-400" style={{width:"19%"}}/><div className="bg-slate-300" style={{width:"8%"}}/>
        </div>
      </Panel>
      <Panel title="Claims dashboard">
        <div className="space-y-2 text-sm">
          {[{s:"Approved",n:142,c:"text-emerald"},{s:"In review",n:38,c:"text-amber-600"},{s:"Denied",n:6,c:"text-red-500"}].map(x=>(
            <div key={x.s} className="flex justify-between rounded-md bg-white border border-border px-3 py-2"><span className="text-slate-ink">{x.s}</span><span className={`font-semibold ${x.c}`}>{x.n}</span></div>
          ))}
          <div className="rounded-md border border-emerald/30 bg-emerald-soft/50 px-3 py-2 text-[11px] text-teal-deep">Auto-resubmitted 4 denials with corrected codes</div>
        </div>
      </Panel>
      <Panel title="Outstanding aging" action={<FileText size={14} className="text-muted-foreground"/>}>
        <div className="space-y-2 text-xs">
          {[["0–30d","₹2.1L",70],["31–60d","₹84k",30],["61–90d","₹42k",15],["90d+","₹18k",6]].map(([l,v,p]:any)=>(
            <div key={l}><div className="flex justify-between text-slate-ink"><span>{l}</span><span className="font-semibold">{v}</span></div>
              <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden mt-0.5"><div className="h-full bg-gradient-to-r from-teal to-emerald" style={{width:`${p}%`}}/></div></div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
