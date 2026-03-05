import { Metadata, ResolvingMetadata } from 'next';
import Link from '@/components/Link';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/Button';
import Container from '@/components/Container';
import { getInstagramMessageUrl } from '@/utils/helper';

export async function generateMetadata(
  _props: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentMetadata = await parent;
  const parentOpenGraph = parentMetadata.openGraph || {};

  const title = 'About Us';
  const description =
    'Tohuwabohu was founded by a group of friends who felt the Vienna music scene needed something different.';

  return {
    title,
    description,
    keywords: [
      ...(parentMetadata.keywords || []),
      'About Tohuwabohu',
      'Vienna music scene',
      'Immersive experience',
      'Community-driven',
      'Collaborate with music collective Vienna',
    ],
    openGraph: {
      ...parentOpenGraph,
      title,
      description,
    },
  };
}

export default function AboutUsPage() {
  return (
    <Container
      as="section"
      className="flex flex-col items-center gap-12 md:gap-24">
      <h1 className="text-center text-6xl md:text-8xl">About Us</h1>
      <div className="flex flex-col items-center gap-4 md:gap-8">
        <h2 className="text-center text-4xl md:text-6xl">
          The Story of Tohuwabohu
        </h2>
        <p className="text-center text-xl text-balance md:text-2xl">
          It started with a group of friends and a simple idea.
        </p>
        <p className="text-center text-xl text-balance md:text-2xl">
          Tohuwabohu was founded by a group of friends who felt the Vienna music
          scene needed something different. We didn&#39;t just want to throw
          another party. We wanted to create a space where the music and the
          environment feel like one single, living thing.
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 md:gap-8">
        <h2 className="text-center text-4xl md:text-6xl">Why we do this</h2>
        <p className="text-center text-xl text-balance md:text-2xl">
          We are driven by love for music and community, but for us, the sound
          is only half the story. We believe the dancefloor should be more than
          just a place to stand and listen. That&#39;s why we focus on creating
          immersive art and visuals that integrate directly with the music.
          Expanding the space into something you can truly feel and get lost in.
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 md:gap-8">
        <h2 className="text-center text-4xl md:text-6xl">Art & Music as One</h2>
        <p className="text-center text-xl text-balance md:text-2xl">
          We put a massive amount of heart into our stage designs,
          light-mapping, and decor. For us, the visual experience isn&#39;t just
          an &#34;add-on.&#34; We work to transform every venue we inhabit into
          a different world for a few hours, regardless of the rhythm or genre.
        </p>
        <Link
          className="flex flex-row items-center gap-1 text-center text-xl text-balance md:text-2xl"
          href="/decoration">
          <ArrowRight size={32} />
          <span>Explore our Decoration & Art</span>
        </Link>
      </div>
      <div className="flex flex-col items-center gap-4 md:gap-8">
        <h2 className="text-center text-4xl md:text-6xl">Respect the Space</h2>
        <p className="text-center text-xl text-balance md:text-2xl">
          Because we&#39;re a community-driven collective, we look out for each
          other. We&#39;re about the right kind of chaos; the kind that brings
          people together. To keep the dancefloor a safe, respectful, and open
          space for everyone, we have dedicated awareness teams at every event.
          No judgment, no ego, just the music and the art.
        </p>
        <Link
          className="flex flex-row items-center gap-1 text-center text-xl text-balance md:text-2xl"
          href="/awareness">
          <ArrowRight size={32} />
          <span>Read our Awareness Guidelines</span>
        </Link>
      </div>
      <div className="flex flex-col items-center gap-4 md:gap-8">
        <p className="text-center text-xl text-balance md:text-2xl">
          Interested in collaborating with us?
        </p>
        <Button
          as="a"
          variant="outlined"
          href={getInstagramMessageUrl('tohuwabohu.vienna')}
          target="_blank">
          Message us on Instagram
        </Button>
      </div>
    </Container>
  );
}
