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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: 0.18,
        duration: 0.18,
        ease: "linear",
      }}
      className="max-w-4xl"
    >
      <h1 className="text-4xl md:text-5xl font-medium mb-3">
        {title}
      </h1>

      <p className="text-meta mb-8">
        {year}
      </p>

      <p className="text-lg leading-relaxed max-w-2xl">
        {description}
      </p>
    </motion.div>
  );
}
