import Link from "next/link";
import { notFound } from "next/navigation";

import { MilestoneToggle } from "@/components/milestone-toggle";
import { buttonVariants } from "@/components/ui/button";
import { milestones } from "@/lib/milestones";

type MilestoneDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MilestoneDetailPage({ params }: MilestoneDetailPageProps) {
  const { id } = await params;

  const milestoneIndex = milestones.findIndex((milestone) => milestone.id === id);
  if (milestoneIndex === -1) {
    notFound();
  }

  const milestone = milestones[milestoneIndex];
  const previousMilestone = milestoneIndex > 0 ? milestones[milestoneIndex - 1] : null;
  const nextMilestone =
    milestoneIndex < milestones.length - 1 ? milestones[milestoneIndex + 1] : null;
  const guidanceParagraphs = milestone.guidance.split("\n\n");

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10 md:py-12">
      <nav className="mb-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Milestone {milestone.order}</span>
      </nav>

      <header className="mb-8 space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Milestone {milestone.order}</p>
        <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          {milestone.title}
        </h1>
        <MilestoneToggle milestoneId={milestone.id} />
      </header>

      <article className="prose prose-zinc max-w-none dark:prose-invert">
        {guidanceParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>

      <section className="mt-10">
        <h2 className="mb-4 text-lg font-semibold tracking-tight">Official resources</h2>
        <div className="flex flex-wrap gap-3">
          {milestone.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline" })}
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>

      <nav
        className="mt-12 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between"
        aria-label="Milestone navigation"
      >
        {previousMilestone ? (
          <Link
            href={`/milestones/${previousMilestone.id}`}
            className={buttonVariants({ variant: "outline" })}
          >
            Previous
          </Link>
        ) : (
          <span />
        )}

        {nextMilestone ? (
          <Link href={`/milestones/${nextMilestone.id}`} className={buttonVariants()}>
            Next
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
