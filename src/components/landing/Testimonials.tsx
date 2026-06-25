import { Quote } from "lucide-react";

const items = [
  {
    quote:
      "We cut average discharge time from 4 hours to 38 minutes. The ward map alone changed how our nursing supervisors run the floor.",
    name: "Dr. Anjali Rao",
    role: "Chief Medical Officer, Apollo Care Network",
    initials: "AR",
  },
  {
    quote:
      "First HMS we've used that the billing team and the doctors actually agree on. Claims rejection rate dropped 41% in the first quarter.",
    name: "Marcus Lehmann",
    role: "CFO, St. Marien Hospital Group",
    initials: "ML",
  },
  {
    quote:
      "Onboarded 3 hospitals in 5 weeks. The HL7 adapters meant our existing LIS and PACS just lit up — no rip-and-replace.",
    name: "Priya Nair",
    role: "VP Digital Health, Medanta",
    initials: "PN",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass-panel px-3 py-1 text-xs font-medium text-teal-deep">
            Voices from the floor
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-ink sm:text-5xl">
            Clinicians and CFOs, <span className="text-gradient-brand">aligned for once</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {items.map((t) => (
            <figure key={t.name} className="glass-panel rounded-2xl p-7">
              <Quote size={22} className="text-teal" />
              <blockquote className="mt-4 text-[15px] leading-relaxed text-slate-ink">"{t.quote}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-sm font-bold text-primary-foreground">
                  {t.initials}
                </span>
                <div>
                  <div className="text-sm font-semibold text-slate-ink">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
