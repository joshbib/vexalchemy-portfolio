"use client";

import { useEffect, useRef } from "react";

// Interactive element selectors for hover detection
const INTERACTIVE_SELECTORS = [
  "a",
  "button",
  '[role="button"]',
  '[role="link"]',
  "input",
  "textarea",
  "select",
  "[tabindex]",
  ".project-card",
  ".nav-link",
  ".collage-item",
];

interface Vec2 {
  x: number;
  y: number;
}

interface HoverState {
  element: Element | null;
  bounds: DOMRect | null;
  center: Vec2 | null;
}

// Luminance sampling configuration
const SAMPLE_SIZE = 5; // 5x5 pixel area
const HYSTERESIS_THRESHOLD = 0.08; // Prevents rapid flipping
const LUMINANCE_DARK_THRESHOLD = 0.45; // Below this = dark background

export default function GPUCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const samplerCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const samplerCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    // Create offscreen canvas for sampling
    const samplerCanvas = document.createElement("canvas");
    samplerCanvas.width = SAMPLE_SIZE;
    samplerCanvas.height = SAMPLE_SIZE;
    const samplerCtx = samplerCanvas.getContext("2d", { willReadFrequently: true });
    samplerCanvasRef.current = samplerCanvas;
    samplerCtxRef.current = samplerCtx;

    // Current mouse position (raw target)
    const target: Vec2 = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    // Previous target for velocity calculation
    const prevTarget: Vec2 = { x: target.x, y: target.y };

    // Current velocity
    const velocity: Vec2 = { x: 0, y: 0 };

    // Smoothed positions for each element
    const dotPos: Vec2 = { x: target.x, y: target.y };
    const ringPos: Vec2 = { x: target.x, y: target.y };

    // Latched hover state
    const hoverState: HoverState = {
      element: null,
      bounds: null,
      center: null,
    };

    // Visual state
    let currentDotScale = 1;
    let currentRingScale = 1;
    let isHovering = false;

    // Luminance state with hysteresis
    let currentLuminance = 1; // Start light
    let targetLuminance = 1;
    let isDarkMode = false; // Current display mode

    // Color interpolation
    let currentColorT = 0; // 0 = black cursor, 1 = white cursor

    // Acceleration tracking
    let prevSpeed = 0;

    // Base interpolation factors
    const DOT_BASE_LERP = 0.22;
    const RING_BASE_LERP = 0.10;
    const VELOCITY_LAG_FACTOR = 0.0008;
    const MAGNET_RANGE = 80;
    const MAGNET_STRENGTH_MAX = 0.35;
    const SCALE_FACTOR = 0.0003;
    const MAX_SCALE_DELTA = 0.03;

    let animationId: number;

    // Check if point is within bounds
    const isWithinBounds = (x: number, y: number, bounds: DOMRect, padding = 2): boolean => {
      return (
        x >= bounds.left - padding &&
        x <= bounds.right + padding &&
        y >= bounds.top - padding &&
        y <= bounds.bottom + padding
      );
    };

    // Find interactive element at point
    const findInteractiveElement = (x: number, y: number): Element | null => {
      const elements = document.elementsFromPoint(x, y);
      const selector = INTERACTIVE_SELECTORS.join(", ");

      for (const el of elements) {
        if (el.matches(selector)) return el;
        const closest = el.closest(selector);
        if (closest) return closest;
      }
      return null;
    };

    // Sample luminance from elements at position
    const sampleLuminance = (x: number, y: number): number => {
      const elements = document.elementsFromPoint(x, y);
      let totalLuminance = 0;
      let sampleCount = 0;

      for (const el of elements) {
        // Skip cursor elements and transparent elements
        if (el === ringRef.current || el === dotRef.current) continue;

        // Try to sample from media elements (images, videos, canvas)
        if (el instanceof HTMLImageElement || el instanceof HTMLVideoElement || el instanceof HTMLCanvasElement) {
          const luminance = sampleMediaElement(el, x, y);
          if (luminance !== null) {
            return luminance; // Media luminance takes priority
          }
        }

        // Sample computed background color
        const computed = window.getComputedStyle(el);
        const bgColor = computed.backgroundColor;

        // Parse RGBA
        const match = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (match) {
          const r = parseInt(match[1]);
          const g = parseInt(match[2]);
          const b = parseInt(match[3]);
          const a = match[4] ? parseFloat(match[4]) : 1;

          // Only count opaque-ish backgrounds
          if (a > 0.1) {
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            totalLuminance += luminance * a;
            sampleCount += a;
          }
        }

        // If we hit a fully opaque background, stop
        const bgMatch = bgColor.match(/rgba?\([^)]+,\s*([\d.]+)\)$/);
        const alpha = bgMatch ? parseFloat(bgMatch[1]) : 1;
        if (alpha >= 0.95 && sampleCount > 0) break;
      }

      // Return average luminance, default to light if nothing found
      return sampleCount > 0 ? totalLuminance / sampleCount : 0.9;
    };

    // Sample from media element using canvas
    const sampleMediaElement = (el: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement, x: number, y: number): number | null => {
      const ctx = samplerCtxRef.current;
      if (!ctx) return null;

      try {
        const rect = el.getBoundingClientRect();

        // Check if point is within element bounds
        if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
          return null;
        }

        // Calculate position within the element
        const scaleX = (el instanceof HTMLCanvasElement ? el.width : (el as HTMLImageElement).naturalWidth || (el as HTMLVideoElement).videoWidth) / rect.width;
        const scaleY = (el instanceof HTMLCanvasElement ? el.height : (el as HTMLImageElement).naturalHeight || (el as HTMLVideoElement).videoHeight) / rect.height;

        const srcX = Math.floor((x - rect.left) * scaleX) - Math.floor(SAMPLE_SIZE / 2);
        const srcY = Math.floor((y - rect.top) * scaleY) - Math.floor(SAMPLE_SIZE / 2);

        // Clear and draw sample area
        ctx.clearRect(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
        ctx.drawImage(el, srcX, srcY, SAMPLE_SIZE, SAMPLE_SIZE, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);

        // Read pixels
        const imageData = ctx.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
        const data = imageData.data;

        let totalLuminance = 0;
        let pixelCount = 0;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3] / 255;

          if (a > 0.1) {
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            totalLuminance += luminance;
            pixelCount++;
          }
        }

        return pixelCount > 0 ? totalLuminance / pixelCount : null;
      } catch {
        // Cross-origin or other error
        return null;
      }
    };

    // Update hover state with latching
    const updateHoverState = (x: number, y: number) => {
      if (hoverState.element && hoverState.bounds) {
        if (isWithinBounds(x, y, hoverState.bounds)) return;
        hoverState.element = null;
        hoverState.bounds = null;
        hoverState.center = null;
        isHovering = false;
      }

      const interactiveEl = findInteractiveElement(x, y);
      if (interactiveEl) {
        const rect = interactiveEl.getBoundingClientRect();
        hoverState.element = interactiveEl;
        hoverState.bounds = rect;
        hoverState.center = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
        isHovering = true;
      }
    };

    // Track mouse position
    const handlePointerMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      updateHoverState(e.clientX, e.clientY);
    };

    // Helpers
    const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
    const clamp = (val: number, min: number, max: number): number => Math.min(max, Math.max(min, val));

    // Animation loop
    const animate = () => {
      // Calculate velocity
      velocity.x = target.x - prevTarget.x;
      velocity.y = target.y - prevTarget.y;
      prevTarget.x = target.x;
      prevTarget.y = target.y;

      const speed = Math.hypot(velocity.x, velocity.y);
      const acceleration = speed - prevSpeed;
      prevSpeed = speed;

      // Sample luminance at dot position (more stable than raw cursor)
      targetLuminance = sampleLuminance(dotPos.x, dotPos.y);

      // Apply hysteresis to prevent flicker
      if (isDarkMode) {
        // Currently in dark mode (white cursor)
        // Only switch to light mode if luminance is significantly above threshold
        if (targetLuminance > LUMINANCE_DARK_THRESHOLD + HYSTERESIS_THRESHOLD) {
          isDarkMode = false;
        }
      } else {
        // Currently in light mode (black cursor)
        // Only switch to dark mode if luminance is significantly below threshold
        if (targetLuminance < LUMINANCE_DARK_THRESHOLD - HYSTERESIS_THRESHOLD) {
          isDarkMode = true;
        }
      }

      // Smooth color transition (1-2 frame interpolation)
      const targetColorT = isDarkMode ? 1 : 0;
      currentColorT = lerp(currentColorT, targetColorT, 0.35);

      // Calculate effective target position with magnetic attraction
      let effectiveTargetX = target.x;
      let effectiveTargetY = target.y;

      if (isHovering && hoverState.center) {
        const dist = Math.hypot(target.x - hoverState.center.x, target.y - hoverState.center.y);
        if (dist < MAGNET_RANGE) {
          const strength = Math.min(MAGNET_STRENGTH_MAX, (MAGNET_RANGE - dist) / MAGNET_RANGE * MAGNET_STRENGTH_MAX);
          effectiveTargetX = lerp(target.x, hoverState.center.x, strength);
          effectiveTargetY = lerp(target.y, hoverState.center.y, strength);
        }
      }

      // Position interpolation
      dotPos.x = lerp(dotPos.x, effectiveTargetX, DOT_BASE_LERP);
      dotPos.y = lerp(dotPos.y, effectiveTargetY, DOT_BASE_LERP);

      const velocityLag = speed * VELOCITY_LAG_FACTOR;
      const ringLerp = Math.max(0.04, RING_BASE_LERP - velocityLag);
      ringPos.x = lerp(ringPos.x, effectiveTargetX, ringLerp);
      ringPos.y = lerp(ringPos.y, effectiveTargetY, ringLerp);

      // Scale calculations
      const scaleDelta = clamp(acceleration * SCALE_FACTOR, -MAX_SCALE_DELTA, MAX_SCALE_DELTA);
      const targetDotScale = isHovering ? 0.7 : 1 - scaleDelta;
      const targetRingScale = isHovering ? 1.15 : 1 + scaleDelta;

      currentDotScale = lerp(currentDotScale, targetDotScale, 0.12);
      currentRingScale = lerp(currentRingScale, targetRingScale, 0.10);

      // Interpolated colors (black ↔ white)
      const colorValue = Math.round(currentColorT * 255);
      const ringOpacity = lerp(0.5, 0.7, currentColorT);
      const dotOpacity = lerp(0.85, 0.95, currentColorT);

      const ringColor = `rgba(${colorValue}, ${colorValue}, ${colorValue}, ${ringOpacity})`;
      const dotColor = `rgba(${colorValue}, ${colorValue}, ${colorValue}, ${dotOpacity})`;

      // Apply styles
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%) scale(${currentDotScale})`;
        dotRef.current.style.backgroundColor = dotColor;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${currentRingScale})`;
        ringRef.current.style.borderColor = ringColor;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1.5px solid rgba(0, 0, 0, 0.5)",
          backgroundColor: "transparent",
          zIndex: 9999,
          willChange: "transform",
        }}
      />

      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          zIndex: 9999,
          willChange: "transform",
        }}
      />
    </>
  );
}