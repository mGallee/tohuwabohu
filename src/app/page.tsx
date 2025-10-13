import Button from '@/components/Button';

export default function Home() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-8 text-center md:gap-16">
      <h1 className="animate-glow my-2 text-6xl md:text-8xl">Tohuwabohu</h1>
      <p className="text-2xl text-balance md:text-4xl">
        Safe*r space thanks to our awareness team
      </p>
      <div className="flex flex-col gap-4 sm:flex-row md:gap-8">
        <Button as="a" variant="outlined" href="mailto:team@tohuwabohu.wien">
          Booking requests
        </Button>
        <Button
          as="a"
          variant="filled"
          href="https://linktr.ee/tohuwabohu.vienna"
          target="_blank">
          Upcoming events
        </Button>
      </div>
    </section>
  );
}
