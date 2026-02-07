"use client";

import type { ProjectMediaItem } from "@/lib/project-types";

type Props = {
  media?: ProjectMediaItem[];
};

export default function ProjectMediaStack({ media }: Props) {
  if (!media || media.length === 0) return null;

  return (
    <section className="px-6 md:px-16 pb-32 md:pb-40">
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
          md:gap-8
          lg:gap-10
        "
      >
        {media.map((item, index) => {
          if (item.type === "image") {
            return (
              <div
                key={index}
                className="
                  group
                  relative
                  overflow-hidden
                  bg-neutral-50
                  aspect-[4/5]
                "
              >
                <img
                  src={item.src}
                  alt={item.alt || ""}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-[1.02]
                  "
                  loading="lazy"
                  crossOrigin="anonymous"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  draggable={false}
                />

                {item.caption && (
                  <div className="
                    absolute
                    bottom-0
                    left-0
                    right-0
                    p-4
                    bg-gradient-to-t
                    from-black/40
                    to-transparent
                  ">
                    <p className="text-xs text-white/90 tracking-wide">
                      {item.caption}
                    </p>
                  </div>
                )}
              </div>
            );
          }

          return (
            <div
              key={index}
              className="
                relative
                overflow-hidden
                bg-neutral-900
                aspect-video
              "
            >
              <video
                src={item.src}
                poster={item.poster}
                controls
                preload="metadata"
                crossOrigin="anonymous"
                className="
                  w-full
                  h-full
                  object-cover
                "
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                draggable={false}
                controlsList="nodownload nofullscreen noremoteplayback"
                disablePictureInPicture
              />

            </div>
          );
        })}
      </div>
    </section>
  );
}
