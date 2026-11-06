import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="panel scroll-mt-8 px-5 py-10 sm:px-8">
      <div className="grid items-start gap-8 sm:grid-cols-[0.8fr_1.2fr]">
        <Reveal tone="section">
          <p className="kicker">About</p>
          <h2 className="display mt-3 max-w-xl text-3xl sm:text-4xl">
            I learn by doing, and build as I go.
          </h2>
        </Reveal>
        <Reveal delay={0.12} tone="soft">
          <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-muted">
            <p>
              I&apos;m an enthusiastic learner who enjoys exploring new ideas, figuring out how things work,
              and turning little sparks of curiosity into something real.
            </p>
            <p>
              I&apos;m someone who likes trying things I haven&apos;t done before, taking on challenges, and
              learning along the way. Outside the tech world, I enjoy acting, playing basketball and
              badminton, travelling, and Fashion &amp; Editorial Modelling.
            </p>
            <p>
              I believe the best way to learn is to get your hands dirty, make mistakes, experiment, and try
              again. There&apos;s always something new to explore, and I&apos;m here for it.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
