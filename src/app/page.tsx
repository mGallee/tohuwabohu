import Button from '@/components/Button';
import Artist from '@/components/Artist';

export default function Home() {
  return (
    <div className="flex flex-1 flex-col justify-center gap-16 md:gap-32">
      <section className="flex flex-col gap-8 md:gap-16">
        <h1 className="animate-glow my-2 text-center text-6xl md:text-8xl">
          Tohuwabohu
        </h1>
        <p className="text-center text-2xl text-balance md:text-4xl">
          Safe*r space thanks to our awareness team
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row md:gap-8">
          <Button as="a" variant="outlined" href="mailto:team@tohuwabohu.wien">
            Booking requests
          </Button>
          <Button
            as="a"
            variant="filled"
            href="https://www.facebook.com/tohuwabohu.vienna/events"
            target="_blank">
            Upcoming events
          </Button>
        </div>
      </section>
      <section className="flex flex-col gap-8 md:gap-16">
        <h2 className="my-1 text-center text-4xl md:text-6xl">Artists</h2>
        <Artist artist="angiko" />
        <Artist artist="neoom" />
        <Artist artist="stoik" />
        <Artist artist="fullgas" />
        <Artist artist="bonobros" />
        <Artist artist="remnant" />
      </section>
    </div>
  );
}
