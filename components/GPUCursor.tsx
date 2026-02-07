"use client";

import { useEffect, useRef } from "react";

// ============================================================================
// INTERACTIVE ELEMENT DETECTION
// ============================================================================

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

// ============================================================================
// COLOR SYSTEM - CENTRALIZED COLOR THEORY
// ============================================================================

/**
 * Color system based on perceptual luminance and adaptive contrast.
 * All cursor color decisions derive from this single model.
 */
const COLOR_SYSTEM = {
  /**
   * Luminance sampling configuration
   * Uses Rec. 709 coefficients for perceptual luminance calculation
   */
  luminance: {
    // RGB to luminance coefficients (ITU-R BT.709)
    coefficients: {
      red: 0.299,
      green: 0.587,
      blue: 0.114,
    },
    // Size of sampling area in pixels (creates NxN grid)
    sampleSize: 5,
    // Threshold below which background is considered "dark" (0-1 scale)
    darkThreshold: 0.45,
    // Hysteresis band to prevent rapid mode switching (prevents flicker)
    hysteresisBand: 0.08,
  },

  /**
   * Cursor appearance modes
   * Light mode: dark cursor on light backgrounds
   * Dark mode: light cursor on dark backgrounds
   */
  modes: {
    light: {
      // Cursor is dark (black) on light backgrounds
      rgb: { r: 0, g: 0, b: 0 },
      dot: {
        opacity: 0.85,
      },
      ring: {
        opacity: 0.5,
      },
    },
    dark: {
      // Cursor is light (white) on dark backgrounds
      rgb: { r: 255, g: 255, b: 255 },
      dot: {
        opacity: 0.95,
      },
      ring: {
        opacity: 0.7,
      },
    },
  },

  /**
   * Transition behavior between light and dark modes
   */
  transition: {
    // Interpolation speed for color transitions (0-1)
    // Higher = faster transition, lower = smoother
    speed: 0.35,
  },

  /**
   * Opacity thresholds for sampling
   */
  sampling: {
    // Minimum alpha to consider a pixel/layer in luminance calculation
    minAlpha: 0.1,
    // Alpha threshold to stop sampling deeper layers
    opaqueThreshold: 0.95,
  },
} as const;

// ============================================================================
// PHYSICS & MOTION CONSTANTS (unchanged)
// ============================================================================

const MOTION = {
  // Base interpolation factors for smooth following
  dot: {
    baseLerp: 0.22, // Dot follows closer to cursor
  },
  ring: {
    baseLerp: 0.10, // Ring lags behind for parallax effect
    minLerp: 0.04, // Minimum lerp factor during high velocity
  },

  // Velocity-based behavior
  velocity: {
    lagFactor: 0.0008, // How much velocity affects ring lag
  },

  // Magnetic attraction to interactive elements
  magnet: {
    range: 80, // Distance in pixels where magnetism begins
    maxStrength: 0.35, // Maximum pull strength (0-1)
  },

  // Scale response to acceleration
  scale: {
    factor: 0.0003, // Acceleration to scale conversion
    maxDelta: 0.03, // Maximum scale change per frame
    hover: {
      dot: 0.7, // Dot shrinks on hover
      ring: 1.15, // Ring expands on hover
    },
    transitions: {
      dot: 0.12, // Scale interpolation speed for dot
      ring: 0.10, // Scale interpolation speed for ring
    },
  },

  // Hover detection padding
  hoverPadding: 2,
} as const;

// ============================================================================
// GEOMETRY CONSTANTS
// ============================================================================

const GEOMETRY = {
  ring: {
    size: 32,
    borderWidth: 1.5,
  },
  dot: {
    size: 6,
  },
  zIndex: 9999,
} as const;

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface Vec2 {
  x: number;
  y: number;
}

