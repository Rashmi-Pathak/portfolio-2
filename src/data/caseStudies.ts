export interface CaseStudyMedia {
  type: "image" | "video" | "schematic";
  src?: string;
  alt: string;
  caption: string;
  isIllustration?: boolean;
}

export interface CaseStudyFeature {
  num: string;
  title: string;
  tag: string;
  summary: string;
}

export interface CaseStudyArchitectureNode {
  step: string;
  label: string;
  detail: string;
}

export interface CaseStudyTheme {
  bg: string;
  surface: string;
  text: string;
  muted: string;
  accent: string;
  accentSecondary: string;
  border: string;
}

export interface CaseStudy {
  slug: string;
  index: string;
  name: string;
  subtitle: string;
  shortDescription: string;
  summary: string;
  category: string;
  role: string;
  shortStack: string[];
  stack: string[];
  repositoryUrl: string;
  liveUrl?: string;
  coverVariant: "ivory" | "black" | "crimson";
  motif:
    | "provenance"
    | "markets"
    | "forecast"
    | "fraud"
    | "kanban"
    | "crm"
    | "author";
  theme: CaseStudyTheme;
  heroMedia: CaseStudyMedia;
  overview: {
    whatItIs: string;
    whoItIsFor: string;
    whatMakesItDifferent: string;
  };
  problemHeading: string;
  problem: string;
  approach: string;
  sections: CaseStudyFeature[];
  architectureTitle: string;
  architectureNodes: CaseStudyArchitectureNode[];
  gallery: CaseStudyMedia[];
  closingLine: string;
  nextProjectSlug: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "veridex",
    index: "01",
    name: "VERIDEX",
    subtitle: "C2PA MEDIA PROVENANCE RECOVERY",
    shortDescription:
      "TrustMark watermark + PDQ perceptual-hash matching on pgvector HNSW with Ed25519/COSE signing.",
    summary:
      "Recover the provenance of AI-generated media after embedded Content Credentials have been stripped. Veridex uses watermark and perceptual-fingerprint recovery to locate the signed manifest and return a verifiable provenance record.",
    category: "SYSTEMS & MEDIA PROVENANCE",
    role: "Personal project",
    shortStack: ["PYTHON", "PGVECTOR", "C2PA"],
    stack: [
      "Python 3.11–3.13",
      "FastAPI",
      "Next.js 15",
      "PostgreSQL",
      "pgvector HNSW",
      "Backblaze B2",
      "TrustMark",
      "PDQ",
      "Ed25519 / COSE",
      "C2PA",
      "FastMCP",
      "Three.js",
    ],
    repositoryUrl: "https://github.com/Rashmi-Pathak/Veridex",
    liveUrl: "https://veridex-ruddy-xi.vercel.app/",
    coverVariant: "ivory",
    motif: "provenance",
    theme: {
      bg: "#071312",
      surface: "#0c1f1d",
      text: "#ecfdf5",
      muted: "#94a3b8",
      accent: "#34d399",
      accentSecondary: "#38bdf8",
      border: "rgba(52, 211, 153, 0.28)",
    },
    heroMedia: {
      type: "image",
      src: "/assets/work_zip2/Veridex/01-veridex-hero.png",
      alt: "Veridex hero interface showing C2PA provenance recovery overview",
      caption: "Veridex — Open C2PA Soft Binding Resolution hero interface.",
    },
    overview: {
      whatItIs:
        "An open-source, vendor-neutral C2PA Soft Binding Resolution (SBR) server for recovering stripped Content Credentials across images, audio, and video.",
      whoItIsFor:
        "Media publishers, verification tools, and developers needing resilient origin lookup when platforms strip embedded C2PA metadata.",
      whatMakesItDifferent:
        "Combines TrustMark invisible watermark matching with PDQ perceptual-hash fallback on pgvector HNSW and seals manifest checkpoints to a Merkle transparency log on Backblaze B2.",
    },
    problemHeading: "When credentials disappear",
    problem:
      "Embedded C2PA Content Credentials are routinely stripped when images, audio, or video are re-encoded, compressed, or shared across platforms. Once the manifest is stripped, the file carries no origin record.",
    approach:
      "Veridex resolves provenance through a two-stage recovery path — TrustMark invisible watermark matching first, then PDQ perceptual-hash nearest-neighbor matching on a PostgreSQL pgvector HNSW index — returning an Ed25519/COSE-signed manifest anchored to a Merkle transparency log on Backblaze B2.",
    sections: [
      {
        num: "01",
        title: "WHEN CREDENTIALS DISAPPEAR",
        tag: "PROBLEM",
        summary:
          "Re-encoding media strips embedded C2PA manifests. Veridex preserves a soft-binding lookup path across images, audio, and video.",
      },
      {
        num: "02",
        title: "RECOVER THE RECORD",
        tag: "TRUSTMARK → PDQ",
        summary:
          "Queries TrustMark watermark matching first, then falls back to PDQ perceptual-hash matching on a pgvector HNSW index.",
      },
      {
        num: "03",
        title: "A RECORD THAT CAN BE VERIFIED",
        tag: "ED25519 / MERKLE",
        summary:
          "Signs manifests with Ed25519/COSE, stores content-addressed assets on Backblaze B2, and seals Merkle transparency log checkpoints in an Object Lock bucket.",
      },
      {
        num: "04",
        title: "ONE TRUST CORE, MANY SURFACES",
        tag: "API / CLI / MCP",
        summary:
          "Exposes an SBR API alongside documented web, CLI, FastMCP, browser extension, and native mobile client surfaces.",
      },
      {
        num: "05",
        title: "PROVENANCE IS NOT TRUTH",
        tag: "SCOPE NOTE",
        summary:
          "Provenance establishes origin and tamper evidence for a recorded manifest — it does not prove that the media's underlying claims are true.",
      },
    ],
    architectureTitle: "SBR Recovery & Transparency Pipeline",
    architectureNodes: [
      {
        step: "01",
        label: "SURFACES",
        detail: "Web UI · CLI · FastMCP · Browser Extension · Mobile",
      },
      {
        step: "02",
        label: "FASTAPI SBR CORE",
        detail: "Soft Binding Resolution API & Manifest Verification",
      },
      {
        step: "03",
        label: "TWO-STAGE RESOLVER",
        detail: "TrustMark Watermark Match → PDQ Perceptual Hash (pgvector HNSW)",
      },
      {
        step: "04",
        label: "STORAGE & PROOF",
        detail: "Backblaze B2 Object Lock · Ed25519/COSE · Merkle Log",
      },
    ],
    gallery: [
      {
        type: "image",
        src: "/assets/work_zip2/Veridex/02-veridex-strip-and-recover-demo.png",
        alt: "Veridex Strip and Recover demonstration showing credentialed image recovery",
        caption: "Strip & Recover — in-browser re-encode strips metadata, then SBR API recovers it.",
      },
      {
        type: "image",
        src: "/assets/work_zip2/Veridex/03-veridex-trust-and-tamper-evidence.png",
        alt: "Veridex Trust and Tamper Evidence verification panel",
        caption: "Tamper Evidence — COSE signature check and embedded vs recovered record comparison.",
      },
    ],
    closingLine: "Soft-binding provenance recovery with verifiable cryptographic checkpoints.",
    nextProjectSlug: "investra",
  },
  {
    slug: "investra",
    index: "02",
    name: "INVESTRA",
    subtitle: "A REAL-LIFE SALARY-BASED STOCK MARKET LEARNING OS",
    shortDescription:
      "Salary and SIP trading simulator with four broker-terminal UIs, 350 case studies, and voice AI mentor.",
    summary:
      "A stock-market learning simulator built around realistic salary and monthly SIP decisions instead of unlimited virtual cash. Investra lets learners practise disciplined investing across multiple broker-terminal environments and structured financial drills.",
    category: "FINTECH & LEARNING OS",
    role: "Personal project",
    shortStack: ["NEXT.JS", "TYPESCRIPT", "HIGHCHARTS"],
    stack: [
      "Next.js 15.1.3",
      "React 19",
      "TypeScript 5.7.2",
      "Tailwind CSS 3.4.17",
      "Highcharts Stock",
      "Turborepo 2",
      "Zustand 5",
      "Web Speech API",
    ],
    repositoryUrl: "https://github.com/Rashmi-Pathak/Investra",
    liveUrl: "https://investra-ruby.vercel.app/",
    coverVariant: "black",
    motif: "markets",
    theme: {
      bg: "#0c0b09",
      surface: "#171410",
      text: "#f5efe6",
      muted: "#a89f91",
      accent: "#d69e54",
      accentSecondary: "#22c55e",
      border: "rgba(214, 158, 84, 0.3)",
    },
    heroMedia: {
      type: "image",
      src: "/assets/work_zip1/Investra/01-investra-hero.png",
      alt: "Investra hero showing real-life salary simulator and monthly SIP surplus",
      caption: "Real-Life Salary Simulator — calculating investable surplus from monthly earnings.",
    },
    overview: {
      whatItIs:
        "A stock-market learning OS that replaces unrealistic ₹10L virtual balances with real monthly salary, expenses, and ₹5,000 SIP constraints.",
      whoItIsFor:
        "New retail investors and students learning Indian equity markets, position sizing, and trading psychology before risking real capital.",
      whatMakesItDifferent:
        "Combines 4 switchable broker-terminal UIs, 350 case studies across 7 flight-simulator labs, a voice-enabled AI mentor, a pre-trade risk shield, and a 2020 COVID crash replay engine.",
    },
    problemHeading: "Learn with real constraints",
    problem:
      "Conventional stock-market simulators hand beginners ₹10,00,000 in unlimited virtual cash, encouraging reckless habits that fail when real monthly income, rent, and EMIs are on the line.",
    approach:
      "Investra grounds every trade in a user's actual monthly surplus (for example, ₹45,000 salary − ₹30,000 expenses = ₹15,000 surplus, with ₹5,000 monthly SIP allocations), pairs it with four authentic broker-terminal UIs, 350 structured case studies across seven labs, a voice-enabled AI mentor, and a pre-trade risk shield.",
    sections: [
      {
        num: "01",
        title: "LEARN WITH REAL CONSTRAINTS",
        tag: "SALARY & SIP MODEL",
        summary:
          "Calculates investable monthly surplus after expenses and simulates ₹5,000 SIP allocations (plus an optional ₹1,00,000 fixed-cash beginner mode).",
      },
      {
        num: "02",
        title: "FOUR TERMINALS. ONE LEARNING ENGINE.",
        tag: "BROKER WORKSPACES",
        summary:
          "Switch seamlessly between native Investra, Zerodha Kite-style, Groww-style, and Upstox Pro-style terminals while keeping wallet and holdings unified.",
      },
      {
        num: "03",
        title: "SEVEN FINANCIAL FLIGHT SIMULATORS",
        tag: "350 CASE STUDIES",
        summary:
          "Seven interactive labs with 50 case studies each: Psychology, Candlesticks, Forensics, Order Books, Earnings Call, Portfolio Doctor, and 9:15 AM Opening Bell Drill.",
      },
      {
        num: "04",
        title: "THINK BEFORE YOU TRADE",
        tag: "AI MENTOR & RISK SHIELD",
        summary:
          "Persistent Web Speech API voice mentor, Ask AI on Selection explainer, and pre-trade risk shield checking FOMO, <15% capital-risk cap, and stop-loss distance.",
      },
      {
        num: "05",
        title: "REPLAY THE CRASH",
        tag: "FEB–NOV 2020",
        summary:
          "Candle-by-candle COVID Crash Replay Engine letting learners test discipline across the 2020 drawdown and recovery.",
      },
    ],
    architectureTitle: "Salary-Constrained Simulation Engine",
    architectureNodes: [
      {
        step: "01",
        label: "SURPLUS ENGINE",
        detail: "Monthly Salary − Expenses → Investable Surplus & ₹5k SIP",
      },
      {
        step: "02",
        label: "4 TERMINAL SHELLS",
        detail: "Investra · Kite-style · Groww-style · Upstox Pro-style",
      },
      {
        step: "03",
        label: "PRE-TRADE RISK SHIELD",
        detail: "FOMO Check · <15% Capital Risk Cap · Stop-Loss Distance",
      },
      {
        step: "04",
        label: "7 LABS & REPLAY",
        detail: "350 Case Studies · Voice AI Mentor · 2020 Crash Replay",
      },
    ],
    gallery: [
      {
        type: "image",
        src: "/assets/work_zip1/Investra/02-investra-broker-terminals.png",
        alt: "Investra four switchable broker terminal workspaces",
        caption: "Four Broker Terminals — unified wallet and P&L across four UI styles.",
      },
      {
        type: "image",
        src: "/assets/work_zip1/Investra/03-investra-covid-crash-replay.png",
        alt: "Investra COVID-19 2020 crash replay candlestick simulator",
        caption: "Historical Crisis Simulator — Feb–Nov 2020 candle-by-candle replay.",
      },
    ],
    closingLine: "Disciplined market education anchored to real monthly cashflow.",
    nextProjectSlug: "aegis",
  },
  {
    slug: "aegis",
    index: "03",
    name: "AEGIS",
    subtitle: "AI BUSINESS RISK & DECISION INTELLIGENCE",
    shortDescription:
      "LightGBM + SARIMAX ensemble forecasts, isolation-forest anomalies, and Bayesian risk quantification.",
    summary:
      "An enterprise intelligence platform that turns fragmented operational records into anomaly signals, multi-horizon forecasts, quantified risk, and human-reviewed decision recommendations.",
    category: "ENTERPRISE AI & RISK",
    role: "Personal project",
    shortStack: ["PYTHON", "FASTAPI", "LIGHTGBM"],
    stack: [
      "Python",
      "FastAPI",
      "Pydantic v2",
      "Pandas / Polars",
      "Scikit-learn",
      "LightGBM",
      "XGBoost",
      "Statsmodels",
      "NetworkX",
      "SQLAlchemy 2",
      "React 18",
      "Recharts",
    ],
    repositoryUrl: "https://github.com/Rashmi-Pathak/Aegis",
    liveUrl: "https://aegis-xi-coral.vercel.app/",
    coverVariant: "ivory",
    motif: "forecast",
    theme: {
      bg: "#0c0906",
      surface: "#18110b",
      text: "#fff7ed",
      muted: "#c2a88f",
      accent: "#ff7a18",
      accentSecondary: "#f59e0b",
      border: "rgba(255, 122, 24, 0.32)",
    },
    heroMedia: {
      type: "image",
      src: "/assets/work_zip2/Aegis/01-aegis-hero.png",
      alt: "Aegis AI Risk Intelligence landing hero",
      caption: "AEGIS — Enterprise AI Risk & Decision Intelligence hero.",
    },
    overview: {
      whatItIs:
        "A Python-first multi-tenant business risk and decision intelligence platform unifying operational telemetry, anomaly detection, forecasting, and scenario simulation.",
      whoItIsFor:
        "Operations, finance, and executive teams needing early anomaly detection and causal what-if modeling before committing decisions.",
      whatMakesItDifferent:
        "Links LightGBM + SARIMAX multi-horizon forecasts, Isolation Forest anomalies, Bayesian loss distributions, and a NetworkX digital twin into a human-authorized decision queue.",
    },
    problemHeading: "From fragmented data to a shared picture",
    problem:
      "Operational telemetry lives across disconnected ERP, CRM, inventory, marketing, and logistics tables, making it hard to spot anomalies early or model how a disruption propagates across the business.",
    approach:
      "Aegis normalizes multi-tenant operational datasets, detects deviations via Isolation Forest, generates 30/60/90/180-day LightGBM + SARIMAX forecasts with 95% confidence intervals, maps stress propagation on a NetworkX digital twin, and routes what-if scenarios through a human-authorized decision queue.",
    sections: [
      {
        num: "01",
        title: "FROM FRAGMENTED DATA TO A SHARED PICTURE",
        tag: "SCHEMA INFERENCE",
        summary:
          "Unifies ERP, CRM, inventory, marketing, and logistics records with canonical normalization and 14 pre-built operational datasets.",
      },
      {
        num: "02",
        title: "DETECT THE DEVIATION",
        tag: "ISOLATION FOREST",
        summary:
          "Runs Isolation Forest and rolling statistical anomaly detection across operational streams.",
      },
      {
        num: "03",
        title: "FORECAST THE NEXT HORIZON",
        tag: "LIGHTGBM + SARIMAX",
        summary:
          "Produces 30/60/90/180-day ensemble forecasts with 95% confidence intervals and MAE/RMSE tracking.",
      },
      {
        num: "04",
        title: "MAP THE RISK",
        tag: "BAYESIAN & DIGITAL TWIN",
        summary:
          "Combines Bayesian risk quantification and copula loss distributions with a NetworkX directed business digital twin graph.",
      },
      {
        num: "05",
        title: "FROM INSIGHT TO ACTION",
        tag: "WHAT-IF STUDIO",
        summary:
          "Simulates pricing, discount, headcount, procurement, and buffer levers, queuing prescriptive actions for executive authorization.",
      },
    ],
    architectureTitle: "Telemetry → Forecast → Digital Twin → Decision Queue",
    architectureNodes: [
      {
        step: "01",
        label: "INGEST & NORMALIZE",
        detail: "ERP · CRM · Inventory · Marketing · Logistics (Polars / Pandas)",
      },
      {
        step: "02",
        label: "ANOMALY & FORECAST",
        detail: "Isolation Forest · LightGBM + SARIMAX (30/60/90/180d, 95% CI)",
      },
      {
        step: "03",
        label: "RISK & DIGITAL TWIN",
        detail: "Bayesian Loss Distributions · NetworkX Stress Propagation",
      },
      {
        step: "04",
        label: "WHAT-IF & APPROVAL",
        detail: "Scenario Levers → Human-Authorized Executive Decision Queue",
      },
    ],
    gallery: [
      {
        type: "image",
        src: "/assets/work_zip2/Aegis/02-aegis-predictive-telemetry.png",
        alt: "Aegis predictive telemetry forecast and anomaly stream",
        caption: "Predictive Telemetry — multi-horizon forecast paired with real-time anomaly stream.",
      },
      {
        type: "image",
        src: "/assets/work_zip2/Aegis/03-aegis-what-if-simulation.png",
        alt: "Aegis What-If Simulation Studio workspace",
        caption: "What-If Simulation Studio — interactive levers comparing baseline vs scenario impact.",
      },
      {
        type: "video",
        src: "/assets/work_zip2/Aegis/04-aegis-product-walkthrough-720p.mp4",
        alt: "Aegis product walkthrough video",
        caption: "Aegis Product Walkthrough — live navigation across intelligence, risk, and simulation modules.",
      },
    ],
    closingLine: "Predictive business telemetry paired with human-reviewed decision intelligence.",
    nextProjectSlug: "fraudshield-ai",
  },
  {
    slug: "fraudshield-ai",
    index: "04",
    name: "FRAUDSHIELD AI",
    subtitle: "REAL-TIME TRANSACTION MONITORING & FRAUD DETECTION",
    shortDescription:
      "Streaming XGBoost, Random Forest, and Isolation Forest ensemble with SHAP alert explanations.",
    summary:
      "A transaction-monitoring system that combines streaming ingestion, ensemble machine learning, and deterministic rules to flag suspicious activity and support alert investigation.",
    category: "STREAMING ML & SURVEILLANCE",
    role: "Personal project",
    shortStack: ["PYTHON", "FASTAPI", "XGBOOST", "SHAP"],
    stack: [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "SQLite",
      "Pandas",
      "Scikit-learn",
      "XGBoost",
      "SHAP",
      "Next.js",
      "TypeScript",
      "Recharts",
      "WebSockets",
    ],
    repositoryUrl: "https://github.com/Rashmi-Pathak/Fraud-Shield-",
    liveUrl: "https://fraud-shield-beta.vercel.app/",
    coverVariant: "crimson",
    motif: "fraud",
    theme: {
      bg: "#11100f",
      surface: "#1b1815",
      text: "#f0e4c9",
      muted: "#a69c8e",
      accent: "#e03a3e",
      accentSecondary: "#f59e0b",
      border: "rgba(224, 58, 62, 0.35)",
    },
    heroMedia: {
      type: "schematic",
      alt: "Illustrative transaction monitoring stream and SHAP alert queue diagram",
      caption: "Illustrative schematic — streaming transaction scoring, rule engine, and SHAP alert queue.",
      isIllustration: true,
    },
    overview: {
      whatItIs:
        "A real-time fraud surveillance platform combining async WebSocket transaction streaming, a three-model ML ensemble, deterministic rules, and SHAP investigation.",
      whoItIsFor:
        "Fraud analysts and fintech engineering teams needing transparent, auditable reasons behind every flagged transaction.",
      whatMakesItDifferent:
        "Pairs XGBoost, Random Forest, and Isolation Forest probabilities with 10+ deterministic rule checks and per-alert SHAP feature explanations.",
    },
    problemHeading: "Every transaction leaves a signal",
    problem:
      "Black-box fraud scores alone leave investigators guessing why a transaction was flagged, while static rule engines miss shifting behavioral patterns across high-velocity streams.",
    approach:
      "FraudShield AI pairs an asynchronous WebSocket streaming engine with a three-model ML ensemble (XGBoost, Random Forest, Isolation Forest), 10+ deterministic rule categories, and an investigation workspace surfacing SHAP feature attributions and customer timelines.",
    sections: [
      {
        num: "01",
        title: "EVERY TRANSACTION LEAVES A SIGNAL",
        tag: "ASYNC STREAMING",
        summary:
          "Simulates and ingests transactions over asyncio and WebSockets with moving-average, velocity, and behavioral feature engineering.",
      },
      {
        num: "02",
        title: "THREE MODELS, ONE RISK VIEW",
        tag: "ML ENSEMBLE",
        summary:
          "Combines XGBoost, Random Forest, and Isolation Forest probabilities into a unified dynamic risk score.",
      },
      {
        num: "03",
        title: "RULES THAT ACT IMMEDIATELY",
        tag: "DETERMINISTIC ENGINE",
        summary:
          "Evaluates 10+ deterministic rule categories including transaction velocity, amount anomalies, and geographic shifts.",
      },
      {
        num: "04",
        title: "INVESTIGATE THE WHY",
        tag: "SHAP EXPLAINABILITY",
        summary:
          "Alert Investigation surfaces SHAP feature contributions, risk factors, model breakdowns, and customer timelines.",
      },
    ],
    architectureTitle: "Streaming Surveillance & Investigation Flow",
    architectureNodes: [
      {
        step: "01",
        label: "STREAM INGEST",
        detail: "Asyncio + WebSocket Transaction Feed & Feature Engineering",
      },
      {
        step: "02",
        label: "ENSEMBLE SCORING",
        detail: "XGBoost + Random Forest + Isolation Forest",
      },
      {
        step: "03",
        label: "RULE ENGINE",
        detail: "10+ Deterministic Categories (Velocity · Amount · Geo Shift)",
      },
      {
        step: "04",
        label: "ALERT INVESTIGATION",
        detail: "Overview · Live Monitor · SHAP Breakdown · Customer Timeline",
      },
    ],
    gallery: [
      {
        type: "schematic",
        alt: "Illustrative diagram of FraudShield AI ensemble and SHAP investigation workflow",
        caption: "Illustrative diagram — model breakdown and deterministic rule evaluation layers.",
        isIllustration: true,
      },
    ],
    closingLine: "Explainable real-time transaction monitoring built for alert investigation.",
    nextProjectSlug: "flowgrid",
  },
  {
    slug: "flowgrid",
    index: "05",
    name: "FLOWGRID",
    subtitle: "REAL-TIME COLLABORATIVE PROJECT MANAGEMENT",
    shortDescription:
      "Multi-tenant workspace with drag-and-drop Kanban boards, real-time messaging, and theming.",
    summary:
      "A multi-tenant project workspace for organising work, assigning tasks, collaborating in real time, and keeping teams aligned through a responsive Kanban and messaging experience.",
    category: "COLLABORATIVE SAAS",
    role: "Personal project",
    shortStack: ["NEXT.JS", "TYPESCRIPT", "SUPABASE"],
    stack: [
      "Next.js 16 App Router",
      "React 19",
      "TypeScript 5",
      "Tailwind CSS 4",
      "shadcn/ui",
      "TanStack Query",
      "@dnd-kit/core",
      "Supabase PostgreSQL",
      "Supabase Auth",
      "Supabase Realtime",
    ],
    repositoryUrl: "https://github.com/Rashmi-Pathak/FlowGrid",
    liveUrl: "https://flowgrid-gules.vercel.app/",
    coverVariant: "ivory",
    motif: "kanban",
    theme: {
      bg: "#0b0d0a",
      surface: "#141812",
      text: "#f4f7f0",
      muted: "#9ca396",
      accent: "#c4ff0e",
      accentSecondary: "#38bdf8",
      border: "rgba(196, 255, 14, 0.28)",
    },
    heroMedia: {
      type: "image",
      src: "/assets/work_zip1/FlowGrid/01-flowgrid-landing.png",
      alt: "FlowGrid landing hero showing Every project, under one roof",
      caption: "FlowGrid — multi-tenant project workspace landing interface.",
    },
    overview: {
      whatItIs:
        "An open-source multi-tenant project management workspace combining drag-and-drop Kanban boards, role-based permissions, and built-in real-time team chat.",
      whoItIsFor:
        "Engineering and product teams who want task execution and inline workspace messaging in one unified place.",
      whatMakesItDifferent:
        "Pairs @dnd-kit optimistic board updates and assignee-only task movement guards with Supabase Realtime thread messaging and notifications.",
    },
    problemHeading: "Work has a place",
    problem:
      "Small teams often split project tracking, task assignments, and live discussion across disconnected tools, losing context whenever a task changes state.",
    approach:
      "FlowGrid unifies multi-tenant workspaces, drag-and-drop Kanban boards (@dnd-kit/core) with P1–P5 priorities and assignee-only movement permissions, real-time Supabase Realtime updates, thread-based workspace chat, and in-app notifications.",
    sections: [
      {
        num: "01",
        title: "WORK HAS A PLACE",
        tag: "MULTI-TENANT",
        summary:
          "Organizes work into Workspaces → Projects → Boards → Tasks with email member invitations and Supabase Auth.",
      },
      {
        num: "02",
        title: "MOVE WORK FORWARD",
        tag: "KANBAN & PERMISSIONS",
        summary:
          "Drag-and-drop To Do / In Progress / Done columns with P1–P5 priorities, due-date categories, multi-assignee support, and optimistic updates.",
      },
      {
        num: "03",
        title: "COLLABORATION IS BUILT IN",
        tag: "REALTIME CHAT",
        summary:
          "Thread-based workspace messaging with live delivery, unread counts, editing, deletion, and in-app notifications.",
      },
      {
        num: "04",
        title: "ACCESS WITH INTENTION",
        tag: "RBAC",
        summary:
          "Role-based workspace access across Owner, Admin, Member, and Viewer roles with light/dark/system theming.",
      },
    ],
    architectureTitle: "Workspace → Board → Realtime Sync",
    architectureNodes: [
      {
        step: "01",
        label: "MULTI-TENANT AUTH",
        detail: "Supabase Auth · Owner / Admin / Member / Viewer Roles",
      },
      {
        step: "02",
        label: "KANBAN ENGINE",
        detail: "@dnd-kit/core · P1–P5 Priorities · Optimistic UI Updates",
      },
      {
        step: "03",
        label: "REALTIME & CHAT",
        detail: "Supabase Realtime · Thread Messaging · Notifications",
      },
      {
        step: "04",
        label: "CLIENT STATE",
        detail: "Next.js 16 App Router · TanStack Query · Zod Validation",
      },
    ],
    gallery: [
      {
        type: "video",
        src: "/assets/work_zip1/FlowGrid/03-flowgrid-product-demo.mp4",
        alt: "FlowGrid product walkthrough video showing Kanban drag-and-drop and workspace chat",
        caption: "FlowGrid Product Walkthrough — live task movement, #design-team chat, and notifications.",
      },
      {
        type: "image",
        src: "/assets/work_zip1/FlowGrid/02-flowgrid-how-it-works.png",
        alt: "FlowGrid three-step workflow section",
        caption: "Three-Step Workflow — Invite team, build the board, discuss inline.",
      },
    ],
    closingLine: "Real-time Kanban execution and workspace messaging under one roof.",
    nextProjectSlug: "supportdesk",
  },
  {
    slug: "supportdesk",
    index: "06",
    name: "SUPPORTDESK CRM",
    subtitle: "CUSTOMER SUPPORT & ORDER MANAGEMENT",
    shortDescription:
      "CRM over 14 normalized Google Sheets with role-based access and LLaMA 3.3 copilot.",
    summary:
      "A customer-support and order-management CRM with a Next.js interface, Google Apps Script action-routing backend, a 14-sheet relational data model, role-based access, and a LLaMA 3.3 AI copilot.",
    category: "CRM & AI COPILOT",
    role: "Personal project",
    shortStack: ["NEXT.JS", "APPS SCRIPT", "LLAMA 3.3"],
    stack: [
      "Next.js 16",
      "React",
      "Google Apps Script",
      "Google Sheets (14 sub-sheets)",
      "LLaMA 3.3",
      "Groq API",
      "REST / HTTPS JSON",
      "CacheService",
    ],
    repositoryUrl: "https://github.com/Rashmi-Pathak/SupportDesk",
    liveUrl: "https://support-desk-beta.vercel.app/",
    coverVariant: "black",
    motif: "crm",
    theme: {
      bg: "#171411",
      surface: "#221d18",
      text: "#f0e4c9",
      muted: "#a99f91",
      accent: "#b51f2b",
      accentSecondary: "#e03a3e",
      border: "rgba(240, 228, 201, 0.24)",
    },
    heroMedia: {
      type: "schematic",
      alt: "Illustrative diagram of SupportDesk CRM ticket queue, 14-sheet data store, and LLaMA 3.3 copilot",
      caption: "Illustrative schematic — Next.js SPA, Apps Script action router, 14 normalized sheets, and LLaMA 3.3 copilot.",
      isIllustration: true,
    },
    overview: {
      whatItIs:
        "A lightweight support and order CRM pairing a Next.js SPA with a Google Apps Script backend over 14 normalized Google Sheets.",
      whoItIsFor:
        "Support agents, admins, and small operations teams managing tickets, SLAs, and customer orders without heavy database overhead.",
      whatMakesItDifferent:
        "Implements stateless token auth, round-robin routing, CacheService buffering, a Ctrl+K command palette, and an embedded LLaMA 3.3 sentiment & reply-drafting copilot.",
    },
    problemHeading: "Support is a system",
    problem:
      "Small support and order operations often outgrow ad-hoc spreadsheets before they are ready for heavy enterprise CRM infrastructure, yet still need SLA tracking, routing, and AI assistance.",
    approach:
      "SupportDesk CRM pairs a Next.js SPA (including a Ctrl+K command palette and AI Copilot drawer) with a Google Apps Script HTTPS JSON action router backed by 14 normalized Google Sheets sub-sheets, stateless token auth, round-robin routing, and CacheService buffering.",
    sections: [
      {
        num: "01",
        title: "FOURTEEN SHEETS. ONE OPERATING MODEL.",
        tag: "RELATIONAL-STYLE STORE",
        summary:
          "Uses Google Sheets as a normalized 14-sheet relational-style data store accessed via SheetDAO and Apps Script CacheService.",
      },
      {
        num: "02",
        title: "ROUTE THE WORK",
        tag: "SLA & ROUND-ROBIN",
        summary:
          "Distributes tickets and consulting orders across agents via round-robin routing with priority, team buckets, SLA deadlines, and escalation.",
      },
      {
        num: "03",
        title: "A COPILOT IN THE WORKFLOW",
        tag: "LLAMA 3.3",
        summary:
          "Provides sentiment scoring, reply drafts, and one-click insertion inside the agent drawer alongside a Ctrl+K command palette.",
      },
      {
        num: "04",
        title: "ROLE-BASED OPERATIONS",
        tag: "ADMIN · AGENT · CUSTOMER",
        summary:
          "Stateless time-bound token auth enforces permissions across Admin, Agent, and Customer views, including order history and status updates.",
      },
    ],
    architectureTitle: "Next.js SPA → Apps Script Router → 14 Normalized Sheets",
    architectureNodes: [
      {
        step: "01",
        label: "NEXT.JS 16 SPA",
        detail: "Inbox Queue · Ctrl+K Palette · LLaMA 3.3 Copilot Drawer",
      },
      {
        step: "02",
        label: "APPS SCRIPT ROUTER",
        detail: "HTTPS JSON Action Routing · Stateless Token Auth · RBAC",
      },
      {
        step: "03",
        label: "SERVICE & CACHE LAYER",
        detail: "Round-Robin Assignment · SLA Escalation · CacheService",
      },
      {
        step: "04",
        label: "14 GOOGLE SHEETS",
        detail: "Normalized Tickets · Orders · Customers · Agents · Logs",
      },
    ],
    gallery: [
      {
        type: "schematic",
        alt: "Illustrative workflow of SupportDesk ticket lifecycle and LLaMA 3.3 copilot",
        caption: "Illustrative diagram — ticket create → round-robin route → copilot draft → resolution.",
        isIllustration: true,
      },
    ],
    closingLine: "Structured ticket and order operations over a normalized 14-sheet model.",
    nextProjectSlug: "ntro-ai-cyber-forecast",
  },
  {
    slug: "ntro-ai-cyber-forecast",
    index: "07",
    name: "NTRO AI CYBER FORECAST",
    subtitle: "AI-BASED NETWORK ATTACK FORECASTING & DECISION SUPPORT",
    shortDescription:
      "AI-powered cyber threat intelligence, MITRE ATT&CK kill-chain forecasting, and SOC simulation lab.",
    summary:
      "An AI-based network attack forecasting and decision-support platform built for Smart India Hackathon (SIH26153), transitioning SOC analysts from reactive incident response to proactive threat hunting.",
    category: "CYBER THREAT INTELLIGENCE",
    role: "Personal project",
    shortStack: ["REACT 18", "TYPESCRIPT", "TAILWIND", "RECHARTS"],
    stack: [
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "Recharts",
      "Lucide React",
      "Vite",
    ],
    repositoryUrl: "https://github.com/Rashmi-Pathak/NTRO_AI_CYBER_FORCAST",
    liveUrl: "https://ntro-ai-cyber-forcast.vercel.app/",
    coverVariant: "black",
    motif: "fraud",
    theme: {
      bg: "#020813",
      surface: "#071426",
      text: "#e2f1ff",
      muted: "#7fa4c9",
      accent: "#00a3ff",
      accentSecondary: "#ff3b30",
      border: "rgba(0, 163, 255, 0.3)",
    },
    heroMedia: {
      type: "schematic",
      alt: "Illustrative SOC attack forecast and MITRE ATT&CK kill-chain architecture",
      caption: "Illustrative schematic — live threat monitor, MITRE ATT&CK forecast, and attack-path kill chain.",
      isIllustration: true,
    },
    overview: {
      whatItIs:
        "A high-density SOC decision-support interface for predicting next-stage network attacks (such as lateral movement and data exfiltration) using the MITRE ATT&CK framework.",
      whoItIsFor:
        "Security Operations Center (SOC) analysts monitoring critical infrastructure across Government, Finance, and Power & Energy sectors.",
      whatMakesItDifferent:
        "Pairs live threat monitoring with AI attack forecasting, kill-chain blast-radius mapping, model drift monitoring, and a synthetic attack simulation lab.",
    },
    problemHeading: "Predict before lateral movement",
    problem:
      "Traditional SOC dashboards focus on reactive alerts after an intrusion has already progressed, leaving analysts little visibility into the attacker's probable next step or blast radius.",
    approach:
      "NTRO AI Cyber Forecast organizes threat telemetry into dedicated modules — Live Threat Monitor, Attack Forecast (MITRE ATT&CK), Attack Path / Kill Chain, Asset & Sector Intelligence, Incident Management, Model Intelligence, and a Simulation Lab.",
    sections: [
      {
        num: "01",
        title: "LIVE THREAT MONITOR & FORECAST",
        tag: "MITRE ATT&CK",
        summary:
          "Tracks incoming threat events and forecasts probable next attacker stages before lateral movement or exfiltration.",
      },
      {
        num: "02",
        title: "KILL CHAIN & BLAST RADIUS",
        tag: "ATTACK PATH",
        summary:
          "Maps the attack lifecycle from initial compromise to predicted targets, including blast-radius analysis.",
      },
      {
        num: "03",
        title: "ASSET & SECTOR INTELLIGENCE",
        tag: "CRITICAL INFRASTRUCTURE",
        summary:
          "Inventories critical assets against vulnerabilities and provides sector views for Government, Finance, and Power & Energy.",
      },
      {
        num: "04",
        title: "MODEL INTELLIGENCE & SIMULATION LAB",
        tag: "SOC RESILIENCE",
        summary:
          "Monitors underlying model health and drift alongside a synthetic simulation lab for ransomware and DDoS exercises.",
      },
    ],
    architectureTitle: "Threat Telemetry → Kill-Chain Forecast → SOC Action",
    architectureNodes: [
      {
        step: "01",
        label: "LIVE MONITOR",
        detail: "Dynamic Threat Event Feed & Risk Distribution",
      },
      {
        step: "02",
        label: "ATTACK FORECAST",
        detail: "MITRE ATT&CK Next-Stage Prediction",
      },
      {
        step: "03",
        label: "KILL CHAIN & ASSETS",
        detail: "Attack Path · Blast Radius · Sector Intelligence",
      },
      {
        step: "04",
        label: "INCIDENT & SIM LAB",
        detail: "Containment Workflows · Model Drift · Synthetic Drills",
      },
    ],
    gallery: [
      {
        type: "schematic",
        alt: "Illustrative SOC module map for NTRO AI Cyber Forecast",
        caption: "Illustrative diagram — 8 SOC modules designed for high-contrast #020813 shift environments.",
        isIllustration: true,
      },
    ],
    closingLine: "Proactive cyber threat forecasting built for high-density SOC workflows.",
    nextProjectSlug: "bluestock-mf-capstone",
  },
  {
    slug: "bluestock-mf-capstone",
    index: "08",
    name: "BLUESTOCK MF CAPSTONE",
    subtitle: "END-TO-END MUTUAL FUND ANALYTICS & STAR SCHEMA",
    shortDescription:
      "Mutual fund analytics platform with Python ETL pipeline, SQLite star schema, and risk analytics.",
    summary:
      "An end-to-end data engineering, analytics, and visualization capstone processing mutual fund NAVs, AUMs, SIPs, and investor transactions into a SQLite Star Schema Data Warehouse and a 5-page Power BI dashboard.",
    category: "DATA ENGINEERING & ANALYTICS",
    role: "Personal project",
    shortStack: ["PYTHON", "SQLITE STAR SCHEMA", "PLOTLY", "POWER BI"],
    stack: [
      "Python 3.8+",
      "Pandas",
      "NumPy",
      "SQLite 3",
      "SQLAlchemy",
      "Matplotlib",
      "Seaborn",
      "Plotly",
      "SciPy",
      "Streamlit",
      "Power BI",
    ],
    repositoryUrl: "https://github.com/Rashmi-Pathak/bluestock_mf_capstone",
    coverVariant: "ivory",
    motif: "forecast",
    theme: {
      bg: "#0e1318",
      surface: "#16202a",
      text: "#f1f5f9",
      muted: "#94a3b8",
      accent: "#eab308",
      accentSecondary: "#38bdf8",
      border: "rgba(234, 179, 8, 0.3)",
    },
    heroMedia: {
      type: "schematic",
      alt: "Illustrative ETL pipeline and Star Schema data warehouse diagram",
      caption: "Illustrative schematic — Python ETL orchestrator, SQLite Star Schema, risk metrics, and Power BI output.",
      isIllustration: true,
    },
    overview: {
      whatItIs:
        "A modular Python data-engineering and financial-analytics capstone transforming raw mutual fund CSVs into a Star Schema warehouse and executive dashboards.",
      whoItIsFor:
        "Data analysts and portfolio researchers evaluating mutual fund performance, concentration, and downside risk.",
      whatMakesItDifferent:
        "Orchestrates data validation, ETL, risk metrics (VaR, CVaR, Rolling Sharpe, Sector HHI), dashboard CSV exports, and automated presentation generation from a single `run_pipeline.py` entrypoint.",
    },
    problemHeading: "From raw NAVs to structured risk intelligence",
    problem:
      "Raw mutual fund NAVs, AUM snapshots, SIP flows, and transaction logs arrive in fragmented CSVs without consistent validation, dimensional modeling, or risk-adjusted metrics.",
    approach:
      "The pipeline validates raw datasets, builds a Star Schema in SQLite (`data/db/bluestock_mf.db`), computes VaR, CVaR, Rolling Sharpe, and Sector HHI in Python, and exports clean datasets for a 5-page Power BI dashboard and automated reports.",
    sections: [
      {
        num: "01",
        title: "ORCHESTRATED PYTHON ETL",
        tag: "RUN_PIPELINE.PY",
        summary:
          "Single-command orchestrator executing data validation, transformation, metrics generation, and dataset export in sequence.",
      },
      {
        num: "02",
        title: "SQLITE STAR SCHEMA WAREHOUSE",
        tag: "DATA MODELING",
        summary:
          "Structures NAVs, AUMs, SIPs, and investor transactions into dimensional tables inside SQLite.",
      },
      {
        num: "03",
        title: "QUANTITATIVE RISK ANALYTICS",
        tag: "VAR · CVAR · SHARPE",
        summary:
          "Computes Value at Risk (VaR), Conditional VaR (CVaR), Rolling Sharpe ratios, and Sector Herfindahl-Hirschman Index (HHI).",
      },
      {
        num: "04",
        title: "POWER BI & REPORT EXPORTS",
        tag: "5-PAGE DASHBOARD",
        summary:
          "Feeds processed CSVs into `bluestock_mf.pbix` alongside Jupyter EDA notebooks, Markdown reports, and generated PPTX decks.",
      },
    ],
    architectureTitle: "CSV Ingest → SQLite Star Schema → Risk Metrics → BI",
    architectureNodes: [
      {
        step: "01",
        label: "RAW INGEST & VALIDATION",
        detail: "NAVs · AUMs · SIPs · Investor Transactions (Pandas)",
      },
      {
        step: "02",
        label: "STAR SCHEMA DB",
        detail: "SQLite 3 Warehouse (bluestock_mf.db)",
      },
      {
        step: "03",
        label: "RISK ENGINE",
        detail: "VaR · CVaR · Rolling Sharpe · Sector HHI (SciPy / NumPy)",
      },
      {
        step: "04",
        label: "BI & REPORTING",
        detail: "5-Page Power BI (.pbix) · Notebooks · Final Report",
      },
    ],
    gallery: [
      {
        type: "schematic",
        alt: "Illustrative pipeline structure of Bluestock MF Capstone",
        caption: "Illustrative diagram — end-to-end ETL and Power BI export workflow.",
        isIllustration: true,
      },
    ],
    closingLine: "End-to-end mutual fund ETL, Star Schema modeling, and risk analytics.",
    nextProjectSlug: "neuramesh-ai",
  },
  {
    slug: "neuramesh-ai",
    index: "09",
    name: "NEURAMESH AI",
    subtitle: "MULTI-AGENT AI RESEARCH STUDIO",
    shortDescription:
      "6-agent parallel research swarm powered by Groq API with browser-native .txt/.csv RAG.",
    summary:
      "A multi-agent AI research platform where six specialized agents analyze complex queries in parallel, cross-check bias and facts, synthesize structured recommendations, and answer questions over uploaded documents.",
    category: "MULTI-AGENT AI & RAG",
    role: "Personal project",
    shortStack: ["REACT 18", "TYPESCRIPT", "GROQ API", "SHADCN/UI"],
    stack: [
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Vite",
      "Groq API (groq/compound-mini)",
      "Supabase",
    ],
    repositoryUrl: "https://github.com/Rashmi-Pathak/NeuraMesh-AI",
    coverVariant: "crimson",
    motif: "provenance",
    theme: {
      bg: "#0e0b16",
      surface: "#171226",
      text: "#f5f3ff",
      muted: "#a78bfa",
      accent: "#f55036",
      accentSecondary: "#38bdf8",
      border: "rgba(245, 80, 54, 0.3)",
    },
    heroMedia: {
      type: "schematic",
      alt: "Illustrative 6-agent parallel research swarm diagram for NeuraMesh AI",
      caption: "Illustrative schematic — 3-phase multi-agent swarm (Research/Pro/Con → Bias/Fact → Synthesizer).",
      isIllustration: true,
    },
    overview: {
      whatItIs:
        "A multi-agent research studio powered by Groq's `groq/compound-mini` model that replaces single-prompt AI answers with a 6-agent analytical swarm.",
      whoItIsFor:
        "Researchers, analysts, and builders who want balanced pros/cons, bias checking, and document-grounded Q&A in one workspace.",
      whatMakesItDifferent:
        "Runs three parallel analysis agents, two quality-assurance agents (Bias Checker & Fact Checker), and a Synthesizer, alongside an in-browser `.txt`/`.csv` RAG Knowledge Base.",
    },
    problemHeading: "Beyond single-prompt confirmation bias",
    problem:
      "Single-prompt AI chats often reflect confirmation bias, skip counterarguments, and mix verified facts with unexamined claims.",
    approach:
      "NeuraMesh AI routes each query through a three-phase swarm — Phase 1 parallel Research, Pro Advocate, and Con Advocate agents; Phase 2 Bias Checker and Fact Checker; Phase 3 Synthesizer — with conversational memory and dynamic follow-up generation.",
    sections: [
      {
        num: "01",
        title: "PHASE 1: PARALLEL ANALYSIS",
        tag: "RESEARCH · PRO · CON",
        summary:
          "Research Agent gathers facts and trends while Pro and Con Advocates argue opposing sides simultaneously.",
      },
      {
        num: "02",
        title: "PHASE 2: QUALITY ASSURANCE",
        tag: "BIAS & FACT CHECKERS",
        summary:
          "Bias Checker flags logical fallacies and cognitive biases while Fact Checker audits claims for misinformation.",
      },
      {
        num: "03",
        title: "PHASE 3: STRUCTURED SYNTHESIS",
        tag: "SYNTHESIZER",
        summary:
          "Distills multi-agent outputs into scannable bulleted recommendations and generates relevant follow-up prompts.",
      },
      {
        num: "04",
        title: "RAG KNOWLEDGE BASE & HUBS",
        tag: ".TXT / .CSV Q&A",
        summary:
          "Upload `.txt` and `.csv` files directly in the browser for Document Q&A alongside Dashboard, Agent Network, and History/Favorites hubs.",
      },
    ],
    architectureTitle: "Query → 6-Agent Swarm → Synthesis & Follow-Ups",
    architectureNodes: [
      {
        step: "01",
        label: "PHASE 1 (PARALLEL)",
        detail: "Research Agent · Pro Advocate · Con Advocate",
      },
      {
        step: "02",
        label: "PHASE 2 (QA)",
        detail: "Bias Checker · Fact Checker",
      },
      {
        step: "03",
        label: "PHASE 3 (SYNTHESIS)",
        detail: "Synthesizer → Structured Recommendation",
      },
      {
        step: "04",
        label: "KNOWLEDGE & MEMORY",
        detail: "Browser .txt/.csv RAG · Conversational History · Favorites",
      },
    ],
    gallery: [
      {
        type: "schematic",
        alt: "Illustrative multi-agent pipeline of NeuraMesh AI",
        caption: "Illustrative diagram — 3-phase swarm lifecycle and browser RAG knowledge base.",
        isIllustration: true,
      },
    ],
    closingLine: "Six specialized AI agents working in parallel for balanced research synthesis.",
    nextProjectSlug: "edusphere",
  },
  {
    slug: "edusphere",
    index: "10",
    name: "EDUSPHERE",
    subtitle: "SCHOOL MANAGEMENT & AI-ASSISTED ASSESSMENT SYSTEM",
    shortDescription:
      "Multi-role school platform with online exams, attendance, and Gemini-assisted grading.",
    summary:
      "A centralized school management and assessment platform connecting administrators, teachers, students, and parents with role-based portals, online exams, attendance tracking, and AI-assisted evaluation.",
    category: "EDTECH & FULL-STACK",
    role: "Personal project",
    shortStack: ["NEXT.JS", "PRISMA", "POSTGRESQL", "GEMINI API"],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Next.js Server Actions",
      "PostgreSQL",
      "Prisma ORM",
      "Clerk",
      "Google Gemini API",
      "Cloudinary",
      "Recharts",
      "next-intl",
    ],
    repositoryUrl: "https://github.com/Rashmi-Pathak/EduSphere",
    coverVariant: "ivory",
    motif: "kanban",
    theme: {
      bg: "#0c141d",
      surface: "#14202e",
      text: "#f8fafc",
      muted: "#94a3b8",
      accent: "#38bdf8",
      accentSecondary: "#34d399",
      border: "rgba(56, 189, 248, 0.28)",
    },
    heroMedia: {
      type: "schematic",
      alt: "Illustrative 4-role portal and assessment workflow for EduSphere",
      caption: "Illustrative schematic — Admin, Teacher, Student, and Parent portals over Prisma + PostgreSQL.",
      isIllustration: true,
    },
    overview: {
      whatItIs:
        "A multi-tenant school management and online assessment system supporting four distinct roles and AI-assisted grading.",
      whoItIsFor:
        "School administrators, teachers, students, and parents coordinating classes, schedules, attendance, and exams.",
      whatMakesItDifferent:
        "Unifies Clerk authentication, Next.js Server Actions, Prisma + PostgreSQL, multi-format online exams, and Google Gemini grading suggestions while keeping teachers in control of final marks.",
    },
    problemHeading: "One academic operating system for four roles",
    problem:
      "Schools frequently juggle separate tools for attendance, timetables, assignments, online exams, and parent communication, fragmenting student progress records.",
    approach:
      "EduSphere builds dedicated Admin, Teacher, Student, and Parent portals on Next.js Server Actions, Clerk auth, and Prisma/PostgreSQL, with React Big Calendar scheduling, Cloudinary file submissions, and Gemini-assisted written-response feedback.",
    sections: [
      {
        num: "01",
        title: "FOUR ROLE-BASED PORTALS",
        tag: "CLERK + RBAC",
        summary:
          "Dedicated workflows for Administrators (school analytics & structure), Teachers, Students, and Parents.",
      },
      {
        num: "02",
        title: "MULTI-FORMAT ASSESSMENT ENGINE",
        tag: "EXAMS & ASSIGNMENTS",
        summary:
          "Supports Multiple Choice, True/False, Text Answer, and File Upload questions with automatic grading and manual review.",
      },
      {
        num: "03",
        title: "AI-ASSISTED EVALUATION",
        tag: "GOOGLE GEMINI",
        summary:
          "Generates grading suggestions and feedback for written responses while teachers retain final evaluation authority.",
      },
      {
        num: "04",
        title: "SCHEDULES, ATTENDANCE & I18N",
        tag: "FULL OPERATIONS",
        summary:
          "Integrates React Big Calendar, Recharts analytics, Nodemailer announcements, Cloudinary uploads, and `next-intl`.",
      },
    ],
    architectureTitle: "4 Role Portals → Next.js Server Actions → Prisma + PostgreSQL",
    architectureNodes: [
      {
        step: "01",
        label: "CLERK AUTH & ROLES",
        detail: "Admin · Teacher · Student · Parent",
      },
      {
        step: "02",
        label: "SERVER ACTIONS",
        detail: "Classes · Attendance · Exams · Submissions (Zod)",
      },
      {
        step: "03",
        label: "PRISMA + POSTGRES",
        detail: "Relational Academic & Assessment Schema",
      },
      {
        step: "04",
        label: "AI & MEDIA SERVICES",
        detail: "Google Gemini Grading · Cloudinary · Nodemailer",
      },
    ],
    gallery: [
      {
        type: "schematic",
        alt: "Illustrative system diagram of EduSphere assessment and role architecture",
        caption: "Illustrative diagram — multi-role academic portal and assessment workflow.",
        isIllustration: true,
      },
    ],
    closingLine: "Centralized school operations, online exams, and AI-assisted teacher evaluation.",
    nextProjectSlug: "keyboard-breaker",
  },
  {
    slug: "keyboard-breaker",
    index: "11",
    name: "KEYBOARD BREAKER",
    subtitle: "NEON ARCADE & 13 BROWSER MINI-GAMES",
    shortDescription:
      "Neon synthwave web arcade with 13 playable games, 3D carousel, and 60fps requestAnimationFrame loops.",
    summary:
      "A neon-lit browser arcade featuring 13 playable mini-games across Action, Reflex, Brain, and Classic categories, with 60fps custom physics loops and zero sign-ups.",
    category: "ARCADE & INTERACTIVE WEB",
    role: "Personal project",
    shortStack: ["REACT 18", "VITE", "TAILWIND CSS", "60FPS LOOPS"],
    stack: [
      "React 18",
      "Vite 5",
      "Tailwind CSS 3",
      "React Router DOM",
      "Lucide React",
      "requestAnimationFrame",
    ],
    repositoryUrl: "https://github.com/Rashmi-Pathak/Keyboard_Breaker",
    liveUrl: "https://keyboardbreaker.vercel.app/",
    coverVariant: "black",
    motif: "author",
    theme: {
      bg: "#090714",
      surface: "#120e24",
      text: "#f8fafc",
      muted: "#a5b4fc",
      accent: "#22d3ee",
      accentSecondary: "#f43f5e",
      border: "rgba(34, 211, 238, 0.3)",
    },
    heroMedia: {
      type: "image",
      src: "/assets/work_zip1/Keyboard_Breaker/01-keyboard-breaker-hero.png",
      alt: "Keyboard Breaker neon arcade landing hero",
      caption: "Keyboard Breaker — 13 Games, neon arcade hero interface.",
    },
    overview: {
      whatItIs:
        "An instant-play React web arcade housing 13 keyboard and reflex mini-games inside a neon synthwave UI.",
      whoItIsFor:
        "Players looking for fast, zero-friction browser games spanning shooters, racers, typing drills, and logic puzzles.",
      whatMakesItDifferent:
        "Uses custom React hooks with `requestAnimationFrame` for 60fps gameplay without heavy canvas boilerplate, plus a 3D rotating discovery carousel.",
    },
    problemHeading: "Built for instant arcade play",
    problem:
      "Browser mini-game collections often feel like disconnected links without a shared progression loop, streak tracking, or cohesive arcade identity.",
    approach:
      "Keyboard Breaker wraps 13 games (Space Defender, Neon Racer, Typing Invaders, Mini Pac, Flappy Cyber, Stack Attack, Reaction Test, Word Scramble, Number Blitz, Memory Matrix, Speed Sudoku, Pocket Pool, and Minimax Tic-Tac-Toe) inside a unified neon shell.",
    sections: [
      {
        num: "01",
        title: "ARCADE DISCOVERY CAROUSEL",
        tag: "13 GAMES · 4 GENRES",
        summary:
          "3D rotating carousel spanning Action, Reflex, Brain, and Classic titles with instant launch.",
      },
      {
        num: "02",
        title: "60FPS CUSTOM GAME LOOPS",
        tag: "REQUESTANIMATIONFRAME",
        summary:
          "Custom React hook physics loops driving collision, timing, and responsive keyboard controls.",
      },
      {
        num: "03",
        title: "LIVE STATS & POWER-UPS HUD",
        tag: "STREAKS & MILESTONES",
        summary:
          "Tracks best score, games played, highest streak, distance milestones, and active Shield / Slow Time / Boost power-ups.",
      },
    ],
    architectureTitle: "Arcade Carousel → Game Modules → Live Stats HUD",
    architectureNodes: [
      {
        step: "01",
        label: "3D CAROUSEL",
        detail: "Action · Reflex · Brain · Classic Discovery",
      },
      {
        step: "02",
        label: "13 GAME MODULES",
        detail: "Space Defender · Neon Racer · Word Scramble · Minimax AI",
      },
      {
        step: "03",
        label: "60FPS HOOK LOOP",
        detail: "requestAnimationFrame Physics & Keyboard Input",
      },
      {
        step: "04",
        label: "ARCADE HUD",
        detail: "Best Score · Streak Record · Power-Up Timers",
      },
    ],
    gallery: [
      {
        type: "image",
        src: "/assets/work_zip1/Keyboard_Breaker/02-keyboard-breaker-arcade.png",
        alt: "Keyboard Breaker arcade game discovery carousel",
        caption: "The Arcade — interactive carousel showcasing Word Scramble, Neon Racer, and Mini Pac.",
      },
      {
        type: "image",
        src: "/assets/work_zip1/Keyboard_Breaker/03-keyboard-breaker-gameplay.png",
        alt: "Keyboard Breaker gameplay screen with stats and power-up panels",
        caption: "Gameplay & Stats — live score, streak record, controls, and power-ups.",
      },
    ],
    closingLine: "13 keyboard-driven arcade games inside one neon synthwave shell.",
    nextProjectSlug: "buddy-ai",
  },
  {
    slug: "buddy-ai",
    index: "12",
    name: "BUDDY AI",
    subtitle: "BUDDY AI — CODING & LEARNING COMPANION",
    shortDescription:
      "Visual coding & learning companion with Monaco Editor, Judge0 execution, ChromaDB, and diagramming.",
    summary:
      "An AI-powered visual learning and coding companion uniting personalized roadmaps, hint-first contextual chat, interactive visual lessons, Monaco Editor practice, and Judge0 code execution.",
    category: "AI LEARNING & CODE WORKSPACE",
    role: "Personal project",
    shortStack: ["NEXT.JS 15", "EXPRESS 5", "PRISMA", "CHROMADB", "JUDGE0"],
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Monaco Editor",
      "Mermaid / D3 / React Flow",
      "Three.js / tldraw",
      "Express 5",
      "Prisma 6 + SQLite",
      "ChromaDB",
      "Judge0",
      "Gemini / Groq / Deepgram",
    ],
    repositoryUrl:
      "https://github.com/Rashmi-Pathak/BUDDY-AI-Coding-Learning-Companion",
    coverVariant: "ivory",
    motif: "kanban",
    theme: {
      bg: "#0b111e",
      surface: "#121b2e",
      text: "#f8fafc",
      muted: "#94a3b8",
      accent: "#60a5fa",
      accentSecondary: "#34d399",
      border: "rgba(96, 165, 250, 0.3)",
    },
    heroMedia: {
      type: "schematic",
      alt: "Illustrative architecture of Buddy AI Next.js client, Express API, ChromaDB, and Judge0",
      caption: "Illustrative schematic — Next.js visual learning UI, Express API, Gemini/Groq/Deepgram, Prisma, ChromaDB, and Judge0.",
      isIllustration: true,
    },
    overview: {
      whatItIs:
        "A continuous coding-learning workspace built for Aether HackConquest 2026 connecting roadmaps, visual explanations, practice problems, and live code execution.",
      whoItIsFor:
        "Learners who want hint-first guidance and visual mental models rather than static tutorials or instant copy-paste answers.",
      whatMakesItDifferent:
        "Brings Mermaid, D3, Dagre, React Flow, Three.js, tldraw whiteboarding, Monaco Editor, Judge0 execution, ChromaDB vector memory, and Deepgram/Groq voice support into one loop.",
    },
    problemHeading: "Don't just watch. Learn live.",
    problem:
      "Static tutorials break the moment a learner has a question, while generic AI chat solves exercises outright without building visual understanding or tracking progress across sessions.",
    approach:
      "Buddy implements a unified loop — Understand → ask → visualize → code → practice → debug → build — with onboarding roadmaps, hint-first contextual chat, visual lesson generation, Monaco + Judge0 practice, and persistent ChromaDB + Prisma learner memory.",
    sections: [
      {
        num: "01",
        title: "PERSONALIZED ROADMAPS",
        tag: "LEARNER MEMORY",
        summary:
          "Onboarding captures goals, skill level, and languages to generate structured topics, modules, lessons, and practice.",
      },
      {
        num: "02",
        title: "HINT-FIRST AI COMPANION",
        tag: "GEMINI · GROQ",
        summary:
          "Contextual chat sits beside the current lesson or problem, guiding with questions and hints before revealing solutions.",
      },
      {
        num: "03",
        title: "LEARN BY SEEING",
        tag: "MERMAID · D3 · REACT FLOW",
        summary:
          "Renders algorithms and concepts as diagrams, flowcharts, 3D views, KaTeX math, and an interactive tldraw whiteboard.",
      },
      {
        num: "04",
        title: "PRACTICE, VOICE & EXECUTION",
        tag: "MONACO · JUDGE0 · CHROMADB",
        summary:
          "Runs code via Judge0 inside Monaco Editor, stores AI context in ChromaDB, and supports voice interaction via Deepgram.",
      },
    ],
    architectureTitle: "Next.js Client → Express 5 API → AI / Prisma / ChromaDB / Judge0",
    architectureNodes: [
      {
        step: "01",
        label: "NEXT.JS 15 CLIENT",
        detail: "Courses · Practice · Monaco Playground · tldraw Whiteboard",
      },
      {
        step: "02",
        label: "EXPRESS 5 API",
        detail: "JWT Auth · Roadmaps · Chat · Visual Lessons · Voice Routes",
      },
      {
        step: "03",
        label: "AI & VOICE SERVICES",
        detail: "Google Gemini · Groq · Deepgram TTS/STT",
      },
      {
        step: "04",
        label: "DATA & EXECUTION",
        detail: "Prisma 6 (SQLite) · ChromaDB Vector Memory · Judge0",
      },
    ],
    gallery: [
      {
        type: "schematic",
        alt: "Illustrative learning loop and service architecture of Buddy AI",
        caption: "Illustrative diagram — Understand → ask → visualize → code → practice → debug → build.",
        isIllustration: true,
      },
    ],
    closingLine: "Context-aware visual coding and hint-first mentorship in one workspace.",
    nextProjectSlug: "veda",
  },
  {
    slug: "veda",
    index: "13",
    name: "VEDA",
    subtitle: "ANCIENT WISDOM, IN CONVERSATION",
    shortDescription:
      "Research-oriented Ayurveda knowledge platform with PostgreSQL pgvector RAG and Gemini AI.",
    summary:
      "A research-oriented Ayurveda knowledge platform powered by Retrieval Augmented Generation (RAG) over PostgreSQL + pgvector, botanical data ingestion, and context-aware Gemini AI modes.",
    category: "AI KNOWLEDGE & RAG",
    role: "Personal project",
    shortStack: ["NEXT.JS", "PGVECTOR", "GEMINI API", "PYTHON"],
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL 15+ (pgvector)",
      "Google Gemini API",
      "RAG Pipeline",
      "Python Ingestion Scripts",
      "GBIF Plant Data",
      "Cormorant Garamond / Inter",
    ],
    repositoryUrl: "https://github.com/Rashmi-Pathak/Veda",
    liveUrl: "https://veda-drab.vercel.app/",
    coverVariant: "ivory",
    motif: "provenance",
    theme: {
      bg: "#0e2b24",
      surface: "#173c32",
      text: "#f5f0e5",
      muted: "#c8d5be",
      accent: "#c99a4a",
      accentSecondary: "#b97a5a",
      border: "rgba(201, 154, 74, 0.32)",
    },
    heroMedia: {
      type: "schematic",
      alt: "Illustrative RAG knowledge architecture for Veda Ayurveda platform",
      caption: "Illustrative schematic — GBIF & classical text ingestion, PostgreSQL pgvector RAG, and context-aware AI modes.",
      isIllustration: true,
    },
    overview: {
      whatItIs:
        "A botanical and classical-text Ayurveda research platform combining curated herb/concept pages with a pgvector RAG conversation engine.",
      whoItIsFor:
        "Researchers, students, and learners exploring medicinal plants, Sanskrit terminology, classical texts, and traditional practices with clear source citations.",
      whatMakesItDifferent:
        "Distinguishes between traditional knowledge and modern evidence while offering five dedicated AI modes (General, Context, Source, Learning, Research).",
    },
    problemHeading: "Cited classical knowledge without hallucinated blends",
    problem:
      "General-purpose chatbots frequently conflate traditional Ayurvedic formulations with modern clinical claims without citing classical passages or botanical taxonomy.",
    approach:
      "Veda ingests GBIF plant records and structured Ayurvedic texts into PostgreSQL with pgvector, retrieves relevant passages per query, and adapts its Gemini AI prompt across page contexts (Herbs, Concepts, Texts).",
    sections: [
      {
        num: "01",
        title: "CONTEXT-AWARE AI MODES",
        tag: "5 MODES",
        summary:
          "Supports General, Context, Source (cited classical passages), Learning, and Research synthesis modes.",
      },
      {
        num: "02",
        title: "PGVECTOR RAG PIPELINE",
        tag: "RETRIEVAL + CITATION",
        summary:
          "Retrieves relevant passages from PostgreSQL + pgvector and explicitly separates traditional knowledge from modern evidence.",
      },
      {
        num: "03",
        title: "BOTANICAL & TEXT EXPLORER",
        tag: "HERBS · SANSKRIT · TIMELINE",
        summary:
          "Dedicated Next.js App Router views for Herbs, Concepts, Classical Texts, Practices, Sanskrit terminology, and History.",
      },
      {
        num: "04",
        title: "PYTHON & GBIF DATA PIPELINE",
        tag: "INGEST & VALIDATE",
        summary:
          "Modular Python ingestion, processing, validation, and GBIF botanical data scripts.",
      },
    ],
    architectureTitle: "GBIF & Text Ingestion → pgvector RAG → Context-Aware UI",
    architectureNodes: [
      {
        step: "01",
        label: "PYTHON INGESTION",
        detail: "GBIF Plant Data · Processing · Validation Scripts",
      },
      {
        step: "02",
        label: "POSTGRES + PGVECTOR",
        detail: "Plants · Multilingual Names · Classical Passages",
      },
      {
        step: "03",
        label: "GEMINI RAG ENGINE",
        detail: "Passage Retrieval · 5 AI Modes · Source Citations",
      },
      {
        step: "04",
        label: "NEXT.JS EXPLORER",
        detail: "Herbs · Concepts · Texts · Sanskrit · Universal Search",
      },
    ],
    gallery: [
      {
        type: "schematic",
        alt: "Illustrative diagram of Veda RAG pipeline and botanical schema",
        caption: "Illustrative diagram — Forest Green & Warm Ivory knowledge explorer with pgvector RAG.",
        isIllustration: true,
      },
    ],
    closingLine: "Source-cited botanical and classical Ayurveda research powered by pgvector RAG.",
    nextProjectSlug: "attendlink",
  },
  {
    slug: "attendlink",
    index: "14",
    name: "ATTENDLINK",
    subtitle: "SMART WIRELESS & LOCATION-AWARE ATTENDANCE SYSTEM",
    shortDescription:
      "Geofenced lecture attendance using W3C Geolocation, Haversine validation, Prisma, and PDF/CSV export.",
    summary:
      "A smart digital attendance verification platform combining Next.js App Router with browser geolocation and server-side Haversine geofencing to eliminate proxy attendance in lecture halls.",
    category: "GEOFENCING & EDTECH",
    role: "Personal project",
    shortStack: ["NEXT.JS 16", "PRISMA", "POSTGRESQL", "GEOLIB"],
    stack: [
      "Next.js 16 (App Router)",
      "React 19",
      "Tailwind CSS v4",
      "Prisma ORM",
      "PostgreSQL",
      "Geolib (Haversine Formula)",
      "jsPDF + jsPDF-AutoTable",
      "csv-writer",
    ],
    repositoryUrl: "https://github.com/Rashmi-Pathak/AttendLink",
    liveUrl: "https://attendlink.vercel.app/",
    coverVariant: "black",
    motif: "kanban",
    theme: {
      bg: "#090d16",
      surface: "#111827",
      text: "#f8fafc",
      muted: "#94a3b8",
      accent: "#38bdf8",
      accentSecondary: "#22c55e",
      border: "rgba(56, 189, 248, 0.3)",
    },
    heroMedia: {
      type: "schematic",
      alt: "Illustrative Haversine geofence validation flow for AttendLink",
      caption: "Illustrative schematic — Instructor anchor, W3C Geolocation capture, Haversine validation, and PostgreSQL commit.",
      isIllustration: true,
    },
    overview: {
      whatItIs:
        "A location-aware classroom attendance system verifying physical student presence within a configurable lecture-hall geofence.",
      whoItIsFor:
        "University professors and students replacing slow manual roll calls and proxy-prone static forms.",
      whatMakesItDifferent:
        "Computes geodesic distance server-side with Geolib's Haversine formula, enforces a unique `(sessionId, rollNumber)` constraint in PostgreSQL, and exports formatted PDF and UTF-8 BOM CSV reports.",
    },
    problemHeading: "Prove physical presence without roll-call overhead",
    problem:
      "Manual roll calls waste 10–20% of lecture time in large classes, while static online attendance links are easily shared with absent peers outside the classroom.",
    approach:
      "An instructor anchors a timed session with coordinates and a 30–100m radius; student devices submit high-accuracy W3C Geolocation coordinates, and the Next.js server validates geodesic distance via Haversine before committing to PostgreSQL.",
    sections: [
      {
        num: "01",
        title: "DYNAMIC GEOFENCE RADIUS",
        tag: "HAVERSINE FORMULA",
        summary:
          "Instructors configure 30m, 50m, or 100m boundaries; server-side Geolib checks reject coordinates outside the perimeter with HTTP 400.",
      },
      {
        num: "02",
        title: "ANTI-PROXY PROTECTION",
        tag: "UNIQUE CONSTRAINTS",
        summary:
          "Combines timed session lifespans, manual session closure, basic device fingerprinting, and a Prisma `@@unique([sessionId, rollNumber])` constraint.",
      },
      {
        num: "03",
        title: "LIVE INSTRUCTOR CONSOLE",
        tag: "REAL-TIME POLLING",
        summary:
          "Tracks incoming verified check-ins in real time across `/professor` and `/student/[sessionId]` routes.",
      },
      {
        num: "04",
        title: "ONE-CLICK PDF & CSV EXPORTS",
        tag: "JSPDF & CSV-WRITER",
        summary:
          "Generates formatted PDF attendance reports and Excel-compatible UTF-8 BOM CSV spreadsheets.",
      },
    ],
    architectureTitle: "Device GPS → Haversine Geofence Check → PostgreSQL → Export",
    architectureNodes: [
      {
        step: "01",
        label: "SESSION ANCHOR",
        detail: "Instructor Lat/Lng · Configurable Radius (30–100m) · Timer",
      },
      {
        step: "02",
        label: "W3C GEOLOCATION",
        detail: "Student Device High-Accuracy Coordinates + Fingerprint",
      },
      {
        step: "03",
        label: "HAVERSINE CHECK",
        detail: "Server-Side Geolib Validation → HTTP 400 or Commit",
      },
      {
        step: "04",
        label: "PRISMA & EXPORTS",
        detail: "PostgreSQL Unique Record · jsPDF & CSV Report",
      },
    ],
    gallery: [
      {
        type: "schematic",
        alt: "Illustrative geofencing and database schema diagram for AttendLink",
        caption: "Illustrative diagram — Session & AttendanceRecord Prisma schema with Haversine validation.",
        isIllustration: true,
      },
    ],
    closingLine: "Geodesic server-side attendance verification with instant PDF/CSV reporting.",
    nextProjectSlug: "obsidian",
  },
  {
    slug: "obsidian",
    index: "15",
    name: "OBSIDIAN",
    subtitle: "THE LIVING MAP OF TECHNOLOGY INTELLIGENCE",
    shortDescription:
      "15 technology clusters, 16 live APIs (CISA KEV, NVD, arXiv, GitHub), and Groq 120B + Deepgram voice AI.",
    summary:
      "A real-time technology intelligence observatory ingesting, deduplicating, and scoring live signals across 15 technology clusters from 16 external APIs — paired with a Groq LLM + Deepgram voice analyst.",
    category: "TECHNOLOGY INTELLIGENCE",
    role: "Personal project",
    shortStack: ["NEXT.JS 15", "TYPESCRIPT 5.8", "GSAP + LENIS", "16 LIVE APIS"],
    stack: [
      "Next.js 15",
      "TypeScript 5.8",
      "Tailwind CSS",
      "GSAP 3 + Lenis",
      "Groq LLM (120B)",
      "Deepgram STT + TTS",
      "Ollama",
      "CISA KEV / NIST NVD",
      "arXiv / Semantic Scholar / OpenAlex",
      "GitHub REST + GraphQL",
    ],
    repositoryUrl: "https://github.com/Rashmi-Pathak/obsidian-",
    liveUrl: "https://obsidian-lilac-mu.vercel.app/",
    coverVariant: "black",
    motif: "fraud",
    theme: {
      bg: "#09090b",
      surface: "#121216",
      text: "#fafafa",
      muted: "#a1a1aa",
      accent: "#ef4444",
      accentSecondary: "#ffffff",
      border: "rgba(239, 68, 68, 0.32)",
    },
    heroMedia: {
      type: "image",
      src: "/assets/work_zip2/Obsidian/01-obsidian-overview-hero.png",
      alt: "Obsidian technology intelligence overview hero",
      caption: "Obsidian — The Living Map of Technology overview hero.",
    },
    overview: {
      whatItIs:
        "A real-time technology intelligence observatory tracking news, releases, research preprints, CISA KEV zero-days, and engineering job demand across 15 dedicated `/clusters/[slug]` routes.",
      whoItIsFor:
        "Engineers, security researchers, and tech analysts tracking where AI, infrastructure, security, and frontier science are moving.",
      whatMakesItDifferent:
        "Orchestrates 16 live APIs via `Promise.allSettled` with 10-min ISR caching, a 0–100 Momentum Score, 8 interactive canvas/WebGL visual engines gated by `IntersectionObserver`, and a voice-enabled AI analyst.",
    },
    problemHeading: "One intelligence layer across 15 clusters",
    problem:
      "Tracking breakthroughs across AI, robotics, security, infrastructure, and research papers requires stitching together fragmented feeds, repos, and vulnerability advisories.",
    approach:
      "Obsidian aggregates 16 live API pipelines into 15 structured technology clusters with momentum scoring, chronological signal streams, CISA KEV & NIST NVD threat feeds, and an interactive Groq + Deepgram intelligence terminal.",
    sections: [
      {
        num: "01",
        title: "16 LIVE API TELEMETRY ENGINE",
        tag: "PROMISE.ALLSETTLED",
        summary:
          "Ingests GNews, NewsAPI, HN, GitHub REST/GraphQL, arXiv, Semantic Scholar, OpenAlex, CISA KEV, NIST NVD, npm, PyPI, Hugging Face, and job boards.",
      },
      {
        num: "02",
        title: "15 DEDICATED CLUSTER ROUTES",
        tag: "/CLUSTERS/[SLUG]",
        summary:
          "Covers Computing & AI, Software, Cloud, Cybersecurity, Web3, Data, Semiconductors, Robotics, XR, Biotech, Quantum, Space, Climate, Consumer, and FinTech.",
      },
      {
        num: "03",
        title: "INTERACTIVE VISUAL SYSTEMS",
        tag: "60FPS CANVAS GATING",
        summary:
          "Integrates ShapeWaves, TechText, FlexCarousel, GridMotion, LetterGlitch, ParticleText, and 8×8 3D Cubes with offscreen IntersectionObserver pausing.",
      },
      {
        num: "04",
        title: "CENTRAL AI & VOICE TERMINAL",
        tag: "GROQ + DEEPGRAM",
        summary:
          "Context-aware analyst supporting text and voice readout across any cluster, paper, or CVE advisory.",
      },
    ],
    architectureTitle: "16 Live APIs → Parallel Deduplicator → 15 Clusters & AI Analyst",
    architectureNodes: [
      {
        step: "01",
        label: "16 EXTERNAL APIS",
        detail: "News · GitHub · arXiv/OpenAlex · CISA KEV/NVD · Packages · Jobs",
      },
      {
        step: "02",
        label: "AGGREGATION ENGINE",
        detail: "Promise.allSettled · Deduplicator · 0–100 Momentum Score",
      },
      {
        step: "03",
        label: "15 CLUSTER ROUTES",
        detail: "Homepage Observatory (18 Sections) + /clusters/[slug]",
      },
      {
        step: "04",
        label: "CENTRAL AI & VOICE",
        detail: "Groq LLM 120B · Deepgram Aura STT/TTS · Ollama",
      },
    ],
    gallery: [
      {
        type: "video",
        src: "/assets/work_zip2/Obsidian/02-obsidian-live-product-walkthrough-720p.mp4",
        alt: "Obsidian live product walkthrough video",
        caption: "Obsidian Live Walkthrough — clusters directory, signal stream, and intelligence assistant.",
      },
    ],
    closingLine: "Real-time 16-API technology intelligence across 15 live clusters.",
    nextProjectSlug: "ghar-ka-taste",
  },
  {
    slug: "ghar-ka-taste",
    index: "16",
    name: "GHAR KA TASTE",
    subtitle: "HOME-COOKED FOOD DELIVERY WITH CHEF PROFILES",
    shortDescription:
      "Food delivery application with home-chef profiles, order management, JWT auth, and LibSQL storage.",
    shortStack: ["REACT 19", "EXPRESS 5", "LIBSQL", "FRAMER MOTION"],
    summary:
      "A full-stack food delivery web application connecting customers with home chefs through dedicated chef profiles, menu browsing, cart and order workflows, image uploads, and email notifications.",
    category: "FOOD DELIVERY & FULL-STACK",
    role: "Personal project",
    stack: [
      "React 19",
      "Vite 8",
      "React Router DOM 7",
      "Framer Motion",
      "Axios",
      "Express 5",
      "LibSQL (@libsql/client)",
      "JWT + bcryptjs",
      "Multer",
      "Nodemailer",
    ],
    repositoryUrl: "https://github.com/Rashmi-Pathak/ghar-ka-taste",
    liveUrl: "https://ghar-ka-taste-sooty.vercel.app/",
    coverVariant: "crimson",
    motif: "crm",
    theme: {
      bg: "#18110c",
      surface: "#241912",
      text: "#fdf8f2",
      muted: "#d6bfb0",
      accent: "#e85d04",
      accentSecondary: "#f48c06",
      border: "rgba(232, 93, 4, 0.32)",
    },
    heroMedia: {
      type: "schematic",
      alt: "Illustrative architecture of Ghar Ka Taste React frontend and Express/LibSQL backend",
      caption: "Illustrative schematic — React 19 + Framer Motion frontend, Express 5 REST API, Multer uploads, and LibSQL database.",
      isIllustration: true,
    },
    overview: {
      whatItIs:
        "A home-cooked food delivery platform featuring chef profiles, dish discovery, payment-method & order migrations, and authenticated customer/chef flows.",
      whoItIsFor:
        "Customers ordering home-style meals and independent home chefs showcasing their kitchens and menus.",
      whatMakesItDifferent:
        "Pairs a React 19 + Framer Motion frontend with an Express 5 backend backed by LibSQL, JWT authentication, Multer media uploads, and Nodemailer notifications.",
    },
    problemHeading: "Connecting home kitchens directly to local diners",
    problem:
      "Independent home chefs lack lightweight digital storefronts that highlight their personal culinary profile alongside order placement and status tracking.",
    approach:
      "Ghar Ka Taste separates a Vite-powered React 19 client (`frontend/`) from an Express 5 + LibSQL API (`backend/`) with database migration scripts for orders and payment methods, JWT/bcryptjs auth, Multer uploads, and Nodemailer alerts.",
    sections: [
      {
        num: "01",
        title: "CHEF PROFILES & DISCOVERY",
        tag: "REACT 19 + ROUTER",
        summary:
          "Multi-page React Router frontend highlighting home-chef profiles, dishes, and animated transitions via Framer Motion.",
      },
      {
        num: "02",
        title: "ORDERS & PAYMENT WORKFLOWS",
        tag: "EXPRESS 5 + LIBSQL",
        summary:
          "REST endpoints backed by LibSQL with schema migrations for orders and payment methods.",
      },
      {
        num: "03",
        title: "AUTH, UPLOADS & EMAILS",
        tag: "JWT · MULTER · NODEMAILER",
        summary:
          "Secures user sessions with JWT + bcryptjs, handles chef/dish uploads via Multer, and sends order updates with Nodemailer.",
      },
    ],
    architectureTitle: "React 19 Frontend → Express 5 API → LibSQL Database",
    architectureNodes: [
      {
        step: "01",
        label: "REACT 19 CLIENT",
        detail: "Chef Profiles · Pages · Context · Framer Motion · Axios",
      },
      {
        step: "02",
        label: "EXPRESS 5 API",
        detail: "REST Routes · JWT + bcryptjs · CORS",
      },
      {
        step: "03",
        label: "MEDIA & NOTIFICATIONS",
        detail: "Multer Uploads · Nodemailer Order Emails",
      },
      {
        step: "04",
        label: "LIBSQL STORAGE",
        detail: "@libsql/client · Orders & Payment Migrations",
      },
    ],
    gallery: [
      {
        type: "schematic",
        alt: "Illustrative frontend and backend architecture of Ghar Ka Taste",
        caption: "Illustrative diagram — React 19 client connected to Express 5 and LibSQL.",
        isIllustration: true,
      },
    ],
    closingLine: "Home-cooked food delivery built around chef profiles and full-stack order flows.",
    nextProjectSlug: "veridex",
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
