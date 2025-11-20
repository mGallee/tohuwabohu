import { HTMLAttributeAnchorTarget, MouseEventHandler, ReactNode } from 'react';
import { assertUnreachable } from '@/utils/helper';
import Link from 'next/link';

interface BaseButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'text' | 'outlined' | 'filled';
}

interface AnchorElementProps extends BaseButtonProps {
  as: 'a';
  href: string;
  target?: HTMLAttributeAnchorTarget;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

interface ButtonElementProps extends BaseButtonProps {
  as?: 'button';
  href?: never;
  target?: never;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

type ButtonProps = AnchorElementProps | ButtonElementProps;

export default function Button(props: ButtonProps) {
  const baseClasses =
    'hover:animate-text-glow active:animate-text-glow rounded-xl px-4 py-2 pb-4 text-2xl text-center leading-none md:text-4xl md:leading-none';

  const variantClasses = {
    text: 'border-0',
    outlined:
      'border-2 border-stone-50 bg-transparent active:border-stone-100 active:text-stone-100',
    filled:
      'border-2 border-stone-50 bg-stone-50 text-black active:border-stone-100 active:bg-stone-100',
  };

  const combinedClasses =
    `${baseClasses} ${variantClasses[props.variant ?? 'text']} ${props.className}`.trim();

  const as = props.as ?? 'button';

  switch (as) {
    case 'a':
      const anchorProps = props as AnchorElementProps;
      return (
        <Link
          className={combinedClasses}
          href={anchorProps.href}
          target={anchorProps.target}
          onClick={anchorProps.onClick}>
          {anchorProps.children}
        </Link>
      );
    case 'button':
      const buttonProps = props as ButtonElementProps;
      return (
        <button className={combinedClasses} onClick={buttonProps.onClick}>
          {buttonProps.children}
        </button>
      );
    default:
      assertUnreachable(as);
  }
}
