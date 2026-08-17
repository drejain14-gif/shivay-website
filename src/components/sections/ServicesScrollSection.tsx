"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { useMotion } from "@/components/motion/MotionProvider";
import { ScrubWords } from "@/components/motion/ScrubWords";
import { HOME_COPY } from "@/content/copy";
import { SERVICES } from "@/content/services";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";
import { SERVICE_IMAGE_BY_SLUG } from "@/lib/images";

function serviceAnchorId(slug: string): string {
  return `service-${slug}`;
}

type ServiceNavListProps = Readonly<{
  activeSlug: string;
  onSelect: (slug: string) => void;
}>;

function ServiceNavList({ activeSlug, onSelect }: ServiceNavListProps) {
  return (
    <nav
      aria-label="Services"
      className="hidden lg:sticky lg:top-28 lg:block lg:self-start"
    >
      <ul className="space-y-1">
        {SERVICES.map((service, index) => {
          const isActive = service.slug === activeSlug;
          return (
            <li key={service.slug}>
              <button
                type="button"
                onClick={() => onSelect(service.slug)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "flex w-full items-baseline gap-3 border-l-2 py-3 pl-4 text-left transition-colors duration-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusky-red",
                  isActive
                    ? "border-dusky-red text-white"
                    : "border-white/10 text-white/50 hover:border-white/30 hover:text-white/80",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-xs tracking-[0.18em]",
                    isActive ? "text-dusky-red" : "text-white/40",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-lg font-bold tracking-tight md:text-xl">
                  {service.title}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

type ServiceContentBlockProps = Readonly<{
  service: (typeof SERVICES)[number];
}>;

function ServiceContentBlock({ service }: ServiceContentBlockProps) {
  const image = SERVICE_IMAGE_BY_SLUG[service.slug];

  return (
    <Reveal
      as="article"
      className={cn(
        "border-t border-white/15 py-10 first:border-t-0 first:pt-0 md:py-12",
      )}
    >
      <div id={serviceAnchorId(service.slug)} className="scroll-mt-28">
        <h3 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
          {service.title}
        </h3>
        <p className="mt-4 max-w-measure text-base leading-relaxed text-white/80 md:text-lg">
          {service.description}
        </p>
        <ul className="mt-6 space-y-2.5">
          {service.highlights.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-white/85">
              <span className="mt-2 h-1 w-1 shrink-0 bg-dusky-red" aria-hidden />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-5">
          <div className="relative aspect-[4/3] w-32 shrink-0 overflow-hidden border border-white/15 bg-blue-900/40 sm:w-40">
            {image ? (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="200px"
                className="object-cover opacity-90"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
          </div>
          <Link
            href={`/services/${service.slug}`}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-white transition-colors hover:text-dusky-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusky-red"
          >
            View details
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

/**
 * Desktop: sticky category list on the left, scrollspy-highlighted as the
 * matching content block on the right scrolls through view. Mobile: the
 * nav list is hidden and content blocks stack in a single column.
 */
export function ServicesScrollSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollReady, refreshScroll } = useMotion();
  const { prefersReducedMotion } = usePrefersReducedMotion();
  const copy = HOME_COPY.services;
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string>(SERVICES[0].slug);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!scrollReady) {
      return;
    }
    requestAnimationFrame(() => refreshScroll());
  }, [scrollReady, refreshScroll]);

  useEffect(() => {
    if (!isDesktop || !sectionRef.current) {
      return;
    }

    const blocks = SERVICES.map((service) =>
      document.getElementById(serviceAnchorId(service.slug)),
    ).filter((el): el is HTMLElement => el !== null);

    if (blocks.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActiveSlug(visible.target.id.replace("service-", ""));
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    blocks.forEach((block) => observer.observe(block));
    return () => observer.disconnect();
  }, [isDesktop]);

  const handleSelect = (slug: string) => {
    const target = document.getElementById(serviceAnchorId(slug));
    target?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-blue-900 text-white"
    >
      <Container className="section-y">
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

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <ServiceNavList activeSlug={activeSlug} onSelect={handleSelect} />
          </div>
          <div className="lg:col-span-8">
            {SERVICES.map((service) => (
              <ServiceContentBlock key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
