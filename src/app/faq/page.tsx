import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SiteImageView } from "@/components/ui/SiteImageView";
import { FAQS } from "@/content/faqs";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { SITE, getTelHref } from "@/content/site";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Shivaay Technocrat Service.",
};

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Have any questions?"
        description="Answers about our laboratory, accreditations, location, and how to request a quote."
      />
      <JsonLdScript data={faqJsonLd} />
      <section className="bg-white">
        <Container className="section-y grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SiteImageView
              image={IMAGES.faqMedia}
              className="media-frame aspect-[4/5] w-full"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>
          <div className="space-y-4 lg:col-span-8">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group border border-line bg-slate-50 open:bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium text-blue-900 marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusky-red">
                  <span>{faq.question}</span>
                  <span
                    className="font-mono text-lg text-dusky-red transition group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p className="border-t border-line px-5 py-4 text-sm leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </details>
            ))}

            <div className="mt-10 border border-line bg-blue-100/50 p-6 md:p-8">
              <h2 className="font-display text-xl font-bold text-blue-900">
                Still need a quote?
              </h2>
              <p className="mt-2 text-sm text-muted">
                Tell us about your tests or site investigation — we respond
                during business hours.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-11 items-center rounded-sm bg-dusky-red px-5 py-2 text-sm font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusky-red"
                >
                  Contact us
                </Link>
                <a
                  href={getTelHref()}
                  className="inline-flex min-h-11 items-center rounded-sm border border-blue-900/15 bg-white px-5 py-2 text-sm font-medium text-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusky-red"
                >
                  Call {SITE.phone}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
