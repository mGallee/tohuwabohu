import Image from 'next/image';
import Link from '@/components/Link';
import SoundCloudPlayer from '@/components/SoundCloudPlayer';
import { ArtistData } from '@/constants/artist';

interface ArtistProps {
  artist: ArtistData;
}

export default function Artist({
  artist: { slug, name, profilePicture, soundCloud },
}: ArtistProps) {
  return (
    <article className="flex flex-col gap-4">
      <Link
        className="group flex flex-row items-center gap-4 self-start"
        href={`/artist/${slug}`}>
        <Image
          className="group-hover:animate-box-glow group-active:animate-box-glow aspect-square h-[50] w-[50] rounded-full border-2 border-stone-50 md:h-[60] md:w-[60]"
          src={`/images/artists/${profilePicture}`}
          width="60"
          height="60"
          alt={`Profile picture of ${name}`}
          draggable={false}
        />
        <div className="font-healine mb-2 text-3xl md:mb-3 md:text-4xl">
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
