'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getSoundCloudPlayerUrl } from '@/utils/soundcloud';
import LoaderIcon from '@/components/LoaderIcon';

interface SoundCloudPlayerProps {
  url: string;
  title?: string;
}

export default function SoundCloudPlayer({
  url,
  title,
}: SoundCloudPlayerProps) {
  const [showPlayer, setShowPlayer] = useState(false);
  const containerRef = useRef(null);

  const playerUrl = useMemo(() => getSoundCloudPlayerUrl(url), [url]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowPlayer(true);
          observer.disconnect();
        }
      },
      { rootMargin: '180px' },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[180px] w-full overflow-hidden rounded-xl border-2 bg-black/50">
      {showPlayer ? (
        <iframe
          className="mt-[-3px] h-[calc(100%+3px)] rounded-xl border-0"
          width="100%"
          height="100%"
          title={title}
          allow="autoplay; encrypted-media *"
          loading="lazy"
          src={playerUrl.href}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-xl p-2">
          <LoaderIcon size={40} />
          <div className="text-center text-lg md:text-xl">
            Loading SoundCloud Track
          </div>
        </div>
      )}
    </div>
  );
}
