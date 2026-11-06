import { achievements, certificates, profile, projects, skillGroups } from "@/lib/content";

export function buildGuideKnowledge() {
  const projectBlock = projects
    .map((p) => {
      const links = p.links.map((l) => `${l.label}: ${l.href}`).join(" · ");
      return [
        `### ${p.name} (${p.eyebrow}, ${p.year})`,
        p.summary,
        ...p.points.map((pt) => `- ${pt}`),
        `Stack: ${p.stack.join(", ")}`,
        `Links: ${links}`,
      ].join("\n");
    })
    .join("\n\n");

  const skillsBlock = skillGroups
    .map((g) => `${g.title}: ${g.items.join(", ")}`)
    .join("\n");

  const certsBlock = certificates
    .map((c) => `- ${c.year} · ${c.title} (${c.org})${c.badge ? ` [${c.badge}]` : ""} — ${c.detail}`)
    .join("\n");

  const achBlock = achievements.map((a) => `- ${a.title}: ${a.detail}`).join("\n");

  return `
You are Diya AI — an AI Agent and Portfolio Guide for ${profile.name}.
Speak in first person as Diya's guide (helpful, clear, concise). Never invent jobs, internships, metrics, or tech she does not list below.
If something is unknown, say you do not have that detail and point to Contact or the resume.

## Profile
- Name: ${profile.name}
- Role: ${profile.role}
- Location: ${profile.location}
- Availability: ${profile.availability}
- Email: ${profile.email}
- Phone: ${profile.phone}
- GitHub: ${profile.github}
- LinkedIn: ${profile.linkedin}
- X: ${profile.twitter}
- Instagram: ${profile.instagram}
- Resume PDF: ${profile.resume}

## Projects
${projectBlock}

## Skills
${skillsBlock}

## Certificates & Extra Mile
${certsBlock}

## Achievements
${achBlock}

## Site sections (for navigation hints)
- About → #about
- Skills → #skills
- Projects → #work
- Extra Mile (certificates & achievements) → #certificates
- Resume → #resume
- Contact → #contact
`.trim();
}

export const GUIDE_SYSTEM = `${buildGuideKnowledge()}

Rules:
- Keep answers short (2–6 sentences) unless they ask for depth.
- When helpful, mention the matching site section and its hash (e.g. Projects → #work).
- For "Explore projects" style asks, briefly introduce ThreatLens, RefMind, and CrimeLens AI, then invite a follow-up on one.
- Never claim police production deployment for CrimeLens; it is a datathon decision-support demo.
- ThreatLens 99.97% accuracy is only for the documented CICIDS2017 holdout — say that if you mention the number.
`;

/** Offline answers so the guide works without an API key. */
export function localGuideAnswer(question: string): string {
  const q = question.toLowerCase();

  if (/project|work|threatlens|refmind|crimelens|build|demo/.test(q)) {
    return [
      "I have three main projects:",
      "• ThreatLens — explainable hybrid intrusion detection (Python, FastAPI, React).",
      "• RefMind — IBM SkillsBuild referee-decision demo with IBM Granite.",
      "• CrimeLens AI — Karnataka State Police Datathon decision-support console (Next.js + FastAPI).",
      "Scroll to Projects (#work), or ask about one by name for links and details.",
    ].join("\n");
  }

  if (/skill|stack|tech|language|tool|frontend|backend/.test(q)) {
    return [
      "Day to day I work with Java, C++, JavaScript, TypeScript, HTML, CSS, SQL, and Python.",
      "Frontend: React, Next.js, Tailwind. Backend & data: FastAPI, REST, SQLite, PostgreSQL, Redis.",
      "Tools: Vercel, Git, GitHub, VS Code. See Skills (#skills) on the site.",
    ].join(" ");
  }

  if (/cert|hackathon|extra mile|rift|ratefluencer|inceptrix|jpmorgan|nptel/.test(q)) {
    return [
      "Extra Mile covers certificates and campus wins — including Top 15 at RIFT '26, INCEPTRIX final round, 2nd runner-up at Ratefluencer with Team ciphers_2.0, PromptWars, Built School D2C, and JPMorgan Forage.",
      "Open Extra Mile (#certificates) for the cards.",
    ].join(" ");
  }

  if (/resume|cv|pdf|download/.test(q)) {
    return `You can preview and download my PDF resume in the Resume section (#resume), or open ${profile.resume} directly.`;
  }

  if (/contact|email|phone|reach|hire|linkedin|github/.test(q)) {
    return [
      `Best email: ${profile.email}. Phone: ${profile.phone}.`,
      `GitHub: ${profile.github} · LinkedIn: ${profile.linkedin}.`,
      "Or use the Contact form (#contact).",
    ].join(" ");
  }

  if (/about|who|yourself|diya|background|college|mvj/.test(q)) {
    return [
      `I'm ${profile.name}, a final-year Information Science student at MVJ College of Engineering in ${profile.location}.`,
      `${profile.role}. ${profile.availability}.`,
      "I learn by building — security tools, explainable AI demos, and full-stack consoles. See About (#about).",
    ].join(" ");
  }

  if (/achiev|film|campus|expo|leadership/.test(q)) {
    return [
      "Outside class I directed Project Expo and Tech Project Fest, and I'm a 3-time college-level national short film winner with Raagabhinaya.",
      "Those sit under Extra Mile (#certificates).",
    ].join(" ");
  }

  return [
    `Hi — I'm Diya AI, ${profile.name}'s portfolio guide.`,
    "Ask about projects, skills, certificates, resume, or how to contact me.",
    "Quick jumps: Projects (#work), Extra Mile (#certificates), Resume (#resume), Contact (#contact).",
  ].join(" ");
}
