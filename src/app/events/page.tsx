import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SiteImageView } from "@/components/ui/SiteImageView";
import { EVENTS, EVENTS_PAGE, UPCOMING_EVENT } from "@/content/events";

export const metadata: Metadata = {
  title: "Events & Gallery",
  description:
    "Solar industry expos Shivaay Technocrat Service has exhibited at — browse photos from each event.",
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow={EVENTS_PAGE.eyebrow}
        title={EVENTS_PAGE.title}
        description={EVENTS_PAGE.lede}
      />
      <section className="bg-white">
        <Container className="section-y">
          <ul className="grid gap-8 sm:grid-cols-2">
            {EVENTS.map((event, index) => (
              <li
                key={event.slug}
                className="group border border-line bg-white transition-[border-color,transform] duration-hover hover:-translate-y-1 hover:border-blue-700/30"
              >
                <Link href={`/events/${event.slug}`} className="block">
                  <SiteImageView
                    image={event.cover}
                    className="media-frame aspect-[4/3] w-full"
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="p-6 md:p-7">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[0.65rem] text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-dusky-red">
                        {event.date}
                      </span>
                    </div>
                    <h2 className="mt-3 font-display text-xl font-bold text-blue-900">
                      {event.name}
                    </h2>
                    <p className="mt-2 text-sm text-muted">{event.location}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-700 transition-colors duration-hover group-hover:text-dusky-red">
                      View photos
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-14 border-t border-line pt-10">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
              Coming up
            </p>
            <div className="mt-6 flex flex-col gap-4 border border-dashed border-blue-700/30 bg-blue-100/30 p-6 sm:flex-row sm:items-center sm:justify-between md:p-7">
              <div>
                <h2 className="font-display text-xl font-bold text-blue-900">
                  {UPCOMING_EVENT.name}
                </h2>
                <p className="mt-2 text-sm text-muted">
                  {UPCOMING_EVENT.location}
                </p>
              </div>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-dusky-red">
                {UPCOMING_EVENT.date}
              </span>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
