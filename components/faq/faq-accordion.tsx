"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, Send } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { event, type FAQCategory } from "@/data/event";

const categories: Array<"All" | FAQCategory> = [
  "All",
  "General",
  "Teams",
  "Submission",
  "Venue",
  "Judging",
];

export function FAQAccordion() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [openQuestion, setOpenQuestion] = useState<string | null>(
    event.faqs[0]?.question ?? null,
  );
  const reducedMotion = useReducedMotion();

  const filteredFAQs = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return event.faqs.filter((faq) => {
      const matchesCategory = category === "All" || faq.category === category;
      const matchesQuery =
        !normalizedQuery ||
        `${faq.question} ${faq.answer} ${faq.category}`
          .toLocaleLowerCase()
          .includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-14 sm:px-8 sm:pb-14 sm:pt-20">
        <SectionHeading
          as="h1"
          eyebrow="Quick answers"
          title="Frequently asked questions."
          description="Search the details or choose a topic to narrow the list."
          headingClassName="text-4xl sm:text-5xl lg:text-6xl"
        />
      </div>
      <section className="border-y border-navy/10 bg-white/50 px-5 py-9 backdrop-blur-sm sm:px-8 sm:py-12">
        <div className="mx-auto max-w-7xl">
          <label
            htmlFor="faq-search"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-navy/55"
          >
            Search questions
          </label>
          <div className="relative max-w-2xl">
            <Search
              aria-hidden="true"
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-navy/40"
            />
            <input
              id="faq-search"
              type="search"
              value={query}
              onChange={(change) => setQuery(change.currentTarget.value)}
              placeholder="Try “team size” or “judging”"
              className="h-12 w-full rounded-md border border-navy/15 bg-white/85 pl-11 pr-4 text-sm text-navy outline-none placeholder:text-navy/35 focus:border-saffron/60 focus:ring-2 focus:ring-saffron/15"
            />
          </div>
          <div
            className="mt-5 flex flex-wrap gap-2"
            role="group"
            aria-label="Filter FAQs by category"
          >
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
                className={`min-h-9 rounded-full border px-3.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron ${category === item ? "border-navy bg-navy text-white" : "border-navy/12 bg-white/60 text-navy/65 hover:bg-white"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <p className="mb-4 text-xs text-navy/50" aria-live="polite">
            {filteredFAQs.length}{" "}
            {filteredFAQs.length === 1 ? "answer" : "answers"}
          </p>
          {filteredFAQs.length ? (
            <div className="divide-y divide-navy/12 border-y border-navy/12">
              {filteredFAQs.map((faq, index) => {
                const expanded = openQuestion === faq.question;
                const panelId = `faq-answer-${index}`;
                const buttonId = `faq-question-${index}`;
                return (
                  <article key={faq.question} className="py-1">
                    <h2>
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={panelId}
                        onClick={() =>
                          setOpenQuestion(expanded ? null : faq.question)
                        }
                        className="flex min-h-14 w-full items-center justify-between gap-5 py-3 text-left font-heading text-sm font-semibold leading-6 text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron sm:text-base"
                      >
                        <span>{faq.question}</span>
                        <span
                          aria-hidden="true"
                          className={`grid size-7 shrink-0 place-items-center rounded-full text-lg font-normal ${expanded ? "bg-saffron/10 text-saffron" : "bg-navy/5 text-navy/50"}`}
                        >
                          {expanded ? "−" : "+"}
                        </span>
                      </button>
                    </h2>
                    <AnimatePresence initial={false}>
                      {expanded ? (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          initial={
                            reducedMotion ? false : { height: 0, opacity: 0 }
                          }
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: reducedMotion ? 0 : 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-3xl pb-5 pr-8 text-sm leading-6 text-navy/70">
                            {faq.answer}
                          </p>
                          {faq.isPlaceholder ? (
                            <p className="pb-4 text-[10px] font-semibold uppercase tracking-wider text-saffron">
                              Organizer confirmation pending
                            </p>
                          ) : null}
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-md border border-navy/10 bg-white/60 px-5 py-10 text-center">
              <p className="font-heading font-semibold text-navy">
                No matching questions
              </p>
              <p className="mt-2 text-sm text-navy/60">
                Try another search or select a different topic.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
                className="mt-4 text-sm font-semibold text-saffron underline underline-offset-4"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
        <SpotlightCard className="h-fit p-6 sm:p-7">
          <span className="grid size-11 place-items-center rounded-md bg-saffron/10 text-saffron">
            <Send aria-hidden="true" size={19} />
          </span>
          <h2 className="mt-5 font-heading text-xl font-semibold text-navy">
            Still have questions?
          </h2>
          <p className="mt-3 text-sm leading-6 text-navy/65">
            Organizer contact details are listed on the contact page. Some
            details are still awaiting confirmation.
          </p>
          <Link
            href="/contact#organisers"
            className="mt-5 inline-flex min-h-10 items-center gap-2 font-heading text-sm font-semibold text-navy hover:text-saffron"
          >
            Contact the organizers <span aria-hidden="true">→</span>
          </Link>
        </SpotlightCard>
      </section>
    </>
  );
}
