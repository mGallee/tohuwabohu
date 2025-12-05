import Image from 'next/image';
import BackgroundImage from '@/assets/spiral.webp';
import { HTMLAttributes } from 'react';

interface SpinningBackdropProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> {
  preload?: boolean;
  loading?: 'eager' | 'lazy';
  quality?: number | `${number}`;
}

export default function SpinningBackdrop({
  className,
  preload,
  loading,
  quality,
  ...rest
}: SpinningBackdropProps) {
  return (
    <div
      className={`blur-sm brightness-50 select-none sm:blur-md md:blur-lg ${className}`}
      {...rest}>
      <Image
        src={BackgroundImage}
        className="animate-spin-extremely-slow aspect-square object-cover object-center opacity-50"
        alt="Spiral spinning 0deg"
        fill
        placeholder="blur"
        preload={preload}
        loading={loading}
        quality={quality}
        draggable={false}
      />
      <Image
        src={BackgroundImage}
        className="animate-spin-extremely-slow aspect-square rotate-45 object-cover object-center opacity-50"
        alt="Spiral spinning 45deg"
        fill
        placeholder="blur"
        preload={preload}
        loading={loading}
        quality={quality}
        draggable={false}
      />
      <Image
        src={BackgroundImage}
        className="animate-spin-extremely-slow aspect-square rotate-90 object-cover object-center opacity-50"
        alt="Spiral spinning 90deg"
        fill
        placeholder="blur"
        preload={preload}
        loading={loading}
        quality={quality}
        draggable={false}
      />
      <Image
        src={BackgroundImage}
        className="animate-spin-extremely-slow aspect-square rotate-[135deg] object-cover object-center opacity-50"
        alt="Spiral spinning 135deg"
        fill
        placeholder="blur"
        preload={preload}
        loading={loading}
        quality={quality}
        draggable={false}
      />
    </div>
  );
}
