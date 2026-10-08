import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "/prizes",
  "Prizes & Judging",
  "Explore the per-track awards, participation certificates, and judging criteria for Build for Bharat 2026.",
);

export default function PrizesLayout({ children }: { children: ReactNode }) {
  return children;
}
