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
      "ev-jodhpur-oct-24-01",
      "ev-jodhpur-oct-24-02",
      "ev-jodhpur-oct-24-03",
      "ev-jodhpur-oct-24-04",
      "ev-jodhpur-oct-24-05",
      "ev-jodhpur-oct-24-06",
      "ev-jodhpur-oct-24-07",
      "ev-jodhpur-oct-24-08",
      "ev-jodhpur-oct-24-09",
      "ev-jodhpur-oct-24-10",
      "ev-jodhpur-oct-24-11",
      "ev-jodhpur-oct-24-12",
      "ev-jodhpur-oct-24-13",
      "ev-jodhpur-oct-24-14",
      "ev-jodhpur-oct-24-15",
      "ev-jodhpur-oct-24-16",
      "ev-jodhpur-oct-24-17",
      "ev-jodhpur-oct-24-18",
      "ev-jodhpur-oct-24-19",
      "ev-jodhpur-oct-24-20",
      "ev-jodhpur-oct-24-21",
      "ev-jodhpur-oct-24-22",
      "ev-jodhpur-oct-24-23",
      "ev-jodhpur-oct-24-24",
      "ev-jodhpur-oct-24-25",
      "ev-jodhpur-oct-24-26",
      "ev-jodhpur-oct-24-27",
      "ev-jodhpur-oct-24-28",
    ),
  }),
  toEvent({
    slug: "bharat-solar-expo-jaipur-jan-25",
    name: "Bharat Solar Expo",
    location: "Jaipur",
    date: "Jan '25",
    images: byId(
      "ev-jaipur-jan-25-01",
      "ev-jaipur-jan-25-02",
      "ev-jaipur-jan-25-03",
      "ev-jaipur-jan-25-04",
      "ev-jaipur-jan-25-05",
      "ev-jaipur-jan-25-06",
      "ev-jaipur-jan-25-07",
      "ev-jaipur-jan-25-08",
      "ev-jaipur-jan-25-09",
      "ev-jaipur-jan-25-10",
      "ev-jaipur-jan-25-11",
      "ev-jaipur-jan-25-12",
      "ev-jaipur-jan-25-13",
      "ev-jaipur-jan-25-14",
      "ev-jaipur-jan-25-15",
      "ev-jaipur-jan-25-16",
      "ev-jaipur-jan-25-17",
      "ev-jaipur-jan-25-18",
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
    name: "Bharat Solar Expo",
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
