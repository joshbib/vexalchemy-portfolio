export default function HeroSkeleton() {
  return (
    <section className="min-h-[100svh] flex items-center px-6 md:px-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <div className="grain-overlay" />
      </div>

      <div className="absolute top-8 right-6 md:right-16 flex items-center gap-2 z-20 animate-pulse">
        <div className="h-2 w-2 rounded-full bg-neutral-800/30" />
        <div className="h-2 w-24 rounded-md bg-neutral-800/20" />
      </div>

      <div className="w-full flex flex-col md:flex-row md:items-start md:justify-between relative z-10">
        <div className="max-w-5xl animate-pulse">
          <div className="h-2 w-24 rounded-md bg-neutral-800/20 mb-8" />

          <div className="space-y-4 mb-10">
            <div className="h-8 md:h-12 w-[85%] rounded-md bg-neutral-800/20" />
            <div className="h-8 md:h-12 w-[72%] rounded-md bg-neutral-800/20" />
            <div className="h-8 md:h-12 w-[60%] rounded-md bg-neutral-800/20" />
          </div>

          <div className="space-y-3">
            <div className="h-3 w-[55%] rounded-md bg-neutral-800/15" />
            <div className="h-3 w-[45%] rounded-md bg-neutral-800/15" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 mt-16 md:mt-2 animate-pulse">
          <div className="h-3 w-20 rounded-md bg-neutral-800/15" />
          <div className="h-3 w-14 rounded-md bg-neutral-800/15" />
          <div className="h-3 w-16 rounded-md bg-neutral-800/15" />
        </div>
      </div>

      <div className="absolute bottom-12 left-6 md:left-16 hidden md:flex flex-col items-center gap-3 opacity-30 animate-pulse">
        <div className="h-10 w-[2px] rounded-full bg-neutral-800/20" />
        <div className="h-20 w-px bg-neutral-800/20" />
      </div>
    </section>
  );
}
