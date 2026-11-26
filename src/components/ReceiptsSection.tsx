"use client";

import React from "react";
import { RECEIPTS } from "@/data/portfolio";

export function ReceiptsSection() {
  return (
    <section
      id="receipts"
      className="relative w-full bg-[var(--paper)] pt-14 pb-20 sm:pt-20 sm:pb-28"
    >
      <div className="paper-grain-light absolute inset-0 z-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-14">
        {/* Header */}
        <div className="relative flex flex-col justify-between gap-6 border-b border-[var(--rule)] pb-10 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono-tech text-[11px] tracking-[0.2em] text-[var(--accent)] uppercase">
              // CHAPTER 06 — RECEIPTS
            </p>
            <h2 className="font-display mt-3 text-[clamp(3.2rem,8.5vw,7.5rem)] leading-[0.86] text-[var(--ink)]">
              THE <span className="text-[var(--accent)]">RECEIPTS</span>
            </h2>
          </div>

          <div
            className="font-display text-outline-ghost pointer-events-none select-none text-[clamp(6rem,14vw,12rem)] leading-none"
            aria-hidden="true"
          >
            06
          </div>
        </div>

        {/* Editorial Proof Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* Experience */}
          <div className="border-[1.5px] border-[var(--ink)] bg-[var(--paper)] p-6 sm:p-8 md:col-span-7">
            <div className="flex items-center justify-between border-b border-[var(--rule)] pb-3">
              <span className="font-mono-tech text-[11px] tracking-[0.18em] text-[var(--accent)] uppercase">
                01 // EXPERIENCE
              </span>
              <span className="font-mono-tech text-[11px] tracking-[0.14em] text-[var(--muted)] uppercase">
                {RECEIPTS.experience.period}
              </span>
            </div>
            <h3 className="font-display mt-4 text-3xl text-[var(--ink)] sm:text-4xl">
              {RECEIPTS.experience.role} — {RECEIPTS.experience.company}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]/85">
              {RECEIPTS.experience.summary}
            </p>
            <ul className="mt-4 space-y-2 border-t border-[var(--rule)] pt-4 text-sm text-[var(--ink)]/80">
              {RECEIPTS.experience.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--accent)]"
                    aria-hidden="true"
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Education */}
          <div className="border-[1.5px] border-[var(--ink)] bg-[var(--charcoal)] p-6 text-[var(--cream-ink)] sm:p-8 md:col-span-5">
            <div className="flex items-center justify-between border-b border-[var(--rule-light)] pb-3">
              <span className="font-mono-tech text-[11px] tracking-[0.18em] text-[var(--accent-bright)] uppercase">
                02 // EDUCATION
              </span>
              <span className="font-mono-tech text-[11px] tracking-[0.14em] opacity-70 uppercase">
                {RECEIPTS.education.period}
              </span>
            </div>
            <h3 className="font-display mt-4 text-3xl sm:text-4xl">
              {RECEIPTS.education.institution}
            </h3>
            <p className="mt-3 font-editorial text-xl text-[var(--cream-ink)]/85">
              {RECEIPTS.education.degree}
            </p>
          </div>

          {/* Achievements */}
          <div className="border-[1.5px] border-[var(--ink)] bg-[var(--paper)] p-6 sm:p-8 md:col-span-6">
            <div className="border-b border-[var(--rule)] pb-3 font-mono-tech text-[11px] tracking-[0.18em] text-[var(--accent)] uppercase">
              03 // ACHIEVEMENTS & LEADERSHIP
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {RECEIPTS.achievements.map((ach) => (
                <div
                  key={ach.event}
                  className="border border-[var(--ink)] p-4"
                >
                  <span className="bg-[var(--accent)] px-2 py-0.5 font-mono-tech text-[10px] tracking-[0.16em] text-[var(--cream-ink)] uppercase">
                    {ach.title}
                  </span>
                  <div className="font-display mt-3 text-2xl text-[var(--ink)]">
                    {ach.event}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certification */}
          <div className="border-[1.5px] border-[var(--ink)] bg-[var(--paper)] p-6 sm:p-8 md:col-span-6">
            <div className="border-b border-[var(--rule)] pb-3 font-mono-tech text-[11px] tracking-[0.18em] text-[var(--accent)] uppercase">
              04 // CERTIFICATION
            </div>
            <h3 className="font-display mt-4 text-3xl text-[var(--ink)]">
              {RECEIPTS.certification.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/85">
              Topics: {RECEIPTS.certification.topics}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
