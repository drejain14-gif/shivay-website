import { EVENTS_GALLERY, type SiteImage } from "@/lib/images";

export const EVENTS_PAGE = {
  eyebrow: "Events & gallery",
  title: "Where we've shown up.",
  lede: "Shivaay Technocrat Service at solar industry expos across Rajasthan — pick an event to see photos from the floor.",
} as const;

function byId(...ids: ReadonlyArray<string>): ReadonlyArray<SiteImage> {
  return ids
    .map((id) => EVENTS_GALLERY.find((image) => image.id === id))
    .filter((image): image is SiteImage => Boolean(image));
}

export type EventEntry = Readonly<{
  slug: string;
  name: string;
  location: string;
  date: string;
  cover: SiteImage;
  images: ReadonlyArray<SiteImage>;
}>;

function toEvent(entry: {
  slug: string;
  name: string;
  location: string;
  date: string;
  images: ReadonlyArray<SiteImage>;
}): EventEntry {
  const [cover] = entry.images;
  if (!cover) {
    throw new Error(`Event "${entry.slug}" has no images`);
  }
  return { ...entry, cover };
}

export const EVENTS: ReadonlyArray<EventEntry> = [
  toEvent({
    slug: "bharat-solar-expo-jodhpur-oct-24",
    name: "Bharat Solar Expo",
    location: "Jodhpur",
    date: "Oct '24",
    images: byId(
      "ev-1",
      "ev-2",
      "ev-3",
      "ev-4",
      "ev-5",
      "ev-6",
      "ev-7",
      "ev-8",
      "ev-9",
    ),
  }),
  toEvent({
    slug: "bharat-solar-expo-jaipur-jan-25",
    name: "Bharat Solar Expo",
    location: "Jaipur",
    date: "Jan '25",
    images: byId(
      "ev-00",
      "ev-11",
      "ev-12",
      "ev-15",
      "ev-22",
      "ev-27",
      "ev-28",
      "ev-32",
      "ev-33",
    ),
  }),
  toEvent({
    slug: "harit-bharat-solar-expo-kota-sept-25",
    name: "Harit Bharat Solar Expo",
    location: "Kota",
    date: "Sept '25",
    images: byId(
      "ev-34",
      "ev-43",
      "ev-44",
      "ev-64",
      "ev-209",
      "ev-dd",
      "ev-df",
      "ev-f",
      "ev-s",
    ),
  }),
  toEvent({
    slug: "harit-bharat-solar-expo-jaipur-jan-26",
    name: "Harit Bharat Solar Expo",
    location: "Jaipur",
    date: "Jan '26",
    images: byId("ev-v", "ev-w", "ev-wr", "ev-x"),
  }),
];

export const UPCOMING_EVENT = {
  name: "Global Solar Expo",
  location: "Indore",
  date: "Sept '26",
} as const;

export function getEventBySlug(slug: string): EventEntry | undefined {
  return EVENTS.find((event) => event.slug === slug);
}
