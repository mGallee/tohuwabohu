import SoundCloudPlayer from '@/components/SoundCloudPlayer';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { generateArtistJsonLd } from '@/utils/jsonLd';
import JsonLd from '@/components/JsonLd';
import Link from '@/components/Link';
import { getPayload } from 'payload';
import config from '@payload-config';
import Container from '@/components/Container';
import { PayloadImage } from '@/components/PayloadImage';
import {
  getInstagramProfileUrl,
  getResidentAdvisorDJProfileUrl,
  getSoundCloudProfileUrl,
} from '@/utils/helper';

export const revalidate = 60;

interface ArtistPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: ArtistPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const artists = await payload.find({
    collection: 'artists',
    where: {
      slug: {
        equals: slug.toLowerCase(),
      },
    },
    depth: 1,
    limit: 1,
  });

  if (artists.docs.length === 0) {
    notFound();
  }

  const artist = artists.docs[0];

  const parentMetadata = await parent;
  const parentOpenGraph = parentMetadata.openGraph || {};

  const title = `${artist.name}`;
  const description =
    artist.description.length > 150
      ? `${artist.description.slice(0, 150)}...`
      : artist.description;

  return {
    title,
    description,
    keywords: [
      ...(parentMetadata.keywords || []),
      `Tohuwabohu artist ${artist.name}`,
      `Tohuwabohu DJ ${artist.name}`,
    ],
    openGraph: {
      ...parentOpenGraph,
      title,
      description,
    },
  };
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const artists = await payload.find({
    collection: 'artists',
    where: {
      slug: {
        equals: slug.toLowerCase(),
      },
    },
    depth: 1,
    limit: 1,
  });

  if (artists.docs.length === 0) {
    notFound();
  }

  const artist = artists.docs[0];

  return (
    <Container
      as="section"
      className="flex flex-col items-center gap-8 md:gap-16">
      <JsonLd data={generateArtistJsonLd(artist)} />
      <PayloadImage
        className="aspect-square h-[220] w-[220] rounded-full border-2 border-stone-50 md:h-[320] md:w-[320]"
        image={artist.profilePicture}
        alt={`Profile picture of ${artist.name}`}
        draggable={false}
        preload
        loading="eager"
      />
      <h1 className="text-center text-6xl md:text-8xl">{artist.name}</h1>
      <p className="text-center text-2xl text-balance whitespace-pre-wrap md:text-4xl">
        {artist.description}
      </p>
      <SoundCloudPlayer
        url={`https://api.soundcloud.com/tracks/soundcloud:tracks:${artist.soundCloud.trackId}`}
        title={`Soundcloud: ${artist.name}`}
      />
      <div className="flex flex-col items-center gap-2 text-center text-xl md:flex-row md:justify-evenly md:gap-4 md:self-stretch md:text-2xl">
        <Link
          href={getSoundCloudProfileUrl(artist.soundCloud.username)}
          target="_blank">
          SoundCloud
        </Link>
        {artist.instagram?.username && artist.instagram.username.length > 0 ? (
          <Link
            href={getInstagramProfileUrl(artist.instagram.username)}
            target="_blank">
            Instagram
          </Link>
        ) : null}
        {artist.residentAdvisor?.username &&
        artist.residentAdvisor.username.length > 0 ? (
          <Link
            href={getResidentAdvisorDJProfileUrl(
              artist.residentAdvisor.username,
            )}
            target="_blank">
            Resident Advisor
          </Link>
        ) : null}
      </div>
    </Container>
  );
}
