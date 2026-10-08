"use client";

import type { CSSProperties } from "react";
import { useCursor } from "@/hooks/use-cursor";
import {
  useScrollProgress,
  useScrollVelocity,
} from "@/hooks/use-scroll-velocity";

export function AuroraBlobs() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <span
        className="absolute left-[-18%] top-[-24%] h-[56vw] w-[56vw] min-h-75 min-w-75 rounded-full blur-[90px] animate-[aurora-drift-one_25s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(ellipse at 38% 42%, rgb(255 122 26 / 0.24), rgb(255 122 26 / 0.07) 42%, transparent 72%)",
        }}
      />
      <span
        className="absolute right-[-16%] top-[14%] h-[52vw] w-[52vw] min-h-70 min-w-70 rounded-full blur-[100px] animate-[aurora-drift-two_31s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(ellipse at 62% 42%, rgb(22 163 74 / 0.2), rgb(22 163 74 / 0.06) 44%, transparent 72%)",
        }}
      />
      <span
        className="absolute bottom-[-34%] left-[24%] h-[50vw] w-[50vw] min-h-70 min-w-70 rounded-full blur-[100px] animate-[aurora-drift-three_28s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, rgb(100 199 255 / 0.24), rgb(100 199 255 / 0.06) 44%, transparent 72%)",
        }}
      />
    </div>
  );
}

export function ChakraWatermark() {
  const velocity = useScrollVelocity();
  const progress = useScrollProgress();
  const duration = Math.max(18, 48 - Math.min(velocity / 40, 30));

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 500 500"
      className="pointer-events-none absolute -right-72 top-[4vh] w-[min(80vw,760px)] opacity-[0.045]"
      style={{
        transform: `translate3d(0, ${progress * -90}px, 0)`,
        animation: `chakra-spin ${duration}s linear infinite`,
      }}
    >
      <circle
        cx="250"
        cy="250"
        r="220"
        fill="none"
        stroke="#0B1B3A"
        strokeWidth="7"
      />
      <circle
        cx="250"
        cy="250"
        r="25"
        fill="none"
        stroke="#0B1B3A"
        strokeWidth="6"
      />
      {Array.from({ length: 24 }, (_, index) => {
        const angle = (index * 15 * Math.PI) / 180;
        const inner = 27;
        const outer = index % 3 === 0 ? 215 : 210;
        const round = (value: number) => Math.round(value * 1000) / 1000;
        return (
          <line
            key={index}
            x1={round(250 + Math.cos(angle) * inner)}
            y1={round(250 + Math.sin(angle) * inner)}
            x2={round(250 + Math.cos(angle) * outer)}
            y2={round(250 + Math.sin(angle) * outer)}
            stroke="#0B1B3A"
            strokeWidth="3"
          />
        );
      })}
    </svg>
  );
}

export function TricolourRibbon() {
  const progress = useScrollProgress();
  const style = {
    transform: `translate3d(0, ${progress * -54}px, 0)`,
  } as CSSProperties;
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 260"
      preserveAspectRatio="none"
      className="pointer-events-none absolute bottom-0 h-44 w-full opacity-30 animate-[ribbon-flow_18s_ease-in-out_infinite]"
      style={style}
    >
      <path
        d="M0 120 C240 25 420 220 720 110 S1200 35 1440 130 V260 H0Z"
        fill="#FF7A1A"
        fillOpacity=".22"
      />
      <path
        d="M0 150 C260 65 470 230 760 145 S1180 80 1440 160 V260 H0Z"
        fill="#FFFFFF"
        fillOpacity=".85"
      />
      <path
        d="M0 178 C220 95 500 250 790 178 S1210 105 1440 190 V260 H0Z"
        fill="#16A34A"
        fillOpacity=".2"
      />
    </svg>
  );
}

function colorAt(progress: number, palette: string[]): string {
  const position = progress * (palette.length - 1);
  const index = Math.min(Math.floor(position), palette.length - 2);
  const amount = position - index;
  const start = palette[index]
    .match(/[\da-f]{2}/gi)
    ?.map((part) => parseInt(part, 16)) ?? [255, 255, 255];
  const end =
    palette[index + 1]
      .match(/[\da-f]{2}/gi)
      ?.map((part) => parseInt(part, 16)) ?? start;
  return `rgb(${start.map((channel, channelIndex) => Math.round(channel + ((end[channelIndex] ?? channel) - channel) * amount)).join(",")})`;
}

export function SkyProgress({ progress }: { progress: number }) {
  const value = Math.min(1, Math.max(0, progress));
  const upper = colorAt(value, ["#ffd9a8", "#bfe9ff", "#ffb781", "#101c3d"]);
  const lower = colorAt(value, ["#fff8ee", "#f8fdff", "#ffe5d1", "#25355d"]);
  const nightOpacity = value >= 0.9 ? 0.25 + 0.75 * ((value - 0.9) / 0.1) : 0;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 transition-[background] duration-700"
      style={{ background: `linear-gradient(155deg, ${upper}, ${lower})` }}
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(255,255,255,.85)_0_1px,transparent_1.5px),radial-gradient(circle_at_64%_30%,rgba(255,255,255,.8)_0_1px,transparent_1.5px),radial-gradient(circle_at_86%_16%,rgba(255,255,255,.8)_0_1px,transparent_1.5px),radial-gradient(circle_at_34%_52%,rgba(255,255,255,.8)_0_1px,transparent_1.5px)] bg-size-[170px_150px] animate-[star-twinkle_3s_ease-in-out_infinite]"
        style={{ opacity: nightOpacity }}
      />
    </div>
  );
}

export function GridSpotlight() {
  const cursor = useCursor();
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-35"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(11,27,58,.13) 1px, transparent 1.2px), radial-gradient(380px circle at ${cursor.x}px ${cursor.y}px, rgba(255,255,255,.72), transparent 72%)`,
        backgroundSize: "24px 24px, auto",
      }}
    />
  );
}
