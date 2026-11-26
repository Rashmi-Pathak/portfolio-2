"use client";

import React, { useEffect, useState } from "react";
import { usePortfolio } from "./PortfolioContext";
import { TargetCursor } from "./TargetCursor";

export function SideChrome() {
  const { activeChapter, motionEnabled } = usePortfolio();
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollPct(Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100)));
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDarkChapter =
    activeChapter.startsWith("04") || activeChapter.startsWith("08");

  return (
    <>
      {/* Left edge vertical progress bar */}
      <div
        className="pointer-events-none fixed top-14 left-0 z-40 h-[calc(100vh-3.5rem)] w-[3px] bg-transparent"
        aria-hidden="true"
      >
        <div
          className="w-full bg-[var(--accent)] transition-[height] duration-100"
          style={{ height: `${scrollPct}%` }}
        />
      </div>

      {/* Left edge rotated chapter marker */}
      <div
        className="pointer-events-none fixed bottom-8 left-3 z-40 hidden select-none lg:block"
        aria-hidden="true"
      >
        <div
          className={`origin-bottom-left -rotate-90 font-mono-tech text-[10px] tracking-[0.22em] uppercase transition-colors duration-300 ${
            isDarkChapter ? "text-[var(--cream-ink)]/70" : "text-[var(--ink)]/55"
          }`}
        >
          {activeChapter}
        </div>
      </div>

      {/* Target Cursor across whole site */}
      {motionEnabled && <TargetCursor />}
    </>
  );
}
