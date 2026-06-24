import { ShieldCheck, Lock, FileCheck, Globe, Quote } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "HIPAA Compliant" },
  { icon: Globe, label: "GDPR Compliant" },
  { icon: FileCheck, label: "HL7 / FHIR Compatible" },
  { icon: Lock, label: "256-bit EHR Encryption" },
];

export function Trust() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <span className="inline-flex items-center gap-2 rounded-full glass-panel px-3 py-1 text-xs font-medium text-teal-deep">
              Trust & Security
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-ink sm:text-5xl">
              Compliance built in,<br />not bolted on.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every patient record is encrypted at rest and in flight, with full audit trails for
              every clinical and financial action.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {badges.map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.label} className="glass-panel flex items-center gap-3 rounded-2xl px-4 py-3">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-soft text-emerald">
                      <Icon size={16} />
                    </span>
                    <span className="text-sm font-semibold text-slate-ink">{b.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <figure className="relative lg:col-span-3">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-teal-glow/20 blur-3xl" />
            <blockquote className="glass-panel relative rounded-3xl p-10 shadow-glow">
              <Quote className="absolute right-8 top-8 text-teal/20" size={64} />
              <p className="text-2xl font-medium leading-snug text-slate-ink">
                "MedFlow AI saved our nursing staff hours of administrative handoffs, and our
                billing matches clinical orders with <span className="text-gradient-brand font-bold">100% accuracy</span>."
              </p>
              <figcaption className="mt-8 flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-brand text-lg font-bold text-primary-foreground">
                  RM
                </div>
                <div>
                  <div className="font-semibold text-slate-ink">Dr. Rohan Mehta</div>
                  <div className="text-sm text-muted-foreground">Chief Medical Officer · Apollo Care Network</div>
                </div>
              </figcaption>
            </blockquote>
          </figure>
        </div>
      </div>
    </section>
  );
}