interface HoverState {
  element: Element | null;
  bounds: DOMRect | null;
  center: Vec2 | null;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

// ============================================================================
// COLOR UTILITIES
// ============================================================================

/**
 * Calculate perceptual luminance from RGB values
 * Uses Rec. 709 coefficients for human perception accuracy
 */
function calculateLuminance(r: number, g: number, b: number): number {
  const { coefficients } = COLOR_SYSTEM.luminance;
  return (
    coefficients.red * r +
    coefficients.green * g +
    coefficients.blue * b
  ) / 255;
}

/**
 * Interpolate between light and dark mode colors
 * @param t - Interpolation factor (0 = light mode, 1 = dark mode)
 */
function interpolateColor(t: number): { rgb: RGB; dot: number; ring: number } {
  const { light, dark } = COLOR_SYSTEM.modes;

  return {
    rgb: {
      r: Math.round(lerp(light.rgb.r, dark.rgb.r, t)),
      g: Math.round(lerp(light.rgb.g, dark.rgb.g, t)),
      b: Math.round(lerp(light.rgb.b, dark.rgb.b, t)),
    },
    dot: lerp(light.dot.opacity, dark.dot.opacity, t),
    ring: lerp(light.ring.opacity, dark.ring.opacity, t),
  };
}

/**
 * Format RGB color with opacity as CSS rgba() string
 */
function formatRGBA(rgb: RGB, opacity: number): string {
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
}

// ============================================================================
// MATH UTILITIES
// ============================================================================

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clamp(val: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, val));
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function GPUCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const samplerCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const samplerCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Check if device supports hover (desktop)
  const isDesktop = typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  useEffect(() => {
    // Skip initialization on touch/mobile devices
    if (!isDesktop) return;

    // ========================================================================
    // INITIALIZATION
    // ========================================================================

    // Create offscreen canvas for luminance sampling
    const samplerCanvas = document.createElement("canvas");
    samplerCanvas.width = COLOR_SYSTEM.luminance.sampleSize;
    samplerCanvas.height = COLOR_SYSTEM.luminance.sampleSize;
    const samplerCtx = samplerCanvas.getContext("2d", { willReadFrequently: true });
    samplerCanvasRef.current = samplerCanvas;
    samplerCtxRef.current = samplerCtx;

    // Position state
    const target: Vec2 = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const prevTarget: Vec2 = { x: target.x, y: target.y };
    const velocity: Vec2 = { x: 0, y: 0 };
    const dotPos: Vec2 = { x: target.x, y: target.y };
    const ringPos: Vec2 = { x: target.x, y: target.y };

    // Hover state
    const hoverState: HoverState = {
      element: null,
      bounds: null,
      center: null,
    };

    // Visual state
    let currentDotScale = 1;
    let currentRingScale = 1;
    let isHovering = false;

    // Color state with hysteresis
    let isDarkMode = false; // false = light mode (dark cursor), true = dark mode (light cursor)
    let colorInterpolation = 0; // 0 = light mode, 1 = dark mode

    // Motion tracking
    let prevSpeed = 0;
    let animationId: number;

    // ========================================================================
    // HOVER DETECTION
    // ========================================================================

    function isWithinBounds(x: number, y: number, bounds: DOMRect): boolean {
      const padding = MOTION.hoverPadding;
      return (
        x >= bounds.left - padding &&
        x <= bounds.right + padding &&
        y >= bounds.top - padding &&
        y <= bounds.bottom + padding
      );
    }

    function findInteractiveElement(x: number, y: number): Element | null {
      const elements = document.elementsFromPoint(x, y);
      const selector = INTERACTIVE_SELECTORS.join(", ");

      for (const el of elements) {
        if (el.matches(selector)) return el;
        const closest = el.closest(selector);
        if (closest) return closest;
      }
      return null;
    }

    function updateHoverState(x: number, y: number): void {
      // Check if still within latched element bounds
      if (hoverState.element && hoverState.bounds) {
        if (isWithinBounds(x, y, hoverState.bounds)) return;

        // Left bounds - clear hover state
        hoverState.element = null;
        hoverState.bounds = null;
        hoverState.center = null;
        isHovering = false;
      }

      // Find new interactive element
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
    }

    // ========================================================================
    // LUMINANCE SAMPLING
    // ========================================================================

    /**
     * Sample luminance from DOM elements at cursor position
     * Returns value between 0 (black) and 1 (white)
     */
    function sampleLuminance(x: number, y: number): number {
      const elements = document.elementsFromPoint(x, y);
      let totalLuminance = 0;
      let sampleCount = 0;

      for (const el of elements) {
        // Skip cursor elements
        if (el === ringRef.current || el === dotRef.current) continue;

        // Prioritize media element sampling
        if (
          el instanceof HTMLImageElement ||
          el instanceof HTMLVideoElement ||
          el instanceof HTMLCanvasElement
        ) {
          const luminance = sampleMediaElement(el, x, y);
          if (luminance !== null) {
            return luminance; // Media sampling takes priority
          }
        }

        // Sample computed background color
        const computed = window.getComputedStyle(el);
        const bgColor = computed.backgroundColor;

        // Parse RGBA values
        const match = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (match) {
          const r = parseInt(match[1]);
          const g = parseInt(match[2]);
          const b = parseInt(match[3]);
          const a = match[4] ? parseFloat(match[4]) : 1;

          // Only consider layers with sufficient opacity
          if (a > COLOR_SYSTEM.sampling.minAlpha) {
            const luminance = calculateLuminance(r, g, b);
            totalLuminance += luminance * a;
            sampleCount += a;
          }
        }

        // Stop at opaque layers
        const bgMatch = bgColor.match(/rgba?\([^)]+,\s*([\d.]+)\)$/);
        const alpha = bgMatch ? parseFloat(bgMatch[1]) : 1;
        if (alpha >= COLOR_SYSTEM.sampling.opaqueThreshold && sampleCount > 0) {
          break;
        }
      }

      // Return weighted average, default to light if nothing sampled
      return sampleCount > 0 ? totalLuminance / sampleCount : 0.9;
    }

    /**
     * Sample luminance from media elements using canvas
     * Returns null on failure (cross-origin, etc.)
     */
    function sampleMediaElement(
      el: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement,
      x: number,
      y: number
    ): number | null {
      const ctx = samplerCtxRef.current;
      if (!ctx) return null;

      try {
        const rect = el.getBoundingClientRect();

        // Verify cursor is within element bounds
        if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
          return null;
        }

        // Calculate source dimensions
        const srcWidth =
          el instanceof HTMLCanvasElement
            ? el.width
            : (el as HTMLImageElement).naturalWidth || (el as HTMLVideoElement).videoWidth;
        const srcHeight =
          el instanceof HTMLCanvasElement
            ? el.height
            : (el as HTMLImageElement).naturalHeight || (el as HTMLVideoElement).videoHeight;

        const scaleX = srcWidth / rect.width;
        const scaleY = srcHeight / rect.height;

        const sampleSize = COLOR_SYSTEM.luminance.sampleSize;
        const halfSample = Math.floor(sampleSize / 2);

        const srcX = Math.floor((x - rect.left) * scaleX) - halfSample;
        const srcY = Math.floor((y - rect.top) * scaleY) - halfSample;

        // Sample pixel data
        ctx.clearRect(0, 0, sampleSize, sampleSize);
        ctx.drawImage(el, srcX, srcY, sampleSize, sampleSize, 0, 0, sampleSize, sampleSize);

        const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
        const data = imageData.data;

        let totalLuminance = 0;
        let pixelCount = 0;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3] / 255;

          if (a > COLOR_SYSTEM.sampling.minAlpha) {
            const luminance = calculateLuminance(r, g, b);
            totalLuminance += luminance;
            pixelCount++;
          }
        }

        return pixelCount > 0 ? totalLuminance / pixelCount : null;
      } catch {
        // Fail safely on cross-origin or other errors
        return null;
      }
    }

    // ========================================================================
    // EVENT HANDLERS
    // ========================================================================

    function handlePointerMove(e: PointerEvent): void {
      target.x = e.clientX;
      target.y = e.clientY;
      updateHoverState(e.clientX, e.clientY);
    }

    // ========================================================================
    // ANIMATION LOOP
    // ========================================================================

    function animate(): void {
      // Calculate velocity and acceleration
      velocity.x = target.x - prevTarget.x;
      velocity.y = target.y - prevTarget.y;
      prevTarget.x = target.x;
      prevTarget.y = target.y;

      const speed = Math.hypot(velocity.x, velocity.y);
      const acceleration = speed - prevSpeed;
      prevSpeed = speed;

      // ======================================================================
      // COLOR MODE DETERMINATION WITH HYSTERESIS
      // ======================================================================

      const sampledLuminance = sampleLuminance(dotPos.x, dotPos.y);
      const { darkThreshold, hysteresisBand } = COLOR_SYSTEM.luminance;

      if (isDarkMode) {
        // Currently showing light cursor - only switch if background becomes light
        if (sampledLuminance > darkThreshold + hysteresisBand) {
          isDarkMode = false;
        }
      } else {
        // Currently showing dark cursor - only switch if background becomes dark
        if (sampledLuminance < darkThreshold - hysteresisBand) {
          isDarkMode = true;
        }
      }

      // Smooth color interpolation
      const targetColorT = isDarkMode ? 1 : 0;
      colorInterpolation = lerp(
        colorInterpolation,
        targetColorT,
        COLOR_SYSTEM.transition.speed
      );

      // ======================================================================
      // POSITION CALCULATION WITH MAGNETISM
      // ======================================================================

      let effectiveTargetX = target.x;
      let effectiveTargetY = target.y;

      if (isHovering && hoverState.center) {
        const dist = Math.hypot(
          target.x - hoverState.center.x,
          target.y - hoverState.center.y
        );

        if (dist < MOTION.magnet.range) {
          const strength = Math.min(
            MOTION.magnet.maxStrength,
            ((MOTION.magnet.range - dist) / MOTION.magnet.range) * MOTION.magnet.maxStrength
          );
          effectiveTargetX = lerp(target.x, hoverState.center.x, strength);
          effectiveTargetY = lerp(target.y, hoverState.center.y, strength);
        }
      }

      // Dot follows cursor closely
      dotPos.x = lerp(dotPos.x, effectiveTargetX, MOTION.dot.baseLerp);
      dotPos.y = lerp(dotPos.y, effectiveTargetY, MOTION.dot.baseLerp);

      // Ring lags based on velocity for parallax effect
      const velocityLag = speed * MOTION.velocity.lagFactor;
      const ringLerp = Math.max(MOTION.ring.minLerp, MOTION.ring.baseLerp - velocityLag);
      ringPos.x = lerp(ringPos.x, effectiveTargetX, ringLerp);
      ringPos.y = lerp(ringPos.y, effectiveTargetY, ringLerp);

      // ======================================================================
      // SCALE CALCULATION
      // ======================================================================

      const scaleDelta = clamp(
        acceleration * MOTION.scale.factor,
        -MOTION.scale.maxDelta,
        MOTION.scale.maxDelta
      );

      const targetDotScale = isHovering ? MOTION.scale.hover.dot : 1 - scaleDelta;
      const targetRingScale = isHovering ? MOTION.scale.hover.ring : 1 + scaleDelta;

      currentDotScale = lerp(currentDotScale, targetDotScale, MOTION.scale.transitions.dot);
      currentRingScale = lerp(currentRingScale, targetRingScale, MOTION.scale.transitions.ring);

      // ======================================================================
      // COLOR GENERATION FROM UNIFIED SYSTEM
      // ======================================================================

      const colors = interpolateColor(colorInterpolation);
      const ringColor = formatRGBA(colors.rgb, colors.ring);
      const dotColor = formatRGBA(colors.rgb, colors.dot);

      // ======================================================================
      // APPLY VISUAL UPDATES
      // ======================================================================

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%) scale(${currentDotScale})`;
        dotRef.current.style.backgroundColor = dotColor;
      }

      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${currentRingScale})`;
        ringRef.current.style.borderColor = ringColor;
      }

      animationId = requestAnimationFrame(animate);
    }

    // ========================================================================
    // START ANIMATION
    // ========================================================================

    animate();
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animationId);
    };
  }, [isDesktop]);

  // ==========================================================================
  // RENDER - Hide on mobile/touch devices
  // ==========================================================================

  // Don't render anything on touch/mobile devices
  if (!isDesktop) return null;

  const initialRingColor = formatRGBA(
    COLOR_SYSTEM.modes.light.rgb,
    COLOR_SYSTEM.modes.light.ring.opacity
  );

  const initialDotColor = formatRGBA(
    COLOR_SYSTEM.modes.light.rgb,
    COLOR_SYSTEM.modes.light.dot.opacity
  );

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          width: GEOMETRY.ring.size,
          height: GEOMETRY.ring.size,
          borderRadius: "50%",
          border: `${GEOMETRY.ring.borderWidth}px solid ${initialRingColor}`,
          backgroundColor: "transparent",
          zIndex: GEOMETRY.zIndex,
          willChange: "transform",
        }}
      />

      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          width: GEOMETRY.dot.size,
          height: GEOMETRY.dot.size,
          borderRadius: "50%",
          backgroundColor: initialDotColor,
          zIndex: GEOMETRY.zIndex,
          willChange: "transform",
        }}
      />
    </>
  );
}
