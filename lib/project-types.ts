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