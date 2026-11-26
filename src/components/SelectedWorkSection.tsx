"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, type ProjectItem } from "@/data/portfolio";
import { usePortfolio } from "./PortfolioContext";

gsap.registerPlugin(ScrollTrigger);

function ProjectVisualPreview({ project }: { project: ProjectItem }) {
  if (project.previewImage) {
    return (
      <div className="relative h-52 w-full overflow-hidden border-b-[1.5px] border-[var(--ink)] bg-[#11100f] sm:h-60">
        <img
          src={project.previewImage}
          alt={`${project.title} product screenshot`}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute bottom-0 left-0 z-20 flex h-11 w-11 items-center justify-center bg-[var(--ink)] font-display text-xl text-[var(--cream-ink)] transition-colors duration-300 group-hover:bg-[var(--accent)]">
          {project.num}
        </span>
      </div>
    );
  }

  return (
    <div className="relative h-52 w-full overflow-hidden border-b-[1.5px] border-[var(--ink)] bg-[#f8f4ea] text-[var(--ink)] transition-colors duration-300 group-hover:bg-[#151210] group-hover:text-[var(--cream-ink)] sm:h-60">
      {/* Subtle halftone / dot grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
        aria-hidden="true"
      />

      {/* Motif-specific technical schematic */}
      <div className="relative z-10 flex h-full w-full flex-col justify-between p-5 pr-8 transition-transform duration-500 ease-out group-hover:scale-[1.03]">
        <div className="flex items-center justify-between font-mono-tech text-[10px] tracking-[0.14em] opacity-65">
          <span>SYS // {project.id.toUpperCase()}</span>
          <span>PREVIEW FRAME</span>
        </div>

        {project.motif === "provenance" && (
          <div className="my-auto grid grid-cols-3 items-center gap-3 px-2">
            <div className="border border-current/30 p-2.5 font-mono-tech text-[10px]">
              <div className="opacity-60">WATERMARK</div>
              <div className="mt-1 font-bold">TRUSTMARK</div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="h-[1px] w-full bg-[var(--accent)]" />
              <span className="font-mono-tech text-[9px] text-[var(--accent)]">
                HNSW · PDQ
              </span>
              <span className="h-[1px] w-full bg-[var(--accent)]" />
            </div>
            <div className="border border-current/30 p-2.5 font-mono-tech text-[10px]">
              <div className="opacity-60">MANIFEST</div>
              <div className="mt-1 font-bold">ED25519 / B2</div>
            </div>
          </div>
        )}

        {project.motif === "markets" && (
          <div className="my-auto flex items-end justify-between gap-2 px-2">
            <div className="space-y-1 font-mono-tech text-[10px]">
              <div className="text-[var(--accent)]">SIP SIMULATOR</div>
              <div className="text-lg font-bold tracking-tight">4 TERMINALS</div>
              <div className="opacity-60">350 CASE STUDIES · 7 LABS</div>
            </div>
            <svg
              viewBox="0 0 140 54"
              className="h-14 w-36 stroke-current"
              fill="none"
              aria-hidden="true"
            >
              <polyline
                points="2,46 24,38 42,42 64,22 86,28 110,10 136,14"
                strokeWidth="2"
                className="stroke-[var(--accent)]"
              />
              <line x1="2" y1="50" x2="138" y2="50" strokeWidth="1" opacity="0.3" />
            </svg>
          </div>
        )}

        {project.motif === "forecast" && (
          <div className="my-auto flex items-center justify-between gap-4 px-2">
            <div className="font-mono-tech text-[10px]">
              <div className="opacity-60">ENSEMBLE HORIZON</div>
              <div className="mt-1 text-base font-bold">30 / 60 / 90 / 180D</div>
              <div className="mt-1 text-[var(--accent)]">95% CONFIDENCE BAND</div>
            </div>
            <svg
              viewBox="0 0 130 56"
              className="h-14 w-32"
              fill="none"
              aria-hidden="true"
            >
              <polygon
                points="10,40 45,28 85,18 122,8 122,34 85,36 45,42 10,44"
                fill="currentColor"
                opacity="0.14"
              />
              <polyline
                points="10,42 45,35 85,27 122,20"
                stroke="var(--accent)"
                strokeWidth="2"
              />
            </svg>
          </div>
        )}

        {project.motif === "fraud" && (
          <div className="my-auto space-y-2 px-2 font-mono-tech text-[10px]">
            <div className="flex justify-between">
              <span>XGBOOST + RF + ISO-FOREST</span>
              <span className="text-[var(--accent)]">SHAP ATTRIBUTION</span>
            </div>
            <div className="space-y-1.5">
              <div className="h-2 w-[84%] bg-[var(--accent)]" />
              <div className="h-2 w-[62%] bg-current opacity-60" />
              <div className="h-2 w-[41%] bg-current opacity-35" />
            </div>
          </div>
        )}

        {project.motif === "kanban" && (
          <div className="my-auto grid grid-cols-3 gap-2 px-2 font-mono-tech text-[9px]">
            {["BACKLOG", "IN PROGRESS", "SHIPPED"].map((col, i) => (
              <div
                key={col}
                className="border border-current/25 bg-current/[0.06] p-2"
              >
                <div className="mb-1.5 opacity-60">{col}</div>
                <div className="h-2.5 w-full bg-current/25" />
                {i < 2 && <div className="mt-1 h-2.5 w-3/4 bg-[var(--accent)]" />}
              </div>
            ))}
          </div>
        )}

        {project.motif === "crm" && (
          <div className="my-auto flex items-center justify-between gap-3 px-2 font-mono-tech text-[10px]">
            <div>
              <div className="opacity-60">14 NORMALIZED SHEETS</div>
              <div className="mt-1 text-base font-bold">LLAMA 3.3 COPILOT</div>
              <div className="mt-0.5 text-[var(--accent)]">
                SENTIMENT + REPLY DRAFTS
              </div>
            </div>
            <div className="border border-current/30 px-2.5 py-1.5 text-[9px]">
              RBAC // ACTIVE
            </div>
          </div>
        )}

        <div className="flex items-center justify-between font-mono-tech text-[9px] tracking-[0.16em] opacity-50">
          <span>{project.subtitle.toUpperCase()}</span>
          <span>● ● ●</span>
        </div>
      </div>

      {/* Number Badge bottom-left of preview */}
      <span className="absolute bottom-0 left-0 z-20 flex h-11 w-11 items-center justify-center bg-[var(--ink)] font-display text-xl text-[var(--cream-ink)] transition-colors duration-300 group-hover:bg-[var(--accent)]">
        {project.num}
      </span>
    </div>
  );
}

