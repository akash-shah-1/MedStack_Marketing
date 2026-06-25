import { Quote, Star } from "lucide-react";

const items = [
  {
    quote:
      "We cut average discharge time from 4 hours to 38 minutes. The ward map alone changed how our nursing supervisors run the floor.",
    name: "Dr. Anjali Rao",
    role: "Chief Medical Officer, Apollo Care Network",
    initials: "AR",
    metric: "−91% discharge time",
  },
  {
    quote:
      "First HMS we've used that the billing team and the doctors actually agree on. Claims rejection rate dropped 41% in the first quarter.",
    name: "Marcus Lehmann",
    role: "CFO, St. Marien Hospital Group",
    initials: "ML",
    metric: "−41% claim rejections",
  },
  {
    quote:
      "Onboarded 3 hospitals in 5 weeks. The HL7 adapters meant our existing LIS and PACS just lit up — no rip-and-replace.",
    name: "Priya Nair",
    role: "VP Digital Health, Medanta",
    initials: "PN",
    metric: "3 sites · 5 weeks",
  },
  {
    quote:
      "Our ER charge nurses live in MedFlow. Acuity-aware bed assignment cut boarding time by half in the first month.",
    name: "Sarah Okonkwo",
    role: "Director of Nursing, Northpoint Health",
    initials: "SO",
    metric: "−52% ER boarding",
  },
  {
    quote:
      "The audit trail is the cleanest I've seen in 20 years of HIS rollouts. Our HIPAA auditors signed off in two sessions.",
    name: "James Whitaker",
    role: "Chief Compliance Officer, Cedar Valley",
    initials: "JW",
    metric: "HIPAA · 2-session audit",
  },
  {
    quote:
      "Stock-outs in pharmacy used to be weekly. With auto reorder and dispense queues, we've had zero this quarter.",
    name: "Dr. Hina Mirza",
    role: "Pharmacy Director, Crescent Hospitals",
    initials: "HM",
    metric: "0 stock-outs / quarter",
  },
];

function Card({ t }: { t: (typeof items)[number] }) {
  return (
    <figure className="glass-panel w-[360px] shrink-0 rounded-2xl p-7 transition hover:-translate-y-1 hover:shadow-glow">
      <div className="flex items-center justify-between">
        <Quote size={22} className="text-teal" />
        <div className="flex gap-0.5 text-warn">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
          ))}
        </div>
      </div>
      <blockquote className="mt-4 line-clamp-5 text-[15px] leading-relaxed text-slate-ink">
        "{t.quote}"
      </blockquote>
      <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-soft/60 px-2.5 py-1 text-[11px] font-semibold text-emerald">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse-glow" />
        {t.metric}
      </div>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-sm font-bold text-primary-foreground">
          {t.initials}
        </span>
        <div>
          <div className="text-sm font-semibold text-slate-ink">{t.name}</div>
          <div className="text-xs text-muted-foreground">{t.role}</div>
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const rowA = items;
  const rowB = [...items].reverse();
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
          <p className="mt-4 text-muted-foreground">
            Real results from hospitals running MedFlow AI today — paused on hover so you can read in peace.
          </p>
        </div>
      </div>

      <div className="mt-14 space-y-5">
        <Marquee items={rowA} speed="animate-marquee" />
        <Marquee items={rowB} speed="animate-marquee-slow" reverse />
      </div>
    </section>
  );
}

type Item = (typeof items)[number];

function Marquee({
  items: list,
  speed,
  reverse = false,
}: {
  items: Item[];
  speed: string;
  reverse?: boolean;
}) {
  return (
    <div
      className="group relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className={`flex w-max gap-5 ${speed} group-hover:[animation-play-state:paused]`}
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[...items, ...items].map((t: any, i: number) => (
          <Card key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}
