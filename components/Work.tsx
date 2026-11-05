import { ProjectCards } from "./ProjectCards";
import { Reveal } from "./Reveal";

export function Work() {
  return (
    <section id="work" className="panel scroll-mt-8 overflow-hidden px-5 py-10 sm:px-8">
        <Reveal>
          <p className="kicker">Projects</p>
          <h2 className="display mt-3 max-w-xl text-3xl sm:text-4xl">Projects That Reflect My Work</h2>
        </Reveal>

        <ProjectCards />
    </section>
  );
}
