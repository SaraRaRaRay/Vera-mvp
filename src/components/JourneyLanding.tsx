"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { MilestoneToggle } from "@/components/milestone-toggle";
import { milestones } from "@/lib/milestones";

const veraIntroByMilestone: Record<string, string> = {
  "get-finance-ready":
    "G'day, let's sort your borrowing limits and buffers first so the rest feels steady.",
  "define-your-search":
    "Now we narrow your search so each inspection is focused, practical, and true to budget.",
  "inspect-properties":
    "Take your time here, you are spotting condition clues now that can save stress later.",
  "make-an-offer-or-bid-at-auction":
    "Before offers or auctions, set your walk-away number and let that guide every move.",
  "pre-purchase-due-diligence":
    "This is your safety check stage, legal, structural, and planning details all get a look.",
  "exchange-contracts":
    "Once contracts exchange, things get real fast, so we confirm dates, deposit, and obligations.",
  "cooling-off-period":
    "Use this window to finish checks calmly and lock confidence before going fully committed.",
  "apply-for-grants-and-concessions":
    "Let's line up grants and concessions early so settlement funding lands without last-minute scrambles.",
  "settlement-preparation":
    "Nearly there, now we coordinate finance, insurance, and paperwork to keep settlement smooth.",
  "settlement-and-moving-in":
    "Settlement day is a big one, then we tidy your move-in setup and records.",
};

export function JourneyLanding() {
  const [activeId, setActiveId] = useState(milestones[0]?.id ?? "");
  const [bubbleText, setBubbleText] = useState(veraIntroByMilestone[milestones[0].id]);
  const [bubbleVisible, setBubbleVisible] = useState(true);
  const intro = useMemo(
    () => veraIntroByMilestone[activeId] ?? veraIntroByMilestone[milestones[0].id],
    [activeId],
  );

  useEffect(() => {
    setBubbleVisible(false);
    const timer = window.setTimeout(() => {
      setBubbleText(intro);
      setBubbleVisible(true);
    }, 110);

    return () => window.clearTimeout(timer);
  }, [intro]);

  useEffect(() => {
    const sections = milestones
      .map((milestone) => document.getElementById(`milestone-${milestone.id}`))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length === 0) {
          return;
        }

        const middle = window.innerHeight / 2;
        let closestEntry = visibleEntries[0];
        let closestDistance = Number.POSITIVE_INFINITY;

        for (const entry of visibleEntries) {
          const rect = entry.target.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          const distance = Math.abs(middle - center);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestEntry = entry;
          }
        }

        setActiveId(closestEntry.target.id.replace("milestone-", ""));
      },
      {
        threshold: [0.2, 0.4, 0.6, 0.8],
        rootMargin: "-15% 0px -15% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-10">
      <div className="grid gap-8 md:grid-cols-[340px_minmax(0,1fr)] md:gap-10">
        <aside className="md:sticky md:top-20 md:self-start">
          <div className="sticky top-3 z-10 rounded-2xl bg-cream/95 p-3 shadow-[0_8px_30px_rgba(124,58,237,0.08)] backdrop-blur md:static md:bg-transparent md:p-0 md:shadow-none">
            <div className="flex items-center gap-3 md:block">
              <div className="relative size-14 overflow-hidden rounded-full ring-4 ring-white/80 md:size-72">
                <Image
                  src="/vera-portrait.png"
                  alt="VERA guide portrait"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 288px, 56px"
                  priority
                />
              </div>
              <div className="min-w-0">
                <div
                  className={`relative rounded-2xl bg-peach px-4 py-3 text-sm text-ink shadow-[0_8px_30px_rgba(124,58,237,0.08)] transition-opacity duration-200 md:-rotate-1 md:px-5 md:py-4 md:text-base ${
                    bubbleVisible ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <p className="truncate md:whitespace-normal">{bubbleText}</p>
                  <span className="absolute -left-2 top-4 hidden size-4 rotate-45 bg-peach md:block" />
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section className="space-y-10">
          {milestones.map((milestone) => {
            const isActive = milestone.id === activeId;
            return (
              <article
                key={milestone.id}
                id={`milestone-${milestone.id}`}
                className={`min-h-[80vh] rounded-2xl border px-6 py-8 shadow-[0_8px_30px_rgba(124,58,237,0.08)] transition-colors md:px-10 md:py-12 ${
                  isActive ? "border-purple/25 bg-pink/40" : "border-grey/20 bg-white/70"
                }`}
              >
                <p
                  className={`text-4xl font-semibold tracking-tight md:text-5xl ${
                    isActive ? "text-purple" : "text-grey/80"
                  }`}
                >
                  {String(milestone.order).padStart(2, "0")}
                </p>
                <h2 className="mt-5 text-3xl font-bold text-ink md:text-4xl">{milestone.title}</h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-grey md:text-lg">
                  {milestone.shortDescription}
                </p>
                <div className="mt-6">
                  <MilestoneToggle milestoneId={milestone.id} />
                </div>
                <div className="mt-7">
                  <Link
                    href={`/milestones/${milestone.id}`}
                    className="inline-flex items-center rounded-full bg-purple px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple/30"
                  >
                    Open VERA&apos;s guide &rarr;
                  </Link>
                </div>
                <div className="mt-12 flex items-center gap-4">
                  <span className="h-px flex-1 bg-grey/30" />
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 64 64"
                    className="h-7 w-7 text-purple/35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M34 52C34 36 39 25 51 16M31 51C31 38 26 28 14 21"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M47 15C42 13 37 14 34 19C39 21 43 20 47 15ZM17 20C22 18 27 19 30 24C25 26 21 25 17 20Z"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="h-px flex-1 bg-grey/30" />
                </div>
              </article>
            );
          })}
          <footer className="pb-6 text-center text-sm text-grey">VERA · Home Hunters Australia</footer>
        </section>
      </div>
    </main>
  );
}
