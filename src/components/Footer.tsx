import { SOCIAL_MEDIA_ITEMS } from '@/constants/social-media';
import Link from '@/components/Link';
import { Copyright } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4 border-t-2 bg-black/50 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col items-center gap-2">
        <div className="text-lg">Follow us on</div>
        <div className="flex flex-row flex-wrap items-center justify-center gap-4 gap-y-1 text-center">
          {SOCIAL_MEDIA_ITEMS.map(({ label, href }) => (
            <Link
              key={`${label}_${href}`}
              className="text-lg"
              href={href}
              target="_blank">
              {label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 text-stone-300">
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
