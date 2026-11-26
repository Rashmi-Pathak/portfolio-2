import { CASE_STUDIES } from "./caseStudies";

export type AccentTheme = "crimson" | "terracotta" | "cobalt" | "forest";

export interface ProjectItem {
  num: string;
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  role: string;
  badge: string;
  description: string;
  stack: string[];
  previewImage?: string;
  liveUrl?: string;
  githubUrl: string;
  theme: "light" | "dark";
  motif: "provenance" | "markets" | "forecast" | "fraud" | "kanban" | "crm";
}

export interface BookVolume {
  vol: string;
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  meta: string;
  liveUrl?: string;
  githubUrl: string;
  url: string;
  coverVariant: "ivory" | "black" | "crimson";
  motif:
    | "provenance"
    | "markets"
    | "forecast"
    | "fraud"
    | "kanban"
    | "crm"
    | "author";
}

export interface StackLayer {
  index: string;
  name: string;
  subtitle: string;
  editorialLine: string;
  chips: string[];
  usedIn: string;
  isFinal?: boolean;
}

export const PROFILE = {
  name: "RASHMI PATHAK",
  firstName: "RASHMI",
  lastName: "PATHAK",
  monogram: "RP",
  descriptor: "SOFTWARE ENGINEER · AI / ML · FINTECH · MUMBAI, INDIA",
  email: "rashmipathak2006@gmail.com",
  github: "https://github.com/Rashmi-Pathak",
  linkedin: "https://www.linkedin.com/in/rashmi-pathak-3a1a77240",
  location: "Mumbai, Maharashtra, India",
  education: "Xavier Institute of Engineering, Mumbai",
  degree: "B.Tech in Information Technology (Pursuing)",
  batch: "2024–2028",
  now: "B.Tech IT Student · Software Developer",
  heroStack: "Python · Java · TypeScript · Next.js · FastAPI",
  status: "Open to opportunities",
};

