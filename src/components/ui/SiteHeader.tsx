"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS } from "@/content/copy";
import { cn } from "@/lib/cn";
import { IMAGES } from "@/lib/images";
import { LAYOUT, Z_INDEX } from "@/lib/layout";

type HeaderTone = "dark" | "light";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState<HeaderTone>("dark");

  useEffect(() => {
    const darkSections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-header-tone="dark"]'),
    );

    if (darkSections.length === 0) {
      // Inner pages without a dark hero — keep light readable header.
      setTone("light");
      return;
    }

    const update = () => {
      const headerEl = document.querySelector("header");
      const probeY = (headerEl?.getBoundingClientRect().height ?? 72) / 2;
      let overDark = false;

      for (const section of darkSections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom > probeY) {
          overDark = true;
          break;
        }
      }

      setTone(overDark ? "dark" : "light");
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const observer = new IntersectionObserver(update, {
      threshold: [0, 0.01, 0.1, 1],
    });
    darkSections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  const onLight = tone === "light";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 border-b backdrop-blur-md transition-[background-color,border-color,color] duration-hover",
        onLight
          ? "border-line bg-white/95 text-blue-900"
          : "border-white/10 bg-blue-900/95 text-white",
      )}
      style={{ zIndex: Z_INDEX.sticky, height: LAYOUT.headerHeight }}
      data-tone={tone}
    >
      <Container className="flex h-full items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={IMAGES.logoIcon.src}
            alt={IMAGES.logoIcon.alt}
            width={40}
            height={40}
            className="h-10 w-10"
            priority
          />
          <span className="flex flex-col">
            <Image
              src={IMAGES.logoText.src}
              alt=""
              width={140}
              height={28}
              className={cn(
                "hidden h-7 w-auto md:block",
                // Transparent wordmark: invert to white over dark hero
                !onLight && "brightness-0 invert",
              )}
              priority
            />
            <span
              className={cn(
                "font-display text-sm font-extrabold tracking-[0.16em] md:hidden",
                onLight ? "text-blue-900" : "text-white",
              )}
            >
              SHIVAAY
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors duration-hover",
                onLight
                  ? "text-blue-900/80 hover:text-blue-900"
                  : "text-white/90 hover:text-white",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center rounded-sm bg-dusky-red px-5 py-2 text-sm font-medium text-white transition-colors duration-hover hover:bg-[#7a3239]"
          >
            Request quote
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex w-6 flex-col gap-1.5">
            <span
              className={cn(
                "h-0.5 transition",
                onLight ? "bg-blue-900" : "bg-white",
                open && "translate-y-2 rotate-45",
              )}
            />
            <span
              className={cn(
                "h-0.5 transition",
                onLight ? "bg-blue-900" : "bg-white",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "h-0.5 transition",
                onLight ? "bg-blue-900" : "bg-white",
                open && "-translate-y-2 -rotate-45",
              )}
            />
          </span>
        </button>
      </Container>

      <div
        id="mobile-nav"
        className={cn(
          "border-b md:hidden",
          onLight
            ? "border-line bg-white text-blue-900"
            : "border-white/10 bg-blue-900 text-white",
          open ? "block" : "hidden",
        )}
      >
        <Container className="flex flex-col gap-4 py-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium",
                onLight ? "text-blue-900" : "text-white/90",
              )}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </Container>
      </div>
    </header>
  );
}
