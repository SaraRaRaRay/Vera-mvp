"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "vera_progress";
const PROGRESS_EVENT = "vera-progress-updated";

type ProgressState = Record<string, boolean>;

function readProgress(): ProgressState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      return parsed as ProgressState;
    }
  } catch {
    // Ignore malformed localStorage and fall back to empty progress.
  }

  return {};
}

function writeProgress(progress: ProgressState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

type MilestoneToggleProps = {
  milestoneId: string;
};

export function MilestoneToggle({ milestoneId }: MilestoneToggleProps) {
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const progress = readProgress();
    setDone(Boolean(progress[milestoneId]));
  }, [milestoneId]);

  const onToggle = (checked: boolean) => {
    setDone(checked);
    const progress = readProgress();
    progress[milestoneId] = checked;
    writeProgress(progress);
    window.dispatchEvent(new Event(PROGRESS_EVENT));
  };

  return (
    <label className="inline-flex cursor-pointer items-center gap-3 rounded-full border border-grey/35 bg-white/75 px-4 py-2 text-sm text-grey shadow-[0_8px_30px_rgba(124,58,237,0.08)]">
      <input
        type="checkbox"
        className="size-4 rounded border-grey/40 accent-purple focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple/30"
        checked={mounted ? done : false}
        onChange={(event) => onToggle(event.target.checked)}
      />
      <span className={done ? "font-medium text-ink" : "text-grey"}>{done ? "Done" : "Mark complete"}</span>
    </label>
  );
}

