"use client";

import { COLLAGE_IMAGES } from "@/lib/collage-images";

export default function CollageStack() {
  return (
    <>
      {/* COLLAGE GRID */}
      <section className="collage-section pt-24 md:pt-32 pb-24 md:pb-32">
        <div className="px-6 md:px-16 mb-16">
          <p className="text-meta-strong">
            Visual notes · fragments · studies
          </p>
        </div>

        <div className="collage px-6 md:px-16 columns-2 md:columns-4 gap-x-6 md:gap-x-8">
          {COLLAGE_IMAGES.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Visual study ${i + 1}`}
              loading="lazy"
              crossOrigin="anonymous"
              className="collage-item mb-6"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              draggable={false}
            />
          ))}
        </div>
      </section>
    </>
  );
}
