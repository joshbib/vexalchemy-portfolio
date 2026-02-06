export default function Loading() {
  return (
    <main className="min-h-screen px-6 md:px-16 py-16">
      <div className="max-w-5xl mb-10 animate-pulse">
        <div className="h-3 w-20 rounded-md bg-neutral-800/15 mb-4" />
        <div className="h-10 w-64 rounded-md bg-neutral-800/15" />
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-md bg-neutral-800/10 aspect-[4/3] animate-pulse"
          />
        ))}
      </section>
    </main>
  );
}
