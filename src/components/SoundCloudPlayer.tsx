'use client';
import { useEffect, useRef, useState } from 'react';

const SC_PLAYER_URL = new URL('https://w.soundcloud.com/player/');
SC_PLAYER_URL.searchParams.set('color', encodeURIComponent('#ff5500'));
SC_PLAYER_URL.searchParams.set('auto_play', 'false');
SC_PLAYER_URL.searchParams.set('hide_related', 'true');
SC_PLAYER_URL.searchParams.set('show_comments', 'false');
SC_PLAYER_URL.searchParams.set('show_user', 'false');
SC_PLAYER_URL.searchParams.set('show_reposts', 'false');
SC_PLAYER_URL.searchParams.set('show_teaser', 'true');
SC_PLAYER_URL.searchParams.set('visual', 'true');

interface SoundCloudPlayerProps {
  url: string;
  title?: string;
}

export default function SoundCloudPlayer({
  url,
  title,
}: SoundCloudPlayerProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef(null);

  SC_PLAYER_URL.searchParams.set('url', encodeURIComponent(url));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
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
      style={{
        width: '100%',
        height: '180px',
      }}>
      {shouldLoad && (
        <iframe
          className="rounded-xl border-0"
          width="100%"
          height="180"
          title={title}
          allow="autoplay; encrypted-media *"
          loading="lazy"
          src={SC_PLAYER_URL.href}
        />
      )}
    </div>
  );
}
