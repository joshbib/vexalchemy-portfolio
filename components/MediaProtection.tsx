"use client";

import { useEffect } from "react";

/**
 * MediaProtection - Global client-side media protection
 * Prevents right-click, drag, keyboard shortcuts for downloading media
 */
export default function MediaProtection() {
  useEffect(() => {
    // Prevent right-click context menu on images and videos
    const preventContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG" || target.tagName === "VIDEO") {
        e.preventDefault();
        return false;
      }
    };

    // Prevent drag events on images and videos
    const preventDrag = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG" || target.tagName === "VIDEO") {
        e.preventDefault();
        return false;
      }
    };

    // Prevent keyboard shortcuts for saving images (Ctrl+S, Cmd+S, etc.)
    const preventKeyboardShortcuts = (e: KeyboardEvent) => {
      // Prevent Ctrl+S / Cmd+S (Save)
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        const target = document.activeElement;
        if (
          target?.tagName === "IMG" ||
          target?.tagName === "VIDEO" ||
          document.querySelector("img:hover, video:hover")
        ) {
          e.preventDefault();
          return false;
        }
      }

      // Prevent Ctrl+Shift+I / Cmd+Option+I (DevTools - optional)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "I") {
        // Uncomment to prevent DevTools
        // e.preventDefault();
        // return false;
      }
    };

    // Prevent right-click and long-press on touch devices
    const preventLongPress = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG" || target.tagName === "VIDEO") {
        e.preventDefault();
      }
    };

    // Add event listeners
    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("dragstart", preventDrag);
    document.addEventListener("keydown", preventKeyboardShortcuts);
    document.addEventListener("touchstart", preventLongPress, { passive: false });

    // Cleanup
    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("dragstart", preventDrag);
      document.removeEventListener("keydown", preventKeyboardShortcuts);
      document.removeEventListener("touchstart", preventLongPress);
    };
  }, []);

  // This component doesn't render anything
  return null;
}
