import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "/rules",
  "Rules & Deliverables",
  "Review eligibility, team size, potential deliverables, finale presentation expectations, and design principles.",
);

export default function RulesLayout({ children }: { children: ReactNode }) {
  return children;
}
