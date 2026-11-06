export const profile = {
  name: "Diya R V",
  role: "Software Developer | AI & Full-Stack Enthusiast",
  location: "Bangalore, India",
  email: "diyavarne28@gmail.com",
  phone: "+91 63661 00546",
  phoneHref: "tel:+916366100546",
  github: "https://github.com/diya28varne",
  linkedin: "https://www.linkedin.com/in/diya-varne-375422351",
  twitter: "https://x.com/DiyaVarne72033",
  instagram: "https://www.instagram.com/diyarv_28/",
  resume: "/Diya-RV-Resume.pdf",
  availability: "Open to software engineering internships and new-graduate roles",
};

export const nav = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Projects" },
  { href: "#certificates", label: "Extra Mile" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
];

export type ProjectLink = { label: string; href: string };

export type Project = {
  id: string;
  index: string;
  name: string;
  eyebrow: string;
  year: string;
  summary: string;
  points: string[];
  hardPart: string;
  note?: string;
  stack: string[];
  pipeline: string[];
  links: ProjectLink[];
  specs: { label: string; value: string }[];
  image: string;
  imageAlt: string;
  highlights: string[];
};

export const projects: Project[] = [
  {
    id: "threatlens",
    index: "01",
    name: "ThreatLens",
    eyebrow: "Intrusion detection",
    year: "2025 — Present",
    summary:
      "An explainable hybrid detector for network flows. A supervised model and an anomaly model score the same record, a decision layer turns that into a priority and a reason, and the alert is stored so the investigation can be replayed.",
    points: [
      "Cleans a CICIDS2017 Friday-afternoon DDoS flow export, keeps 66 features after policy exclusions, and evaluates on a stratified holdout of 44,617 flows with seed 42.",
      "Random Forest and Isolation Forest feed a hybrid decision, a 0–100 risk priority, and an explanation. FastAPI exposes predict, alert history, and health. SQLite stores each successful alert.",
      "A React dashboard covers overview, alert history, and traffic analysis. The research path is covered by integration tests and a browser smoke check.",
    ],
    hardPart:
      "The accuracy number was the easy part. On this DDoS-heavy test split, Random Forest reaches 99.97% with a very low false-positive rate. The hard part was refusing to let that stand in for open-world detection: the split is documented, Isolation Forest is scored only as an anomaly proxy, and the risk figure is a priority, not a probability. Earlier study used NSL-KDD. The repository is measured on this CICIDS2017 subset. ThreatLens studies the workflow. It does not capture live packets or block traffic.",
    stack: ["Python", "scikit-learn", "FastAPI", "SQLite", "React"],
    pipeline: ["Flow record", "66 features", "RF + Isolation Forest", "Reasoned alert", "Dashboard"],
    links: [
      { label: "Demo", href: "https://threatlens-ids.vercel.app/" },
      { label: "Source", href: "https://github.com/diya28varne/IDS" },
    ],
    specs: [
      { label: "Holdout", value: "44,617 flows" },
      { label: "Features", value: "66" },
      { label: "Seed", value: "42" },
      { label: "Service", value: "FastAPI" },
    ],
    image: "/projects/threatlens.png?v=2",
    imageAlt: "ThreatLens site, with the headline See the flow. Score the threat.",
    highlights: ["Python", "FastAPI", "scikit-learn", "React"],
  },
  {
    id: "refmind",
    index: "02",
    name: "RefMind",
    eyebrow: "IBM SkillsBuild",
    year: "2024",
    summary:
      "An explainable referee-decision demo for the IBM SkillsBuild AI Builders Challenge. A fan votes before the explanation, then sees why the disagreement lasts.",
    points: [
      "The June challenge submission lives in the refmind folder of the hands-on-labs repository, with a React and Vite frontend and a FastAPI backend.",
      "IBM Granite, Docling, LangChain, and Chroma ground the explanation in IFAB laws. The demo also runs without watsonx or Gemini keys.",
      "The public README states that official VAR data is not public, and the verdict is shown with a confidence figure and that uncertainty.",
    ],
    hardPart:
      "A highlight clip is not the same thing as the referee's view. The hard part was separating the rule, what the camera could see, and the crowd's vote, and saying when the verdict is still debatable.",
    stack: ["React", "Vite", "FastAPI", "IBM Granite", "LangChain"],
    pipeline: ["Vote", "Fan split", "IFAB rules", "Camera view", "Verdict"],
    links: [
      { label: "Demo", href: "https://hands-on-labs.vercel.app/?demo=wc1986-hand-of-god" },
      { label: "Source", href: "https://github.com/diya28varne/hands-on-labs" },
    ],
    specs: [
      { label: "Context", value: "IBM SkillsBuild" },
      { label: "Rules", value: "IFAB laws" },
      { label: "Incidents", value: "6 demos" },
      { label: "Mode", value: "Demo without keys" },
    ],
    image: "/projects/refmind.png?v=2",
    imageAlt: "RefMind demo open on the Hand of God incident, before the vote.",
    highlights: ["React", "FastAPI", "IBM Granite"],
  },
  {
    id: "crimelens",
    index: "03",
    name: "CrimeLens AI",
    eyebrow: "Karnataka State Police Datathon",
    year: "2025",
    summary:
      "A decision-support console for reading incidents spatially. Maps, prediction, network views, and written briefings sit on an authenticated API, and a person stays in the loop before anyone acts on a score.",
    points: [
      "Next.js command console and a FastAPI service, arranged as a monorepo, with Docker Compose running PostgreSQL + PostGIS and Redis.",
      "JWT sessions, role-based permissions, and jurisdiction scoping so a query stays inside a district or a station.",
      "MapLibre geospatial view, explainable briefings, and an English / Kannada interface with catalogs in the product, including ಕನ್ನಡ.",
    ],
    hardPart:
      "A map of every incident, shown to every signed-in user, would be the wrong product. The hard part was scoping each query to a role and a jurisdiction, district or station, so the console only shows what that person is allowed to see.",
    stack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "PostGIS", "Redis"],
    pipeline: ["Incidents", "PostGIS", "Scoped API", "Map + briefing", "Human review"],
    links: [
      { label: "Demo", href: "https://crimelens-ai-phi.vercel.app/" },
      { label: "Source", href: "https://github.com/diya28varne/CrimeLens-ai" },
    ],
    specs: [
      { label: "Context", value: "State police datathon" },
      { label: "Data", value: "Postgres + PostGIS" },
      { label: "Access", value: "JWT · RBAC" },
      { label: "Locales", value: "EN · ಕನ್ನಡ" },
    ],
    image: "/projects/crimelens.png?v=2",
    imageAlt: "CrimeLens AI sign-in for the Karnataka State Police Datathon demo.",
    highlights: ["Next.js", "FastAPI", "PostgreSQL", "Redis"],
  },
];

