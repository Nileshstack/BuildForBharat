"use client";

import dynamic from "next/dynamic";
import { useScrollProgress } from "@/hooks/use-scroll-velocity";
import {
  AuroraBlobs,
  ChakraWatermark,
  GridSpotlight,
  SkyProgress,
  TricolourRibbon,
} from "./layers";

export type BackgroundVariant =
  | "home"
  | "tracks"
  | "schedule"
  | "prizes"
  | "calm";

const NetworkCanvas = dynamic(() => import("./network-canvas"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(255,122,26,0.08),transparent_48%),radial-gradient(ellipse_at_80%_75%,rgba(22,163,74,0.08),transparent_48%)]"
    />
  ),
});

export function DynamicBackground({
  variant,
  progress,
}: {
  variant: BackgroundVariant;
  progress?: number;
}) {
  const scrollProgress = useScrollProgress();
  const skyProgress = progress ?? scrollProgress;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[linear-gradient(145deg,#eaf7ff_0%,#fff_54%,#f0fff6_100%)]"
    >
      {variant === "schedule" || variant === "calm" ? (
        <SkyProgress progress={skyProgress} />
      ) : null}
      {variant !== "calm" ? <NetworkCanvas /> : null}
      {variant === "home" || variant === "tracks" || variant === "prizes" ? (
        <AuroraBlobs />
      ) : null}
      {variant !== "calm" ? <ChakraWatermark /> : null}
      {variant === "home" || variant === "schedule" || variant === "prizes" ? (
        <TricolourRibbon />
      ) : null}
      {variant === "home" || variant === "tracks" || variant === "prizes" ? (
        <GridSpotlight />
      ) : null}
    </div>
  );
}
