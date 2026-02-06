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

  // Natural sizing classes - respects intrinsic video dimensions
  const naturalClasses = `block w-full max-w-full h-auto ${className}`;

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      className={naturalClasses}
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}
