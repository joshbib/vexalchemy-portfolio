"use client";

import { useRef } from "react";

export function useSwipeScrubVideo(
  videoRef: React.RefObject<HTMLVideoElement>
) {
  const startX = useRef(0);
  const startTime = useRef(0);
  const wasPlaying = useRef(false);

  return {
    onTouchStart(e: React.TouchEvent) {
      if (!videoRef.current) return;

      const v = videoRef.current;
      const t = e.touches[0];

      startX.current = t.clientX;
      startTime.current = v.currentTime;
      wasPlaying.current = !v.paused;

      // Pause during scrub
      v.pause();
    },

    onTouchMove(e: React.TouchEvent) {
      if (!videoRef.current) return;

      const v = videoRef.current;
      const t = e.touches[0];

      const dx = t.clientX - startX.current;

      // SCRUB SENSITIVITY
      // 120px swipe ≈ full duration
      const scrubRatio = dx / 120;

      const newTime =
        startTime.current + scrubRatio * v.duration;

      v.currentTime = Math.max(
        0,
        Math.min(v.duration, newTime)
      );
    },

    onTouchEnd() {
      if (!videoRef.current) return;

      // Resume only if it was playing before
      if (wasPlaying.current) {
        videoRef.current.play().catch(() => {});
      }
    },
  };
}
