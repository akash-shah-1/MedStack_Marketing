import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { CheckCircle2, AlertTriangle, Activity, Globe2, Clock } from "lucide-react";

export const Route = createFileRoute("/status")({
  head: () => ({
    meta: [
      { title: "System Status — MedFlow AI" },
      { name: "description", content: "Real-time platform health, 90-day uptime history and incident reports for MedFlow AI." },
      { property: "og:title", content: "MedFlow AI System Status" },
      { property: "og:description", content: "Live operational status across regions, services and integrations." },
    ],
  }),
  component: StatusPage,
});

type Status = "operational" | "degraded" | "outage";

const services: { name: string; region: string; uptime: string; status: Status }[] = [
  { name: "Clinical Command Center", region: "Global", uptime: "99.998%", status: "operational" },
  { name: "Ward & Bed Management", region: "Global", uptime: "99.997%", status: "operational" },
  { name: "Billing & POS", region: "Global", uptime: "99.995%", status: "operational" },
  { name: "HL7 / FHIR Gateway", region: "EU · US · APAC", uptime: "99.993%", status: "operational" },
  { name: "Notifications (SMS / WhatsApp)", region: "Global", uptime: "99.99%", status: "operational" },
  { name: "Reporting & Analytics", region: "Global", uptime: "99.999%", status: "operational" },
];

const regions = [
  { name: "Europe (Frankfurt)", uptime: 99.998 },
  { name: "North America (Virginia)", uptime: 99.997 },
  { name: "Asia Pacific (Mumbai)", uptime: 99.995 },
  { name: "Middle East (Dubai)", uptime: 99.999 },
];

// Deterministic 90-day uptime bars — mostly green with a couple of yellow blips per row.
function makeBars(seed: number, blips: number[] = []): Status[] {
  return Array.from({ length: 90 }, (_, i) => {
    if (blips.includes(i)) return "degraded";
    if ((i + seed) % 47 === 0) return "degraded";
    return "operational";
  });
}

const incidents = [
  {
    date: "Jun 12, 2026",
    title: "Brief latency in APAC reporting",
    severity: "Minor",
    duration: "11m impact",
    summary: "Cache warm-up after a planned database failover increased report latency in the Mumbai region. Mitigated by re-routing reads to the read replica.",
    status: "Resolved",
  },
  {
    date: "May 28, 2026",
    title: "Scheduled maintenance — EU gateway",
    severity: "Maintenance",
    duration: "Completed within window",
    summary: "Quarterly TLS certificate rotation and HL7 gateway version upgrade. No customer-visible impact.",
    status: "Completed",
  },
  {
    date: "May 04, 2026",
    title: "Webhook retry backlog",
    severity: "Minor",
    duration: "22m impact",
    summary: "A throttling rule on a downstream payment provider caused a webhook retry queue to accumulate. Backlog drained automatically once the provider recovered.",
    status: "Resolved",
  },
];

function StatusPage() {
  return (
    <PageShell
      eyebrow="Live status"
      title={<>All systems <span className="text-gradient-brand">operational</span></>}
      subtitle="Real-time platform health across services and regions. 90-day rolling uptime shown per service."
    >
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          {/* Overall banner */}
          <div className="glass-panel flex flex-wrap items-center justify-between gap-4 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-emerald/15 text-emerald">
                <CheckCircle2 size={22} />
              </span>
              <div>
                <div className="text-base font-bold text-slate-ink">All systems operational</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Clock size={11} /> Last checked 12 seconds ago · auto-refresh 30s
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Metric label="Uptime · 90d" value="99.997%" />
              <Metric label="P95 API latency" value="118 ms" />
              <Metric label="Open incidents" value="0" />
            </div>
          </div>

          {/* Services with 90-day bars */}
          <div className="mt-8 glass-panel overflow-hidden rounded-2xl">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-ink">
                <Activity size={14} className="text-teal" /> Services
              </div>
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                <Legend color="bg-emerald" label="Operational" />
                <Legend color="bg-warn" label="Degraded" />
                <Legend color="bg-clinical" label="Outage" />
              </div>
            </div>
            <ul className="divide-y divide-border">
              {services.map((s, i) => {
                const bars = makeBars(i, i === 3 ? [12, 65] : i === 4 ? [40] : []);
                return (
                  <li key={s.name} className="grid gap-4 px-6 py-5 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-ink">{s.name}</span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald/10 px-2 py-0.5 text-[10px] font-semibold text-emerald">
                          <span className="h-1 w-1 rounded-full bg-emerald" /> Operational
                        </span>
                      </div>
                      <div className="mt-0.5 text-[11px] text-muted-foreground">{s.region}</div>
                      <div className="mt-3 flex items-end gap-[2px]" aria-hidden>
                        {bars.map((b, idx) => (
                          <span
                            key={idx}
                            title={`Day -${90 - idx}`}
                            className={`h-7 w-[3px] rounded-sm transition-all hover:h-8 ${
                              b === "degraded"
                                ? "bg-warn"
                                : b === "outage"
                                  ? "bg-clinical"
                                  : "bg-emerald/70"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                        <span>90 days ago</span>
                        <span>Today</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold tabular-nums text-slate-ink">{s.uptime}</div>
                      <div className="text-[11px] text-muted-foreground">90-day uptime</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Regional health */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {regions.map((r) => (
              <div key={r.name} className="glass-panel rounded-2xl p-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Globe2 size={12} className="text-teal" /> Region
                </div>
                <div className="mt-1 text-sm font-bold text-slate-ink">{r.name}</div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
                  <div className="h-full rounded-full bg-emerald" style={{ width: `${r.uptime}%` }} />
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-emerald">Operational</span>
                  <span className="tabular-nums text-muted-foreground">{r.uptime}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Incidents */}
          <div className="mt-12 flex items-end justify-between">
            <h2 className="text-xl font-bold text-slate-ink">Recent incidents</h2>
            <a href="#" className="text-xs font-semibold text-teal-deep hover:text-teal">View full history →</a>
          </div>
          <div className="mt-4 space-y-3">
            {incidents.map((i) => (
              <details key={i.title} className="glass-panel group rounded-2xl px-5 py-4 transition open:shadow-glow">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className={`mt-1 grid h-7 w-7 place-items-center rounded-full ${i.status === "Resolved" ? "bg-emerald/15 text-emerald" : "bg-teal/15 text-teal"}`}>
                      {i.status === "Resolved" ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-slate-ink">{i.title}</div>
                      <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                        <span>{i.date}</span>
                        <span>·</span>
                        <span className="rounded-full bg-border/60 px-2 py-0.5 font-medium text-slate-ink/70">{i.severity}</span>
                        <span>·</span>
                        <span>{i.duration}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald">{i.status}</span>
                </summary>
                <p className="mt-3 pl-10 text-sm leading-relaxed text-muted-foreground">{i.summary}</p>
              </details>
            ))}
          </div>

          {/* Subscribe */}
          <div className="mt-12 glass-panel flex flex-wrap items-center justify-between gap-4 rounded-2xl p-6">
            <div>
              <div className="text-base font-bold text-slate-ink">Subscribe to status updates</div>
              <div className="text-xs text-muted-foreground">Get email or webhook alerts the moment any service deviates.</div>
            </div>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="ops@yourhospital.com" className="rounded-xl border border-border bg-white/70 px-3 py-2 text-sm outline-none focus:border-teal" />
              <button className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-white/60 px-4 py-2">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-base font-bold tabular-nums text-slate-ink">{value}</div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-sm ${color}`} /> {label}
    </span>
  );
}
