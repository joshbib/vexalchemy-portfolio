import { notFound } from "next/navigation";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";

export const dynamic = "force-static";
export const runtime = "nodejs";

export function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

type Props = {
  params: { slug: string };
};

export default function ProjectPage({ params }: Props) {
  const { slug } = params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 md:px-16 py-16">
      <div className="max-w-5xl mb-10">
        <p className="text-meta-strong mb-3">Project</p>
        <h1 className="text-[clamp(2.5rem,7vw,4rem)] font-light tracking-tight leading-[1.05]">
          {project.title}
        </h1>
      </div>

      {project.mediaStack && project.mediaStack.length > 0 && (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.mediaStack.map((media, index) => (
            <div
              key={`${media.src}-${index}`}
              className="overflow-hidden rounded-md bg-neutral-100 aspect-[4/3]"
            >
              {media.type === "image" ? (
                <img
                  src={media.src}
                  alt={media.alt || `${project.title} asset ${index + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <video
                  src={media.src}
                  poster={media.poster}
                  className="h-full w-full object-cover"
                  controls
                  muted
                  loop
                />
              )}
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
