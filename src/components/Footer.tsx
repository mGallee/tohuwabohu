import { SOCIAL_MEDIA_ITEMS } from '@/constants/social-media';

export default function Footer() {
  return (
    <footer className="flex flex-row flex-wrap items-center justify-center gap-3 p-4 text-center md:gap-6 md:p-8">
      {SOCIAL_MEDIA_ITEMS.map(({ label, href }) => (
        <a
          key={`${label}_${href}`}
          className="hover:animate-glow active:animate-glow text-xl outline-0 transition-all md:text-2xl"
          href={href}
          target="_blank">
          {label}
        </a>
      ))}
    </footer>
  );
}
