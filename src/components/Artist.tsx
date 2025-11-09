import Image from 'next/image';
import { ARTIST_MAP, ArtistKey } from '@/constants/artist';
import Link from '@/components/Link';
import SoundCloudPlayer from '@/components/SoundCloudPlayer';

interface ArtistProps {
  artist: ArtistKey;
}

export default function Artist({ artist }: ArtistProps) {
  const { name, profilePicture, soundCloud } = ARTIST_MAP[artist];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row">
        <Link
          className="flex flex-row items-center gap-2"
          href={`https://soundcloud.com/${soundCloud.username}`}
          target="_blank">
          <Image
            className="aspect-square h-[40] w-[40] rounded-full md:h-[50] md:w-[50]"
            src={`/images/artists/${profilePicture}`}
            width="50"
            height="50"
            alt={`Profile picture of ${name}`}
            draggable={false}
          />
          <span className="mb-1 text-2xl md:mb-2 md:text-4xl">{name}</span>
        </Link>
      </div>
      <SoundCloudPlayer
        url={`https://api.soundcloud.com/tracks/soundcloud:tracks:${soundCloud.trackId}`}
        title={`Soundcloud: ${name}`}
      />
    </div>
  );
}
