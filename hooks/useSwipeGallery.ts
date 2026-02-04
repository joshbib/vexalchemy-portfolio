"use client";

import { useRef } from "react";

type Direction = "up" | "down";

type Options = {
  count: number;
  index: number;
  onIndexChange: (next: number) => void;
  onClose: (dir: Direction) => void;
};

export function useSwipeGallery({
  count,
  index,
  onIndexChange,
  onClose,
}: Options) {
  const startX = useRef(0);
  const startY = useRef(0);
  const deltaX = useRef(0);
  const deltaY = useRef(0);
  const dragging = useRef(false);

  return {
    onTouchStart(e: React.TouchEvent) {
      const t = e.touches[0];
      startX.current = t.clientX;
      startY.current = t.clientY;
      deltaX.current = 0;
      deltaY.current = 0;
      dragging.current = true;
    },

    onTouchMove(e: React.TouchEvent) {
      if (!dragging.current) return;

      const t = e.touches[0];
      deltaX.current = t.clientX - startX.current;
      deltaY.current = t.clientY - startY.current;

      const el = e.currentTarget as HTMLElement;

      // Decide axis by dominance
      if (Math.abs(deltaY.current) > Math.abs(deltaX.current)) {
        // VERTICAL — drag to close
        el.style.transform = `translateY(${deltaY.current}px)`;
        el.style.opacity = `${1 - Math.min(Math.abs(deltaY.current) / 300, 0.4)}`;
      } else {
        // HORIZONTAL — swipe preview
        el.style.transform = `translateX(${deltaX.current}px)`;
      }
    },

    onTouchEnd(e: React.TouchEvent) {
      if (!dragging.current) return;
      dragging.current = false;

      const absX = Math.abs(deltaX.current);
      const absY = Math.abs(deltaY.current);

      const el = e.currentTarget as HTMLElement;

      const reset = () => {
        el.style.transition =
          "transform 260ms cubic-bezier(0.2,0,0,1), opacity 260ms";
        el.style.transform = "translateX(0) translateY(0)";
        el.style.opacity = "1";
        setTimeout(() => {
          el.style.transition = "";
        }, 260);
      };

      // DRAG CLOSE (UP / DOWN)
      if (absY > absX && absY > 120) {
        onClose(deltaY.current > 0 ? "down" : "up");
        return;
      }

      // SWIPE NEXT / PREV (LEFT / RIGHT)
      if (absX > absY && absX > 80) {
        reset();
        if (deltaX.current < 0 && index < count - 1) {
          onIndexChange(index + 1);
          return;
        }
        if (deltaX.current > 0 && index > 0) {
          onIndexChange(index - 1);
          return;
        }
      }

      // SNAP BACK
      reset();
    },
  };
}
