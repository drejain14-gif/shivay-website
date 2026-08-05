import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { RequestQuoteButton } from "@/components/quote/RequestQuoteButton";
import { SiteImageView } from "@/components/ui/SiteImageView";
import {
  SERVICES,
  getRelatedServices,
  getServiceBySlug,
} from "@/content/services";
import { MATERIALS_TEST_CATEGORIES } from "@/content/materials-tests";
import { GEOTECH_TEST_CATEGORIES } from "@/content/geotech-tests";
import { ENGINEERING_SERVICE_CATEGORIES } from "@/content/engineering-services";
import { NDT_TEST_CATEGORIES } from "@/content/ndt-tests";
import { PileOfferingsSection } from "@/components/sections/PileOfferingsSection";
import {
  SERVICE_ICON_BY_SLUG,
  SERVICE_IMAGE_BY_SLUG,
} from "@/lib/images";

const TEST_SCOPE_BY_SLUG: Record<
  string,
  {
    eyebrow: string;
    title: string;
    description: string;
    categories: ReadonlyArray<{
      category: string;
      tests: ReadonlyArray<string>;
    }>;
  }
> = {
  "materials-testing": {
    eyebrow: "NABL mechanical scope",
    title: "Tests by material category",
    description:
      "Recommended scope of testing for our mechanical laboratory — organised by product / material tested.",
    categories: MATERIALS_TEST_CATEGORIES,
  },
  "geotech-soil": {
    eyebrow: "NABL mechanical scope · Group-2",
    title: "Tests by soil & rock category",
    description:
      "Recommended scope of testing for soil and rock — organised by product / material tested.",
    categories: GEOTECH_TEST_CATEGORIES,
  },
  "engineering-consultancy": {
    eyebrow: "Our capabilities",
    title: "Services by category",
    description:
      "Surveys, consultancy, and field/geophysical investigation — organised by service type.",
    categories: ENGINEERING_SERVICE_CATEGORIES,
  },
  ndt: {
    eyebrow: "Our capabilities",
    title: "Tests we perform",
    description:
      "Non-destructive testing methods used for on-site condition assessment.",
    categories: NDT_TEST_CATEGORIES,
  },
};

type ServicePageProps = Readonly<{
  params: { slug: string };
}>;

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) {
    return { title: "Service" };
  }
  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.slug);
  if (!service) {
    notFound();
  }

  const image = SERVICE_IMAGE_BY_SLUG[service.slug];
  const icon = SERVICE_ICON_BY_SLUG[service.slug];
  const related = getRelatedServices(service.slug);
  const testScope = TEST_SCOPE_BY_SLUG[service.slug];
  const showPileOfferings = service.slug === "pile-testing";

  return (
    <>
      <section className="relative flex min-h-[18rem] items-end overflow-hidden bg-blue-900 text-white md:min-h-[22rem]">
        {image ? (
          <Image
            src={image.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/88 to-blue-900/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-blue-900/30" />
        <Container className="relative z-10 w-full pb-12 pt-28 md:pb-16 md:pt-32">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white"
          >
            <span aria-hidden>←</span>
            All services
          </Link>
          <div className="mt-6 flex items-start gap-4">
            {icon ? (
              <Image
                src={icon}
                alt=""
                width={44}
                height={44}
                className="mt-1 h-11 w-11 brightness-0 invert"
              />
            ) : null}
            <div>
              <h1 className="max-w-3xl font-display text-display-lg text-white">
                {service.title}
              </h1>
              <p className="mt-4 max-w-measure text-base text-white/75 md:text-lg">
                {service.shortDescription}
              </p>
              <div className="mt-5 h-1 w-14 bg-dusky-red" aria-hidden />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="font-display text-2xl font-bold text-blue-900">
              Overview
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink/80 md:text-lg">
              {service.description}
            </p>

            {!showPileOfferings ? (
              <>
                <h3 className="mt-12 font-display text-xl font-bold text-blue-900">
                  {service.slug === "engineering-consultancy"
                    ? "Our consultancy services"
                    : "What we deliver"}
                </h3>
                <ul className="mt-6 space-y-4">
                  {service.highlights.map((item) => (
                    <li key={item} className="flex gap-3 text-base text-ink/80">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 bg-dusky-red"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <div className="mt-12 border-t border-line pt-10">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                Who this is for
              </p>
              <p className="mt-3 max-w-measure text-base leading-relaxed text-ink/80">
                {service.audience}
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <RequestQuoteButton variant="primary" service={service.title}>
                Request quote
              </RequestQuoteButton>
              <ButtonLink href="/services" variant="ghost">
                Back to services
              </ButtonLink>
            </div>
          </div>

          <aside className="lg:col-span-5">
            {image ? (
              <SiteImageView
                image={image}
                className="media-frame aspect-[4/5] w-full"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            ) : null}
          </aside>
        </Container>
      </section>

      {showPileOfferings ? <PileOfferingsSection /> : null}

      {testScope ? (
        <section className="border-t border-line bg-blue-100/30">
          <Container className="section-y">
            <div className="max-w-2xl">
              <p className="eyebrow">{testScope.eyebrow}</p>
              <h2 className="display-title mt-3 text-display-md">
                {testScope.title}
              </h2>
              <p className="mt-4 text-muted">{testScope.description}</p>
            </div>

            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testScope.categories.map((group, index) => (
                <li
                  key={group.category}
                  className="border border-line bg-white p-6 md:p-7"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[0.65rem] text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-lg font-bold text-blue-900">
                      {group.category}
                    </h3>
                  </div>
                  <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                    {group.tests.map((test) => (
                      <li
                        key={test}
                        className="flex gap-3 text-sm leading-snug text-ink/80"
                      >
                        <span
                          className="mt-1.5 h-1 w-1 shrink-0 bg-dusky-red"
                          aria-hidden
                        />
                        {test}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <section className="border-t border-line bg-blue-100/40">
        <Container className="section-y">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">More services</p>
              <h2 className="display-title mt-3 text-display-md">
                Related expertise
              </h2>
            </div>
            <Link
              href="/services"
              className="text-sm font-medium text-blue-700 hover:text-dusky-red"
            >
              View all →
            </Link>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => {
              const relatedImage = SERVICE_IMAGE_BY_SLUG[item.slug];
              return (
                <li
                  key={item.slug}
                  className="group border border-line bg-white transition-[border-color,transform] duration-hover hover:-translate-y-1 hover:border-blue-700/30"
                >
                  <Link href={`/services/${item.slug}`} className="block">
                    {relatedImage ? (
                      <SiteImageView
                        image={relatedImage}
                        className="media-frame aspect-[16/10] w-full"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : null}
                    <div className="p-6">
                      <h3 className="font-display text-lg font-bold text-blue-900">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {item.shortDescription}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-blue-700 transition-colors duration-hover group-hover:text-dusky-red">
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
