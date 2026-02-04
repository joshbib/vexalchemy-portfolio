import MediaStackSkeleton from "@/components/skeletons/MediaStackSkeleton";

export default function ProjectCardSkeleton() {
  return (
    <article className="px-6 md:px-16 py-[12vh] border-t border-black/10 bg-black/[0.015]">
      <div className="max-w-4xl mb-[6vh] animate-pulse">
        <div className="h-6 md:h-8 w-[60%] rounded-md bg-neutral-800/20 mb-3" />
        <div className="h-3 w-28 rounded-md bg-neutral-800/15" />
      </div>

      <div className="px-0 md:px-16">
        <MediaStackSkeleton />
      </div>
    </article>
  );
}