export const PROJECTS: ProjectItem[] = [
  {
    num: "01",
    id: "investra",
    slug: "investra",
    title: "INVESTRA",
    subtitle: "Stock Market Learning OS",
    role: "FINTECH FULL-STACK",
    badge: "350 CASE STUDIES",
    description:
      "Trading simulator based on real-life salary and monthly SIP, with four switchable broker-terminal UIs. Includes 350 case studies across seven labs, a voice-enabled AI mentor, and a pre-trade risk check.",
    stack: ["NEXT.JS", "TYPESCRIPT", "HIGHCHARTS", "WEB SPEECH API"],
    previewImage: "/assets/work_zip1/Investra/01-investra-hero.png",
    liveUrl: "https://investra-ruby.vercel.app/",
    githubUrl: "https://github.com/Rashmi-Pathak/Investra",
    theme: "light",
    motif: "markets",
  },
  {
    num: "02",
    id: "veridex",
    slug: "veridex",
    title: "VERIDEX",
    subtitle: "C2PA Media Provenance Recovery",
    role: "SYSTEMS & ML",
    badge: "C2PA · PGVECTOR",
    description:
      "Open-source server that recovers stripped C2PA provenance of AI-generated media using TrustMark watermark and PDQ perceptual-hash matching on a pgvector HNSW index. Signs manifests (Ed25519/COSE) and logs them to a Merkle transparency log on Backblaze B2.",
    stack: ["PYTHON", "FASTAPI", "PGVECTOR", "ED25519/COSE"],
    previewImage: "/assets/work_zip2/Veridex/01-veridex-hero.png",
    liveUrl: "https://veridex-ruddy-xi.vercel.app/",
    githubUrl: "https://github.com/Rashmi-Pathak/Veridex",
    theme: "light",
    motif: "provenance",
  },
  {
    num: "03",
    id: "obsidian",
    slug: "obsidian",
    title: "OBSIDIAN",
    subtitle: "The Living Map of Technology",
    role: "TECHNOLOGY INTELLIGENCE",
    badge: "15 CLUSTERS",
    description:
      "Technology intelligence dashboard tracking 15 technology clusters, live news signals, research papers, CVE advisories, and an interactive intelligence assistant.",
    stack: ["NEXT.JS", "TYPESCRIPT", "TAILWIND CSS", "LIVE PIPELINES"],
    previewImage: "/assets/work_zip2/Obsidian/01-obsidian-overview-hero.png",
    liveUrl: "https://obsidian-lilac-mu.vercel.app/",
    githubUrl: "https://github.com/Rashmi-Pathak/obsidian-",
    theme: "dark",
    motif: "fraud",
  },
  {
    num: "04",
    id: "aegis",
    slug: "aegis",
    title: "AEGIS",
    subtitle: "AI Business Risk & Decision Intelligence",
    role: "ML & FORECASTING",
    badge: "95% CI ENSEMBLE",
    description:
      "Isolation-forest anomaly detection and 30/60/90/180-day ensemble forecasts (LightGBM + SARIMAX) with 95% confidence intervals. Includes Bayesian risk quantification and a NetworkX digital twin.",
    stack: ["PYTHON", "FASTAPI", "LIGHTGBM", "STATSMODELS"],
    previewImage: "/assets/work_zip2/Aegis/01-aegis-hero.png",
    liveUrl: "https://aegis-xi-coral.vercel.app/",
    githubUrl: "https://github.com/Rashmi-Pathak/Aegis",
    theme: "light",
    motif: "forecast",
  },
  {
    num: "05",
    id: "keyboard-breaker",
    slug: "keyboard-breaker",
    title: "KEYBOARD BREAKER",
    subtitle: "Neon Arcade & 13 Browser Games",
    role: "ARCADE & INTERACTIVE WEB",
    badge: "13 GAMES",
    description:
      "Neon-lit arcade platform featuring 13 playable browser games, a discovery carousel, live score and streak tracking, milestones, and power-up mechanics.",
    stack: ["NEXT.JS", "REACT", "TYPESCRIPT", "TAILWIND CSS"],
    previewImage: "/assets/work_zip1/Keyboard_Breaker/01-keyboard-breaker-hero.png",
    liveUrl: "https://keyboardbreaker.vercel.app/",
    githubUrl: "https://github.com/Rashmi-Pathak/Keyboard_Breaker",
    theme: "dark",
    motif: "crm",
  },
  {
    num: "06",
    id: "flowgrid",
    slug: "flowgrid",
    title: "FLOWGRID",
    subtitle: "Real-Time Collaborative Workspace",
    role: "FULL-STACK SAAS",
    badge: "MULTI-TENANT",
    description:
      "Multi-tenant project workspace with drag-and-drop Kanban boards, P1–P5 priorities, real-time thread messaging, notifications, and light/dark theming.",
    stack: ["NEXT.JS", "TYPESCRIPT", "SUPABASE", "@DND-KIT"],
    previewImage: "/assets/work_zip1/FlowGrid/01-flowgrid-landing.png",
    liveUrl: "https://flowgrid-gules.vercel.app/",
    githubUrl: "https://github.com/Rashmi-Pathak/FlowGrid",
    theme: "light",
    motif: "kanban",
  },
];

export const BOOK_VOLUMES: BookVolume[] = CASE_STUDIES.map((cs) => ({
  vol: cs.index,
  id: cs.slug,
  slug: cs.slug,
  title: cs.name,
  subtitle: cs.subtitle,
  description: cs.shortDescription,
  meta: cs.shortStack.join(" · "),
  liveUrl: cs.liveUrl,
  githubUrl: cs.repositoryUrl,
  url: `/work/${cs.slug}`,
  coverVariant: cs.coverVariant,
  motif: cs.motif,
}));