export const skillGroups = [
  {
    title: "Languages",
    detail: "What I write in day to day.",
    items: ["Java", "C++", "JavaScript", "TypeScript", "HTML", "CSS", "SQL", "Python"],
  },
  {
    title: "Frontend",
    detail: "The screen, from the markup to the app.",
    items: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Backend & Data",
    detail: "The server side and where data lives.",
    items: ["FastAPI", "REST APIs", "SQLite", "PostgreSQL", "Redis"],
  },
  {
    title: "Tools",
    detail: "What stays open while the code moves.",
    items: ["Vercel", "Git", "GitHub", "VS Code"],
  },
];

export type Certificate = {
  id: string;
  year: string;
  title: string;
  org: string;
  detail: string;
  badge?: string;
  image: string;
  href?: string;
};

export const certificates: Certificate[] = [
  {
    id: "rift",
    year: "2026",
    title: "RIFT '26 Hackathon",
    org: "PW Institute of Innovation",
    detail:
      "Placed in the top 15 at RIFT '26 Hackathon with Team IQistics, held on 19th-20th February 2026.",
    badge: "TOP 15",
    image: "/certificates/rift-thumb.png",
    href: "/certificates/rift.jpg",
  },
  {
    id: "inceptrix",
    year: "2026",
    title: "INCEPTRIX Hackathon",
    org: "Jain Faculty of Engineering & Technology",
    detail:
      "Participated in the Final Round of INCEPTRIX Hackathon 2026 at JAIN FET under the theme \"Beyond Intelligent Innovation - systems that shape reality,\" February 27-28, 2026.",
    badge: "FINAL ROUND",
    image: "/certificates/inceptrix-thumb.png",
    href: "/certificates/inceptrix.pdf",
  },
  {
    id: "ratefluencer",
    year: "2026",
    title: "National Level AI Hackathon",
    org: "Ratefluencer",
    detail:
      "2nd runner-up with Team ciphers_2.0 at the 4-day Ratefluencer AI Hackathon 2026, 30th May - 2nd June 2026.",
    badge: "2ND RUNNER-UP",
    image: "/certificates/ratefluencer-thumb.png",
    href: "/certificates/ratefluencer.jpg",
  },
  {
    id: "promptwars",
    year: "2026",
    title: "PromptWars Virtual",
    org: "Hack2Skill · Google for Developers",
    detail:
      "Certificate of Appreciation for a verified Generative AI solution submitted for Challenge 4 during PromptWars Virtual — 25 August 2026.",
    image: "/certificates/pw-skills-thumb.png",
    href: "/certificates/pw-skills.pdf",
  },
  {
    id: "careers-future",
    year: "2026",
    title: "Careers of the Future Hackathon",
    org: "Built School",
    detail:
      "Participated in the Careers of the Future Hackathon by Built School on 4th & 5th July 2026, building a D2C brand.",
    badge: "PARTICIPANT",
    image: "/certificates/careers-future-thumb.png",
  },
  {
    id: "jpmorgan",
    year: "2026",
    title: "Software Engineering Job Simulation",
    org: "JPMorgan Chase · Forage",
    detail:
      "Completed practical tasks in project setup, Kafka, H2, and REST API work on the Forage Software Engineering Job Simulation - May 2026.",
    image: "/certificates/jpmorgan-thumb.png",
    href: "/certificates/jpmorgan.pdf",
  },
];

export const achievements = [
  {
    title: "Campus leadership",
    detail:
      "Directed Project Expo and Tech Project Fest — logistics, student work on display, and a program that had to run on time.",
    image: "/achievements/campus-leadership-thumb.png",
  },
  {
    title: "Films",
    detail:
      "3-time college-level national short film winner with Raagabhinaya.",
    image: "/achievements/films-thumb.png",
  },
];
