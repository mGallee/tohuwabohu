import Button from '@/components/Button';
import Artist from '@/components/Artist';
import Event from '@/components/Event';
import { ARTISTS_DATA } from '@/constants/artist';
import { EVENTS_DATA } from '@/constants/event';

export default function Home() {
  const UPCOMING_EVENTS_DATA = EVENTS_DATA.filter(
    (event) => event.endDate.getTime() - new Date().getTime() > 0,
  ).sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  return (
    <div className="flex flex-1 flex-col justify-center gap-16 py-8 md:gap-32 md:py-16">
      <section className="flex flex-col gap-8 md:gap-16">
        <h1 className="animate-text-glow text-center text-6xl md:text-8xl">
          Tohuwabohu
        </h1>
        <p className="text-center text-2xl text-balance md:text-4xl">
          Safe*r space thanks to our awareness team
        </p>
      </section>
      {UPCOMING_EVENTS_DATA.length > 0 ? (
        <section className="flex flex-col gap-8 md:gap-16">
          <h2 className="text-center text-4xl md:text-6xl">{`Upcoming event${UPCOMING_EVENTS_DATA.length > 1 ? 's' : ''}`}</h2>
          {UPCOMING_EVENTS_DATA.map((event) => (
            <Event
              key={`${event.title}_${event.startDate.toISOString()}`}
              event={event}
            />
          ))}
        </section>
      ) : null}
      <section className="flex flex-col gap-8 md:gap-16">
        <h2 className="text-center text-4xl md:text-6xl">Artists</h2>
        {ARTISTS_DATA.map((artist) => (
          <Artist key={artist.name} artist={artist} />
        ))}
      </section>
      <section className="flex flex-col items-center gap-4 md:gap-8">
        <p className="text-center text-2xl text-balance md:text-4xl">
          Interested in collaborating with us?
        </p>
        <Button as="a" variant="outlined" href="mailto:team@tohuwabohu.wien">
          Say hello to the team
        </Button>
      </section>
    </div>
  );
}
