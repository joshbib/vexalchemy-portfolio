import ProjectStack from "@/components/ProjectStack";
import CollageStack from "@/components/CollageStack";
import PageFade from "@/components/PageFade";
import AvailabilityStatus from "@/components/AvailabilityStatus";
import Link from "next/link";

export default function Home() {
  return (
    <PageFade>
      <main className="flex flex-col">

        {/* HERO - Enhanced */}
        <section className="page-hero min-h-[100svh] flex items-center px-6 md:px-16 relative overflow-hidden">
          {/* Subtle animated grain texture */}
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
            <div className="grain-overlay" />
          </div>

          {/* Availability status */}
          <AvailabilityStatus />

          <div className="w-full flex flex-col md:flex-row md:items-start md:justify-between relative z-10">
            {/* LEFT */}
            <div className="max-w-5xl hero-text">
              {/* Meta - refined spacing */}
              <span className="text-meta-strong block mb-4 opacity-60">
                Bibek Joshi
              </span>

              {/* Thesis - improved typography hierarchy */}
              <h2 className="text-meta-strong block mb-4 opacity-40">
                Procedural CGI & Motion Design
              </h2>
              <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[0.98] tracking-tight mb-8 hero-title">
                Design-led digital experiences,
                <br className="hidden md:block" />
                <span className="block mt-3">built with restraint</span>
                <span className="block">and precision.</span>
              </h1>

              {/* Support line - better contrast */}
              <p className="text-base md:text-lg text-neutral-500 max-w-lg leading-relaxed">
                Selected work across product, interface, and visual systems.
              </p>
            </div>

            {/* NAV - Enhanced with better spacing */}
            <nav className="flex flex-col md:flex-row gap-8 md:gap-12 text-[13px] tracking-wide mt-16 md:mt-2">
              <a href="#work" className="nav-link text-neutral-600 hover:text-black transition-colors">
                View work
              </a>
              <Link href="/about" className="nav-link text-neutral-600 hover:text-black transition-colors">
                About
              </Link>
              <a href="mailto:contact@bibekjoshi.com" className="nav-link text-neutral-600 hover:text-black transition-colors">
                Contact
              </a>
            </nav>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-6 md:left-16 hidden md:flex flex-col items-center gap-3 opacity-30 animate-fade-in-delayed">
            <span className="text-[9px] tracking-[0.3em] uppercase rotate-180 [writing-mode:vertical-lr] text-neutral-500">
              Scroll
            </span>
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-black to-transparent animate-scroll-pulse" />
          </div>
        </section>


        {/* PROJECTS */}
        <section id="work" className="pt-24 md:pt-32">
          <div className="px-6 md:px-16 mb-16 md:mb-20">
            <h2 className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 mb-3">
              Selected Work
            </h2>
            <div className="w-12 h-px bg-gradient-to-r from-black/20 to-transparent" />
          </div>
          <ProjectStack />
        </section>

        {/* COLLAGE */}
        <CollageStack />


        {/* FOOTER */}
        <footer className="px-6 md:px-16 py-20 border-t border-black/10">
          <div className="flex flex-col md:flex-row justify-between gap-12">
            <div>
              <p className="text-meta-strong mb-4">Bibek Joshi</p>
              <p className="text-sm text-neutral-500 max-w-md leading-relaxed">
                Procedural CGI practice focused on systems-driven motion and form.
              </p>
            </div>

            <div className="flex flex-col gap-4 text-sm">
              <a
                href="mailto:hello@bibekjoshi.com"
                className="text-neutral-600 hover:text-black transition-colors"
              >
                hello@bibekjoshi.com
              </a>

              {/* Add your social links */}
              <div className="flex gap-6 text-neutral-500 mt-2">
                <a href="https://www.instagram.com/vex_alchemy/" className="hover:text-black transition-colors">Instagram</a>
                <a href="https://www.behance.net/vex_alchemy" className="hover:text-black transition-colors">Behance</a>
                <a href="#" className="hover:text-black transition-colors">Vimeo</a>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-black/5 flex justify-between items-center text-[11px] text-neutral-400 tracking-wide">
            <span>© {new Date().getFullYear()} Vex Alchemy</span>
            <span>Built with restraint & precision</span>
          </div>
        </footer>
      </main>
    </PageFade>
  );
}
