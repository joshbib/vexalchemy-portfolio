"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type MediaBlockProps = {
  src: string;
  poster?: string;
  type: "video" | "image";
  autoplay?: boolean;
};

export default function MediaBlock({
  src,
  poster,
  type,
  autoplay = false,
}: MediaBlockProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasSound, setHasSound] = useState(false);
  const [showAudioHint, setShowAudioHint] = useState(autoplay);

  const layoutSpring = {
    type: "spring" as const,
    stiffness: 160,
    damping: 28,
    mass: 1.2,
  };

  // IMAGE
  if (type === "image") {
    return (
      <motion.img
        layout
        transition={layoutSpring}
        src={src}
        alt=""
        loading="lazy"
        className="w-full h-auto object-contain"
      />
    );
  }

  // VIDEO autoplay
  useEffect(() => {
    if (!autoplay || !videoRef.current) return;
    const video = videoRef.current;
    video.muted = true;
    video.play().catch(() => {});
  }, [autoplay]);

  const onClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!hasSound) {
      video.muted = false;
      setHasSound(true);
      setShowAudioHint(false);
      video.play().catch(() => {});
      return;
    }

    video.paused ? video.play() : video.pause();
  };

  return (
    <motion.div
      layout
      transition={layoutSpring}
      className={`relative ${
        autoplay ? "cursor-pointer" : "pointer-events-none"
      }`}
      onClick={autoplay ? onClick : undefined}
    >
      {showAudioHint && (
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-6">
          <div className="text-xs tracking-wide text-white/80 bg-black/40 backdrop-blur px-3 py-1 rounded-full">
            Click to enable sound
          </div>
        </div>
      )}

      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop
        playsInline
        preload="metadata"
        className="w-full h-auto object-contain"
      />
    </motion.div>
  );
}
