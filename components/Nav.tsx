"use client";

import { nav, profile } from "@/lib/content";
import { useEffect, useState } from "react";

export function Nav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const marker = window.innerHeight * 0.28;
      let current = "";
      for (const item of nav) {
        const section = document.getElementById(item.href.slice(1));
        if (section && section.getBoundingClientRect().top <= marker) current = item.href;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <header className="no-print relative z-10">
        <div className="flex items-center gap-4 px-5 py-5 sm:px-8">
          <a href="#top" className="flex shrink-0 items-center gap-2.5 text-sm tracking-tight text-ivory">
            <img
              src="/me/diya.jpg?v=7"
              alt=""
              width={36}
              height={36}
              className="size-9 rounded-lg object-cover object-[center_18%]"
            />
            <span className="font-medium">{profile.name}</span>
          </a>
          <nav
            className="no-bar flex min-w-0 flex-1 items-center justify-end gap-4 overflow-x-auto whitespace-nowrap text-[13px] sm:gap-5 sm:text-sm"
            aria-label="Primary"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={active === item.href ? "true" : undefined}
                className={`shrink-0 tracking-wide transition-colors ${
                  active === item.href ? "text-ivory" : "text-ivory/65 hover:text-ivory"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
