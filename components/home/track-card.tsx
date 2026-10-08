"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Cpu, Code2 } from "lucide-react";
import type { EventData } from "@/data/event";
import { SpotlightCard } from "@/components/shared/spotlight-card";

const glyphs = ["{ }", "</>", "01", "AI", "=>", "[]", "λ", "API"];

export function TrackCard({
  track,
  index,
}: {
  track: EventData["tracks"][number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useReducedMotion();
  const isSoftware = index === 0;
  const Icon = isSoftware ? Code2 : Cpu;

  return (
    <Link
      href="/tracks"
      className="group block h-full rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-saffron"
    >
      <motion.div
        className="h-full"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={reducedMotion ? undefined : { y: -5 }}
        transition={{ duration: reducedMotion ? 0 : 0.2 }}
      >
        <SpotlightCard className="h-full min-h-97.5 p-6 sm:p-7">
          <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#FF7A1A,#0B1B3A_52%,#16A34A)]" />
          <div className="relative flex h-full flex-col">
            <div className="relative mb-6 flex h-24 items-center justify-between overflow-hidden rounded-md bg-[#eef7fc] px-5">
              <span className="grid size-12 place-items-center rounded-md bg-white text-navy shadow-sm">
                <Icon aria-hidden="true" size={24} strokeWidth={1.7} />
              </span>
              {isSoftware ? (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 overflow-hidden"
                >
                  {glyphs.map((glyph, glyphIndex) => (
                    <motion.span
                      key={glyph}
                      className="absolute font-mono text-xs font-semibold text-saffron/80"
                      style={{
                        left: `${12 + glyphIndex * 11}%`,
                        top: `${16 + (glyphIndex % 3) * 28}%`,
                      }}
                      initial={{ opacity: 0, y: 12 }}
                      animate={
                        hovered && !reducedMotion
                          ? {
                              opacity: [0, 0.8, 0],
                              y: -25 - (glyphIndex % 3) * 8,
                            }
                          : { opacity: 0, y: 12 }
                      }
                      transition={{
                        duration: 1.2,
                        delay: glyphIndex * 0.06,
                        repeat: hovered && !reducedMotion ? Infinity : 0,
                        repeatDelay: 0.3,
                      }}
                    >
                      {glyph}
                    </motion.span>
                  ))}
                </div>
              ) : (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 250 90"
                  className="absolute inset-0 size-full text-india-green/70"
                >
                  <path
                    d="M8 45 H70 L90 20 H145 L165 45 H240 M90 20 V8 M145 20 V78 M70 45 V70 H205"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="360"
                    strokeDashoffset={hovered && !reducedMotion ? 0 : 360}
                    className="transition-[stroke-dashoffset] duration-700"
                  />
                  <circle cx="90" cy="20" r="4" fill="#FF7A1A" />
                  <circle cx="165" cy="45" r="4" fill="#16A34A" />
                  <circle cx="205" cy="70" r="4" fill="#0B1B3A" />
                </svg>
              )}
              <span className="relative z-10 ml-auto rounded-full border border-navy/10 bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-navy/60">
                Track 0{index + 1}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-heading text-2xl font-semibold text-navy">
                {track.name}
              </h3>
              <ArrowUpRight
                aria-hidden="true"
                size={19}
                className="shrink-0 text-saffron transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {track.examples.map((example) => (
                <li
                  key={example}
                  className="rounded-sm bg-navy/4.5 px-2.5 py-1.5 text-xs leading-4 text-navy/70"
                >
                  {example}
                </li>
              ))}
            </ul>
            <p className="mt-auto pt-6 text-xs leading-5 text-navy/60">
              Evaluation: {track.focus.slice(0, 4).join(" · ")}
            </p>
          </div>
        </SpotlightCard>
      </motion.div>
    </Link>
  );
}
