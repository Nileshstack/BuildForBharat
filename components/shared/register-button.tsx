"use client";

import { useState, type PointerEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { REGISTER_URL } from "@/data/event";
import { useNow } from "@/hooks/use-now";
import { getRegistrationStatus } from "@/lib/registration";

export function RegisterButton({
  className = "",
}: {
  className?: string;
}) {
  const now = useNow();
  const status = getRegistrationStatus(now);
  const reducedMotion = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const moveMagnet = (pointer: PointerEvent<HTMLAnchorElement>) => {
    if (reducedMotion || pointer.pointerType === "touch") return;
    const bounds = pointer.currentTarget.getBoundingClientRect();
    setOffset({
      x: ((pointer.clientX - bounds.left) / bounds.width - 0.5) * 8,
      y: ((pointer.clientY - bounds.top) / bounds.height - 0.5) * 5,
    });
  };

  const resetMagnet = () => setOffset({ x: 0, y: 0 });
  const classes = `inline-flex min-h-11 items-center justify-center rounded-md px-5 py-2.5 font-heading text-sm font-semibold text-white transition-[transform,background-color,box-shadow] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-saffron ${
    status.isOpen
      ? "bg-saffron shadow-[0_8px_24px_rgba(255,122,26,0.22)] hover:bg-[#ec6810]"
      : "cursor-not-allowed bg-navy/35 shadow-none"
  } ${className}`;

  if (!status.isOpen) {
    return (
      <button
        type="button"
        disabled
        className={classes}
        aria-label={status.label}
      >
        {status.label}
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
      {status.label}
    </a>
  );
}
