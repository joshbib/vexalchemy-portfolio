"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function ProjectSwipeShell({
  prevHref,
  nextHref,
  children,
}: {
  prevHref?: string;
  nextHref?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const startX = useRef(0);
  const startY = useRef(0);
  const startTime = useRef(0);

  return (
    <div
      className="min-h-screen w-full"
      style={{
        touchAction: "pan-y", // allow scroll, capture horizontal
      }}
      onTouchStart={(e) => {
        const t = e.touches[0];
        startX.current = t.clientX;
        startY.current = t.clientY;
        startTime.current = Date.now();
      }}
      onTouchEnd={(e) => {
        const t = e.changedTouches[0];
        const dx = t.clientX - startX.current;
        const dy = t.clientY - startY.current;
        const dt = Date.now() - startTime.current;

        // --- HARD GUARDS (mobile-safe) ---
        if (dt > 400) return;                    // too slow
        if (Math.abs(dx) < 60) return;           // too small
        if (Math.abs(dx) < Math.abs(dy) * 1.2) return; // vertical intent

        // --- NAV ---
        if (dx > 0 && prevHref) {
          router.push(prevHref);
        }

        if (dx < 0 && nextHref) {
          router.push(nextHref);
        }
      }}
    >
      {children}
    </div>
  );
}
