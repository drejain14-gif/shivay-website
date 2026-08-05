"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { useMotion } from "@/components/motion/MotionProvider";
import { ScrubWords } from "@/components/motion/ScrubWords";
import { HOME_COPY } from "@/content/copy";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

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
    let mm: gsap.MatchMedia | undefined;

    const run = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !sectionRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const root = sectionRef.current;
        if (!root) {
          return;
        }

        const blocks = root.querySelectorAll("[data-about-block]");
        gsap.set(blocks, { opacity: 0, y: 36 });

        const ctx = gsap.context(() => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "+=180%",
              pin: true,
              scrub: 0.65,
              anticipatePin: 1,
            },
          });

          blocks.forEach((block, index) => {
            tl.to(
              block,
              { opacity: 1, y: 0, duration: 0.28, ease: "none" },
              index * 0.22,
            );
          });
        }, sectionRef);

        revert = () => ctx.revert();
      });

      mm.add("(max-width: 1023px)", () => {
        const root = sectionRef.current;
        if (!root) {
          return;
        }
        gsap.set(root.querySelectorAll("[data-about-block]"), {
          clearProps: "all",
          opacity: 1,
          y: 0,
        });
      });
    };

    void run();

    return () => {
      cancelled = true;
      revert?.();
      mm?.revert();
    };
  }, [scrollReady, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="about-us"
      className="relative bg-dusky-red-soft lg:overflow-hidden"
    >
      <Container className="flex items-center py-20 md:py-24 lg:min-h-[100svh]">
        <div className="w-full max-w-3xl">
          <div data-about-block>
            <ScrubWords
              as="h2"
              text={copy.title}
              className="display-title text-display-lg"
            />
            <span className="mt-6 block h-1 w-24 bg-dusky-red" aria-hidden />
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
      </Container>
    </section>
  );
}
