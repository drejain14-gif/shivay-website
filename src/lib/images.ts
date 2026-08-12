export type SiteImage = Readonly<{
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}>;

/** Images sourced from https://shivaaygroup.co.in */
export const IMAGES = {
  logoIcon: {
    id: "logoIcon",
    src: "/img/logo/logo-icon.png",
    alt: "Shivaay Technocrat Service logo",
    width: 64,
    height: 64,
  },
  logoText: {
    id: "logoText",
    src: "/img/logo/logo-text.png",
    alt: "Shivaay Technocrat Service",
    width: 180,
    height: 40,
  },
  hero: {
    id: "hero",
    src: "/img/services/service-3.jpg",
    alt: "Shivaay field team performing borehole investigation on site",
    width: 1200,
    height: 1600,
  },
  founder: {
    id: "founder",
    src: "/img/founder.jpg",
    alt: `Er. Vibhor Kulshrestha, Founder & Chartered Engineer (IEI) at Shivaay Technocrat Service`,
    width: 1200,
    height: 1600,
  },
  about: {
    id: "about",
    src: "/img/team/team-2.jpg",
    alt: "Shivaay Technocrat Service company profile and founder overview",
    width: 1200,
    height: 1600,
  },
  aboutField: {
    id: "aboutField",
    src: "/img/events/event-1.jpg",
    alt: "Shivaay technicians conducting geotechnical soil testing in the field",
    width: 1200,
    height: 1600,
  },
  materials: {
    id: "materials",
    src: "/img/services/service-materials-testing-ai.jpg",
    alt: "Technician operating a concrete compression testing machine in an accredited materials laboratory",
    width: 853,
    height: 1280,
  },
  geotech: {
    id: "geotech",
    src: "/img/services/service-geotech-soil-ai.jpg",
    alt: "Engineer examining a soil sample at a geotechnical field investigation site",
    width: 853,
    height: 1280,
  },
  pile: {
    id: "pile",
    src: "/img/services/service-pile-testing-ai.jpg",
    alt: "Engineers monitoring gauges during a pile load test at a foundation site",
    width: 853,
    height: 1280,
  },
  highway: {
    id: "highway",
    src: "/img/services/service-engineering-consultancy-ai.jpg",
    alt: "Survey engineer operating a total station at a highway infrastructure site",
    width: 853,
    height: 1280,
  },
  ndt: {
    id: "ndt",
    src: "/img/services/service-ndt-ai.jpg",
    alt: "Technician performing non-destructive testing on a concrete structure",
    width: 853,
    height: 1280,
  },
  pageBanner: {
    id: "pageBanner",
    src: "/img/bg/breadcumb-bg.jpg",
    alt: "",
    width: 1600,
    height: 400,
  },
  contactMedia: {
    id: "contactMedia",
    src: "/img/services/service-5.jpg",
    alt: "Shivaay field survey team with GNSS equipment on site",
    width: 1200,
    height: 1600,
  },
  faqMedia: {
    id: "faqMedia",
    src: "/img/events/event-4.jpg",
    alt: "Shivaay project site investigation work",
    width: 1200,
    height: 1600,
  },
} as const satisfies Record<string, SiteImage>;

export const SERVICE_IMAGE_BY_SLUG: Record<string, SiteImage> = {
  "materials-testing": IMAGES.materials,
  "geotech-soil": IMAGES.geotech,
  "pile-testing": IMAGES.pile,
  "engineering-consultancy": IMAGES.highway,
  ndt: IMAGES.ndt,
};

export const SERVICE_ICON_BY_SLUG: Record<string, string> = {
  "materials-testing": "/img/icon/service_1_1.svg",
  "geotech-soil": "/img/icon/service_1_2.svg",
  "pile-testing": "/img/icon/service_1_3.svg",
  "engineering-consultancy": "/img/icon/service_1_4.svg",
  ndt: "/img/icon/service_1_5.svg",
};

