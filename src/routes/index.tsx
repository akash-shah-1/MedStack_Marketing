import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { LogoCloud } from "@/components/landing/LogoCloud";
import { Stats } from "@/components/landing/Stats";
import { WorkflowSimulator } from "@/components/landing/WorkflowSimulator";
import { Features } from "@/components/landing/Features";
import { Integrations } from "@/components/landing/Integrations";
import { ROICalculator } from "@/components/landing/ROICalculator";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { Trust } from "@/components/landing/Trust";
import { FAQ } from "@/components/landing/FAQ";
import { LeadCapture } from "@/components/landing/LeadCapture";
import { DemoModal } from "@/components/landing/DemoModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MedFlow AI — The Operating System for Modern Hospitals" },
      { name: "description", content: "Unify clinical workflows, live bed management, and revenue cycles in a single high-performance hospital management platform. HIPAA, GDPR, HL7/FHIR." },
      { property: "og:title", content: "MedFlow AI — The Operating System for Modern Hospitals" },
      { property: "og:description", content: "Enterprise hospital management system: EHR, live bed control, POS billing, departmental queues, and roster scheduling — in one platform." },
    ],
  }),
  component: Index,
});

function Index() {
  const [demoOpen, setDemoOpen] = useState(false);
  const openDemo = () => setDemoOpen(true);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav onDemo={openDemo} />
      <Hero onDemo={openDemo} />
      <LogoCloud />
      <Stats />
      <WorkflowSimulator />
      <Features />
      <Integrations />
      <ROICalculator />
      <Testimonials />
      <Pricing onDemo={openDemo} />
      <Trust />
      <FAQ />
      <LeadCapture />
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </main>
  );
}
