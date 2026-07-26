import type { Metadata } from "next";
import { EventsGallery } from "@/components/sections/EventsGallery";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SiteImageView } from "@/components/ui/SiteImageView";
import { EVENTS_PAGE } from "@/content/events";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Events & Gallery",
  description:
    "Recent events and project site photographs from Shivaay Technocrat Service — expos, field investigation, and survey work.",
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
          <SiteImageView
            image={IMAGES.eventsFeature}
            className="media-frame aspect-[21/9] w-full"
            fill
            sizes="100vw"
            priority
          />
          <div className="mt-14">
            <EventsGallery />
          </div>
        </Container>
      </section>
    </>
  );
}
