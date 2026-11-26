"use client";

import React, { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { PROFILE } from "@/data/portfolio";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-[var(--charcoal-deep)] pt-20 pb-24 text-[var(--cream-ink)] sm:pt-28 sm:pb-32"
    >
      <div className="paper-grain-dark absolute inset-0 z-0" aria-hidden="true" />

      {/* Subtle halftone texture on top-right */}
      <div
        className="pointer-events-none absolute top-0 right-0 z-[1] h-full w-1/2 opacity-15"
        style={{
          maskImage: "radial-gradient(circle at 75% 30%, black, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle at 75% 30%, black, transparent 70%)",
        }}
        aria-hidden="true"
      >
        <img
          src="/assets/decorations/black_halftone_dots.png"
          alt=""
          className="h-full w-full object-cover invert"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-14">
        <div className="relative flex items-start justify-between">
          <div>
            <p className="font-mono-tech text-[11px] tracking-[0.2em] text-[var(--cream-ink)]/65 uppercase">
              // CHAPTER 08 — NEXT CHAPTER
            </p>
            <h2 className="font-display mt-3 text-[clamp(3.6rem,11vw,9.5rem)] leading-[0.84] text-[var(--accent-bright)]">
              YOUR PROJECT.
            </h2>
          </div>

          <div
            className="font-display text-outline-ghost-light pointer-events-none hidden select-none text-[clamp(6rem,14vw,11rem)] leading-none sm:block"
            aria-hidden="true"
          >
            08
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          {/* Bottom-left editorial copy */}
          <div className="lg:col-span-5">
            <p className="font-editorial max-w-sm text-2xl leading-[1.2] text-[var(--cream-ink)]/90 not-italic sm:text-3xl">
              Have something that needs building?{" "}
              <span className="font-editorial text-[var(--accent-bright)]">
                Let&apos;s talk.
              </span>
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-5 font-mono-tech text-[11px] tracking-[0.18em] uppercase">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[var(--cream-ink)]/80 transition-colors hover:text-[var(--accent-bright)]"
              >
                <span>GITHUB</span>
                <ArrowUpRight size={13} />
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[var(--cream-ink)]/80 transition-colors hover:text-[var(--accent-bright)]"
              >
                <span>LINKEDIN</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          {/* Right: Emphatic Email + Actions */}
          <div className="lg:col-span-7">
            <p className="font-mono-tech text-[11px] tracking-[0.2em] text-[var(--cream-ink)]/65 uppercase">
              WRITE TO
            </p>

            <a
              href={`mailto:${PROFILE.email}`}
              className="font-display mt-2 inline-block break-all border-b-[3px] border-[var(--accent-bright)] pb-2 text-[clamp(2rem,5.4vw,4.5rem)] leading-[0.95] text-[var(--accent-bright)] transition-colors hover:text-[var(--cream-ink)]"
            >
              {PROFILE.email.toUpperCase()}
            </a>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${PROFILE.email}`}
                className="cta-skew inline-flex items-center gap-2.5 bg-[var(--cream-ink)] px-6 py-3.5 font-mono-tech text-xs tracking-[0.18em] text-[var(--ink)] uppercase transition-colors hover:bg-[var(--accent-bright)] hover:text-[var(--cream-ink)]"
              >
                <span>START A PROJECT</span>
                <span aria-hidden="true">→</span>
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 border border-[var(--cream-ink)]/60 px-5 py-3.5 font-mono-tech text-xs tracking-[0.18em] text-[var(--cream-ink)] uppercase transition-colors hover:border-[var(--accent-bright)] hover:text-[var(--accent-bright)]"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? "COPIED" : "COPY EMAIL"}</span>
              </button>

              <span className="sr-only" aria-live="polite">
                {copied ? "Email address copied to clipboard" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
