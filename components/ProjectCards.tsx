"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";

import { projects } from "@/lib/content";

const coverflowCss = `
.project-coverflow {
  width: 100%;
  max-width: 100%;
  padding-bottom: 0.5rem !important;
  overflow: hidden;
}

.project-coverflow .swiper-slide {
  width: min(72vw, 20.5rem);
  height: auto;
  background: transparent;
}

.project-coverflow .swiper-wrapper {
  transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1) !important;
}
`;

export function ProjectCards() {
  const rootRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperInstance | null>(null);
  const demoPlayedRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || demoPlayedRef.current || !swiperRef.current) return;
        demoPlayedRef.current = true;

        const swiper = swiperRef.current;
        window.setTimeout(() => swiper.slideNext(), 450);
        window.setTimeout(() => swiper.slidePrev(), 1500);
      },
      { threshold: 0.4 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={rootRef}
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      className="relative mt-8 w-full max-w-full overflow-hidden"
    >
      <style>{coverflowCss}</style>
      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        loop
        spaceBetween={-24}
        speed={900}
        followFinger={false}
        threshold={12}
        longSwipesRatio={0.25}
        longSwipesMs={280}
        resistanceRatio={0.65}
        coverflowEffect={{
          rotate: 28,
          stretch: 0,
          depth: 140,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="project-coverflow"
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <article className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
              <img
                src={project.image}
                alt={project.imageAlt}
                className="h-40 w-full object-cover object-top sm:h-48"
              />
              <div className="px-4 py-4 sm:px-5 sm:py-5">
                <p className="text-[10px] tracking-[0.16em] text-ivory/50 uppercase">
                  {project.eyebrow} · {project.year}
                </p>
                <h3 className="display mt-2 text-2xl text-ivory sm:text-3xl">{project.name}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted sm:text-[0.95rem]">
                  {project.summary}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {project.highlights.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full border border-white/15 px-2.5 py-0.5 text-xs text-ivory/80"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.links.map((link) => {
                    const source = link.label === "Source";
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className={
                          source
                            ? "inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-xs text-ivory transition-colors hover:border-white/40"
                            : "inline-flex items-center gap-2 rounded-full bg-ivory px-3 py-2 text-xs text-night transition-colors hover:bg-signal hover:text-ivory"
                        }
                      >
                        {source ? <GitHubMark /> : null}
                        {link.label}
                        {source ? null : <Arrow />}
                      </a>
                    );
                  })}
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-3 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Previous project"
          onClick={() => swiperRef.current?.slidePrev()}
          className="flex size-[1.65rem] items-center justify-center rounded-full bg-white text-[0.85rem] font-semibold leading-none text-[#0a0c12] transition-transform hover:scale-105"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Next project"
          onClick={() => swiperRef.current?.slideNext()}
          className="flex size-[1.65rem] items-center justify-center rounded-full bg-white text-[0.85rem] font-semibold leading-none text-[#0a0c12] transition-transform hover:scale-105"
        >
          →
        </button>
      </div>
    </motion.div>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path
        d="M3 11 11 3M5 3h6v6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GitHubMark() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M8 1.2a6.8 6.8 0 0 0-2.1 13.3c.3 0 .5-.1.5-.4v-1.2c-1.9.4-2.3-.8-2.3-.8-.3-.7-.7-.9-.7-.9-.6-.4 0-.4 0-.4.6.1 1 .7 1 .7.6 1 1.5.7 1.9.5.1-.4.2-.7.4-.8-1.5-.2-3.1-.8-3.1-3.3a2.6 2.6 0 0 1 .7-1.8 2.4 2.4 0 0 1 .1-1.8s.6-.2 1.8.7a6.2 6.2 0 0 1 3.3 0c1.2-.9 1.8-.7 1.8-.7a2.4 2.4 0 0 1 .1 1.8 2.6 2.6 0 0 1 .7 1.8c0 2.5-1.6 3.1-3.1 3.3.3.2.5.6.5 1.3v1.9c0 .2.2.4.5.4A6.8 6.8 0 0 0 8 1.2z"
      />
    </svg>
  );
}
