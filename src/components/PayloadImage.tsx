import Image, { type ImageProps } from 'next/image';
import { Media } from '@/payload-types';

interface PayloadImageProps extends Omit<
  ImageProps,
  'src' | 'width' | 'height' | 'alt'
> {
  image: Media | number | null | undefined;
  alt?: string;
}

export function PayloadImage({ image, alt, ...props }: PayloadImageProps) {
  if (
    typeof image !== 'object' ||
    !image?.url ||
    !image?.width ||
    !image?.height
  ) {
    return null;
  }

  return (
    <Image
      src={image.url}
      width={image.width}
      height={image.height}
      alt={alt || image.alt}
      {...props}
    />
  );
}
