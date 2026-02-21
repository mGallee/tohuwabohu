import Link from '@/components/Link';
import SoundCloudPlayer from '@/components/SoundCloudPlayer';
import { HTMLAttributes } from 'react';
import { Artist } from '@/payload-types';
import { cn } from '@/utils/helper';
import { PayloadImage } from '@/components/PayloadImage';

interface ArtistListItemProps extends HTMLAttributes<HTMLElement> {
  artist: Artist;
}

export default function ArtistListItem({
  artist,
  className,
  ...rest
}: ArtistListItemProps) {
  return (
    <article className={cn('flex flex-col gap-4', className)} {...rest}>
      <Link
        className="group flex flex-row items-center gap-4 self-start"
        href={`/artists/${artist.slug}`}>
        <PayloadImage
          className="group-hover:animate-box-glow group-active:animate-box-glow aspect-square h-[60] w-[60] rounded-full border-2 border-stone-50 md:h-[70] md:w-[70]"
          image={artist.profilePicture}
          alt={`Profile picture of ${artist.name}`}
          draggable={false}
        />
        <div className="font-headline mb-3 text-4xl md:mb-4 md:text-5xl">
          {artist.name}
        </div>
      </Link>
      <SoundCloudPlayer
        url={`https://api.soundcloud.com/tracks/soundcloud:tracks:${artist.soundCloud.trackId}`}
        title={`Soundcloud: ${artist.name}`}
      />
    </article>
  );
}
