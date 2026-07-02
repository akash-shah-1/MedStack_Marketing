import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { Reveal } from "@/components/landing/Reveal";
import { ArrowRight, BedDouble, Activity, Wallet, Quote, MapPin } from "lucide-react";
import hospital1 from "@/assets/hospital-1.jpg";
import hospital2 from "@/assets/hospital-2.jpg";
import hospital3 from "@/assets/hospital-3.jpg";
import doctorsCollab from "@/assets/doctors-collab.jpg";
import doc1 from "@/assets/team-doctor-1.jpg";
import doc2 from "@/assets/team-doctor-2.jpg";
import ops1 from "@/assets/team-ops-1.jpg";
import ops2 from "@/assets/team-ops-2.jpg";
import eng1 from "@/assets/team-eng-1.jpg";
import eng2 from "@/assets/team-eng-2.jpg";

export const Route = createFileRoute("/customers")({
  head: () => ({
    meta: [
      { title: "Customers — MedFlow AI" },
      { name: "description", content: "200+ hospitals across 14 countries run their daily operations on MedFlow AI." },
      { property: "og:title", content: "Customers — MedFlow AI" },
      { property: "og:description", content: "From 80-bed clinics to 1,200-bed networks — see who runs on MedFlow." },
    ],
  }),
  component: Customers,
});

const logos = [
  "Apollo Care", "St. Marien", "NorthBay", "Greenfield Health", "Sunrise Medical",
  "Lakeside Heart", "Cedar Children's", "Harbor Ortho", "MetroCity Med", "BlueRidge Care",
  "Pinewood ICU", "Riverbend Group",
];

const featured = [
  {
    name: "Apollo Care Network",
    region: "Bengaluru, India · 820 beds",
    blurb: "Unified 4 facilities on a single instance, lifted bed turnover by 27% and cut discharge time from 9.4h to 3.1h.",
    image: hospital1,
    stat: "27%",
    statLabel: "faster bed turnover",
    icon: BedDouble,
  },
  {
    name: "St. Marien Hospital",
    region: "Munich, Germany · 540 beds",
    blurb: "Rolled out OT scheduling + surgical safety checklists. OT utilization went from 61% to 83% in two quarters.",
    image: hospital2,
    stat: "83%",
    statLabel: "OT utilization",
    icon: Activity,
  },
  {
    name: "NorthBay Children's",
    region: "Toronto, Canada · 180 beds",
    blurb: "Weight-based pediatric dosing with hard stops and eMAR. Zero medication incidents since launch — 14 months.",
    image: hospital3,
    stat: "0",
    statLabel: "dosing incidents",
    icon: Wallet,
  },
];

const voices = [
  {
    quote:
      "Rounds used to eat 90 minutes of my morning chasing labs and imaging. Now everything is one screen — I get 40 minutes back with my patients.",
    name: "Dr. Priya Menon",
    role: "Chief of Medicine, Apollo Care",
    photo: doc1,
  },
  {
    quote:
      "The pre-submission scrubber caught 38% more issues than our old workflow. Denials went from 11% to 4% in six weeks.",
    name: "Marcus Reid",
    role: "CFO, MetroCity Medical",
    photo: ops1,
  },
  {
    quote:
      "We onboarded 340 nurses in two weeks. The mobile eMAR is the first EHR our staff actually asks to use on personal shifts.",
    name: "Dr. Ada Nwosu",
    role: "CMO, NorthBay Children's",
    photo: doc2,
  },
  {
    quote:
      "HL7 to FHIR bridge worked out-of-the-box with our legacy LIS. Our integration team called it 'suspiciously easy'.",
    name: "Julian Vogt",
    role: "Head of IT, St. Marien",
    photo: eng1,
  },
];

const clinicians = [
  { name: "Dr. Sofia Alvarez", role: "ICU Consultant", photo: doc1 },
  { name: "Dr. Rahul Bhatt", role: "Cardiologist", photo: eng2 },
  { name: "Nurse Lead Emma Cole", role: "Ward Ops", photo: ops2 },
  { name: "Dr. Chen Wei", role: "Pediatrics", photo: doc2 },
  { name: "Dr. Amara Okafor", role: "Emergency Med", photo: ops1 },
  { name: "Dr. Lukas Meier", role: "Surgery", photo: eng1 },
];

