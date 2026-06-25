import { Brain, TrendingUp, AlertTriangle, Activity, Sparkles } from "lucide-react";

export function AIInsights() {
  return (
    <section id="ai" className="container mx-auto px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-soft/60 px-3 py-1 text-xs font-semibold text-teal-deep">
          <Brain size={12}/> Clinical AI
        </span>
        <h2 className="mt-4 text-4xl md:text-5xl font-bold text-slate-ink tracking-tight">AI that watches the ward — so your team doesn't have to.</h2>
        <p className="mt-3 text-muted-foreground">Predictive models trained on de-identified hospital telemetry. Always-on. Always explainable.</p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <Card icon={TrendingUp} title="Bed demand forecast" tag="Next 24h" tone="teal">
          <div className="flex items-end gap-1.5 h-24 mt-2">
            {[42,48,55,62,68,71,74,78,82,79,75,72].map((v,i)=>(
              <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-teal to-emerald" style={{height:`${v}%`}}/>
            ))}
          </div>
          <div className="mt-3 text-xs text-muted-foreground flex justify-between"><span>now</span><span>+12h</span><span>+24h</span></div>
          <div className="mt-3 rounded-lg border border-teal/30 bg-teal/5 p-3 text-xs">
            <b className="text-teal-deep">Recommendation:</b> open 4 ICU beds by 18:00 — predicted occupancy 87%.
          </div>
        </Card>

        <Card icon={AlertTriangle} title="Sepsis early warning" tag="2 at-risk" tone="amber">
          <ul className="mt-2 space-y-2 text-sm">
            {[{n:"Bed 09 · M. Singh",s:78,r:"↑ HR, ↓ BP, ↑ lactate"},{n:"Bed 04 · A. Khan",s:64,r:"↑ WBC, fever 39.2°C"},{n:"Bed 12 · T. Das",s:31,r:"Stable"}].map(p=>(
              <li key={p.n} className="rounded-lg border border-border bg-white p-3">
                <div className="flex justify-between"><span className="font-medium text-slate-ink">{p.n}</span><span className={`font-bold ${p.s>70?"text-red-600":p.s>50?"text-amber-600":"text-emerald"}`}>{p.s}</span></div>
                <div className="text-[11px] text-muted-foreground">{p.r}</div>
                <div className="mt-1.5 h-1 rounded-full bg-muted overflow-hidden"><div className={`h-full ${p.s>70?"bg-red-500":p.s>50?"bg-amber-400":"bg-emerald"}`} style={{width:`${p.s}%`}}/></div>
              </li>
            ))}
          </ul>
        </Card>

        <Card icon={Activity} title="Staff load balancing" tag="Live" tone="emerald">
          <div className="mt-2 space-y-2.5">
            {[{d:"Cardiology",l:92,c:"bg-red-500"},{d:"Pediatrics",l:48,c:"bg-emerald"},{d:"Ortho",l:71,c:"bg-amber-400"},{d:"General",l:60,c:"bg-teal"}].map(x=>(
              <div key={x.d} className="text-xs">
                <div className="flex justify-between mb-1"><span className="font-medium text-slate-ink">{x.d}</span><span className="text-muted-foreground">{x.l}% load</span></div>
                <div className="h-2 rounded-full bg-muted overflow-hidden"><div className={`h-full ${x.c}`} style={{width:`${x.l}%`}}/></div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-emerald/30 bg-emerald/5 p-3 text-xs flex items-start gap-2">
            <Sparkles size={14} className="text-emerald mt-0.5"/><span><b>AI suggests:</b> reroute 2 walk-ins from Cardio → General. Saves ~18m avg wait.</span>
          </div>
        </Card>
      </div>
    </section>
  );
}

function Card({ icon: Icon, title, tag, tone, children }: any) {
  const t: Record<string,string> = { teal: "text-teal-deep bg-teal/10", amber: "text-amber-700 bg-amber-400/15", emerald: "text-emerald bg-emerald/10" };
  return (
    <div className="rounded-3xl border border-[color:var(--card-border)] bg-white/90 p-6 shadow-glow">
      <div className="flex items-center justify-between">
        <div className={`inline-flex items-center gap-2 rounded-lg px-2.5 py-1 text-xs font-semibold ${t[tone]}`}><Icon size={13}/>{title}</div>
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{tag}</span>
      </div>
      {children}
    </div>
  );
}
