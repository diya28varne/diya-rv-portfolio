"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export function TracingBeam({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.25"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.4 });
  const top = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative">
      <div
        className="pointer-events-none absolute bottom-0 left-0 top-0 hidden w-3 motion-safe:lg:block"
        aria-hidden="true"
      >
        <div className="absolute inset-y-0 left-1 w-px bg-line" />
        <motion.div style={{ scaleY }} className="absolute inset-y-0 left-1 w-px origin-top bg-signal" />
        <motion.div
          style={{ top }}
          className="absolute left-0 size-2.5 -translate-y-1/2 rounded-full bg-signal"
        />
      </div>
      <div className="lg:pl-8">{children}</div>
    </div>
  );
}
