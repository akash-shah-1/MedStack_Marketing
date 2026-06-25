import { createFileRoute } from "@tanstack/react-router";
import { Linkedin, Twitter, MapPin, Quote, Building2, Users } from "lucide-react";
import { PageShell } from "@/components/landing/PageShell";

import doctor1 from "@/assets/team-doctor-1.jpg";
import doctor2 from "@/assets/team-doctor-2.jpg";
import eng1 from "@/assets/team-eng-1.jpg";
import eng2 from "@/assets/team-eng-2.jpg";
import ops1 from "@/assets/team-ops-1.jpg";
import ops2 from "@/assets/team-ops-2.jpg";
import hospital1 from "@/assets/hospital-1.jpg";
import hospital2 from "@/assets/hospital-2.jpg";
import hospital3 from "@/assets/hospital-3.jpg";
import collab from "@/assets/doctors-collab.jpg";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team & Partner Hospitals — MedFlow AI" },
      { name: "description", content: "Meet the doctors, engineers and operators behind MedFlow AI — and the hospitals that trust us with their daily operations." },
      { property: "og:title", content: "Team & Partners — MedFlow AI" },
      { property: "og:description", content: "Clinicians, engineers and partner hospitals building the operating system for modern healthcare." },
    ],
  }),
  component: TeamPage,
});

const leadership = [
  {
    name: "Dr. Anjali Rao",
    role: "Co-founder & Chief Medical Officer",
    bio: "Internal medicine physician with 14 years on the ward. Drives every clinical workflow inside MedFlow AI.",
    img: doctor1,
    location: "Bengaluru, IN",
  },
  {
    name: "Dr. Marcus Lehmann",
    role: "Co-founder & Chief Executive Officer",
    bio: "Former CFO of a 7-hospital network. Believes finance and clinical data should never be out of sync.",
    img: doctor2,
    location: "Berlin, DE",
  },
  {
    name: "Naledi Okafor",
    role: "VP Engineering",
    bio: "Built distributed systems at scale at AWS and Stripe. Owns reliability, latency and integration platform.",
    img: eng1,
    location: "Lagos, NG",
  },
  {
    name: "Kenji Tanaka",
    role: "Head of Product Design",
    bio: "Designs every screen alongside practicing nurses. Zero-click and dark-mode-friendly ICU views are his crusade.",
    img: eng2,
    location: "Tokyo, JP",
  },
  {
    name: "Sofia Almeida",
    role: "VP Customer Success",
    bio: "Onboarded 90+ hospitals in 11 countries. Leads our 4-week go-live program and 24/7 clinical support desk.",
    img: ops1,
    location: "Lisbon, PT",
  },
  {
    name: "Daniel Whitaker",
    role: "Chief Financial Officer",
    bio: "Two-time healthcare-SaaS CFO. Keeps pricing transparent and aligned with hospital P&L outcomes.",
    img: ops2,
    location: "London, UK",
  },
];

const partnerHospitals = [
  {
    name: "Apollo Care Network",
    type: "Multi-specialty · 1,200 beds",
    location: "Bengaluru, India",
    img: hospital1,
    quote: "MedFlow AI runs every ward, OT and discharge desk across our 5 sites.",
    person: "Dr. Anjali Rao · CMO",
  },
  {
    name: "St. Marien Hospital Group",
    type: "Tertiary · 4 sites · 2,800 beds",
    location: "Munich, Germany",
    img: hospital2,
    quote: "First HMS our finance and clinical teams agreed on. Claims rejections down 41%.",
    person: "Marcus Lehmann · CFO",
  },
  {
    name: "Crescent Specialty Centre",
    type: "Day-care surgery · 180 beds",
    location: "Dubai, UAE",
    img: hospital3,
    quote: "Onboarded in 5 weeks. Pharmacy stock-outs went from weekly to zero.",
    person: "Dr. Hina Mirza · Pharmacy Director",
  },
];

const trustedDoctors = [
  { name: "Dr. Priya Nair", role: "Cardiologist · Medanta", img: doctor1 },
  { name: "Dr. Sarah Okonkwo", role: "Director of Nursing · Northpoint", img: ops1 },
  { name: "Dr. James Whitaker", role: "Chief Compliance · Cedar Valley", img: ops2 },
  { name: "Dr. Hina Mirza", role: "Pharmacy Director · Crescent", img: eng1 },
  { name: "Dr. Marcus Lehmann", role: "CFO · St. Marien", img: doctor2 },
  { name: "Dr. Kenji Tanaka", role: "Surgeon · Tokyo Medical", img: eng2 },
];

