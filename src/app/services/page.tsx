import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SiteImageView } from "@/components/ui/SiteImageView";
import { SERVICES } from "@/content/services";
import { SERVICE_IMAGE_BY_SLUG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Civil materials testing, geotech, pile testing, highway analysis, and NDT.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Services"
        description="Laboratory and field expertise for civil infrastructure — materials, geotech, pile testing, highway analysis, and NDT."
      />
      <section className="bg-white">
        <Container className="section-y">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, index) => {
              const image = SERVICE_IMAGE_BY_SLUG[service.slug];
              const featured = "featured" in service && service.featured;
              return (
                <li
                  key={service.slug}
                  className="group border border-line bg-white transition-[border-color,transform] duration-hover hover:-translate-y-1 hover:border-blue-700/30"
                >
                  <Link href={`/services/${service.slug}`} className="block">
                    {image ? (
                      <SiteImageView
                        image={image}
                        className="media-frame aspect-[16/10] w-full"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : null}
                    <div className="p-6 md:p-7">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-[0.65rem] text-muted">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {featured ? (
                          <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-dusky-red">
                            Focus
                          </span>
                        ) : null}
                      </div>
                      <h2 className="mt-3 font-display text-xl font-bold text-blue-900">
                        {service.title}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {service.shortDescription}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-700 transition-colors duration-hover group-hover:text-dusky-red">
                        View details
                        <span aria-hidden>→</span>
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </>
  );
}
