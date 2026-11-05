"use client";

import { skillGroups } from "@/lib/content";
import { trailImagesFor } from "@/lib/skillTrailImages";
import { ImageCursorTrail } from "@/components/ui/skiper-ui/skiper18";
import { SkillMark } from "./SkillMark";
import { Reveal } from "./Reveal";

const chips = skillGroups.flatMap((group) => group.items);

export function Toolbox() {
  return (
    <section id="skills" className="panel scroll-mt-8 px-5 py-10 sm:px-8">
      <Reveal>
        <p className="kicker">Skills</p>
        <h2 className="display mt-3 max-w-xl text-3xl sm:text-4xl">The Tools I Build With</h2>
      </Reveal>
      <div className="mt-10 space-y-10">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-lg text-white">{group.title}</h3>
            <p className="mt-1 text-sm text-ivory/55">{group.detail}</p>
            <ImageCursorTrail
              items={trailImagesFor(group.items)}
              maxNumberOfImages={Math.min(8, group.items.length + 2)}
              distance={28}
              imgClass="size-14 rounded-xl object-cover shadow-lg sm:size-16"
              className="mt-4 rounded-2xl"
            >
              <ul className="relative z-10 flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <li key={item}>
                    <div className="flex h-[7.6rem] w-[7.4rem] flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-black/45 px-2 transition-colors hover:border-white">
                      <SkillMark name={item} />
                      <span className="text-center text-[10px] font-medium uppercase leading-tight tracking-[0.08em] text-ivory/75">
                        {item}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </ImageCursorTrail>
            {group.title === "Tools" ? <SkillMarquee /> : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function SkillMarquee() {
  const loop = [...chips, ...chips];
  return (
    <div className="marquee mt-8 py-1" aria-hidden="true">
      <div className="marquee-track items-center gap-3">
        {loop.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-2"
          >
            <SkillMark name={item} size={18} />
            <span className="text-xs tracking-wide whitespace-nowrap text-ivory/80">{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
