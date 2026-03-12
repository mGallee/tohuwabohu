import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next';
import Container from '@/components/Container';
import { ORGANISATION } from '@/constants/organisation';

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
    <Container as="section" className="flex flex-col gap-12 md:gap-24">
      <h1 className="text-center text-6xl md:text-8xl">Imprint</h1>
      <div className="flex flex-col gap-8 rounded-xl border-2 bg-black/50 p-4 text-lg md:text-xl">
        <address className="flex flex-col not-italic">
          <div className="font-medium">{ORGANISATION.legalName}</div>
          <div>{ORGANISATION.address.streetAddress}</div>
          <div>
            {`${ORGANISATION.address.postalCode} ${ORGANISATION.address.region}`}
          </div>
          <div>{ORGANISATION.address.country}</div>
        </address>
        <div className="flex flex-col">
          <div className="font-medium">ZVR:</div>
          <div>{ORGANISATION.ZVR}</div>
        </div>
        <div className="flex flex-col">
          <div className="font-medium">Email:</div>
          <div>
            <Link className="underline" href={`mailto:${ORGANISATION.email}`}>
              {ORGANISATION.email}
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
