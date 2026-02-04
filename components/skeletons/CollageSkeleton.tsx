const COLLAGE_HEIGHTS = [
  "h-40",
  "h-52",
  "h-48",
  "h-60",
  "h-44",
  "h-56",
  "h-50",
  "h-64",
];

export default function CollageSkeleton() {
  return (
    <section className="collage-section pt-24 md:pt-32 pb-24 md:pb-32">
      <div className="px-6 md:px-16 mb-16">
        <div className="h-3 w-48 rounded-md bg-neutral-800/15 animate-pulse" />
      </div>

      <div className="collage px-6 md:px-16 columns-2 md:columns-4 gap-x-6 md:gap-x-8">
        {COLLAGE_HEIGHTS.map((height, i) => (
          <div key={i} className="mb-6 break-inside-avoid">
            <div className={`w-full ${height} rounded-md bg-neutral-800/10 animate-pulse`} />
          </div>
        ))}
      </div>
    </section>
  );
}
