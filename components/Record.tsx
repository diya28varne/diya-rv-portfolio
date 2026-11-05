import { achievements, certifications, languages } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Record() {
  return (
    <section id="achievements" className="panel scroll-mt-8 px-5 py-10 sm:px-8">
        <Reveal>
          <p className="kicker">Achievements</p>
          <h2 className="display mt-3 max-w-xl text-3xl sm:text-4xl">I showed up outside class, too.</h2>
        </Reveal>
        <div className="mt-10 grid gap-6">
          <Reveal>
            <article className="h-full rounded-3xl border border-line bg-card p-6 sm:p-8">
              <h3 className="kicker">Certifications</h3>
              <ul className="mt-5 space-y-4">
                {certifications.map((item) => (
                  <li key={item} className="border-t border-line pt-4 text-base leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
          <div className="grid gap-4">
            {achievements.map((item) => (
              <Reveal key={item.title}>
                <article className="rounded-3xl border border-line bg-card p-6">
                  <h3 className="text-xl tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.detail}</p>
                </article>
              </Reveal>
            ))}
            <Reveal>
              <p className="px-1 text-sm text-muted">
                Languages · {languages.join(" · ")}
              </p>
            </Reveal>
          </div>
        </div>
    </section>
  );
}
