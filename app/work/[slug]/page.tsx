// app/work/[slug]/page.tsx - ENHANCED VERSION
import { projects } from "@/lib/projects";
import PageFade from "@/components/PageFade";
import ProjectSwipeShell from "@/components/ProjectSwipeShell";
import ProjectHeader from "@/components/ProjectHeader";
import ProjectHero from "@/components/ProjectHero";
import ProjectMediaStack from "@/components/ProjectMediaStack";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Generate static params for all projects
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for each project
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Vex Alchemy`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;

  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];

  const prevProject = index > 0 ? projects[index - 1] : null;
  const nextProject = index < projects.length - 1 ? projects[index + 1] : null;

  return (
    <PageFade>
      <ProjectSwipeShell
        prevHref={prevProject ? `/work/${prevProject.slug}?dir=prev` : undefined}
        nextHref={nextProject ? `/work/${nextProject.slug}?dir=next` : undefined}
      >
        <main className="min-h-screen">
          {/* BACK */}
          <div className="px-6 md:px-16 pt-12">
            <Link
              href="/"
              className="
                inline-flex items-center gap-2
                text-sm text-neutral-500
                hover:text-black
                transition-all duration-300
                group
              "
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              Back to work
            </Link>
          </div>

          {/* HERO */}
          <ProjectHero
            slug={project.slug}
            mediaType={project.mediaType}
            src={project.src}
          />

          {/* HEADER */}
          <section className="px-6 md:px-16 pb-20">
            <ProjectHeader
              title={project.title}
              year={project.year}
              description={project.description}
            />
          </section>

          {/* MEDIA STACK */}
          {project.mediaStack && (
            <ProjectMediaStack media={project.mediaStack} />
          )}

          {/* NAVIGATION */}
          <nav className="px-6 md:px-16 pb-32 pt-20 flex items-center justify-between border-t border-black/10">
            <div className="flex-1">
              {prevProject ? (
                <Link
                  href={`/work/${prevProject.slug}?dir=prev`}
                  className="project-nav-link project-nav-prev group inline-block"
                >
                  <span className="text-[11px] tracking-wider uppercase text-neutral-400 block mb-2">
                    Previous
                  </span>
                  <span className="text-lg md:text-xl font-medium text-neutral-700 group-hover:text-black">
                    {prevProject.title}
                  </span>
                </Link>
              ) : (
                <div className="opacity-30">
                  <span className="text-[11px] tracking-wider uppercase text-neutral-400 block mb-2">
                    Previous
                  </span>
                  <span className="text-lg text-neutral-300">—</span>
                </div>
              )}
            </div>

            <Link
              href="/"
              className="text-[11px] tracking-wider uppercase text-neutral-500 hover:text-black transition-colors"
            >
              All Projects
            </Link>

            <div className="flex-1 text-right">
              {nextProject ? (
                <Link
                  href={`/work/${nextProject.slug}?dir=next`}
                  className="project-nav-link project-nav-next group inline-block"
                >
                  <span className="text-[11px] tracking-wider uppercase text-neutral-400 block mb-2">
                    Next
                  </span>
                  <span className="text-lg md:text-xl font-medium text-neutral-700 group-hover:text-black">
                    {nextProject.title}
                  </span>
                </Link>
              ) : (
                <div className="opacity-30">
                  <span className="text-[11px] tracking-wider uppercase text-neutral-400 block mb-2">
                    Next
                  </span>
                  <span className="text-lg text-neutral-300">—</span>
                </div>
              )}
            </div>
          </nav>
        </main>
      </ProjectSwipeShell>
    </PageFade>
  );
}