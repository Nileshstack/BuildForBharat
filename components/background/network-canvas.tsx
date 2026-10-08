"use client";

import { useEffect, useRef, useState } from "react";
import { useCursor } from "@/hooks/use-cursor";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  radius: number;
};

const colors = ["#0B1B3A", "#FF7A1A", "#16A34A"];

export default function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursor = useCursor();
  const cursorRef = useRef(cursor);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    cursorRef.current = cursor;
  }, [cursor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const lowEndDevice =
      (navigator.hardwareConcurrency || 0) > 0 &&
      navigator.hardwareConcurrency <= 4;
    setFallback(reducedMotion.matches || lowEndDevice);

    if (reducedMotion.matches || lowEndDevice) {
      return;
    }

    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let pageVisible = !document.hidden;
    let particles: Particle[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(
        90,
        Math.max(24, Math.round((width * height) / 24000)),
      );
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        color: colors[Math.floor(Math.random() * colors.length)],
        radius: 1.1 + Math.random() * 1.5,
      }));
    };

    const draw = () => {
      if (!visible || !pageVisible) return;
      context.clearRect(0, 0, width, height);
      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];
        const currentCursor = cursorRef.current;
        if (currentCursor.active) {
          const dx = particle.x - currentCursor.x;
          const dy = particle.y - currentCursor.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < 150) {
            const force = (1 - distance / 150) * 0.018;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          } else if (distance >= 150 && distance < 260) {
            const force = ((distance - 150) / 110) * 0.0008;
            particle.vx -= (dx / distance) * force;
            particle.vy -= (dy / distance) * force;
          }
        }
        particle.vx = Math.max(-0.55, Math.min(0.55, particle.vx * 0.995));
        particle.vy = Math.max(-0.55, Math.min(0.55, particle.vy * 0.995));
        particle.x = (particle.x + particle.vx + width) % width;
        particle.y = (particle.y + particle.vy + height) % height;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = particle.color;
        context.globalAlpha = 0.42;
        context.fill();

        for (
          let otherIndex = index + 1;
          otherIndex < particles.length;
          otherIndex += 1
        ) {
          const other = particles[otherIndex];
          const distance = Math.hypot(
            particle.x - other.x,
            particle.y - other.y,
          );
          if (distance < 125) {
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(other.x, other.y);
            context.strokeStyle = particle.color;
            context.globalAlpha = (1 - distance / 125) * 0.12;
            context.lineWidth = 0.7;
            context.stroke();
          }
        }
      }
      context.globalAlpha = 1;
      frame = window.requestAnimationFrame(draw);
    };

    const start = () => {
      if (!frame && visible && pageVisible)
        frame = window.requestAnimationFrame(draw);
    };
    const stop = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    observer.observe(canvas);
    const onVisibilityChange = () => {
      pageVisible = !document.hidden;
      if (pageVisible) start();
      else stop();
    };

    resize();
    start();
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return fallback ? (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(255,122,26,0.08),transparent_48%),radial-gradient(ellipse_at_80%_75%,rgba(22,163,74,0.08),transparent_48%)]"
    />
  ) : (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 block h-full w-full"
    />
  );
}
