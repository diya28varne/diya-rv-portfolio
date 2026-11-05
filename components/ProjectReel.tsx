"use client";

import { Carousel_003 } from "@/components/ui/skiper-ui/skiper49";

const posters = [
  {
    src: "/posters/threatlens-name.svg?v=4",
    alt: "ThreatLens. Intrusion detection. 2025 to present.",
    href: "https://github.com/diya28varne/IDS",
  },
  {
    src: "/posters/crimelens-name.svg?v=5",
    alt: "CrimeLens AI. Karnataka State Police Datathon. 2025.",
    href: "https://github.com/diya28varne/CrimeLens-ai",
  },
  {
    src: "/posters/refmind-name.svg?v=5",
    alt: "RefMind. IBM SkillsBuild AI Builders Challenge. 2024.",
    href: "https://github.com/diya28varne/hands-on-labs",
  },
];

export function ProjectReel() {
  return (
    <div className="mt-10" aria-label="Projects">
      <Carousel_003
        images={posters}
        className="max-w-none px-0"
        showPagination
        showNavigation
        loop
        autoplay
        spaceBetween={0}
      />
    </div>
  );
}
