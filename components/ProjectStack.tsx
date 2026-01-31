"use client";

import MediaBlock from "@/components/MediaBlock";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { motion } from "framer-motion";

export default function ProjectStack() {
  return (
    <section className="flex flex-col">
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/work/${project.slug}`}
          className="group block"
        >
          <article
            className="
              px-6 md:px-16
              py-[18vh]
              border-t border-black/10
              transition-colors
              hover:bg-black/[0.025]
            "
          >
            {/* META */}
            <div className="max-w-4xl mb-[8vh]">
              <h2 className="text-2xl md:text-4xl font-medium mb-1">
                {project.title}
              </h2>

              <p className="text-meta">
                {project.year} · {project.mediaType}
              </p>
            </div>

            {/* MEDIA */}
            <div className="px-0 md:px-16">
              <motion.div
              layout
              layoutId={`project-media-${project.slug}`}
              className="
                aspect-video
                bg-neutral-900
                overflow-hidden
                rounded-none
                transform-gpu
                transition-transform duration-500 ease-out
                group-hover:scale-[1.01]
                motion-reduce:transition-none
              "
            >

                <MediaBlock
                  type={project.mediaType}
                  src={project.src}
                  poster={project.poster}
                />
              </motion.div>
            </div>
          </article>
        </Link>
      ))}
    </section>
  );
}
