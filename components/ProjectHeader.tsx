"use client";

import { motion } from "framer-motion";

type ProjectHeaderProps = {
  title: string;
  year: string;
  description: string;
};

export default function ProjectHeader({
  title,
  year,
  description,
}: ProjectHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.2,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="max-w-6xl"
    >
      {/* Year - subtle meta */}
      <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 mb-6">
        {year}
      </p>

      {/* Title - commanding presence */}
      <h1 className="
        text-[clamp(2.75rem,6vw,5rem)]
        font-light
        tracking-tight
        leading-[1.05]
        mb-6
        md:mb-8
      ">
        {title}
      </h1>

      {/* Description - elegant subtext */}
      <p className="
        text-lg
        md:text-xl
        leading-relaxed
        text-neutral-600
        max-w-2xl
        font-light
      ">
        {description}
      </p>
    </motion.div>
  );
}
