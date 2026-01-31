"use client";

import { useEffect, useRef } from "react";
import { playExclusive } from "@/lib/videoController";

type MediaBlockProps = {
  src: string;
  type: "video" | "image";
  mode?: "poster" | "hero";
};

export default function MediaBlock({
  src,
  type,
  mode = "poster",
}: MediaBlockProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
  if (!videoRef.current) return;
  videoRef.current.parentElement?.classList.add("sound-muted");
}, []);

  /* -------------------------
     GRID AUTOPLAY (ONLY)
  -------------------------- */
  useEffect(() => {
    if (type !== "video" || mode !== "poster" || !videoRef.current) return;

    const video = videoRef.current;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playExclusive(video);
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [type, mode]);

  /* -------------------------
     HOMEPAGE / GRID MODE
  -------------------------- */
  if (mode === "poster") {
    if (type === "image") {
      return (
        <img
          src={src}
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
      );
    }

    return (
      <video
        ref={videoRef}
        src={src}
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  }

  /* -------------------------
     HERO MODE (USER CONTROL)
  -------------------------- */
  if (type === "image") {
    return <img src={src} alt="" className="block max-w-full h-auto" />;
  }

  return (
    <div
      className="relative media-sound"
      onClick={() => {
        if (!videoRef.current) return;
        const video = videoRef.current;

        if (video.muted) {
          video.muted = false;
          video.play().catch(() => {});
          const wrapper = video.parentElement;
          if (!wrapper) return;

          wrapper.classList.add("sound-enabled");
          wrapper.classList.remove("sound-muted");

        } else {
          video.paused ? video.play() : video.pause();
        }
      }}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="block max-w-full h-auto cursor-pointer select-none"
      />

      <span className="sound-hint">
      <span className="sound-icon" aria-hidden />
      <span className="sound-text">Enable sound</span>
    </span>
    </div>
  );
}
