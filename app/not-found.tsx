import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";

export default function NotFound() {
  return (
    <main className="relative z-10 mx-auto flex min-h-[68svh] max-w-7xl items-center px-5 py-16 sm:px-8">
      <div className="max-w-2xl">
        <span className="grid size-12 place-items-center rounded-md bg-saffron/10 text-saffron">
          <Compass aria-hidden="true" size={23} />
        </span>
        <p className="mt-6 font-heading text-xs font-semibold uppercase tracking-[0.17em] text-saffron">
          404 · Page not found
        </p>
        <SectionHeading
          as="h1"
          title="This page isn’t on the map."
          description="The address may have changed, or the page may not be published yet."
          headingClassName="mt-3 text-4xl sm:text-5xl"
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/#home"
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-navy px-5 py-2.5 font-heading text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-saffron"
          >
            <ArrowLeft aria-hidden="true" size={16} />
            Back to home
          </Link>
          <Link
            href="/schedule"
            className="inline-flex min-h-11 items-center rounded-md border border-navy/15 bg-white/70 px-5 py-2.5 font-heading text-sm font-semibold text-navy hover:bg-white"
          >
            View schedule
          </Link>
        </div>
      </div>
    </main>
  );
}
