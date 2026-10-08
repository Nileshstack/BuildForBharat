"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function TypewriterLine({ phrases }: { phrases: readonly string[] }) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const reducedMotion = useReducedMotion();
  const phrase = phrases[phraseIndex] ?? "";

  useEffect(() => {
    if (reducedMotion || phrases.length < 2) return;
    let delay = deleting ? 42 : 74;
    if (!deleting && text.length === phrase.length) delay = 1450;

    const timeout = window.setTimeout(() => {
      if (!deleting && text.length === phrase.length) {
        setDeleting(true);
      } else if (deleting && text.length > 0) {
        setText((current) => current.slice(0, -1));
      } else if (deleting) {
        setDeleting(false);
        setPhraseIndex((index) => (index + 1) % phrases.length);
      } else {
        setText(phrase.slice(0, text.length + 1));
      }
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [deleting, phrase, phrases, reducedMotion, text]);

  const visibleText = reducedMotion ? (phrases[0] ?? "") : text;

  return (
    <p
      className="min-h-7 font-heading text-sm font-medium text-navy/75 sm:text-base"
      aria-label={reducedMotion ? phrases[0] : phrase}
    >
      <span aria-hidden="true">{visibleText}</span>
      {!reducedMotion ? (
        <span
          className="ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-saffron motion-safe:animate-pulse"
          aria-hidden="true"
        />
      ) : null}
    </p>
  );
}
