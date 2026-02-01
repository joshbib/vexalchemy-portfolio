"use client";

import { useEffect, useRef } from "react";
import { playExclusive, clearVideo } from "@/lib/videoController";

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

  /* --------------------------------
     REGISTER VIDEO WITH CONTROLLER
  --------------------------------- */
  useEffect(() => {
    if (type !== "video" || !videoRef.current) return;

    const video = videoRef.current;

    const onPlay = () => playExclusive(video);
    const onStop = () => clearVideo(video);

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onStop);
    video.addEventListener("ended", onStop);

    return () => {
      onStop();
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onStop);
      video.removeEventListener("ended", onStop);
    };
  }, [type]);

  /* -------------------------
     GRID AUTOPLAY (POSTER)
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
     POSTER MODE
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
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  }

  /* -------------------------
     HERO MODE
  -------------------------- */
  if (type === "image") {
    return <img src={src} alt="" className="block max-w-full h-auto" />;
  }

  return (
    <div
      className="relative media-sound"
      onClick={() => {
        const video = videoRef.current;
        if (!video) return;

        if (video.muted) {
          video.muted = false;
          video.play().catch(() => {});
          video.parentElement?.classList.add("sound-enabled");
          video.parentElement?.classList.remove("sound-muted");
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
