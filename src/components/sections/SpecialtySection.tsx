"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SiteImageView } from "@/components/ui/SiteImageView";
import { Reveal } from "@/components/motion/Reveal";
import { useMotion } from "@/components/motion/MotionProvider";
import { HOME_COPY } from "@/content/copy";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { IMAGES } from "@/lib/images";
import { MOTION } from "@/lib/motion";

export function SpecialtySection() {
  const lineRef = useRef<HTMLSpanElement | null>(null);
  const { scrollReady } = useMotion();
  const { prefersReducedMotion } = usePrefersReducedMotion();
  const copy = HOME_COPY.specialty;

  useEffect(() => {
    if (!lineRef.current || !scrollReady || prefersReducedMotion) {
      return;
    }

    let cancelled = false;
    let revert: (() => void) | undefined;

    const run = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !lineRef.current) {
        return;
      }
      gsap.registerPlugin(ScrollTrigger);
      const el = lineRef.current;
      const ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: MOTION.duration.base,
            ease: MOTION.ease.out,
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          },
        );
      });
      revert = () => ctx.revert();
    };

    void run();
    return () => {
      cancelled = true;
      revert?.();
    };
  }, [scrollReady, prefersReducedMotion]);

  return (
    <section className="bg-dusky-red-soft">
      <Container className="section-y">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow-accent">{copy.eyebrow}</p>
            <h2 className="display-title mt-4 text-display-lg">{copy.title}</h2>
            <span
              ref={lineRef}
              className="mt-6 block h-1 w-24 origin-left bg-dusky-red"
              aria-hidden
            />
            <p className="lede mt-6">{copy.body}</p>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-dusky-red/15 pt-8">
              <div>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                  Focus
                </dt>
                <dd className="mt-2 font-display text-lg font-semibold text-blue-900">
                  Metros & bridges
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                  Method
                </dt>
                <dd className="mt-2 font-display text-lg font-semibold text-blue-900">
                  Field + lab
                </dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6">
            <SiteImageView
              image={IMAGES.specialty}
              className="media-frame aspect-[4/5] w-full lg:aspect-[5/6]"
              imgClassName="h-full w-full"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
