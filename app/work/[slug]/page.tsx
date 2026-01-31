import { projects } from "@/lib/projects";
import MediaBlock from "@/components/MediaBlock";
import PageFade from "@/components/PageFade";
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

        {/* HERO MEDIA */}
        <section className="px-6 md:px-16 pb-32">
          <div className="flex justify-center">
            <ProjectHero
              slug={project.slug}
              mediaType={project.mediaType}
              src={project.src}
              poster={project.poster}
            />
          </div>
        </section>

       {/* PREV / NEXT */}
      <section className="px-6 md:px-16 pb-40">
        <div className="flex justify-center">
          <div
            className="
              w-full
              max-w-5xl
              flex
              justify-between
              text-sm
            "
          >
            <Link
            href={`/work/${prevProject.slug}`}
            className="
              inline-flex
              items-center
              gap-2
              text-gray-500
              transition-all
              duration-300
              ease-out
              hover:text-black
              hover:-translate-x-3
            "
          >
            ← <span>{prevProject.title}</span>
          </Link>

           <Link
            href={`/work/${nextProject.slug}`}
            className="
              inline-flex
              items-center
              gap-2
              text-gray-500
              transition-all
              duration-300
              ease-out
              hover:text-black
              hover:translate-x-3
              text-right
            "
          >
            <span>{nextProject.title}</span> →
          </Link>

          </div>
        </div>
      </section>

      </main>
    </PageFade>
  );
}
