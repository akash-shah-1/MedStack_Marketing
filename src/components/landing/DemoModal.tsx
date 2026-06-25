import { useEffect, useMemo, useState } from "react";
import { X, CheckCircle2, Calendar, Building2, User, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";

const TIMES = ["09:30", "11:00", "13:30", "15:00", "16:30"];

export function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [form, setForm] = useState({ name: "", email: "", hospital: "", beds: "", role: "" });
  const [done, setDone] = useState(false);

  const dates = useMemo(() => {
    const out: { iso: string; d: number; m: string; wd: string }[] = [];
    const base = new Date();
    for (let i = 1; i <= 6; i++) {
      const d = new Date(base); d.setDate(base.getDate() + i);
      out.push({
        iso: d.toISOString().slice(0,10),
        d: d.getDate(),
        m: d.toLocaleString("en", { month: "short" }),
        wd: d.toLocaleString("en", { weekday: "short" }),
      });
    }
    return out;
  }, []);

  useEffect(() => {
    if (!open) { setStep(1); setDone(false); setDate(""); setTime(""); }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const canNext = (step === 1 && date && time) || (step === 2 && form.name && form.email && form.hospital);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-slate-ink/70 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-xl rounded-3xl bg-white p-8 animate-scale-in shadow-glow border border-border">
        <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted transition" aria-label="Close"><X size={18} /></button>

        {done ? (
          <Success date={date} time={time} />
        ) : (
          <>
            <Stepper step={step} />

            {step === 1 && (
              <div className="mt-6">
                <h3 className="text-2xl font-bold text-slate-ink">Pick a slot</h3>
                <p className="mt-1 text-sm text-muted-foreground">30-minute live walkthrough with a solutions engineer.</p>
                <div className="mt-5 grid grid-cols-6 gap-2">
                  {dates.map(d => (
                    <button key={d.iso} onClick={()=>setDate(d.iso)} className={`rounded-xl border-2 p-2 text-center transition ${date===d.iso?"border-teal bg-teal/10":"border-border hover:border-teal/40"}`}>
                      <div className="text-[10px] uppercase text-muted-foreground">{d.wd}</div>
                      <div className="text-lg font-bold text-slate-ink">{d.d}</div>
                      <div className="text-[10px] text-muted-foreground">{d.m}</div>
                    </button>
                  ))}
                </div>
                {date && (
                  <>
                    <div className="mt-5 text-xs font-semibold text-slate-ink/80">Available times (IST)</div>
                    <div className="mt-2 grid grid-cols-5 gap-2">
                      {TIMES.map(t => (
                        <button key={t} onClick={()=>setTime(t)} className={`rounded-lg border-2 py-2 text-sm font-medium transition ${time===t?"border-teal bg-teal/10 text-teal-deep":"border-border hover:border-teal/40"}`}>{t}</button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="mt-6">
                <h3 className="text-2xl font-bold text-slate-ink">About you</h3>
                <p className="mt-1 text-sm text-muted-foreground">So we can tailor the walkthrough to your facility.</p>
                <div className="mt-5 space-y-3">
                  <Field label="Full name" value={form.name} onChange={v=>setForm({...form,name:v})} placeholder="Dr. Anjali Rao"/>
                  <Field label="Hospital email" type="email" value={form.email} onChange={v=>setForm({...form,email:v})} placeholder="anjali@apollocare.com"/>
                  <Field label="Hospital" value={form.hospital} onChange={v=>setForm({...form,hospital:v})} placeholder="Apollo Care Network"/>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Bed count" type="number" value={form.beds} onChange={v=>setForm({...form,beds:v})} placeholder="120"/>
                    <Field label="Role" value={form.role} onChange={v=>setForm({...form,role:v})} placeholder="CMO / IT Director"/>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="mt-6">
                <h3 className="text-2xl font-bold text-slate-ink">Confirm your demo</h3>
                <div className="mt-5 rounded-2xl border border-border bg-gradient-to-br from-emerald-soft/40 to-white p-5 space-y-3 text-sm">
                  <Row icon={Calendar} k="When" v={`${date} · ${time} IST`} />
                  <Row icon={User} k="Attendee" v={`${form.name} · ${form.role || "—"}`} />
                  <Row icon={Building2} k="Hospital" v={`${form.hospital}${form.beds?` · ${form.beds} beds`:""}`} />
                </div>
                <div className="mt-3 text-[11px] text-muted-foreground">Calendar invite goes to <b>{form.email}</b>. Reschedule any time.</div>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between">
              <button onClick={()=>setStep(Math.max(1,step-1))} disabled={step===1} className="inline-flex items-center gap-1 text-sm text-muted-foreground disabled:opacity-30"><ChevronLeft size={14}/>Back</button>
              {step < 3 ? (
                <button onClick={()=>canNext && setStep(step+1)} disabled={!canNext} className="inline-flex items-center gap-1 rounded-xl bg-slate-ink px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40">Continue <ChevronRight size={14}/></button>
              ) : (
                <button onClick={()=>setDone(true)} className="inline-flex items-center gap-1 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"><Sparkles size={14}/>Confirm demo</button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2">
      {[1,2,3].map(n => (
        <div key={n} className="flex-1">
          <div className={`h-1.5 rounded-full ${n<=step?"bg-teal":"bg-muted"}`}/>
          <div className={`mt-1.5 text-[10px] font-semibold ${n<=step?"text-teal-deep":"text-muted-foreground"}`}>
            {n===1?"01 · SCHEDULE":n===2?"02 · DETAILS":"03 · CONFIRM"}
          </div>
        </div>
      ))}
    </div>
  );
}

function Field({ label, value, onChange, ...props }: { label: string; value: string; onChange: (v: string) => void; [k: string]: any }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate-ink/80">{label}</span>
      <input value={value} onChange={(e)=>onChange(e.target.value)} {...props}
        className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-slate-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20"/>
    </label>
  );
}

function Row({ icon: Icon, k, v }: any) {
  return <div className="flex items-center gap-3"><Icon size={16} className="text-teal"/><span className="text-muted-foreground w-20 text-xs">{k}</span><span className="font-semibold text-slate-ink">{v}</span></div>;
}

function Success({ date, time }: { date: string; time: string }) {
  return (
    <div className="py-6 text-center relative overflow-hidden">
      <Confetti />
      <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-emerald-soft text-emerald animate-scale-in">
        <CheckCircle2 size={32}/>
      </div>
      <h3 className="text-2xl font-bold text-slate-ink">You're all set 🎉</h3>
      <p className="mt-2 text-sm text-muted-foreground">We've blocked <b>{date} · {time} IST</b>. A calendar invite is on its way.</p>
      <div className="mt-5 rounded-xl bg-muted/50 p-3 text-xs text-muted-foreground">Tip: invite your CIO or CFO — they usually have the sharpest questions.</div>
    </div>
  );
}

function Confetti() {
  const bits = Array.from({length:24}).map((_,i)=>i);
  const colors = ["bg-emerald","bg-teal","bg-teal-glow","bg-amber-400"];
  return (
    <div className="pointer-events-none absolute inset-0">
      {bits.map(i => (
        <span key={i} className={`absolute top-0 h-2 w-2 ${colors[i%4]} rounded-sm animate-[fall_1.6s_ease-out_forwards]`}
          style={{ left: `${(i*4.1)%100}%`, animationDelay: `${(i%6)*0.08}s`, transform: `rotate(${i*30}deg)` }}/>
      ))}
      <style>{`@keyframes fall { 0%{transform:translateY(-20px) rotate(0); opacity:1} 100%{transform:translateY(340px) rotate(540deg); opacity:0} }`}</style>
    </div>
  );
}
