import ProjectStack from "@/components/ProjectStack";
import CollageStack from "@/components/CollageStack";
import PageFade from "@/components/PageFade";
import Link from "next/link";

export default function Home() {
  return (
    <PageFade>
      <main className="flex flex-col">

        {/* HERO */}
        <section className="min-h-[100svh] flex items-center px-6 md:px-16">
          <div className="w-full flex flex-col md:flex-row md:items-start md:justify-between">

            {/* LEFT */}
            <div className="max-w-5xl">
              <h1
                className="
                  text-4xl md:text-6xl
                  font-medium
                  leading-[1.05]
                  mb-6
                  motion-safe:will-change-transform
                "
              >
                Vex Alchemy
              </h1>

              <p className="text-lg md:text-xl text-gray-500 max-w-xl">
                Procedural CGI & motion studies focused on systems,
                simulation, and emergent form.
              </p>
            </div>

            {/* NAV */}
            <nav
              className="
                flex
                flex-col md:flex-row
                gap-6 md:gap-10
                text-sm
                mt-12 md:mt-0
              "
            >
              {/* Anchor links: NO animation on mobile */}
              <a
                href="#work"
                className="nav-link"
              >
                View work
              </a>

              <Link
                href="/about"
                className="nav-link"
              >
                About
              </Link>

              <a
                href="mailto:joshibibekraj@gmail.com"
                className="nav-link"
              >
                Contact
              </a>
            </nav>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="work">
          <ProjectStack />
        </section>

        {/* COLLAGE */}
        <CollageStack />

      </main>
    </PageFade>
  );
}
