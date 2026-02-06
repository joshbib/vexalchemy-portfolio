export default function ProjectHeaderSkeleton() {
  return (
    <div className="max-w-6xl animate-pulse">
      <div className="h-3 w-20 rounded-md bg-neutral-800/15 mb-6" />

      <div className="space-y-4 mb-6 md:mb-8">
        <div className="h-10 md:h-14 w-[78%] rounded-md bg-neutral-800/20" />
        <div className="h-10 md:h-14 w-[62%] rounded-md bg-neutral-800/20" />
      </div>

      <div className="space-y-3 max-w-2xl">
        <div className="h-4 w-[92%] rounded-md bg-neutral-800/15" />
        <div className="h-4 w-[70%] rounded-md bg-neutral-800/15" />
      </div>
    </div>
  );
}
