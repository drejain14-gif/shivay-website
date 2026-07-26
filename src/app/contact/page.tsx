import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SiteImageView } from "@/components/ui/SiteImageView";
import { SITE, getMailtoHref, getTelHref, getWhatsAppHref } from "@/content/site";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${SITE.name} in Jaipur for laboratory testing and investigation quotes.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Request a test quote"
        description="Share your project type, location, and required tests. We respond during business hours."
      />
      <section className="bg-white">
        <Container className="section-y grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SiteImageView
              image={IMAGES.contactMedia}
              className="media-frame aspect-[4/5] w-full"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="mt-8 space-y-3 text-sm text-ink">
              <p>{SITE.address.full}</p>
              <p>
                <a className="text-blue-700" href={getTelHref()}>
                  {SITE.phone}
                </a>
                {" · "}
                <a className="text-blue-700" href={getTelHref(SITE.phoneSecondary)}>
                  {SITE.phoneSecondary}
                </a>
              </p>
              <p>
                <a className="text-blue-700" href={getMailtoHref()}>
                  {SITE.email}
                </a>
              </p>
              <p className="text-muted">{SITE.openingHoursDisplay}</p>
              <p>
                <a
                  className="inline-flex min-h-11 items-center rounded-sm bg-dusky-red px-4 py-2 text-white"
                  href={getWhatsAppHref()}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp inquiry
                </a>
              </p>
            </div>
          </div>
          <form className="space-y-4 rounded-sm border border-line bg-slate-50 p-6 lg:col-span-7">
            <label className="block text-sm">
              Name
              <input
                name="name"
                required
                className="mt-1 w-full border border-line bg-white px-3 py-2"
              />
            </label>
            <label className="block text-sm">
              Email
              <input
                type="email"
                name="email"
                required
                className="mt-1 w-full border border-line bg-white px-3 py-2"
              />
            </label>
            <label className="block text-sm">
              Phone
              <input
                type="tel"
                name="phone"
                className="mt-1 w-full border border-line bg-white px-3 py-2"
              />
            </label>
            <label className="block text-sm">
              Service interest
              <select
                name="service"
                className="mt-1 w-full border border-line bg-white px-3 py-2"
                defaultValue=""
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option>Civil Materials Testing</option>
                <option>Geotech & Soil Testing</option>
                <option>Pile Testing</option>
                <option>Highway Infrastructure</option>
                <option>NDT</option>
                <option>Tender Consultation</option>
                <option>Tender & EPC Support</option>
              </select>
            </label>
            <label className="block text-sm">
              Message
              <textarea
                name="message"
                rows={4}
                className="mt-1 w-full border border-line bg-white px-3 py-2"
              />
            </label>
            <p className="text-xs text-muted">
              Form wiring to email/CRM is Phase 2 — for now use phone, email, or
              WhatsApp above.
            </p>
            <button
              type="button"
              className="min-h-11 rounded-sm bg-dusky-red px-5 py-3 text-sm font-medium text-white"
            >
              Send message
            </button>
          </form>
        </Container>
      </section>
    </>
  );
}
