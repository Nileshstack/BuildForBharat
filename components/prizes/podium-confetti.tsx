"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type ConfettiParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  spin: number;
  size: number;
  color: string;
};

const colors = ["#FF7A1A", "#0B1B3A", "#16A34A", "#F4C95D", "#A8C7E8"];

export function PodiumConfetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || reducedMotion) return;

    let frame = 0;
    let started = false;
    let particles: ConfettiParticle[] = [];
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(bounds.width * ratio);
      canvas.height = Math.round(bounds.height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        resize();
        const bounds = canvas.getBoundingClientRect();
        particles = Array.from({ length: 72 }, () => ({
          x: bounds.width * (0.25 + Math.random() * 0.5),
          y: bounds.height * 0.53,
          vx: (Math.random() - 0.5) * 7,
          vy: -2 - Math.random() * 7,
          rotation: Math.random() * Math.PI,
          spin: (Math.random() - 0.5) * 0.18,
          size: 3 + Math.random() * 4,
          color: colors[Math.floor(Math.random() * colors.length)],
        }));
        const draw = () => {
          const width = canvas.clientWidth;
          const height = canvas.clientHeight;
          context.clearRect(0, 0, width, height);
          particles = particles.filter((particle) => particle.y < height + 20);
          for (const particle of particles) {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.13;
            particle.vx *= 0.992;
            particle.rotation += particle.spin;
            context.save();
            context.translate(particle.x, particle.y);
            context.rotate(particle.rotation);
            context.fillStyle = particle.color;
            context.globalAlpha = Math.max(0, 1 - particle.y / (height + 20));
            context.fillRect(
              -particle.size / 2,
              -particle.size / 2,
              particle.size,
              particle.size * 1.8,
            );
            context.restore();
          }
          if (particles.length) frame = window.requestAnimationFrame(draw);
          else context.clearRect(0, 0, width, height);
        };
        frame = window.requestAnimationFrame(draw);
        observer.disconnect();
      },
      { threshold: 0.2 },
    );
    observer.observe(canvas);
    window.addEventListener("resize", resize, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full"
    />
  );
}
