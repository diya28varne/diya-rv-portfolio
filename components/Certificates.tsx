import { certificates } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Certificates() {
  return (
    <section id="certificates" className="panel scroll-mt-8 px-5 py-10 sm:px-8">
      <Reveal tone="section">
        <p className="kicker">Extra Mile</p>
        <div className="mt-3 flex flex-col items-center text-center">
          <span className="inline-flex rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-ivory/80 uppercase">
            Certificates
          </span>
          <h2 className="sr-only">Extra Mile — Certificates</h2>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-4">
        {certificates.map((item, index) => (
          <Reveal key={item.id} tone="card" delay={Math.min(index * 0.06, 0.3)}>
            <article className="flex flex-col gap-4 rounded-[1.25rem] border border-white/10 bg-[rgba(8,11,16,0.72)] p-3 transition-colors hover:border-white/20 sm:flex-row sm:items-stretch sm:p-4">
              <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/40 sm:h-auto sm:w-[13.5rem] lg:w-[15.5rem]">
                {item.badge ? (
                  <span className="absolute top-2.5 left-2.5 z-10 rounded-md bg-white px-2 py-0.5 text-[10px] font-bold tracking-[0.08em] text-[#0a0c12] uppercase">
                    {item.badge}
                  </span>
                ) : null}
                <img src={item.image} alt="" className="size-full object-cover object-center" />
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-center px-1 pb-1 sm:py-1 sm:pr-2">
                <p className="text-[11px] font-medium tracking-[0.14em] text-ivory/45 uppercase">{item.year}</p>
                <h3 className="mt-1.5 text-xl tracking-tight text-white sm:text-[1.35rem]">{item.title}</h3>
                <p className="mt-1 text-sm text-ivory/55">{item.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-ivory/70">{item.detail}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-white transition-opacity hover:opacity-80"
                  >
                    View certificate
                    <ArrowOutIcon />
                  </a>
                ) : null}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ArrowOutIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
