import { profile, projects } from "@/lib/content";

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-5 pb-16 pt-28 sm:px-8 sm:pt-32">
      <div className="hero-rise flex flex-wrap items-center justify-between gap-3">
        <p className="kicker">{profile.location}</p>
        <p className="kicker text-signal-deep">{profile.availability}</p>
      </div>

      <h1 className="hero-rise mt-8 max-w-4xl text-[clamp(3.3rem,8vw,6.6rem)]" style={{ animationDelay: "80ms" }}>
        <span className="sr-only">{profile.name}. </span>
        <span className="display block">Make the risk</span>
        <span className="display mt-1 block italic text-signal">visible.</span>
      </h1>

      <p
        className="hero-rise mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
        style={{ animationDelay: "160ms" }}
      >
        I am a final-year Information Science student at MVJ College of Engineering. I build security
        tools and machine-learning systems that show their work — a reason next to the score, and a
        limit next to the claim.
      </p>

      <div className="hero-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
        <a
          href="#work"
          className="rounded-full bg-ink px-5 py-3 text-sm text-ivory transition-colors hover:bg-signal-deep"
        >
          Selected work
        </a>
        <a
          href={profile.resume}
          download
          className="rounded-full border border-line bg-card px-5 py-3 text-sm transition-colors hover:border-signal"
        >
          Download resume
        </a>
        <a
          href={profile.github}
          className="rounded-full px-5 py-3 text-sm text-muted link-underline hover:text-ink"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>

      <ol className="hero-rise mt-14 border-t border-line" style={{ animationDelay: "320ms" }}>
        {projects.map((project) => (
          <li key={project.id}>
            <a
              href={`#${project.id}`}
              className="group grid grid-cols-[3rem_1fr_auto] items-start gap-4 border-b border-line py-4 sm:grid-cols-[4rem_1fr_auto]"
            >
              <span className="kicker pt-1 text-signal-deep">{project.index}</span>
              <span>
                <span className="block text-lg tracking-tight">{project.name}</span>
                <span className="fold">
                  <span className="block pt-1 text-sm text-muted">{project.eyebrow}</span>
                </span>
              </span>
              <span className="pt-1 text-sm text-muted transition-transform group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
