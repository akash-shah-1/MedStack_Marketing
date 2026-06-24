import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/landing/Nav";
import { DemoModal } from "@/components/landing/DemoModal";
import { Mail, Phone, MapPin, MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react";

const channels = [
  { icon: Mail, title: "Sales", value: "sales@medflow.ai", note: "Replies within 1 business day" },
  { icon: MessageSquare, title: "Support", value: "support@medflow.ai", note: "24 / 7 for live hospitals" },
  { icon: Phone, title: "Phone", value: "+1 (415) 555-0142", note: "Mon – Fri · 8a – 8p PT" },
  { icon: MapPin, title: "HQ", value: "San Francisco · Bengaluru", note: "Remote-first, globally" },
];

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — MedFlow AI" },
      {
        name: "description",
        content:
          "Talk to MedFlow AI about deploying our hospital management platform. Sales, support and partnership inquiries.",
      },
      { property: "og:title", content: "Contact — MedFlow AI" },
      { property: "og:description", content: "Sales, support and partnerships — we'd love to hear from you." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav onDemo={() => setDemoOpen(true)} />

      <section className="relative pt-36 pb-16">
        <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-gradient-hero" />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass-panel px-3 py-1 text-xs font-medium text-teal-deep">
            Contact
          </span>
          <h1 className="mt-5 text-5xl font-bold tracking-tight text-slate-ink sm:text-6xl">
            Let's <span className="text-gradient-brand">talk.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Whether you're evaluating MedFlow AI for a 20-bed clinic or a national network, our team is ready to help.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            {channels.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="glass-panel flex items-start gap-4 rounded-2xl p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand text-primary-foreground shadow-glow">
                    <Icon size={18} />
                  </span>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.title}</div>
                    <div className="text-base font-semibold text-slate-ink">{c.value}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{c.note}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-3">
            <div className="glass-panel rounded-3xl p-8 shadow-glow">
              {sent ? (
                <div className="py-16 text-center">
                  <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-emerald-soft text-emerald">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-ink">Message received.</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    A member of our team will reach out within one business day.
                  </p>
                </div>
              ) : (
                <form
                  className="grid gap-4 sm:grid-cols-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <h2 className="sm:col-span-2 text-xl font-bold text-slate-ink">Send us a message</h2>
                  <Field label="Full name" name="name" placeholder="Dr. Anjali Rao" />
                  <Field label="Work email" name="email" type="email" placeholder="anjali@apollocare.com" />
                  <Field label="Hospital / Organization" name="org" placeholder="Apollo Care Network" />
                  <Field label="Role" name="role" placeholder="Chief Medical Officer" />
                  <label className="sm:col-span-2 block">
                    <span className="mb-1 block text-xs font-medium text-slate-ink/80">How can we help?</span>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us about your hospital, current systems, and what you're trying to solve."
                      className="w-full rounded-xl border border-border bg-white/70 px-3 py-2.5 text-sm text-slate-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20"
                    />
                  </label>
                  <button
                    type="submit"
                    className="sm:col-span-2 mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95"
                  >
                    Send message <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </main>
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
