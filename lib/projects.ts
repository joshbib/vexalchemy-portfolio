import type { Project } from "./project-types";

export const projects: Project[] = [
  {
    slug: "Fluid-Growth",
    title: "Fluid Growth",
    year: "2024",
    description:
      "Exploration of procedural transformation and organic motion using Houdini.",
    mediaType: "video",
    src: "/projects/Fluid-Growth/Fluid-Growth.mp4",
    poster: "/projects/Fluid-Growth/Fluid-Growth-poster.png",

    // Extended media shown below navigation
    mediaStack: [
      {
        type: "image",
        src: "/projects/metamorph-studies/frame-01.jpg",
        alt: "Metamorph study still frame",
      },
      {
        type: "image",
        src: "/projects/metamorph-studies/frame-02.jpg",
      },
      {
        type: "video",
        src: "/projects/metamorph-studies/bts.mp4",
        poster: "/projects/metamorph-studies/bts-poster.jpg",
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
    src: "/videos/sample1.mp4",
    poster: "/images/sample1.png",
  },
  {
    slug: "fluid-rituals",
    title: "Fluid Rituals",
    year: "2025",
    description:
      "High-resolution fluid simulations exploring tension, release, and form.",
    mediaType: "video",
    src: "/videos/fluid-rituals.mp4",
    poster: "/images/fluid-rituals.png",
  },
];
