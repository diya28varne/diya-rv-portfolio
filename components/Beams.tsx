"use client";

export function Beams() {
  return (
    <svg
      className="beams pointer-events-none absolute -left-8 top-4 hidden h-28 w-44 text-signal opacity-80 lg:block"
      viewBox="0 0 200 280"
      fill="none"
      aria-hidden="true"
    >
      <path className="beam beam-a" d="M20 10 C 80 40, 30 90, 90 130 S 40 200, 110 260" />
      <path className="beam beam-b" d="M70 0 C 140 50, 60 110, 150 160 S 80 220, 160 280" />
      <path className="beam beam-c" d="M120 20 C 40 70, 150 120, 50 180 S 140 230, 90 270" />
    </svg>
  );
}
