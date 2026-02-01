import MediaBlock from "@/components/MediaBlock";

export default function FeaturedProject() {
  return (
    <section className="px-6 md:px-16 pt-[20vh] pb-[22vh]">
      <div className="max-w-5xl">
        <h1 className="text-4xl md:text-6xl font-medium mb-6">
          Fluid Growth
        </h1>

        <p className="text-muted max-w-xl mb-12">
          Exploration of procedural transformation and organic motion.
        </p>

        <div className="aspect-video bg-neutral-900 overflow-hidden">
          <MediaBlock
            type="video"
            src="https://fj8ihfcthaje7zo0.public.blob.vercel-storage.com/fluid-growth/fluid-growth.mp4"
            mode="poster"
          />
        </div>
      </div>
    </section>
  );
}