/** Field/expo photos for /events — excludes known brochure flyer frames. */
export const EVENTS_GALLERY: ReadonlyArray<SiteImage> = [
  { id: "ev-1", src: "/img/events/1.jpeg", alt: "Shivaay booth at industry expo", width: 1600, height: 1200 },
  { id: "ev-2", src: "/img/events/2.jpeg", alt: "Shivaay team at exhibition", width: 1600, height: 1200 },
  { id: "ev-3", src: "/img/events/3.jpeg", alt: "Field investigation activity", width: 1200, height: 1600 },
  { id: "ev-4", src: "/img/events/4.jpeg", alt: "Project site documentation", width: 1600, height: 1200 },
  { id: "ev-5", src: "/img/events/5.jpeg", alt: "On-site engineering work", width: 1600, height: 1200 },
  { id: "ev-6", src: "/img/events/6.jpeg", alt: "Laboratory and field services showcase", width: 1600, height: 1200 },
  { id: "ev-7", src: "/img/events/7.jpeg", alt: "Shivaay project event photo", width: 1600, height: 1200 },
  { id: "ev-8", src: "/img/events/8.jpeg", alt: "Team at infrastructure project site", width: 1600, height: 1200 },
  { id: "ev-9", src: "/img/events/9.jpeg", alt: "Field survey and testing", width: 1600, height: 1200 },
  { id: "ev-00", src: "/img/events/00.jpeg", alt: "Shivaay events gallery photo", width: 1600, height: 1200 },
  { id: "ev-11", src: "/img/events/11.jpeg", alt: "Site works and investigation", width: 1600, height: 1200 },
  { id: "ev-12", src: "/img/events/12.jpeg", alt: "Project activity snapshot", width: 1200, height: 900 },
  { id: "ev-15", src: "/img/events/15.jpeg", alt: "Field team on assignment", width: 1200, height: 900 },
  { id: "ev-22", src: "/img/events/22.jpeg", alt: "Infrastructure investigation site", width: 1600, height: 1200 },
  { id: "ev-27", src: "/img/events/27.jpeg", alt: "Geotech field operation", width: 1200, height: 900 },
  { id: "ev-28", src: "/img/events/28.jpeg", alt: "Site testing in progress", width: 1600, height: 1200 },
  { id: "ev-32", src: "/img/events/32.jpeg", alt: "Survey equipment on site", width: 1200, height: 900 },
  { id: "ev-33", src: "/img/events/33.jpeg", alt: "Field documentation", width: 1200, height: 900 },
  { id: "ev-34", src: "/img/events/34.jpeg", alt: "Project site photograph", width: 1200, height: 900 },
  { id: "ev-43", src: "/img/events/43.jpeg", alt: "Engineering services in the field", width: 1200, height: 900 },
  { id: "ev-44", src: "/img/events/44.jpeg", alt: "Shivaay field engagement", width: 1600, height: 1200 },
  { id: "ev-64", src: "/img/events/64.jpeg", alt: "Site investigation detail", width: 1200, height: 900 },
  { id: "ev-209", src: "/img/events/209.jpeg", alt: "Events and projects gallery", width: 1600, height: 1200 },
  { id: "ev-dd", src: "/img/events/dd.jpeg", alt: "Team and project gallery photo", width: 1600, height: 1200 },
  { id: "ev-df", src: "/img/events/df.jpeg", alt: "Field operations gallery", width: 1600, height: 1200 },
  { id: "ev-f", src: "/img/events/f.jpeg", alt: "Site works gallery photo", width: 1600, height: 1200 },
  { id: "ev-s", src: "/img/events/s.jpeg", alt: "Project delivery photograph", width: 1600, height: 1200 },
  { id: "ev-v", src: "/img/events/v.jpeg", alt: "Investigation and survey work", width: 1600, height: 1200 },
  { id: "ev-w", src: "/img/events/w.jpeg", alt: "Shivaay on-site presence", width: 1600, height: 1200 },
  { id: "ev-wr", src: "/img/events/wr.jpeg", alt: "Events gallery field image", width: 1600, height: 1200 },
  { id: "ev-x", src: "/img/events/x.jpeg", alt: "Project site gallery image", width: 1200, height: 1600 },
  { id: "ev-e1", src: "/img/events/event-1.jpg", alt: "Geotechnical soil testing in the field", width: 1200, height: 1600 },
  { id: "ev-e2", src: "/img/events/event-2.jpg", alt: "Borehole investigation with company banner", width: 1200, height: 1600 },
  { id: "ev-e3", src: "/img/events/event-3.jpg", alt: "Field investigation activity", width: 1200, height: 1600 },
  { id: "ev-e4", src: "/img/events/event-4.jpg", alt: "On-site project investigation", width: 1200, height: 1600 },
  { id: "ev-e5", src: "/img/events/event-5.jpg", alt: "Field investigation and survey work", width: 960, height: 1019 },
  { id: "ev-e6", src: "/img/events/event-6.jpg", alt: "Project site photograph", width: 1113, height: 918 },
];
