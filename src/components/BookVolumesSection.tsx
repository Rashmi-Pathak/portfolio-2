"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { BOOK_VOLUMES, type AccentTheme } from "@/data/portfolio";
import { usePortfolio } from "./PortfolioContext";

const BookShelfCanvas = dynamic(
  () => import("./BookShelfCanvas").then((m) => m.BookShelfCanvas),
  { ssr: false }
);

const ACCENT_HEX: Record<AccentTheme, string> = {
  crimson: "#b51f2b",
  terracotta: "#9e3528",
  cobalt: "#1d498f",
  forest: "#226142",
};

function StaticBookFallback({
  activeIndex,
  onHoverIndex,
}: {
  activeIndex: number | null;
  onHoverIndex: (idx: number | null) => void;
}) {
  return (
    <div
      className="flex h-full items-end justify-center gap-1 overflow-x-auto border-b-[1.5px] border-[var(--ink)] px-2 pb-0"
      onMouseLeave={() => onHoverIndex(null)}
    >
      {BOOK_VOLUMES.map((vol, idx) => {
        const active = idx === activeIndex;
        const bgClass =
          vol.coverVariant === "black"
            ? "bg-[var(--ink)] text-[var(--cream-ink)]"
            : vol.coverVariant === "crimson"
            ? "bg-[var(--accent)] text-[var(--cream-ink)]"
            : "bg-[var(--paper)] text-[var(--ink)]";

        return (
          <button
            key={vol.id}
            type="button"
            onClick={() => onHoverIndex(active ? null : idx)}
            onMouseEnter={() => onHoverIndex(idx)}
            onFocus={() => onHoverIndex(idx)}
            onBlur={() => onHoverIndex(null)}
            aria-label={`Volume ${vol.vol}: ${vol.title}`}
            className={`flex h-48 w-7 shrink-0 flex-col items-center justify-between border border-[var(--ink)] py-2 transition-transform duration-300 sm:w-8 ${bgClass} ${
              active ? "-translate-y-4 ring-2 ring-[var(--accent)]" : ""
            }`}
          >
            <span className="font-mono-tech text-[8px]">{vol.vol}</span>
            <span className="font-display [writing-mode:vertical-rl] rotate-180 text-[11px] tracking-wider">
              {vol.title}
            </span>
            <span className="font-mono-tech text-[7px] opacity-60">RP</span>
          </button>
        );
      })}
    </div>
  );
}

