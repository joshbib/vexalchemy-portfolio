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
     VIDEO PROGRESS INDICATOR
  -------------------------- */
  useEffect(() => {
    if (type !== "video" || !videoRef.current) return;

    const video = videoRef.current;
    const progressBar = video.nextElementSibling as HTMLElement;
    
    if (!progressBar || !progressBar.classList.contains('video-progress-bar')) return;

    const updateProgress = () => {
      if (!video.duration || video.paused) return;
      const progress = (video.currentTime / video.duration) * 100;
      progressBar.style.transform = `scaleX(${progress / 100})`;
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', updateProgress);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', updateProgress);
    };
  }, [type]);

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
          style={{ touchAction: "pan-y", pointerEvents: "auto" }}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          draggable={false}
        />
      );
    }

    return (
      <>
        <video
          ref={videoRef}
          src={src}
          preload="none"
          muted
          className="absolute inset-0 w-full h-full object-cover"
          style={{ touchAction: "pan-y", pointerEvents: "auto" }}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          draggable={false}
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
        />
        <div className="video-progress-bar" />
      </>
    );
  }

  /* -------------------------
     HERO MODE — IMAGE
  -------------------------- */
  if (type === "image") {
    return (
      <img 
        src={src} 
        alt="" 
        className="block max-w-full h-auto" 
        style={{ touchAction: "pan-y", pointerEvents: "auto" }}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        draggable={false}
      />
    );
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
        style={{ touchAction: "pan-y", pointerEvents: "auto" }}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        draggable={false}
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
      />
      <div className="video-progress-bar video-progress-bar-hero" />

      <span className="sound-hint">
        <span className="sound-icon" aria-hidden />
        <span className="sound-text">Enable sound</span>
      </span>
    </div>
  );
}
