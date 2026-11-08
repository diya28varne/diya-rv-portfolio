import type { ReactNode } from "react";
import { useId } from "react";

export function SkillMark({ name, size = 32 }: { name: string; size?: number }) {
  const gemini = useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className="shrink-0">
      {name === "Google Gemini" ? (
        <Gemini id={gemini} />
      ) : (
        (marks[name] ?? <LetterTile label={name.slice(0, 2)} fill="#a1a8b8" />)
      )}
    </svg>
  );
}

function LetterTile({ label, fill, ink = "#111" }: { label: string; fill: string; ink?: string }) {
  return (
    <>
      <rect x="3" y="3" width="26" height="26" rx="6" fill={fill} />
      <text
        x="16"
        y="21"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize={label.length > 2 ? 8 : 11}
        fontWeight="700"
        fill={ink}
      >
        {label}
      </text>
    </>
  );
}

function Shield({ back, front, label }: { back: string; front: string; label: string }) {
  return (
    <>
      <path fill={back} d="M6 3h20l-1.6 20.2L16 29 7.6 23.2 6 3z" />
      <path fill={front} d="M16 5.2h8.2L23 22.2 16 26.4V5.2z" />
      <text
        x="16"
        y="19"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="11"
        fontWeight="700"
        fill="#fff"
      >
        {label}
      </text>
    </>
  );
}

function Gemini({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={id} x1="4" y1="2" x2="28" y2="30">
          <stop offset="0" stopColor="#8ab4f8" />
          <stop offset="0.5" stopColor="#c084fc" />
          <stop offset="1" stopColor="#7dd3fc" />
        </linearGradient>
      </defs>
      <path fill={`url(#${id})`} d="M16 2.5 18.4 13 29 16 18.4 19 16 29.5 13.6 19 3 16l10.6-3L16 2.5z" />
    </>
  );
}

