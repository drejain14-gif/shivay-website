import type { Metadata } from "next";
import { EventsGallery } from "@/components/sections/EventsGallery";
import { PageHero } from "@/components/ui/PageHero";
import { EVENTS_PAGE } from "@/content/events";

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
      <EventsGallery />
    </>
  );
}
