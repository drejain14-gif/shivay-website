import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SiteImageView } from "@/components/ui/SiteImageView";
import { SERVICES } from "@/content/services";
import { SERVICE_ICON_BY_SLUG, SERVICE_IMAGE_BY_SLUG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Civil materials testing, geotech, pile testing, highway analysis, NDT, and EPC consultancy.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Capabilities"
        description="Laboratory and field expertise for civil infrastructure — materials, geotech, pile testing, highway analysis, NDT, and tender / EPC support."
      />
      <section className="bg-white">
        <Container className="section-y">
          <ul className="space-y-14">
            {SERVICES.map((service, index) => {
              const image = SERVICE_IMAGE_BY_SLUG[service.slug];
              const icon = SERVICE_ICON_BY_SLUG[service.slug];
              const reverse = index % 2 === 1;
              return (
                <li
                  key={service.slug}
                  id={service.slug}
                  className="scroll-mt-28 grid items-center gap-8 md:grid-cols-2"
                >
                  {image ? (
                    <SiteImageView
                      image={image}
                      className={`media-frame aspect-[16/11] w-full ${reverse ? "md:order-2" : ""}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : null}
                  <div className={reverse ? "md:order-1" : undefined}>
                    {icon ? (
                      <Image
                        src={icon}
                        alt=""
                        width={40}
                        height={40}
                        className="h-10 w-10"
                      />
                    ) : null}
                    <h2 className="mt-3 font-display text-2xl font-bold text-blue-900">
                      {service.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-muted">{service.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </>
  );
}