const marks: Record<string, ReactNode> = {
  Java: <LetterTile label="Ja" fill="#e76f00" ink="#fff" />,
  "C++": <LetterTile label="C+" fill="#00599c" ink="#fff" />,
  SQL: <LetterTile label="SQL" fill="#e38c00" ink="#fff" />,
  HTML: <Shield back="#e34f26" front="#f06529" label="5" />,
  CSS: <Shield back="#1572b6" front="#33a9dc" label="3" />,
  JavaScript: <LetterTile label="JS" fill="#f7df1e" />,
  TypeScript: <LetterTile label="TS" fill="#3178c6" ink="#fff" />,
  React: (
    <>
      <circle cx="16" cy="16" r="2.2" fill="#61dafb" />
      <ellipse cx="16" cy="16" rx="12" ry="4.6" fill="none" stroke="#61dafb" strokeWidth="1.4" />
      <ellipse cx="16" cy="16" rx="12" ry="4.6" fill="none" stroke="#61dafb" strokeWidth="1.4" transform="rotate(60 16 16)" />
      <ellipse cx="16" cy="16" rx="12" ry="4.6" fill="none" stroke="#61dafb" strokeWidth="1.4" transform="rotate(120 16 16)" />
    </>
  ),
  "Next.js": (
    <>
      <circle cx="16" cy="16" r="12" fill="#fff" />
      <path fill="#111" d="M11 22.5V9.5h2.1l6.8 9.4V9.5H22v13h-2.1l-6.8-9.4v9.4H11z" />
    </>
  ),
  "Tailwind CSS": (
    <>
      <path
        fill="#38bdf8"
        d="M4 13c2.2-3.4 4.4-5 7-5 2.4 0 3.6 1.6 4.6 3.2 1 1.6 1.8 2.6 3.6 2.6 2.2 0 3.6-1.2 5-2.8-2.2 3.4-4.4 5-7 5-2.4 0-3.6-1.6-4.6-3.2-1-1.6-1.8-2.6-3.6-2.6-2.2 0-3.6 1.2-5 2.8z"
      />
      <path
        fill="#38bdf8"
        d="M4 21c2.2-3.4 4.4-5 7-5 2.4 0 3.6 1.6 4.6 3.2 1 1.6 1.8 2.6 3.6 2.6 2.2 0 3.6-1.2 5-2.8-2.2 3.4-4.4 5-7 5-2.4 0-3.6-1.6-4.6-3.2-1-1.6-1.8-2.6-3.6-2.6-2.2 0-3.6 1.2-5 2.8z"
      />
    </>
  ),
  Python: (
    <>
      <path fill="#3776ab" d="M15.5 4c-4.2 0-4 1.8-4 1.8v3.4h4.1v1H8.2S5 9.8 5 15.2 8 19 8 19h2.2v-2.4s-.1-2.8 2.8-2.8h4.8s2.7.1 2.7-2.6V6.2S19.8 4 15.5 4zm-2.3 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
      <path fill="#ffd343" d="M16.5 28c4.2 0 4-1.8 4-1.8v-3.4h-4.1v-1H23.8S27 22.2 27 16.8 24 13 24 13h-2.2v2.4s.1 2.8-2.8 2.8h-4.8s-2.7-.1-2.7 2.6v5S12.2 28 16.5 28zm2.3-2a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
    </>
  ),
  FastAPI: (
    <>
      <path fill="#009688" d="M16 2.5 28.5 9.5v13L16 29.5 3.5 22.5v-13L16 2.5z" />
      <path fill="#fff" d="M17.2 7.5 10 16.2h5.2l-1.1 8.3 8-10.2h-5.4l.5-6.8z" />
    </>
  ),
  "REST APIs": (
    <>
      <circle cx="8" cy="16" r="3.2" fill="#22c55e" />
      <circle cx="23" cy="8.5" r="3.2" fill="#22c55e" />
      <circle cx="23" cy="23.5" r="3.2" fill="#22c55e" />
      <path d="M11 15.2 20 9.6M11 16.8 20 22.4" stroke="#22c55e" strokeWidth="1.6" />
    </>
  ),
  SQLAlchemy: (
    <>
      <path fill="#d94a38" d="M16 3 28 16 16 29 4 16 16 3z" />
      <path fill="#fff" d="M16 9.5c-2.6 0-4 1.6-4 3.4 0 2.6 2.2 3.2 4 3.8 1.6.5 2.4.9 2.4 2 0 1-.8 1.6-2.2 1.6-1.6 0-2.4-.8-2.6-1.8l-2.2.6c.4 2.2 2.2 3.6 4.8 3.6 2.8 0 4.6-1.6 4.6-3.8 0-2.6-2-3.4-4-4-1.4-.4-2.2-.8-2.2-1.8 0-.8.7-1.4 1.8-1.4 1.2 0 2 .6 2.2 1.6l2.2-.6c-.4-2-2-3.2-4.4-3.2z" />
    </>
  ),
  PostgreSQL: (
    <>
      <ellipse cx="14" cy="17" rx="8" ry="7" fill="#336791" />
      <path d="M20 16c3 .2 6 2.2 6.5 5.2" stroke="#336791" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <circle cx="11.5" cy="15.5" r="1.1" fill="#fff" />
      <path d="M8 14c1.5-3 4-4 6-3" stroke="#336791" strokeWidth="2" fill="none" strokeLinecap="round" />
    </>
  ),
  SQLite: (
    <>
      <path fill="#0e4d8b" d="M9 26c7-2 12-8 15-16-1 6-5 12-11 16 2-6 3-12 2-18-5 4-8 10-6 18z" />
      <path d="M12 24c3-5 6-10 8-16" stroke="#9fd0f5" strokeWidth="1.2" fill="none" />
    </>
  ),
  Redis: (
    <>
      <path fill="#dc382d" d="M16 4 28 10 16 16 4 10 16 4z" />
      <path fill="#a41e16" d="M16 17.5 28 11.5V22L16 28V17.5z" />
      <path fill="#ff6b5a" d="M16 17.5 4 11.5V22L16 28V17.5z" />
    </>
  ),
  Vercel: <path fill="#fff" d="M16 5 29 27H3L16 5z" />,
  Docker: (
    <>
      <rect x="7" y="13" width="4" height="3.2" rx="0.4" fill="#2496ed" />
      <rect x="12" y="13" width="4" height="3.2" rx="0.4" fill="#2496ed" />
      <rect x="17" y="13" width="4" height="3.2" rx="0.4" fill="#2496ed" />
      <rect x="12" y="9" width="4" height="3.2" rx="0.4" fill="#2496ed" />
      <path fill="#2496ed" d="M6 17.5c1.2 5 5.5 8 11 7.2 4-.6 7.2-2.6 9.2-4.2-1.6.2-3.4-.2-4.6-1.4 2.2-.4 4.2-1.6 5.2-3.2-1.6.6-3.2.6-4.4.2.2-2.2-1.2-4-3.2-4.6-.4 2-2.2 3.6-4.4 4-1.2-2.4-4-3.4-6.4-2.2-.2 1.6.4 3.2 1.6 4.2H6z" />
    </>
  ),
  "IBM Granite": (
    <>
      <rect x="5" y="8" width="5" height="16" rx="0.6" fill="#0f62fe" />
      <rect x="13.5" y="4" width="5" height="20" rx="0.6" fill="#4589ff" />
      <rect x="22" y="10" width="5" height="14" rx="0.6" fill="#0f62fe" />
    </>
  ),
  "Scikit-learn": (
    <>
      <circle cx="16" cy="16" r="12" fill="#f7931e" />
      <path d="M8 21c2.5-7 7-10 16-7" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="22" cy="13.5" r="1.6" fill="#fff" />
    </>
  ),
  Pandas: (
    <>
      <rect x="5" y="5" width="22" height="22" rx="4" fill="#130754" />
      <rect x="9" y="16" width="3.2" height="7" rx="0.4" fill="#e70488" />
      <rect x="14.4" y="11" width="3.2" height="12" rx="0.4" fill="#fff" />
      <rect x="19.8" y="13.5" width="3.2" height="9.5" rx="0.4" fill="#e70488" />
    </>
  ),
  NumPy: (
    <>
      <rect x="4" y="4" width="24" height="24" rx="4" fill="#013243" />
      <rect x="8" y="8" width="7" height="7" fill="#4dabcf" />
      <rect x="17" y="8" width="7" height="7" fill="#4dabcf" opacity="0.65" />
      <rect x="8" y="17" width="7" height="7" fill="#4dabcf" opacity="0.65" />
      <rect x="17" y="17" width="7" height="7" fill="#fff" />
    </>
  ),
  Git: (
    <>
      <path fill="#f05133" d="M15.2 2.8 2.8 15.2a2 2 0 0 0 0 2.8L14 29.2a2 2 0 0 0 2.8 0l12.4-12.4a2 2 0 0 0 0-2.8L18 2.8a2 2 0 0 0-2.8 0z" />
      <circle cx="16" cy="16" r="2" fill="#fff" />
      <circle cx="16" cy="8.5" r="2" fill="#fff" />
      <circle cx="22.5" cy="16" r="2" fill="#fff" />
      <path d="M16 10.5V14M18 16h2.5" stroke="#fff" strokeWidth="1.4" />
    </>
  ),
  GitHub: (
    <>
      <circle cx="16" cy="16" r="12" fill="#fff" />
      <path
        fill="#111"
        d="M16 7.2a8.2 8.2 0 0 0-2.6 16c.4.1.6-.2.6-.4v-1.5c-2.3.5-2.8-1-2.8-1-.3-.9-.8-1.1-.8-1.1-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.8.8 2.2.6.1-.5.3-.8.5-1-1.8-.2-3.7-.9-3.7-4a3 3 0 0 1 .8-2.1 2.8 2.8 0 0 1 .1-2.1s.7-.2 2.2.8a7.6 7.6 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8a2.8 2.8 0 0 1 .1 2.1 3 3 0 0 1 .8 2.1c0 3.1-1.9 3.8-3.7 4 .3.3.6.8.6 1.5v2.2c0 .2.2.5.6.4A8.2 8.2 0 0 0 16 7.2z"
      />
    </>
  ),
};
