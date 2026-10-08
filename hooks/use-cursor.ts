"use client";

import { useEffect, useState } from "react";

export interface CursorPosition {
  x: number;
  y: number;
  active: boolean;
}

export function useCursor(): CursorPosition {
  const [cursor, setCursor] = useState<CursorPosition>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const update = (event: PointerEvent) => {
      setCursor({ x: event.clientX, y: event.clientY, active: true });
    };
    const leave = () => setCursor((current) => ({ ...current, active: false }));

    window.addEventListener("pointermove", update, { passive: true });
    window.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", update);
      window.removeEventListener("pointerleave", leave);
    };
  }, []);

  return cursor;
}