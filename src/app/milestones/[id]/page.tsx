import Link from "next/link";
import { notFound } from "next/navigation";

import { MilestoneChat } from "@/components/MilestoneChat";
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
    <main className="mx-auto w-full max-w-4xl px-6 py-10 text-ink md:py-14">
      <nav className="mb-8 flex items-center gap-3 text-sm text-grey" aria-label="Breadcrumb">
        <Link
          href="/"
          className="transition hover:text-brand-green hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/30"
        >
          &larr; Back to journey
        </Link>
        <span aria-hidden="true">&middot;</span>
        <span>Step {milestoneIndex + 1} of 10</span>
      </nav>

      <header className="mb-8 rounded-2xl border border-grey/20 bg-white/70 p-6 shadow-[0_8px_30px_rgba(58,107,71,0.08)] md:p-8">
        <p className="text-sm font-medium text-grey">Milestone {milestone.order}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-balance text-ink md:text-5xl">
          {milestone.title}
        </h1>
        <p className="mt-3 max-w-3xl text-grey">{milestone.shortDescription}</p>
        <div className="mt-5">
          <MilestoneToggle milestoneId={milestone.id} />
        </div>
      </header>

      <article className="space-y-5 rounded-2xl border border-grey/20 bg-white/75 p-6 shadow-[0_8px_30px_rgba(58,107,71,0.08)] md:p-8">
        {guidanceParagraphs.map((paragraph) => (
          <p key={paragraph} className="text-base leading-relaxed text-ink/90 md:text-lg">
            {paragraph}
          </p>
        ))}
      </article>

      <MilestoneChat slug={milestone.id} />

      <section className="mt-10 rounded-2xl border border-grey/20 bg-white/75 p-6 shadow-[0_8px_30px_rgba(58,107,71,0.08)] md:p-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-ink">Official resources</h2>
        <div className="flex flex-wrap gap-3">
          {milestone.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: "outline",
                className:
                  "rounded-full border-grey/35 bg-cream text-ink hover:bg-pink focus-visible:ring-brand-green/30",
              })}
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>

      <nav
        className="mt-12 flex flex-col gap-3 border-t border-grey/30 pt-6 sm:flex-row sm:items-center sm:justify-between"
        aria-label="Milestone navigation"
      >
        {previousMilestone ? (
          <Link
            href={`/milestones/${previousMilestone.id}`}
            className={buttonVariants({
              variant: "outline",
              className:
                "rounded-full border-grey/35 bg-cream px-5 text-ink hover:bg-pink focus-visible:ring-brand-green/30",
            })}
          >
            Previous
          </Link>
        ) : (
          <span />
        )}

        {nextMilestone ? (
          <Link
            href={`/milestones/${nextMilestone.id}`}
            className={buttonVariants({
              className: "rounded-full bg-brand-green px-6 text-white hover:bg-brand-green/90 focus-visible:ring-brand-green/30",
            })}
          >
            Next
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
