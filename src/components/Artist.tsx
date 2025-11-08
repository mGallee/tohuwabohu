import Image from 'next/image';
import { ARTIST_MAP, ArtistKey } from '@/constants/artist';

interface ArtistProps {
  artist: ArtistKey;
}

export default function Artist({ artist }: ArtistProps) {
  const { name, profilePicture, soundCloud } = ARTIST_MAP[artist];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row">
        <a
          className="hover:animate-glow active:animate-glow flex flex-row items-center gap-2"
          href={`https://soundcloud.com/${soundCloud.username}`}
          target="_blank">
          <div>
            <Image
              className="aspect-square h-[40] w-[40] rounded-full md:h-[50] md:w-[50]"
              src={`/images/artists/${profilePicture}`}
              width="50"
              height="50"
              alt={name}
            />
          </div>
          <div>
            <h4 className="mb-1 text-2xl md:mb-2 md:text-4xl">{name}</h4>
          </div>
        </a>
      </div>
      <iframe
        className="rounded-xl border-0"
        width="100%"
        height="180"
        allow="autoplay"
        src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A${soundCloud.trackId}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=true&visual=true`}></iframe>
    </div>
  );
}
