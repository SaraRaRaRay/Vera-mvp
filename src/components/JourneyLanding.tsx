"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { MilestoneToggle, PROGRESS_EVENT, STORAGE_KEY } from "@/components/milestone-toggle";
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
  const [completedCount, setCompletedCount] = useState(0);
  const intro = useMemo(
    () => veraIntroByMilestone[activeId] ?? veraIntroByMilestone[milestones[0].id],
    [activeId],
  );
  const totalMilestones = milestones.length;
  const progressPercent = totalMilestones > 0 ? (completedCount / totalMilestones) * 100 : 0;

  useEffect(() => {
    function readCompletedCount() {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
          setCompletedCount(0);
          return;
        }

        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== "object") {
          setCompletedCount(0);
          return;
        }

        const count = milestones.reduce(
          (accumulator, milestone) => accumulator + (Boolean((parsed as Record<string, boolean>)[milestone.id]) ? 1 : 0),
          0,
        );
        setCompletedCount(count);
      } catch {
        setCompletedCount(0);
      }
    }

    readCompletedCount();
    window.addEventListener(PROGRESS_EVENT, readCompletedCount);
    window.addEventListener("storage", readCompletedCount);

    return () => {
      window.removeEventListener(PROGRESS_EVENT, readCompletedCount);
      window.removeEventListener("storage", readCompletedCount);
    };
  }, []);

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
    <main className="mx-auto w-full max-w-7xl overflow-x-hidden px-4 py-8 sm:px-6 md:py-10">
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
                  className={`relative w-full max-w-full rounded-2xl bg-peach px-4 py-3 text-sm text-ink shadow-[0_8px_30px_rgba(124,58,237,0.08)] transition-opacity duration-200 md:-rotate-1 md:px-5 md:py-4 md:text-base ${
                    bubbleVisible ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <p className="break-words whitespace-normal">{bubbleText}</p>
                  <span className="absolute -left-2 top-4 hidden size-4 rotate-45 bg-peach md:block" />
                </div>
                <div className="mt-3 rounded-2xl border border-grey/20 bg-white/80 px-4 py-3 shadow-[0_8px_30px_rgba(124,58,237,0.08)]">
                  <p className="text-sm text-ink">{completedCount} of 10 milestones complete</p>
                  <div className="mt-2 h-2 w-full rounded-full bg-grey/30">
                    <div
                      className="h-full rounded-full bg-purple transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                      aria-hidden="true"
                    />
                  </div>
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
                className={`rounded-2xl border px-5 pt-10 pb-6 shadow-[0_8px_30px_rgba(124,58,237,0.08)] transition-colors md:min-h-[80vh] md:px-8 md:pt-12 md:pb-16 ${
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
                <h2 className="mt-5 break-words text-3xl font-bold text-ink md:text-4xl">
                  {milestone.title}
                </h2>
                <p className="mt-4 break-words max-w-2xl text-base leading-relaxed text-grey md:text-lg">
                  {milestone.shortDescription}
                </p>
                <div className="mt-6">
                  <MilestoneToggle milestoneId={milestone.id} />
                </div>
                <div className="mt-7">
                  <Link
                    href={`/milestones/${milestone.id}`}
                    className="inline-flex items-center rounded-full bg-purple px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple/30 md:px-6"
                  >
                    Open VERA&apos;s guide &rarr;
                  </Link>
                </div>
                <div className="hidden md:mt-14 md:flex md:items-center md:justify-center">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 96 44"
                    className="h-8 w-20 text-purple/35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M48 38V8"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M49 20C56 18 62 20 66 26C59 29 53 27 49 20Z"
                      fill="currentColor"
                      fillOpacity="0.2"
                    />
                    <path
                      d="M47 26C40 24 34 26 30 32C37 35 43 33 47 26Z"
                      fill="currentColor"
                      fillOpacity="0.2"
                    />
                    <path
                      d="M49 20C56 18 62 20 66 26M47 26C40 24 34 26 30 32"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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
