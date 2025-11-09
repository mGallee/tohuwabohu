import { ComponentProps } from 'react';
import NextLink from 'next/link';

type LinkProps = ComponentProps<typeof NextLink>;

export default function Link({ className, ...rest }: LinkProps) {
  return (
    <NextLink
      className={`hover:animate-glow active:animate-glow transition-all ${className}`}
      {...rest}
    />
  );
}
