'use client';

import Link from '@/components/Link';
import { useCallback, useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/utils/helper';

const NAVIGATION_ITEMS = [
  {
    label: 'Events',
    href: '/events',
  },
  {
    label: 'Artists',
    href: '/artists',
  },
  {
    label: 'Awareness',
    href: '/awareness',
  },
  {
    label: 'Decoration',
    href: '/decoration',
  },
  {
    label: 'About Us',
    href: '/about-us',
  },
] as const;

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(
    () => setIsOpen((prevState) => !prevState),
    [],
  );

  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.removeProperty('overflow');
    }

    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 right-0 left-0 z-99 flex h-16 w-full flex-row items-center justify-between border-b-2 bg-black/75 backdrop-blur-md md:gap-2 md:px-4">
        <button
          onClick={toggleMenu}
          className="flex w-14 items-center justify-center self-stretch md:hidden"
          aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <Link
          className="font-headline self-stretch p-4 pt-3 text-2xl"
          href="/"
          onClick={closeMenu}>
          Tohuwabohu
        </Link>
        <div className="w-14 self-stretch md:hidden" />
        <div className="hidden flex-row justify-evenly self-stretch md:flex">
          {NAVIGATION_ITEMS.map((item) => (
            <Link key={item.href} className="p-4 text-xl" href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
      <div className="flex h-16 w-full" />
      <div
        className={cn(
          'fixed top-16 right-0 bottom-0 left-0 z-99 md:hidden',
          isOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}>
        <div
          className={cn(
            'absolute inset-0 bg-black transition-opacity duration-150 ease-in-out',
            isOpen ? 'opacity-50' : 'opacity-0',
          )}
          aria-hidden="true"
          onClick={closeMenu}
        />
        <nav
          className={cn(
            'flex h-full w-[65%] min-w-3xs flex-col border-r-2 bg-black/50 py-4 backdrop-blur-md transition-transform duration-150 ease-in-out',
            isOpen ? 'translate-x-0' : 'translate-x-[calc(-100%-2px)]',
          )}>
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              key={item.href}
              className="p-4 text-xl"
              href={item.href}
              onClick={closeMenu}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
