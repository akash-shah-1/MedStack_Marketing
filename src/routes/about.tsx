import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";

const stats = [
  { value: "120+", label: "Hospitals on platform" },
  { value: "18M", label: "Patient encounters / year" },
  { value: "11", label: "Countries deployed" },
  { value: "99.97%", label: "Uptime · trailing 12 mo." },
];

const values = [
  {
    title: "Clinicians first",
    desc: "Every screen is co-designed with practicing doctors and nurses. If it slows a clinician down, it doesn't ship.",
  },
  {
    title: "Trust by default",
    desc: "We treat every record as if it were our own family's. Security and auditability are non-negotiable foundations.",
  },
  {
    title: "One integrated truth",
    desc: "Clinical, billing and operational data live in a single platform — no reconciliations, no exports, no surprises.",
  },
];

const timeline = [
  { year: "2021", text: "Founded by a CMO, a CTO and an ICU nurse after a chaotic year on the COVID front line." },
  { year: "2022", text: "First 12 hospitals onboarded across India and the Middle East." },
  { year: "2024", text: "Crossed 10M patient encounters; launched FHIR-native APIs and roster scheduler." },
  { year: "2026", text: "Operating across 11 countries with a 99.97% trailing uptime." },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — MedFlow AI" },
      {
        name: "description",
        content:
          "MedFlow AI is the operating system for modern hospitals — built by clinicians, engineers and operators who lived the pain of fragmented healthcare software.",
      },
      { property: "og:title", content: "About — MedFlow AI" },
      { property: "og:description", content: "Why we're rebuilding hospital software from the ward up." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell
      eyebrow="Company"
      title={<>Software that respects the <span className="text-gradient-brand">people who save lives.</span></>}
      subtitle="We're a team of clinicians, engineers and hospital operators rebuilding the systems that doctors, nurses and CFOs rely on every minute."
    >
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="glass-panel grid gap-6 rounded-3xl p-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-4xl font-bold text-slate-ink">{s.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-20 grid gap-10 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="glass-panel rounded-3xl p-7">
                <h3 className="text-lg font-bold text-slate-ink">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-24">
            <h2 className="text-3xl font-bold tracking-tight text-slate-ink">Our story</h2>
            <ol className="mt-8 space-y-6 border-l border-border pl-6">
              {timeline.map((t) => (
                <li key={t.year} className="relative">
                  <span className="absolute -left-[31px] top-1.5 grid h-4 w-4 place-items-center rounded-full bg-brand text-[10px] font-bold text-primary-foreground" />
                  <div className="text-sm font-semibold text-teal">{t.year}</div>
                  <p className="mt-1 text-base text-slate-ink/85">{t.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
