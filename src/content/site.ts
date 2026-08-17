/** Verified contact & identity from live site scrape. */
export const SITE = {
  name: "Shivaay Technocrat Service",
  shortName: "Shivaay",
  legalName: "Shivaay Technocrat Service",
  tagline: "Accredited testing for India’s critical foundations.",
  description:
    "Government-approved, NABL-accredited mechanical laboratory and civil infrastructure consultancy in Jaipur — geotech, materials testing, NDT, and pile testing for metros, bridges, and highways.",
  url: "https://shivaaygroup.co.in",
  locale: "en_IN",
  phone: "+91-9828167975",
  phoneSecondary: "+91-9772178631",
  email: "shivaaytechno@gmail.com",
  emailSecondary: "info@shivaaygroups.com",
  address: {
    street: "Diamond Retreat, C-9, Mahal Yojna, Jagatpura",
    city: "Jaipur",
    region: "Rajasthan",
    postalCode: "302017",
    country: "IN",
    full: "Diamond Retreat, C-9, Mahal Yojna, Jagatpura, Jaipur (Raj.) - 302017",
  },
  openingHours: "Mo-Fr 09:00-18:00",
  openingHoursDisplay: "Mon – Fri: 9:00 AM – 6:00 PM · Sat – Sun: Closed",
  foundingYear: 2017,
  foundingMonth: "February",
  founder: {
    name: "Er. Vibhor Kulshrestha",
    title: "Chartered Engineer (IEI)",
    role: "Founder",
  },
  accreditations: [
    "Government Approved",
    "NABL Accredited Mechanical Laboratory",
  ] as const,
  areaServed: "India",
  social: {
    // Add when client confirms profiles
  },
} as const;

export type SiteConfig = typeof SITE;

export function getTelHref(phone: string = SITE.phone): string {
  const digits = phone.replace(/\D/g, "");
  return `tel:+${digits}`;
}

const DEFAULT_WHATSAPP_MESSAGE =
  "Hello — I would like to discuss testing / investigation services with Shivaay Technocrat Service.";

/** Builds a wa.me deep link that opens a chat with `SITE.phone`, optionally pre-filled with `message`. */
export function getWhatsAppHref(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  const digits = SITE.phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
