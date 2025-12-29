import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
  _props: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentMetadata = await parent;
  const parentOpenGraph = parentMetadata.openGraph || {};

  const title = 'Imprint';

  return {
    title,
    openGraph: {
      ...parentOpenGraph,
      title,
    },
  };
}

export default function ImprintPage() {
  return (
    <section className="flex flex-col gap-12 md:gap-24">
      <h1 className="text-center text-6xl md:text-8xl">Imprint</h1>
      <div className="flex flex-col gap-8 rounded-xl border-2 bg-black/50 p-4 text-lg md:text-xl">
        <address className="flex flex-col not-italic">
          <div className="font-medium">TOHUWABOHU Kultur- und Musikverein</div>
          <div>Marktgasse 6/1/22-23</div>
          <div>1090 Wien</div>
          <div>Österreich</div>
        </address>
        <div className="flex flex-col">
          <div className="font-medium">ZVR:</div>
          <div>1870005453</div>
        </div>
        <div className="flex flex-col">
          <div className="font-medium">Email:</div>
          <div>
            <Link className="underline" href="mailto:team@tohuwabohu.wien">
              team@tohuwabohu.wien
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
