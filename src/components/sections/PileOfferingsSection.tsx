import { Container } from "@/components/ui/Container";
import { PileOfferingIcon } from "@/components/ui/PileOfferingIcon";
import { PILE_OFFERINGS } from "@/content/pile-offerings";

export function PileOfferingsSection() {
  return (
    <section className="border-t border-line bg-blue-100/30">
      <Container className="section-y">
        <div className="max-w-2xl">
          <p className="eyebrow">Pile expertise</p>
          <h2 className="display-title mt-3 text-display-md">
            Pile load testing services
          </h2>
          <p className="mt-4 text-muted">
            Plate, pull-out, lateral, dynamic, and static load tests — field
            verification and clear reports for foundation design and acceptance.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PILE_OFFERINGS.map((offering) => (
            <li
              key={offering.id}
              className="flex flex-col border border-line bg-white p-6 md:p-7"
            >
              <PileOfferingIcon
                name={offering.icon}
                className="h-11 w-11 text-blue-900"
              />
              <h3 className="mt-5 font-display text-xl font-bold text-blue-900">
                {offering.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {offering.description}
              </p>

              {offering.sizes && offering.sizes.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {offering.sizes.map((size) => (
                    <li
                      key={size}
                      className="rounded-sm bg-blue-100 px-2.5 py-1 font-mono text-[0.7rem] font-medium tracking-wide text-blue-900"
                    >
                      {size}
                    </li>
                  ))}
                </ul>
              ) : null}

              <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                {offering.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-2.5 text-sm leading-snug text-ink/85"
                  >
                    <span
                      className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center text-dusky-red"
                      aria-hidden
                    >
                      <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                        <path
                          d="M3.5 8.5 6.5 11.5 12.5 4.5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
