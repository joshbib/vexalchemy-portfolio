"use client";

import { useState, useEffect } from "react";
import { COLLAGE_IMAGES } from "@/lib/collage-images";

export default function CollageStack() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const closeOverlay = () => {
    if (isClosing) return;
    setIsClosing(true);

    const el = document.querySelector(
      ".media-overlay-content"
    ) as HTMLElement | null;

    if (el) el.style.transform = "";

    setTimeout(() => {
      setActiveImage(null);
      setIsClosing(false);
    }, 200);
  };

  /* ESC key (desktop) */
  useEffect(() => {
    if (!activeImage) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOverlay();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeImage]);

  /* Prevent background scroll */
  useEffect(() => {
    if (!activeImage) return;

    const y = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${y}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, y);
    };
  }, [activeImage]);

  return (
    <>
      {/* COLLAGE */}
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
              onClick={() => setActiveImage(src)}
            />
          ))}
        </div>
      </section>

      {/* OVERLAY */}
      {activeImage && (
        <div
          className={`media-overlay media-overlay-enter ${
            isClosing ? "media-overlay-exit" : ""
          }`}
          onClick={closeOverlay}
        >
          {/* FRAME — never moves */}
          <div className="media-overlay-frame">
            {/* CONTENT — swipe + inertia */}
            <div
              className="media-overlay-content swipeable"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => {
                const t = e.touches[0];
                e.currentTarget.dataset.startY = String(t.clientY);
                e.currentTarget.dataset.startTime = String(Date.now());
                e.currentTarget.dataset.lastY = String(t.clientY);
              }}
              onTouchMove={(e) => {
                const startY = Number(e.currentTarget.dataset.startY);
                const currentY = e.touches[0].clientY;
                const deltaY = currentY - startY;

                e.currentTarget.dataset.lastY = String(currentY);

                const translateY =
                  deltaY > 0 ? deltaY * 0.85 : deltaY * 0.6;

                const scale =
                  deltaY > 0
                    ? 1 - deltaY / 1200
                    : 1 + Math.abs(deltaY) / 1600;

                e.currentTarget.style.transform = `translateY(${translateY}px) scale(${scale})`;
              }}
              onTouchEnd={(e) => {
                const startY = Number(e.currentTarget.dataset.startY);
                const startTime = Number(e.currentTarget.dataset.startTime);
                const lastY = Number(e.currentTarget.dataset.lastY);

                const deltaY = lastY - startY;
                const velocity =
                  deltaY / Math.max(Date.now() - startTime, 1);

                const shouldClose =
                  deltaY > 120 ||
                  deltaY < -90 ||
                  velocity > 0.65 ||
                  velocity < -0.55;

                if (shouldClose) {
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

          {/* EXIT HINT — fixed bottom */}
          <div className="media-exit-hint">
            <span className="hint-touch">Swipe up or down to close</span>
            <span className="hint-keyboard">Press ESC to close</span>
          </div>
        </div>
      )}
    </>
  );
}
