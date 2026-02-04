import HeroSkeleton from "@/components/skeletons/HeroSkeleton";
import ProjectCardSkeleton from "@/components/skeletons/ProjectCardSkeleton";
import CollageSkeleton from "@/components/skeletons/CollageSkeleton";

export default function Loading() {
  return (
    <main className="flex flex-col">
      <HeroSkeleton />

      <section id="work" className="pt-24 md:pt-32">
        <div className="px-6 md:px-16 mb-16 md:mb-20 animate-pulse">
          <div className="h-3 w-32 rounded-md bg-neutral-800/15 mb-3" />
          <div className="w-12 h-px bg-neutral-800/15" />
        </div>

        <section className="flex flex-col">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </section>
      </section>

      <CollageSkeleton />

      <footer className="px-6 md:px-16 py-20 border-t border-black/10">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="animate-pulse">
            <div className="h-3 w-28 rounded-md bg-neutral-800/15 mb-4" />
            <div className="space-y-3">
              <div className="h-3 w-64 rounded-md bg-neutral-800/10" />
              <div className="h-3 w-48 rounded-md bg-neutral-800/10" />
            </div>
          </div>

          <div className="flex flex-col gap-4 animate-pulse">
            <div className="h-3 w-48 rounded-md bg-neutral-800/10" />
            <div className="flex gap-6">
              <div className="h-3 w-16 rounded-md bg-neutral-800/10" />
              <div className="h-3 w-14 rounded-md bg-neutral-800/10" />
              <div className="h-3 w-14 rounded-md bg-neutral-800/10" />
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-black/5 flex justify-between items-center">
          <div className="h-3 w-32 rounded-md bg-neutral-800/10 animate-pulse" />
          <div className="h-3 w-40 rounded-md bg-neutral-800/10 animate-pulse" />
        </div>
      </footer>
    </main>
  );
}
