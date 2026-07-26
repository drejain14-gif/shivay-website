"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useMotion } from "@/components/motion/MotionProvider";
import { SITE } from "@/content/site";
import { MOTION } from "@/lib/motion";
import { Z_INDEX } from "@/lib/layout";

export function PreloaderGate() {
  const { prefersReducedMotion, ready } = usePrefersReducedMotion();
  const { preloaderDone, setPreloaderDone } = useMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!ready) {
      return;
    }

    if (prefersReducedMotion || navigator.webdriver) {
      setPreloaderDone(true);
      setVisible(false);
      return;
    }

    if (preloaderDone) {
      return;
    }

    let cancelled = false;
    let revert: (() => void) | undefined;

    const run = async () => {
      const { default: gsap } = await import("gsap");
      if (cancelled) {
        return;
      }

      const root = document.querySelector<HTMLElement>("[data-preloader]");
      const letters = root?.querySelectorAll<HTMLElement>("[data-letter]");
      if (!root || !letters?.length) {
        setPreloaderDone(true);
        setVisible(false);
        return;
      }

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            setPreloaderDone(true);
            setVisible(false);
          },
        });
        tl.fromTo(
          letters,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: MOTION.duration.fast,
            stagger: MOTION.duration.preloaderStagger,
            ease: MOTION.ease.out,
          },
        )
          .to({}, { duration: MOTION.duration.preloaderHold })
          .to(root, {
            opacity: 0,
            duration: MOTION.duration.preloaderExit,
            ease: MOTION.ease.inOut,
          });
      }, root);

      revert = () => ctx.revert();
    };

    void run();

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [ready, prefersReducedMotion, preloaderDone, setPreloaderDone]);

  if (!visible) {
    return null;
  }

  const word = SITE.shortName.toUpperCase();

  return (
    <div
      data-preloader
      className="fixed inset-0 flex items-center justify-center bg-blue-900 text-white"
      style={{ zIndex: Z_INDEX.preloader }}
      aria-hidden={preloaderDone}
    >
      <p className="font-display text-3xl font-extrabold tracking-[0.2em] md:text-5xl">
        {word.split("").map((char, index) => (
          <span key={`${char}-${index}`} data-letter className="inline-block">
            {char}
          </span>
        ))}
      </p>
      <span className="absolute bottom-[28%] h-0.5 w-12 bg-dusky-red" />
    </div>
  );
}
