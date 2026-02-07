"use client";

import { motion, useReducedMotion } from "framer-motion";
import MediaBlock from "@/components/MediaBlock";
import EditorialVideoPlayer from "@/components/EditorialVideoPlayer";

type ProjectHeroProps = {
  slug: string;
  mediaType: "video" | "image";
  src: string;
  projectTitle?: string;
  projectYear?: string;
  currentIndex?: number;
  totalCount?: number;
};

export default function ProjectHero({
  slug,
  mediaType,
  src,
  projectTitle,
  projectYear,
  currentIndex = 1,
  totalCount = 1,
}: ProjectHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.32,
        ease: [0.16, 1, 0.3, 1], // Premium ease curve
      }}
      className="
        w-full
        flex
        flex-col
        items-center
        justify-center
        pt-16
        pb-16
        md:pt-20
        md:pb-20
      "
    >
      {/* CENTERED HERO MEDIA - Minimal responsive sizing */}
      <div
        className="
          w-full
          px-6
          md:px-16
          max-w-[1525px]
          flex
          justify-center
          items-center
        "
      >
        {mediaType === "video" ? (
          <EditorialVideoPlayer
            src={src}
            collection="COLLECTION"
            designerTop={projectTitle?.toUpperCase() || slug.toUpperCase()}
            designerBottom={projectTitle?.toUpperCase() || slug.toUpperCase()}
            season={projectYear ? `${projectYear}` : "2024"}
            currentIndex={currentIndex}
            totalCount={totalCount}
          />
        ) : (
          <MediaBlock
            type={mediaType}
            src={src}
            mode="hero"
          />
        )}
      </div>

      {/* Elegant divider */}
      <div className="mt-16 md:mt-20a w-20 h-[1.5px] bg-gradient-to-r from-transparent via-black/15 to-transparent" />
    </motion.section>
  );
}

