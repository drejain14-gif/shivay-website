"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { RequestQuoteButton } from "@/components/quote/RequestQuoteButton";
import { useMotion } from "@/components/motion/MotionProvider";
import { HOME_COPY } from "@/content/copy";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { IMAGES } from "@/lib/images";
import { LAYOUT } from "@/lib/layout";
import { MOTION } from "@/lib/motion";

export function HeroSection() {
  const rootRef = useRef<HTMLElement | null>(null);
  const { prefersReducedMotion } = usePrefersReducedMotion();
  const { preloaderDone, scrollReady } = useMotion();
  const copy = HOME_COPY.hero;

  useEffect(() => {
    if (!rootRef.current || !preloaderDone) {
      return;
    }

    if (prefersReducedMotion || navigator.webdriver) {
      return;
    }

    let cancelled = false;
    let revert: (() => void) | undefined;

    const run = async () => {
      const { default: gsap } = await import("gsap");
      if (cancelled || !rootRef.current) {
        return;
      }

      const ctx = gsap.context(() => {
        const root = rootRef.current;
        if (!root) {
          return;
        }
        const brand = root.querySelector("[data-hero-brand]");
        const lines = root.querySelectorAll("[data-hero-line]");
        const ctas = root.querySelectorAll("[data-hero-cta]");
        const media = root.querySelector("[data-hero-media]");

        if (brand) {
          gsap.fromTo(
            brand,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: MOTION.duration.base,
              ease: MOTION.ease.out,
            },
          );
        }
        if (lines.length) {
          gsap.fromTo(
            lines,
            { opacity: 0, y: 32 },
            {
              opacity: 1,
              y: 0,
              duration: MOTION.duration.base,
              stagger: MOTION.reveal.stagger,
              delay: 0.12,
              ease: MOTION.ease.out,
            },
          );
        }
        if (ctas.length) {
          gsap.fromTo(
            ctas,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: MOTION.duration.fast,
              stagger: 0.08,
              delay: 0.35,
              ease: MOTION.ease.out,
            },
          );
        }
        if (media) {
          gsap.fromTo(
            media,
            { scale: MOTION.hero.mediaScaleFrom },
            {
              scale: MOTION.hero.mediaScaleTo,
              duration: MOTION.duration.slow,
              ease: MOTION.ease.out,
            },
          );
        }
      }, rootRef);

      revert = () => ctx.revert();
    };

    void run();

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [preloaderDone, prefersReducedMotion, scrollReady]);

  return (
    <section
      ref={rootRef}
      className="relative flex items-end overflow-hidden bg-blue-900 text-white"
      style={{ minHeight: LAYOUT.heroMinHeight }}
    >
      <div
        data-hero-media
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <Image
          src={IMAGES.hero.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_28%]"
        />
        <div className="absolute inset-0 bg-blue-900/78" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/70 to-blue-900/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-blue-900/40" />
      </div>

      <Container className="relative z-10 w-full pb-20 pt-36 md:pb-28 md:pt-40">
        <div className="max-w-3xl">
          <p
            data-hero-brand
            className="font-display text-display-xl tracking-brand"
          >
            {copy.brand}
            <span className="mt-3 block font-sans text-[17px] font-medium tracking-[0.24em] text-white/65 md:text-[19px]">
              {copy.brandSub}
            </span>
          </p>
          <div className="mt-5 h-1 w-20 bg-dusky-red" aria-hidden />
          <h1
            data-hero-line
            className="mt-8 max-w-3xl font-display text-display-lg text-white"
          >
            {copy.headline}
          </h1>
          <div className="mt-10 flex flex-wrap gap-3">
            <span data-hero-cta>
              <RequestQuoteButton variant="primary">
                {copy.primaryCta.label}
              </RequestQuoteButton>
            </span>
            <span data-hero-cta>
              <ButtonLink href={copy.secondaryCta.href} variant="secondary">
                {copy.secondaryCta.label}
              </ButtonLink>
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
