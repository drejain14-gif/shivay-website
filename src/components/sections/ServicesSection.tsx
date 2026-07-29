"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SiteImageView } from "@/components/ui/SiteImageView";
import { Reveal } from "@/components/motion/Reveal";
import { useMotion } from "@/components/motion/MotionProvider";
import { HOME_COPY } from "@/content/copy";
import { SERVICES } from "@/content/services";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { SERVICE_IMAGE_BY_SLUG } from "@/lib/images";
import { MOTION } from "@/lib/motion";

export function ServicesSection() {
  const listRef = useRef<HTMLUListElement | null>(null);
  const { scrollReady } = useMotion();
  const { prefersReducedMotion } = usePrefersReducedMotion();
  const copy = HOME_COPY.services;

  useEffect(() => {
    if (!listRef.current || !scrollReady || prefersReducedMotion) {
      return;
    }

    let cancelled = false;
    let revert: (() => void) | undefined;

    const run = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !listRef.current) {
        return;
      }
      gsap.registerPlugin(ScrollTrigger);
      const items = listRef.current.querySelectorAll("[data-service-item]");
      const ctx = gsap.context(() => {
        gsap.fromTo(
          items,
          { opacity: 0, y: MOTION.reveal.y },
          {
            opacity: 1,
            y: 0,
            duration: MOTION.duration.base,
            stagger: MOTION.reveal.stagger,
            ease: MOTION.ease.out,
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );
      }, listRef);
      revert = () => ctx.revert();
    };

    void run();
    return () => {
      cancelled = true;
      revert?.();
    };
  }, [scrollReady, prefersReducedMotion]);

  return (
    <section id="services" className="bg-white">
      <Container className="section-y">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow">{copy.eyebrow}</p>
              <h2 className="display-title mt-4 text-display-lg">{copy.title}</h2>
            </div>
            <p className="lede lg:col-span-5">{copy.body}</p>
          </div>
        </Reveal>

        <ul
          ref={listRef}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service, index) => {
            const image = SERVICE_IMAGE_BY_SLUG[service.slug];
            const featured = "featured" in service && service.featured;
            return (
              <li
                key={service.slug}
                data-service-item
                className="group border border-line bg-white transition-[border-color,transform] duration-hover hover:-translate-y-1 hover:border-blue-700/30"
                style={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: 0, willChange: "opacity, transform" }
                }
              >
                <Link href={`/services/${service.slug}`} className="block">
                  {image ? (
                    <SiteImageView
                      image={image}
                      className="media-frame aspect-[16/10] w-full"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : null}
                  <div className="p-6 md:p-7">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[0.65rem] text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {featured ? (
                        <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-dusky-red">
                          Focus
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-3 font-display text-xl font-bold text-blue-900">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {service.shortDescription}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-700 transition-colors duration-hover group-hover:text-dusky-red">
                      View details
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
