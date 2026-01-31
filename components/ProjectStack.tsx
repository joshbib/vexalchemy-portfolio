"use client";

import MediaBlock from "@/components/MediaBlock";
import Link from "next/link";
import { projects } from "@/lib/projects";

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
              py-[12vh]
              border-t border-black/10
              bg-black/[0.015]
            "
          >
            {/* META */}
            <div
              className="
                max-w-4xl mb-[6vh]
                transition-transform duration-500 ease-out
                group-hover:-translate-x-1
              "
            >
              <h2 className="text-2xl md:text-4xl font-medium mb-1">
                {project.title}
              </h2>
              <p className="text-meta">
                {project.year} · {project.mediaType}
              </p>
            </div>

            {/* MEDIA */}
            <div className="px-0 md:px-16">
              <div
                className="relative aspect-video overflow-hidden group project-card"
                onClick={(e) => {
                  // Mobile tap handling
                  if (window.matchMedia("(hover: none)").matches) {
                    const card = e.currentTarget;
                    if (!card.classList.contains("is-active")) {
                      e.preventDefault();
                      card.classList.add("is-active");
                      return;
                    }
                  }
                }}
              >
                {/* MEDIA */}
                <MediaBlock
                  type={project.mediaType}
                  src={project.src}
                  mode="poster"
                />

                {/* OVERLAY */}
                <div className="project-hover-overlay">
                  <h3 className="project-hover-title">
                    {project.title}
                  </h3>

                  <span className="project-hover-action">
                    View Project
                  </span>
                </div>
              </div>

            </div>
          </article>
        </Link>
      ))}
    </section>
  );
}
