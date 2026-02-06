// lib/project-types.ts - ENHANCED
export type MediaType = "video" | "image";
export type ProjectStatus = "live" | "draft" | "archived";
export type ProjectCategory = "simulation" | "procedural" | "motion" | "experimental";

export type ProjectMediaItem = {
  type: MediaType;
  src: string;
  poster?: string;
  alt?: string;
  caption?: string; // Add captions for context
};

// Individual media item for editorial layouts
export type MediaItem = {
  type: MediaType;
  src: string;
  poster?: string;
  alt?: string;
  caption?: string;
};

// Layout block types
export type LayoutBlock =
  | { layout: "full"; media: MediaItem }
  | { layout: "two-up"; media: [MediaItem, MediaItem] }
  | { layout: "three-up"; media: [MediaItem, MediaItem, MediaItem] }
  | { layout: "left-heavy"; media: [MediaItem, MediaItem] }
  | { layout: "right-heavy"; media: [MediaItem, MediaItem] }
  | { layout: "vertical-stack"; media: MediaItem[] }
  | { layout: "offset-duo"; media: [MediaItem, MediaItem] }
  | { layout: "caption-hero"; media: MediaItem; caption: string; large?: boolean };

export type Project = {
  slug: string;
  title: string;
  year: string;
  description: string;
  category?: ProjectCategory; // Add categories
  tags?: string[]; // Add tags for filtering
  
  // Primary media
  mediaType: MediaType;
  src: string;
  poster?: string;
  
  // Extended media
  mediaStack?: ProjectMediaItem[];
  
  // NEW: Art-directed layout blocks
  editorial?: LayoutBlock[];
  
  // Publishing
  status?: ProjectStatus;
  publishedAt?: string; // ISO date string
  updatedAt?: string;
  
  // SEO
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
};