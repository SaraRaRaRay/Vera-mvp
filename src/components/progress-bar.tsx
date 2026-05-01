"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "vera_progress";
const PROGRESS_EVENT = "vera-progress-updated";

type ProgressBarProps = {
  total: number;
};

function getCompletedCount() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return 0;
    }

    const parsed = JSON.parse(raw) as Record<string, boolean>;
    return Object.values(parsed).filter(Boolean).length;
  } catch {
    return 0;
  }
}

export function ProgressBar({ total }: ProgressBarProps) {
  const [completed, setCompleted] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const sync = () => {
      setCompleted(getCompletedCount());
      setMounted(true);
    };

    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(PROGRESS_EVENT, sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(PROGRESS_EVENT, sync);
    };
  }, []);

  const safeCompleted = mounted ? completed : 0;
  const percentage = total > 0 ? Math.round((safeCompleted / total) * 100) : 0;

  return (
    <section className="mb-8 rounded-xl border bg-card p-4 md:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-foreground">
          {safeCompleted} of {total} milestones complete
        </p>
        <p className="text-sm text-muted-foreground">{percentage}%</p>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </section>
  );
}

