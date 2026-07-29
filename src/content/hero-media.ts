/**
 * Hero scrub-carousel slides — mix of full-bleed images and videos.
 * Drop client clips in /public/img/hero/video and register them here.
 */
export type HeroMediaSlide =
  | Readonly<{
      id: string;
      type: "image";
      src: string;
      alt: string;
      caption: string;
    }>
  | Readonly<{
      id: string;
      type: "video";
      src: string;
      poster: string;
      alt: string;
      caption: string;
    }>;

export const HERO_MEDIA_SLIDES: readonly HeroMediaSlide[] = [
  {
    id: "materials-lab",
    type: "image",
    src: "/img/services/service-1.jpg",
    alt: "Field materials and investigation testing",
    caption: "Civil materials testing",
  },
  {
    id: "brick-water-absorption",
    type: "video",
    src: "/img/hero/video/brick-water-absorption.mp4",
    poster: "/img/hero/video/brick-water-absorption-poster.jpg",
    alt: "Brick tested for water absorption in the laboratory",
    caption: "Brick water absorption test",
  },
  {
    id: "borehole-video",
    type: "video",
    src: "/img/hero/video/field-borehole.mp4",
    poster: "/img/services/service-3.jpg",
    alt: "Borehole and foundation investigation on site",
    caption: "Pile & foundation investigation",
  },
  {
    id: "geotech-field",
    type: "image",
    src: "/img/services/service-2.jpg",
    alt: "Geotechnical soil testing in the field",
    caption: "Geotech & soil testing",
  },
  {
    id: "geotech-video",
    type: "video",
    src: "/img/hero/video/field-geotech.mp4",
    poster: "/img/events/event-1.jpg",
    alt: "Technicians conducting geotechnical soil testing",
    caption: "Field investigation",
  },
  {
    id: "highway-infra",
    type: "image",
    src: "/img/hero/hero_bg_new.png",
    alt: "Infrastructure landscape for highway and civil works",
    caption: "Highway infrastructure",
  },
] as const;

export const HERO_SLIDE_COUNT = HERO_MEDIA_SLIDES.length;
