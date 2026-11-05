"use client";

import { profile } from "@/lib/content";
import { Link001, Link002 } from "./ui/skiper-ui/skiper40";
import { Beams } from "./Beams";
import { Magnetic } from "./Magnetic";
import { MaskText } from "./MaskText";

export function Rail() {
  return (
    <aside className="masthead relative flex flex-col justify-between gap-10 px-5 pb-6 pt-4 text-ivory sm:px-8 lg:sticky lg:top-0 lg:h-screen lg:w-[24rem] lg:shrink-0 lg:overflow-y-auto lg:px-10 lg:pb-12 lg:pt-24">
      <Beams />
      <div className="relative">
        <p className="kicker">{profile.location}</p>
        <h1 className="display mt-4 text-6xl leading-[0.88] text-ivory sm:text-7xl">
          <MaskText text={profile.name} />
        </h1>
        <p className="display mt-4 text-3xl italic text-signal">{profile.role}</p>
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/75">
          Final-year Information Science at MVJ College of Engineering. I build systems that have to
          show their work.
        </p>
        <p className="mt-4 max-w-xs text-sm text-ivory/90">{profile.availability}</p>
      </div>

      <div className="relative flex flex-col items-start gap-4">
        <Magnetic>
          <a
            href={profile.resume}
            download
            className="inline-flex rounded-full bg-ivory px-5 py-3 text-sm text-night transition-colors hover:bg-signal hover:text-ivory"
          >
            Download resume
          </a>
        </Magnetic>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <Link001 href={profile.github} className="text-sm text-ivory/70 hover:text-ivory">
            GitHub
          </Link001>
          <Link001 href={profile.linkedin} className="text-sm text-ivory/70 hover:text-ivory">
            LinkedIn
          </Link001>
          <Link002 href={`mailto:${profile.email}`} className="text-sm text-ivory/70 hover:text-ivory">
            Email
          </Link002>
        </div>
      </div>
    </aside>
  );
}
