export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-8">
      <h1 className="animate-glow mt-4 mb-6 text-6xl">404 - Not Found</h1>
      <div className="text-4xl">Could not find requested resource</div>
    </section>
  );
}
