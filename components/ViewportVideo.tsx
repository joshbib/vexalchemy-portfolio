"use client";

import { useEffect, useRef } from "react";

type ViewportVideoProps = {
  src: string;
  poster?: string;
  className?: string;
};

/**
 * ViewportVideo - A video component that plays only when in viewport
 * Uses natural dimensions (ignores size, just like hero videos)
 * Matches the behavior of the hero video on the main page
 */
export default function ViewportVideo({ src, poster, className = "" }: ViewportVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set video properties for autoplay behavior
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    // Create intersection observer to handle viewport visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Play when video enters viewport
          video.play().catch(() => {
            // Silently handle play failures (e.g., autoplay restrictions)
          });
        } else {
          // Pause when video leaves viewport
          video.pause();
        }
      },
      {
        threshold: 0.4, // Video needs to be 40% visible to play
      }
    );

    observer.observe(video);

    // Cleanup on unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  // Progress indicator
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const progressBar = container.querySelector('.video-progress-bar') as HTMLElement;
    if (!progressBar) return;

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
  }, []);

  // Natural sizing classes - respects intrinsic video dimensions
  const naturalClasses = `block w-full max-w-full h-auto ${className}`;

  return (
    <div ref={containerRef} className="relative inline-block w-full">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className={naturalClasses}
        style={{ touchAction: "pan-y", pointerEvents: "auto" }}
        muted
        loop
        playsInline
        preload="metadata"
        crossOrigin="anonymous"
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        draggable={false}
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
      />

      <div className="video-progress-bar video-progress-bar-hero" />
    </div>
  );
}
