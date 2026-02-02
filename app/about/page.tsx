// app/about/page.tsx - FIXED VERSION
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
              text-sm text-neutral-500
              hover:text-black
              transition-colors
              group
            "
          >
            <span className="inline-block transition-transform group-hover:-translate-x-1">
              ←
            </span>
            Back
          </Link>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mt-16 mb-8">
            About
          </h1>

          {/* Content */}
          <div className="space-y-6 max-w-2xl">
            <p className="text-lg leading-relaxed text-neutral-600">
              Vex Alchemy is a procedural CGI practice focused on
              systems-driven motion, simulation, and form.
            </p>
            
            <p className="text-lg leading-relaxed text-neutral-600">
              Built primarily using Houdini, each project explores the
              intersection of algorithmic generation and intentional design.
            </p>

            {/* Contact */}
            <div className="pt-8 mt-12 border-t border-black/10">
              <p className="text-meta-strong mb-4">Get in touch</p>
              <a 
                href="mailto:joshibibekraj@gmail.com"
                className="text-lg text-neutral-600 hover:text-black transition-colors"
              >
                joshibibekraj@gmail.com
              </a>
            </div>
          </div>
        </div>
      </main>
    </PageFade>
  );
}