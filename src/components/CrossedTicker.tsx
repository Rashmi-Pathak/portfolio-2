"use client";

import React from "react";

interface CrossedTickerProps {
  variant?: "hero-to-work" | "volumes-to-stack";
}

export function CrossedTicker({ variant = "hero-to-work" }: CrossedTickerProps) {
  const isCrimsonFront = variant === "volumes-to-stack";

  const frontItems =
    "OPEN TO OPPORTUNITIES ✦ FULL STACK ✦ AI & ML ✦ NO FLUFF ✦ REAL SHIP ✦ ";
  const backItems =
    "PYTHON ✦ TYPESCRIPT ✦ NEXT.JS ✦ FASTAPI ✦ POSTGRESQL ✦ LIGHTGBM ✦ XGBOOST ✦ SUPABASE ✦ ";

  return (
    <div
      className="relative z-20 -my-5 w-full overflow-hidden py-8 select-none sm:-my-8 sm:py-12"
      aria-hidden="true"
    >
      {/* Back diagonal strip */}
      <div className="relative -mx-8 rotate-[1.8deg] border-y-2 border-[var(--ink)] bg-[var(--ink)] py-3.5 text-[var(--cream-ink)] sm:py-5">
        <div className="animate-ticker-reverse flex w-max whitespace-nowrap">
          {[0, 1, 2, 3].map((idx) => (
            <span
              key={idx}
              className="font-display text-2xl tracking-[0.06em] sm:text-4xl lg:text-[2.75rem]"
            >
              {backItems}
            </span>
          ))}
        </div>
      </div>

      {/* Front diagonal strip */}
      <div
        className={`relative -mx-8 -mt-8 -rotate-[1.8deg] border-y-2 border-[var(--ink)] py-3.5 shadow-md sm:-mt-10 sm:py-5 ${
          isCrimsonFront
            ? "bg-[var(--accent)] text-[var(--cream-ink)]"
            : "bg-[var(--paper)] text-[var(--ink)]"
        }`}
      >
        <div className="animate-ticker flex w-max whitespace-nowrap">
          {[0, 1, 2, 3].map((idx) => (
            <span
              key={idx}
              className="font-display text-2xl tracking-[0.06em] sm:text-4xl lg:text-[2.75rem]"
            >
              {frontItems}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
