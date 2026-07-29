"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useMotion } from "@/components/motion/MotionProvider";
import { EVENT_ITEMS } from "@/content/events";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { LAYOUT } from "@/lib/layout";
import { MOTION } from "@/lib/motion";

/** Curated set for the pinned scrub stage (keeps motion readable). */
const SCRUB_ITEMS = EVENT_ITEMS.slice(0, 9);

/**
 * Pinned Events gallery: vertical scroll drives images rising from bottom
 * to their grid seats with a staggered scrub timeline.
 */
export function EventsGallery() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const { scrollReady, refreshScroll } = useMotion();
  const { prefersReducedMotion } = usePrefersReducedMotion();

  useEffect(() => {
    if (
      !sectionRef.current ||
      !stageRef.current ||
      !scrollReady ||
      prefersReducedMotion ||
      navigator.webdriver
    ) {
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
      const cards = stageRef.current.querySelectorAll<HTMLElement>(
        "[data-event-card]",
      );

      const ctx = gsap.context(() => {
        gsap.set(cards, {
          yPercent: 115,
          opacity: 0.15,
          force3D: true,
        });

        gsap.to(cards, {
          yPercent: 0,
          opacity: 1,
          ease: "none",
          stagger: MOTION.events.stagger,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${MOTION.events.scrubEndVh}%`,
            pin: true,
            scrub: MOTION.events.scrubSmooth,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            id: "events-scrub-gallery",
          },
        });
      }, sectionRef);

      // Images may still be decoding — refresh pin distances once loaded.
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
  }, [scrollReady, prefersReducedMotion, refreshScroll]);

  return (
    <section
      ref={sectionRef}
      data-header-tone="dark"
      className="relative overflow-hidden bg-blue-900 text-white"
      style={{ minHeight: LAYOUT.heroMinHeight }}
      aria-label="Events gallery scroll stage"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, #134a8a 0%, transparent 42%), radial-gradient(circle at 85% 80%, #8b3a42 0%, transparent 38%)",
        }}
      />

      <div
        className="relative mx-auto flex h-[100svh] w-full max-w-container flex-col px-5 md:px-8"
        style={{ paddingTop: LAYOUT.headerHeight }}
      >
        <div className="shrink-0 pb-4 pt-6 md:pb-5 md:pt-8">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/55">
            Scroll to reveal
          </p>
          <h2 className="mt-2 font-display text-display-md text-white md:text-display-lg">
            Events in motion
          </h2>
        </div>

        <div
          ref={stageRef}
          className="grid min-h-0 flex-1 grid-cols-2 grid-rows-5 gap-2.5 pb-6 md:grid-cols-3 md:grid-rows-3 md:gap-3 md:pb-8"
        >
          {SCRUB_ITEMS.map((item, index) => (
            <figure
              key={item.id}
              data-event-card
              className="relative h-full min-h-0 overflow-hidden border border-white/15 bg-blue-900/40 will-change-transform"
              style={
                prefersReducedMotion
                  ? undefined
                  : {
                      transform: "translate3d(0, 115%, 0)",
                      opacity: 0.15,
                    }
              }
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover object-center"
                priority={index < 3}
              />
              <figcaption className="sr-only">{item.alt}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
