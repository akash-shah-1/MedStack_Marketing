import { Check, Sparkles } from "lucide-react";

const tiers = [
  {
    name: "Clinic Starter",
    price: "$249",
    cadence: "/ month",
    desc: "For private clinics and small day-care centers.",
    cap: "Up to 15 beds",
    features: [
      "Patient registration & EHR",
      "Basic billing & scheduling",
      "Single-location deployment",
      "Email support",
    ],
    cta: "Start with Clinic",
    featured: false,
  },
  {
    name: "Hospital Professional",
    price: "$1,490",
    cadence: "/ month",
    desc: "The complete platform for growing hospitals.",
    cap: "Up to 150 beds",
    features: [
      "Full clinical workflows + EHR",
      "Live floor plans & bed control",
      "POS, TPA & insurance billing",
      "Pharmacy / Lab / Radiology queues",
      "Roster scheduler with shift timers",
      "Priority support · 99.5% SLA",
    ],
    cta: "Choose Professional",
    featured: true,
  },
  {
    name: "Enterprise Network",
    price: "Custom",
    cadence: "",
    desc: "For hospital networks and ministries of health.",
    cap: "Unlimited beds · Multi-tenant",
    features: [
      "Multi-tenant deployment",
      "Custom HL7 / FHIR integrations",
      "Dedicated success engineer",
      "Single sign-on (SSO / SAML)",
      "99.9% uptime SLA",
      "On-prem or private cloud options",
    ],
    cta: "Talk to Sales",
    featured: false,
  },
];

export function Pricing({ onDemo }: { onDemo: () => void }) {
  return (
    <section id="pricing" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass-panel px-3 py-1 text-xs font-medium text-teal-deep">
            Deployment Tiers
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-ink sm:text-5xl">
            Pricing that scales with your care network.
          </h2>
          <p className="mt-4 text-muted-foreground">
            All tiers include HIPAA-grade security, encrypted EHR, and 24/7 monitoring.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {tiers.map((t) => (
            <article
              key={t.name}
              className={`relative rounded-3xl p-8 transition hover:-translate-y-1 ${
                t.featured
                  ? "bg-gradient-to-br from-slate-ink to-[oklch(0.22_0.05_220)] text-white shadow-glow"
                  : "glass-panel text-slate-ink"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-emerald px-3 py-1 text-[11px] font-semibold text-slate-ink shadow-emerald">
                  <Sparkles size={12} /> Recommended
                </span>
              )}
              <h3 className={`text-xl font-bold ${t.featured ? "text-white" : "text-slate-ink"}`}>{t.name}</h3>
              <p className={`mt-1 text-sm ${t.featured ? "text-white/70" : "text-muted-foreground"}`}>{t.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className={`text-4xl font-bold ${t.featured ? "text-white" : "text-slate-ink"}`}>{t.price}</span>
                <span className={`text-sm ${t.featured ? "text-white/60" : "text-muted-foreground"}`}>{t.cadence}</span>
              </div>
              <div className={`mt-2 text-xs font-semibold uppercase tracking-wider ${t.featured ? "text-emerald" : "text-teal"}`}>
                {t.cap}
              </div>

              <ul className="mt-6 space-y-3 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full ${t.featured ? "bg-emerald/20 text-emerald" : "bg-emerald-soft text-emerald"}`}>
                      <Check size={10} />
                    </span>
                    <span className={t.featured ? "text-white/85" : "text-slate-ink/85"}>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onDemo}
                className={`mt-8 w-full rounded-full px-4 py-3 text-sm font-semibold transition ${
                  t.featured
                    ? "bg-emerald text-slate-ink hover:opacity-95"
                    : "bg-brand text-primary-foreground shadow-glow hover:opacity-95"
                }`}
              >
                {t.cta}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
