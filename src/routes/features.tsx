import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { Features } from "@/components/landing/Features";
import { WorkflowSimulator } from "@/components/landing/WorkflowSimulator";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — MedFlow AI Hospital Management System" },
      {
        name: "description",
        content:
          "Explore MedFlow AI's clinical command center, live bed control, POS billing, department queues and roster scheduler — five tightly integrated modules.",
      },
      { property: "og:title", content: "Features — MedFlow AI" },
      {
        property: "og:description",
        content:
          "Five modules: EHR, bed control, billing, departmental queues, and roster — built for every corner of the hospital.",
      },
    ],
  }),
  component: FeaturesPage,
});

function FeaturesPage() {
  return (
    <PageShell
      eyebrow="Product · Features"
      title={<>One platform for the <span className="text-gradient-brand">entire hospital.</span></>}
      subtitle="Replace the patchwork of clinical, billing and operational tools with a single, real-time platform built for clinicians and CFOs alike."
    >
      <Features />
      <WorkflowSimulator />
    </PageShell>
  );
}
