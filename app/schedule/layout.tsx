import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "/schedule",
  "Schedule",
  "Follow the live IST timeline for the Build for Bharat 2026 stages, event days, speaker sessions, and finale.",
);

export default function ScheduleLayout({ children }: { children: ReactNode }) {
  return children;
}
