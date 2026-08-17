import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FOOTER_LINKS } from "@/content/copy";
import { SITE, getTelHref, getWhatsAppHref } from "@/content/site";
import { IMAGES } from "@/lib/images";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white text-blue-900">
      <Container className="grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src={IMAGES.logoIcon.src}
              alt={IMAGES.logoIcon.alt}
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <p className="font-display text-xl font-extrabold tracking-[0.16em]">
              {SITE.shortName.toUpperCase()}
            </p>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            Started in {SITE.foundingMonth} {SITE.foundingYear} as a mechanical
            laboratory — now a multi-disciplinary consultancy for civil
            infrastructure quality and investigation.
          </p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
            Useful links
          </p>
          <ul className="mt-4 space-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-ink/85 hover:text-blue-900"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
            Contact
          </p>
          <address className="mt-4 space-y-2 text-sm not-italic text-ink/85">
            <p>{SITE.address.full}</p>
            <p>
              <a href={getTelHref(SITE.phone)} className="hover:text-blue-900">
                {SITE.phone}
              </a>
              ,{" "}
              <a
                href={getTelHref(SITE.phoneSecondary)}
                className="hover:text-blue-900"
              >
                {SITE.phoneSecondary}
              </a>
            </p>
            <p>
              <a
                href={getWhatsAppHref()}
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-900"
              >
                Chat on WhatsApp
              </a>
            </p>
          </address>
        </div>
      </Container>
      <div className="border-t border-line">
        <Container className="py-5 text-xs text-muted">
          © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
        </Container>
      </div>
    </footer>
  );
}
