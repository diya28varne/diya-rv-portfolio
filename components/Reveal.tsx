"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { Children, isValidElement } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Stronger entrance for big section headers. */
  tone?: "soft" | "section" | "card";
} & Pick<HTMLMotionProps<"div">, "id">;

const tones = {
  soft: { y: 28, blur: 6, duration: 0.85 },
  section: { y: 48, blur: 10, duration: 1.05 },
  card: { y: 36, blur: 8, duration: 0.9 },
} as const;

export function Reveal({ children, className, delay = 0, tone = "soft", id }: RevealProps) {
  const reduce = useReducedMotion();
  const t = tones[tone];

  if (reduce) return <div id={id} className={className}>{children}</div>;

  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: t.y, filter: `blur(${t.blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -6% 0px" }}
      transition={{ duration: t.duration, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Stagger children as they scroll into view (skills, cards, etc.). */
export function RevealStagger({
  children,
  className,
  stagger = 0.08,
  tone = "card",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  tone?: keyof typeof tones;
}) {
  const reduce = useReducedMotion();
  const t = tones[tone];

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -4% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return child;
        return (
          <motion.div
            variants={{
              hidden: { opacity: 0, y: t.y, filter: `blur(${t.blur}px)` },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: t.duration, ease },
              },
            }}
          >
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
