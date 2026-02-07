"use client";

import ViewportVideo from "@/components/ViewportVideo";
import type { MediaItem } from "@/types/project";

type ProjectMediaGridProps = {
  mediaStack: MediaItem[];
  projectTitle: string;
};

export default function ProjectMediaGrid({ mediaStack, projectTitle }: ProjectMediaGridProps) {
  return (
    <section className="px-6 md:px-16 pb-16 md:pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1400px] mx-auto">
        {mediaStack.map((media, index) => (
          <div key={`${media.src}-${index}`} className="flex flex-col">
            {media.type === "image" ? (
              <img
                src={media.src}
                alt={media.alt || `${projectTitle} - Image ${index + 1}`}
                className="block w-full max-w-full h-auto"
                loading="lazy"
                crossOrigin="anonymous"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                draggable={false}
              />

            ) : (
              <ViewportVideo
                src={media.src}
                poster={media.poster}
                className=""
              />
            )}
            {media.caption && (
              <p className="mt-3 text-[11px] md:text-[13px] text-neutral-500 tracking-wide">
                {media.caption}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
