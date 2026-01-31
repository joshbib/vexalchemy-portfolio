"use client";

import { motion } from "framer-motion";
import MediaBlock from "@/components/MediaBlock";

type ProjectHeroProps = {
  slug: string;
  mediaType: "video" | "image";
  src: string;
};

export default function ProjectHero({
  slug,
  mediaType,
  src,
}: ProjectHeroProps) {
  return (
    <motion.section
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
        flex
        flex-col
        items-center
        pt-16
        pb-20
      "
    >
      {/* MEDIA */}
      <div
        className="
          w-full
          max-w-[520px]
          max-h-[55vh]
          flex
          justify-center
        "
      >
        <MediaBlock
          type={mediaType}
          src={src}
          mode="hero"
        />
      </div>

      {/* SUBTLE END MARK */}
      <div className="mt-16 w-16 h-px bg-black/10" />
    </motion.section>
  );
}
