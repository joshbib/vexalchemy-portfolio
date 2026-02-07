"use client";

import type { LayoutBlock, MediaItem } from "@/lib/project-types";
import { useEffect, useRef } from "react";

type EditorialLayoutProps = {
  blocks: LayoutBlock[];
  projectTitle: string;
};

export default function EditorialLayout({ blocks, projectTitle }: EditorialLayoutProps) {
  return (
    <section className="editorial-layout">
      {blocks.map((block, index) => (
        <LayoutBlockRenderer key={index} block={block} projectTitle={projectTitle} index={index} />
      ))}
    </section>
  );
}

/* ========================================
   BLOCK RENDERER - Routes to specific layouts
   ======================================== */
function LayoutBlockRenderer({
  block,
  projectTitle,
  index,
}: {
  block: LayoutBlock;
  projectTitle: string;
  index: number;
}) {
  switch (block.layout) {
    case "full":
      return <FullLayout media={block.media} projectTitle={projectTitle} index={index} />;

    case "two-up":
      return <TwoUpLayout media={block.media} projectTitle={projectTitle} index={index} />;

    case "three-up":
      return <ThreeUpLayout media={block.media} projectTitle={projectTitle} index={index} />;

    case "left-heavy":
      return <LeftHeavyLayout media={block.media} projectTitle={projectTitle} index={index} />;

    case "right-heavy":
      return <RightHeavyLayout media={block.media} projectTitle={projectTitle} index={index} />;

    case "vertical-stack":
      return <VerticalStackLayout media={block.media} projectTitle={projectTitle} index={index} />;

    case "offset-duo":
      return <OffsetDuoLayout media={block.media} projectTitle={projectTitle} index={index} />;

    case "caption-hero":
      return (
        <CaptionHeroLayout
          media={block.media}
          caption={block.caption}
          large={block.large}
          projectTitle={projectTitle}
          index={index}
        />
      );

    default:
      return null;
  }
}

/* ========================================
   LAYOUT COMPONENTS
   All layouts now use natural media sizing (no forced aspect ratios)
   ======================================== */

// 1. FULL BLEED
function FullLayout({
  media,
  projectTitle,
  index,
}: {
  media: MediaItem;
  projectTitle: string;
  index: number;
}) {
  return (
    <div className="w-full py-8 md:py-12 flex justify-center">
      <MediaRenderer
        media={media}
        projectTitle={projectTitle}
        index={index}
        className=""
      />
    </div>
  );
}

// 2. TWO-UP (Equal columns)
function TwoUpLayout({
  media,
  projectTitle,
  index,
}: {
  media: [MediaItem, MediaItem];
  projectTitle: string;
  index: number;
}) {
  return (
    <div className="px-6 md:px-16 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-[1400px] mx-auto">
        <MediaRenderer
          media={media[0]}
          projectTitle={projectTitle}
          index={index * 2}
          className=""
        />
        <MediaRenderer
          media={media[1]}
          projectTitle={projectTitle}
          index={index * 2 + 1}
          className=""
        />
      </div>
    </div>
  );
}

// 3. THREE-UP (Equal columns)
function ThreeUpLayout({
  media,
  projectTitle,
  index,
}: {
  media: [MediaItem, MediaItem, MediaItem];
  projectTitle: string;
  index: number;
}) {
  return (
    <div className="px-6 md:px-16 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-[1400px] mx-auto">
        <MediaRenderer
          media={media[0]}
          projectTitle={projectTitle}
          index={index * 3}
          className=""
        />
        <MediaRenderer
          media={media[1]}
          projectTitle={projectTitle}
          index={index * 3 + 1}
          className=""
        />
        <MediaRenderer
          media={media[2]}
          projectTitle={projectTitle}
          index={index * 3 + 2}
          className=""
        />
      </div>
    </div>
  );
}

// 4. LEFT-HEAVY (2:1 ratio)
function LeftHeavyLayout({
  media,
  projectTitle,
  index,
}: {
  media: [MediaItem, MediaItem];
  projectTitle: string;
  index: number;
}) {
  return (
    <div className="px-6 md:px-16 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-[1400px] mx-auto">
        <div className="md:col-span-2">
          <MediaRenderer
            media={media[0]}
            projectTitle={projectTitle}
            index={index * 2}
            className=""
          />
        </div>
        <MediaRenderer
          media={media[1]}
          projectTitle={projectTitle}
          index={index * 2 + 1}
          className=""
        />
      </div>
    </div>
  );
}

