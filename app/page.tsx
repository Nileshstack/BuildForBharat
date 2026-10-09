"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  LockKeyhole,
  MapPin,
  Mic2,
  UsersRound,
} from "lucide-react";
import { CountUp } from "@/components/shared/count-up";
import { Countdown } from "@/components/shared/countdown";
import { Marquee } from "@/components/shared/marquee";
import { RegisterButton } from "@/components/shared/register-button";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { HeroPoster } from "@/components/home/hero-poster";
import { TrackCard } from "@/components/home/track-card";
import { TypewriterLine } from "@/components/home/typewriter-line";
import { event } from "@/data/event";
import { formatIst, useNow } from "@/hooks/use-now";

const taglineColors = ["text-saffron", "text-navy", "text-india-green"];
const eventTitleWords = event.name.toUpperCase().split(" ");
const taglineWords = event.tagline.split(".").filter(Boolean);
const prizePoolValue = Number(event.prizePool.replace(/\D/g, ""));
const expectedTeamRange = event.expectedTeams.split("-");
const durationValue = Number(event.duration.match(/\d+/)?.[0] ?? 0);

function stageStatus(now: Date | null, start: string, end: string) {
  if (!now || now.getTime() < Date.parse(start)) return "Upcoming";
  if (now.getTime() < Date.parse(end)) return "Live";
  return "Completed";
}

function remainingUnits(now: Date | null, target: string) {
  if (!now) return ["--", "--", "--", "--"];
  const remaining = Math.max(0, Date.parse(target) - now.getTime());
  return [
    String(Math.floor(remaining / 86_400_000)).padStart(2, "0"),
    String(Math.floor((remaining / 3_600_000) % 24)).padStart(2, "0"),
    String(Math.floor((remaining / 60_000) % 60)).padStart(2, "0"),
    String(Math.floor((remaining / 1000) % 60)).padStart(2, "0"),
  ];
}

