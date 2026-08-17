"use client";

import { useEffect, useRef } from "react";
import { SiteImageView } from "@/components/ui/SiteImageView";
import { useMotion } from "@/components/motion/MotionProvider";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { SiteImage } from "@/lib/images";
import { MOTION } from "@/lib/motion";

type EventsGalleryProps = Readonly<{
  items: ReadonlyArray<SiteImage>;
}>;

export function EventsGallery({ items }: EventsGalleryProps) {
  const listRef = useRef<HTMLUListElement | null>(null);
  const { scrollReady } = useMotion();
  const { prefersReducedMotion } = usePrefersReducedMotion();

  useEffect(() => {
    if (!listRef.current || !scrollReady || prefersReducedMotion) {
      return;
    }

    let cancelled = false;
    let revert: (() => void) | undefined;

    const run = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !listRef.current) {
        return;
      }
      gsap.registerPlugin(ScrollTrigger);
      const items = listRef.current.querySelectorAll("[data-event-item]");
      const ctx = gsap.context(() => {
        gsap.fromTo(
          items,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: MOTION.duration.fast,
            stagger: 0.04,
            ease: MOTION.ease.out,
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }, listRef);
      revert = () => ctx.revert();
    };

    void run();
    return () => {
      cancelled = true;
      revert?.();
    };
  }, [scrollReady, prefersReducedMotion]);

  return (
    <ul
      ref={listRef}
      className="columns-1 gap-6 sm:columns-2"
    >
      {items.map((item) => (
        <li
          key={item.id}
          data-event-item
          className="mb-6 break-inside-avoid"
          style={
            prefersReducedMotion
              ? undefined
              : { opacity: 0, willChange: "opacity, transform" }
          }
        >
          <SiteImageView
            image={item}
            className="media-frame w-full"
            imgClassName="h-auto w-full"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </li>
      ))}
    </ul>
  );
}
