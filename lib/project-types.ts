export type MediaType = "video" | "image";

export type ProjectStatus = "live" | "draft" | "archived";

export type Project = {
  slug: string;
  title: string;
  year: string;
  description: string;

  mediaType: MediaType;
  src: string;
  poster?: string;

  // CMS / publishing control
  status?: ProjectStatus;
};
