import { Metadata, ResolvingMetadata } from 'next';
import { EVENTS_DATA } from '@/constants/event';
import EventListItem from '@/components/EventListItem';

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
    openGraph: {
      ...parentOpenGraph,
      title,
      description,
    },
  };
}

export default function EventsPage() {
  const UPCOMING_EVENTS_DATA = EVENTS_DATA.filter(
    (event) => event.endDate.getTime() - new Date().getTime() > 0,
  ).sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  const PAST_EVENTS_DATA = EVENTS_DATA.filter(
    (event) => event.endDate.getTime() - new Date().getTime() <= 0,
  ).sort((a, b) => b.startDate.getTime() - a.startDate.getTime());

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
      {UPCOMING_EVENTS_DATA.length > 0 ? (
        UPCOMING_EVENTS_DATA.map((event) => (
          <EventListItem
            key={`UPCOMING_EVENT_${event.title}_${event.startDate.toISOString()}_${event.endDate.toISOString()}`}
            event={event}
          />
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
      {PAST_EVENTS_DATA.length > 0 ? (
        <>
          <h2 className="text-center text-4xl md:text-6xl">Past Events</h2>
          {PAST_EVENTS_DATA.map((event) => (
            <EventListItem
              className="brightness-75"
              key={`PAST_EVENT_${event.title}_${event.startDate.toISOString()}_${event.endDate.toISOString()}`}
              event={event}
            />
          ))}
        </>
      ) : null}
    </section>
  );
}
