export default function Home() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-8 text-center md:gap-16">
      <h1 className="animate-glow my-4 text-6xl md:text-8xl">Tohuwabohu</h1>
      <p className="text-2xl md:text-4xl">
        Safe*r space thanks to our awareness team
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <a
          className="hover:animate-glow active:animate-glow rounded-xl border-2 border-stone-50 bg-transparent px-4 py-2 pb-4 text-2xl leading-none transition-all active:border-stone-100 active:text-stone-100 md:text-4xl md:leading-none"
          href="mailto:team@tohuwabohu.wien">
          Booking requests
        </a>
        <a
          className="hover:animate-glow active:animate-glow rounded-xl border-2 border-stone-50 bg-stone-50 px-4 py-2 pb-4 text-2xl leading-none text-black transition-all active:border-stone-100 active:bg-stone-100 md:text-4xl md:leading-none"
          href="https://linktr.ee/tohuwabohu.vienna"
          target="_blank">
          Upcoming events
        </a>
      </div>
    </section>
  );
}
