import { Metadata, ResolvingMetadata } from 'next';
import EventListItem from '@/components/EventListItem';
import { getPayload } from 'payload';
import config from '@payload-config';

export const revalidate = 21600;

export async function generateMetadata(
  _props: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentMetadata = await parent;
  const parentOpenGraph = parentMetadata.openGraph || {};

  const title = 'Events';
  const description =
    'Every gathering tells its own story. Sound, light, and atmosphere turn moments into something collective.';

  return {
    title,
    description,
    keywords: [
      ...(parentMetadata.keywords || []),
      'Tohuwabohu events Wien',
      'upcoming music events Vienna',
      'upcoming events Wien',
      'Technoid edition',
      'Psychedelic edition',
    ],
    openGraph: {
      ...parentOpenGraph,
      title,
      description,
    },
  };
}

export default async function EventsPage() {
  const payload = await getPayload({ config });
  const upcomingEvents = await payload.find({
    collection: 'events',
    where: {
      endDate: {
        greater_than: new Date().toISOString(),
      },
    },
    sort: 'startDate',
    depth: 1,
    limit: 0,
  });
  const pastEvents = await payload.find({
    collection: 'events',
    where: {
      endDate: {
        less_than: new Date().toISOString(),
      },
    },
    sort: '-startDate',
    depth: 1,
    limit: 0,
  });

  return (
    <section className="flex flex-col gap-12 md:gap-24">
      <div className="flex flex-col items-center gap-8 md:gap-16">
        <h1 className="text-center text-6xl md:text-8xl">Events</h1>
        <p className="text-center text-2xl text-balance md:text-4xl">
          Every gathering tells its own story.
          <br />
          Sound, light, and atmosphere turn moments into something collective.
        </p>
      </div>
      <h2 className="text-center text-4xl md:text-6xl">Upcoming Events</h2>
      {upcomingEvents.docs.length > 0 ? (
        upcomingEvents.docs.map((event) => (
          <EventListItem key={`UPCOMING_EVENT_${event.slug}`} event={event} />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed bg-black/50 p-8 md:gap-8 md:p-16">
          <h3 className="text-center text-2xl md:text-4xl">
            We don&#39;t have any upcoming events announced just yet!
          </h3>
          <p className="text-center text-xl text-stone-300 md:text-2xl">
            We&#39;re planning what&#39;s next. Stay tuned for upcoming events
            and announcements.
          </p>
        </div>
      )}
      {pastEvents.docs.length > 0 ? (
        <>
          <h2 className="text-center text-4xl md:text-6xl">Past Events</h2>
          {pastEvents.docs.map((event) => (
            <EventListItem
              className="brightness-75"
              key={`PAST_EVENT_${event.slug}`}
              event={event}
            />
          ))}
        </>
      ) : null}
    </section>
  );
}