function TeamPage() {
  return (
    <PageShell
      eyebrow="Team & partners"
      title={<>The people <span className="text-gradient-brand">behind every shift</span></>}
      subtitle="Clinicians, engineers, designers and operators — building MedFlow AI alongside the hospitals that depend on it."
    >
      {/* Stats strip */}
      <section className="pb-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="glass-panel grid gap-4 rounded-3xl p-6 sm:grid-cols-4">
            {[
              { v: "120+", l: "Partner hospitals" },
              { v: "8,400", l: "Clinicians using MedFlow daily" },
              { v: "11", l: "Countries deployed" },
              { v: "62", l: "Team members worldwide" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="text-3xl font-bold text-slate-ink">{s.v}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-ink">Leadership</h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Doctors who still see patients. Engineers who've shipped infrastructure at planet scale. Operators who've turned hospitals around.
              </p>
            </div>
            <div className="hidden items-center gap-2 rounded-full glass-panel px-3 py-1.5 text-xs font-semibold text-teal-deep sm:inline-flex">
              <Users size={13} /> 6 senior leaders
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((p) => (
              <article
                key={p.name}
                className="glass-panel group overflow-hidden rounded-3xl transition hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-ink/70 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-[11px] font-medium text-white/90">
                    <MapPin size={11} /> {p.location}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-ink">{p.name}</h3>
                  <div className="text-xs font-semibold uppercase tracking-wider text-teal">{p.role}</div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.bio}</p>
                  <div className="mt-4 flex gap-2">
                    <a className="grid h-8 w-8 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-teal hover:text-teal" href="#" aria-label={`${p.name} on LinkedIn`}>
                      <Linkedin size={13} />
                    </a>
                    <a className="grid h-8 w-8 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-teal hover:text-teal" href="#" aria-label={`${p.name} on Twitter`}>
                      <Twitter size={13} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration banner */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="glass-panel grid overflow-hidden rounded-3xl lg:grid-cols-2">
            <div className="relative h-72 lg:h-auto">
              <img src={collab} alt="Doctors and nurses collaborating around a tablet" loading="lazy" width={1024} height={1024} className="h-full w-full object-cover" />
            </div>
            <div className="p-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-soft/60 px-3 py-1 text-xs font-semibold text-emerald">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse-glow" /> Clinician-led product
              </span>
              <h3 className="mt-4 text-3xl font-bold tracking-tight text-slate-ink">
                Built shoulder-to-shoulder with the ward.
              </h3>
              <p className="mt-4 text-muted-foreground">
                Our product designers spend 1 day each week shadowing nurses and front-desk staff. Every release is reviewed by a clinical council of 12 practicing doctors across 4 specialties before it ships.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                {[
                  { v: "1d/wk", l: "Ward shadowing" },
                  { v: "12", l: "Clinical reviewers" },
                  { v: "100%", l: "Releases peer-reviewed" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl border border-border bg-white/60 p-3">
                    <div className="text-lg font-bold text-slate-ink">{s.v}</div>
                    <div className="text-[11px] text-muted-foreground">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner hospitals */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-ink">Hospitals that trust MedFlow</h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                A snapshot of the networks running MedFlow AI as their daily operating system.
              </p>
            </div>
            <div className="hidden items-center gap-2 rounded-full glass-panel px-3 py-1.5 text-xs font-semibold text-teal-deep sm:inline-flex">
              <Building2 size={13} /> 120+ sites live
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {partnerHospitals.map((h) => (
              <article key={h.name} className="glass-panel overflow-hidden rounded-3xl">
                <div className="relative h-52 overflow-hidden">
                  <img src={h.img} alt={h.name} loading="lazy" width={1024} height={1024} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-ink/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <div className="text-lg font-bold text-white">{h.name}</div>
                    <div className="text-[11px] text-white/80">{h.type} · {h.location}</div>
                  </div>
                </div>
                <div className="p-6">
                  <Quote size={18} className="text-teal" />
                  <blockquote className="mt-2 text-sm leading-relaxed text-slate-ink">"{h.quote}"</blockquote>
                  <div className="mt-3 text-xs font-medium text-muted-foreground">{h.person}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted doctors strip */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full glass-panel px-3 py-1 text-xs font-medium text-teal-deep">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse-glow" /> Trusted by clinicians
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-ink">
              Doctors using MedFlow AI in their <span className="text-gradient-brand">B2B hospital networks</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              A snapshot of senior clinicians who've championed MedFlow inside their hospitals.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {trustedDoctors.map((d) => (
              <div key={d.name} className="glass-panel flex items-center gap-3 rounded-2xl p-4 transition hover:-translate-y-0.5 hover:shadow-glow">
                <img src={d.img} alt={d.name} loading="lazy" width={1024} height={1024} className="h-12 w-12 shrink-0 rounded-full object-cover" />
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-slate-ink">{d.name}</div>
                  <div className="truncate text-[11px] text-muted-foreground">{d.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
