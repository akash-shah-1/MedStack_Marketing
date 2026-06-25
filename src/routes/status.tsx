import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/status")({
  head: () => ({
    meta: [
      { title: "System Status — MedFlow AI" },
      { name: "description", content: "Real-time status, uptime history, and incident reports for the MedFlow AI platform." },
      { property: "og:title", content: "MedFlow AI System Status" },
      { property: "og:description", content: "Live operational status across regions, services, and integrations." },
    ],
  }),
  component: StatusPage,
});

const services = [
  { name: "Clinical Command Center", region: "Global", uptime: "99.998%" },
  { name: "Ward & Bed Management", region: "Global", uptime: "99.997%" },
  { name: "Billing & POS", region: "Global", uptime: "99.995%" },
  { name: "HL7 / FHIR Gateway", region: "EU · US · APAC", uptime: "99.993%" },
  { name: "Notifications (SMS / WhatsApp)", region: "Global", uptime: "99.99%" },
  { name: "Reporting & Analytics", region: "Global", uptime: "99.999%" },
];

const incidents = [
  { date: "Jun 12, 2026", title: "Brief latency in APAC reporting", status: "Resolved · 11m impact" },
  { date: "May 28, 2026", title: "Scheduled maintenance — EU gateway", status: "Completed within window" },
  { date: "May 04, 2026", title: "Webhook retry backlog", status: "Resolved · 22m impact" },
];

function StatusPage() {
  return (
    <PageShell
      eyebrow="Live status"
      title={<>All systems <span className="text-gradient-brand">operational</span></>}
      subtitle="Real-time platform health across services and regions. 90-day rolling uptime shown per service."
    >
      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="glass-panel flex items-center justify-between rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald/15 text-emerald">
                <CheckCircle2 size={20} />
              </span>
              <div>
                <div className="text-base font-bold text-slate-ink">All systems operational</div>
                <div className="text-xs text-muted-foreground">Last checked 12 seconds ago</div>
              </div>
            </div>
            <span className="rounded-full bg-emerald/10 px-3 py-1 text-xs font-semibold text-emerald">99.99% · 90d</span>
          </div>

          <div className="mt-8 overflow-hidden glass-panel rounded-2xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-6 py-3 font-semibold">Service</th>
                  <th className="px-6 py-3 font-semibold">Region</th>
                  <th className="px-6 py-3 font-semibold">Uptime (90d)</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.name} className="border-b border-border/60 last:border-0">
                    <td className="px-6 py-4 font-medium text-slate-ink">{s.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{s.region}</td>
                    <td className="px-6 py-4 tabular-nums text-slate-ink">{s.uptime}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald/10 px-2.5 py-1 text-xs font-semibold text-emerald">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse-glow" /> Operational
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mt-12 text-xl font-bold text-slate-ink">Recent incidents</h2>
          <div className="mt-4 space-y-3">
            {incidents.map((i) => (
              <div key={i.title} className="glass-panel flex items-center justify-between rounded-xl px-5 py-4">
                <div>
                  <div className="text-sm font-semibold text-slate-ink">{i.title}</div>
                  <div className="text-xs text-muted-foreground">{i.date}</div>
                </div>
                <span className="text-xs font-medium text-emerald">{i.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
