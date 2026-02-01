"use client";

import { useState, useEffect } from "react";
import { COLLAGE_IMAGES } from "@/lib/collage-images";
import { createPortal } from "react-dom";
import { useSwipeGallery } from "@/components/hooks/useSwipeGallery";

export default function CollageStack() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [closing, setClosing] = useState(false);
  const [direction, setDirection] = useState<
    "next" | "prev" | "up" | "down" | null
  >(null);

  function close() {
    if (closing) return;
    setClosing(true);
    setTimeout(() => {
      setActiveIndex(null);
      setDirection(null);
      setClosing(false);
    }, 180);
  }

  // ESC close
  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex]);

  // Lock background scroll
  useEffect(() => {
    if (activeIndex === null) return;
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
  }, [activeIndex]);

  const swipe = useSwipeGallery({
    count: COLLAGE_IMAGES.length,
    index: activeIndex ?? 0,
    onIndexChange: (i) => {
      if (activeIndex === null) return;
      setDirection(i > activeIndex ? "next" : "prev");
      setActiveIndex(i);
    },
    onClose: (dir) => {
      setDirection(dir);
      close();
    },
  });

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
              loading="lazy"
              className="collage-item mb-6 cursor-pointer"
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </section>

      {/* OVERLAY */}
      {activeIndex !== null &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            className={`media-overlay ${
              closing ? "media-overlay-exit" : "media-overlay-enter"
            }`}
            onClick={close}
          >
            {/* FRAME — NEVER MOVES */}
            <div className="media-overlay-frame">
              {/* CONTENT — SWIPE TARGET */}
              <div
                key={activeIndex}
                className={`media-overlay-content swipeable ${
                  direction === "next"
                    ? "swipe-next"
                    : direction === "prev"
                    ? "swipe-prev"
                    : direction === "up"
                    ? "swipe-up"
                    : direction === "down"
                    ? "swipe-down"
                    : ""
                }`}
                onClick={(e) => e.stopPropagation()}
                {...swipe}
              >
                <img
                  src={COLLAGE_IMAGES[activeIndex]}
                  alt=""
                  className="media-overlay-image"
                />
              </div>
            </div>

            {/* HINT */}
            <div className="media-exit-hint">
              <span className="hint-touch">Swipe up or down to close</span>
              <span className="hint-keyboard">Press ESC to close</span>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
