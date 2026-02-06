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

  // ✅ gesture refs (DO NOT use `let`)
  const startX = useRef(0);
  const startTime = useRef(0);
  const wasPlaying = useRef(false);

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
          video.play().catch(() => { });
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
     HERO MODE — IMAGE
  -------------------------- */
  if (type === "image") {
    return <img src={src} alt="" className="block max-w-full h-auto" />;
  }

  /* -------------------------
     HERO VIDEO — CALM SWIPE SCRUB
  -------------------------- */
  return (
    <div
      className="relative media-sound"
      onClick={() => {
        const video = videoRef.current;
        if (!video) return;

        if (video.muted) {
          // First click: unmute and play
          video.muted = false;
          video.play().catch(() => { });
          video.parentElement?.classList.add("sound-enabled");
        } else {
          // Subsequent clicks: toggle play/pause
          if (video.paused) {
            video.play().catch(() => { });
          } else {
            video.pause();
          }
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
        className="block w-full max-w-full max-h-[58vh] md:max-h-[62vh] lg:max-h-[65vh] h-auto cursor-pointer select-none"
        style={{ touchAction: "pan-y" }} // keep vertical scroll
        onTouchStart={(e) => {
          const video = videoRef.current;
          if (!video) return;

          const t = e.touches[0];
          startX.current = t.clientX;
          startTime.current = video.currentTime;
          wasPlaying.current = !video.paused;

          video.pause();
        }}
        onTouchMove={(e) => {
          const video = videoRef.current;
          if (!video) return;

          const dx = e.touches[0].clientX - startX.current;

          // 120px swipe ≈ full duration
          const scrubRatio = dx / 120;
          const nextTime =
            startTime.current + scrubRatio * video.duration;

          video.currentTime = Math.max(
            0,
            Math.min(video.duration, nextTime)
          );
        }}
        onTouchEnd={() => {
          const video = videoRef.current;
          if (!video) return;

          if (wasPlaying.current) {
            video.play().catch(() => { });
          }
        }}
      />

      <span className="sound-hint">
        <span className="sound-icon" aria-hidden />
        <span className="sound-text">Enable sound</span>
      </span>
    </div>
  );
}
