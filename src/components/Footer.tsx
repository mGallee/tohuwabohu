import { SOCIAL_MEDIA_ITEMS } from '@/constants/social-media';
import Link from '@/components/Link';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-3 p-4 md:gap-6 md:p-8">
      <div className="flex flex-row flex-wrap items-center justify-center gap-3 text-center md:gap-6">
        {SOCIAL_MEDIA_ITEMS.map(({ label, href }) => (
          <Link
            key={`${label}_${href}`}
            className="hover:animate-glow active:animate-glow text-xl outline-0 transition-all md:text-2xl"
            href={href}
            target="_blank">
            {label}
          </Link>
        ))}
      </div>
      <div className="text-center text-sm text-stone-300">
        Tohuwabohu Kultur und Musikverein
      </div>
    </footer>
  );
}
