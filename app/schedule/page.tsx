"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownToLine,
  BedDouble,
  Clock3,
  Coffee,
  PartyPopper,
  Presentation,
  Rocket,
  Sparkles,
  Timer,
} from "lucide-react";
import { RegisterButton } from "@/components/shared/register-button";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { event, type ScheduleType } from "@/data/event";
import { formatIst } from "@/hooks/use-now";
import { useEventClock } from "@/hooks/use-event-clock";

type ScheduleView = "stages" | "day1" | "day2";
type ScheduleItem = (typeof event.daySchedule)[number]["items"][number];

const scheduleDayLabel = (date: string) =>
  new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
  }).format(new Date(`${date}T12:00:00+05:30`));

const views: Array<{ id: ScheduleView; label: string }> = [
  { id: "stages", label: "Stages" },
  ...event.daySchedule.map((day, index) => ({
    id: index === 0 ? ("day1" as const) : ("day2" as const),
    label: `${day.day}: ${scheduleDayLabel(day.date)}`,
  })),
];

const typeStyles: Record<
  ScheduleType,
  { icon: typeof Clock3; color: string; tint: string; label: string }
> = {
  ceremony: {
    icon: Presentation,
    color: "#0B1B3A",
    tint: "#EAF0F9",
    label: "Ceremony",
  },
  build: { icon: Rocket, color: "#D96813", tint: "#FFF0E4", label: "Build" },
  break: { icon: Coffee, color: "#3B7394", tint: "#EAF5FA", label: "Break" },
  eval: { icon: Timer, color: "#168044", tint: "#EAF7EF", label: "Evaluation" },
  fun: { icon: PartyPopper, color: "#A15D14", tint: "#FFF5E7", label: "Fun" },
  night: { icon: BedDouble, color: "#4D5C85", tint: "#EEF0F8", label: "Night" },
};

