"use client";

export function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];
  return (
    <div className="marquee border-y border-line bg-transparent py-4" aria-hidden="true">
      <div className="marquee-track">
        {loop.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={`display flex items-center gap-5 px-3 text-3xl italic ${index % 2 === 0 ? "text-ink" : "text-signal"}`}
          >
            {item}
            <span className="text-lg not-italic text-ink/30">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
