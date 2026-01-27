import Button from '@/components/Button';
import Link from '@/components/Link';
import { Metadata, ResolvingMetadata } from 'next';

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
      'collaborate with music collective Vienna',
    ],
  };
}

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center gap-12 md:gap-24">
      <section className="flex min-h-[67dvh] flex-col items-center justify-center gap-8 md:min-h-[64dvh] md:gap-16">
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
          Tohuwabohu is a collective in Vienna that loves music, art, and
          bringing people together. We throw events that focus on good sound,
          nice visuals, and an open, respectful atmosphere where everyone should
          feel welcome.
        </p>
        <p className="text-center text-2xl md:text-4xl">
          For us it&#39;s not just about partying - it&#39;s about creating a
          space where people can connect, feel safe, and just be themselves for
          a night. We work with artists we love, put a lot of care into the
          details, and try to keep things fun, inclusive, and a little bit
          chaotic in the best way. If you&#39;re into music, community, and
          nights that feel a bit different - you&#39;ll probably feel at home
          with us.
        </p>
        <div className="flex flex-col items-center gap-4 md:gap-8">
          <p className="text-center text-2xl text-balance md:text-4xl">
            Interested in collaborating with us?
          </p>
          <Button
            as="a"
            variant="outlined"
            href="https://ig.me/m/tohuwabohu.vienna"
            target="_blank">
            Message us on Instagram
          </Button>
        </div>
      </section>
    </div>
  );
}
