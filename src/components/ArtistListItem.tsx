import Image from 'next/image';
import Link from '@/components/Link';
import SoundCloudPlayer from '@/components/SoundCloudPlayer';
import { HTMLAttributes } from 'react';
import { Artist } from '@/payload-types';

interface ArtistListItemProps extends HTMLAttributes<HTMLElement> {
  artist: Artist;
}

export default function ArtistListItem({
  artist,
  className,
  ...rest
}: ArtistListItemProps) {
  return (
    <article className={`flex flex-col gap-4 ${className ?? ''}`} {...rest}>
      <Link
        className="group flex flex-row items-center gap-4 self-start"
        href={`/artists/${artist.slug}`}>
        {artist.profilePicture &&
        typeof artist.profilePicture === 'object' &&
        artist.profilePicture.url &&
        artist.profilePicture.width &&
        artist.profilePicture.height ? (
          <Image
            className="group-hover:animate-box-glow group-active:animate-box-glow aspect-square h-[60] w-[60] rounded-full border-2 border-stone-50 md:h-[70] md:w-[70]"
            src={artist.profilePicture.url}
            width={artist.profilePicture.width}
            height={artist.profilePicture.height}
            alt={`Profile picture of ${artist.name}`}
            draggable={false}
          />
        ) : null}
        <div className="font-healine mb-3 text-4xl md:mb-4 md:text-5xl">
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
