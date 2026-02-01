"use client";

import { useState, useEffect } from "react";
import { COLLAGE_IMAGES } from "@/lib/collage-images";

export default function CollageStack() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const closeOverlay = () => {
  if (isClosing) return;

  setIsClosing(true);

  // Clear swipe transform BEFORE exit animation
  const el = document.querySelector(
    ".media-overlay-content"
  ) as HTMLElement | null;

  if (el) {
    el.style.transform = "";
  }

  // Let exit animation fully finish
  setTimeout(() => {
    setActiveImage(null);
    setIsClosing(false);
  }, 200); // slightly longer than CSS close
};


  // ESC key — Fluent close
  useEffect(() => {
    if (!activeImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeOverlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImage]);

  // 🔒 Prevent background scroll when overlay is open
  useEffect(() => {
    if (!activeImage) return;

    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      const y = Math.abs(
        parseInt(document.body.style.top || "0", 10)
      );

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";

      window.scrollTo(0, y);
    };
  }, [activeImage]);

  return (
    <>
      {/* COLLAGE SECTION */}
      <section className="collage-section pt-24 md:pt-32 pb-24 md:pb-32">
        <div className="px-6 md:px-16 mb-16">
          <p className="text-meta-strong">
            Visual notes · fragments · studies
          </p>
        </div>

        <div className="collage px-6 md:px-16 columns-2 md:columns-4 gap-x-5 md:gap-x-8">
          {COLLAGE_IMAGES.map((src, i) => (
            <img
              key={i}
              src={src}
              loading="lazy"
              className="collage-item"
              onLoad={(e) =>
                e.currentTarget.classList.add("is-loaded")
              }
              onClick={() => setActiveImage(src)}
            />
          ))}
        </div>
      </section>

      {/* OVERLAY */}
      {activeImage && (
        <div
          className={`fixed inset-0 z-50 media-overlay media-overlay-enter ${
            isClosing ? "media-overlay-exit" : ""
          } flex items-center justify-center`}
          onClick={closeOverlay}
        >
          <div
            className="media-overlay-content swipeable"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => {
              const touch = e.touches[0];
              e.currentTarget.dataset.startY = String(touch.clientY);
            }}
            onTouchMove={(e) => {
              const startY = Number(e.currentTarget.dataset.startY);
              const currentY = e.touches[0].clientY;
              const deltaY = Math.max(0, currentY - startY);

              const translateY = deltaY * 0.85;
              const scale = 1 - deltaY / 1200;

              e.currentTarget.style.transform =
                `translateY(${translateY}px) scale(${scale})`;
            }}
            onTouchEnd={(e) => {
              const startY = Number(e.currentTarget.dataset.startY);
              const endY = e.changedTouches[0].clientY;
              const deltaY = endY - startY;

              if (deltaY > 120) {
                closeOverlay();
              } else {
                e.currentTarget.style.transform = "";
              }
            }}
          >
            <img
              src={activeImage}
              alt=""
              className="media-overlay-image"
            />
          </div>
        </div>
      )}
    </>
  );
}
