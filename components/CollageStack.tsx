"use client";

import { useState } from "react";

const COLLAGE_IMAGES = [
  "/collage/1.png",
  "/collage/2.png",
  "/collage/3.png",
  "/collage/4.png",
  "/collage/5.png",
];

export default function CollageStack() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <>
      {/* COLLAGE SECTION */}
      <section className="collage-section pt-24 md:pt-32 pb-24 md:pb-32">

        {/* LABEL */}
        <div className="px-6 md:px-16 mb-16">
          <p className="text-meta-strong">
            Visual notes · fragments · studies
          </p>
        </div>

        {/* COLLAGE GRID */}
        <div
          className="
            collage
            px-6 md:px-16
            columns-2 md:columns-4
            gap-x-5 md:gap-x-8
          "
        >
          {COLLAGE_IMAGES.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              loading="lazy"
              onClick={() => setActiveImage(src)}
              className="collage-item"
            />
          ))}
        </div>
      </section>

      {/* FULLSCREEN OVERLAY (THIS PART) */}
      {activeImage && (
        <div
          className="
            fixed inset-0 z-50
            media-overlay
            flex items-center justify-center
          "
          onClick={() => setActiveImage(null)}
        >
          <img
            src={activeImage}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="
              max-w-[92vw]
              max-h-[92vh]
              object-contain
            "
          />
        </div>
      )}
    </>
  );
}
