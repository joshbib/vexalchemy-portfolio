export default function AboutSkeleton() {
  return (
    <main className="min-h-screen px-6 md:px-16 py-32">
      <div className="max-w-4xl">
        <div className="inline-flex items-center gap-2 animate-pulse">
          <div className="h-3 w-4 rounded-md bg-neutral-800/15" />
          <div className="h-3 w-10 rounded-md bg-neutral-800/15" />
        </div>

        <div className="h-10 md:h-12 w-28 rounded-md bg-neutral-800/20 mt-16 mb-8 animate-pulse" />

        <div className="space-y-6 max-w-2xl animate-pulse">
          <div className="space-y-3">
            <div className="h-4 w-full rounded-md bg-neutral-800/10" />
            <div className="h-4 w-[86%] rounded-md bg-neutral-800/10" />
          </div>

          <div className="space-y-3">
            <div className="h-4 w-full rounded-md bg-neutral-800/10" />
            <div className="h-4 w-[82%] rounded-md bg-neutral-800/10" />
          </div>

          <div className="pt-8 mt-12 border-t border-black/10">
            <div className="h-3 w-24 rounded-md bg-neutral-800/15 mb-4" />
            <div className="h-4 w-56 rounded-md bg-neutral-800/10" />
          </div>
        </div>
      </div>
    </main>
  );
}
