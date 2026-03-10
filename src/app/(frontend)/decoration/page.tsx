import Image from 'next/image';
import { Metadata, ResolvingMetadata } from 'next';
import { DECO_IMAGES } from '@/constants/decoration';
import Container from '@/components/Container';

export async function generateMetadata(
  _props: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentMetadata = await parent;
  const parentOpenGraph = parentMetadata.openGraph || {};

  const title = 'Decoration';
  const description =
    'Decoration sets the mood by transforming spaces with visual concepts, lighting, and details that create inviting, immersive environments.';

  return {
    title,
    description,
    keywords: [
      ...(parentMetadata.keywords || []),
      'Colorful decoration',
      'Visuals',
      'Lightmapping',
    ],
    openGraph: {
      ...parentOpenGraph,
      title,
      description,
    },
  };
}

export default function DecorationPage() {
  return (
    <Container
      as="section"
      variant="lg"
      className="flex flex-col gap-12 md:gap-24">
      <div className="flex flex-col items-center gap-8 md:gap-16">
        <h1 className="text-center text-6xl md:text-8xl">Decoration</h1>
        <p className="max-w-4xl text-center text-2xl text-balance md:text-4xl">
          Decoration helps set the mood and brings the space to life.
          <br />
          With thoughtful visual ideas, lighting and carefully placed details,
          venues are shaped into environments that feel inviting and immersive.
        </p>
      </div>
      <div className="z-0 columns-1 gap-4 md:columns-2">
        {DECO_IMAGES.map((image, index) => (
          <Image
            key={image.src}
            className="z-0 mb-4 w-full rounded-xl border-2 border-stone-50"
            src={image}
            alt={`Tohuwabohu event decoration ${index + 1}`}
            draggable={false}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index < 2}
          />
        ))}
      </div>
    </Container>
  );
}
