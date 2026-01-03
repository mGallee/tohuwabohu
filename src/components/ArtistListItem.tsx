import Image from 'next/image';
import Link from '@/components/Link';
import SoundCloudPlayer from '@/components/SoundCloudPlayer';
import { Artist } from '@/constants/artist';
import { HTMLAttributes } from 'react';

interface ArtistListItemProps extends HTMLAttributes<HTMLElement> {
  artist: Artist;
}

export default function ArtistListItem({
  artist: { slug, name, profilePicture, soundCloud },
  className,
  ...rest
}: ArtistListItemProps) {
  return (
    <article className={`flex flex-col gap-4 ${className}`} {...rest}>
      <Link
        className="group flex flex-row items-center gap-4 self-start"
        href={`/artists/${slug}`}>
        <Image
          className="group-hover:animate-box-glow group-active:animate-box-glow aspect-square h-[60] w-[60] rounded-full border-2 border-stone-50 md:h-[70] md:w-[70]"
          src={profilePicture}
          alt={`Profile picture of ${name}`}
          draggable={false}
        />
        <div className="font-healine mb-3 text-4xl md:mb-4 md:text-5xl">
          {name}
        </div>
      </Link>
      <SoundCloudPlayer
        url={`https://api.soundcloud.com/tracks/soundcloud:tracks:${soundCloud.trackId}`}
        title={`Soundcloud: ${name}`}
      />
    </article>
  );
}
