import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SiteImageView } from "@/components/ui/SiteImageView";
import { FAQS } from "@/content/faqs";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
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
                <summary className="cursor-pointer list-none px-5 py-4 font-medium text-blue-900 marker:content-none">
                  {faq.question}
                </summary>
                <p className="border-t border-line px-5 py-4 text-sm leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
