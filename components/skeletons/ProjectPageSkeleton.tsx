import ProjectHeaderSkeleton from "@/components/skeletons/ProjectHeaderSkeleton";
import ProjectHeroSkeleton from "@/components/skeletons/ProjectHeroSkeleton";
import ProjectNavSkeleton from "@/components/skeletons/ProjectNavSkeleton";

export default function ProjectPageSkeleton() {
  return (
    <div className="min-h-screen w-full">
      <main className="min-h-screen">
        <div className="px-6 md:px-16 pt-10 md:pt-12">
          <div className="inline-flex items-center gap-2.5 animate-pulse">
            <div className="h-3 w-4 rounded-md bg-neutral-800/15" />
            <div className="h-3 w-20 rounded-md bg-neutral-800/15" />
          </div>
        </div>

        <section className="px-6 md:px-16 pt-8 md:pt-12 pb-16 md:pb-20">
          <ProjectHeaderSkeleton />
        </section>

        <ProjectHeroSkeleton />

        <div className="pb-16 md:pb-24" />

        <ProjectNavSkeleton />
      </main>
    </div>
  );
}
