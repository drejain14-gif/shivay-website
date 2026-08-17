import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { ScrubWords } from "@/components/motion/ScrubWords";
import { HOME_COPY } from "@/content/copy";
import { SITE, getTelHref, getWhatsAppHref } from "@/content/site";

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
          <div className="max-w-3xl">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/50">
              Next step
            </p>
            <ScrubWords
              as="h2"
              text={copy.title}
              className="mt-4 font-display text-display-lg text-white"
              fromOpacity={0.28}
            />
            <p className="mt-5 max-w-measure text-white/75">{copy.body}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={getWhatsAppHref()} variant="primary" external>
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
          <p className="mt-12 border-t border-white/15 pt-6 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/45">
            {SITE.openingHoursDisplay}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
