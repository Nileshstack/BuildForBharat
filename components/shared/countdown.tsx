"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { event } from "@/data/event";
import { useNow } from "@/hooks/use-now";

function FlipUnit({ value, label }: { value: number | null; label: string }) {
  const reducedMotion = useReducedMotion();
  const display = value === null ? "--" : String(value).padStart(2, "0");

  return (
    <div className="min-w-14 text-center">
      <div className="relative grid h-14 min-w-14 place-items-center overflow-hidden rounded-md border border-navy/10 bg-white/75 font-heading text-2xl font-semibold tabular-nums text-navy shadow-sm">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={display}
            initial={reducedMotion ? false : { y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reducedMotion ? undefined : { y: -14, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.22 }}
            className="absolute"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 block text-[10px] font-semibold uppercase tracking-wider text-navy/55">
        {label}
      </span>
    </div>
  );
}

export function Countdown({ className = "" }: { className?: string }) {
  const now = useNow();
  const startsAt = Date.parse(event.dates.start);
  const endsAt = Date.parse(event.dates.end);

  if (now && now.getTime() >= endsAt) {
    return (
      <p
        className={`font-heading text-lg font-semibold text-india-green ${className}`}
      >
        Event completed
      </p>
    );
  }
  if (now && now.getTime() >= startsAt) {
    return (
      <p
        className={`font-heading text-lg font-semibold text-saffron ${className}`}
      >
        Event is live
      </p>
    );
  }

  const remaining = now ? Math.max(0, startsAt - now.getTime()) : null;
  const units =
    remaining === null
      ? [null, null, null, null]
      : [
          Math.floor(remaining / 86_400_000),
          Math.floor((remaining / 3_600_000) % 24),
          Math.floor((remaining / 60_000) % 60),
          Math.floor((remaining / 1000) % 60),
        ];

  return (
    <div
      className={`flex items-start gap-2 ${className}`}
      role="timer"
      aria-label={
        now
          ? `Event countdown: ${units[0]} days, ${units[1]} hours, ${units[2]} minutes, ${units[3]} seconds`
          : "Event countdown loading"
      }
    >
      {units.map((value, index) => (
        <FlipUnit
          key={["Days", "Hours", "Minutes", "Seconds"][index]}
          value={value}
          label={["Days", "Hours", "Minutes", "Seconds"][index]}
        />
      ))}
    </div>
  );
}
