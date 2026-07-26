import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { HOME_COPY } from "@/content/copy";
import { SITE, getTelHref } from "@/content/site";

export function CtaSection() {
  const copy = HOME_COPY.cta;

  return (
    <section className="relative overflow-hidden bg-blue-900 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #134a8a 0%, transparent 45%), radial-gradient(circle at 80% 80%, #8b3a42 0%, transparent 35%)",
        }}
      />
      <Container className="section-y relative">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/50">
                Next step
              </p>
              <h2 className="mt-4 font-display text-display-lg text-white">
                {copy.title}
              </h2>
              <p className="mt-5 max-w-measure text-white/75">{copy.body}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href={copy.primaryCta.href} variant="primary">
                  {copy.primaryCta.label}
                </ButtonLink>
                <a
                  href={getTelHref()}
                  className="inline-flex min-h-11 items-center justify-center rounded-sm border border-white/70 px-6 py-3 text-sm font-medium text-white transition-[transform,background-color] duration-hover hover:-translate-y-0.5 hover:bg-white/10"
                >
                  {copy.phoneLabel} {SITE.phone}
                </a>
              </div>
            </div>
            <div className="space-y-4 border-t border-white/15 pt-8 text-sm text-white/80 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <p>
                <a
                  className="text-white underline-offset-4 transition-opacity duration-hover hover:underline"
                  href={getTelHref()}
                >
                  {SITE.phone}
                </a>
                <span className="text-white/40"> · </span>
                <a
                  className="text-white underline-offset-4 transition-opacity duration-hover hover:underline"
                  href={getTelHref(SITE.phoneSecondary)}
                >
                  {SITE.phoneSecondary}
                </a>
              </p>
              <p>
                <a
                  className="text-white underline-offset-4 hover:underline"
                  href={`mailto:${SITE.email}`}
                >
                  {SITE.email}
                </a>
              </p>
              <p className="max-w-sm leading-relaxed">{SITE.address.full}</p>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/45">
                {SITE.openingHoursDisplay}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
