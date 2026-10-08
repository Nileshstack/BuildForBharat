"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function CountUp({
  value,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    let frame = 0;
    let startedAt = 0;
    const duration = 1200;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (reducedMotion) {
          setCount(value);
          return;
        }
        const animate = (time: number) => {
          if (!startedAt) startedAt = time;
          const progress = Math.min((time - startedAt) / duration, 1);
          const eased = 1 - (1 - progress) ** 3;
          setCount(value * eased);
          if (progress < 1) frame = window.requestAnimationFrame(animate);
        };
        frame = window.requestAnimationFrame(animate);
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reducedMotion, value]);

  return (
    <span ref={elementRef} className={className}>
      {prefix}
      {new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
        Math.round(count),
      )}
      {suffix}
    </span>
  );
}
