import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { IMAGES } from "@/lib/images";

type PageHeroProps = Readonly<{
  eyebrow?: string;
  title: string;
  description?: string;
}>;

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[14rem] items-end overflow-hidden bg-blue-900 text-white md:min-h-[18rem]">
      <Image
        src={IMAGES.pageBanner.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/85 to-blue-900/55" />
      <Container className="relative z-10 w-full pb-10 pt-28 md:pb-14 md:pt-32">
        {eyebrow ? (
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/55">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-3 max-w-3xl font-display text-display-lg text-white">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-measure text-base text-white/75 md:text-lg">
            {description}
          </p>
        ) : null}
        <div className="mt-5 h-1 w-14 bg-dusky-red" aria-hidden />
      </Container>
    </section>
  );
}
