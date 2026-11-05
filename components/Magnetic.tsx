"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef } from "react";

export function Magnetic({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function onMove(event: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    x.set((event.clientX - (bounds.left + bounds.width / 2)) * 0.28);
    y.set((event.clientY - (bounds.top + bounds.height / 2)) * 0.28);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? undefined : { x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
