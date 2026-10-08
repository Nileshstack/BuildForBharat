"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Award, ArrowRight, Medal, Trophy } from "lucide-react";
import { CountUp } from "@/components/shared/count-up";
import { RegisterButton } from "@/components/shared/register-button";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { PodiumConfetti } from "@/components/prizes/podium-confetti";
import { event } from "@/data/event";

type TrackKey = "software" | "hardware";

const medalStyles = [
  {
    label: "Champion",
    accent: "#D98A16",
    tint: "#FFF4DA",
    icon: Trophy,
    podium: "h-32",
  },
  {
    label: "Runner-up",
    accent: "#577996",
    tint: "#EAF3FA",
    icon: Medal,
    podium: "h-24",
  },
  {
    label: "Third place",
    accent: "#168044",
    tint: "#EAF7EF",
    icon: Award,
    podium: "h-20",
  },
];

export default function PrizesPage() {
  const [activePrizeTrack, setActivePrizeTrack] =
    useState<TrackKey>("software");
  const [activeJudgingTrack, setActiveJudgingTrack] =
    useState<TrackKey>("software");
  const reducedMotion = useReducedMotion();
  const poolTotal = Number(event.prizePool.replace(/\D/g, ""));
  const awards = event.prizes.perTrack;
  const sortedWeights = [...event.judging.weights].sort(
    (first, second) => second[activeJudgingTrack] - first[activeJudgingTrack],
  );

  return (
    <main id="prizes" className="relative z-10">
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-20">
        <Reveal>
          <p className="mb-4 font-heading text-xs font-semibold uppercase tracking-[0.17em] text-saffron">
            Recognition for useful impact
          </p>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <SectionHeading
              as="h1"
              title="Build it. Prove it. Win."
              description="Outstanding teams in both tracks are recognized for solutions that understand a real problem, work in practice, and create potential citizen impact."
              headingClassName="text-4xl sm:text-5xl lg:text-6xl"
            />
            <div className="rounded-lg border border-navy/10 bg-white/65 px-6 py-5 sm:min-w-64">
              <p className="text-xs font-semibold uppercase tracking-wider text-navy/50">
                Total prize pool
              </p>
              <p className="mt-2 font-heading text-4xl font-semibold tabular-nums text-navy">
                <CountUp value={poolTotal} prefix="₹" />
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section
        aria-labelledby="podium-title"
        className="border-y border-navy/10 bg-white/50 px-5 py-14 backdrop-blur-sm sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Per track awards"
                title="Six winning teams."
                description="Three prizes are awarded in each track."
              />
              <div
                role="group"
                aria-label="Choose prize track"
                className="inline-flex w-fit rounded-md border border-navy/10 bg-white/75 p-1"
              >
                {(["software", "hardware"] as const).map((track) => (
                  <button
                    key={track}
                    type="button"
                    aria-pressed={activePrizeTrack === track}
                    onClick={() => setActivePrizeTrack(track)}
                    className={`relative min-h-10 rounded px-4 text-xs font-semibold capitalize ${activePrizeTrack === track ? "text-white" : "text-navy/65"}`}
                  >
                    {activePrizeTrack === track ? (
                      <motion.span
                        layoutId="prize-track-toggle"
                        className="absolute inset-0 rounded bg-navy"
                        transition={{ duration: reducedMotion ? 0 : 0.2 }}
                      />
                    ) : null}
                    <span className="relative z-10">{track}</span>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="relative mt-8 grid gap-4 md:grid-cols-3">
            <PodiumConfetti />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={activePrizeTrack} className="contents">
                {awards.map((award, index) => {
                  const style = medalStyles[index] ?? medalStyles[2];
                  const Icon = style.icon;
                  return (
                    <motion.article
                      key={`${activePrizeTrack}-${award.place}`}
                      initial={reducedMotion ? false : { opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: reducedMotion ? 0 : 0.45,
                        delay: reducedMotion ? 0 : index * 0.14,
                      }}
                      className="relative z-10 flex flex-col"
                    >
                      <SpotlightCard className="flex min-h-64 flex-1 flex-col p-6 sm:p-7">
                        <div className="flex items-start justify-between gap-4">
                          <span
                            className="grid size-12 place-items-center rounded-md"
                            style={{
                              backgroundColor: style.tint,
                              color: style.accent,
                            }}
                          >
                            <Icon aria-hidden="true" size={23} />
                          </span>
                          <span
                            className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
                            style={{
                              backgroundColor: style.tint,
                              color: style.accent,
                            }}
                          >
                            {style.label}
                          </span>
                        </div>
                        <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-navy/50">
                          {activePrizeTrack} · {award.place} place
                        </p>
                        <p
                          className="mt-2 font-heading text-4xl font-semibold tabular-nums"
                          style={{ color: style.accent }}
                        >
                          {award.amount}
                        </p>
                        <p className="mt-auto pt-6 text-xs text-navy/55">
                          One winning team
                        </p>
                      </SpotlightCard>
                      <div
                        className={`${style.podium} mx-auto mt-3 flex w-[78%] items-start justify-center rounded-t-md border border-white/75 pt-3`}
                        style={{
                          background: `linear-gradient(180deg, ${style.tint}, rgb(255 255 255 / 0.12))`,
                        }}
                      >
                        <span
                          className="font-heading text-2xl font-semibold"
                          style={{ color: style.accent }}
                        >
                          {index + 1}
                        </span>
                      </div>
                    </motion.article>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-7 flex items-center gap-3 rounded-md border border-india-green/15 bg-india-green/5 px-4 py-3 text-sm text-navy/75">
            <Award
              aria-hidden="true"
              size={19}
              className="shrink-0 text-india-green"
            />
            <span>
              <strong className="font-semibold text-navy">
                Every participant
              </strong>{" "}
              receives a certificate of participation.
            </span>
          </div>
          <p className="mt-3 text-xs text-navy/50">{event.prizes.additional}</p>
        </div>
      </section>

      <section
        id="judging"
        aria-labelledby="judging-title"
        className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20"
      >
        <Reveal>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="How ideas are evaluated"
              title="Judging criteria"
              description="Weights are tailored to the primary nature of each track."
            />
            <div
              role="group"
              aria-label="Choose judging track"
              className="inline-flex w-fit rounded-md border border-navy/10 bg-white/70 p-1"
            >
              {(["software", "hardware"] as const).map((track) => (
                <button
                  key={track}
                  type="button"
                  aria-pressed={activeJudgingTrack === track}
                  onClick={() => setActiveJudgingTrack(track)}
                  className={`relative min-h-10 rounded px-4 text-xs font-semibold capitalize ${activeJudgingTrack === track ? "text-white" : "text-navy/65"}`}
                >
                  {activeJudgingTrack === track ? (
                    <motion.span
                      layoutId="judging-toggle"
                      className="absolute inset-0 rounded bg-navy"
                      transition={{ duration: reducedMotion ? 0 : 0.2 }}
                    />
                  ) : null}
                  <span className="relative z-10">{track}</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_0.72fr]">
          <div
            className="space-y-3"
            role="list"
            aria-label={`${activeJudgingTrack} judging weights`}
          >
            <AnimatePresence initial={false}>
              {sortedWeights.map((weight, index) => (
                <motion.div
                  key={weight.parameter}
                  layout
                  role="listitem"
                  initial={reducedMotion ? false : { opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0 }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.24,
                    delay: reducedMotion ? 0 : index * 0.025,
                  }}
                  className="rounded-md border border-navy/8 bg-white/65 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium text-navy/80">
                      {weight.parameter}
                    </span>
                    <span className="font-heading text-sm font-semibold tabular-nums text-navy">
                      {weight[activeJudgingTrack]}%
                    </span>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-navy/8">
                    <motion.div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#FF7A1A,#0B1B3A)]"
                      initial={{ width: 0 }}
                      animate={{ width: `${weight[activeJudgingTrack]}%` }}
                      transition={{
                        duration: reducedMotion ? 0 : 0.5,
                        delay: reducedMotion ? 0 : index * 0.025,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="space-y-4">
            <blockquote className="rounded-lg border border-saffron/20 bg-[linear-gradient(145deg,rgba(255,122,26,0.09),rgba(255,255,255,0.78)_54%,rgba(22,163,74,0.07))] p-6 sm:p-8">
              <span className="font-tagline text-4xl italic leading-none text-saffron">
                “
              </span>
              <p className="font-tagline text-xl italic leading-8 text-navy">
                {event.judging.corePrinciple}
              </p>
            </blockquote>
            <p className="px-1 text-xs leading-5 text-navy/55">
              Judges assess each solution against its selected track and its
              demonstrated value to users.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-navy px-5 py-14 text-white sm:px-8 sm:py-18">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.16em] text-saffron">
              Ready to build?
            </p>
            <p className="mt-3 max-w-2xl font-tagline text-2xl italic leading-relaxed">
              {event.closingQuote}
            </p>
          </div>
          <RegisterButton className="w-full shrink-0 sm:w-auto" />
        </div>
        <Link
          href="/tracks"
          className="mx-auto mt-7 flex max-w-7xl items-center gap-2 text-xs font-medium text-white/60 hover:text-white"
        >
          Explore tracks <ArrowRight aria-hidden="true" size={14} />
        </Link>
      </section>
    </main>
  );
}
