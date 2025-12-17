import SoundCloudPlayer from '@/components/SoundCloudPlayer';
import Image from 'next/image';
import { ARTISTS_DATA } from '@/constants/artist';
import { notFound } from 'next/navigation';
import Button from '@/components/Button';
import { Metadata } from 'next';

interface ArtistPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ArtistPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artist = ARTISTS_DATA.find(
    (value) => value.slug.toLowerCase() === slug.toLowerCase(),
  );

  if (artist === undefined) {
    notFound();
  }

  return {
    title: `${artist.name} - Tohuwabohu | Kultur- und Musikverein`,
    description: artist.description,
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
    <div className="flex flex-1 flex-col justify-center gap-16 py-8 md:gap-32 md:py-16">
      <section className="flex flex-col items-center gap-8 md:gap-16">
        <Image
          className="aspect-square h-[200] w-[200] rounded-full border-2 border-stone-50 md:h-[300] md:w-[300]"
          src={`/images/artists/${artist.profilePicture}`}
          alt={`Profile picture of ${artist.name}`}
          width={300}
          height={300}
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
        <Button as="a" href="/" variant="outlined">
          Go to Homepage
        </Button>
      </section>
    </div>
  );
}
