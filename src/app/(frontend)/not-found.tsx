import Link from '@/components/Link';

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-8 text-center md:gap-16">
      <div className="flex flex-col items-center gap-2 md:gap-4">
        <h1 className="animate-text-glow text-6xl md:text-8xl">404</h1>
        <h2 className="animate-text-glow text-6xl md:text-8xl">
          Lost in the Web
        </h2>
      </div>
      <p className="text-2xl md:text-4xl">
        You’ve wandered into the internet’s swirling primordial mess, a place
        where pages forget who they are. Maybe try the{' '}
        <Link href="/" className="underline">
          homepage
        </Link>{' '}
        instead?
      </p>
    </section>
  );
}
