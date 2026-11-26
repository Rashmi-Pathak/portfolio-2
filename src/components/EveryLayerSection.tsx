"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STACK_LAYERS } from "@/data/portfolio";
import { usePortfolio } from "./PortfolioContext";

gsap.registerPlugin(ScrollTrigger);

export function EveryLayerSection() {
  const { motionEnabled } = usePortfolio();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!motionEnabled || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".layer-panel-inner", {
        y: 22,
        opacity: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".layer-stack-list",
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [motionEnabled]);

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="relative w-full bg-[var(--charcoal)] pt-20 pb-16 text-[var(--cream-ink)] sm:pt-28 sm:pb-24"
    >
      <div className="paper-grain-dark absolute inset-0 z-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="relative flex flex-col justify-between gap-6 pb-12 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono-tech text-[11px] tracking-[0.2em] text-[var(--accent-bright)] uppercase">
              // CHAPTER 04 — THE STACK
            </p>
            <h2 className="font-display mt-3 text-[clamp(3.2rem,8.5vw,7.5rem)] leading-[0.86] text-[var(--cream-ink)]">
              EVERY <span className="text-[var(--accent-bright)]">LAYER</span>
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--cream-ink)]/80 sm:text-base">
              Not a wall of logos. Keep scrolling and the layers stack up: what I
              use at each level of a product, and where I have used it.
            </p>
          </div>

          <div
            className="font-display text-outline-ghost-light pointer-events-none select-none text-[clamp(6rem,14vw,12rem)] leading-none"
            aria-hidden="true"
          >
            04
          </div>
        </div>

        {/* Stacked Sticky Layers */}
        <div className="layer-stack-list relative space-y-3 pb-10">
          {STACK_LAYERS.map((layer, idx) => {
            const isFinal = Boolean(layer.isFinal);
            // Sticky top offset so each header strip remains visible as layers stack
            const stickyTop = 56 + idx * 56;

            return (
              <div
                key={layer.index}
                className={`lg:sticky border-t border-[var(--cream-ink)]/35 transition-colors ${
                  isFinal
                    ? "bg-[var(--accent)] text-[var(--cream-ink)]"
                    : "bg-[var(--charcoal)] text-[var(--cream-ink)]"
                }`}
                style={{
                  top: `${stickyTop}px`,
                  zIndex: 10 + idx,
                }}
              >
                {/* 56px Header Strip */}
                <div className="flex h-[56px] items-center justify-between border-b border-[var(--cream-ink)]/20 px-2 sm:px-3">
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`flex h-6 w-8 items-center justify-center font-mono-tech text-xs font-bold ${
                        isFinal
                          ? "bg-[var(--ink)] text-[var(--cream-ink)]"
                          : "bg-[var(--accent)] text-[var(--cream-ink)]"
                      }`}
                    >
                      {layer.index}
                    </span>
                    <span className="font-display text-xl tracking-[0.06em] uppercase sm:text-2xl">
                      {layer.name}
                    </span>
                  </div>
                  <span className="font-mono-tech text-[11px] tracking-[0.18em] uppercase opacity-80">
                    {layer.subtitle}
                  </span>
                </div>

                {/* Layer Body */}
                <div className="layer-panel-inner grid grid-cols-1 items-center gap-6 py-8 sm:py-12 lg:grid-cols-12 lg:px-2">
                  <div className="lg:col-span-6">
                    <h3 className="font-display text-[clamp(3rem,7.2vw,6.2rem)] leading-[0.86] text-[var(--cream-ink)]">
                      {layer.name}
                    </h3>
                    <p
                      className={`font-editorial mt-3 text-lg sm:text-xl ${
                        isFinal ? "text-[var(--cream-ink)]" : "text-[var(--cream-ink)]/70"
                      }`}
                    >
                      {layer.editorialLine}
                    </p>
                  </div>

                  <div className="lg:col-span-6">
                    <div className="flex flex-wrap gap-2">
                      {layer.chips.map((chip) => (
                        <span
                          key={chip}
                          className={`border px-3.5 py-2 font-mono-tech text-xs tracking-[0.06em] ${
                            isFinal
                              ? "border-[var(--cream-ink)]/60 bg-[var(--ink)]/20 text-[var(--cream-ink)]"
                              : "border-[var(--cream-ink)]/45 bg-[var(--charcoal-deep)] text-[var(--cream-ink)]"
                          }`}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <span
                        className={`border px-2 py-0.5 font-mono-tech text-[10px] tracking-[0.14em] uppercase ${
                          isFinal
                            ? "border-[var(--cream-ink)]/50 text-[var(--cream-ink)]"
                            : "border-[var(--cream-ink)]/35 text-[var(--cream-ink)]/75"
                        }`}
                      >
                        USED IN
                      </span>
                      <span className="font-mono-tech text-[10px] tracking-[0.16em] uppercase opacity-75">
                        {layer.usedIn}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
