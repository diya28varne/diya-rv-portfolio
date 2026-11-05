/** Small SVG data URLs for skill cursor trails — one set per tool name. */

function svgData(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const tile = (label: string, fill: string, ink = "#111") =>
  svgData(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect width="96" height="96" rx="22" fill="${fill}"/><text x="48" y="58" text-anchor="middle" font-family="ui-sans-serif,system-ui,sans-serif" font-size="${label.length > 2 ? 22 : 30}" font-weight="700" fill="${ink}">${label}</text></svg>`,
  );

export const skillTrailImages: Record<string, string> = {
  HTML: tile("HTML", "#e34f26", "#fff"),
  CSS: tile("CSS", "#1572b6", "#fff"),
  JavaScript: tile("JS", "#f7df1e"),
  TypeScript: tile("TS", "#3178c6", "#fff"),
  React: svgData(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect width="96" height="96" rx="22" fill="#0b1220"/><circle cx="48" cy="48" r="6" fill="#61dafb"/><ellipse cx="48" cy="48" rx="30" ry="12" fill="none" stroke="#61dafb" stroke-width="3"/><ellipse cx="48" cy="48" rx="30" ry="12" fill="none" stroke="#61dafb" stroke-width="3" transform="rotate(60 48 48)"/><ellipse cx="48" cy="48" rx="30" ry="12" fill="none" stroke="#61dafb" stroke-width="3" transform="rotate(120 48 48)"/></svg>`,
  ),
  "Next.js": tile("Next", "#111", "#fff"),
  "Tailwind CSS": tile("TW", "#0ea5e9", "#fff"),
  Python: tile("Py", "#3776ab", "#fff"),
  FastAPI: tile("API", "#009688", "#fff"),
  "REST APIs": tile("REST", "#16a34a", "#fff"),
  SQLAlchemy: tile("SA", "#d94a38", "#fff"),
  PostgreSQL: tile("PG", "#336791", "#fff"),
  SQLite: tile("SQL", "#0e4d8b", "#fff"),
  Redis: tile("Redis", "#dc382d", "#fff"),
  Vercel: tile("▲", "#111", "#fff"),
  Docker: tile("Dock", "#2496ed", "#fff"),
  "Google Gemini": tile("G", "#8ab4f8", "#111"),
  "IBM Granite": tile("IBM", "#0f62fe", "#fff"),
  "Scikit-learn": tile("SK", "#f7931e", "#fff"),
  Pandas: tile("Pd", "#130754", "#fff"),
  NumPy: tile("NP", "#013243", "#fff"),
  Git: tile("Git", "#f05133", "#fff"),
  GitHub: tile("GH", "#111", "#fff"),
};

export function trailImagesFor(items: string[]) {
  return items.map((name) => skillTrailImages[name] ?? tile(name.slice(0, 2).toUpperCase(), "#334155", "#fff"));
}
