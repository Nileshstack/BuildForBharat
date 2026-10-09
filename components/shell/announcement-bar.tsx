"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Clock3 } from "lucide-react";
import { event, REGISTER_URL } from "@/data/event";
import { formatIst, useNow } from "@/hooks/use-now";
import {
  getRegistrationStatus,
  type RegistrationStatus,
} from "@/lib/registration";

function getAnnouncements(
  now: Date | null,
  registrationStatus: RegistrationStatus,
): string[] {
  const registrationMessage = registrationStatus.isOpen
    ? registrationStatus.daysLeft === null
      ? "Registrations open on Unstop"
      : `Registrations open · ${registrationStatus.daysLeft} ${
          registrationStatus.daysLeft === 1 ? "day" : "days"
        } left`
    : registrationStatus.label;
  if (!now) return [registrationMessage];

  const timestamp = now.getTime();
  const eventStarts = Date.parse(event.dates.start);
  const eventEnds = Date.parse(event.dates.end);
  const startsInDays = Math.ceil(
    (eventStarts - timestamp) / (24 * 60 * 60 * 1000),
  );

  if (timestamp >= eventEnds) return [registrationMessage, "Event completed"];
  if (timestamp >= eventStarts) {
    let currentItemLabel: string | undefined;
    for (const day of event.daySchedule) {
      for (const item of day.items) {
        if (
          timestamp >= Date.parse(item.start) &&
          (item.end === null || timestamp < Date.parse(item.end))
        ) {
          currentItemLabel = item.label;
          break;
        }
      }
      if (currentItemLabel) break;
    }
    return [
      registrationMessage,
      `Now happening: ${currentItemLabel ?? event.name}`,
    ];
  }

  return [
    registrationMessage,
    `Event starts in ${Math.max(0, startsInDays)} ${startsInDays === 1 ? "day" : "days"}`,
  ];
}

export function AnnouncementBar() {
  const now = useNow();
  const registrationStatus = getRegistrationStatus(now);
  const reducedMotion = useReducedMotion();
  const announcements = getAnnouncements(now, registrationStatus);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (announcements.length < 2) return;
    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % announcements.length);
    }, 4800);
    return () => window.clearInterval(interval);
  }, [announcements.length]);

  const message = announcements[activeIndex % announcements.length];

  return (
    <div className="relative z-40 flex min-h-9 items-center justify-center gap-2 bg-navy px-4 py-1.5 text-center text-xs font-medium text-white sm:text-sm">
      <Clock3 aria-hidden="true" size={14} className="shrink-0 text-saffron" />
      <div className="min-w-0 overflow-hidden" aria-live="off">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={message}
            initial={reducedMotion ? false : { opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -7 }}
            transition={{ duration: reducedMotion ? 0 : 0.22 }}
            className="truncate"
          >
            {registrationStatus.isOpen ? (
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-saffron focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron"
              >
                {message}
              </a>
            ) : (
              message
            )}
          </motion.p>
        </AnimatePresence>
      </div>
      <span
        className="hidden shrink-0 text-white/55 sm:inline"
        aria-label="Indian Standard Time"
      >
        {now
          ? `${formatIst(now, { hour: "2-digit", minute: "2-digit", second: "2-digit" })} IST`
          : "IST"}
      </span>
    </div>
  );
}
