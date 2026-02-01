import { projects } from "@/lib/projects";
import PageFade from "@/components/PageFade";
import ProjectSwipeShell from "@/components/ProjectSwipeShell";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectHeader from "@/components/ProjectHeader";
import ProjectHero from "@/components/ProjectHero";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;

  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const total = projects.length;

  const prevProject = projects[(index - 1 + total) % total];
  const nextProject = projects[(index + 1) % total];

  return (
    <PageFade>
      <ProjectSwipeShell
        prevHref={`/work/${prevProject.slug}?dir=prev`}
        nextHref={`/work/${nextProject.slug}?dir=next`}
      >
        <main className="min-h-screen">
          {/* BACK */}
          <div className="px-6 md:px-16 pt-12">
            <Link
              href="/"
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                text-gray-500
                transition-all
                duration-300
                ease-out
                hover:text-black
                group
              "
            >
              <span className="transition-transform duration-300 ease-out group-hover:-translate-x-3">
                ←
              </span>
              <span className="transition-transform duration-300 ease-out group-hover:-translate-x-1">
                Back to work
              </span>
            </Link>
          </div>

          {/* HEADER */}
          <section className="px-6 md:px-16 pt-24 pb-20">
            <ProjectHeader
              title={project.title}
              year={project.year}
              description={project.description}
            />
          </section>

          {/* HERO */}
          <section className="px-6 md:px-16 pb-32">
            <div className="flex justify-center">
              <ProjectHero
                slug={project.slug}
                mediaType={project.mediaType}
                src={project.src}
              />
            </div>
          </section>

          {/* PREV / NEXT (desktop) */}
          <section className="px-6 md:px-16 pb-40">
            <div className="flex justify-between max-w-5xl mx-auto text-sm">
              <Link
                href={`/work/${prevProject.slug}?dir=prev`}
                className="text-gray-500 hover:text-black hover:-translate-x-3 transition"
              >
                ← {prevProject.title}
              </Link>

              <Link
                href={`/work/${nextProject.slug}?dir=next`}
                className="text-gray-500 hover:text-black hover:translate-x-3 transition text-right"
              >
                {nextProject.title} →
              </Link>
            </div>
          </section>
        </main>
      </ProjectSwipeShell>
    </PageFade>
  );
}
