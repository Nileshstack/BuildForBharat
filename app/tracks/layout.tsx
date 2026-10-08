import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "/tracks",
  "Tracks",
  "Explore the Software and Hardware tracks, innovation areas, AI and machine learning ideas, and optional technology guidance.",
);

export default function TracksLayout({ children }: { children: ReactNode }) {
  return children;
}