function Customers() {
  return (
    <PageShell
      eyebrow="Our customers"
      title={<>200+ care networks <span className="text-gradient-brand">choose MedFlow</span></>}
      subtitle="From neighborhood clinics to multi-site networks, MedFlow runs daily clinical and revenue operations across 14 countries."
    >
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        {/* Hero image strip */}
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border">
            <img
              src={doctorsCollab}
              alt="Clinical team collaborating around a patient in a modern hospital"
              className="h-64 w-full object-cover sm:h-80 md:h-[420px]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-ink/85 via-slate-ink/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
              <div className="max-w-2xl text-white">
                <div className="text-xs font-semibold uppercase tracking-widest text-teal-glow">Live in 14 countries</div>
                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                  Care teams that trust MedFlow with their sickest patients.
                </h2>
                <p className="mt-2 text-sm text-white/80 sm:text-base">
                  4,200+ physicians and 11,000+ nurses log in every day. Uptime 99.99% across 2025.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Logo wall */}
        <Reveal>
          <div className="mt-12 glass-panel rounded-3xl p-8">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-ink">
              Trusted by clinical leaders worldwide
            </div>
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
              {logos.map((l) => (
                <div
                  key={l}
                  className="grid place-items-center rounded-xl border border-border bg-white/60 px-4 py-5 text-center text-sm font-semibold text-slate-ink/80"
                >
                  {l}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Featured hospitals with real photos */}
        <Reveal>
          <div className="mt-14">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="text-2xl font-bold text-slate-ink sm:text-3xl">Featured hospitals</h2>
              <Link to="/case-studies" className="hidden text-sm font-semibold text-teal hover:underline sm:inline">
                All case studies →
              </Link>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {featured.map((f) => (
                <div key={f.name} className="glass-panel overflow-hidden rounded-3xl">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={f.image}
                      alt={`${f.name} facility`}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-ink/70 via-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                      <div className="flex items-center gap-1.5 text-xs font-semibold">
                        <MapPin size={12} /> {f.region}
                      </div>
                      <div className="rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur-md">
                        <span className="font-bold text-teal-glow">{f.stat}</span>{" "}
                        <span className="text-white/80">{f.statLabel}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-teal">
                      <f.icon size={16} />
                      <span className="text-xs font-semibold uppercase tracking-wider">Case study</span>
                    </div>
                    <h3 className="mt-1 text-lg font-bold text-slate-ink">{f.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{f.blurb}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Practitioner voices */}
        <Reveal>
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-slate-ink sm:text-3xl">Voices from the floor</h2>
            <p className="mt-2 text-sm text-muted-foreground">Real feedback from clinicians and administrators on active deployments.</p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {voices.map((v) => (
                <div key={v.name} className="glass-panel rounded-3xl p-6">
                  <Quote size={20} className="text-teal/60" />
                  <p className="mt-3 text-sm leading-relaxed text-slate-ink/90">"{v.quote}"</p>
                  <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                    <img src={v.photo} alt={v.name} className="h-11 w-11 rounded-full object-cover" loading="lazy" />
                    <div>
                      <div className="text-sm font-semibold text-slate-ink">{v.name}</div>
                      <div className="text-xs text-muted-foreground">{v.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Trusted clinicians grid */}
        <Reveal>
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-slate-ink sm:text-3xl">Trusted by clinicians</h2>
            <p className="mt-2 text-sm text-muted-foreground">A few of the 4,200+ physicians who log in every day.</p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {clinicians.map((c) => (
                <div key={c.name} className="glass-panel rounded-2xl p-4 text-center">
                  <img src={c.photo} alt={c.name} className="mx-auto h-20 w-20 rounded-full object-cover ring-2 ring-teal-glow/40" loading="lazy" />
                  <div className="mt-3 text-sm font-semibold text-slate-ink">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.role}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-14 text-center">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-95"
          >
            Read the case studies <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
