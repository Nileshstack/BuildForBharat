"use client";

import { useScrollProgress } from "@/hooks/use-scroll-velocity";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] bg-transparent"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <div
        className="h-full origin-left bg-[linear-gradient(90deg,#FF7A1A_0%,#FFFFFF_50%,#16A34A_100%)]"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
