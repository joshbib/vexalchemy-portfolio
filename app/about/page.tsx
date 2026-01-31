import Link from "next/link";
import PageFade from "@/components/PageFade";

export default function About() {
  return (
    <PageFade>
      <main className="min-h-screen px-6 md:px-16 py-32">
        <div className="max-w-4xl">
          {/* Back link */}
          <Link
            href="/"
            className="
              inline-flex items-center gap-2
              text-sm text-gray-400
              hover:text-white
              transition-colors
              group
            "
          >
            <span
              className="
                inline-block
                transition-transform
                group-hover:-translate-x-1
              "
            >
              ←
            </span>
            Back
          </Link>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-medium mt-12 mb-6">
            About
          </h1>

          {/* Content */}
          <p className="text-lg leading-relaxed text-gray-300 max-w-2xl">
            Vex Alchemy is a procedural CGI practice focused on
            systems-driven motion, simulation, and form.
            Built primarily using Houdini.
          </p>
        </div>
      </main>
    </PageFade>
  );
}
