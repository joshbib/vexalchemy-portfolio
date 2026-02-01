"use client";

import { useEffect, useRef } from "react";
import { playExclusive, clearVideo } from "@/lib/videoController";

type Props = {
  src: string;
  poster?: string;
};

export default function ExclusiveVideo({ src, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => playExclusive(video);
    const onStop = () => clearVideo(video);

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onStop);
    video.addEventListener("ended", onStop);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onStop);
      video.removeEventListener("ended", onStop);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      controls
      preload="metadata"
      playsInline
    />
  );
}
