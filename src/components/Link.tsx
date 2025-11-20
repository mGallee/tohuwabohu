import { ComponentProps } from 'react';
import NextLink from 'next/link';

type LinkProps = ComponentProps<typeof NextLink>;

export default function Link({ className, ...rest }: LinkProps) {
  return (
    <NextLink
      className={`hover:animate-text-glow active:animate-text-glow ${className}`}
      {...rest}
    />
  );
}
