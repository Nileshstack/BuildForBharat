"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnnouncementBar } from "./announcement-bar";
import { Footer } from "./footer";
import { MobileRegisterBar } from "./mobile-register-bar";
import { Navbar } from "./navbar";
import { ScrollProgress } from "./scroll-progress";
import { DynamicBackground } from "@/components/background";
import { getEventSkyProgress, useEventClock } from "@/hooks/use-event-clock";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const eventNow = useEventClock();
  const backgroundVariant =
    pathname === "/tracks"
      ? "tracks"
      : pathname === "/prizes"
        ? "prizes"
        : pathname === "/schedule"
          ? "schedule"
          : pathname === "/"
            ? "home"
            : "calm";
  const backgroundProgress = getEventSkyProgress(eventNow);

  return (
    <>
      <DynamicBackground
        variant={backgroundVariant}
        progress={backgroundProgress}
      />
      <ScrollProgress />
      <AnnouncementBar />
      <Navbar />
      <div className="relative z-10 min-h-[55vh] pb-20 md:pb-0">{children}</div>
      <Footer />
      <MobileRegisterBar />
    </>
  );
}
