"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { useMotion } from "@/components/motion/MotionProvider";
import { ScrubWords } from "@/components/motion/ScrubWords";
import { HOME_COPY } from "@/content/copy";
import { SERVICES } from "@/content/services";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { SERVICE_IMAGE_BY_SLUG } from "@/lib/images";

type ServicePanelProps = Readonly<{
  service: (typeof SERVICES)[number];
  index: number;
  total: number;
  stacked?: boolean;
}>;

function ServicePanel({ service, index, total, stacked }: ServicePanelProps) {
  const image = SERVICE_IMAGE_BY_SLUG[service.slug];
  return (
    <article
      {...(!stacked ? { "data-service-panel": true } : {})}
      className={
        stacked
          ? "grid items-center gap-8 border-t border-white/15 py-12 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:gap-12"
          : "absolute inset-0 grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
      }
    >
      <div className="lg:col-span-6">
        <p className="font-mono text-sm tracking-[0.18em] text-dusky-red">
          {String(index + 1).padStart(2, "0")}
          <span className="text-white/70">
            {" "}
            / {String(total).padStart(2, "0")}
          </span>
        </p>
        <h3 className="mt-5 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
          {service.title}
        </h3>
        <p className="mt-5 max-w-measure text-base leading-relaxed text-white/80 md:text-lg">
          {service.shortDescription}
        </p>
        <ul className="mt-6 space-y-2.5">
          {service.highlights.slice(0, 3).map((item) => (
            <li key={item} className="flex gap-3 text-sm text-white/85">
              <span className="mt-2 h-1 w-1 shrink-0 bg-dusky-red" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
        <Link
          href={`/services/${service.slug}`}
          className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-white transition-colors hover:text-dusky-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusky-red"
        >
          View details
          <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="relative aspect-[16/11] overflow-hidden border border-white/15 bg-blue-900/40 lg:col-span-6">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover opacity-90"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
      </div>
    </article>
  );
}

/**
 * Desktop: pinned GSAP scrub chapters. Mobile: stacked list (no pin/clip).
 */
export function ServicesScrollSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollReady, refreshScroll } = useMotion();
  const { prefersReducedMotion } = usePrefersReducedMotion();
  const copy = HOME_COPY.services;
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const usePin = isDesktop && !prefersReducedMotion;

  useEffect(() => {
    if (!sectionRef.current || !scrollReady || !usePin) {
      return;
    }
    if (navigator.webdriver) {
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

      const root = sectionRef.current;
      const panels = root.querySelectorAll<HTMLElement>("[data-service-panel]");
      if (panels.length < 2) {
        return;
      }

      const ctx = gsap.context(() => {
        gsap.set(panels, { autoAlpha: 0, y: 48 });
        gsap.set(panels[0], { autoAlpha: 1, y: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${panels.length * 100}%`,
            pin: true,
            scrub: 0.75,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        panels.forEach((panel, index) => {
          if (index === 0) {
            return;
          }
          const prev = panels[index - 1];
          const at = index;
          tl.to(
            prev,
            { autoAlpha: 0, y: -36, duration: 0.45, ease: "none" },
            at,
          );
          tl.fromTo(
            panel,
            { autoAlpha: 0, y: 48 },
            { autoAlpha: 1, y: 0, duration: 0.45, ease: "none" },
            at,
          );
        });

        tl.to({}, { duration: 0.35 });
      }, sectionRef);

      revert = () => ctx.revert();
      requestAnimationFrame(() => refreshScroll());
    };

    void run();
    return () => {
      cancelled = true;
      revert?.();
    };
  }, [scrollReady, usePin, refreshScroll]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-blue-900 text-white lg:overflow-hidden"
    >
      <Container className="relative flex flex-col justify-center py-24 md:py-28 lg:min-h-[100svh]">
        <div className="mb-10 max-w-2xl md:mb-14">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/70">
            {copy.eyebrow}
          </p>
          <ScrubWords
            as="h2"
            text={copy.title}
            className="mt-4 font-display text-display-lg text-white"
            fromOpacity={0.35}
          />
          <p className="mt-5 max-w-measure text-base text-white/80 md:text-lg">
            {copy.body}
          </p>
        </div>

        {usePin ? (
          <div className="relative min-h-[28rem] md:min-h-[32rem]">
            {SERVICES.map((service, index) => (
              <ServicePanel
                key={service.slug}
                service={service}
                index={index}
                total={SERVICES.length}
              />
            ))}
          </div>
        ) : (
          <div>
            {SERVICES.map((service, index) => (
              <ServicePanel
                key={service.slug}
                service={service}
                index={index}
                total={SERVICES.length}
                stacked
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
