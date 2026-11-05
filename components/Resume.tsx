import { profile } from "@/lib/content";
import { Reveal } from "./Reveal";

const included = ["Education", "Projects", "Skills", "Certificates", "Campus leadership"];

export function Resume() {
  return (
    <section id="resume" className="panel scroll-mt-8 px-5 py-10 sm:px-8">
        <Reveal>
          <p className="kicker">Resume</p>
          <h2 className="display mt-3 max-w-xl text-3xl sm:text-4xl">The short version is a PDF.</h2>
          <p className="mt-5 max-w-2xl text-muted">
            Education, projects, skills, certificates, and campus leadership. Internships are not on it yet.
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-10 flex flex-col gap-8 rounded-3xl border border-line bg-card p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
            <ul className="grid gap-3 sm:grid-cols-2">
              {included.map((item) => (
                <li key={item} className="text-lg tracking-tight">
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <a
                href={profile.resume}
                download
                className="inline-flex rounded-full bg-ivory px-5 py-3 text-sm text-night transition-colors hover:bg-signal hover:text-ivory"
              >
                Download PDF
              </a>
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-line px-5 py-3 text-sm transition-colors hover:border-ink"
              >
                Open in a new tab
              </a>
            </div>
          </div>
        </Reveal>
    </section>
  );
}
