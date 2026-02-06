"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function NotFound() {
  const prefersReducedMotion = useReducedMotion();
  const orbRef = useRef<HTMLDivElement | null>(null);

  const pupilX = useMotionValue(0);
  const pupilY = useMotionValue(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      pupilX.set(0);
      pupilY.set(0);
      return;
    }
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    const clamp = (v: number, min: number, max: number) =>
      Math.max(min, Math.min(max, v));

    const maxOffset = 9;

    const onMove = (e: MouseEvent) => {
      if (!orbRef.current) return;
      const rect = orbRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      const dist = Math.hypot(dx, dy) || 1;
      const nx = dx / dist;
      const ny = dy / dist;
      const strength = Math.min(1, dist / 220);
      const offset = maxOffset * strength;

      pupilX.set(clamp(nx * offset, -maxOffset, maxOffset));
      pupilY.set(clamp(ny * offset, -maxOffset, maxOffset));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      pupilX.set(0);
      pupilY.set(0);
    };
  }, [prefersReducedMotion, pupilX, pupilY]);

  return (
    <main className="min-h-[100svh] px-6 md:px-16 flex items-center">
      <motion.div
        aria-hidden="true"
        ref={orbRef}
        className="fixed inset-0 m-auto h-[168px] w-[168px] rounded-full pointer-events-none z-0 backdrop-blur-[10px] relative"
        style={{
          opacity: 0.34,
          background:
            "radial-gradient(55% 55% at 30% 28%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 70%), radial-gradient(65% 65% at 70% 72%, rgba(236,72,153,0.28) 0%, rgba(59,130,246,0.22) 55%, rgba(124,58,237,0.18) 100%), linear-gradient(145deg, rgba(59,130,246,0.22), rgba(168,85,247,0.18), rgba(236,72,153,0.14))",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -18px 38px rgba(0,0,0,0.05)",
          willChange: "transform",
        }}
      >
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-[46%] -translate-x-[18px]">
            <motion.div
              className="h-3 w-3 rounded-full bg-black/80"
              style={{ x: pupilX, y: pupilY }}
            />
          </div>
          <div className="absolute left-1/2 top-[46%] translate-x-[18px]">
            <motion.div
              className="h-3 w-3 rounded-full bg-black/80"
              style={{ x: pupilX, y: pupilY }}
            />
          </div>
        </div>
      </motion.div>
      <motion.section
        initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="w-full max-w-5xl hero-text"
      >
        <h1 className="text-[clamp(4.5rem,16vw,9rem)] font-light leading-[0.86] tracking-tight">
          404
        </h1>

        <p className="mt-4 text-base md:text-lg text-neutral-500 max-w-md leading-relaxed">
          This page does not exist.
        </p>

        <Link
          href="/"
          className="
            inline-flex items-center gap-2.5
            mt-12
            text-[13px] text-neutral-400
            hover:text-neutral-900
            transition-colors duration-300
            group
          "
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>
          <span className="tracking-wide">Back to home</span>
        </Link>
      </motion.section>
    </main>
  );
}
