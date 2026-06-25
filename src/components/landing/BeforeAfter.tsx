import { useRef, useState } from "react";
import { FileWarning, Sparkles } from "lucide-react";

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef(false);

  const onMove = (clientX: number) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos(Math.max(4, Math.min(96, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <section className="container mx-auto px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-soft/60 px-3 py-1 text-xs font-semibold text-teal-deep">
          <Sparkles size={12}/> Before & After
        </span>
        <h2 className="mt-4 text-4xl md:text-5xl font-bold text-slate-ink tracking-tight">From paper chaos to a unified command center.</h2>
        <p className="mt-3 text-muted-foreground">Drag the slider to see the difference MedFlow AI brings on day one.</p>
      </div>

      <div
        ref={ref}
        onMouseDown={(e)=>{drag.current=true;onMove(e.clientX);}}
        onMouseMove={(e)=>drag.current&&onMove(e.clientX)}
        onMouseUp={()=>drag.current=false}
        onMouseLeave={()=>drag.current=false}
        onTouchMove={(e)=>onMove(e.touches[0].clientX)}
        className="relative mx-auto mt-12 max-w-5xl aspect-[16/9] overflow-hidden rounded-3xl border border-[color:var(--card-border)] shadow-glow select-none cursor-ew-resize"
      >
        {/* After */}
        <div className="absolute inset-0 bg-slate-ink text-white p-6">
          <div className="text-[10px] uppercase tracking-wider text-emerald mb-1">After · MedFlow AI</div>
          <div className="text-lg font-semibold">Hospital Command Center</div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[["Occupancy","78%","bg-emerald"],["Revenue","₹4.2L","bg-teal-glow"],["Wait","6m","bg-amber-400"]].map(([l,v,c]:any)=>(
              <div key={l} className="rounded-lg bg-white/5 p-3"><div className="text-[10px] text-white/50">{l}</div><div className="text-xl font-bold">{v}</div><div className={`mt-1 h-1 rounded ${c}`}/></div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-12 gap-1">
            {Array.from({length:36}).map((_,i)=>{const s=i%5===0?"bg-emerald":i%7===0?"bg-amber-400":"bg-white/10";return <div key={i} className={`aspect-square rounded ${s}`}/>})}
          </div>
          <div className="mt-3 text-[11px] text-white/50">Live · synced 2s ago · 12 alerts cleared today</div>
        </div>

        {/* Before */}
        <div className="absolute inset-0 bg-amber-50 text-slate-ink p-6 overflow-hidden" style={{clipPath:`inset(0 ${100-pos}% 0 0)`}}>
          <div className="text-[10px] uppercase tracking-wider text-red-600 mb-1 flex items-center gap-1"><FileWarning size={11}/>Before · Paper + spreadsheets</div>
          <div className="text-lg font-semibold">Ward register · 14 Mar</div>
          <div className="mt-4 space-y-1.5 text-xs font-mono leading-relaxed">
            <div>Bed 01  R.Mehta   ?  Dr. Iyer  ...</div>
            <div className="line-through opacity-60">Bed 02  S.Kap..   discharged?</div>
            <div>Bed 03  ___________________</div>
            <div>Bed 04  A.Khan   adm 9am  fees pending</div>
            <div className="text-red-600">Bed 05  !!! missing chart</div>
            <div>Bed 06  P.Sharma  vitals 10am</div>
            <div>Bed 07  N.Pillai  L&D</div>
            <div className="opacity-60">— ledger continues page 14 →</div>
          </div>
          <div className="absolute bottom-4 left-6 right-6 rounded-md bg-red-100 border border-red-300 px-3 py-2 text-[11px] text-red-700">
            ⚠ 4 billing disputes this week · 2 lost charts · 38m avg wait
          </div>
        </div>

        {/* Slider handle */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_20px_rgba(255,255,255,0.6)]" style={{left:`${pos}%`}}>
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 grid h-10 w-10 place-items-center rounded-full bg-white text-slate-ink shadow-glow border border-border">
            <span className="text-xs font-bold">⇄</span>
          </div>
        </div>
        <span className="absolute top-3 left-3 rounded-full bg-red-600 text-white text-[10px] font-bold px-2 py-0.5">BEFORE</span>
        <span className="absolute top-3 right-3 rounded-full bg-emerald text-slate-ink text-[10px] font-bold px-2 py-0.5">AFTER</span>
      </div>
    </section>
  );
}
