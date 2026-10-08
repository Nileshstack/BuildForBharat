"use client";

import { useReducedMotion } from "framer-motion";

export function Marquee({
  items,
  label = "Highlights",
}: {
  items: readonly string[];
  label?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="overflow-hidden" role="region" aria-label={label}>
      <div
        className="flex w-max items-center gap-3 py-2 hover:[animation-play-state:paused]"
        style={{
          animation: reducedMotion
            ? "none"
            : "marquee-scroll 32s linear infinite",
        }}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex shrink-0 items-center gap-3"
            aria-hidden={copy === 1}
          >
            {items.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className="rounded-full border border-navy/10 bg-white/70 px-4 py-2 text-sm text-navy/75"
              >
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
