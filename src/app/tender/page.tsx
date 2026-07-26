import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SiteImageView } from "@/components/ui/SiteImageView";
import { TENDER } from "@/content/tender";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Tender Consultation",
  description:
    "Tender consultation for civil and infrastructure packages — investigation, testing, and documentation support from Shivaay Technocrat Service.",
};

export default function TenderPage() {
  return (
    <>
      <PageHero
        eyebrow={TENDER.eyebrow}
        title={TENDER.title}
        description={TENDER.lede}
      />
      <section className="bg-white">
        <Container className="section-y grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SiteImageView
              image={IMAGES.tenderHero}
              className="media-frame aspect-[4/5] w-full"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </div>
          <div className="lg:col-span-7">
            <ul className="grid gap-5 sm:grid-cols-2">
              {TENDER.highlights.map((item) => (
                <li key={item.title} className="border border-line bg-slate-50 p-6">
                  <h2 className="font-display text-lg font-bold text-blue-900">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-slate-50">
        <Container className="section-y">
          <p className="eyebrow">How tender support works</p>
          <h2 className="display-title mt-4 text-display-md">
            From package brief to bid-ready documentation.
          </h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {TENDER.steps.map((step) => (
              <li key={step.number} className="border border-line bg-white p-6">
                <p className="font-mono text-sm text-dusky-red">{step.number}</p>
                <h3 className="mt-2 font-display text-xl font-bold text-blue-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <SiteImageView
              image={IMAGES.tenderSupport}
              className="media-frame aspect-[21/9] w-full"
              fill
              sizes="100vw"
            />
          </div>
        </Container>
      </section>

      <section className="bg-blue-900 text-white">
        <Container className="section-y">
          <h2 className="font-display text-display-md text-white">
            {TENDER.cta.title}
          </h2>
          <p className="mt-4 max-w-measure text-white/75">{TENDER.cta.body}</p>
          <div className="mt-8">
            <ButtonLink href={TENDER.cta.href} variant="primary">
              {TENDER.cta.label}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
