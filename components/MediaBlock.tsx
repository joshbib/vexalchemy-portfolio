"use client";

import { useEffect, useRef, useState } from "react";

type MediaBlockProps = {
  src: string;
  poster?: string;
  type: "video" | "image";
  autoplay?: boolean;
  mode?: "poster" | "hero";
};

export default function MediaBlock({
  src,
  poster,
  type,
  autoplay = false,
  mode = "poster",
}: MediaBlockProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasSound, setHasSound] = useState(false);

  useEffect(() => {
    if (type !== "video" || !autoplay || !videoRef.current) return;
    const video = videoRef.current;
    video.muted = true;
    video.play().catch(() => {});
  }, [autoplay, type]);

  const onClick = () => {
    if (type !== "video") return;
    const video = videoRef.current;
    if (!video) return;

    if (!hasSound) {
      video.muted = false;
      setHasSound(true);
      video.play().catch(() => {});
      return;
    }

    video.paused ? video.play() : video.pause();
  };

  /* -------------------------
     POSTER / THUMBNAIL MODE
  -------------------------- */
  if (mode === "poster") {
    if (type === "image") {
      return (
        <img
          src={src}
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      );
    }

    return (
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
    );
  }

  /* -------------------------
     HERO / ACTUAL SIZE MODE
  -------------------------- */
  if (type === "image") {
    return (
      <img
        src={src}
        alt=""
        loading="lazy"
        className="block max-w-full h-auto"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      playsInline
      preload="metadata"
      onClick={onClick}
      className="block max-w-full h-auto cursor-pointer"
    />
  );
}