export default function Home() {
  const now = useNow();
  const reducedMotion = useReducedMotion();
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const revealAt = Date.parse(event.problemStatements.revealAt);
  const statementsUnlocked = now !== null && now.getTime() >= revealAt;
  const revealCountdown = remainingUnits(now, event.problemStatements.revealAt);
  const revealAtLabel = formatIst(new Date(revealAt), {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <main>
      <section
        id="home"
        className="relative mx-auto grid min-h-[calc(100svh-7.5rem)] w-full max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(290px,350px)] lg:gap-14"
      >
        <div className="relative z-10">
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-saffron/20 bg-white/70 px-3.5 py-2 font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-navy/75">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-saffron"
              />
              {event.heroLabel}
            </p>
            <h1 className="max-w-4xl font-heading text-[2.9rem] font-bold uppercase leading-[0.98] text-navy sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
              {eventTitleWords.map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.42,
                    delay: reducedMotion ? 0 : index * 0.11,
                  }}
                  className={`inline-block ${word.toLowerCase() === "bharat" ? "tricolour-text" : ""}`}
                >
                  {word}
                  {index < eventTitleWords.length - 1 ? "\u00a0" : ""}
                </motion.span>
              ))}
            </h1>
            <p className="mt-6 flex flex-wrap gap-x-2 font-tagline text-2xl italic sm:text-3xl">
              {taglineWords.map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.4,
                    delay: reducedMotion ? 0 : 0.3 + index * 0.14,
                  }}
                  className={taglineColors[index % taglineColors.length]}
                >
                  {word.trim()}
                  {index < taglineWords.length - 1 ? "." : ""}
                </motion.span>
              ))}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-navy/75 sm:text-lg sm:leading-8">
              {event.subtitle}
            </p>
            <div className="mt-4 flex min-h-7 items-center gap-2">
              <span
                className="size-1.5 shrink-0 rounded-full bg-india-green"
                aria-hidden="true"
              />
              <TypewriterLine phrases={event.heroRotator} />
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <RegisterButton />
              <Link
                href="#schedule"
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-navy/15 bg-white/65 px-5 py-2.5 font-heading text-sm font-semibold text-navy transition hover:border-navy/30 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-saffron"
              >
                View Schedule <ArrowDown aria-hidden="true" size={16} />
              </Link>
            </div>
            <ul className="mt-9 grid max-w-2xl grid-cols-2 gap-2.5 sm:grid-cols-4">
              <li className="flex min-h-12 items-center gap-2 rounded-md border border-white/80 bg-white/65 px-3 py-2 text-xs font-medium text-navy/75">
                <CalendarDays
                  aria-hidden="true"
                  size={15}
                  className="shrink-0 text-saffron"
                />
                {event.dates.display}
              </li>
              <li className="flex min-h-12 items-center gap-2 rounded-md border border-white/80 bg-white/65 px-3 py-2 text-xs font-medium text-navy/75">
                <MapPin
                  aria-hidden="true"
                  size={15}
                  className="shrink-0 text-saffron"
                />
                {event.location}
              </li>
              <li className="flex min-h-12 items-center gap-2 rounded-md border border-white/80 bg-white/65 px-3 py-2 text-xs font-medium text-navy/75">
                <UsersRound
                  aria-hidden="true"
                  size={15}
                  className="shrink-0 text-saffron"
                />
                {event.teamSize.min}-{event.teamSize.max} per team
              </li>
              <li className="flex min-h-12 items-center gap-2 rounded-md border border-white/80 bg-white/65 px-3 py-2 text-xs font-medium text-navy/75">
                <Clock3
                  aria-hidden="true"
                  size={15}
                  className="shrink-0 text-saffron"
                />
                {event.duration}
              </li>
            </ul>
          </Reveal>
        </div>
        <Reveal
          className="relative mx-auto w-full max-w-87.5 lg:mx-0 lg:justify-self-end"
          delay={0.12}
        >
          <HeroPoster />
        </Reveal>
        <a
          href="#countdown"
          className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-navy/45 lg:inline-flex"
        >
          Scroll to explore <ArrowDown aria-hidden="true" size={13} />
        </a>
      </section>

      <section
        id="countdown"
        aria-labelledby="countdown-title"
        className="border-y border-navy/10 bg-white/55 px-5 py-8 backdrop-blur-sm sm:px-8"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-saffron">
              The build begins
            </p>
            <h2
              id="countdown-title"
              className="mt-1 font-heading text-xl font-semibold text-navy"
            >
              Countdown to opening
            </h2>
          </div>
          <Countdown />
        </div>
      </section>

      

      <section
        id="about"
        aria-labelledby="about-title"
        className="border-y border-navy/8 bg-white/40 px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Purpose-built for citizens"
              title="A better experience starts with a better question."
              description={event.aboutIntro}
            />
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {event.pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 0.07}>
                <SpotlightCard className="h-full min-h-48 p-6 sm:p-7">
                  <p className="font-tagline text-sm italic text-saffron">
                    0{index + 1} / {event.name}
                  </p>
                  <h3 className="mt-5 font-heading text-2xl font-semibold text-navy">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-navy/70">
                    {pillar.description}
                  </p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 border-t border-navy/10 pt-6">
            <div className="mb-2 flex items-end justify-between gap-4">
              <h3 className="font-heading text-sm font-semibold text-navy">
                What teams will take on
              </h3>
              <span className="text-xs text-navy/50">
                {event.objectives.length} objectives
              </span>
            </div>
            <Marquee
              items={event.objectives.map((objective) => objective.title)}
              label="Hackathon objectives"
            />
          </div>
        </div>
      </section>

      <section
        id="tracks"
        aria-labelledby="tracks-title"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20"
      >
        <Reveal>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Two ways to build"
              title="Choose your track."
              description={event.trackRule}
            />
            <Link
              href="/tracks"
              className="inline-flex min-h-10 shrink-0 items-center gap-2 font-heading text-sm font-semibold text-navy hover:text-saffron focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron"
            >
              Explore tracks <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </Reveal>
        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {event.tracks.map((track, index) => (
            <TrackCard key={track.name} track={track} index={index} />
          ))}
        </div>
      </section>

      <section
        id="schedule"
        aria-labelledby="journey-title"
        className="border-y border-navy/10 bg-white/55 px-5 py-16 backdrop-blur-sm sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="From first idea to final demo"
                title="Your hackathon journey."
                description="Follow the stages from the first proposal through the offline finale."
              />
              <p className="shrink-0 text-xs font-medium text-navy/55">
                All times IST
              </p>
            </div>
          </Reveal>
          <ol className="mt-10 flex snap-x gap-4 overflow-x-auto pb-5">
            {event.stages.map((stage, index) => {
              const status = stageStatus(now, stage.start, stage.end);
              const statusClass =
                status === "Live"
                  ? "bg-india-green/10 text-india-green"
                  : status === "Completed"
                    ? "bg-navy/8 text-navy/55"
                    : "bg-saffron/10 text-[#bd570f]";
              return (
                <li
                  key={stage.name}
                  className="w-[min(82vw,340px)] shrink-0 snap-start"
                >
                  <div className="relative h-full border-t-2 border-navy/15 pt-5">
                    <span
                      className={`absolute -top-1.75 left-0 size-3 rounded-full border-2 border-white ${status === "Live" ? "bg-india-green ring-4 ring-india-green/15" : status === "Completed" ? "bg-navy/45" : "bg-saffron"}`}
                      aria-hidden="true"
                    />
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-tagline text-sm italic text-navy/50">
                        Stage 0{index + 1}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${statusClass}`}
                      >
                        {status}
                      </span>
                    </div>
                    <h3 className="mt-4 font-heading text-lg font-semibold leading-snug text-navy">
                      {stage.name}
                    </h3>
                    <p className="mt-2 text-xs font-medium text-saffron">
                      {formatIst(new Date(stage.start), {
                        day: "numeric",
                        month: "short",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-navy/70">
                      {stage.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section
        id="rules"
        aria-labelledby="problem-statements-title"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20"
      >
        <Reveal>
          <SectionHeading
            eyebrow="The challenge"
            title="Start with the problem."
            description="Problem statements are released when teams gather and Round 1 begins."
          />
        </Reveal>
        <SpotlightCard className="mt-9 p-6 sm:p-9">
          <div className="grid gap-7 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center">
            <div
              className={`grid size-14 place-items-center rounded-full ${statementsUnlocked ? "bg-india-green/10 text-india-green" : "bg-saffron/10 text-saffron"}`}
            >
              {statementsUnlocked ? (
                <Check aria-hidden="true" size={24} />
              ) : (
                <LockKeyhole aria-hidden="true" size={23} />
              )}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3
                  id="problem-statements-title"
                  className="font-heading text-xl font-semibold text-navy"
                >
                  {statementsUnlocked
                    ? "Problem statements"
                    : "Challenge reveal"}
                </h3>
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${statementsUnlocked ? "bg-india-green/10 text-india-green" : "bg-navy/5 text-navy/60"}`}
                >
                  {statementsUnlocked ? "Unlocked" : "Locked"}
                </span>
              </div>
              {statementsUnlocked ? (
                event.problemStatements.items.length ? (
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {event.problemStatements.items.map((statement) => (
                      <li
                        key={statement.id}
                        className="rounded-md border border-navy/10 bg-white/65 p-4"
                      >
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-saffron">
                          {statement.track}
                        </p>
                        <h4 className="mt-1 font-heading font-semibold text-navy">
                          {statement.title}
                        </h4>
                        <p className="mt-2 text-sm leading-5 text-navy/65">
                          {statement.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-navy/65">
                    Challenge details will appear here.
                  </p>
                )
              ) : (
                <>
                  <p className="mt-2 text-sm text-navy/65">
                    Problem statements drop on {revealAtLabel} IST.
                  </p>
                  <div
                    className="mt-4 flex flex-wrap gap-2"
                    aria-label="Time until problem statement reveal"
                  >
                    {revealCountdown.map((unit, index) => (
                      <span
                        key={index}
                        className="rounded-sm bg-white/80 px-3 py-2 font-heading text-sm font-semibold tabular-nums text-navy"
                      >
                        {unit}
                        <span className="ml-1 text-[9px] font-medium uppercase text-navy/50">
                          {["days", "hrs", "min", "sec"][index]}
                        </span>
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
            <p className="text-xs font-medium text-navy/50 md:text-right">
              {event.problemStatements.items.length} statements listed
            </p>
          </div>
        </SpotlightCard>
      </section>

      <section
        aria-labelledby="speakers-title"
        className="border-y border-navy/10 bg-white/45 px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Ideas from the field"
              title="Learn from people who build."
              description="Expert sessions connect emerging ideas with practical solutions."
            />
          </Reveal>
          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            {event.speakerSessions.map((session, index) => (
              <Reveal key={session.title} delay={index * 0.04}>
                <article className="flex h-full gap-4 border-t border-navy/15 py-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-md bg-saffron/10 text-saffron">
                    <Mic2 aria-hidden="true" size={18} />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-navy/50">
                      {session.phase}
                    </p>
                    <h3 className="mt-1 font-heading text-base font-semibold leading-6 text-navy">
                      {session.title}
                    </h3>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="faq"
        aria-labelledby="faq-title"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20"
      >
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Good to know"
              title="Frequently asked questions."
              description="A few useful details for teams getting ready."
            />
            <Link
              href="/#faq"
              className="inline-flex min-h-10 items-center gap-2 font-heading text-sm font-semibold text-navy hover:text-saffron focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron"
            >
              All FAQs <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-x-8 sm:grid-cols-2">
          {event.faqs.slice(0, 4).map((faq, index) => (
            <div key={faq.question} className="border-t border-navy/15 py-4">
              <button
                type="button"
                className="flex w-full items-start justify-between gap-4 text-left font-heading text-sm font-semibold text-navy"
                aria-expanded={faqOpen === index}
                onClick={() =>
                  setFaqOpen((current) => (current === index ? null : index))
                }
              >
                {faq.question}
                <span aria-hidden="true" className="text-saffron">
                  {faqOpen === index ? "−" : "+"}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {faqOpen === index ? (
                  <motion.p
                    initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.2 }}
                    className="overflow-hidden pr-6 pt-3 text-sm leading-6 text-navy/65"
                  >
                    {faq.answer}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy px-5 py-14 text-white sm:px-8 sm:py-20">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-1/3 bg-[radial-gradient(ellipse_at_70%_50%,rgba(255,122,26,.23),transparent_68%)]"
        />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.17em] text-saffron">
              {event.name}
            </p>
            <p className="mt-4 font-tagline text-2xl italic leading-relaxed text-white/90 sm:text-3xl">
              “{event.closingQuote}”
            </p>
          </div>
          <RegisterButton className="w-full shrink-0 sm:w-auto" />
        </div>
      </section>
    </main>
  );
}
