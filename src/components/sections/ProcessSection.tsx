"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SiteImageView } from "@/components/ui/SiteImageView";
import { Reveal } from "@/components/motion/Reveal";
import { useMotion } from "@/components/motion/MotionProvider";
import { HOME_COPY } from "@/content/copy";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { PROCESS_IMAGES } from "@/lib/images";
import { MOTION } from "@/lib/motion";

export function ProcessSection() {
  const progressRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollReady } = useMotion();
  const { prefersReducedMotion } = usePrefersReducedMotion();
  const copy = HOME_COPY.process;

  useEffect(() => {
    if (
      !sectionRef.current ||
      !progressRef.current ||
      !scrollReady ||
      prefersReducedMotion
    ) {
      return;
    }

    let cancelled = false;
    let revert: (() => void) | undefined;

    const run = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !sectionRef.current || !progressRef.current) {
        return;
      }
      gsap.registerPlugin(ScrollTrigger);
      const bar = progressRef.current;
      const section = sectionRef.current;
      const ctx = gsap.context(() => {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
              end: "bottom 70%",
              scrub: true,
            },
          },
        );
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
    <section ref={sectionRef} data-header-tone="light" className="bg-slate-50">
      <Container className="section-y">
        <Reveal>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="display-title mt-4 max-w-2xl text-display-lg">
            {copy.title}
          </h2>
        </Reveal>

        <div className="relative mt-12 hidden h-px bg-line md:block" aria-hidden>
          <div
            ref={progressRef}
            className="absolute inset-y-0 left-0 origin-left bg-dusky-red"
            style={{ width: "100%", height: "2px", top: "-0.5px", transform: "scaleX(0)" }}
          />
        </div>

        <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {copy.steps.map((step, index) => (
            <Reveal
              key={step.number}
              as="li"
              delay={index * MOTION.reveal.itemDelay}
              className="border border-line bg-white p-2"
            >
              <SiteImageView
                image={PROCESS_IMAGES[index]}
                className="media-frame aspect-[4/3] w-full"
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="p-5">
                <p className="font-mono text-sm text-dusky-red">{step.number}</p>
                <h3 className="mt-2 font-display text-xl font-bold text-blue-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
