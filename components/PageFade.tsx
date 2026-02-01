"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { useRef, useEffect } from "react";

export default function PageFade({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prefersReducedMotion = useReducedMotion();

  const firstRender = useRef(true);
  useEffect(() => {
    firstRender.current = false;
  }, []);

  const isWorkRoute = pathname.startsWith("/work");
  const dir = searchParams.get("dir");

  const x =
    dir === "next" ? -8 :
    dir === "prev" ? 8 :
    0;

  return (
    <motion.div
      initial={
        firstRender.current || prefersReducedMotion
          ? false
          : { opacity: 0, x: isWorkRoute ? x : 0 }
      }
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.18,
        ease: [0.2, 0, 0, 1], // Apple cubic
      }}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}
