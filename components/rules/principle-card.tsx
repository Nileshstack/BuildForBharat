"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { RotateCw } from "lucide-react";
import type { EventData } from "@/data/event";
import { SpotlightCard } from "@/components/shared/spotlight-card";

export function PrincipleCard({
  principle,
  index,
}: {
  principle: EventData["designPrinciples"][number];
  index: number;
}) {
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reducedMotion = useReducedMotion();
  const flipped = pinned || hovered || focused;

  return (
    <button
      type="button"
      aria-pressed={pinned}
      onClick={() => setPinned((value) => !value)}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className="group h-full min-h-52 w-full rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-saffron"
    >
      <SpotlightCard className="h-full min-h-52 p-0">
        <motion.div
          animate={{ rotateY: flipped && !reducedMotion ? 180 : 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.48,
            ease: [0.2, 0.7, 0.2, 1],
          }}
          className="relative min-h-52 h-full rounded-lg"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            aria-hidden={flipped}
            className="absolute inset-0 flex min-h-52 flex-col justify-between p-5"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="font-tagline text-sm italic text-saffron">
                0{index + 1}
              </span>
              <RotateCw
                aria-hidden="true"
                size={15}
                className="text-navy/35 transition-transform group-hover:rotate-45"
              />
            </div>
            <h3 className="font-heading text-xl font-semibold leading-snug text-navy">
              {principle.title}
            </h3>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-navy/40">
              Explore principle
            </span>
          </div>
          <div
            aria-hidden={!flipped}
            className="absolute inset-0 flex min-h-52 flex-col justify-between rounded-lg bg-navy p-5 text-white"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            <span className="font-tagline text-sm italic text-saffron">
              0{index + 1} / {principle.title}
            </span>
            <p className="text-sm leading-6 text-white/85">
              {principle.description}
            </p>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-white/70">
              {pinned ? "Tap to turn back" : "Move away to turn back"}
            </span>
          </div>
        </motion.div>
      </SpotlightCard>
    </button>
  );
}
