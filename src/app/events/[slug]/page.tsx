import { Clock10, MapPin, Ticket, TicketPercent } from 'lucide-react';
import Image from 'next/image';
import { EVENTS_DATA } from '@/constants/event';
import { notFound } from 'next/navigation';
import {
  formatLineupSlot,
  getEventSlug,
  getGoogleMapsUrlForEventLocation,
} from '@/utils/helper';
import { Metadata, ResolvingMetadata } from 'next';
import { generateEventJsonLd } from '@/utils/jsonLd';
import Link from '@/components/Link';
import JsonLd from '@/components/JsonLd';

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: EventPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const event = EVENTS_DATA.find(
    (value) => getEventSlug(value) === slug.toLowerCase(),
  );

  if (event === undefined || event.type !== 'published') {
    notFound();
  }

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
      `${event.title} at ${event.location} on ${event.startDate.toDateString()}`.replace(
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
  const event = EVENTS_DATA.find(
    (value) => getEventSlug(value) === slug.toLowerCase(),
  );

  if (event === undefined || event.type !== 'published') {
    notFound();
  }

  return (
    <section className="flex flex-col gap-8 md:gap-16">
      <JsonLd data={generateEventJsonLd(event)} />
      <h1 className="text-center text-6xl md:text-8xl">{event.title}</h1>
      <div className="flex flex-col gap-6 rounded-xl border-2 bg-black/50 p-2 text-xl md:p-4">
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center gap-1">
            <Clock10 size={24} />
            <time className="flex">
              {`${event.startDate.toLocaleString('de-AT', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })} - ${event.endDate.toLocaleString('de-AT', {
                hour: 'numeric',
                minute: 'numeric',
              })}`}
            </time>
          </div>
          <div className="flex flex-row items-center gap-1">
            <MapPin size={24} />
            <Link
              href={getGoogleMapsUrlForEventLocation(event.location)}
              target="_blank">
              <address className="flex not-italic">{`${event.location.name} | ${event.location.address.street}, ${event.location.address.city}`}</address>
            </Link>
          </div>
          <div className="flex flex-row items-center gap-1">
            <Ticket size={24} />
            <div className="flex">{`Entry fee: ${event.price}€`}</div>
          </div>
          <div className="flex flex-row items-center gap-1">
            <TicketPercent size={24} />
            <div className="flex">{`Entry fee before midnight: ${event.beforeMidnightPrice}€`}</div>
          </div>
        </div>
        <p className="whitespace-pre-wrap">{event.description}</p>
        {event.lineup ? (
          <div className="flex flex-col gap-1">
            <div className="font-medium">Lineup</div>
            {event.lineup.map((slot, index, array) => {
              const nextSlot = array[index + 1];
              return (
                <div key={slot.artist}>{formatLineupSlot(slot, nextSlot)}</div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex flex-1">
          <Image
            className="w-full rounded-xl border-2 border-stone-50"
            src={event.flyer.front}
            alt={`Flyer of ${event.title}`}
            draggable={false}
          />
        </div>
        {event.flyer.back ? (
          <div className="flex flex-1">
            <Image
              className="w-full rounded-xl border-2 border-stone-50"
              src={event.flyer.back}
              alt={`Lineup of ${event.title}`}
              draggable={false}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
