export default function ProjectNavSkeleton() {
  return (
    <nav
      className="
        px-6 md:px-16 
        pb-24 md:pb-32 
        pt-24 md:pt-32
        flex items-center justify-between 
        border-t border-black/[0.06]
      "
    >
      <div className="flex-1">
        <div className="max-w-[140px] md:max-w-none animate-pulse">
          <div className="h-2 w-14 rounded-md bg-neutral-800/15 mb-2 md:mb-3" />
          <div className="h-3 w-24 rounded-md bg-neutral-800/15" />
        </div>
      </div>

      <div className="animate-pulse">
        <div className="h-2 w-20 rounded-md bg-neutral-800/15" />
      </div>

      <div className="flex-1 text-right">
        <div className="max-w-[140px] md:max-w-none ml-auto animate-pulse">
          <div className="h-2 w-10 rounded-md bg-neutral-800/15 mb-2 md:mb-3" />
          <div className="h-3 w-24 rounded-md bg-neutral-800/15" />
        </div>
      </div>
    </nav>
  );
}
