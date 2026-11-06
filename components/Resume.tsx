"use client";

import { profile } from "@/lib/content";
import { Reveal } from "./Reveal";

const included = [
  "Education & coursework",
  "Technical projects",
  "Skills",
  "Certificates",
  "Campus leadership",
];

export function Resume() {
  return (
    <section id="resume" className="scroll-mt-8 px-3 py-12 sm:px-5 sm:py-16">
      <Reveal tone="section">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-ivory/80 uppercase">
            Resume
          </span>
          <h2 className="display mt-5 max-w-3xl text-[clamp(2.2rem,5.5vw,3.75rem)] leading-[1.05] tracking-[-0.03em] text-white">
            Grab the full
            <br />
            PDF resume
          </h2>
        </div>
      </Reveal>

      <Reveal delay={0.1} tone="card">
        <div className="mt-10 grid overflow-hidden rounded-[1.6rem] border border-white/10 bg-[rgba(8,11,16,0.72)] lg:grid-cols-[1.15fr_0.95fr]">
          <div className="border-b border-white/10 p-4 sm:p-5 lg:border-r lg:border-b-0">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="flex items-center gap-2 text-[11px] font-medium tracking-[0.16em] text-ivory/75 uppercase">
                <FileIcon />
                Preview
              </p>
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-ivory/45 transition-colors hover:text-ivory/80"
              >
                Open in new tab
              </a>
            </div>
            <div className="resume-preview h-[28rem] overflow-y-auto overflow-x-hidden rounded-xl border border-white/10 bg-[#f4f4f2] sm:h-[32rem]">
              <img
                src="/resume/scroll.png?v=5"
                alt="Preview of Diya R V resume PDF"
                className="block w-full"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8 p-6 sm:p-8">
            <div>
              <span className="inline-flex rounded-full bg-white px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-[#0a0c12] uppercase">
                PDF · Updated 2026
              </span>
              <h3 className="display mt-5 text-3xl text-ivory sm:text-4xl">Download my resume</h3>
              <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-muted">
                A single PDF with education, projects, skills, certificates, and campus leadership —
                ready to share with one click. Internships are not on it yet.
              </p>
              <ul className="mt-6 space-y-2.5">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-ivory/90">
                    <span className="size-1.5 shrink-0 rounded-full bg-white" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/35 px-3.5 py-3">
                <MvjMark />
                <div className="min-w-0">
                  <p className="text-sm font-semibold tracking-tight text-ivory">CGPA 8.5 / 10</p>
                  <p className="truncate text-xs text-ivory/50">MVJ College of Engineering</p>
                </div>
              </div>

              <a
                href={profile.resume}
                download
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-[#0a0c12] transition-transform hover:scale-[1.015]"
              >
                <DownloadIcon />
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function FileIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-white">
      <path
        d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-6Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M14 2v6h5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5M5 19h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MvjMark() {
  return (
    <span
      className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-[0.65rem] font-extrabold tracking-tight text-[#c2410c]"
      aria-hidden="true"
    >
      MVJ
    </span>
  );
}
