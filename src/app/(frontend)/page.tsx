import Button from '@/components/Button';
import Link from '@/components/Link';
import { Metadata, ResolvingMetadata } from 'next';
import Container from '@/components/Container';
import JsonLd from '@/components/JsonLd';
import { SOCIAL_MEDIA_ITEMS } from '@/constants/social-media';
import { ORGANISATION } from '@/constants/organisation';

export async function generateMetadata(
  _props: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentMetadata = await parent;

  return {
    keywords: [
      ...(parentMetadata.keywords || []),
      'Tohuwabohu Wien music collective',
      'Vienna artist collective',
      'community music events Vienna',
    ],
  };
}

export default function HomePage() {
  return (
    <Container className="flex flex-col justify-center gap-12 md:gap-24">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          '@id': `${ORGANISATION.url}/#organization`,
          name: ORGANISATION.name,
          alternateName: ORGANISATION.alternateName,
          url: ORGANISATION.url,
          description: ORGANISATION.description,
          logo: {
            '@type': 'ImageObject',
            url: ORGANISATION.logo.url,
            width: ORGANISATION.logo.width.toString(),
            height: ORGANISATION.logo.height.toString(),
          },
          address: {
            '@type': 'PostalAddress',
            streetAddress: ORGANISATION.address.streetAddress,
            addressLocality: ORGANISATION.address.locality,
            addressRegion: ORGANISATION.address.region,
            postalCode: ORGANISATION.address.postalCode,
            addressCountry: ORGANISATION.address.country,
          },
          sameAs: SOCIAL_MEDIA_ITEMS.map((item) => item.href),
        }}
      />
      <section className="flex min-h-[70dvh] flex-col items-center justify-center gap-8 md:min-h-[67dvh] md:gap-16">
        <h1 className="animate-text-glow text-center text-6xl sm:text-8xl md:text-9xl">
          Tohuwabohu
        </h1>
        <p className="text-center text-2xl text-balance md:text-4xl">
          Safe*r space thanks to our <Link href="/awareness">awareness</Link>{' '}
          team!
        </p>
        <div className="flex flex-row justify-center gap-4 md:gap-8">
          <Button as="a" variant="filled" href="/events">
            Events
          </Button>
          <Button as="a" variant="outlined" href="/artists">
            Artists
          </Button>
        </div>
      </section>
      <section className="flex flex-col items-center gap-8 md:gap-16">
        <h2 className="text-center text-4xl md:text-6xl">
          Beautiful chaos, shared together
        </h2>
        <p className="text-center text-2xl md:text-4xl">
          Tohuwabohu is a Vienna-based collective founded by a group of friends
          who wanted to bring something different to the local scene. We create
          immersive spaces where music and art collide, focusing on high-quality
          sound, handcrafted visuals, and an open, respectful atmosphere.
        </p>
        <p className="text-center text-2xl md:text-4xl">
          For us, it&#39;s about more than the party, it&#39;s about connection,
          safety, and a dancefloor where you can truly be yourself.
        </p>
        <div className="flex flex-col items-center gap-4 md:gap-8">
          <Button as="a" variant="outlined" href="/about-us">
            Read our Story
          </Button>
        </div>
      </section>
    </Container>
  );
}
