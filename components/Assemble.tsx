"use client";

import { RollingText } from "@/components/ui/skiper-ui/skiper27";
import { profile } from "@/lib/content";
import { Reveal } from "./Reveal";

const lines = [
  "“Growing 1% every day,",
  "finding inspiration",
  "in the unexpected,",
  "and building things worth",
  "sharing with the world.”",
];

export function Assemble() {
  return (
    <div className="px-5 pb-10 pt-0 sm:px-8 sm:pb-14">
      <h1 className="sr-only">
        “Growing 1% every day, finding inspiration in the unexpected, and building things worth
        sharing with the world.”
      </h1>
      <Reveal tone="section">
        <p className="display mt-[1.05em] mb-[1.05em] text-center text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.03em] text-[#e4c36a]">
          The mind behind the bytes.
        </p>
      </Reveal>
      <div className="flex flex-row items-center justify-start gap-5 sm:gap-10">
        <Reveal tone="card" className="relative w-[36%] max-w-sm shrink-0 overflow-hidden rounded-[1.2rem] sm:rounded-[1.4rem]">
          <img
            src="/me/diya.jpg?v=7"
            alt={profile.name}
            width={768}
            height={1024}
            className="h-auto w-full"
          />
        </Reveal>
        <Reveal delay={0.12} tone="section" className="flex min-w-0 flex-1 flex-col text-left">
          <div className="flex flex-col gap-[0.18em] font-serif text-[clamp(1.35rem,3.4vw,2.55rem)] leading-[1.15] tracking-[-0.03em] text-ivory">
            {lines.map((line) => (
              <RollingText
                key={line}
                text={line}
                speed={0.05}
                duration={4}
                className="justify-start"
              />
            ))}
          </div>
          <p className="mt-[clamp(2.05rem,5.1vw,3.85rem)] font-sans text-[clamp(0.85rem,1.6vw,1.05rem)] font-medium leading-snug tracking-[0.01em] text-ivory/70">
            {profile.role}
          </p>
          <p className="mt-1 flex items-center gap-2 font-sans text-[clamp(0.8rem,1.4vw,0.95rem)] text-ivory/65">
            <LocationPin />
            <span>{profile.location}</span>
          </p>
        </Reveal>
      </div>
    </div>
  );
}

function LocationPin() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-ivory/70"
    >
      <path
        d="M12 21s7-5.2 7-11.2A7 7 0 1 0 5 9.8C5 15.8 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
