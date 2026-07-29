import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { HOME_COPY } from "@/content/copy";
import { IMAGES } from "@/lib/images";

export function AboutUsScrollSection() {
  const copy = HOME_COPY.aboutUs;

  return (
    <section id="about-us" className="relative overflow-hidden bg-dusky-red-soft">
      <Container className="section-y">
        <div className="grid w-full items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden border border-dusky-red/20 bg-blue-900/5 lg:mx-0 lg:max-w-none">
              <Image
                src={IMAGES.founder.src}
                alt={IMAGES.founder.alt}
                fill
                sizes="(max-width: 1024px) 90vw, 36vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div>
              <p className="eyebrow-accent">{copy.eyebrow}</p>
              <h2 className="display-title mt-4 text-display-lg">{copy.title}</h2>
              <span
                className="mt-6 block h-1 w-24 bg-dusky-red"
                aria-hidden
              />
            </div>

            <p className="mt-8 font-display text-lg font-semibold text-blue-900 md:text-xl">
              {copy.leadership}
            </p>

            {copy.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-5 max-w-measure text-base leading-relaxed text-ink/80 md:text-lg"
              >
                {paragraph}
              </p>
            ))}

            <blockquote className="mt-10 border-l-2 border-dusky-red pl-5">
              <p className="font-display text-lg leading-snug text-blue-900 md:text-xl">
                “{copy.quote}”
              </p>
              <footer className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted">
                — {copy.quoteAttribution}
              </footer>
            </blockquote>
          </div>
        </div>
      </Container>
    </section>
  );
}
