import Link from '@/components/Link';

export default function Navigation() {
  return (
    <nav className="flex flex-col items-center justify-center border-b-2 bg-black/50 px-4 md:flex-row md:justify-between md:gap-4 md:px-8">
      <Link className="font-healine p-2 text-2xl md:p-4 md:pt-3" href="/">
        Tohuwabohu
      </Link>
      <div className="flex flex-row justify-evenly self-stretch md:gap-2">
        <Link className="p-2 text-xl md:p-4" href="/events">
          Events
        </Link>
        <Link className="p-2 text-xl md:p-4" href="/artists">
          Artists
        </Link>
        <Link className="p-2 text-xl md:p-4" href="/awareness">
          Awareness
        </Link>
      </div>
    </nav>
  );
}
