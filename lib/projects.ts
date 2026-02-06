import type { Project } from "./project-types";

export const projects: Project[] = [
  {
    slug: "Work-Space",
    title: "Work Space",
    year: "2024",
    description:
      "Exploration of procedural transformation and organic motion using Houdini.",
    mediaType: "video",

    // Hero video - place in:
    src: "https://bibekjoshi.com/Grass/render_grass.mp4",

    mediaStack: [
      {
        type: "video",  // FIXED: Changed from "image" to "video" (src is .mp4)
        src: "https://bibekjoshi.com/Grass/render_grass.mp4",
        alt: "Fluid growth process frame 1",
      },
      {
        type: "image",
        src: "/projects/fluid-growth/frame-02.jpg",
        alt: "Fluid growth process frame 2",
      },
      {
        type: "image",
        src: "/projects/fluid-growth/frame-03.jpg",
        alt: "Fluid growth process frame 3",
      },
      {
        type: "video",
        src: "/projects/fluid-growth/process.mp4",
        poster: "/projects/fluid-growth/process-poster.jpg",
      },
    ],
  },
  {
    slug: "procedural-relics",
    title: "Procedural Relics",
    year: "2023",
    description:
      "Artifacts generated through rule-based systems and controlled noise.",
    mediaType: "video",
    src: "/projects/procedural-relics/hero.mp4",
    poster: "/projects/procedural-relics/poster.jpg",

    mediaStack: [
      {
        type: "image",
        src: "/projects/procedural-relics/detail-01.jpg",
        alt: "Procedural relic detail",
      },
      {
        type: "image",
        src: "/projects/procedural-relics/detail-02.jpg",
        alt: "Procedural relic detail",
      },
    ],
  },
  {
    slug: "fluid-rituals",
    title: "Fluid Rituals",
    year: "2025",
    description:
      "High-resolution fluid simulations exploring tension, release, and form.",
    mediaType: "video",
    src: "/projects/fluid-rituals/hero.mp4",
    poster: "/projects/fluid-rituals/poster.jpg",

    mediaStack: [
      {
        type: "video",
        src: "/projects/fluid-rituals/sequence-01.mp4",
        poster: "/projects/fluid-rituals/sequence-01-poster.jpg",
      },
      {
        type: "image",
        src: "/projects/fluid-rituals/still-01.jpg",
        alt: "Fluid ritual still frame",
      },
    ],
  },
];

export function getProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/* 
  📁 RECOMMENDED FILE STRUCTURE:
  
  public/
    projects/
      fluid-growth/
        fluid-growth.mp4       (hero video)
        frame-01.jpg
        frame-02.jpg
        frame-03.jpg
        process.mp4
        process-poster.jpg
      
      procedural-relics/
        hero.mp4
        poster.jpg
        detail-01.jpg
        detail-02.jpg
      
      fluid-rituals/
        hero.mp4
        poster.jpg
        sequence-01.mp4
        sequence-01-poster.jpg
        still-01.jpg
*/
