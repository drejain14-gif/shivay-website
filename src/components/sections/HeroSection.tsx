"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { useMotion } from "@/components/motion/MotionProvider";
import { HOME_COPY } from "@/content/copy";
import {
  HERO_MEDIA_SLIDES,
  HERO_SLIDE_COUNT,
  type HeroMediaSlide,
} from "@/content/hero-media";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { LAYOUT } from "@/lib/layout";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/cn";

function HeroSlideMedia({
  slide,
  priority,
  videoRef,
}: Readonly<{
  slide: HeroMediaSlide;
  priority?: boolean;
  videoRef?: (el: HTMLVideoElement | null) => void;
}>) {
  if (slide.type === "video") {
    return (
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={slide.src}
        poster={slide.poster}
        muted
        playsInline
        preload="auto"
        aria-label={slide.alt}
      />
    );
  }

  return (
    <Image
      src={slide.src}
      alt={slide.alt}
      fill
      priority={priority}
      sizes="100vw"
      className="object-cover object-center"
    />
  );
}

export function HeroSection() {
  const rootRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const { prefersReducedMotion } = usePrefersReducedMotion();
  const { preloaderDone, scrollReady, refreshScroll } = useMotion();
  const copy = HOME_COPY.hero;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!rootRef.current || !trackRef.current || !preloaderDone) {
      return;
    }

    if (prefersReducedMotion || navigator.webdriver) {
      return;
    }

    let cancelled = false;
    let revert: (() => void) | undefined;

    const run = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !rootRef.current || !trackRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const videos = Array.from(videoRefs.current.values());
      await Promise.all(
        videos.map(
          (video) =>
            new Promise<void>((resolve) => {
              if (video.readyState >= 1) {
                resolve();
                return;
              }
              const onReady = () => {
                video.removeEventListener("loadedmetadata", onReady);
                resolve();
              };
              video.addEventListener("loadedmetadata", onReady);
              // Avoid hanging forever if a clip fails to load.
              window.setTimeout(resolve, 2500);
            }),
        ),
      );

      if (cancelled || !rootRef.current || !trackRef.current) {
        return;
      }

      const ctx = gsap.context(() => {
        const root = rootRef.current;
        const track = trackRef.current;
        if (!root || !track) {
          return;
        }

        const brand = root.querySelector("[data-hero-brand]");
        const lines = root.querySelectorAll("[data-hero-line]");
        const slideCount = HERO_SLIDE_COUNT;
        const lastIndex = Math.max(slideCount - 1, 1);

        if (brand) {
          gsap.fromTo(
            brand,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: MOTION.duration.base,
              ease: MOTION.ease.out,
            },
          );
        }
        if (lines.length) {
          gsap.fromTo(
            lines,
            { opacity: 0, y: 32 },
            {
              opacity: 1,
              y: 0,
              duration: MOTION.duration.base,
              stagger: MOTION.reveal.stagger,
              delay: 0.12,
              ease: MOTION.ease.out,
            },
          );
        }

        const getTravelX = () => {
          const max = track.scrollWidth - root.clientWidth;
          return max > 0 ? -max : 0;
        };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () =>
              `+=${slideCount * MOTION.hero.scrubPerSlideVh}%`,
            pin: true,
            scrub: MOTION.hero.scrubSmooth,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: 1 / lastIndex,
              duration: { min: 0.12, max: 0.35 },
              ease: "power1.inOut",
            },
            onUpdate: (self) => {
              const index = Math.round(self.progress * lastIndex);
              setActiveIndex(Math.min(Math.max(index, 0), lastIndex));
            },
          },
        });

        tl.to(
          track,
          {
            x: getTravelX,
            duration: lastIndex,
          },
          0,
        );

        HERO_MEDIA_SLIDES.forEach((slide, index) => {
          if (slide.type !== "video") {
            return;
          }
          const video = videoRefs.current.get(slide.id);
          if (!video) {
            return;
          }
          const duration = Number.isFinite(video.duration) && video.duration > 0
            ? video.duration
            : 4;
          video.pause();
          video.currentTime = 0;

          tl.fromTo(
            video,
            { currentTime: 0 },
            {
              currentTime: duration,
              duration: 1,
              ease: "none",
            },
            index,
          );
        });

        refreshScroll();
      }, rootRef);

      revert = () => ctx.revert();
    };

    void run();

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [preloaderDone, prefersReducedMotion, scrollReady, refreshScroll]);

  const activeSlide = HERO_MEDIA_SLIDES[activeIndex] ?? HERO_MEDIA_SLIDES[0];

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-blue-900 text-white"
      style={{ height: LAYOUT.heroMinHeight }}
      aria-roledescription="carousel"
      aria-label="Project media"
    >
      <div
        ref={trackRef}
        className="flex h-full will-change-transform"
        style={{ width: `${HERO_SLIDE_COUNT * 100}%` }}
      >
        {HERO_MEDIA_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className="relative h-full shrink-0"
            style={{ width: `${100 / HERO_SLIDE_COUNT}%` }}
            aria-hidden={index !== activeIndex}
          >
            <HeroSlideMedia
              slide={slide}
              priority={index === 0}
              videoRef={
                slide.type === "video"
                  ? (el) => {
                      if (el) {
                        videoRefs.current.set(slide.id, el);
                      } else {
                        videoRefs.current.delete(slide.id);
                      }
                    }
                  : undefined
              }
            />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-blue-900/72" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/68 to-blue-900/30" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-blue-900/45" />

      <Container className="pointer-events-none absolute inset-x-0 bottom-0 z-10 w-full pb-16 pt-36 md:pb-24 md:pt-40">
        <div className="max-w-3xl">
          <p
            data-hero-brand
            className="font-display text-display-xl tracking-brand"
          >
            {copy.brand}
            <span className="mt-3 block font-sans text-[17px] font-medium tracking-[0.24em] text-white/65 md:text-[19px]">
              {copy.brandSub}
            </span>
          </p>
          <div className="mt-5 h-1 w-20 bg-dusky-red" aria-hidden />
          <h1
            data-hero-line
            className="mt-8 max-w-3xl font-display text-display-lg text-white"
          >
            {copy.headline}
          </h1>
          <p
            data-hero-line
            className="mt-5 max-w-measure text-base leading-relaxed text-white/75 md:text-lg"
          >
            {copy.support}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <div aria-live="polite">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/55">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(HERO_SLIDE_COUNT).padStart(2, "0")}
            </p>
            <p className="mt-2 text-sm text-white/80">{activeSlide.caption}</p>
          </div>

          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label="Hero slides"
          >
            {HERO_MEDIA_SLIDES.map((slide, index) => (
              <span
                key={slide.id}
                role="tab"
                aria-selected={index === activeIndex}
                className={cn(
                  "h-1.5 rounded-full transition-[width,background-color] duration-hover",
                  index === activeIndex
                    ? "w-8 bg-dusky-red"
                    : "w-1.5 bg-white/35",
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
