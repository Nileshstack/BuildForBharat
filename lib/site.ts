import type { Metadata } from "next";
import { event } from "@/data/event";

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000",
);

export function pageMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title: `${title} | ${event.name}`,
      description,
      images: [{ url: "/images/poster.png", width: 1000, height: 1250, alt: "Build for Bharat 2026 event poster" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${event.name}`,
      description,
      images: ["/images/poster.png"],
    },
  };
}