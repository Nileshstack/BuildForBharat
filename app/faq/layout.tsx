import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "/faq",
  "Frequently Asked Questions",
  "Find answers about eligibility, team size, submissions, venue, and judging for Build for Bharat 2026.",
);

export default function FAQLayout({ children }: { children: ReactNode }) {
  return children;
}
