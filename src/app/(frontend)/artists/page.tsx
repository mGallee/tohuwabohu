import ArtistListItem from '@/components/ArtistListItem';
import { Metadata, ResolvingMetadata } from 'next';
import config from '@payload-config';
import { getPayload } from 'payload';
import Container from '@/components/Container';
import JsonLd from '@/components/JsonLd';
import { generateArtistListJsonLd } from '@/utils/jsonLd';

export const revalidate = 60;

export async function generateMetadata(
  _props: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentMetadata = await parent;
  const parentOpenGraph = parentMetadata.openGraph || {};

  const title = 'Artists';
  const description =
    'Every night is shaped by the people behind the decks. Their sound, vibe, and ideas turn shared chaos into something memorable.';

  return {
    title,
    description,
    keywords: [
      ...(parentMetadata.keywords || []),
      'Tohuwabohu artists Wien',
      'Tohuwabohu artists Vienna',
      'Tohuwabohu DJ Wien',
      'Tohuwabohu DJ Vienna',
    ],
    openGraph: {
      ...parentOpenGraph,
      title,
      description,
    },
  };
}

export default async function ArtistsPage() {
  const payload = await getPayload({ config });
  const artists = await payload.find({
    collection: 'artists',
    sort: 'name',
    depth: 1,
    limit: 0,
  });

  return (
    <Container as="section" className="flex flex-col gap-12 md:gap-24">
      <JsonLd data={generateArtistListJsonLd(artists.docs)} />
      <div className="flex flex-col items-center gap-8 md:gap-16">
        <h1 className="text-center text-6xl md:text-8xl">Artists</h1>
        <p className="text-center text-2xl text-balance md:text-4xl">
          Every night is shaped by the people behind the decks. Their sound,
          vibe, and ideas turn shared chaos into something memorable.
        </p>
      </div>
      {artists.docs.map((artist) => (
        <ArtistListItem key={artist.slug} artist={artist} />
      ))}
    </Container>
  );
}
