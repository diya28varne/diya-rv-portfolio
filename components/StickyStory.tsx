"use client";

import type { Project } from "@/lib/content";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { Link001 } from "./ui/skiper-ui/skiper40";

const chaptersOf = (project: Project) => [
  { label: "Problem", body: project.summary },
  { label: "What I built", body: project.points.join(" ") },
  { label: "The hard part", body: project.hardPart },
];

export function StickyStory({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const chapters = chaptersOf(project);
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(chapters.length - 1, Math.floor(value * chapters.length));
    setIndex(next);
  });

  const chapter = chapters[index] ?? chapters[0];

  return (
    <div ref={ref} className="sticky-story relative h-[240vh]">
      <div className="sticky top-8 grid h-[calc(100vh-4rem)] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="kicker">
            <span className="text-signal-deep">{project.index}</span>
            <span className="mx-3">/</span>
            {project.eyebrow}
          </p>
          <h3 className="display mt-3 text-6xl sm:text-7xl">{project.name}</h3>
          <p className="kicker mt-6 text-signal-deep">{chapter.label}</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={chapter.label}
              className="mt-3 max-w-xl text-base leading-relaxed text-muted"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {chapter.body}
            </motion.p>
          </AnimatePresence>
          <div className="mt-6 flex gap-2" aria-hidden="true">
            {chapters.map((item, itemIndex) => (
              <span
                key={item.label}
                className={`h-1 rounded-full transition-all ${
                  itemIndex === index ? "w-8 bg-signal" : "w-3 bg-line"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="on-field bg-ink p-7 text-ivory">
          <p className="kicker">Path</p>
          <ol className="mt-5 space-y-3">
            {project.pipeline.map((step, stepIndex) => (
              <li key={step} className="flex items-center gap-3 text-sm">
                <span
                  className={`grid size-7 place-items-center rounded-full font-mono text-xs ${
                    stepIndex <= index + 1 ? "bg-signal text-ivory" : "border border-ivory/30 text-ivory/60"
                  }`}
                >
                  {stepIndex + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-ivory/20 pt-5">
            {project.specs.map((spec) => (
              <div key={spec.label}>
                <dt className="kicker">{spec.label}</dt>
                <dd className="mt-1 text-sm">{spec.value}</dd>
              </div>
            ))}
          </dl>
          {project.links[0] ? (
            <Link001 href={project.links[0].href} className="mt-6 text-sm text-ivory">
              {project.links[0].label}
            </Link001>
          ) : null}
        </div>
      </div>
    </div>
  );
}