export function SelectedWorkSection() {
  const { motionEnabled, navigateWithTransition } = usePortfolio();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!motionEnabled || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".work-card", {
        y: 36,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".work-grid",
          start: "top 82%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [motionEnabled]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full bg-[var(--paper)] pt-20 pb-20 sm:pt-28 sm:pb-28"
    >
      <div className="paper-grain-light absolute inset-0 z-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="relative flex flex-col justify-between gap-6 border-b border-[var(--rule)] pb-10 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono-tech text-[11px] tracking-[0.2em] text-[var(--accent)] uppercase">
              // CHAPTER 02 — SELECTED WORK
            </p>
            <h2 className="font-display mt-3 text-[clamp(3.2rem,8.5vw,7.5rem)] leading-[0.86] text-[var(--ink)]">
              SELECTED <span className="text-[var(--accent)]">WORK</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--ink)]/80 sm:text-base">
              Six shipped projects across AI, fintech, analytics, and full-stack
              systems. Built from data pipelines to production interfaces.
            </p>
          </div>

          <div
            className="font-display text-outline-ghost pointer-events-none select-none text-[clamp(6rem,14vw,12rem)] leading-none"
            aria-hidden="true"
          >
            02
          </div>
        </div>

        {/* Slanted Manga-Cut 2-Column Editorial Grid */}
        <div className="work-grid mt-12 grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-1 md:gap-y-7">
          {PROJECTS.map((project, idx) => {
            const isLeft = idx % 2 === 0;
            const slantClass = isLeft
              ? "work-slant-left md:pr-2"
              : "work-slant-right md:-ml-5 md:pl-2";

            return (
              <article
                key={project.id}
                role="link"
                tabIndex={0}
                onClick={() =>
                  navigateWithTransition(`/work/${project.slug}`, {
                    index: project.num,
                    title: project.title,
                  })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigateWithTransition(`/work/${project.slug}`, {
                      index: project.num,
                      title: project.title,
                    });
                  }
                }}
                aria-label={`Open case study for ${project.title}`}
                className={`work-card cursor-target group relative cursor-pointer bg-[var(--ink)] p-[1.5px] ${slantClass}`}
              >
                <div
                  className={`flex h-full flex-col justify-between bg-[var(--paper)] text-[var(--ink)] transition-colors duration-300 group-hover:bg-[var(--charcoal)] group-hover:text-[var(--cream-ink)] ${
                    isLeft ? "work-slant-left" : "work-slant-right"
                  }`}
                >
                  <div>
                    <ProjectVisualPreview project={project} />

                    <div className="p-6 sm:p-8">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono-tech text-[10px] tracking-[0.18em] text-[var(--muted)] uppercase transition-colors duration-300 group-hover:text-[var(--cream-ink)]/65">
                          {project.role}
                        </span>
                        <span className="bg-[var(--accent)] px-2.5 py-1 font-mono-tech text-[10px] tracking-[0.16em] text-[var(--cream-ink)] uppercase">
                          {project.badge}
                        </span>
                      </div>

                      <h3 className="font-display mt-3 text-4xl leading-[0.9] sm:text-5xl">
                        {project.title}
                      </h3>
                      <p className="mt-1 font-mono-tech text-[11px] tracking-[0.12em] text-[var(--accent)] uppercase transition-colors duration-300 group-hover:text-[var(--accent-bright)]">
                        {project.subtitle}
                      </p>

                      <p className="mt-3 text-sm leading-relaxed opacity-85">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Footer metadata + Live & GitHub links */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--rule)] px-6 py-4 transition-colors duration-300 group-hover:border-[var(--rule-light)] sm:px-8">
                    <div className="font-mono-tech text-[10px] tracking-[0.14em] uppercase opacity-75">
                      {project.stack.join(" · ")}
                    </div>

                    <div className="flex items-center gap-4 font-mono-tech text-[11px] tracking-[0.16em] uppercase">
                      <span className="inline-flex items-center gap-1 font-semibold text-[var(--accent)] transition-colors group-hover:text-[var(--accent-bright)]">
                        <span>READ</span>
                        <span
                          aria-hidden="true"
                          className="transition-transform group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </span>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Open live deployment of ${project.title}`}
                          className="inline-flex items-center gap-1 opacity-80 transition-colors hover:text-[var(--accent-bright)] hover:opacity-100"
                        >
                          <span>LIVE</span>
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`View ${project.title} GitHub repository`}
                        className="inline-flex items-center gap-1 opacity-80 transition-colors hover:text-[var(--accent-bright)] hover:opacity-100"
                      >
                        <span>GITHUB</span>
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
