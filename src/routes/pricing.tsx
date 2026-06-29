import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/landing/Nav";
import { Pricing } from "@/components/landing/Pricing";
import { LeadCapture } from "@/components/landing/LeadCapture";
import { DemoModal } from "@/components/landing/DemoModal";
import { ROICalculator } from "@/components/landing/ROICalculator";

const faqs = [
  {
    q: "How is MedFlow AI priced?",
    a: "Per active bed, billed monthly or annually. Larger networks unlock volume tiers and committed-use discounts on the Enterprise plan.",
  },
  {
    q: "Do you charge per user or per role?",
    a: "No. All clinical, billing and admin roles are included — provision unlimited doctors, nurses, pharmacists and reception staff.",
  },
  {
    q: "Is implementation included?",
    a: "Professional and Enterprise plans include guided onboarding, data migration from legacy HIS, and HL7/FHIR integration support.",
  },
  {
    q: "Can we deploy on-premise?",
    a: "Yes. Enterprise Network supports private-cloud and on-prem deployments with isolated tenancy and BYOK encryption.",
  },
];

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — MedFlow AI Hospital Management System" },
      {
        name: "description",
        content:
          "Transparent pricing for clinics, hospitals and multi-site networks. All tiers include HIPAA-grade security, encrypted EHR and 24/7 monitoring.",
      },
      { property: "og:title", content: "Pricing — MedFlow AI" },
      { property: "og:description", content: "Plans that scale from a 15-bed clinic to a national hospital network." },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const [demoOpen, setDemoOpen] = useState(false);
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav onDemo={() => setDemoOpen(true)} />

      <section className="relative pt-28 pb-4 sm:pt-36">
        <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-gradient-hero" />
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full glass-panel px-3 py-1 text-xs font-medium text-teal-deep">
            Pricing
          </span>
          <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight text-slate-ink sm:text-5xl lg:text-6xl">
            Simple plans, <span className="text-gradient-brand">enterprise outcomes.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Pay for the beds you operate. Everything else — modules, roles, integrations, support — is included.
          </p>
        </div>
      </section>

      <Pricing onDemo={() => setDemoOpen(true)} />
      <ROICalculator />

      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight text-slate-ink">Pricing questions</h2>
          <div className="mt-10 space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="glass-panel group rounded-2xl px-6 py-5">
                <summary className="cursor-pointer list-none text-base font-semibold text-slate-ink">
                  {f.q}
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <LeadCapture />
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </main>
  );
}
