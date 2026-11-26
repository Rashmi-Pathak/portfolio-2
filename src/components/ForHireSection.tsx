"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { PROFILE } from "@/data/portfolio";

export function ForHireSection() {
  return (
    <section
      id="for-hire"
      className="relative w-full overflow-hidden border-y border-[var(--ink)] bg-[var(--accent)] py-20 text-[var(--cream-ink)] sm:py-28"
    >
      <div className="paper-grain-dark absolute inset-0 z-0 opacity-30" aria-hidden="true" />

      {/* Halftone accent on right */}
      <div
        className="pointer-events-none absolute top-0 right-0 z-[1] h-full w-1/2 opacity-25 mix-blend-multiply"
        style={{
          maskImage: "linear-gradient(to left, black 30%, transparent)",
          WebkitMaskImage: "linear-gradient(to left, black 30%, transparent)",
        }}
        aria-hidden="true"
      >
        <img
          src="/assets/decorations/black_halftone_dots.png"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* Cropped Manga Illustration on Right */}
      <div
        className="pointer-events-none absolute right-[-8%] bottom-0 z-[2] hidden h-[92%] w-[44%] opacity-90 sm:block"
        aria-hidden="true"
      >
        <img
          src="/assets/hero/girl_hero_illustration.png"
          alt=""
          className="h-full w-full object-contain object-right-bottom mix-blend-multiply"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-14">
        <div className="max-w-3xl">
          <p className="font-mono-tech text-[11px] tracking-[0.2em] text-[var(--cream-ink)]/80 uppercase">
            // CHAPTER 07 — FOR HIRE · OPEN TO OPPORTUNITIES
          </p>

          <h2 className="font-display mt-4 text-[clamp(3.6rem,9.5vw,8.5rem)] leading-[0.84] text-[var(--cream-ink)]">
            FOR HIRE
          </h2>

          <p className="font-display mt-3 text-[clamp(1.8rem,4.2vw,3.4rem)] leading-[0.94] text-[var(--ink)]">
            FULL STACK BUILDS · AI-POWERED PRODUCTS
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--cream-ink)]/95 sm:text-lg">
            Interested in software engineering, AI/ML, fintech, and data-focused
            opportunities.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <a
              href={`mailto:${PROFILE.email}`}
              className="cta-skew inline-flex items-center gap-2 bg-[var(--ink)] px-6 py-3.5 font-mono-tech text-xs tracking-[0.18em] text-[var(--cream-ink)] uppercase transition-colors hover:bg-[var(--cream-ink)] hover:text-[var(--ink)]"
            >
              <span>EMAIL RASHMI</span>
              <ArrowUpRight size={14} />
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[var(--cream-ink)] px-5 py-3.5 font-mono-tech text-xs tracking-[0.18em] text-[var(--cream-ink)] uppercase transition-colors hover:bg-[var(--cream-ink)] hover:text-[var(--ink)]"
            >
              <span>GITHUB</span>
              <ArrowUpRight size={14} />
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[var(--cream-ink)] px-5 py-3.5 font-mono-tech text-xs tracking-[0.18em] text-[var(--cream-ink)] uppercase transition-colors hover:bg-[var(--cream-ink)] hover:text-[var(--ink)]"
            >
              <span>LINKEDIN</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
