import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const pages = ["/", "/tracks", "/prizes", "/schedule", "/rules", "/faq", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency: path === "/schedule" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}