"use client";

import { useState, type PointerEvent, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

export function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  const [point, setPoint] = useState({
    x: "50%",
    y: "50%",
    rotateX: 0,
    rotateY: 0,
  });

  const trackPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    setPoint({
      x: `${x}px`,
      y: `${y}px`,
      rotateX: (y / bounds.height - 0.5) * -3,
      rotateY: (x / bounds.width - 0.5) * 3,
    });
  };

  const resetPointer = () =>
    setPoint({ x: "50%", y: "50%", rotateX: 0, rotateY: 0 });

  return (
    <div
      className={`glass-card spotlight-card relative overflow-hidden rounded-lg ${className}`}
      onPointerMove={trackPointer}
      onPointerLeave={resetPointer}
      style={{
        background: `radial-gradient(340px circle at ${point.x} ${point.y}, rgb(255 255 255 / 0.96), rgb(255 255 255 / 0.66) 70%)`,
        transform: reducedMotion
          ? undefined
          : `perspective(1200px) rotateX(${point.rotateX}deg) rotateY(${point.rotateY}deg)`,
        transition: reducedMotion ? "none" : "transform 180ms ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}
