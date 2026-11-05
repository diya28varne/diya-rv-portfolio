import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="panel scroll-mt-8 px-5 py-10 sm:px-8">
      <div className="grid items-start gap-8 sm:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="kicker">About</p>
          <h2 className="display mt-3 max-w-xl text-3xl sm:text-4xl">I learn a little, then I build.</h2>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-muted">
            <p>
              I am an enthusiastic learner and an aspiring software engineer. I like building software a
              person can follow: a clear interface, and a result that comes with a reason.
            </p>
            <p>
              The work I keep returning to is ThreatLens, CrimeLens AI, and RefMind. ThreatLens studies how
              a network flow can be scored and explained. CrimeLens AI is decision-support software from the
              Karnataka State Police Datathon. RefMind is a referee-decision demo from the IBM SkillsBuild
              challenge, where a fan votes before seeing the rule, the camera, and what is still uncertain.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
