import SoundCloudPlayer from '@/components/SoundCloudPlayer';
import Image from 'next/image';
import { ARTISTS_DATA } from '@/constants/artist';
import { notFound } from 'next/navigation';
import Button from '@/components/Button';
import { Metadata, ResolvingMetadata } from 'next';

interface ArtistPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: ArtistPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const artist = ARTISTS_DATA.find(
    (value) => value.slug.toLowerCase() === slug.toLowerCase(),
  );

  if (artist === undefined) {
    notFound();
  }

  const parentMetadata = await parent;
  const parentOpenGraph = parentMetadata.openGraph || {};

  const title = `${artist.name}`;
  const description = artist.description;

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

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { slug } = await params;
  const artist = ARTISTS_DATA.find(
    (value) => value.slug.toLowerCase() === slug.toLowerCase(),
  );

  if (artist === undefined) {
    notFound();
  }

  return (
    <section className="flex flex-col items-center gap-8 md:gap-16">
      <Image
        className="aspect-square h-[220] w-[220] rounded-full border-2 border-stone-50 md:h-[300] md:w-[300]"
        src={artist.profilePicture}
        alt={`Profile picture of ${artist.name}`}
        draggable={false}
        preload
        loading="eager"
      />
      <h1 className="text-center text-6xl md:text-8xl">{artist.name}</h1>
      <p className="text-center text-2xl text-balance whitespace-pre-wrap md:text-4xl">
        {artist.description}
      </p>
      <div className="flex flex-col items-center gap-2 self-stretch md:gap-4">
        <SoundCloudPlayer
          url={`https://api.soundcloud.com/tracks/soundcloud:tracks:${artist.soundCloud.trackId}`}
          title={`Soundcloud: ${artist.name}`}
        />
        <Button
          as="a"
          href={`https://soundcloud.com/${artist.soundCloud.username}`}
          target="_blank"
          variant="text">
          Visit SoundCloud
        </Button>
      </div>
    </section>
  );
}
