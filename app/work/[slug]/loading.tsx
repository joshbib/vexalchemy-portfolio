export default function ProjectLoading() {
  return (
    <div className="min-h-screen px-6 md:px-16 py-32">
      <div className="max-w-4xl space-y-8 animate-pulse">
        <div className="h-12 bg-neutral-100 w-1/3 rounded" />
        <div className="h-4 bg-neutral-100 w-1/4 rounded" />
        <div className="h-6 bg-neutral-100 w-2/3 rounded" />
        <div className="aspect-video bg-neutral-100 rounded" />
      </div>
    </div>
  );
}