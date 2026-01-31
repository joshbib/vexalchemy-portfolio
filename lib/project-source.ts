import { Project } from "./project-types";
import { projects } from "./projects";

/**
 * SINGLE SOURCE OF TRUTH for fetching projects
 * Later this will fetch from CMS instead
 */

export async function getAllProjects(): Promise<Project[]> {
  return projects.filter(p => p.status !== "draft");
}

export async function getProjectBySlug(
  slug: string
): Promise<Project | null> {
  return projects.find(p => p.slug === slug) ?? null;
}
projects.filter(p => p.status !== "draft")
