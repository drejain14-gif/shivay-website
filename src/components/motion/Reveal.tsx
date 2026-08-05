"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { MOTION } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useMotion } from "@/components/motion/MotionProvider";

type RevealProps = Readonly<{
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "li";
  delay?: number;
}>;

export function Reveal({
  children,
  className,
  as: Tag = "div",
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { prefersReducedMotion } = usePrefersReducedMotion();
  const { scrollReady } = useMotion();
  const [forceVisible, setForceVisible] = useState(false);

  useEffect(() => {
    if (scrollReady || prefersReducedMotion) {
      return;
    }
    const timer = window.setTimeout(() => setForceVisible(true), 2500);
    return () => window.clearTimeout(timer);
  }, [scrollReady, prefersReducedMotion]);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    if (prefersReducedMotion || navigator.webdriver || forceVisible) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    if (!scrollReady) {
      return;
    }

    let cancelled = false;
    let revert: (() => void) | undefined;

    const run = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !ref.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        if (!ref.current) {
          return;
        }
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: MOTION.reveal.y },
          {
            opacity: 1,
            y: 0,
            duration: MOTION.duration.base,
            delay,
            ease: MOTION.ease.out,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 88%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      }, ref);

      ScrollTrigger.refresh();
      revert = () => ctx.revert();
    };

    void run();

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [scrollReady, prefersReducedMotion, delay, forceVisible]);

  const hideUntilReady = !prefersReducedMotion && !forceVisible;

  return (
    <Tag
      ref={ref as never}
      className={cn(className)}
      style={
        hideUntilReady
          ? { opacity: 0, willChange: "opacity, transform" }
          : undefined
      }
    >
      {children}
    </Tag>
  );
}
