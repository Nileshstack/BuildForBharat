"use client";

import { useEffect, useState } from "react";
import { event } from "@/data/event";
import { useNow } from "@/hooks/use-now";

type Simulation = { target: number; startedAt: number };

function parseSimulation(value: string | null): number | null {
  if (!value) return null;
  const normalized = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)
    ? `${value}:00+05:30`
    : value;
  const timestamp = Date.parse(normalized);
  return Number.isFinite(timestamp) ? timestamp : null;
}

export function useEventClock(): Date | null {
  const now = useNow();
  const [simulation, setSimulation] = useState<Simulation | null>(null);

  useEffect(() => {
    const readSimulation = () => {
      if (process.env.NODE_ENV !== "development") {
        setSimulation(null);
        return;
      }
      const target = parseSimulation(
        new URLSearchParams(window.location.search).get("simulate"),
      );
      setSimulation(target === null ? null : { target, startedAt: Date.now() });
    };

    readSimulation();
    window.addEventListener("popstate", readSimulation);
    return () => window.removeEventListener("popstate", readSimulation);
  }, []);

  if (!now) return null;
  if (!simulation) return now;
  return new Date(simulation.target + Math.max(0, now.getTime() - simulation.startedAt));
}

function timeOf(day: string, label: string): number | null {
  const item = event.daySchedule
    .find((scheduleDay) => scheduleDay.day === day)
    ?.items.find((scheduleItem) => scheduleItem.label === label);
  return item ? Date.parse(item.start) : null;
}

export function getEventSkyProgress(now: Date | null): number {
  if (!now) return 0;
  const timestamp = now.getTime();
  const eventStart = Date.parse(event.dates.start);
  if (timestamp < eventStart) return 0;

  const dayOneDusk = timeOf("Day 1", "Round 1 Evaluation") ?? eventStart;
  const nightArc = event.daySchedule
    .find((day) => day.day === "Day 1")
    ?.items.find((item) => item.type === "night");
  const nightStart = nightArc ? Date.parse(nightArc.start) : eventStart;
  const morning = timeOf("Day 2", "Breakfast") ?? eventStart;
  const dayTwoEnd = Date.parse(event.dates.end);

  if (timestamp < dayOneDusk) {
    return 0.34 * ((timestamp - eventStart) / Math.max(1, dayOneDusk - eventStart));
  }
  if (timestamp < nightStart) {
    return 0.34 + 0.56 * ((timestamp - dayOneDusk) / Math.max(1, nightStart - dayOneDusk));
  }
  if (timestamp < morning) {
    return 0.9 + 0.1 * ((timestamp - nightStart) / Math.max(1, morning - nightStart));
  }
  if (timestamp < dayTwoEnd) {
    return 0.04 + 0.3 * ((timestamp - morning) / Math.max(1, dayTwoEnd - morning));
  }
  return 0.04;
}