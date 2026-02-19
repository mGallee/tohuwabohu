import { ComponentProps, JSX, ReactNode } from 'react';
import { cn } from '@/utils/helper';

type Variant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const VARIANTS: Record<Variant, string> = {
  xs: 'max-w-[444px]',
  sm: 'max-w-[600px]',
  md: 'max-w-[900px]',
  lg: 'max-w-[1200px]',
  xl: 'max-w-[1536px]',
};

interface ContainerProps extends ComponentProps<'div'> {
  as?: keyof JSX.IntrinsicElements;
  variant?: Variant;
  children?: ReactNode;
  className?: string;
}

export default function Container({
  as: Element = 'div',
  variant = 'md',
  className,
  children,
  ...props
}: ContainerProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = Element as any;

  return (
    <Tag
      className={cn(
        'mx-auto w-full px-4 md:px-8',
        VARIANTS[variant],
        className,
      )}
      {...props}>
      {children}
    </Tag>
  );
}
