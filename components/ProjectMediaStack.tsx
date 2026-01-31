import type { ProjectMediaItem } from "@/lib/project-types";

type Props = {
  media?: ProjectMediaItem[];
};

export default function ProjectMediaStack({ media }: Props) {
  if (!media || media.length === 0) return null;

  return (
    <section className="collage-section px-6 md:px-16 pb-40">
      <div
        className="
          collage
          gap-6
          columns-1
          md:columns-2
          lg:columns-3
        "
      >
        {media.map((item, index) => {
          if (item.type === "image") {
            return (
              <img
                key={index}
                src={item.src}
                alt={item.alt || ""}
                className="collage-item"
                loading="lazy"
              />
            );
          }

          return (
            <video
              key={index}
              src={item.src}
              poster={item.poster}
              controls
              preload="metadata"
              className="collage-item"
            />
          );
        })}
      </div>
    </section>
  );
}
