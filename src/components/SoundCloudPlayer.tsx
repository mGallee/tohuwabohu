'use client';
import { useEffect, useRef, useState } from 'react';

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
          src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=true&visual=true`}
        />
      )}
    </div>
  );
}
