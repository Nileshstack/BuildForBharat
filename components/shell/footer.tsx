import Link from "next/link";
import { RegisterButton } from "@/components/shared/register-button";
import { event } from "@/data/event";
import { navigationItems } from "./navigation";

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-10 border-t border-navy/10 bg-white/65 pb-20 backdrop-blur-sm md:pb-0"
    >
      <div className="tricolour-divider" />
      <div className="mx-auto grid max-w-7xl gap-9 px-5 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.25fr_1fr_1fr_auto] lg:items-start">
        <div>
          <Link
            href="/#home"
            className="font-heading text-base font-bold text-navy"
          >
            BUILD FOR <span className="tricolour-text">BHARAT</span> 2026
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-6 text-navy/65">
            {event.tagline}
          </p>
          <ul className="mt-4 space-y-1.5 text-sm text-navy/70">
            {event.organisers.map((organiser) => (
              <li key={organiser}>{organiser}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-heading text-xs font-semibold uppercase tracking-wider text-navy">
            Explore
          </h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-navy/70">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <Link
                  className="hover:text-saffron focus-visible:outline-saffron"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-heading text-xs font-semibold uppercase tracking-wider text-navy">
            Venue
          </h2>
          <p className="mt-3 max-w-xs text-sm leading-6 text-navy/70">
            {event.venue}
            <br />
            {event.organisers[1]}
          </p>
        </div>
        <div className="lg:justify-self-end">
          <RegisterButton className="w-full sm:w-auto" />
        </div>
      </div>
      <div className="border-t border-navy/10 px-5 py-4 text-center text-xs text-navy/50">
        {event.name} · {event.dates.display}
      </div>
    </footer>
  );
}
