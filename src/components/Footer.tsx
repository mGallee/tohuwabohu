import { SOCIAL_MEDIA_ITEMS } from '@/constants/social-media';
import Link from '@/components/Link';
import { Copyright } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex flex-row flex-wrap items-center justify-center gap-3 text-center md:gap-6">
        {SOCIAL_MEDIA_ITEMS.map(({ label, href }) => (
          <Link
            key={`${label}_${href}`}
            className="text-xl md:text-2xl"
            href={href}
            target="_blank">
            {label}
          </Link>
        ))}
      </div>
      <div className="flex flex-col items-center gap-1 text-stone-300">
        <Link className="text-center text-lg" href="/imprint">
          Imprint
        </Link>
        <div className="flex flex-row items-center justify-center gap-1">
          <Copyright size={12} />
          <div className="text-center text-xs">
            Tohuwabohu Kultur- und Musikverein
          </div>
        </div>
      </div>
    </footer>
  );
}
