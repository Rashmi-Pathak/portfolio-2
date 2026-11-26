"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROFILE } from "@/data/portfolio";
import { usePortfolio } from "./PortfolioContext";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const { motionEnabled } = usePortfolio();
  const rootRef = useRef<HTMLElement>(null);
  const brushRef = useRef<HTMLDivElement>(null);
  const girlRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!motionEnabled || !rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-meta-top", { y: 14, opacity: 0, duration: 0.5 })
        .from(".hero-first-name", { y: 36, opacity: 0, duration: 0.65 }, "-=0.3")
        .from(
          ".hero-brush",
          {
            clipPath: "inset(0 100% 0 0)",
            duration: 0.75,
            ease: "power4.out",
          },
          "-=0.4"
        )
        .from(".hero-last-name", { y: 28, opacity: 0, duration: 0.6 }, "-=0.5")
        .from(
          ".hero-girl",
          { x: 40, opacity: 0, duration: 0.8, ease: "power2.out" },
          "-=0.55"
        )
        .from(
          ".hero-bottom-block",
          { y: 20, opacity: 0, stagger: 0.08, duration: 0.55 },
          "-=0.45"
        );

      if (girlRef.current) {
        gsap.to(girlRef.current, {
          y: -10,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(girlRef.current, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (brushRef.current) {
        gsap.to(brushRef.current, {
          y: 6,
          duration: 3.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(brushRef.current, {
          xPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, [motionEnabled]);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative min-h-[calc(100vh-3.5rem)] w-full overflow-hidden bg-[var(--paper)] pt-6 pb-10 sm:pt-10 lg:pb-12"
    >
      {/* Subtle Paper Grain */}
      <div className="paper-grain-light absolute inset-0 z-0" aria-hidden="true" />

      {/* Right-side Halftone Dots Field */}
      <div
        className="pointer-events-none absolute top-0 right-0 z-[1] h-[85%] w-[65%] opacity-75 mix-blend-multiply sm:w-[55%]"
        style={{
          maskImage:
            "radial-gradient(circle at 65% 42%, black 25%, transparent 74%)",
          WebkitMaskImage:
            "radial-gradient(circle at 65% 42%, black 25%, transparent 74%)",
        }}
        aria-hidden="true"
      >
        <img
          src="/assets/decorations/black_halftone_dots.png"
          alt=""
          className="h-full w-full object-cover object-right-top"
        />
      </div>

      {/* Sparse Ink Splashes on Right Edge */}
      <div
        className="pointer-events-none absolute top-12 right-0 z-[2] h-64 w-64 opacity-60 mix-blend-multiply sm:h-80 sm:w-80"
        aria-hidden="true"
      >
        <img
          src="/assets/decorations/ink_splashes_and_brush_marks.png"
          alt=""
          className="h-full w-full object-contain object-right-top"
        />
      </div>

      {/* Independent Crimson Brushstroke Layer — behind PATHAK */}
      <div
        ref={brushRef}
        className="hero-brush pointer-events-none absolute top-[34%] left-[-6%] z-[4] w-[112%] -translate-y-1/2 sm:top-[44%] md:top-[47%]"
        aria-hidden="true"
      >
        <img
          src="/assets/decorations/crimson_brushstroke.png"
          alt=""
          className="h-auto max-h-[140px] w-full object-cover sm:max-h-[190px] lg:max-h-[230px]"
        />
      </div>

      {/* Manga Girl Illustration — Right Side */}
      <div
        ref={girlRef}
        className="hero-girl pointer-events-none absolute right-[-14%] bottom-0 z-[5] h-[44vh] w-[70vw] max-w-[680px] opacity-85 sm:right-[-4%] sm:h-[72vh] sm:w-[54vw] sm:opacity-100 lg:right-[1%] lg:h-[84vh] lg:w-[46vw]"
      >
        <img
          src="/assets/hero/girl_hero_illustration.png"
          alt="Manga-style ink illustration of a developer in a coat looking back"
          className="h-full w-full object-contain object-right-bottom mix-blend-multiply"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7.5rem)] max-w-[1600px] flex-col justify-between px-5 sm:px-10 lg:px-14">
        {/* Top Chapter + Descriptor */}
        <div>
          <div className="hero-meta-top flex flex-wrap items-center gap-3 sm:gap-5">
            <span className="inline-flex items-center gap-2 font-mono-tech text-[11px] tracking-[0.2em] text-[var(--ink)] uppercase">
              <span
                className="inline-block h-2.5 w-2.5 bg-[var(--accent)]"
                aria-hidden="true"
              />
              CHAPTER 01
            </span>
            <span
              className="hidden h-[1.5px] w-10 bg-[var(--accent)] sm:inline-block"
              aria-hidden="true"
            />
            <span className="font-mono-tech text-[10px] tracking-[0.2em] text-[var(--accent)] uppercase sm:text-[11px]">
              {PROFILE.descriptor}
            </span>
          </div>

          {/* Oversized Name Wordmark (Live HTML Text) */}
          <h1 className="mt-4 select-none sm:mt-5">
            <span className="hero-first-name font-display block text-[clamp(4.4rem,13.5vw,12.5rem)] leading-[0.83] tracking-[-0.03em] text-[var(--ink)]">
              {PROFILE.firstName}
            </span>
            <span
              className="hero-last-name font-display text-outline-ink relative z-[6] -mt-2 ml-[6%] block text-[clamp(4.2rem,12.8vw,11.8rem)] leading-[0.84] tracking-[-0.03em] sm:-mt-4 sm:ml-[10%]"
              style={{
                WebkitTextStroke: "2.5px var(--ink)",
              }}
            >
              {PROFILE.lastName}
            </span>
          </h1>
        </div>

        {/* Lower Editorial Statement + CTAs + Metadata */}
        <div className="mt-10 grid grid-cols-1 items-end gap-8 pt-6 lg:grid-cols-12">
          {/* Left: Serif Statement & CTAs */}
          <div className="hero-bottom-block max-w-md bg-[var(--paper)]/85 p-2 sm:bg-transparent sm:p-0 lg:col-span-5">
            <p className="font-editorial text-[clamp(1.65rem,3vw,2.55rem)] leading-[1.08] text-[var(--ink)] not-italic">
              <span className="not-italic">I build intelligent products</span>
              <br />
              <span className="font-editorial text-[var(--accent)]">
                from data to deployment.
              </span>
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3.5">
              <a
                href="#work"
                className="cta-skew inline-flex items-center gap-3 bg-[var(--ink)] px-6 py-3.5 font-mono-tech text-xs tracking-[0.18em] text-[var(--cream-ink)] uppercase transition-colors hover:bg-[var(--accent)]"
              >
                <span>VIEW THE WORK</span>
                <span aria-hidden="true">→</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center border border-[var(--ink)] bg-[var(--paper)]/90 px-5 py-3.5 font-mono-tech text-xs tracking-[0.18em] text-[var(--ink)] uppercase transition-colors hover:bg-[var(--ink)] hover:text-[var(--cream-ink)]"
              >
                START A PROJECT
              </a>
            </div>
          </div>

          {/* Center-Right: Compact Metadata Block */}
          <dl className="hero-bottom-block grid grid-cols-1 gap-2.5 border-t border-[var(--rule)] pt-4 sm:border-t-0 sm:pt-0 lg:col-span-5 lg:pb-1">
            <div className="grid grid-cols-[72px_1fr] items-baseline gap-3">
              <dt className="font-mono-tech text-[10px] tracking-[0.18em] text-[var(--muted)] uppercase">
                NOW
              </dt>
              <dd className="text-xs font-medium text-[var(--ink)] sm:text-sm">
                {PROFILE.now} · Xavier Institute of Engineering
              </dd>
            </div>
            <div className="grid grid-cols-[72px_1fr] items-baseline gap-3">
              <dt className="font-mono-tech text-[10px] tracking-[0.18em] text-[var(--muted)] uppercase">
                STACK
              </dt>
              <dd className="text-xs font-medium text-[var(--ink)] sm:text-sm">
                {PROFILE.heroStack}
              </dd>
            </div>
            <div className="grid grid-cols-[72px_1fr] items-baseline gap-3">
              <dt className="font-mono-tech text-[10px] tracking-[0.18em] text-[var(--muted)] uppercase">
                STATUS
              </dt>
              <dd className="flex items-center gap-2 text-xs font-medium text-[var(--ink)] sm:text-sm">
                <span
                  className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]"
                  aria-hidden="true"
                />
                {PROFILE.status}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
