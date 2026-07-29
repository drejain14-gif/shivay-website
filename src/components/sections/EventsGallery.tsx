"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useMotion } from "@/components/motion/MotionProvider";
import { EVENT_ITEMS, EVENTS_PAGE } from "@/content/events";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { LAYOUT, Z_INDEX } from "@/lib/layout";
import { MOTION } from "@/lib/motion";

/** Full-screen stack set — enough for motion, not the entire archive. */
const STACK_ITEMS = EVENT_ITEMS.slice(0, 10);

/**
 * Full-viewport stacked Events gallery.
 * Pinned ScrollTrigger: each next image slides up from the bottom and
 * covers the previous one. Transforms are owned by GSAP only (no React
 * inline transforms) so re-renders cannot reset slide position.
 */
export function EventsGallery() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const indexRef = useRef<HTMLSpanElement | null>(null);
  const captionRef = useRef<HTMLParagraphElement | null>(null);
  const dotsRef = useRef<HTMLDivElement | null>(null);
  const { scrollReady, preloaderDone, refreshScroll } = useMotion();
  const { prefersReducedMotion } = usePrefersReducedMotion();
  const reduce =
    prefersReducedMotion ||
    (typeof navigator !== "undefined" && navigator.webdriver);

  useEffect(() => {
    if (!sectionRef.current || !stageRef.current || reduce) {
      return;
    }

    // Wait until Lenis/preloader are ready when available; still boot if
    // scrollReady is delayed so the stack is never permanently stuck.
    if (!preloaderDone && !scrollReady) {
      return;
    }

    let cancelled = false;
    let revert: (() => void) | undefined;
    let bootTimer: number | undefined;

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
      const panels = gsap.utils.toArray<HTMLElement>(
        stageRef.current.querySelectorAll("[data-event-panel]"),
      );
      const lastIndex = Math.max(panels.length - 1, 1);

      const setActive = (index: number) => {
        const safe = Math.min(Math.max(index, 0), lastIndex);
        const item = STACK_ITEMS[safe];
        if (indexRef.current) {
          indexRef.current.textContent = `${String(safe + 1).padStart(2, "0")} / ${String(STACK_ITEMS.length).padStart(2, "0")}`;
        }
        if (captionRef.current && item) {
          captionRef.current.textContent = item.alt;
        }
        if (dotsRef.current) {
          const dots = dotsRef.current.querySelectorAll<HTMLElement>("[data-dot]");
          dots.forEach((dot, i) => {
            dot.setAttribute("aria-selected", i === safe ? "true" : "false");
            dot.classList.toggle("w-8", i === safe);
            dot.classList.toggle("bg-dusky-red", i === safe);
            dot.classList.toggle("w-1.5", i !== safe);
            dot.classList.toggle("bg-white/35", i !== safe);
          });
        }
        panels.forEach((panel, i) => {
          panel.setAttribute("aria-hidden", i === safe ? "false" : "true");
        });
      };

      const ctx = gsap.context(() => {
        // GSAP owns transforms — never set them via React style.
        gsap.set(panels, { force3D: true });
        panels.forEach((panel, index) => {
          gsap.set(panel, {
            yPercent: index === 0 ? 0 : 100,
            zIndex: index + 1,
          });
        });
        setActive(0);

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${lastIndex * window.innerHeight}`,
            pin: true,
            scrub: MOTION.events.scrubSmooth,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            id: "events-stack",
            snap: {
              snapTo: 1 / lastIndex,
              duration: { min: 0.1, max: 0.3 },
              ease: "power1.inOut",
            },
            onUpdate: (self) => {
              setActive(Math.round(self.progress * lastIndex));
            },
          },
        });

        panels.forEach((panel, index) => {
          if (index === 0) {
            return;
          }
          tl.to(panel, { yPercent: 0, duration: 1 }, index - 1);
        });
      }, sectionRef);

      const images = stageRef.current.querySelectorAll("img");
      let pending = images.length;
      const onReady = () => {
        pending -= 1;
        if (pending <= 0) {
          ScrollTrigger.refresh();
          refreshScroll();
        }
      };
      if (pending === 0) {
        ScrollTrigger.refresh();
      } else {
        images.forEach((img) => {
          if (img.complete) {
            onReady();
          } else {
            img.addEventListener("load", onReady, { once: true });
            img.addEventListener("error", onReady, { once: true });
          }
        });
      }

      // Defer refresh so pin-spacer height is calculated after layout paint.
      bootTimer = window.setTimeout(() => {
        ScrollTrigger.refresh();
        refreshScroll();
      }, 80);

      revert = () => ctx.revert();
    };

    void run();

    return () => {
      cancelled = true;
      if (bootTimer) {
        window.clearTimeout(bootTimer);
      }
      revert?.();
    };
  }, [scrollReady, preloaderDone, reduce, refreshScroll]);

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
            className="absolute inset-0 h-full w-full will-change-transform"
            style={{ zIndex: index + 1 }}
            aria-hidden={index !== 0}
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
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{ paddingTop: LAYOUT.headerHeight, zIndex: Z_INDEX.overlay }}
      >
        <div className="mx-auto w-full max-w-container px-5 pt-8 md:px-8 md:pt-10">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/60">
            {EVENTS_PAGE.eyebrow}
          </p>
          <h1 className="mt-2 max-w-2xl font-display text-display-md text-white md:text-display-lg">
            {EVENTS_PAGE.title}
          </h1>
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0"
        style={{ zIndex: Z_INDEX.overlay }}
      >
        <div className="mx-auto flex w-full max-w-container flex-wrap items-end justify-between gap-4 px-5 pb-8 md:px-8 md:pb-10">
          <div aria-live="polite" className="min-w-0">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/55">
              <span ref={indexRef}>
                01 / {String(STACK_ITEMS.length).padStart(2, "0")}
              </span>
            </p>
            <p
              ref={captionRef}
              className="mt-2 max-w-xl text-sm text-white/85 md:text-base"
            >
              {STACK_ITEMS[0]?.alt}
            </p>
          </div>

          <div
            ref={dotsRef}
            className="flex items-center gap-1.5"
            role="tablist"
            aria-label="Event slides"
          >
            {STACK_ITEMS.map((item, index) => (
              <span
                key={item.id}
                data-dot
                role="tab"
                aria-selected={index === 0}
                className={
                  index === 0
                    ? "h-1 w-8 rounded-full bg-dusky-red transition-[width,background-color] duration-hover"
                    : "h-1 w-1.5 rounded-full bg-white/35 transition-[width,background-color] duration-hover"
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
