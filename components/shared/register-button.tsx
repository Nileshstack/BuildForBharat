"use client";

import { useState, type PointerEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { event, REGISTER_URL } from "@/data/event";
import { useNow } from "@/hooks/use-now";

export function RegisterButton({
  className = "",
  label = "Register on Unstop",
}: {
  className?: string;
  label?: string;
}) {
  const now = useNow();
  const reducedMotion = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const isClosed =
    now !== null &&
    now.getTime() >= Date.parse(event.registrationDeadline.value);

  const moveMagnet = (pointer: PointerEvent<HTMLAnchorElement>) => {
    if (reducedMotion || pointer.pointerType === "touch") return;
    const bounds = pointer.currentTarget.getBoundingClientRect();
    setOffset({
      x: ((pointer.clientX - bounds.left) / bounds.width - 0.5) * 8,
      y: ((pointer.clientY - bounds.top) / bounds.height - 0.5) * 5,
    });
  };

  const resetMagnet = () => setOffset({ x: 0, y: 0 });
  const classes = `inline-flex min-h-11 items-center justify-center rounded-md bg-saffron px-5 py-2.5 font-heading text-sm font-semibold text-white shadow-[0_8px_24px_rgba(255,122,26,0.22)] transition-[transform,background-color,box-shadow] hover:bg-[#ec6810] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-saffron disabled:cursor-not-allowed disabled:bg-navy/35 disabled:shadow-none ${className}`;

  if (isClosed) {
    return (
      <button
        type="button"
        disabled
        className={classes}
        aria-label="Registration closed"
      >
        Registration closed
      </button>
    );
  }

  return (
    <a
      href={REGISTER_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
      onPointerMove={moveMagnet}
      onPointerLeave={resetMagnet}
      style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
    >
      {label}
    </a>
  );
}
