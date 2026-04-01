'use client';

import { KeyboardEvent, ReactNode, useCallback } from 'react';
import { useLightbox, LightboxImage } from '@/contexts/LightboxContext';
import { cn } from '@/utils/helper';

interface LightboxProps {
  className?: string;
  image: LightboxImage;
  children: ReactNode;
}

export default function Lightbox({
  className,
  image,
  children,
}: LightboxProps) {
  const { openLightbox } = useLightbox();

  const handleClick = useCallback(() => {
    openLightbox(image);
  }, [image, openLightbox]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(image);
      }
    },
    [image, openLightbox],
  );

  return (
    <div
      className={cn(
        'pointer-events-none md:pointer-events-auto md:cursor-pointer',
        className,
      )}
      role="button"
      tabIndex={0}
      aria-label="Open image in lightbox"
      onClick={handleClick}
      onKeyDown={handleKeyDown}>
      {children}
    </div>
  );
}
