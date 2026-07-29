"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { useMotion } from "@/components/motion/MotionProvider";
import { HOME_COPY } from "@/content/copy";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { IMAGES } from "@/lib/images";

export function AboutUsScrollSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollReady } = useMotion();
  const { prefersReducedMotion } = usePrefersReducedMotion();
  const copy = HOME_COPY.aboutUs;

  useEffect(() => {
    if (!sectionRef.current || !scrollReady) {
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
      if (cancelled || !sectionRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const root = sectionRef.current;
        if (!root) {
          return;
        }

        const portrait = root.querySelector("[data-about-portrait]");
        const blocks = root.querySelectorAll("[data-about-block]");

        gsap.set(portrait, { opacity: 0, scale: 1.06 });
        gsap.set(blocks, { opacity: 0, y: 36 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: 0.65,
            anticipatePin: 1,
          },
        });

        tl.to(
          portrait,
          { opacity: 1, scale: 1, duration: 0.35, ease: "none" },
          0,
        );

        blocks.forEach((block, index) => {
          tl.to(
            block,
            { opacity: 1, y: 0, duration: 0.28, ease: "none" },
            0.2 + index * 0.22,
          );
        });
      }, sectionRef);

      revert = () => ctx.revert();
    };

    void run();

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [scrollReady, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="about-us"
      className="relative overflow-hidden bg-dusky-red-soft"
    >
      <Container className="flex min-h-[100svh] items-center py-20 md:py-24">
        <div className="grid w-full items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div
              data-about-portrait
              className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden border border-dusky-red/20 bg-blue-900/5 lg:mx-0 lg:max-w-none"
            >
              <Image
                src={IMAGES.founder.src}
                alt={IMAGES.founder.alt}
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover object-top"
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
