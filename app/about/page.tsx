// app/about/page.tsx
import Link from "next/link";
import Image from "next/image";
import PageFade from "@/components/PageFade";

// Instagram SVG Icon
const InstagramIcon = () => (
  <svg
    width="16"
    height="16"
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
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M8.228 15.01c0 .546-.145.986-.435 1.319-.29.334-.73.501-1.32.501H4.11V11.23h2.19c.596 0 1.05.151 1.36.452.31.301.467.75.467 1.348 0 .584-.131 1.008-.393 1.272.298.156.494.426.494.708zM6.16 12.352H5.15v1.444h1.01c.42 0 .63-.223.63-.669 0-.516-.21-.775-.63-.775zm.14 2.378H5.15v1.54h1.15c.447 0 .67-.243.67-.73 0-.54-.223-.81-.67-.81zM15.176 13.92h-3.41c.048.718.423 1.076 1.125 1.076.438 0 .768-.112.992-.336l.783.56c-.4.577-1.011.865-1.834.865-1.32 0-2.094-.85-2.094-2.195 0-1.353.76-2.192 2.029-2.192 1.22 0 1.884.791 1.884 1.942v.28zm-1.07-.751c-.015-.658-.328-.987-.938-.987-.585 0-.916.329-.98.987h1.918zM14.07 10.15h-2.5v.643h2.5v-.643zM24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-3.111 0c0-4.909-3.98-8.889-8.889-8.889S3.111 7.091 3.111 12s3.98 8.889 8.889 8.889 8.889-3.98 12-8.889z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

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

          {/* Main Content */}
          <div className="space-y-8 max-w-2xl">
            {/* Introduction */}
            <p className="text-xl md:text-2xl leading-relaxed text-neutral-700 font-light">
              I&apos;m a 3D Generalist and Motion Designer specializing in
              cinematic 3D visuals and architectural visualization.
            </p>

            <p className="text-lg leading-relaxed text-neutral-600">
              I work across the complete 3D production pipeline, delivering
              high-quality renders with a strong focus on lighting, materials,
              and motion.
            </p>

            <p className="text-lg leading-relaxed text-neutral-600">
              I use Blender and Houdini with Redshift to create visually
              refined, production-ready imagery for architecture, products, and
              concept visuals.
            </p>

            {/* Services Section */}
            <div className="pt-8 mt-8 border-t border-black/10">
              <p className="text-meta-strong mb-6">Services</p>
              <ul className="space-y-3 text-neutral-600">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full" />
                  Architectural Visualization
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full" />
                  Cinematic 3D & Motion Design
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full" />
                  3D Modeling, Lighting & Rendering
                </li>
              </ul>
            </div>

            {/* Tools Section */}
            <div className="pt-8 mt-4 border-t border-black/10">
              <p className="text-meta-strong mb-6">Tools</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-neutral-100 rounded-full text-sm text-neutral-700">
                  Blender
                </span>
                <span className="px-4 py-2 bg-neutral-100 rounded-full text-sm text-neutral-700">
                  Houdini
                </span>
                <span className="px-4 py-2 bg-neutral-100 rounded-full text-sm text-neutral-700">
                  Redshift
                </span>
              </div>
            </div>

            {/* Contact Section */}
            <div className="pt-8 mt-4 border-t border-black/10">
              <p className="text-meta-strong mb-4">Get in touch</p>
              <a
                href="mailto:contact@bibekjoshi.com"
                className="text-lg text-neutral-600 hover:text-black transition-colors"
              >
                contact@bibekjoshi.com
              </a>

              {/* Social Links */}
              <div className="flex gap-6 mt-6">
                <a
                  href="https://www.instagram.com/vex_alchemy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-neutral-500 hover:text-black transition-colors"
                >
                  <InstagramIcon />
                  <span className="text-sm">Instagram</span>
                </a>
                <a
                  href="https://www.behance.net/vex_alchemy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-neutral-500 hover:text-black transition-colors"
                >
                  <BehanceIcon />
                  <span className="text-sm">Behance</span>
                </a>
                <a
                  href="https://www.youtube.com/@vex_alchemy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-neutral-500 hover:text-black transition-colors"
                >
                  <YoutubeIcon />
                  <span className="text-sm">YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageFade>
  );
}