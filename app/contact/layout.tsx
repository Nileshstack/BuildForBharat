import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "/contact",
  "Contact & Venue",
  "Find the Build for Bharat 2026 venue at KIET Deemed to be University, Ghaziabad, and organizer contact details.",
);

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
