"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollVelocity(): number {
  const [velocity, setVelocity] = useState(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    let previousY = window.scrollY;
    let previousTime = performance.now();
    let frame = 0;
    let pendingY = previousY;

    const update = () => {
      const now = performance.now();
      const elapsed = Math.max(now - previousTime, 1);
      const instant = Math.abs(pendingY - previousY) / elapsed * 1000;
      const next = velocityRef.current * 0.6 + instant * 0.4;
      velocityRef.current = next;
      setVelocity(Math.min(next, 2000));
      previousY = pendingY;
      previousTime = now;
      frame = 0;
    };
    const onScroll = () => {
      pendingY = window.scrollY;
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return velocity;
}

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return Math.min(1, Math.max(0, progress));
}