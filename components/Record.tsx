import { achievements } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Record() {
  return (
    <section
      id="achievements"
      className="scroll-mt-8 rounded-[1.5rem] border border-white/[0.07] bg-[rgba(2,3,6,0.72)] px-5 py-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-lg sm:px-8"
    >
      <Reveal tone="section">
        <h2 className="display max-w-xl text-3xl sm:text-4xl">I showed up outside class, too.</h2>
      </Reveal>
      <div className="mt-10 grid gap-4">
        {achievements.map((item, index) => (
          <Reveal key={item.title} tone="card" delay={index * 0.08}>
            <article className="flex flex-col gap-4 rounded-[1.25rem] border border-white/[0.07] bg-[rgba(0,0,0,0.55)] p-3 backdrop-blur-md sm:flex-row sm:items-stretch sm:p-4">
              <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/50 sm:h-auto sm:w-[11rem] lg:w-[12.5rem]">
                <img src={item.image} alt="" className="size-full object-cover object-center" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center px-1 pb-1 sm:py-1 sm:pr-2">
                <h3 className="text-xl tracking-tight text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory/70">{item.detail}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
