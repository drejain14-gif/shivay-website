import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SiteImageView } from "@/components/ui/SiteImageView";
import { SITE } from "@/content/site";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "About",
  description: `About ${SITE.name} — NABL-accredited mechanical laboratory and civil infrastructure consultancy in Jaipur.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={SITE.name}
        description="Government-approved, NABL-accredited mechanical laboratory and multi-disciplinary consultancy for the civil industry."
      />
      <section className="bg-white">
        <Container className="section-y grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <p className="lede">
              Since {SITE.foundingMonth} {SITE.foundingYear}, Shivaay Technocrat
              Service has operated as a mechanical laboratory and grown into a
              multi-disciplinary consultancy serving the civil industry. We are
              Government Approved and NABL Accredited.
            </p>
            <p className="mt-4 text-muted">
              Founded by {SITE.founder.name}, {SITE.founder.title}.
            </p>
            <blockquote className="mt-8 border-l-[3px] border-dusky-red bg-blue-100/60 p-6">
              <p className="font-display text-lg font-semibold text-blue-900">
                “To be recognized through performance and excellence as a leading
                consultant & quality engineer.”
              </p>
              <footer className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                Vision
              </footer>
            </blockquote>
            <p className="mt-8 text-sm text-muted">
              <Link href="/contact" className="text-blue-700 underline">
                Contact us
              </Link>{" "}
              for project inquiries.
            </p>
          </div>
          <SiteImageView
            image={IMAGES.founder}
            className="media-frame aspect-[3/4] w-full"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </Container>
      </section>
    </>
  );
}
