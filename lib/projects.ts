import type { Project } from "./project-types";

export const projects: Project[] = [

  // ========================================
  // PROJECT 5: Feather’s Journey
  // ========================================
  {
    slug: "Feather-Journey",
    title: "Feather’s Journey",
    year: "2026",
    description:
      "A single feather, light and fragile yet purposeful, reminds us that true movement is born not from force, but from acceptance.",
    mediaType: "video",
    src: "https://cdn.bibekjoshi.com/Feather-Journey/web.mp4",
    poster: "/projects/watch-landscape/poster.jpg",

    mediaStack: [
      {
        type: "video",
        src: "https://cdn.bibekjoshi.com/Feather-Journey/feather.mp4",
        poster: "/projects/watch-landscape/poster.jpg",
        alt: "Watch landscape hero sequence",
      },

      {
        type: "video",
        src: "https://cdn.bibekjoshi.com/Feather-Journey/boat.mp4",
        poster: "/projects/watch-landscape/poster.jpg",
        alt: "Watch landscape hero sequence",
      },

    ],
  },


  // ========================================
  // PROJECT 4: WORK SPACE (CANONICAL)
  // ========================================
  {
    slug: "Work-Space",
    title: "Work Space",
    year: "2025",
    description:
      "An exploration of organic motion and spatial balance. Focused on subtle movement, clean forms, and system-driven design.",
    mediaType: "video",
    src: "https://cdn.bibekjoshi.com/Grass/render_grass.mp4",


    /*
    mediaStack: [
      {
        type: "video",
        src: "https://cdn.bibekjoshi.com/Grass/render_grass.mp4",
        alt: "Procedural grass transformation sequence",
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
        alt: "Behind the scenes process video",
      },
    ],
    */                                                                //this is the comment way for the section

  },

  // ========================================
  // PROJECT 3: WATCH LANDSCAPE
  // ========================================
  {
    slug: "Watch-Landscape",
    title: "Watch Landscape",
    year: "2025",
    description:
      "An exploration of form, scale, and stillness. Shaped through structure and subtle variation.",
    mediaType: "video",
    src: "https://cdn.bibekjoshi.com/Grain/final.mov",
    poster: "/projects/watch-landscape/poster.jpg",

    mediaStack: [
      {
        type: "video",
        src: "https://cdn.bibekjoshi.com/Grain/Compare_1.mp4",
        poster: "/projects/watch-landscape/poster.jpg",
        alt: "Watch landscape hero sequence",
      },

      {
        type: "video",
        src: "https://cdn.bibekjoshi.com/Grain/Compare_2.mp4",
        poster: "/projects/watch-landscape/poster.jpg",
        alt: "Watch landscape hero sequence",
      },

    ],
  },

  // ========================================
  // PROJECT 2: FLUID Droplet
  // ========================================
  {
    slug: "Automobile-Porsche",
    title: "Automobile Porsche",
    year: "2025",
    description:
      "A quiet study of motion and form.",
    mediaType: "video",
    src: "https://cdn.bibekjoshi.com/Automobile/Final.mp4",
    poster: "/projects/fluid-rituals/poster.jpg",

    mediaStack: [
      {
        type: "video",
        src: "https://cdn.bibekjoshi.com/Automobile/SH10.mp4",
        poster: "/projects/fluid-rituals/poster.jpg",
        alt: "Fluid rituals hero sequence",
      },
      {
        type: "video",
        src: "https://cdn.bibekjoshi.com/Automobile/sh30.mp4",
        poster: "/projects/fluid-rituals/sequence-01-poster.jpg",
        alt: "Fluid simulation detail sequence",
      },
      {
        type: "video",
        src: "https://cdn.bibekjoshi.com/Automobile/sh31.mp4",
        poster: "/projects/fluid-rituals/sequence-01-poster.jpg",
        alt: "Fluid simulation detail sequence",
      },
      {
        type: "video",
        src: "https://cdn.bibekjoshi.com/Automobile/sh32.mp4",
        poster: "/projects/fluid-rituals/sequence-01-poster.jpg",
        alt: "Fluid simulation detail sequence",
      },

    ],
  },

  // ========================================
  // PROJECT 1: FLUID Droplet
  // ========================================
  {
    slug: "fluid-droplet",
    title: "Fluid Droplet",
    year: "2025",
    description:
      "A quiet observation of surface tension and form.",
    mediaType: "video",
    src: "https://cdn.bibekjoshi.com/Dropper/Final_Dropper.mp4",
    poster: "/projects/fluid-rituals/poster.jpg",

    mediaStack: [
      {
        type: "image",
        src: "https://cdn.bibekjoshi.com/Dropper/Dropper_1.png",
        alt: "Fluid ritual still frame",
      },
      {
        type: "image",
        src: "https://cdn.bibekjoshi.com/Dropper/Dropper_2.png",
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