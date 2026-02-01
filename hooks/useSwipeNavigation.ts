"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

type Options = {
  prevHref?: string;
  nextHref?: string;
};

export function useSwipeNavigation({ prevHref, nextHref }: Options) {
  const router = useRouter();

  const startX = useRef(0);
  const startY = useRef(0);
  const startTime = useRef(0);

  return {
    onTouchStart(e: React.TouchEvent) {
      const t = e.touches[0];
      startX.current = t.clientX;
      startY.current = t.clientY;
      startTime.current = Date.now();
    },

    onTouchEnd(e: React.TouchEvent) {
      const t = e.changedTouches[0];
      const dx = t.clientX - startX.current;
      const dy = t.clientY - startY.current;
      const dt = Date.now() - startTime.current;

      // Guards (mobile-safe)
      if (dt > 500) return;
      if (Math.abs(dx) < 60) return;
      if (Math.abs(dx) < Math.abs(dy) * 1.2) return;

      if (dx > 0 && prevHref) {
        router.push(prevHref);
      }

      if (dx < 0 && nextHref) {
        router.push(nextHref);
      }
    },
  };
}
