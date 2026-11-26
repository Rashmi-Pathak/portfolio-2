"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolio } from "./PortfolioContext";

gsap.registerPlugin(ScrollTrigger);

export function SloganInterstitial() {
  const { motionEnabled } = usePortfolio();
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!motionEnabled || !rootRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { xPercent: 8 },
        {
          xPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [motionEnabled]);

  return (
    <div
      ref={rootRef}
      className="relative w-full overflow-hidden border-y border-[var(--ink)] bg-[var(--charcoal-deep)] text-[var(--cream-ink)] select-none"
      aria-label="No fluff, real ship"
    >
      {/* Top horizontal manga crop strip */}
      <div className="relative h-28 w-full overflow-hidden border-b border-[var(--cream-ink)]/25 bg-[var(--paper)] sm:h-36">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(17,16,15,0.45) 10px, rgba(17,16,15,0.45) 11px)",
          }}
          aria-hidden="true"
        />
        <img
          src="/assets/hero/girl_hero_alternate.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-[50%_22%] mix-blend-multiply"
        />
      </div>

      {/* Wide scrubbed typography */}
      <div className="relative py-10 sm:py-14">
        <div className="paper-grain-dark absolute inset-0" aria-hidden="true" />
        <div
          ref={textRef}
          className="font-display relative z-10 flex items-center justify-center gap-6 whitespace-nowrap text-[clamp(4rem,13vw,11.5rem)] leading-[0.86]"
        >
          <span>NO FLUFF</span>
          <span className="text-[var(--accent-bright)]" aria-hidden="true">
            ✦
          </span>
          <span>REAL SHIP</span>
        </div>
      </div>
    </div>
  );
}
