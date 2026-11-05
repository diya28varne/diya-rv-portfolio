"use client";

import { motion, useReducedMotion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-cards";

import { cn } from "@/lib/utils";

const Skiper49 = () => {
  const images = [
    {
      src: "/images/x.com/13.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/32.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/20.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/21.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/19.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/1.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/2.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/3.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/4.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/5.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/6.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-[#f5f4f3]">
      <Carousel_003 className="" images={images} showPagination loop />
    </div>
  );
};

export { Skiper49 };

const Carousel_003 = ({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 0,
}: {
  images: { src: string; alt: string; href?: string }[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
}) => {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const css = `
  .Carousal_003 {
    width: 100%;
    height: 470px;
    padding-bottom: 42px !important;
  }
  
  .Carousal_003 .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 320px;
    height: 390px;
  }

  .Carousal_003 .swiper-pagination-bullet {
    background: rgba(245, 247, 251, 0.28) !important;
    opacity: 1 !important;
  }

  .Carousal_003 .swiper-pagination-bullet-active {
    background: #e879f9 !important;
  }

  .Carousal_003 .swiper-button-next,
  .Carousal_003 .swiper-button-prev {
    color: #f5f7fb;
    width: 36px;
    height: 36px;
  }

  @media (max-width: 640px) {
    .Carousal_003 .swiper-button-next,
    .Carousal_003 .swiper-button-prev {
      display: none;
    }
  }
`;
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: reduce ? 0 : 0.5,
      }}
      className={cn("relative w-full max-w-4xl px-5", className)}
    >
      <style>{css}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        {ready ? (
        <Swiper
          spaceBetween={spaceBetween}
          speed={reduce ? 0 : 700}
          autoplay={
            autoplay && !reduce
              ? {
                  delay: 1800,
                  disableOnInteraction: true,
                }
              : false
          }
          effect="coverflow"
          grabCursor={!reduce}
          slidesPerView="auto"
          centeredSlides={true}
          loop={Boolean(loop && !reduce)}
          coverflowEffect={{
            rotate: 40,
            stretch: 0,
            depth: 120,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={
            showPagination
              ? {
                  clickable: true,
                }
              : false
          }
          navigation={
            showNavigation
              ? {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }
              : false
          }
          className="Carousal_003"
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        >
          {images.map((image) => (
            <SwiperSlide key={image.src} className="overflow-hidden">
              {image.href ? (
                <a
                  href={image.href}
                  className="block h-full w-full"
                  {...(image.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  <img className="h-full w-full object-cover" src={image.src} alt={image.alt} />
                </a>
              ) : (
                <img className="h-full w-full object-cover" src={image.src} alt={image.alt} />
              )}
            </SwiperSlide>
          ))}
          {showNavigation && (
            <div>
              <div className="swiper-button-next after:hidden" aria-label="Next poster">
                <Chevron dir="right" />
              </div>
              <div className="swiper-button-prev after:hidden" aria-label="Previous poster">
                <Chevron dir="left" />
              </div>
            </div>
          )}
        </Swiper>
        ) : (
          <div className="h-[420px]" />
        )}
      </motion.div>
    </motion.div>
  );
};

export { Carousel_003 };

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75">
      {dir === "left" ? <path d="M15 6 9 12l6 6" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  );
}

/**
 * Skiper 49 Carousel_003 â React + Swiper
 * Built with Swiper.js - Read docs to learn more https://swiperjs.com/
 * Illustrations by AarzooAly - https://x.com/AarzooAly
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.me
 * Twitter: https://x.com/Gur__vi
 */
