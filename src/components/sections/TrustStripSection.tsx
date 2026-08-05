"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { ScrubWords } from "@/components/motion/ScrubWords";
import { HOME_COPY } from "@/content/copy";

export function TrustStripSection() {
  return (
    <section className="border-b border-line bg-white">
      <Container className="py-8 md:py-10">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <ScrubWords
              as="p"
              text={HOME_COPY.trust.eyebrow}
              className="eyebrow max-w-[14rem]"
            />
            <ul className="flex flex-wrap gap-3">
              {HOME_COPY.trust.items.map((item) => (
                <li key={item} className="trust-chip">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-dusky-red"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
