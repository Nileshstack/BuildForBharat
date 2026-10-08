"use client";

import Image from "next/image";
import { useState, type PointerEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { event } from "@/data/event";

export function HeroPoster() {
  const [imageUnavailable, setImageUnavailable] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();

  const trackPointer = (pointer: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || pointer.pointerType === "touch") return;
    const bounds = pointer.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((pointer.clientY - bounds.top) / bounds.height) * -5 + 2.5,
      y: ((pointer.clientX - bounds.left) / bounds.width) * 5 - 2.5,
    });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      className="relative mx-auto w-full max-w-87.5 perspective-distant"
      onPointerMove={trackPointer}
      onPointerLeave={resetTilt}
    >
      <div
        className="relative aspect-4/5 overflow-hidden rounded-lg border border-white/80 bg-[#f8fcff] shadow-[0_30px_75px_rgba(11,27,58,0.2)]"
        style={{
          transform: reducedMotion
            ? undefined
            : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translate3d(${tilt.y * 1.5}px, ${tilt.x * -1.5}px, 0)`,
          transition: reducedMotion ? "none" : "transform 220ms ease-out",
        }}
      >
        {!imageUnavailable ? (
          <Image
            src="/images/poster.png"
            alt={`${event.name} event poster`}
            fill
            sizes="(max-width: 768px) 78vw, 350px"
            className="object-cover"
            onError={() => setImageUnavailable(true)}
          />
        ) : null}
        {imageUnavailable ? (
          <div className="absolute inset-0 flex flex-col justify-between overflow-hidden bg-[linear-gradient(155deg,#fff9f2_0%,#fff_48%,#f0fff6_100%)] p-6 sm:p-7">
            <div className="absolute -right-16 -top-16 size-64 rounded-full border-28 border-saffron/10" />
            <div className="absolute -bottom-20 -left-16 size-64 rounded-full border-28 border-india-green/10" />
            <div className="relative">
              <div className="tricolour-divider mb-7 w-16" />
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-navy/55">
                {event.heroLabel}
              </p>
              <h2 className="mt-4 font-heading text-[2rem] font-bold leading-[1.02] text-navy sm:text-[2.35rem]">
                {event.name.split(" ").map((word, index) => (
                  <span
                    key={`${word}-${index}`}
                    className={`block ${word.toLowerCase() === "bharat" ? "tricolour-text" : ""}`}
                  >
                    {word.toUpperCase()}
                  </span>
                ))}
              </h2>
              <p className="mt-5 font-tagline text-base italic text-saffron">
                {event.tagline}
              </p>
            </div>
            <div className="relative border-t border-navy/10 pt-4">
              <p className="font-heading text-xs font-semibold text-navy">
                {event.dates.display}
              </p>
              <p className="mt-1 text-[10px] leading-4 text-navy/60">
                {event.location} · {event.duration} · {event.format}
              </p>
            </div>
          </div>
        ) : null}
      </div>
      <div className="pointer-events-none absolute -bottom-3 -right-2 -z-10 h-[88%] w-[82%] rounded-lg border border-saffron/20 bg-saffron/10" />
    </div>
  );
}
