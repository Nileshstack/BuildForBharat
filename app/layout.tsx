import type { Metadata } from "next";
import { Inter, Playfair_Display, Poppins } from "next/font/google";
import { SiteShell } from "@/components/shell/site-shell";
import { event } from "@/data/event";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: event.name, template: `%s | ${event.name}` },
  description: event.tagline,
  openGraph: {
    type: "website",
    siteName: event.name,
    title: event.name,
    description: event.subtitle,
    images: [
      {
        url: "/images/poster.png",
        width: 1000,
        height: 1250,
        alt: `${event.name} event poster`,
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/images/poster.png"] },
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
