"use client";

import { useState, useEffect } from "react";
import { COLLAGE_IMAGES } from "@/lib/collage-images";
import { createPortal } from "react-dom";


export default function CollageStack() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [closing, setClosing] = useState(false);

  function close() {
    if (closing) return;
    setClosing(true);
    setTimeout(() => {
      setActiveImage(null);
      setClosing(false);
    }, 180);
  }

  // ESC close
  useEffect(() => {
    if (!activeImage) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeImage]);

  // Lock background scroll
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
              onClick={() => setActiveImage(src)}
            />
          ))}
        </div>
      </section>

      {/* OVERLAY */}
      {activeImage &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            className={`media-overlay ${closing ? "media-overlay-exit" : "media-overlay-enter"}`}
            onClick={close}
          >
            {/* FRAME — NEVER MOVES */}
            <div className="media-overlay-frame">
              {/* CONTENT — MOTION ONLY */}
              <div
                className="media-overlay-content swipeable"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={activeImage}
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
