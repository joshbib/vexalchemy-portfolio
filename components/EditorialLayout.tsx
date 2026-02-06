"use client";

import type { LayoutBlock, MediaItem } from "@/lib/project-types";

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
    <div className="w-full py-8 md:py-12">
      <MediaRenderer
        media={media}
        projectTitle={projectTitle}
        index={index}
        className="w-full aspect-[21/9]"
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
          className="aspect-[4/3]"
        />
        <MediaRenderer
          media={media[1]}
          projectTitle={projectTitle}
          index={index * 2 + 1}
          className="aspect-[4/3]"
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
          className="aspect-square"
        />
        <MediaRenderer
          media={media[1]}
          projectTitle={projectTitle}
          index={index * 3 + 1}
          className="aspect-square"
        />
        <MediaRenderer
          media={media[2]}
          projectTitle={projectTitle}
          index={index * 3 + 2}
          className="aspect-square"
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
            className="aspect-[16/10]"
          />
        </div>
        <MediaRenderer
          media={media[1]}
          projectTitle={projectTitle}
          index={index * 2 + 1}
          className="aspect-[16/10]"
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
          className="aspect-[16/10]"
        />
        <div className="md:col-span-2">
          <MediaRenderer
            media={media[1]}
            projectTitle={projectTitle}
            index={index * 2 + 1}
            className="aspect-[16/10]"
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
            className="aspect-[16/10]"
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
        <div className="relative aspect-[16/10] md:aspect-[21/9]">
          <MediaRenderer
            media={media[0]}
            projectTitle={projectTitle}
            index={index * 2}
            className="w-full h-full"
          />
        </div>
        
        {/* Foreground image - offset and elevated */}
        <div className="relative md:absolute md:bottom-[-10%] md:right-[5%] mt-6 md:mt-0 md:w-[45%]">
          <MediaRenderer
            media={media[1]}
            projectTitle={projectTitle}
            index={index * 2 + 1}
            className="aspect-[4/3] shadow-2xl"
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
          className={large ? 'aspect-[21/9]' : 'aspect-[16/10]'}
        />
        <p className="mt-4 md:mt-6 text-[11px] md:text-[13px] text-neutral-500 tracking-wide max-w-[600px]">
          {caption}
        </p>
      </div>
    </div>
  );
}

/* ========================================
   MEDIA RENDERER - Handles image/video
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
  const baseClasses = "relative overflow-hidden rounded-sm bg-neutral-100";
  const combinedClasses = className ? `${baseClasses} ${className}` : baseClasses;

  if (media.type === "image") {
    return (
      <div className={combinedClasses}>
        <img
          src={media.src}
          alt={media.alt || `${projectTitle} - Image ${index + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  // Video
  return (
    <div className={combinedClasses}>
      <video
        src={media.src}
        poster={media.poster}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
}