// 5. RIGHT-HEAVY (1:2 ratio)
function RightHeavyLayout({
  media,
  projectTitle,
  index,
}: {
  media: [MediaItem, MediaItem];
  projectTitle: string;
  index: number;
}) {
  return (
    <div className="px-6 md:px-16 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-[1400px] mx-auto">
        <MediaRenderer
          media={media[0]}
          projectTitle={projectTitle}
          index={index * 2}
          className=""
        />
        <div className="md:col-span-2">
          <MediaRenderer
            media={media[1]}
            projectTitle={projectTitle}
            index={index * 2 + 1}
            className=""
          />
        </div>
      </div>
    </div>
  );
}

// 6. VERTICAL STACK
function VerticalStackLayout({
  media,
  projectTitle,
  index,
}: {
  media: MediaItem[];
  projectTitle: string;
  index: number;
}) {
  return (
    <div className="px-6 md:px-16 py-8 md:py-12">
      <div className="space-y-6 md:space-y-8 max-w-[900px] mx-auto">
        {media.map((item, i) => (
          <MediaRenderer
            key={i}
            media={item}
            projectTitle={projectTitle}
            index={index * 100 + i}
            className=""
          />
        ))}
      </div>
    </div>
  );
}

// 7. OFFSET DUO (Overlapping)
function OffsetDuoLayout({
  media,
  projectTitle,
  index,
}: {
  media: [MediaItem, MediaItem];
  projectTitle: string;
  index: number;
}) {
  return (
    <div className="px-6 md:px-16 py-8 md:py-16">
      <div className="relative max-w-[1400px] mx-auto">
        {/* Background image - larger */}
        <div className="relative">
          <MediaRenderer
            media={media[0]}
            projectTitle={projectTitle}
            index={index * 2}
            className=""
          />
        </div>

        {/* Foreground image - offset and elevated */}
        <div className="relative md:absolute md:bottom-[-10%] md:right-[5%] mt-6 md:mt-0 md:w-[45%]">
          <MediaRenderer
            media={media[1]}
            projectTitle={projectTitle}
            index={index * 2 + 1}
            className="shadow-2xl"
          />
        </div>
      </div>

      {/* Spacer to prevent overlap on mobile */}
      <div className="h-0 md:h-20" />
    </div>
  );
}

// 8. CAPTION HERO
function CaptionHeroLayout({
  media,
  caption,
  large,
  projectTitle,
  index,
}: {
  media: MediaItem;
  caption: string;
  large?: boolean;
  projectTitle: string;
  index: number;
}) {
  return (
    <div className="px-6 md:px-16 py-8 md:py-12">
      <div className={`mx-auto ${large ? 'max-w-[1600px]' : 'max-w-[1200px]'}`}>
        <MediaRenderer
          media={media}
          projectTitle={projectTitle}
          index={index}
          className=""
        />
        <p className="mt-4 md:mt-6 text-[11px] md:text-[13px] text-neutral-500 tracking-wide max-w-[600px]">
          {caption}
        </p>
      </div>
    </div>
  );
}

/* ========================================
   MEDIA RENDERER - Handles image/video with natural sizing
   Uses intrinsic dimensions like hero media (no forced aspect ratios)
   ======================================== */
function MediaRenderer({
  media,
  projectTitle,
  index,
  className = "",
}: {
  media: MediaItem;
  projectTitle: string;
  index: number;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Viewport-aware video playback
  useEffect(() => {
    if (media.type !== "video" || !videoRef.current) return;

    const video = videoRef.current;

    // Set video properties
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    // Create intersection observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Play when entering viewport
          video.play().catch(() => {
            // Silently handle play failures (common on iOS, etc.)
          });
        } else {
          // Pause when leaving viewport
          video.pause();
        }
      },
      {
        threshold: 0.4 // Play when 40% visible (same as MediaBlock)
      }
    );

    observer.observe(video);

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [media.type]);

  // Natural sizing - respects intrinsic dimensions
  const naturalClasses = `block w-full max-w-full h-auto ${className}`;

  if (media.type === "image") {
    return (
      <img
        src={media.src}
        alt={media.alt || `${projectTitle} - Image ${index + 1}`}
        className={naturalClasses}
        loading="lazy"
        crossOrigin="anonymous"
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        draggable={false}
      />

    );
  }

  // Video with viewport-aware playback and natural sizing
  return (
    <video
      ref={videoRef}
      src={media.src}
      poster={media.poster}
      className={naturalClasses}
      muted
      loop
      playsInline
      preload="metadata"
      crossOrigin="anonymous"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      draggable={false}
      controlsList="nodownload nofullscreen noremoteplayback"
      disablePictureInPicture
    />

  );
}
