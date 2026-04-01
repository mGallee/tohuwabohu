'use client';

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  MouseEvent,
  ReactNode,
  useMemo,
  SyntheticEvent,
} from 'react';
import Image, { StaticImageData } from 'next/image';
import { Media } from '@/payload-types';
import { PayloadImage } from '@/components/PayloadImage';
import { LoaderPinwheel } from 'lucide-react';
import { useScrollLock } from '@/contexts/ScrollLockContext';

export type LightboxImage = StaticImageData | Media | number;

function isMedia(img: LightboxImage): img is Media | number {
  return typeof img === 'number' || (typeof img === 'object' && 'alt' in img);
}

interface LightboxContextValue {
  openLightbox: (image: LightboxImage) => void;
}

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) {
    throw new Error('useLightbox must be used within LightboxProvider');
  }
  return ctx;
}

export function LightboxProvider({ children }: { children: ReactNode }) {
  const { lockScroll, unlockScroll } = useScrollLock();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeImage, setActiveImage] = useState<LightboxImage | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const openLightbox = useCallback(
    (image: LightboxImage) => {
      setIsClosing(false);
      setIsLoaded(false);
      setActiveImage(image);
      dialogRef.current?.showModal();
      lockScroll();
    },
    [lockScroll],
  );

  const closeLightbox = useCallback(() => {
    setIsClosing(true);
  }, []);

  const handleCancel = useCallback(
    (event: SyntheticEvent<HTMLDialogElement>) => {
      event.preventDefault();
      closeLightbox();
    },
    [closeLightbox],
  );

  const handleAnimationEnd = useCallback(() => {
    if (isClosing) {
      setIsClosing(false);
      setIsLoaded(false);
      setActiveImage(null);
      dialogRef.current?.close();
      unlockScroll();
    }
  }, [isClosing, unlockScroll]);

  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const stopPropagation = useCallback((event: MouseEvent) => {
    event.stopPropagation();
  }, []);

  const values = useMemo<LightboxContextValue>(
    () => ({
      openLightbox,
    }),
    [openLightbox],
  );

  return (
    <LightboxContext.Provider value={values}>
      {children}
      <dialog
        ref={dialogRef}
        className="m-0 h-screen max-h-none w-screen max-w-none overflow-hidden bg-transparent p-0 outline-0 backdrop:bg-black/75 backdrop:backdrop-blur-md"
        aria-label="Image lightbox"
        aria-modal="true"
        data-closing={isClosing ? 'true' : 'false'}
        onClose={closeLightbox}
        onCancel={handleCancel}
        onAnimationEnd={handleAnimationEnd}>
        {activeImage ? (
          <div
            className="flex h-full w-full items-center justify-center p-8"
            onClick={closeLightbox}>
            {!isLoaded ? (
              <div className="absolute" aria-hidden="true">
                <LoaderPinwheel className="animate-spin" size={50} />
              </div>
            ) : null}
            {isMedia(activeImage) ? (
              <PayloadImage
                image={activeImage}
                className={`h-auto max-h-full w-auto max-w-full rounded-xl border-2 border-stone-50 transition-opacity duration-200 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                draggable={false}
                sizes="100vw"
                onClick={stopPropagation}
                onLoad={handleImageLoad}
              />
            ) : (
              <Image
                src={activeImage}
                alt="Lightbox image"
                className={`h-auto max-h-full w-auto max-w-full rounded-xl border-2 border-stone-50 transition-opacity duration-200 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                draggable={false}
                sizes="100vw"
                onClick={stopPropagation}
                onLoad={handleImageLoad}
              />
            )}
          </div>
        ) : null}
      </dialog>
    </LightboxContext.Provider>
  );
}
