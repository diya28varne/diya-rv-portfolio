"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

// Copies per step away from the center letter. The middle reel is the longest.
const rolls = [22, 13, 10, 8, 7, 6, 5];
const cell = 1.2;

export function RollingText({
  text,
  speed = 0.05,
  duration = 4,
  className,
}: {
  text: string;
  speed?: number;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const chars = Array.from(text);
  const center = Math.floor(chars.length / 2);

  return (
    <div className={cn("flex justify-center", className)}>
      {chars.map((char, index) => {
        const distance = Math.abs(index - center);
        const copies = reduce ? 1 : (rolls[Math.min(distance, rolls.length - 1)] ?? 5);
        const glyph = char === " " ? "\u00A0" : char;

        return (
          <Reel
            key={`${char}-${index}`}
            glyph={glyph}
            copies={copies}
            delay={reduce ? 0 : distance * speed}
            duration={reduce ? 0 : duration}
            wide={char === " "}
          />
        );
      })}
    </div>
  );
}

function Reel({
  glyph,
  copies,
  delay,
  duration,
  wide,
}: {
  glyph: string;
  copies: number;
  delay: number;
  duration: number;
  wide: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [play, setPlay] = useState(false);
  const from = `-${(copies - 1) * cell}em`;

  useEffect(() => {
    if (!inView || duration === 0) return;
    const id = window.requestAnimationFrame(() => setPlay(true));
    return () => window.cancelAnimationFrame(id);
  }, [duration, inView]);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="relative inline-block shrink-0 overflow-hidden"
      style={{ height: `${cell}em`, width: wide ? "0.33em" : undefined }}
    >
      <motion.span
        className="flex flex-col"
        initial={{ y: from }}
        animate={{ y: play ? 0 : from }}
        transition={{ duration, delay, ease: [0.7, 0, 0.3, 1] }}
      >
        {Array.from({ length: copies }, (_, copy) => (
          <span
            key={copy}
            className="flex shrink-0 items-center justify-center leading-none"
            style={{ height: `${cell}em` }}
          >
            {glyph}
          </span>
        ))}
      </motion.span>
    </span>
  );
}
