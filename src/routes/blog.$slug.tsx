import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { POSTS } from "./blog";
import { ArrowLeft, Clock } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = POSTS.find((p) => p.slug === params.slug);
    const title = post ? `${post.title} — MedFlow AI` : "Article — MedFlow AI";
    const desc = post?.excerpt ?? "Insights from MedFlow AI.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  loader: ({ params }) => {
    const post = POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  notFoundComponent: () => (
    <PageShell eyebrow="404" title="Article not found" subtitle="It may have moved. Head back to the blog.">
      <div className="mx-auto max-w-3xl px-6 pb-24 text-center">
        <Link to="/blog" className="text-sm font-semibold text-teal">← Back to blog</Link>
      </div>
    </PageShell>
  ),
  component: Post,
});

function Post() {
  const { post } = Route.useLoaderData();
  return (
    <PageShell
      eyebrow={post.category}
      title={post.title}
      subtitle={post.excerpt}
    >
      <article className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <div className="mb-8 flex items-center justify-between text-xs text-muted-foreground">
          <Link to="/blog" className="inline-flex items-center gap-1.5 font-semibold text-teal">
            <ArrowLeft size={12} /> All posts
          </Link>
          <span className="inline-flex items-center gap-1.5"><Clock size={12} /> {post.read} · {post.date}</span>
        </div>

        <div className="prose prose-slate max-w-none text-slate-ink/90">
          <p className="text-lg leading-relaxed">
            This is a long-form deep dive on <strong>{post.title.toLowerCase()}</strong>. We've distilled what we
            learned across 60+ hospital deployments into a practical, opinionated guide.
          </p>
          <h2 className="mt-10 text-2xl font-bold text-slate-ink">Why this matters</h2>
          <p>
            Most hospital systems are stitched together over decades. Decisions made in 2008 still constrain
            what your team can do in 2026. The good news: you don't have to rip and replace to make material
            progress this quarter.
          </p>
          <h2 className="mt-10 text-2xl font-bold text-slate-ink">The framework we use</h2>
          <ol className="ml-5 list-decimal space-y-2">
            <li>Map the current-state workflow with the team that actually runs it.</li>
            <li>Pick one measurable KPI per phase — not five.</li>
            <li>Pilot for 4 weeks on one wing, with a daily standup.</li>
            <li>Roll out facility-wide only after the pilot beats baseline twice.</li>
          </ol>
          <h2 className="mt-10 text-2xl font-bold text-slate-ink">What we'd do differently</h2>
          <p>
            Start with the highest-friction surface, not the easiest. Hospitals tolerate change when the pain
            of the status quo is obvious every shift.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-border bg-gradient-to-br from-emerald-soft/40 to-teal-glow/20 p-7 text-center">
          <h3 className="text-xl font-bold text-slate-ink">See it on your own data</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We'll spin up a sandbox seeded with your specialty mix and bed count.
          </p>
          <Link
            to="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-95"
          >
            Book a demo
          </Link>
        </div>
      </article>
    </PageShell>
  );
}
