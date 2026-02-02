import type { Project } from "./project-types";

export const projects: Project[] = [
  {
    slug: "fluid-growth",
    title: "Fluid Growth",
    year: "2024",
    description:
      "Exploration of procedural transformation and organic motion using Houdini.",
    mediaType: "video",

    // ✅ Vercel Blob video URL
    src: "https://fj8ihfcthaje7zo0.public.blob.vercel-storage.com/projects/Fluid-Growth/fluid-growth.mp4",

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
        src: "https://fj8ihfcthaje7zo0.public.blob.vercel-storage.com/projects/Fluid-Growth/fluid-growth.mp4",
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
