export type MediaType = "video" | "image";

export type ProjectStatus = "live" | "draft" | "archived";

/**
 * Additional media items shown
 * AFTER the main project video/image
 */
export type ProjectMediaItem = {
  type: MediaType;
  src: string;
  poster?: string;
  alt?: string;
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  description: string;

  // Primary / hero media
  mediaType: MediaType;
  src: string;
  poster?: string;

  // Optional extended media section
  mediaStack?: ProjectMediaItem[];

  // CMS / publishing control
  status?: ProjectStatus;
};
