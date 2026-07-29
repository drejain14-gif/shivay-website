/** Motion tokens — never hardcode durations/easings in components. */
export const MOTION = {
  duration: {
    instant: 0,
    fast: 0.35,
    base: 0.6,
    slow: 1.0,
    preloaderStagger: 0.04,
    preloaderHold: 0.12,
    preloaderExit: 0.35,
  },
  ease: {
    out: "power2.out",
    inOut: "power2.inOut",
    soft: "power1.out",
  },
  reveal: {
    y: 36,
    stagger: 0.1,
    itemDelay: 0.06,
  },
  hover: {
    y: -3,
    scale: 1.015,
    duration: 0.2,
  },
  lenis: {
    duration: 1.1,
    wheelMultiplier: 0.9,
  },
  hero: {
    mediaScaleFrom: 1.06,
    mediaScaleTo: 1,
  },
  events: {
    /** Viewport-height scroll distance per stacked slide. */
    scrubPerSlideVh: 110,
    scrubSmooth: 0.7,
    stagger: 0.14,
  },
} as const;

export type MotionConfig = typeof MOTION;
