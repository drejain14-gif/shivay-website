"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { MOTION } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useSectionObserver } from "@/hooks/useSectionObserver";

type RevealProps = Readonly<{
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "li";
  delay?: number;
}>;

/**
 * IntersectionObserver reveal — content stays readable; motion is progressive.
 * Fail-safe makes content visible if observation stalls.
 */
export function Reveal({
  children,
  className,
  as: Tag = "div",
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const playedRef = useRef(false);
  const { prefersReducedMotion, ready } = usePrefersReducedMotion();
  const reduce =
    prefersReducedMotion || (typeof navigator !== "undefined" && navigator.webdriver);
  const visible = useSectionObserver(ref, {
    enabled: ready && !reduce,
    rootMargin: "0px 0px -8% 0px",
    threshold: 0.12,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce || !visible || playedRef.current) {
      return;
    }

    playedRef.current = true;
    let cancelled = false;
    let tween: { kill: () => void } | undefined;

    const run = async () => {
      const { default: gsap } = await import("gsap");
      if (cancelled || !ref.current) {
        return;
      }
      tween = gsap.fromTo(
        ref.current,
        { opacity: 0.01, y: MOTION.reveal.y },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.duration.fast,
          delay,
          ease: MOTION.ease.out,
          overwrite: "auto",
          clearProps: "transform",
        },
      );
    };

    void run();

    return () => {
      cancelled = true;
      tween?.kill();
    };
  }, [visible, reduce, delay]);

  return (
    <Tag
      ref={ref as never}
      className={cn(className)}
      style={
        reduce || visible
          ? undefined
          : { opacity: 0.01, willChange: "opacity, transform" }
      }
    >
      {children}
    </Tag>
  );
}
