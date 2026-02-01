"use client";

import { motion, useReducedMotion } from "framer-motion";
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
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.28,
        ease: "easeOut",
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
      {/* MEDIA — size NEVER animates */}
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

      <div className="mt-16 w-16 h-px bg-black/10" />
    </motion.section>
  );
}
