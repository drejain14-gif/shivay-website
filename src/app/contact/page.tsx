import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SITE, getTelHref, getWhatsAppHref } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${SITE.name} in Jaipur for laboratory testing and investigation quotes.`,
};

const linkClass =
  "text-blue-700 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusky-red";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Request a test quote"
        description="Message us on WhatsApp or share your project type, location, and required tests below. We respond during business hours."
      />
      <section className="bg-white">
        <Container className="section-y grid gap-12 lg:grid-cols-12">
          <div className="space-y-3 text-sm text-ink lg:col-span-5">
            <p>{SITE.address.full}</p>
            <p>
              <a className={linkClass} href={getTelHref()}>
                {SITE.phone}
              </a>
              {" · "}
              <a className={linkClass} href={getTelHref(SITE.phoneSecondary)}>
                {SITE.phoneSecondary}
              </a>
            </p>
            <p className="text-muted">{SITE.openingHoursDisplay}</p>
            <p>
              <a
                className="inline-flex min-h-11 items-center rounded-sm bg-dusky-red px-4 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusky-red"
                href={getWhatsAppHref()}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp inquiry
              </a>
            </p>
          </div>
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
