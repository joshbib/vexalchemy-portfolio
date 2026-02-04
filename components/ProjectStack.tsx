// components/ProjectStack.tsx - COMPLETE VERSION
"use client";

import MediaBlock from "@/components/MediaBlock";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { useState } from "react";

export default function ProjectStack() {
  return (
    <section className="flex flex-col">
      {projects.map((project) => (
        <ProjectArticle key={project.slug} project={project} />
      ))}
    </section>
  );
}

function ProjectArticle({ project }: { project: any }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [touchTimeout, setTouchTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleTouchStart = () => {
    if (touchTimeout) clearTimeout(touchTimeout);
    setIsRevealed(true);
    const timeout = setTimeout(() => setIsRevealed(false), 2400);
    setTouchTimeout(timeout);
  };

  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <article className="px-6 md:px-16 py-[12vh] border-t border-black/10 bg-black/[0.015]">
        {/* META */}
        <div
          className="max-w-4xl mb-[6vh] transition-transform duration-500 ease-out group-hover:-translate-x-1"
          onMouseEnter={() => setIsRevealed(true)}
          onMouseLeave={() => setIsRevealed(false)}
          onTouchStart={handleTouchStart}
        >
          <h2 className="text-2xl md:text-4xl font-medium mb-1">
            {project.title}
          </h2>
          <p
            className="text-meta transition-all duration-[1200ms] ease-out"
            style={{
              opacity: isRevealed ? 1 : 0.48,
              letterSpacing: isRevealed ? "0.02em" : "0.025em",
            }}
          >
            {project.year} · {project.mediaType}
          </p>
        </div>

        {/* MEDIA */}
        <div className="px-0 md:px-16">
          <div
            className="relative aspect-video overflow-hidden group project-card bg-neutral-100"
            onClick={(e) => {
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
            {/* MEDIA with refined transition */}
            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
              <MediaBlock
                type={project.mediaType}
                src={project.src}
                mode="poster"
              />
            </div>

            {/* OVERLAY - COMPLETE */}
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
  );
}
