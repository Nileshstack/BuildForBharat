"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  BrainCircuit,
  ChevronDown,
  Cpu,
  Layers3,
  Lightbulb,
  Microchip,
  Search,
  Workflow,
} from "lucide-react";
import { RegisterButton } from "@/components/shared/register-button";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { event } from "@/data/event";

type TrackName = "Software" | "Hardware";

const trackIcons = { Software: Workflow, Hardware: Microchip };
const techIcons = [Cpu, Layers3, BrainCircuit, Lightbulb, Search];
const chainIcons = [Search, Layers3, BrainCircuit, Workflow, ArrowRight];
const tokens = ["{ }", "</>", "01", "API", "AI", "=>", "[]", "λ"];

function readTrackFromUrl(): TrackName {
  return new URLSearchParams(window.location.search)
    .get("track")
    ?.toLowerCase() === "hardware"
    ? "Hardware"
    : "Software";
}

function TrackBackdrop({ track }: { track: TrackName }) {
  const reducedMotion = useReducedMotion();
  return (
    <div
      aria-hidden="true"
      className="relative h-48 overflow-hidden rounded-lg border border-navy/8 bg-[linear-gradient(140deg,#f4faff,#fff,#f3fff7)] sm:h-60"
    >
      {track === "Software" ? (
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 place-items-center">
          {tokens.map((token, index) => (
            <motion.span
              key={token}
              className="font-mono text-lg font-semibold text-saffron/70 sm:text-2xl"
              animate={
                reducedMotion
                  ? undefined
                  : { y: [8, -12, 8], opacity: [0.28, 0.78, 0.28] }
              }
              transition={{
                duration: 3 + (index % 3),
                delay: index * 0.16,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {token}
            </motion.span>
          ))}
        </div>
      ) : (
        <svg
          viewBox="0 0 720 260"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full text-india-green/65"
        >
          <defs>
            <filter id="track-circuit-glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            filter="url(#track-circuit-glow)"
          >
            {[
              "M20 40 H180 L230 90 H360 L410 40 H700",
              "M10 130 H140 L190 180 H300 L350 130 H710",
              "M70 250 V200 L130 140 V80 L180 30",
              "M650 250 V205 L590 145 V95 L535 40",
              "M250 5 V55 L300 105 V155 L260 205 V255",
              "M460 0 V55 L420 95 V165 L475 220 V260",
            ].map((path, index) => (
              <motion.path
                key={path}
                d={path}
                strokeDasharray="760"
                initial={{ strokeDashoffset: 760 }}
                animate={
                  reducedMotion
                    ? { strokeDashoffset: 0 }
                    : { strokeDashoffset: [760, 0] }
                }
                transition={{
                  duration: reducedMotion ? 0 : 1.8,
                  delay: reducedMotion ? 0 : index * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </g>
          {!reducedMotion
            ? [0, 1, 2].map((pulse) => (
                <motion.circle
                  key={pulse}
                  r="5"
                  fill="#FF7A1A"
                  filter="url(#track-circuit-glow)"
                  animate={{
                    cx: [40, 675],
                    cy: [40 + pulse * 78, 40 + pulse * 78],
                  }}
                  transition={{
                    duration: 3.2,
                    delay: pulse * 0.75,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))
            : null}
          <g fill="#0B1B3A">
            <circle cx="180" cy="40" r="5" />
            <circle cx="360" cy="90" r="5" />
            <circle cx="590" cy="145" r="5" />
            <circle cx="300" cy="180" r="5" />
          </g>
        </svg>
      )}
      <span className="absolute bottom-4 left-4 rounded-full border border-white/80 bg-white/75 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-navy/55">
        {track} systems
      </span>
    </div>
  );
}

export default function TracksPage() {
  const [selectedTrack, setSelectedTrack] = useState<TrackName>("Software");
  const [openInnovation, setOpenInnovation] = useState<number | null>(0);
  const [activeTechTab, setActiveTechTab] = useState(0);
  const reducedMotion = useReducedMotion();
  const activeTrack =
    event.tracks.find((track) => track.name === selectedTrack) ??
    event.tracks[0];
  const TrackIcon = trackIcons[selectedTrack];

  useEffect(() => {
    const updateFromUrl = () => setSelectedTrack(readTrackFromUrl());
    updateFromUrl();
    window.addEventListener("popstate", updateFromUrl);
    return () => window.removeEventListener("popstate", updateFromUrl);
  }, []);

  const chooseTrack = (track: TrackName) => {
    setSelectedTrack(track);
    window.history.replaceState(
      null,
      "",
      track === "Hardware" ? "/tracks?track=hardware" : "/tracks",
    );
  };

  return (
    <main id="tracks" className="relative z-10">
      <section className="mx-auto max-w-7xl px-5 pb-14 pt-14 sm:px-8 sm:pb-20 sm:pt-20">
        <Reveal>
          <p className="mb-4 font-heading text-xs font-semibold uppercase tracking-[0.17em] text-saffron">
            Two tracks, one citizen-first goal
          </p>
          <div className="grid gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.8fr)] lg:items-end">
            <div>
              <SectionHeading
                as="h1"
                title="Choose how you build."
                description={event.trackRule}
                headingClassName="text-4xl sm:text-5xl lg:text-6xl"
              />
              <div
                className="mt-7 inline-flex rounded-md border border-navy/10 bg-white/65 p-1"
                role="group"
                aria-label="Choose a hackathon track"
              >
                {event.tracks.map((track) => (
                  <button
                    key={track.name}
                    type="button"
                    aria-pressed={selectedTrack === track.name}
                    onClick={() => chooseTrack(track.name as TrackName)}
                    className={`relative inline-flex min-h-11 items-center gap-2 rounded px-4 text-sm font-semibold transition-colors ${selectedTrack === track.name ? "text-white" : "text-navy/65 hover:text-navy"}`}
                  >
                    {selectedTrack === track.name ? (
                      <motion.span
                        layoutId="track-switcher-active"
                        className="absolute inset-0 rounded bg-navy"
                        transition={{ duration: reducedMotion ? 0 : 0.22 }}
                      />
                    ) : null}
                    <span className="relative z-10">{track.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <TrackBackdrop track={selectedTrack} />
          </div>
        </Reveal>

        <AnimatePresence mode="wait" initial={false}>
          <motion.section
            key={activeTrack.name}
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reducedMotion ? 0 : 0.24 }}
            className="mt-10 grid gap-7 lg:grid-cols-[0.9fr_1.1fr]"
          >
            <SpotlightCard className="p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-md bg-saffron/10 text-saffron">
                  <TrackIcon aria-hidden="true" size={23} />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-navy/50">
                    Selected track
                  </p>
                  <h2 className="font-heading text-2xl font-semibold text-navy">
                    {activeTrack.name}
                  </h2>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-navy/75">
                {activeTrack.description}
              </p>
              <h3 className="mt-6 font-heading text-xs font-semibold uppercase tracking-wider text-navy/55">
                Example solution types
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {activeTrack.examples.map((example) => (
                  <li
                    key={example}
                    className="rounded-sm border border-navy/10 bg-white/75 px-3 py-2 text-xs text-navy/75"
                  >
                    {example}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
            <SpotlightCard className="p-6 sm:p-8">
              <h3 className="font-heading text-lg font-semibold text-navy">
                Focus areas
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {activeTrack.focus.map((focus) => (
                  <li
                    key={focus}
                    className="rounded-full bg-[#edf5fa] px-3 py-1.5 text-xs font-medium text-navy/75"
                  >
                    {focus}
                  </li>
                ))}
              </ul>
              <div className="mt-7 border-t border-navy/10 pt-5">
                <p className="font-heading text-xs font-semibold uppercase tracking-wider text-navy/55">
                  Evaluation focus
                </p>
                <p className="mt-2 text-sm leading-6 text-navy/75">
                  {activeTrack.evaluationFocus}
                </p>
              </div>
            </SpotlightCard>
          </motion.section>
        </AnimatePresence>

        <p className="mt-7 flex items-start gap-2 rounded-md border border-saffron/20 bg-saffron/6 px-4 py-3 text-sm leading-6 text-navy/75">
          <Lightbulb
            aria-hidden="true"
            size={17}
            className="mt-0.5 shrink-0 text-saffron"
          />
          <span>
            <strong className="font-semibold text-navy">
              Track flexibility:
            </strong>{" "}
            {event.trackRule}
          </span>
        </p>
        <div className="mt-8">
          <RegisterButton />
        </div>
      </section>

      <section
        aria-labelledby="innovation-title"
        className="border-y border-navy/10 bg-white/50 px-5 py-14 backdrop-blur-sm sm:px-8 sm:py-18"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Where ideas can go"
              title="Key innovation areas"
              description="Explore a starting point. Teams can combine multiple areas to serve one clear need."
            />
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {event.innovationAreas.map((area, index) => {
              const isOpen = openInnovation === index;
              return (
                <motion.article
                  key={area.title}
                  layout
                  className={`rounded-md border transition-colors ${isOpen ? "border-saffron/35 bg-white/90 shadow-[0_12px_32px_rgba(11,27,58,0.06)]" : "border-navy/10 bg-white/55"}`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenInnovation(isOpen ? null : index)}
                    className="flex min-h-24 w-full items-start justify-between gap-3 p-4 text-left"
                  >
                    <span>
                      <span className="font-tagline text-xs italic text-saffron">
                        0{index + 1}
                      </span>
                      <span className="mt-2 block font-heading text-sm font-semibold leading-5 text-navy">
                        {area.title}
                      </span>
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      size={16}
                      className={`mt-1 shrink-0 text-navy/50 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={
                          reducedMotion ? false : { height: 0, opacity: 0 }
                        }
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reducedMotion ? 0 : 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-4 text-xs leading-5 text-navy/65">
                          {area.description}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="ai-challenge-title"
        className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20"
      >
        <Reveal>
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <SectionHeading
              eyebrow="Intelligence with purpose"
              title="Make AI matter to someone."
              description={event.aiChallenge.principle}
            />
            <p className="rounded-md border-l-2 border-saffron bg-white/65 px-5 py-4 font-tagline text-lg italic leading-7 text-navy">
              AI should address a real citizen need, not be a decorative
              chatbot.
            </p>
          </div>
        </Reveal>
        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={{
            visible: {
              transition: { staggerChildren: reducedMotion ? 0 : 0.16 },
            },
          }}
          className="mt-9 grid gap-2 sm:grid-cols-5"
        >
          {event.aiChallenge.chain.map((node, index) => {
            const Icon = chainIcons[index] ?? ArrowRight;
            return (
              <motion.li
                key={node}
                variants={{
                  hidden: { opacity: 0.35, y: reducedMotion ? 0 : 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: reducedMotion ? 0 : 0.35 }}
                className="relative flex items-center gap-3 rounded-md border border-navy/10 bg-white/70 p-4 sm:flex-col sm:items-start"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-saffron/10 text-saffron">
                  <Icon aria-hidden="true" size={18} />
                </span>
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-navy/45">
                    0{index + 1}
                  </span>
                  <span className="mt-1 block font-heading text-sm font-semibold leading-5 text-navy">
                    {node}
                  </span>
                </span>
                {index < event.aiChallenge.chain.length - 1 ? (
                  <ArrowRight
                    aria-hidden="true"
                    size={15}
                    className="ml-auto text-navy/25 sm:absolute sm:-right-3 sm:top-1/2 sm:z-10 sm:-translate-y-1/2 sm:bg-[#f7fbff]"
                  />
                ) : null}
              </motion.li>
            );
          })}
        </motion.ol>
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <SpotlightCard className="p-6 sm:p-7">
            <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-navy">
              <BrainCircuit
                aria-hidden="true"
                size={19}
                className="text-saffron"
              />
              AI ideas
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {event.aiChallenge.aiIdeas.map((idea) => (
                <li
                  key={idea}
                  className="rounded-full border border-navy/10 bg-white/75 px-3 py-1.5 text-xs text-navy/70"
                >
                  {idea}
                </li>
              ))}
            </ul>
          </SpotlightCard>
          <SpotlightCard className="p-6 sm:p-7">
            <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-navy">
              <Layers3
                aria-hidden="true"
                size={19}
                className="text-india-green"
              />
              Machine learning ideas
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {event.aiChallenge.mlIdeas.map((idea) => (
                <li
                  key={idea}
                  className="rounded-full border border-navy/10 bg-white/75 px-3 py-1.5 text-xs text-navy/70"
                >
                  {idea}
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </div>
      </section>

      <section
        aria-labelledby="tech-title"
        className="border-y border-navy/10 bg-white/50 px-5 py-14 backdrop-blur-sm sm:px-8 sm:py-18"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow="Choose tools that fit"
                title="Suggested tech guidance"
                description="Stack-agnostic suggestions, not requirements."
              />
              <span className="rounded-full border border-india-green/20 bg-india-green/6 px-3 py-1.5 text-xs font-semibold text-india-green">
                Optional · stack-agnostic
              </span>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-[220px_minmax(0,1fr)]">
            <div
              role="tablist"
              aria-label="Technology guidance category"
              className="flex gap-2 overflow-x-auto pb-1 md:flex-col"
            >
              {event.techGuidance.categories.map((category, index) => {
                const Icon = techIcons[index] ?? Cpu;
                return (
                  <button
                    key={category.name}
                    type="button"
                    role="tab"
                    aria-selected={activeTechTab === index}
                    aria-controls="tech-guidance-panel"
                    onClick={() => setActiveTechTab(index)}
                    className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${activeTechTab === index ? "border-navy bg-navy text-white" : "border-navy/10 bg-white/60 text-navy/65 hover:bg-white"}`}
                  >
                    <Icon aria-hidden="true" size={15} />
                    {category.name}
                  </button>
                );
              })}
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeTechTab}
                id="tech-guidance-panel"
                role="tabpanel"
                initial={reducedMotion ? false : { opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, x: -8 }}
                transition={{ duration: reducedMotion ? 0 : 0.18 }}
                className="glass-card min-h-40 rounded-lg p-6 sm:p-8"
              >
                <h3 className="font-heading text-xl font-semibold text-navy">
                  {event.techGuidance.categories[activeTechTab]?.name}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {event.techGuidance.categories[
                    activeTechTab
                  ]?.suggestions.map((suggestion) => (
                    <li
                      key={suggestion}
                      className="rounded-sm bg-navy/5 px-3 py-2 text-sm text-navy/70"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs text-navy/50">
                  {event.techGuidance.note}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="max-w-2xl font-tagline text-lg italic text-navy/70">
          Build for citizens. Choose the track that makes your solution real.
        </p>
        <Link
          href="/prizes"
          className="inline-flex min-h-10 items-center gap-2 font-heading text-sm font-semibold text-navy hover:text-saffron"
        >
          Explore prizes <ArrowDown aria-hidden="true" size={15} />
        </Link>
      </section>
    </main>
  );
}
