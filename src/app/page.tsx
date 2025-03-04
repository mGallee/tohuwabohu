export default function Home() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-8 text-center md:gap-16">
      <h1 className="my-4 animate-glow text-6xl md:text-8xl">Tohuwabohu</h1>
      <p className="text-2xl md:text-4xl">
        Safe*r space thanks to our awareness team
      </p>
      <a
        className="rounded-xl border-2 border-stone-50 px-4 py-2 pb-4 text-2xl leading-none transition-all hover:animate-glow hover:bg-stone-50 hover:text-black active:animate-glow active:bg-stone-50 active:text-black md:text-4xl md:leading-none"
        href="https://linktr.ee/tohuwabohu.vienna"
        target="_blank">
        Upcoming Events
      </a>
    </section>
  );
}