// Note: Category 05 uses "SYSTEMS" in place of unsupported Web3 items, preserving the 7-layer cadence
// while staying 100% factual to Rashmi's resume (C2PA, Ed25519/COSE, Merkle transparency logs, HNSW indexing).
export const STACK_LAYERS: StackLayer[] = [
  {
    index: "00",
    name: "LANGUAGES",
    subtitle: "WHAT I WRITE IN",
    editorialLine: "Core languages across systems, ML, and web",
    chips: ["Python", "Java", "Kotlin", "SQL", "TypeScript", "JavaScript"],
    usedIn: "VERIDEX · INVESTRA · AEGIS · FRAUDSHIELD AI · FLOWGRID · SUPPORTDESK CRM",
  },
  {
    index: "01",
    name: "INTERFACE",
    subtitle: "WHAT PEOPLE TOUCH",
    editorialLine: "Responsive interfaces, terminals, and visual analytics",
    chips: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Highcharts"],
    usedIn: "INVESTRA · FLOWGRID · SUPPORTDESK CRM · AEGIS",
  },
  {
    index: "02",
    name: "API",
    subtitle: "WHAT ANSWERS",
    editorialLine: "Low-latency inference services and backend APIs",
    chips: ["FastAPI", "Node.js", "RESTful APIs", "Supabase"],
    usedIn: "AEGIS · FRAUDSHIELD AI · FLOWGRID · VERIDEX",
  },
  {
    index: "03",
    name: "DATA",
    subtitle: "WHAT REMEMBERS",
    editorialLine: "Vector search, pipelines, and analytical tooling",
    chips: [
      "PostgreSQL",
      "pgvector",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Data Engineering",
    ],
    usedIn: "VERIDEX · AEGIS · FRAUDSHIELD AI · BLUESTOCK",
  },
  {
    index: "04",
    name: "AI & ML",
    subtitle: "WHAT THINKS",
    editorialLine: "Anomaly detection, forecasting, RAG, and LLM integration",
    chips: [
      "Scikit-learn",
      "XGBoost",
      "LightGBM",
      "Statsmodels",
      "RAG",
      "OpenAI / Gemini / Groq",
    ],
    usedIn: "AEGIS · FRAUDSHIELD AI · INVESTRA · SUPPORTDESK CRM",
  },
  {
    index: "05",
    name: "SYSTEMS",
    subtitle: "WHAT PROVES",
    editorialLine: "Cryptographic provenance, indexing, and security",
    chips: [
      "C2PA",
      "Ed25519 / COSE",
      "Merkle Transparency Logs",
      "HNSW Indexing",
    ],
    usedIn: "VERIDEX",
  },
  {
    index: "06",
    name: "SHIP",
    subtitle: "WHAT GETS IT LIVE",
    editorialLine: "Version control, deployment, and iteration",
    chips: ["GitHub", "Vercel", "Deployment", "Testing & Iteration"],
    usedIn: "ALL SIX DEPLOYED PRODUCTS",
    isFinal: true,
  },
];

export const RECEIPTS = {
  experience: {
    role: "Data Analyst Intern",
    company: "Bluestock",
    period: "May 2026 – Jul 2026",
    summary:
      "Completed a two-month internship focused on data analysis fundamentals and real-world datasets.",
    bullets: [
      "Performed data cleaning, analysis, and visualization tasks under mentor guidance.",
      "Strengthened practical skills in data handling, analytical tools, and collaborative working.",
    ],
  },
  education: {
    institution: "Xavier Institute of Engineering, Mumbai",
    degree: "B.Tech in Information Technology (Pursuing)",
    period: "2024 – 2028",
  },
  achievements: [
    { title: "Winner", event: "Code-a-thon Hackathon" },
    { title: "Finalist", event: "AlgorithmX Hackathon" },
  ],
  certification: {
    title: "Ethical Hacking & Cyber Defense",
    topics: "Penetration testing, vulnerability assessment, Kali Linux.",
  },
};
