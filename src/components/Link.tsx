import { ComponentProps } from 'react';
import NextLink from 'next/link';
import { cn } from '@/utils/helper';

type LinkProps = ComponentProps<typeof NextLink>;

export default function Link({ className, ...rest }: LinkProps) {
  return (
    <NextLink
      className={cn(
        'hover:animate-text-glow active:animate-text-glow',
        className,
      )}
      {...rest}
    />
  );
}
