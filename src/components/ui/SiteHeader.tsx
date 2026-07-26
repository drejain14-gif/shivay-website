"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS } from "@/content/copy";
import { cn } from "@/lib/cn";
import { IMAGES } from "@/lib/images";
import { LAYOUT, Z_INDEX } from "@/lib/layout";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed inset-x-0 top-0 border-b border-white/10 bg-blue-900/90 text-white backdrop-blur-md"
      style={{ zIndex: Z_INDEX.sticky, height: LAYOUT.headerHeight }}
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
              className="hidden h-6 w-auto md:block"
              priority
            />
            <span className="font-display text-sm font-extrabold tracking-[0.16em] md:hidden">
              SHIVAAY
            </span>
            <span className="text-[0.6rem] font-medium tracking-[0.12em] text-white/70">
              Technocrat Service
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/85 transition-colors hover:text-white"
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
            <span className={cn("h-0.5 bg-white transition", open && "translate-y-2 rotate-45")} />
            <span className={cn("h-0.5 bg-white transition", open && "opacity-0")} />
            <span className={cn("h-0.5 bg-white transition", open && "-translate-y-2 -rotate-45")} />
          </span>
        </button>
      </Container>

      <div
        id="mobile-nav"
        className={cn(
          "border-b border-white/10 bg-blue-900 md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <Container className="flex flex-col gap-4 py-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/90"
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
