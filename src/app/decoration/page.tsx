import Image from 'next/image';
import { Metadata, ResolvingMetadata } from 'next';
import DecoIMG1 from '@/assets/decorations/IMG_0640.webp';
import DecoIMG2 from '@/assets/decorations/IMG_0641.webp';
import DecoIMG3 from '@/assets/decorations/IMG_0732.webp';
import DecoIMG4 from '@/assets/decorations/IMG_0788.webp';
import DecoIMG5 from '@/assets/decorations/IMG_7429.webp';
import DecoIMG6 from '@/assets/decorations/IMG_7834.webp';
import DecoIMG7 from '@/assets/decorations/IMG_7843.webp';
import DecoIMG8 from '@/assets/decorations/IMG_4749.webp';
import DecoIMG9 from '@/assets/decorations/IMG_0014.webp';
import DecoIMG10 from '@/assets/decorations/IMG_0024.webp';
import DecoIMG11 from '@/assets/decorations/IMG_0655.webp';
import DecoIMG12 from '@/assets/decorations/IMG_0676.webp';

const DECO_IMAGES = [
  DecoIMG1,
  DecoIMG2,
  DecoIMG3,
  DecoIMG4,
  DecoIMG5,
  DecoIMG6,
  DecoIMG7,
  DecoIMG8,
  DecoIMG9,
  DecoIMG10,
  DecoIMG11,
  DecoIMG12,
];

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
    <section className="flex flex-col gap-12 md:gap-24">
      <div className="flex flex-col items-center gap-8 md:gap-16">
        <h1 className="text-center text-6xl md:text-8xl">Decoration</h1>
        <p className="text-center text-2xl text-balance md:text-4xl">
          Decoration helps set the mood and brings the space to life.
          <br />
          With thoughtful visual ideas, lighting and carefully placed details,
          venues are shaped into environments that feel inviting and immersive.
        </p>
      </div>
      <div className="columns-1 gap-4 md:columns-2">
        {DECO_IMAGES.map((image, index) => (
          <Image
            key={index}
            className="mb-4 w-full rounded-xl border-2 border-stone-50"
            src={image}
            alt="Tohuwabohu event docoration"
            draggable={false}
          />
        ))}
      </div>
    </section>
  );
}
