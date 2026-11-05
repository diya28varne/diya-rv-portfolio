"use client";

import { useRef } from "react";

export function Spot({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  return (
    <article
      id={id}
      ref={ref}
      className={`spot scroll-mt-24 ${className}`}
      onMouseMove={(event) => {
        const element = ref.current;
        if (!element) return;
        const bounds = element.getBoundingClientRect();
        element.style.setProperty("--mx", `${event.clientX - bounds.left}px`);
        element.style.setProperty("--my", `${event.clientY - bounds.top}px`);
      }}
    >
      {children}
    </article>
  );
}
