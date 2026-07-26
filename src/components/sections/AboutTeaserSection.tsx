import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SiteImageView } from "@/components/ui/SiteImageView";
import { Reveal } from "@/components/motion/Reveal";
import { HOME_COPY } from "@/content/copy";
import { IMAGES } from "@/lib/images";

export function AboutTeaserSection() {
  const copy = HOME_COPY.about;

  return (
    <section className="bg-white">
      <Container className="section-y grid items-center gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <SiteImageView
            image={IMAGES.aboutField}
            className="media-frame aspect-[4/5] w-full"
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
        </Reveal>
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 className="display-title mt-4 text-display-lg">{copy.title}</h2>
            <p className="lede mt-6">{copy.body}</p>
            <p className="mt-6 font-medium text-blue-900">{copy.founderLine}</p>
            <div className="mt-8">
              <ButtonLink href={copy.cta.href} variant="ghost">
                {copy.cta.label}
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <blockquote className="mt-10 border-l-[3px] border-dusky-red bg-blue-100/60 p-8 md:p-10">
              <p className="font-display text-xl font-semibold leading-snug text-blue-900 md:text-2xl">
                “{copy.visionQuote}”
              </p>
              <footer className="mt-5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                Vision
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
