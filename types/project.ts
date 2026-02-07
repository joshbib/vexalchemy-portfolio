export type MediaItem = {
  type: "image" | "video";
  src: string;
  alt?: string;
  poster?: string;
  caption?: string;
};

export type ProjectSummary = {
  slug: string;
  title: string;
  prefix?: string;
};

export type Project = ProjectSummary & {
  images: string[];
  year?: string;
  description?: string;
  mediaType?: "image" | "video";
  src?: string;
  poster?: string;
  mediaStack?: MediaItem[];
};
