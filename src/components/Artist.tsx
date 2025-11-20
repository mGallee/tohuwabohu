import Image from 'next/image';
import Link from '@/components/Link';
import SoundCloudPlayer from '@/components/SoundCloudPlayer';
import { ArtistData } from '@/constants/artist';

interface ArtistProps {
  artist: ArtistData;
}

export default function Artist({
  artist: { name, profilePicture, soundCloud },
}: ArtistProps) {
  return (
    <article className="flex flex-col gap-2">
      <div className="flex flex-row">
        <Link
          className="group flex flex-row items-center gap-2"
          href={`https://soundcloud.com/${soundCloud.username}`}
          target="_blank">
          <Image
            className="group-hover:animate-box-glow group-active:animate-box-glow aspect-square h-[40] w-[40] rounded-full border-2 border-stone-50 md:h-[50] md:w-[50]"
            src={`/images/artists/${profilePicture}`}
            width="50"
            height="50"
            alt={`Profile picture of ${name}`}
            draggable={false}
          />
          <h3 className="mb-1 text-2xl md:mb-2 md:text-4xl">{name}</h3>
        </Link>
      </div>
      <SoundCloudPlayer
        url={`https://api.soundcloud.com/tracks/soundcloud:tracks:${soundCloud.trackId}`}
        title={`Soundcloud: ${name}`}
      />
    </article>
  );
}
