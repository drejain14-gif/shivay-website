import type { Metadata } from "next";
import { EventsGallery } from "@/components/sections/EventsGallery";

export const metadata: Metadata = {
  title: "Events & Gallery",
  description:
    "Recent events and project site photographs from Shivaay Technocrat Service — expos, field investigation, and survey work.",
};

export default function EventsPage() {
  return <EventsGallery />;
}