export function BookVolumesSection() {
  const { accent, motionEnabled, navigateWithTransition } = usePortfolio();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [webglOk, setWebglOk] = useState(true);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2") || c.getContext("webgl");
      if (!gl) setWebglOk(false);
    } catch {
      setWebglOk(false);
    }
  }, []);

  const activeVolume = activeIndex !== null ? BOOK_VOLUMES[activeIndex] : null;

  return (
    <section
      id="volumes"
      className="relative w-full border-t border-[var(--rule)] bg-[var(--paper)] pt-8 pb-20 sm:pt-12 sm:pb-28"
    >
      <div className="paper-grain-light absolute inset-0 z-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-14">
        {/* Top Shelf Header + 3D Book Bundle */}
        <div className="grid grid-cols-1 items-end gap-6 border-b-[1.5px] border-[var(--ink)] pb-4 lg:grid-cols-12">
          <div className="pb-4 lg:col-span-5">
            <p className="font-mono-tech text-[11px] tracking-[0.2em] text-[var(--accent)] uppercase">
              // CHAPTER 03 — PROJECT VOLUMES · 16 VOLUMES
            </p>
            <h2 className="font-editorial mt-2 text-4xl leading-[1.03] text-[var(--ink)] not-italic sm:text-5xl lg:text-[3.75rem]">
              <span className="not-italic">Every project as a volume.</span>{" "}
              <span className="font-editorial text-[var(--accent)]">
                Pull one out.
              </span>
            </h2>
            <p className="mt-4 font-mono-tech text-[11px] tracking-[0.14em] text-[var(--muted)] uppercase">
              {activeVolume
                ? `ACTIVE: VOL. ${activeVolume.vol} — ${activeVolume.title}`
                : "ACTIVE: VOL. 01 — VERIDEX · HOVER ANY VOLUME TO PULL IT OUT"}
            </p>
          </div>

          <div className="relative h-[340px] w-full sm:h-[400px] lg:col-span-7">
            {webglOk ? (
              <BookShelfCanvas
                volumes={BOOK_VOLUMES}
                activeIndex={activeIndex}
                accentHex={ACCENT_HEX[accent]}
                motionEnabled={motionEnabled}
                onHoverIndex={setActiveIndex}
              />
            ) : (
              <StaticBookFallback
                activeIndex={activeIndex}
                onHoverIndex={setActiveIndex}
              />
            )}
          </div>
        </div>

        {/* Vertical List of All 16 Volumes */}
        <ul
          className="divide-y divide-[var(--ink)] border-b border-[var(--ink)]"
          onMouseLeave={() => setActiveIndex(null)}
        >
          {BOOK_VOLUMES.map((vol, idx) => {
            const isActive = idx === activeIndex;
            return (
              <li key={vol.id}>
                <div
                  role="link"
                  tabIndex={0}
                  onClick={() =>
                    navigateWithTransition(vol.url, {
                      index: vol.vol,
                      title: vol.title,
                    })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      navigateWithTransition(vol.url, {
                        index: vol.vol,
                        title: vol.title,
                      });
                    }
                  }}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onFocus={() => setActiveIndex(idx)}
                  onBlur={() => setActiveIndex(null)}
                  aria-label={`Open case study for Volume ${vol.vol}: ${vol.title}`}
                  className={`cursor-target group grid cursor-pointer grid-cols-1 items-center gap-3 py-5 transition-all duration-200 sm:grid-cols-12 sm:gap-5 sm:px-3 ${
                    isActive
                      ? "translate-x-1 bg-[var(--ink)]/[0.045]"
                      : "hover:translate-x-1 hover:bg-[var(--ink)]/[0.03]"
                  }`}
                >
                  {/* Volume Number + Title */}
                  <div className="flex items-center gap-4 sm:col-span-4">
                    <span
                      className={`font-mono-tech text-xs tracking-[0.15em] transition-colors ${
                        isActive
                          ? "font-bold text-[var(--accent)]"
                          : "text-[var(--muted)] group-hover:text-[var(--accent)]"
                      }`}
                    >
                      VOL. {vol.vol}
                    </span>
                    <span className="font-display text-3xl text-[var(--ink)] sm:text-[2.1rem]">
                      {vol.title}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[var(--ink)]/80 sm:col-span-4">
                    {vol.description}
                  </p>

                  {/* Tech Stack + Live / GitHub / Case Study Arrow */}
                  <div className="flex flex-wrap items-center justify-between gap-3 sm:col-span-4 sm:justify-end">
                    <span className="font-mono-tech text-[10px] tracking-[0.12em] text-[var(--muted)] uppercase">
                      {vol.meta}
                    </span>

                    <div className="flex items-center gap-2">
                      {vol.liveUrl && (
                        <a
                          href={vol.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Open live website for ${vol.title}`}
                          title={`Live website — ${vol.title}`}
                          className="inline-flex h-8 w-8 items-center justify-center border border-[var(--ink)]/45 text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--cream-ink)]"
                        >
                          <ExternalLink size={13} />
                        </a>
                      )}

                      <a
                        href={vol.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Open GitHub repository for ${vol.title}`}
                        title={`GitHub repository — ${vol.title}`}
                        className="inline-flex h-8 w-8 items-center justify-center border border-[var(--ink)]/45 text-[var(--ink)] transition-colors hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--cream-ink)]"
                      >
                        <Github size={13} />
                      </a>

                      <span
                        aria-hidden="true"
                        className="inline-flex h-8 w-8 items-center justify-center border border-[var(--ink)] text-[var(--ink)] transition-colors group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--cream-ink)]"
                      >
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
