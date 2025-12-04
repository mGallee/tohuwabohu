import Link from 'next/link';

export default function Imprint() {
  return (
    <div className="flex flex-1 flex-col justify-center gap-16 py-8 md:gap-32 md:py-16">
      <section className="flex flex-col gap-8 md:gap-16">
        <h1 className="text-center text-6xl md:text-8xl">Imprint</h1>
        <div className="flex flex-col gap-6 rounded-xl border-2 border-stone-50 bg-slate-900 p-4 font-mono">
          <p>TOHUWABOHU Kultur- und Musikverein</p>
          <div className="flex flex-col">
            <address className="not-italic">
              Marktgasse 6/1/22-23
              <br />
              1090 Wien
              <br />
              Österreich
            </address>
          </div>
          <div>
            <div>ZVR:</div>
            <div>1870005453</div>
          </div>
          <div>
            <div>Email:</div>
            <div>
              <Link className="underline" href="mailto:team@tohuwabohu.wien">
                team@tohuwabohu.wien
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
