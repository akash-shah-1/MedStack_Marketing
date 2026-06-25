import { useEffect, useState } from "react";
import { Hospital, Database, ShieldCheck, FileCheck2, FlaskConical, Radio } from "lucide-react";

const TRACKS = [
  { key: "hl7", label: "HL7 v2 · Lab orders", icon: FlaskConical, from: "EHR", to: "LIS", color: "from-teal to-teal-glow", note: "ORM^O01 → ORU^R01" },
  { key: "fhir", label: "FHIR R4 · Patient sync", icon: Radio, from: "MedFlow AI", to: "Cloud EHR", color: "from-emerald to-teal-glow", note: "Patient · Observation · Encounter" },
  { key: "tpa", label: "TPA · Pre-authorization", icon: ShieldCheck, from: "Billing", to: "Insurer", color: "from-amber-400 to-emerald", note: "Avg approval 42s" },
];

export function InteropFlow() {
  const [tick, setTick] = useState(0);
  useEffect(() => { const id = setInterval(() => setTick(t => t + 1), 2200); return () => clearInterval(id); }, []);

  return (
    <section id="interop" className="relative overflow-hidden bg-slate-ink py-24 text-white">
      <div className="absolute inset-0 bg-grid opacity-[0.05]" />
      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald">
            <Database size={12}/> Interoperability
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">HL7 · FHIR · TPA — wired in, end to end.</h2>
          <p className="mt-3 text-white/60">Watch real protocol exchanges flow between your hospital and the wider healthcare network.</p>
        </div>

        <div className="mt-14 mx-auto max-w-5xl space-y-6">
          {TRACKS.map((t, i) => {
            const Icon = t.icon;
            return (
              <div key={t.key} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-2 font-semibold"><Icon size={14} className="text-emerald"/>{t.label}</span>
                  <span className="text-white/40 font-mono">{t.note}</span>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <Node label={t.from} icon={Hospital} />
                  <div className="relative flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
                    <div className={`absolute inset-y-0 w-1/4 rounded-full bg-gradient-to-r ${t.color}`}
                      style={{ left: `${((tick * 8 + i * 30) % 120) - 25}%`, transition: "left 2.2s linear" }} />
                    <div className="absolute inset-0 flex items-center justify-around">
                      {Array.from({length:6}).map((_,j)=>(<span key={j} className="h-1 w-1 rounded-full bg-white/20"/>))}
                    </div>
                  </div>
                  <Node label={t.to} icon={t.key === "tpa" ? ShieldCheck : Database} />
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
                  <Pill ok>✓ Schema validated</Pill>
                  <Pill ok>✓ TLS 1.3 · mTLS</Pill>
                  <Pill ok><FileCheck2 size={11} className="inline mr-1"/>Audit logged</Pill>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 mx-auto max-w-5xl grid gap-4 md:grid-cols-4 text-center text-sm">
          {[["120+","Certified adapters"],["42s","Avg TPA approval"],["99.99%","Message delivery"],["SOC 2","Audited"]].map(([n,l])=>(
            <div key={l as string} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-2xl font-bold text-emerald">{n}</div>
              <div className="text-white/60 text-xs mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Node({ label, icon: Icon }: any) {
  return (
    <div className="flex flex-col items-center gap-1 min-w-[80px]">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 border border-white/10"><Icon size={16}/></div>
      <span className="text-[11px] text-white/70 font-medium">{label}</span>
    </div>
  );
}
function Pill({ children, ok }: any) {
  return <span className={`rounded-md px-2 py-1 ${ok?"bg-emerald/10 text-emerald border border-emerald/30":"bg-white/5"}`}>{children}</span>;
}
