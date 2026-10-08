"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { PrincipleCard } from "@/components/rules/principle-card";
import { event } from "@/data/event";

export default function RulesPage() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(
    () => new Set(),
  );
  const [activeExplain, setActiveExplain] = useState(0);
  const reducedMotion = useReducedMotion();
  const totalFinaleMinutes =
    event.finaleFormat.presentationMinutes + event.finaleFormat.questionMinutes;
  const presentationPercent =
    (event.finaleFormat.presentationMinutes / totalFinaleMinutes) * 100;
  const activeExplainItem = event.finalRoundMustExplain[activeExplain];

  const toggleDeliverable = (item: string) => {
    setCheckedItems((current) => {
      const next = new Set(current);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  };

  return (
    <main id="rules" className="relative z-10">
      <section className="mx-auto max-w-7xl px-5 pb-14 pt-14 sm:px-8 sm:pb-18 sm:pt-20">
        <Reveal>
          <p className="mb-4 font-heading text-xs font-semibold uppercase tracking-[0.17em] text-saffron">
            A clear brief for every team
          </p>
          <SectionHeading
            as="h1"
            title="Rules for building with purpose."
            description="Know who can take part, what to prepare, and what your finale presentation should cover."
            headingClassName="text-4xl sm:text-5xl lg:text-6xl"
          />
        </Reveal>

        <div className="mt-9 grid gap-4 md:grid-cols-2">
          <SpotlightCard className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-md bg-saffron/10 text-saffron">
                <UsersRound aria-hidden="true" size={21} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-saffron">
                  Eligibility
                </p>
                <h2 className="mt-2 font-heading text-xl font-semibold text-navy">
                  Who can participate?
                </h2>
                <p className="mt-3 text-sm leading-6 text-navy/70">
                  {event.eligibility}
                </p>
              </div>
            </div>
          </SpotlightCard>
          <SpotlightCard className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-md bg-india-green/10 text-india-green">
                <UsersRound aria-hidden="true" size={21} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-india-green">
                  Team size
                </p>
                <h2 className="mt-2 font-heading text-xl font-semibold text-navy">
                  Build as a team
                </h2>
                <p className="mt-3 text-sm leading-6 text-navy/70">
                  {event.teamSize.min}–{event.teamSize.max} members per team.
                </p>
                <p className="mt-2 text-xs text-navy/50">
                  {event.teamSize.note}
                </p>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </section>

      <section
        aria-labelledby="deliverables-title"
        className="border-y border-navy/10 bg-white/55 px-5 py-14 backdrop-blur-sm sm:px-8 sm:py-18"
      >
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionHeading
              eyebrow="A flexible build checklist"
              title="What you’ll build."
              description="Mark the pieces your team expects to deliver. Your selection stays in this page session only."
            />
          </Reveal>
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2
                id="deliverables-title"
                className="font-heading text-lg font-semibold text-navy"
              >
                Potential deliverables
              </h2>
              <span className="text-xs tabular-nums text-navy/55">
                {checkedItems.size} of {event.deliverables.items.length}{" "}
                selected
              </span>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {event.deliverables.items.map((item) => {
                const checked = checkedItems.has(item);
                return (
                  <li key={item}>
                    <label
                      className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-md border px-3 py-2.5 text-sm transition-colors ${checked ? "border-india-green/25 bg-india-green/5 text-navy" : "border-navy/10 bg-white/65 text-navy/70 hover:bg-white"}`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleDeliverable(item)}
                        className="peer sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={`grid size-5 shrink-0 place-items-center rounded border ${checked ? "border-india-green bg-india-green text-white" : "border-navy/25 bg-white text-transparent"}`}
                      >
                        <Check size={13} strokeWidth={3} />
                      </span>
                      <span>{item}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 flex items-start gap-2 rounded-md border border-saffron/15 bg-saffron/5 px-4 py-3 text-sm leading-6 text-navy/75">
              <CircleHelp
                aria-hidden="true"
                size={16}
                className="mt-0.5 shrink-0 text-saffron"
              />
              {event.deliverables.note}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="finale-title"
        className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20"
      >
        <Reveal>
          <div className="grid gap-7 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <SectionHeading
              eyebrow="Finale · 10 + 4 minutes"
              title="What the finale expects."
              description="Tell a coherent story: start with the citizen problem, show what you built, and make the impact easy to understand."
            />
            <div className="rounded-lg border border-navy/10 bg-white/65 p-5 sm:p-6">
              <div className="flex justify-between gap-4 text-xs font-semibold text-navy">
                <span>
                  Presentation · {event.finaleFormat.presentationMinutes} min
                </span>
                <span>Jury Q&A · {event.finaleFormat.questionMinutes} min</span>
              </div>
              <div
                role="img"
                aria-label={`${event.finaleFormat.presentationMinutes} minute presentation followed by ${event.finaleFormat.questionMinutes} minutes of jury Q and A`}
                className="mt-3 flex h-3 overflow-hidden rounded-full bg-navy/8"
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${presentationPercent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: reducedMotion ? 0 : 0.8 }}
                  className="h-full bg-saffron"
                />
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${100 - presentationPercent}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.6,
                    delay: reducedMotion ? 0 : 0.4,
                  }}
                  className="h-full bg-navy"
                />
              </div>
              <div className="mt-2 flex justify-between text-[10px] font-medium text-navy/50">
                <span>0 min</span>
                <span>{totalFinaleMinutes} min total</span>
              </div>
            </div>
          </div>
        </Reveal>
        <div className="mt-9 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <ol className="grid gap-2 sm:grid-cols-2">
            {event.finalRoundMustExplain.map((item, index) => (
              <li key={item}>
                <button
                  type="button"
                  aria-current={activeExplain === index ? "step" : undefined}
                  onClick={() => setActiveExplain(index)}
                  className={`flex min-h-12 w-full items-center gap-3 rounded-md border px-3 py-2 text-left text-sm transition-colors ${activeExplain === index ? "border-saffron/30 bg-saffron/5 text-navy" : "border-navy/8 bg-white/50 text-navy/65 hover:bg-white"}`}
                >
                  <span
                    className={`grid size-7 shrink-0 place-items-center rounded-full font-heading text-xs font-semibold ${activeExplain === index ? "bg-saffron text-navy" : "bg-navy/5 text-navy/55"}`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item}
                </button>
              </li>
            ))}
          </ol>
          <SpotlightCard className="flex min-h-56 flex-col justify-between p-6 sm:p-7">
            <p className="font-heading text-xs font-semibold uppercase tracking-wider text-saffron">
              Step {String(activeExplain + 1).padStart(2, "0")} /{" "}
              {event.finalRoundMustExplain.length}
            </p>
            <motion.p
              key={activeExplainItem}
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              className="font-heading text-2xl font-semibold leading-snug text-navy"
            >
              {activeExplainItem}
            </motion.p>
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() =>
                  setActiveExplain((index) => Math.max(0, index - 1))
                }
                disabled={activeExplain === 0}
                aria-label="Previous finale step"
                className="grid size-10 place-items-center rounded-md border border-navy/10 text-navy disabled:opacity-35"
              >
                <ChevronLeft aria-hidden="true" size={18} />
              </button>
              <span className="text-xs tabular-nums text-navy/50">
                {activeExplain + 1} / {event.finalRoundMustExplain.length}
              </span>
              <button
                type="button"
                onClick={() =>
                  setActiveExplain((index) =>
                    Math.min(event.finalRoundMustExplain.length - 1, index + 1),
                  )
                }
                disabled={
                  activeExplain === event.finalRoundMustExplain.length - 1
                }
                aria-label="Next finale step"
                className="grid size-10 place-items-center rounded-md border border-navy/10 text-navy disabled:opacity-35"
              >
                <ChevronRight aria-hidden="true" size={18} />
              </button>
            </div>
          </SpotlightCard>
        </div>
      </section>

      <section
        aria-labelledby="principles-title"
        className="border-y border-navy/10 bg-white/55 px-5 py-14 backdrop-blur-sm sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="How we build"
              title="Design & innovation principles"
              description="Explore each principle for a concise reminder of what a citizen-first solution should do."
            />
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {event.designPrinciples.map((principle, index) => (
              <PrincipleCard
                key={principle.title}
                principle={principle}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="general-rules-title"
        className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20"
      >
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Organizer details"
              title="General rules"
              description="Items marked as placeholders need final organizer review before publication."
            />
            <span className="rounded-full border border-saffron/20 bg-saffron/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#b45309]">
              Editable placeholders
            </span>
          </div>
        </Reveal>
        <div className="mt-8 divide-y divide-navy/10 border-y border-navy/10">
          {event.generalRules.map((rule, index) => (
            <article
              key={rule.title}
              className="grid gap-2 py-4 sm:grid-cols-[minmax(0,220px)_1fr_auto] sm:items-center sm:gap-5"
            >
              <h3 className="font-heading text-sm font-semibold text-navy">
                {rule.title}
              </h3>
              <p className="text-sm leading-6 text-navy/65">{rule.detail}</p>
              <span className="w-fit rounded-full bg-navy/5 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-navy/55">
                {rule.isPlaceholder ? "To confirm" : `Rule ${index + 1}`}
              </span>
            </article>
          ))}
        </div>
        <div className="mt-8 flex items-start gap-3 rounded-md border border-india-green/15 bg-india-green/5 p-4 text-sm leading-6 text-navy/70">
          <ShieldCheck
            aria-hidden="true"
            size={18}
            className="mt-0.5 shrink-0 text-india-green"
          />
          <p>
            Track choice defines the primary evaluation focus, not a restriction
            on combining technologies. {event.trackRule}
          </p>
        </div>
      </section>
    </main>
  );
}
