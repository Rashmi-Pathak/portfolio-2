"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROFILE } from "@/data/portfolio";
import { usePortfolio } from "./PortfolioContext";

gsap.registerPlugin(ScrollTrigger);

export function AuthorSection() {
  const { motionEnabled } = usePortfolio();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!motionEnabled || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".author-panel", {
        y: 28,
        opacity: 0,
        duration: 0.6,
        stagger: 0.09,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".author-grid",
          start: "top 82%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [motionEnabled]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-[var(--paper)] pt-20 pb-20 sm:pt-28 sm:pb-24"
    >
      <div className="paper-grain-light absolute inset-0 z-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-14">
        {/* Header */}
        <div className="relative flex flex-col justify-between gap-6 pb-10 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono-tech text-[11px] tracking-[0.2em] text-[var(--accent)] uppercase">
              // CHAPTER 05 — THE AUTHOR
            </p>
            <h2 className="font-display mt-3 text-[clamp(3.2rem,8.5vw,7.5rem)] leading-[0.86] text-[var(--ink)]">
              THE <span className="text-[var(--accent)]">AUTHOR</span>
            </h2>
          </div>

          <div
            className="font-display text-outline-ghost pointer-events-none select-none text-[clamp(6rem,14vw,12rem)] leading-none"
            aria-hidden="true"
          >
            05
          </div>
        </div>

        {/* Asymmetrical Editorial Manga Grid */}
        <div className="author-grid grid grid-cols-1 gap-5 md:grid-cols-12">
          {/* Panel 1: Portrait Illustration + Mumbai */}
          <div className="author-panel relative min-h-[340px] overflow-hidden border-[1.5px] border-[var(--ink)] bg-[#dfd6c3] md:col-span-5">
            <span className="absolute top-0 left-0 z-20 flex h-7 w-7 items-center justify-center bg-[var(--ink)] font-mono-tech text-[11px] text-[var(--cream-ink)]">
              1
            </span>
            <img
              src="/assets/hero/girl_hero_alternate.png"
              alt="Ink illustration representing Rashmi Pathak"
              className="absolute inset-0 h-full w-full object-cover object-top opacity-90 mix-blend-multiply"
            />
            <div className="relative z-10 mt-44 m-4 border-[1.5px] border-[var(--ink)] bg-[var(--paper)] p-5 sm:mt-48">
              <h3 className="font-display text-3xl text-[var(--ink)]">MUMBAI</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/85">
                I study Information Technology at {PROFILE.education}. Class of
                2028.
              </p>
            </div>
          </div>

          {/* Panel 2: Quote + Bio */}
          <div className="author-panel relative flex flex-col justify-between overflow-hidden border-[1.5px] border-[var(--ink)] bg-[var(--paper)] p-7 sm:p-10 md:col-span-7">
            <span className="absolute top-0 left-0 z-20 flex h-7 w-7 items-center justify-center bg-[var(--ink)] font-mono-tech text-[11px] text-[var(--cream-ink)]">
              2
            </span>
            <div
              className="pointer-events-none absolute top-0 right-0 h-full w-1/2 opacity-20 mix-blend-multiply"
              style={{
                maskImage: "linear-gradient(to left, black, transparent)",
                WebkitMaskImage: "linear-gradient(to left, black, transparent)",
              }}
              aria-hidden="true"
            >
              <img
                src="/assets/decorations/black_halftone_dots.png"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>

            <blockquote className="relative z-10 mt-4 font-editorial text-[clamp(2rem,4vw,3.3rem)] leading-[1.08] text-[var(--ink)] not-italic">
              <span className="not-italic">“Learn by building </span>
              <span className="font-editorial text-[var(--accent)]">
                real things
              </span>
              <span className="not-italic">, not isolated tutorials.”</span>
            </blockquote>

            <p className="relative z-10 mt-6 max-w-xl text-sm leading-relaxed text-[var(--ink)]/80 sm:text-base">
              I&apos;m Rashmi Pathak, a third-year B.Tech IT student building
              full-stack and AI-driven products across machine learning, web
              development, and fintech — from ML pipelines and RAG systems to
              real-time dashboards.
            </p>
          </div>

          {/* Panel 3: Hackathons */}
          <div className="author-panel relative border-[1.5px] border-[var(--ink)] bg-[var(--paper)] p-6 md:col-span-4">
            <span className="absolute top-0 left-0 flex h-7 w-7 items-center justify-center bg-[var(--ink)] font-mono-tech text-[11px] text-[var(--cream-ink)]">
              3
            </span>
            <h3 className="font-display mt-5 text-3xl text-[var(--ink)]">
              HACKATHONS
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/85">
              Shipping under tight deadlines is where ideas turn into working
              systems: Winner at Code-a-thon Hackathon and Finalist at
              AlgorithmX Hackathon.
            </p>
          </div>

          {/* Panel 4: Now */}
          <div className="author-panel relative border-[1.5px] border-[var(--ink)] bg-[var(--paper)] p-6 md:col-span-4">
            <span className="absolute top-0 left-0 flex h-7 w-7 items-center justify-center bg-[var(--ink)] font-mono-tech text-[11px] text-[var(--cream-ink)]">
              4
            </span>
            <h3 className="font-display mt-5 flex items-center gap-2 text-3xl text-[var(--ink)]">
              <span>NOW</span>
              <span
                className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--accent)]"
                aria-hidden="true"
              />
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/85">
              Focus areas: AI / ML, full-stack engineering, and fintech. Building
              with Next.js, TypeScript, Python, FastAPI, and PostgreSQL.
            </p>
          </div>

          {/* Panel 5: Dark Slogan Panel */}
          <div className="author-panel relative flex items-center justify-between overflow-hidden border-[1.5px] border-[var(--ink)] bg-[var(--charcoal)] p-6 text-[var(--cream-ink)] md:col-span-4">
            <span className="absolute top-0 left-0 flex h-7 w-7 items-center justify-center bg-[var(--accent)] font-mono-tech text-[11px] text-[var(--cream-ink)]">
              5
            </span>
            <div className="font-display mt-4 text-4xl leading-[0.9] sm:text-5xl">
              SHIPPING <span className="text-[var(--accent-bright)]">&gt;</span>
              <br />
              SCROLLING
            </div>
          </div>
        </div>

        {/* Bottom institution bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--ink)] pb-4 font-mono-tech text-[11px] tracking-[0.18em] uppercase">
          <span>
            {PROFILE.education} · MUMBAI
          </span>
          <span className="border border-[var(--ink)] px-3 py-1">
            CLASS OF 2028
          </span>
        </div>
      </div>
    </section>
  );
}
