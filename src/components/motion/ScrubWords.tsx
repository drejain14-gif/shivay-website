"use client";

import { useEffect, useRef } from "react";
import { useMotion } from "@/components/motion/MotionProvider";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";
import { splitIntoWords } from "@/lib/splitText";

type ScrubWordsProps = Readonly<{
  text: string;
  as?: "p" | "h1" | "h2" | "h3" | "span";
  className?: string;
  fromOpacity?: number;
}>;

/**
 * Sav1n-style scrub-each-word: words brighten from dim → full as you scroll.
 * Keeps real heading/paragraph text for assistive tech (no role=group / aria-hidden words).
 */
export function ScrubWords({
  text,
  as: Tag = "p",
  className,
  fromOpacity = 0.35,
}: ScrubWordsProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const { scrollReady } = useMotion();
  const { prefersReducedMotion } = usePrefersReducedMotion();
  const words = splitIntoWords(text);

  useEffect(() => {
    if (!rootRef.current || !scrollReady) {
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
      if (cancelled || !rootRef.current) {
        return;
      }
      gsap.registerPlugin(ScrollTrigger);

      const wordEls = rootRef.current.querySelectorAll("[data-scrub-word]");
      const ctx = gsap.context(() => {
        gsap.fromTo(
          wordEls,
          { opacity: fromOpacity },
          {
            opacity: 1,
            ease: "none",
            stagger: { each: 0.12 },
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 88%",
              end: "top 45%",
              scrub: true,
            },
          },
        );
      }, rootRef);

      revert = () => ctx.revert();
    };

    void run();
    return () => {
      cancelled = true;
      revert?.();
    };
  }, [scrollReady, prefersReducedMotion, fromOpacity, text]);

  return (
    <Tag ref={rootRef as never} className={cn(className)}>
      {words.map((word, index) => (
        <span
          key={`${index}-${word}`}
          data-scrub-word
          className="inline-block whitespace-nowrap"
          style={
            prefersReducedMotion
              ? undefined
              : { opacity: fromOpacity, willChange: "opacity" }
          }
        >
          {word}
          {index < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}
