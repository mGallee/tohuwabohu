import { Clock10, MapPin, Ticket, TicketPercent } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getGoogleMapsUrlForEventLocation } from '@/utils/helper';
import { Metadata, ResolvingMetadata } from 'next';
import { generateEventJsonLd } from '@/utils/jsonLd';
import Link from '@/components/Link';
import JsonLd from '@/components/JsonLd';
import { getPayload } from 'payload';
import config from '@payload-config';

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: EventPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const events = await payload.find({
    collection: 'events',
    where: {
      slug: {
        equals: slug.toLowerCase(),
      },
    },
    depth: 1,
    limit: 1,
  });

  if (events.docs.length === 0) {
    notFound();
  }

  const event = events.docs[0];

  const parentMetadata = await parent;
  const parentOpenGraph = parentMetadata.openGraph || {};

  const title = `${event.title}`;
  const description =
    event.description.length > 150
      ? `${event.description.slice(0, 150)}...`
      : event.description;

  return {
    title,
    description,
    keywords: [
      ...(parentMetadata.keywords || []),
      'Tohuwabohu events Wien',
      `${event.title} at ${event.location.name} on ${event.startDate}`.replace(
        ',',
        '',
      ),
      ...(event.lineup?.map((slot) => slot.artist) || []),
    ],
    openGraph: {
      ...parentOpenGraph,
      title,
      description,
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const events = await payload.find({
    collection: 'events',
    where: {
      slug: {
        equals: slug.toLowerCase(),
      },
    },
    depth: 1,
    limit: 1,
  });

  if (events.docs.length === 0) {
    notFound();
  }

  const event = events.docs[0];

  return (
    <section className="flex flex-col gap-8 md:gap-16">
      <JsonLd data={generateEventJsonLd(event)} />
      <h1 className="text-center text-6xl md:text-8xl">{event.title}</h1>
      <div className="flex flex-col gap-6 rounded-xl border-2 bg-black/50 p-2 text-xl md:p-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <Clock10 size={28} />
            <time className="flex">
              {`${new Date(event.startDate).toLocaleString('de-AT', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })} - ${new Date(event.endDate).toLocaleString('de-AT', {
                hour: 'numeric',
                minute: 'numeric',
              })}`}
            </time>
          </div>
          <div className="flex flex-row gap-2">
            <MapPin size={28} />
            <Link
              href={getGoogleMapsUrlForEventLocation(event.location)}
              target="_blank">
              <address className="flex not-italic">{`${event.location.name} | ${event.location.address.street}, ${event.location.address.city}`}</address>
            </Link>
          </div>
          <div className="flex flex-row gap-2">
            <Ticket size={28} />
            <div className="flex">{`Entry fee: ${event.price}€`}</div>
          </div>
          <div className="flex flex-row gap-2">
            <TicketPercent size={28} />
            <div className="flex">{`Entry fee before midnight: ${event.beforeMidnightPrice}€`}</div>
          </div>
        </div>
        <p className="whitespace-pre-wrap">{event.description}</p>
        {event.lineup && event.lineup.length > 0 ? (
          <div className="flex flex-col gap-2">
            <div className="font-medium">Lineup</div>
            {event.lineup.map((slot, index, array) => {
              const nextSlot = array[index + 1];
              const endTime = nextSlot
                ? nextSlot.startTime
                : new Date(event.endDate).toLocaleTimeString('de-AT', {
                    hour: 'numeric',
                    minute: 'numeric',
                  });
              return (
                <div
                  key={`${slot.startTime}__${slot.artist}`}
                  className="flex flex-row gap-2">
                  <div className="flex flex-nowrap">{`${slot.startTime} - ${endTime}`}</div>
                  <div className="flex flex-1 flex-wrap">{slot.artist}</div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        {typeof event.flyer.front === 'object' &&
        event.flyer.front.url &&
        event.flyer.front.width &&
        event.flyer.front.height ? (
          <div className="flex flex-1">
            <Image
              className="w-full rounded-xl border-2 border-stone-50"
              src={event.flyer.front.url}
              width={event.flyer.front.width}
              height={event.flyer.front.height}
              alt={`Flyer of ${event.title}`}
              draggable={false}
            />
          </div>
        ) : null}
        {event.flyer.back &&
        typeof event.flyer.back === 'object' &&
        event.flyer.back.url &&
        event.flyer.back.width &&
        event.flyer.back.height ? (
          <div className="flex flex-1">
            <Image
              className="w-full rounded-xl border-2 border-stone-50"
              src={event.flyer.back.url}
              width={event.flyer.back.width}
              height={event.flyer.back.height}
              alt={`Lineup of ${event.title}`}
              draggable={false}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
