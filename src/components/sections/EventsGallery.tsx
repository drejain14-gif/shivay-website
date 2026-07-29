"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useMotion } from "@/components/motion/MotionProvider";
import { EVENT_ITEMS, EVENTS_PAGE } from "@/content/events";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { LAYOUT, Z_INDEX } from "@/lib/layout";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/cn";

/** Full-screen stack set — enough for motion, not the entire archive. */
const STACK_ITEMS = EVENT_ITEMS.slice(0, 10);

/**
 * Full-viewport stacked Events gallery.
 * Page scroll is consumed by a pinned ScrollTrigger: each next image
 * slides up from the bottom and covers the previous one.
 */
export function EventsGallery() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const { scrollReady, refreshScroll } = useMotion();
  const { prefersReducedMotion } = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const reduce = prefersReducedMotion || (typeof navigator !== "undefined" && navigator.webdriver);
  const lastIndex = Math.max(STACK_ITEMS.length - 1, 1);

  useEffect(() => {
    if (!sectionRef.current || !stageRef.current || !scrollReady || reduce) {
      return;
    }

    let cancelled = false;
    let revert: (() => void) | undefined;

    const run = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !sectionRef.current || !stageRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const panels = Array.from(
        stageRef.current.querySelectorAll<HTMLElement>("[data-event-panel]"),
      );

      const ctx = gsap.context(() => {
        panels.forEach((panel, index) => {
          gsap.set(panel, {
            yPercent: index === 0 ? 0 : 100,
            zIndex: index + 1,
            force3D: true,
          });
        });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () =>
              `+=${Math.max(STACK_ITEMS.length - 1, 1) * MOTION.events.scrubPerSlideVh}%`,
            pin: true,
            scrub: MOTION.events.scrubSmooth,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            id: "events-stack",
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

        panels.forEach((panel, index) => {
          if (index === 0) {
            return;
          }
          // Each panel rises from below and covers the one underneath.
          tl.to(
            panel,
            {
              yPercent: 0,
              duration: 1,
            },
            index - 1,
          );
        });
      }, sectionRef);

      const images = stageRef.current.querySelectorAll("img");
      let pending = images.length;
      const onReady = () => {
        pending -= 1;
        if (pending <= 0) {
          refreshScroll();
        }
      };
      images.forEach((img) => {
        if (img.complete) {
          onReady();
        } else {
          img.addEventListener("load", onReady, { once: true });
          img.addEventListener("error", onReady, { once: true });
        }
      });

      refreshScroll();
      revert = () => ctx.revert();
    };

    void run();

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [scrollReady, reduce, refreshScroll, lastIndex]);

  if (reduce) {
    return (
      <section
        data-header-tone="light"
        className="bg-white"
        aria-label="Events gallery"
      >
        <div className="border-b border-line bg-blue-900 px-5 py-16 text-white md:px-8">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/55">
            {EVENTS_PAGE.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-display-lg">{EVENTS_PAGE.title}</h1>
          <p className="mt-4 max-w-measure text-white/75">{EVENTS_PAGE.lede}</p>
        </div>
        <ul>
          {STACK_ITEMS.map((item) => (
            <li key={item.id} className="relative h-[100svh] w-full">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      </section>
    );
  }

  const active = STACK_ITEMS[activeIndex] ?? STACK_ITEMS[0];

  return (
    <section
      ref={sectionRef}
      data-header-tone="dark"
      className="relative h-[100svh] overflow-hidden bg-blue-900 text-white"
      aria-roledescription="carousel"
      aria-label="Events gallery stack"
    >
      <div ref={stageRef} className="absolute inset-0">
        {STACK_ITEMS.map((item, index) => (
          <figure
            key={item.id}
            data-event-panel
            className="absolute inset-0 will-change-transform"
            style={{
              zIndex: index + 1,
              transform: index === 0 ? undefined : "translate3d(0, 100%, 0)",
            }}
            aria-hidden={index !== activeIndex}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="100vw"
              priority={index < 2}
              className="object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/15 to-blue-900/45" />
          </figure>
        ))}
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-20"
        style={{ paddingTop: LAYOUT.headerHeight, zIndex: Z_INDEX.overlay }}
      >
        <div className="mx-auto flex w-full max-w-container items-end justify-between gap-6 px-5 pb-0 pt-8 md:px-8 md:pt-10">
          <div className="max-w-2xl">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/60">
              {EVENTS_PAGE.eyebrow}
            </p>
            <h1 className="mt-2 font-display text-display-md text-white md:text-display-lg">
              {EVENTS_PAGE.title}
            </h1>
          </div>
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 z-20"
        style={{ zIndex: Z_INDEX.overlay }}
      >
        <div className="mx-auto flex w-full max-w-container flex-wrap items-end justify-between gap-4 px-5 pb-8 md:px-8 md:pb-10">
          <div aria-live="polite" className="min-w-0">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/55">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(STACK_ITEMS.length).padStart(2, "0")}
            </p>
            <p className="mt-2 max-w-xl text-sm text-white/85 md:text-base">
              {active.alt}
            </p>
          </div>

          <div
            className="flex items-center gap-1.5"
            role="tablist"
            aria-label="Event slides"
          >
            {STACK_ITEMS.map((item, index) => (
              <span
                key={item.id}
                role="tab"
                aria-selected={index === activeIndex}
                className={cn(
                  "h-1 rounded-full transition-[width,background-color] duration-hover",
                  index === activeIndex
                    ? "w-8 bg-dusky-red"
                    : "w-1.5 bg-white/35",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
