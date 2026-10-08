import { ExternalLink, MapPin, UsersRound } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { event } from "@/data/event";

const venueOrganization = event.organisers[1].replace(/, [^,]+$/, "");
const venueAddress = `${event.venue}, ${venueOrganization}, ${event.location}`;
const mapQuery = encodeURIComponent(venueAddress.replace(/[()]/g, ""));
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;
const embedUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`;

export default function ContactPage() {
  return (
    <main className="relative z-10">
      <section className="mx-auto max-w-7xl px-5 pb-10 pt-14 sm:px-8 sm:pb-14 sm:pt-20">
        <SectionHeading
          as="h1"
          eyebrow="Find the venue and organizers"
          title="Get in touch."
          description={`The hackathon is an ${event.format.toLowerCase()} event in ${event.location}. Organizer contact links will be added when confirmed.`}
          headingClassName="text-4xl sm:text-5xl lg:text-6xl"
        />
      </section>

      <section
        aria-labelledby="venue-title"
        className="border-y border-navy/10 bg-white/50 px-5 py-10 backdrop-blur-sm sm:px-8 sm:py-14"
      >
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <SpotlightCard className="flex h-full flex-col p-6 sm:p-8">
            <span className="grid size-12 place-items-center rounded-md bg-saffron/10 text-saffron">
              <MapPin aria-hidden="true" size={23} />
            </span>
            <p className="mt-6 font-heading text-xs font-semibold uppercase tracking-wider text-saffron">
              Event venue
            </p>
            <h2
              id="venue-title"
              className="mt-2 font-heading text-2xl font-semibold text-navy"
            >
              {event.venue}
            </h2>
            <p className="mt-3 text-sm leading-6 text-navy/70">
              {venueOrganization}
              <br />
              {event.location}
            </p>
            <p className="mt-5 text-xs font-medium text-navy/50">
              {event.dates.display} · {event.format}
            </p>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 pt-8 font-heading text-sm font-semibold text-navy hover:text-saffron focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron"
            >
              Get directions <ExternalLink aria-hidden="true" size={15} />
            </a>
          </SpotlightCard>
          <div className="overflow-hidden rounded-lg border border-white/80 bg-white shadow-[0_16px_40px_rgba(11,27,58,0.08)]">
            <iframe
              title={`Map showing ${venueAddress}`}
              src={embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-82.5 w-full border-0 sm:h-105"
            />
          </div>
        </div>
      </section>

      <section
        id="organisers"
        aria-labelledby="organisers-title"
        className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20"
      >
        <div className="flex items-end justify-between gap-5">
          <SectionHeading
            eyebrow="Organized by"
            title="Meet the organizers."
            description="Contact and website details are placeholders until confirmed by the organizing teams."
          />
          <UsersRound
            aria-hidden="true"
            size={28}
            className="mb-1 hidden shrink-0 text-saffron sm:block"
          />
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {event.organiserCards.map((organiser, index) => (
            <SpotlightCard
              key={organiser.name}
              className="flex min-h-52 flex-col p-6 sm:p-7"
            >
              <p className="font-tagline text-sm italic text-saffron">
                Organizing team 0{index + 1}
              </p>
              <h3 className="mt-4 font-heading text-2xl font-semibold text-navy">
                {organiser.name}
              </h3>
              <p className="mt-2 text-sm text-navy/65">
                {organiser.description}
              </p>
              <p
                className="mt-auto pt-6 text-xs font-medium text-navy/45"
                aria-label={`${organiser.name}: ${organiser.linkLabel}`}
              >
                {organiser.linkLabel}
              </p>
            </SpotlightCard>
          ))}
        </div>
        <p className="mt-7 border-l-2 border-india-green/50 pl-4 text-sm leading-6 text-navy/65">
          {event.organisers[0]} · {event.organisers[1]}
        </p>
      </section>

      <section
        aria-labelledby="contact-points-title"
        className="border-t border-navy/10 bg-white/45 px-5 py-12 sm:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <h2
            id="contact-points-title"
            className="font-heading text-lg font-semibold text-navy"
          >
            Coordinator contacts
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {event.contacts.map((contact) => (
              <div
                key={contact.role}
                className="rounded-md border border-navy/10 bg-white/65 p-4"
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider text-saffron">
                  {contact.role}
                </p>
                <p className="mt-2 font-heading text-sm font-semibold text-navy">
                  {contact.name}
                </p>
                <p className="mt-1 text-xs text-navy/55">{contact.value}</p>
                {contact.isPlaceholder ? (
                  <span className="mt-3 inline-flex rounded-full bg-saffron/8 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-[#ad5a1c]">
                    Details pending
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
