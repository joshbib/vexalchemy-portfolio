"use client";

import { motion } from "framer-motion";
import MediaBlock from "@/components/MediaBlock";

type ProjectHeroProps = {
  slug: string;
  mediaType: "video" | "image";
  src: string;
  poster?: string;
};

export default function ProjectHero({
  slug,
  mediaType,
  src,
  poster,
}: ProjectHeroProps) {
  return (
    <motion.div
      layout
      layoutId={`project-media-${slug}`}
      transition={{
        type: "spring",
        stiffness: 160,
        damping: 28,
        mass: 1.2,
      }}
      className="
        w-full
        max-w-5xl
        bg-neutral-900
        overflow-hidden
        rounded-none
      "
    >
      <MediaBlock
        type={mediaType}
        src={src}
        poster={poster}
        autoplay
      />
    </motion.div>
  );
}
