"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { HOME_COPY } from "@/content/copy";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useSectionObserver } from "@/hooks/useSectionObserver";
import { IMAGES } from "@/lib/images";
import { MOTION } from "@/lib/motion";

export function AboutUsScrollSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const playedRef = useRef(false);
  const { prefersReducedMotion, ready } = usePrefersReducedMotion();
  const reduce =
    prefersReducedMotion ||
    (typeof navigator !== "undefined" && navigator.webdriver);
  const copy = HOME_COPY.aboutUs;
  const visible = useSectionObserver(sectionRef, {
    enabled: ready && !reduce,
    rootMargin: "0px 0px -10% 0px",
    threshold: 0.18,
  });

  useEffect(() => {
    if (!sectionRef.current || reduce || !visible || playedRef.current) {
      return;
    }

    playedRef.current = true;
    let cancelled = false;
    let tween: { kill: () => void } | undefined;

    const run = async () => {
      const { default: gsap } = await import("gsap");
      if (cancelled || !sectionRef.current) {
        return;
      }

      const root = sectionRef.current;
      const portrait = root.querySelector("[data-about-portrait]");
      const blocks = root.querySelectorAll("[data-about-block]");

      tween = gsap
        .timeline({ defaults: { ease: MOTION.ease.out, overwrite: "auto" } })
        .fromTo(
          portrait,
          { opacity: 0.01, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: MOTION.duration.fast,
            clearProps: "transform",
          },
          0,
        )
        .fromTo(
          blocks,
          { opacity: 0.01, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: MOTION.duration.fast,
            stagger: MOTION.reveal.itemDelay,
            clearProps: "transform",
          },
          0.06,
        );
    };

    void run();

    return () => {
      cancelled = true;
      tween?.kill();
    };
  }, [visible, reduce]);

  return (
    <section
      ref={sectionRef}
      id="about-us"
      data-header-tone="light"
      className="relative overflow-hidden bg-dusky-red-soft"
    >
      <Container className="section-y">
        <div className="grid w-full items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div
              data-about-portrait
              className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden border border-dusky-red/20 bg-blue-900/5 lg:mx-0 lg:max-w-none"
            >
              <Image
                src={IMAGES.founder.src}
                alt={IMAGES.founder.alt}
                fill
                sizes="(max-width: 1024px) 90vw, 36vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div data-about-block>
              <p className="eyebrow-accent">{copy.eyebrow}</p>
              <h2 className="display-title mt-4 text-display-lg">{copy.title}</h2>
              <span
                className="mt-6 block h-1 w-24 bg-dusky-red"
                aria-hidden
              />
            </div>

            <p
              data-about-block
              className="mt-8 font-display text-lg font-semibold text-blue-900 md:text-xl"
            >
              {copy.leadership}
            </p>

            {copy.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                data-about-block
                className="mt-5 max-w-measure text-base leading-relaxed text-ink/80 md:text-lg"
              >
                {paragraph}
              </p>
            ))}

            <blockquote
              data-about-block
              className="mt-10 border-l-2 border-dusky-red pl-5"
            >
              <p className="font-display text-lg leading-snug text-blue-900 md:text-xl">
                “{copy.quote}”
              </p>
              <footer className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted">
                — {copy.quoteAttribution}
              </footer>
            </blockquote>
          </div>
        </div>
      </Container>
    </section>
  );
}
