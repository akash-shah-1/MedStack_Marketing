import { useState } from "react";
import { ArrowRight, CheckCircle2, Activity, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";

const footerCols: { title: string; items: { label: string; to: string }[] }[] = [
  {
    title: "Product",
    items: [
      { label: "Features", to: "/features" },
      { label: "Pricing", to: "/pricing" },
      { label: "Security", to: "/security" },
      { label: "Integrations", to: "/integrations" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", to: "/about" },
      { label: "Team", to: "/team" },
      { label: "Customers", to: "/customers" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Case studies", to: "/case-studies" },
      { label: "Blog", to: "/blog" },
      { label: "Docs", to: "/docs" },
      { label: "HL7 / FHIR", to: "/integrations" },
      { label: "Status", to: "/status" },
      { label: "Changelog", to: "/changelog" },
    ],
  },
  {
    title: "Compare",
    items: [
      { label: "vs Epic", to: "/compare/epic" },
      { label: "vs Cerner", to: "/compare/cerner" },
    ],
  },
];

export function LeadCapture() {
  const [sent, setSent] = useState(false);

  return (
    <section className="relative overflow-hidden py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-ink via-[oklch(0.24_0.06_220)] to-teal-deep p-10 shadow-glow sm:p-16">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald/30 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-teal-glow/30 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse-glow" />
                Onboard in under 4 weeks
              </span>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Ready to modernize your hospital operations?
              </h2>
              <p className="mt-4 max-w-md text-white/70">
                Schedule a 30-minute walkthrough tailored to your specialty mix, bed count, and billing model.
              </p>
              <div className="mt-8 flex items-center gap-6 text-sm text-white/80">
                <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald" /> No card required</div>
                <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald" /> Live data sandbox</div>
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-7">
              {sent ? (
                <div className="py-10 text-center">
                  <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-emerald-soft text-emerald">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-ink">You're on the list.</h3>
                  <p className="mt-2 text-sm text-muted-foreground">A solutions architect will reach out within 1 business day.</p>
                </div>
              ) : (
                <form
                  className="space-y-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <h3 className="mb-2 text-lg font-bold text-slate-ink">Book your demo</h3>
                  <Field label="Full name" name="name" placeholder="Dr. Anjali Rao" />
                  <Field label="Hospital email" name="email" type="email" placeholder="anjali@apollocare.com" />
                  <Field label="Hospital name" name="hospital" placeholder="Apollo Care Network" />
                  <Field label="Bed count" name="beds" type="number" placeholder="120" />
                  <button
                    type="submit"
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95"
                  >
                    Schedule my demo
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate-ink/80">{label}</span>
      <input
        {...props}
        required
        className="w-full rounded-xl border border-border bg-white/70 px-3 py-2.5 text-sm text-slate-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20"
      />
    </label>
  );
}

function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <div className="mb-12 grid gap-6 rounded-3xl border border-border bg-gradient-to-br from-emerald-soft/40 to-teal-glow/20 p-6 sm:p-8 md:grid-cols-2 md:items-center">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-teal-deep">
          <Mail size={13} /> Insights, monthly
        </div>
        <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-ink">
          One email a month. Real lessons from real hospitals.
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Benchmarks, playbooks and product deep dives — no fluff.
        </p>
      </div>
      {done ? (
        <div className="rounded-2xl bg-white/80 p-5 text-center">
          <CheckCircle2 className="mx-auto mb-2 text-emerald" />
          <div className="text-sm font-semibold text-slate-ink">Subscribed. Watch your inbox.</div>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
          className="flex flex-col gap-2 sm:flex-row"
        >
          <input
            type="email"
            required
            placeholder="you@hospital.com"
            className="flex-1 rounded-xl border border-border bg-white/80 px-4 py-3 text-sm text-slate-ink outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
          />
          <button className="rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-95">
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-border pt-12">
      <div className="mx-auto max-w-7xl px-6 pb-10">
        <Newsletter />
        <div className="grid gap-10 md:grid-cols-6">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand text-primary-foreground">
                <Activity size={16} strokeWidth={2.5} />
              </span>
              <span className="text-base font-bold tracking-tight text-slate-ink">
                MedFlow<span className="text-teal">AI</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              The operating system for modern hospitals. Designed with clinicians, engineered for compliance.
            </p>
          </div>

          {footerCols.map((col) => (
            <div key={col.title}>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-ink">{col.title}</div>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {col.items.map((i) => (
                  <li key={i.to}>
                    <Link to={i.to} className="transition hover:text-teal">
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} MedFlow AI, Inc. All rights reserved.</span>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-teal">Privacy</Link>
            <Link to="/terms" className="hover:text-teal">Terms</Link>
            <Link to="/dpa" className="hover:text-teal">DPA</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
