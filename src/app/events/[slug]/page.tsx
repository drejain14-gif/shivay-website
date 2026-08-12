import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { EventsGallery } from "@/components/sections/EventsGallery";
import { EVENTS, getEventBySlug } from "@/content/events";

type EventPageProps = Readonly<{
  params: { slug: string };
}>;

export function generateStaticParams() {
  return EVENTS.map((event) => ({ slug: event.slug }));
}

export function generateMetadata({ params }: EventPageProps): Metadata {
  const event = getEventBySlug(params.slug);
  if (!event) {
    return { title: "Event" };
  }
  return {
    title: `${event.name} — ${event.location}`,
    description: `Photos from ${event.name}, ${event.location} (${event.date}) — Shivaay Technocrat Service.`,
  };
}

export default function EventDetailPage({ params }: EventPageProps) {
  const event = getEventBySlug(params.slug);
  if (!event) {
    notFound();
  }

  return (
    <>
      <section className="relative flex min-h-[24rem] items-end overflow-hidden bg-blue-900 text-white md:min-h-[36rem]">
        <Image
          src={event.cover.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/88 to-blue-900/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-blue-900/30" />
        <Container className="relative z-10 w-full pb-10 pt-28 md:pb-14 md:pt-32">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white"
          >
            <span aria-hidden>←</span>
            All events
          </Link>
          <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/55">
            {event.location} · {event.date}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-display-lg text-white">
            {event.name}
          </h1>
          <div className="mt-5 h-1 w-14 bg-dusky-red" aria-hidden />
        </Container>
      </section>

      <section className="bg-white">
        <Container className="section-y">
          <EventsGallery items={event.images} />
        </Container>
      </section>
    </>
  );
}
