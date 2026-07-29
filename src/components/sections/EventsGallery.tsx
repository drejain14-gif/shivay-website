"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useMotion } from "@/components/motion/MotionProvider";
import { EVENT_ITEMS, EVENTS_PAGE } from "@/content/events";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { LAYOUT, Z_INDEX } from "@/lib/layout";
import { MOTION } from "@/lib/motion";

/** Full-screen stack set — enough for motion, not the entire archive. */
const STACK_ITEMS = EVENT_ITEMS.slice(0, 10);

/**
 * Padded, rounded full-width Events stack.
 * Scroll fades + lifts each next frame over the previous one.
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
          dotsRef.current
            .querySelectorAll<HTMLElement>("[data-dot]")
            .forEach((dot, i) => {
              const on = i === safe;
              dot.setAttribute("aria-selected", on ? "true" : "false");
              dot.classList.toggle("w-9", on);
              dot.classList.toggle("bg-dusky-red", on);
              dot.classList.toggle("w-2", !on);
              dot.classList.toggle("bg-white/30", !on);
            });
        }
        panels.forEach((panel, i) => {
          panel.setAttribute("aria-hidden", i === safe ? "false" : "true");
        });
      };

      const ctx = gsap.context(() => {
        gsap.set(panels, { force3D: true, transformOrigin: "50% 50%" });
        panels.forEach((panel, index) => {
          gsap.set(panel, {
            yPercent: index === 0 ? 0 : 28,
            opacity: index === 0 ? 1 : 0,
            scale: index === 0 ? 1 : 0.965,
            zIndex: index + 1,
          });
        });
        setActive(0);

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () =>
              `+=${lastIndex * window.innerHeight * (MOTION.events.scrubPerSlideVh / 100)}`,
            pin: true,
            scrub: MOTION.events.scrubSmooth,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            id: "events-stack",
            snap: {
              snapTo: 1 / lastIndex,
              duration: { min: 0.12, max: 0.32 },
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
          const prev = panels[index - 1];
          // Incoming: fade + lift into place
          tl.fromTo(
            panel,
            { yPercent: 28, opacity: 0, scale: 0.965 },
            { yPercent: 0, opacity: 1, scale: 1, duration: 1 },
            index - 1,
          );
          // Outgoing: soft fade / settle behind
          if (prev) {
            tl.to(
              prev,
              { opacity: 0.35, scale: 0.97, duration: 1 },
              index - 1,
            );
          }
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
        className="bg-slate-50"
        aria-label="Events gallery"
      >
        <div className="mx-auto max-w-container px-5 py-16 md:px-8 md:py-20">
          <p className="eyebrow-accent">{EVENTS_PAGE.eyebrow}</p>
          <h1 className="display-title mt-3 text-display-lg">
            {EVENTS_PAGE.title}
          </h1>
          <p className="lede mt-4">{EVENTS_PAGE.lede}</p>
        </div>
        <ul className="mx-auto flex max-w-container flex-col gap-6 px-5 pb-16 md:px-8">
          {STACK_ITEMS.map((item) => (
            <li
              key={item.id}
              className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line"
            >
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
      className="relative h-[100svh] overflow-hidden bg-[#071828] text-white"
      aria-roledescription="carousel"
      aria-label="Events gallery stack"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 55% at 12% 18%, rgb(19 74 138 / 55%), transparent 55%), radial-gradient(ellipse 55% 45% at 88% 78%, rgb(139 58 66 / 28%), transparent 50%)",
        }}
      />

      <div
        className="relative mx-auto flex h-full w-full max-w-[90rem] flex-col px-4 md:px-8 lg:px-12"
        style={{
          paddingTop: `calc(${LAYOUT.headerHeight} + 1.25rem)`,
          paddingBottom: "1.25rem",
        }}
      >
        <header className="relative mb-4 flex shrink-0 flex-wrap items-end justify-between gap-4 md:mb-5">
          <div className="max-w-2xl">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/55">
              {EVENTS_PAGE.eyebrow}
            </p>
            <h1 className="mt-2 font-display text-display-md text-white md:text-display-lg">
              {EVENTS_PAGE.title}
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65 md:text-base">
              {EVENTS_PAGE.lede}
            </p>
          </div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/45">
            Scroll to advance
          </p>
        </header>

        <div className="relative min-h-0 flex-1">
          <div
            ref={stageRef}
            className="absolute inset-0 overflow-hidden rounded-2xl border border-white/12 bg-blue-900/40 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.75)]"
          >
            {STACK_ITEMS.map((item, index) => (
              <figure
                key={item.id}
                data-event-panel
                className="absolute inset-0 h-full w-full overflow-hidden will-change-transform"
                style={{ zIndex: index + 1 }}
                aria-hidden={index !== 0}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 90vw"
                  priority={index < 2}
                  className="object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071828]/75 via-transparent to-[#071828]/25" />
              </figure>
            ))}
          </div>
        </div>

        <div
          className="relative mt-4 flex shrink-0 flex-wrap items-end justify-between gap-4 md:mt-5"
          style={{ zIndex: Z_INDEX.overlay }}
        >
          <div aria-live="polite" className="min-w-0">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/50">
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

          <div className="flex flex-col items-end gap-3">
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
                      ? "h-1.5 w-9 rounded-full bg-dusky-red transition-[width,background-color] duration-hover"
                      : "h-1.5 w-2 rounded-full bg-white/30 transition-[width,background-color] duration-hover"
                  }
                />
              ))}
            </div>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center rounded-sm bg-dusky-red px-5 text-sm font-medium text-white transition-colors duration-hover hover:bg-[#7a3239]"
            >
              Plan a site visit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