function formatDateTime(value: string) {
  return formatIst(new Date(value), {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

function timeRange(start: string, end: string | null) {
  const startTime = formatIst(new Date(start), {
    hour: "numeric",
    minute: "2-digit",
  });
  if (!end) return `${startTime} onwards`;
  const endTime = formatIst(new Date(end), {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${startTime} – ${endTime}`;
}

function stageState(now: Date | null, start: string, end: string) {
  if (!now || now.getTime() < Date.parse(start)) return "Upcoming" as const;
  if (now.getTime() < Date.parse(end)) return "Live" as const;
  return "Completed" as const;
}

function miniCountdown(now: Date | null, start: string, end: string) {
  if (!now) return "Loading time…";
  const timestamp = now.getTime();
  const startAt = Date.parse(start);
  const endAt = Date.parse(end);
  if (timestamp >= endAt) return "Stage completed";
  const target = timestamp < startAt ? startAt : endAt;
  const remaining = target - timestamp;
  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining / 3_600_000) % 24);
  const minutes = Math.floor((remaining / 60_000) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);
  const formatted =
    days > 0
      ? `${days}d ${hours}h ${minutes}m`
      : `${hours}h ${minutes}m ${seconds}s`;
  return `${timestamp < startAt ? "Starts in" : "Ends in"} ${formatted}`;
}

function isCurrentItem(now: Date | null, item: ScheduleItem) {
  if (!now) return false;
  const timestamp = now.getTime();
  const start = Date.parse(item.start);
  if (item.end && Date.parse(item.end) === start)
    return timestamp >= start && timestamp < start + 60_000;
  return (
    timestamp >= start &&
    (item.end === null || timestamp < Date.parse(item.end))
  );
}

function currentItemFor(
  now: Date | null,
): { day: "Day 1" | "Day 2"; item: ScheduleItem } | null {
  if (!now) return null;
  const matches = event.daySchedule.flatMap((day) =>
    day.items
      .filter((item) => isCurrentItem(now, item))
      .map((item) => ({ day: day.day as "Day 1" | "Day 2", item })),
  );
  matches.sort(
    (first, second) =>
      Date.parse(second.item.start) - Date.parse(first.item.start),
  );
  return matches[0] ?? null;
}

function icsDate(value: string) {
  return new Date(value)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
}

function escapeIcs(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function downloadCalendar() {
  const events = [
    {
      id: "build-for-bharat-main",
      title: event.name,
      description: `${event.tagline} ${event.subtitle}`,
      start: event.dates.start,
      end: event.dates.end,
    },
    ...event.stages.map((stage, index) => ({
      id: `build-for-bharat-stage-${index + 1}`,
      title: stage.name,
      description: stage.description,
      start: stage.start,
      end: stage.end,
    })),
    ...event.daySchedule.flatMap((day) =>
      day.items
        .filter(
          (item): item is ScheduleItem & { end: string } =>
            item.end !== null && Date.parse(item.end) > Date.parse(item.start),
        )
        .map((item, index) => ({
          id: `${day.date}-${index}`,
          title: item.label,
          description: `${day.day} schedule · ${typeStyles[item.type].label}`,
          start: item.start,
          end: item.end,
        })),
    ),
  ];
  const calendar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Build for Bharat 2026//Schedule//EN",
    "CALSCALE:GREGORIAN",
    ...events.flatMap((item) => [
      "BEGIN:VEVENT",
      `UID:${item.id}@buildforbharat2026.in`,
      `DTSTAMP:${icsDate(new Date().toISOString())}`,
      `DTSTART:${icsDate(item.start)}`,
      `DTEND:${icsDate(item.end)}`,
      `SUMMARY:${escapeIcs(item.title)}`,
      `DESCRIPTION:${escapeIcs(item.description)}`,
      `LOCATION:${escapeIcs(`${event.venue}, ${event.location}`)}`,
      "END:VEVENT",
    ]),
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([calendar], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "build-for-bharat-2026.ics";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

function StatusBadge({
  status,
}: {
  status: "Upcoming" | "Live" | "Completed";
}) {
  const styles =
    status === "Live"
      ? "border-india-green/20 bg-india-green/8 text-india-green"
      : status === "Completed"
        ? "border-navy/10 bg-navy/5 text-navy/50"
        : "border-saffron/20 bg-saffron/8 text-[#bc570f]";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider ${styles}`}
    >
      <span
        className={`size-1.5 rounded-full ${status === "Live" ? "animate-pulse bg-india-green" : status === "Completed" ? "bg-navy/30" : "bg-saffron"}`}
      />
      {status}
    </span>
  );
}

function StageTimeline({ now }: { now: Date | null }) {
  const reducedMotion = useReducedMotion();
  const stageRefs = useRef<Array<HTMLElement | null>>([]);
  const states = event.stages.map((stage) =>
    stageState(now, stage.start, stage.end),
  );
  const activeIndex = states.findIndex((status) => status === "Live");
  const completedCount = states.filter(
    (status) => status === "Completed",
  ).length;
  const fillPercent =
    activeIndex >= 0
      ? ((activeIndex + 0.55) / event.stages.length) * 100
      : (completedCount / event.stages.length) * 100;

  useEffect(() => {
    if (activeIndex < 0) return;
    stageRefs.current[activeIndex]?.scrollIntoView({
      behavior: reducedMotion ? "instant" : "smooth",
      block: "center",
    });
  }, [activeIndex, reducedMotion]);

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-4.75 top-8 w-1 rounded-full bg-navy/8"
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-4.75 top-8 w-1 origin-top rounded-full bg-[linear-gradient(180deg,#FF7A1A,#FFFFFF_50%,#16A34A)]"
        initial={{ height: 0 }}
        animate={{ height: `${fillPercent}%` }}
        transition={{ duration: reducedMotion ? 0 : 0.7 }}
      />
      <ol className="relative space-y-5">
        {event.stages.map((stage, index) => {
          const status = states[index];
          return (
            <li key={stage.name}>
              <article
                ref={(element) => {
                  stageRefs.current[index] = element;
                }}
                className="relative grid gap-4 pl-12 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-7 sm:pl-14"
              >
                <span
                  aria-hidden="true"
                  className={`absolute left-2.75 top-6 z-10 size-4.5 rounded-full border-1.25 border-white shadow-sm ${status === "Live" ? "bg-india-green ring-4 ring-india-green/15" : status === "Completed" ? "bg-india-green" : "bg-saffron"}`}
                />
                <SpotlightStageCard>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-tagline text-sm italic text-saffron">
                      Stage 0{index + 1}
                    </span>
                    <StatusBadge status={status} />
                  </div>
                  <h2 className="mt-3 font-heading text-xl font-semibold text-navy sm:text-2xl">
                    {stage.name}
                  </h2>
                  <p className="mt-2 text-xs font-medium text-navy/55">
                    {formatDateTime(stage.start)} – {formatDateTime(stage.end)}{" "}
                    IST
                  </p>
                  <p className="mt-4 text-sm leading-6 text-navy/70">
                    {stage.description}
                  </p>
                  {stage.evaluationCriteria ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {stage.evaluationCriteria.map((criterion) => (
                        <li
                          key={criterion}
                          className="rounded-sm bg-navy/5 px-2.5 py-1.5 text-xs text-navy/65"
                        >
                          {criterion}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </SpotlightStageCard>
                <div className="flex items-center gap-2 self-start rounded-md border border-navy/8 bg-white/65 px-3 py-2 text-xs font-medium tabular-nums text-navy/65 sm:mt-1">
                  <Clock3
                    aria-hidden="true"
                    size={14}
                    className="text-saffron"
                  />
                  {miniCountdown(now, stage.start, stage.end)}
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function SpotlightStageCard({ children }: { children: React.ReactNode }) {
  return <div className="glass-card rounded-lg p-5 sm:p-7">{children}</div>;
}

function Ring({ progress }: { progress: number }) {
  const circumference = 2 * Math.PI * 15;
  return (
    <svg aria-hidden="true" viewBox="0 0 36 36" className="size-11 -rotate-90">
      <circle
        cx="18"
        cy="18"
        r="15"
        fill="none"
        stroke="rgb(22 163 74 / .16)"
        strokeWidth="3"
      />
      <circle
        cx="18"
        cy="18"
        r="15"
        fill="none"
        stroke="#16A34A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - progress)}
        className="transition-[stroke-dashoffset] duration-1000"
      />
    </svg>
  );
}

function SpeakerNodes({ phase }: { phase: string }) {
  const sessions = event.speakerSessions.filter(
    (session) => session.phase === phase,
  );
  if (!sessions.length) return null;
  return (
    <li className="relative ml-12 border-l border-dashed border-saffron/40 py-3 pl-5 sm:ml-14">
      <span
        className="absolute -left-1.25 top-5 size-2 rounded-full bg-saffron"
        aria-hidden="true"
      />
      <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-saffron">
        <Sparkles aria-hidden="true" size={13} />
        Speaker sessions · {phase}
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {sessions.map((session) => (
          <div
            key={session.title}
            className="rounded-md border border-saffron/15 bg-white/65 px-4 py-3"
          >
            <p className="text-xs font-medium leading-5 text-navy/80">
              {session.title}
            </p>
          </div>
        ))}
      </div>
    </li>
  );
}

function NowMarker({ item, now }: { item: ScheduleItem; now: Date }) {
  const start = Date.parse(item.start);
  const end = item.end ? Date.parse(item.end) : start + 60_000;
  const progress = Math.max(
    0,
    Math.min(1, (now.getTime() - start) / Math.max(1, end - start)),
  );
  return (
    <div className="flex items-center gap-2 rounded-full border border-india-green/20 bg-white/90 py-1 pl-1 pr-3 text-[10px] font-bold uppercase tracking-wider text-india-green shadow-[0_0_26px_rgba(22,163,74,0.16)]">
      <span className="relative grid size-11 place-items-center">
        <Ring progress={progress} />
        <span className="absolute size-2.5 animate-pulse rounded-full bg-india-green" />
      </span>
      NOW
    </div>
  );
}

function DayTimeline({
  viewToken,
  dayName,
  now,
  current,
  itemRefs,
  onCurrentVisibility,
}: {
  viewToken: ScheduleView;
  dayName: "Day 1" | "Day 2";
  now: Date | null;
  current: { day: "Day 1" | "Day 2"; item: ScheduleItem } | null;
  itemRefs: React.MutableRefObject<Map<string, HTMLElement>>;
  onCurrentVisibility: (itemKey: string | null) => void;
}) {
  const day = event.daySchedule.find(
    (scheduleDay) => scheduleDay.day === dayName,
  );
  if (!day) return null;

  const nodeKey = (item: ScheduleItem) =>
    `${dayName}:${item.start}:${item.label}`;
  const renderedItems = day.items;

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute bottom-5 left-4.25 top-5 w-px bg-navy/15"
      />
      <ol className="relative space-y-3">
        {renderedItems.map((item) => {
          const isNow =
            current?.day === dayName &&
            current.item.label === item.label &&
            current.item.start === item.start;
          const isPast =
            !!now &&
            !!item.end &&
            now.getTime() >= Date.parse(item.end) &&
            !isNow;
          const style = typeStyles[item.type];
          const Icon = style.icon;
          const beforeResults = item.label.includes("Round 1 Results");
          const isInauguration = item.label.startsWith("Inauguration");
          return (
            <Fragment key={nodeKey(item)}>
              {isInauguration ? <SpeakerNodes phase="Inauguration" /> : null}
              {beforeResults ? <SpeakerNodes phase="Before results" /> : null}
              <li>
                <article
                  ref={(element) => {
                    const key = nodeKey(item);
                    if (element) itemRefs.current.set(key, element);
                    else itemRefs.current.delete(key);
                  }}
                  data-current-item={isNow ? "true" : undefined}
                  onFocusCapture={() => {
                    if (isNow)
                      onCurrentVisibility(`${viewToken}|${nodeKey(item)}`);
                  }}
                  className={`relative grid grid-cols-[36px_minmax(0,1fr)] gap-3 pl-1 transition-opacity sm:grid-cols-[36px_minmax(0,1fr)_auto] sm:items-start sm:gap-4 ${isPast ? "opacity-45" : "opacity-100"}`}
                >
                  <span
                    className="relative z-10 mt-4 grid size-8 place-items-center rounded-full border-2 border-white shadow-sm"
                    style={{ color: style.color, backgroundColor: style.tint }}
                  >
                    {isPast ? (
                      <span
                        className="size-2 rounded-full"
                        style={{ backgroundColor: style.color }}
                      />
                    ) : (
                      <Icon aria-hidden="true" size={15} />
                    )}
                  </span>
                  <div
                    className={`rounded-lg border bg-white/75 p-4 sm:p-5 ${isNow ? "border-india-green/30 shadow-[0_10px_35px_rgba(22,163,74,0.10)]" : "border-navy/8"}`}
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span
                        className="font-heading text-xs font-semibold tabular-nums"
                        style={{ color: style.color }}
                      >
                        {timeRange(item.start, item.end)}
                      </span>
                      <span
                        className="rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider"
                        style={{
                          color: style.color,
                          backgroundColor: style.tint,
                        }}
                      >
                        {style.label}
                      </span>
                    </div>
                    <h3 className="mt-2 font-heading text-base font-semibold leading-6 text-navy">
                      {item.label}
                    </h3>
                    {isNow ? (
                      <p className="mt-2 text-xs text-navy/55">
                        In progress · started {formatDateTime(item.start)} IST
                      </p>
                    ) : null}
                  </div>
                  {isNow && now ? (
                    <div className="col-start-2 mt-1 sm:col-start-auto sm:mt-2">
                      <NowMarker item={item} now={now} />
                    </div>
                  ) : null}
                  {isNow ? (
                    <CurrentVisibility
                      itemKey={nodeKey(item)}
                      viewToken={viewToken}
                      itemRefs={itemRefs}
                      onChange={onCurrentVisibility}
                    />
                  ) : null}
                </article>
              </li>
            </Fragment>
          );
        })}
      </ol>
    </div>
  );
}

function CurrentVisibility({
  itemKey,
  viewToken,
  itemRefs,
  onChange,
}: {
  itemKey: string;
  viewToken: ScheduleView;
  itemRefs: React.MutableRefObject<Map<string, HTMLElement>>;
  onChange: (itemKey: string | null) => void;
}) {
  useEffect(() => {
    const element = itemRefs.current.get(itemKey);
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) =>
        onChange(entry.isIntersecting ? `${viewToken}|${itemKey}` : null),
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [itemKey, itemRefs, onChange, viewToken]);
  return null;
}

export default function SchedulePage() {
  const now = useEventClock();
  const reducedMotion = useReducedMotion();
  const [view, setView] = useState<ScheduleView>("stages");
  const [visibleNowItem, setVisibleNowItem] = useState<string | null>(null);
  const itemRefs = useRef(new Map<string, HTMLElement>());
  const current = useMemo(() => currentItemFor(now), [now]);
  const currentStage = event.stages.find(
    (stage) => stageState(now, stage.start, stage.end) === "Live",
  );
  const selectedDay =
    view === "day1" ? "Day 1" : view === "day2" ? "Day 2" : null;
  const selectedDayData = event.daySchedule.find(
    (day) => day.day === selectedDay,
  );
  const currentItemKey = current
    ? `${view}|${current.day}:${current.item.start}:${current.item.label}`
    : null;
  const showJump =
    !!selectedDay &&
    !!current &&
    (current.day !== selectedDay || visibleNowItem !== currentItemKey);

  const jumpToNow = () => {
    if (!current) return;
    const nextView = current.day === "Day 1" ? "day1" : "day2";
    setView(nextView);
    window.setTimeout(() => {
      itemRefs.current
        .get(`${current.day}:${current.item.start}:${current.item.label}`)
        ?.scrollIntoView({
          behavior: reducedMotion ? "instant" : "smooth",
          block: "center",
        });
    }, 80);
  };

  const currentStageIndex = currentStage
    ? event.stages.indexOf(currentStage)
    : -1;
  const completedStages = event.stages.filter(
    (stage) => stageState(now, stage.start, stage.end) === "Completed",
  ).length;
  const timelineAnnouncement = current
    ? `Now happening: ${current.item.label}`
    : currentStage
      ? `Current stage: ${currentStage.name}`
      : "No event activity is currently live";

  return (
    <main id="schedule" className="relative z-10">
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-20">
        <Reveal>
          <p className="mb-4 font-heading text-xs font-semibold uppercase tracking-[0.17em] text-saffron">
            Thirty hours, one shared timeline
          </p>
          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              as="h1"
              title="Follow the journey."
              description="Every milestone, build session, and moment to take a breath, shown in Indian Standard Time."
              headingClassName="text-4xl sm:text-5xl lg:text-6xl"
            />
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={downloadCalendar}
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-navy/15 bg-white/75 px-4 py-2.5 text-sm font-semibold text-navy transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron"
              >
                <ArrowDownToLine aria-hidden="true" size={16} />
                Add to calendar
              </button>
              <RegisterButton />
            </div>
          </div>
          <p className="sr-only" aria-live="polite">
            {timelineAnnouncement}
          </p>
        </Reveal>

        <div className="mt-9 flex flex-col gap-4 border-b border-navy/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="tablist"
            aria-label="Schedule views"
            className="flex w-fit max-w-full gap-1 overflow-x-auto rounded-md border border-navy/10 bg-white/65 p-1"
          >
            {views.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={view === tab.id}
                onClick={() => setView(tab.id)}
                className={`relative min-h-10 shrink-0 rounded px-3.5 text-xs font-semibold sm:px-4 sm:text-sm ${view === tab.id ? "text-white" : "text-navy/65 hover:text-navy"}`}
              >
                {view === tab.id ? (
                  <motion.span
                    layoutId="schedule-view-active"
                    className="absolute inset-0 rounded bg-navy"
                    transition={{ duration: reducedMotion ? 0 : 0.2 }}
                  />
                ) : null}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
          <p className="flex items-center gap-2 text-xs font-medium text-navy/55">
            <span className="size-2 animate-pulse rounded-full bg-india-green" />
            Live event clock · IST
          </p>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {view === "stages" ? (
            <motion.section
              key="stages"
              role="tabpanel"
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              className="mx-auto max-w-5xl py-8"
            >
              <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-heading text-xs font-semibold uppercase tracking-wider text-saffron">
                    {completedStages} of {event.stages.length} complete
                  </p>
                  <h2 className="mt-1 font-heading text-2xl font-semibold text-navy">
                    Competition stages
                  </h2>
                </div>
                <p className="text-xs text-navy/55">
                  Stage{" "}
                  {currentStageIndex >= 0
                    ? currentStageIndex + 1
                    : Math.min(completedStages + 1, event.stages.length)}{" "}
                  of {event.stages.length}
                </p>
              </div>
              <StageTimeline now={now} />
            </motion.section>
          ) : (
            <motion.section
              key={view}
              role="tabpanel"
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              className="mx-auto max-w-5xl py-8"
            >
              {selectedDay ? (
                <>
                  <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="font-heading text-xs font-semibold uppercase tracking-wider text-saffron">
                        {selectedDayData
                          ? formatIst(
                              new Date(
                                `${selectedDayData.date}T12:00:00+05:30`,
                              ),
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              },
                            )
                          : selectedDay}
                      </p>
                      <h2 className="mt-1 font-heading text-2xl font-semibold text-navy">
                        {selectedDay === "Day 1"
                          ? "Kick-off, build & shortlist"
                          : "Night arc, finale & awards"}
                      </h2>
                    </div>
                    <p className="text-xs text-navy/55">
                      All times IST · {event.venue}
                    </p>
                  </div>
                  <DayTimeline
                    viewToken={view}
                    dayName={selectedDay}
                    now={now}
                    current={current}
                    itemRefs={itemRefs}
                    onCurrentVisibility={setVisibleNowItem}
                  />
                </>
              ) : null}
            </motion.section>
          )}
        </AnimatePresence>
      </section>

      {showJump ? (
        <button
          type="button"
          onClick={jumpToNow}
          className="fixed bottom-24 right-4 z-30 inline-flex min-h-11 items-center gap-2 rounded-full border border-india-green/20 bg-white px-4 py-2 text-xs font-semibold text-india-green shadow-[0_8px_28px_rgba(11,27,58,0.14)] transition hover:bg-india-green/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-india-green md:bottom-7 md:right-7"
        >
          <ArrowDownToLine aria-hidden="true" size={15} />
          Jump to now
        </button>
      ) : null}

      <section className="border-t border-navy/10 bg-white/50 px-5 py-10 backdrop-blur-sm sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl font-tagline text-lg italic leading-7 text-navy/70">
            {event.closingQuote}
          </p>
          <RegisterButton />
        </div>
      </section>
    </main>
  );
}
