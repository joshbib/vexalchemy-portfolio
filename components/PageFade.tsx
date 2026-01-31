"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageFade({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isWorkRoute = pathname.startsWith("/work");

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: isWorkRoute ? 1 : 0.94 }}
        transition={{
          duration: isWorkRoute ? 0.14 : 0.22,
          ease: "linear",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
