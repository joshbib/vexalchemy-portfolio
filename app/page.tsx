import ProjectStack from "@/components/ProjectStack";
import CollageStack from "@/components/CollageStack";
import PageFade from "@/components/PageFade";
import AvailabilityStatus from "@/components/AvailabilityStatus";
import Link from "next/link";

// Instagram SVG Icon
const InstagramIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const BehanceIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M8.228 15.01c0 .546-.145.986-.435 1.319-.29.334-.73.501-1.32.501H4.11V11.23h2.19c.596 0 1.05.151 1.36.452.31.301.467.75.467 1.348 0 .584-.131 1.008-.393 1.272.298.156.494.426.494.708zM6.16 12.352H5.15v1.444h1.01c.42 0 .63-.223.63-.669 0-.516-.21-.775-.63-.775zm.14 2.378H5.15v1.54h1.15c.447 0 .67-.243.67-.73 0-.54-.223-.81-.67-.81zM15.176 13.92h-3.41c.048.718.423 1.076 1.125 1.076.438 0 .768-.112.992-.336l.783.56c-.4.577-1.011.865-1.834.865-1.32 0-2.094-.85-2.094-2.195 0-1.353.76-2.192 2.029-2.192 1.22 0 1.884.791 1.884 1.942v.28zm-1.07-.751c-.015-.658-.328-.987-.938-.987-.585 0-.916.329-.98.987h1.918zM14.07 10.15h-2.5v.643h2.5v-.643zM24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-3.111 0c0-4.909-3.98-8.889-8.889-8.889S3.111 7.091 3.111 12s3.98 8.889 8.889 8.889 8.889-3.98 12-8.889z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

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
                <a
                  href="https://www.instagram.com/vex_alchemy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-black transition-colors"
                >
                  <InstagramIcon />
                  Instagram
                </a>
                <a
                  href="https://www.behance.net/vex_alchemy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-black transition-colors"
                >
                  <BehanceIcon />
                  Behance
                </a>
                <a
                  href="https://www.youtube.com/@vex_alchemy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-black transition-colors"
                >
                  <YoutubeIcon />
                  YouTube
                </a>
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
