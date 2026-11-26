"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { PROFILE, type AccentTheme, type BookVolume } from "@/data/portfolio";
import { usePortfolio } from "./PortfolioContext";

const SingleBookCanvas = dynamic(
  () => import("./SingleBookCanvas").then((m) => m.SingleBookCanvas),
  { ssr: false }
);

const ACCENT_HEX: Record<AccentTheme, string> = {
  crimson: "#b51f2b",
  terracotta: "#9e3528",
  cobalt: "#1d498f",
  forest: "#226142",
};

const FOOTER_AUTHOR_BOOK: BookVolume = {
  vol: "01",
  id: "rashmi-pathak-edition",
  slug: "about",
  title: "RASHMI PATHAK",
  subtitle: "SOFTWARE ENGINEER · AI / ML · FINTECH",
  description:
    "B.Tech Information Technology · Xavier Institute of Engineering, Mumbai (2024–2028).",
  meta: "MUMBAI · B.TECH IT · 2024–2028",
  githubUrl: PROFILE.github,
  url: "#about",
  coverVariant: "ivory",
  motif: "author",
};

export function FooterSection() {
  const { accent, motionEnabled } = usePortfolio();
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

  return (
    <footer className="relative w-full border-t border-[var(--cream-ink)]/15 bg-[var(--charcoal-deep)] pt-12 pb-12 text-[var(--cream-ink)] sm:pt-16">
      <div className="paper-grain-dark absolute inset-0 z-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-14">
        {/* Centered Interactive Rotating 3D Book */}
        <div className="flex flex-col items-center pb-12">
          <div className="relative h-[340px] w-full max-w-[480px] sm:h-[400px]">
            {webglOk ? (
              <SingleBookCanvas
                volume={FOOTER_AUTHOR_BOOK}
                accentHex={ACCENT_HEX[accent]}
                motionEnabled={motionEnabled}
              />
            ) : (
              <div className="mx-auto flex h-64 w-44 flex-col justify-between border border-[var(--cream-ink)]/40 bg-[var(--paper)] p-4 text-[var(--ink)]">
                <span className="font-mono-tech text-[9px]">VOL. 01</span>
                <span className="font-display text-2xl">RASHMI PATHAK</span>
                <span className="font-mono-tech text-[9px]">
                  SOFTWARE ENGINEER · AI/ML
                </span>
              </div>
            )}
          </div>
          <p className="mt-2 font-mono-tech text-[10px] tracking-[0.2em] text-[var(--cream-ink)]/45 uppercase">
            DRAG BOOK TO ROTATE 360°
          </p>
        </div>

        {/* 4 Compact Colophon Columns */}
        <div className="grid grid-cols-2 gap-8 border-t border-[var(--cream-ink)]/15 pt-10 text-xs sm:grid-cols-4">
          <div>
            <p className="font-mono-tech text-[10px] tracking-[0.2em] text-[var(--cream-ink)]/50 uppercase">
              AUTHOR
            </p>
            <p className="mt-2 font-medium text-[var(--cream-ink)]">
              Rashmi Pathak
            </p>
            <p className="mt-1 text-[var(--cream-ink)]/70">
              {PROFILE.location}
            </p>
          </div>

          <div>
            <p className="font-mono-tech text-[10px] tracking-[0.2em] text-[var(--cream-ink)]/50 uppercase">
              SECTIONS
            </p>
            <ul className="mt-2 space-y-1 text-[var(--cream-ink)]/75">
              <li>
                <a href="#work" className="hover:text-[var(--accent-bright)]">
                  02 Selected Work
                </a>
              </li>
              <li>
                <a href="#volumes" className="hover:text-[var(--accent-bright)]">
                  03 Project Volumes
                </a>
              </li>
              <li>
                <a href="#stack" className="hover:text-[var(--accent-bright)]">
                  04 Every Layer
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[var(--accent-bright)]">
                  05 The Author
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono-tech text-[10px] tracking-[0.2em] text-[var(--cream-ink)]/50 uppercase">
              CONNECT
            </p>
            <ul className="mt-2 space-y-1 text-[var(--cream-ink)]/75">
              <li>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="hover:text-[var(--accent-bright)]"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent-bright)]"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent-bright)]"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono-tech text-[10px] tracking-[0.2em] text-[var(--cream-ink)]/50 uppercase">
              © 2026
            </p>
            <p className="mt-2 text-[var(--cream-ink)]/80">Rashmi Pathak.</p>
            <a
              href="#hero"
              className="mt-1 inline-block border-b border-[var(--accent-bright)] text-[var(--cream-ink)] transition-colors hover:text-[var(--accent-bright)]"
            >
              Read it again ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
