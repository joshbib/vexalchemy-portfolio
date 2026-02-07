// app/layout.tsx - COMPLETE WITH FULLSCREEN DOT GRID + GPU CURSOR
import "./globals.css";
import "./accessibility.css";
import { Suspense } from "react";
import type { Metadata } from "next";
import MediaProtection from "@/components/MediaProtection";
import GPUCursor from "@/components/GPUCursor"; // ← ADD THIS LINE

export const metadata: Metadata = {
  title: {
    default: "Vex Alchemy — Procedural CGI & Motion Design",
    template: "%s | Vex Alchemy",
  },
  description: "Design-led digital experiences built with restraint and precision. Procedural CGI practice focused on systems-driven motion and form.",
  keywords: ["procedural", "CGI", "motion design", "Houdini", "3D", "simulation", "visual effects"],
  authors: [{ name: "Vex Alchemy" }],
  creator: "Vex Alchemy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vexalchemy.com",
    siteName: "Vex Alchemy",
    title: "Vex Alchemy — Procedural CGI & Motion Design",
    description: "Design-led digital experiences built with restraint and precision.",
    images: [
      {
        url: "https://bibekjoshi.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vex Alchemy — Procedural CGI & Motion Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vex Alchemy — Procedural CGI & Motion Design",
    description: "Design-led digital experiences built with restraint and precision.",
    images: ["https://bibekjoshi.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {/* Global media protection */}
        <MediaProtection />

        {/* GPU Cursor Effect - ADD THIS BLOCK */}
        <GPUCursor />

        {/* Fixed fullscreen dot grid background */}
        <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">

        </div>

        {/* Main content - positioned above the background */}
        <div className="relative z-10">
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </div>
      </body>
    </html>
  );
}