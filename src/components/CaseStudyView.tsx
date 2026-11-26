"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, ArrowUpRight, Maximize2, X } from "lucide-react";
import {
  CASE_STUDIES,
  getCaseStudyBySlug,
  type CaseStudy,
  type CaseStudyMedia,
} from "@/data/caseStudies";
import { PROFILE } from "@/data/portfolio";
import { usePortfolio } from "./PortfolioContext";

gsap.registerPlugin(ScrollTrigger);

function SchematicPanel({
  study,
  caption,
}: {
  study: CaseStudy;
  caption: string;
}) {
  return (
    <div
      className="relative overflow-hidden border p-6 sm:p-10"
      style={{
        backgroundColor: study.theme.surface,
        borderColor: study.theme.border,
        color: study.theme.text,
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3 font-mono-tech text-[10px] tracking-[0.18em] uppercase"
        style={{ borderColor: study.theme.border }}
      >
        <span style={{ color: study.theme.accent }}>
          ILLUSTRATIVE ARCHITECTURE SCHEMATIC // {study.name}
        </span>
        <span style={{ color: study.theme.muted }}>
          CONCEPTUAL DIAGRAM (NOT A LIVE SCREENSHOT)
        </span>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {study.architectureNodes.map((node, i) => (
          <div
            key={node.step}
            className="relative border p-4"
            style={{
              backgroundColor: study.theme.bg,
              borderColor: study.theme.border,
            }}
          >
            <div className="flex items-center justify-between font-mono-tech text-[10px]">
              <span style={{ color: study.theme.accent }}>STEP {node.step}</span>
              {i < study.architectureNodes.length - 1 && (
                <span aria-hidden="true" style={{ color: study.theme.muted }}>
                  →
                </span>
              )}
            </div>
            <div className="font-display mt-3 text-2xl leading-none">
              {node.label}
            </div>
            <p
              className="mt-2 font-mono-tech text-[11px] leading-relaxed"
              style={{ color: study.theme.muted }}
            >
              {node.detail}
            </p>
          </div>
        ))}
      </div>

      <p
        className="mt-5 font-mono-tech text-[11px]"
        style={{ color: study.theme.muted }}
      >
        {caption}
      </p>
    </div>
  );
}

function MediaFrame({
  media,
  study,
  priority = false,
  onExpand,
}: {
  media: CaseStudyMedia;
  study: CaseStudy;
  priority?: boolean;
  onExpand?: (media: CaseStudyMedia) => void;
}) {
  if (media.type === "schematic") {
    return <SchematicPanel study={study} caption={media.caption} />;
  }

  if (media.type === "video" && media.src) {
    return (
      <figure
        className="cs-reveal overflow-hidden border"
        style={{
          backgroundColor: study.theme.surface,
          borderColor: study.theme.border,
        }}
      >
        <video
          src={media.src}
          controls
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={media.alt}
          className="h-auto w-full bg-black object-cover"
        />
        <figcaption
          className="border-t px-4 py-3 font-mono-tech text-[11px] tracking-[0.08em]"
          style={{
            borderColor: study.theme.border,
            color: study.theme.muted,
          }}
        >
          {media.caption}
        </figcaption>
      </figure>
    );
  }

  return (
    <figure
      className="cs-reveal group relative overflow-hidden border"
      style={{
        backgroundColor: study.theme.surface,
        borderColor: study.theme.border,
      }}
    >
      <div className="relative overflow-hidden">
        <img
          src={media.src}
          alt={media.alt}
          loading={priority ? "eager" : "lazy"}
          className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
        {onExpand && (
          <button
            type="button"
            onClick={() => onExpand(media)}
            aria-label={`Expand ${media.alt} in lightbox`}
            className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center border border-white/30 bg-black/70 text-white opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
          >
            <Maximize2 size={15} />
          </button>
        )}
      </div>
      <figcaption
        className="border-t px-4 py-3 font-mono-tech text-[11px] tracking-[0.08em]"
        style={{
          borderColor: study.theme.border,
          color: study.theme.muted,
        }}
      >
        {media.caption}
      </figcaption>
    </figure>
  );
}

export function CaseStudyView({ study }: { study: CaseStudy }) {
  const { motionEnabled, navigateWithTransition, setActiveChapter } =
    usePortfolio();
  const rootRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [lightboxMedia, setLightboxMedia] = useState<CaseStudyMedia | null>(null);
  const nextStudy = getCaseStudyBySlug(study.nextProjectSlug) ?? CASE_STUDIES[0];

  const openLightbox = (media: CaseStudyMedia) => {
    setLightboxMedia(media);
    dialogRef.current?.showModal();
  };

  const closeLightbox = () => {
    dialogRef.current?.close();
    setLightboxMedia(null);
  };

  useEffect(() => {
    setActiveChapter(`VOL. ${study.index} / 16 — ${study.name}`);
  }, [study.index, study.name, setActiveChapter]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [study.slug]);

  useEffect(() => {
    if (!motionEnabled || !rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".cs-kicker", { y: 14, opacity: 0, duration: 0.4 })
        .from(".cs-title", { y: 36, opacity: 0, duration: 0.6 }, "-=0.25")
        .from(".cs-ghost", { scale: 0.92, opacity: 0, duration: 0.55 }, "-=0.45")
        .from(
          ".cs-hero-sub",
          { y: 18, opacity: 0, stagger: 0.08, duration: 0.45 },
          "-=0.35"
        )
        .from(
          ".cs-hero-media",
          { clipPath: "inset(8% 0% 8% 0%)", opacity: 0, duration: 0.7 },
          "-=0.35"
        );

      gsap.utils.toArray<HTMLElement>(".cs-reveal").forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            once: true,
          },
        });
      });

      gsap.from(".cs-feature-row", {
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".cs-feature-list",
          start: "top 82%",
          once: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [motionEnabled, study.slug]);

  return (
    <div ref={rootRef} className="relative min-h-screen bg-[var(--paper)]">
      {/* 01 — PROJECT OPENING / HERO (Warm Ivory Paper) */}
      <section className="relative overflow-hidden border-b border-[var(--ink)] bg-[var(--paper)] pt-10 pb-14 sm:pt-16 sm:pb-20">
        <div className="paper-grain-light absolute inset-0 z-0" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={() =>
                navigateWithTransition("/#work", {
                  index: "02",
                  title: "SELECTED WORK",
                })
              }
              className="inline-flex items-center gap-2 font-mono-tech text-[11px] tracking-[0.18em] text-[var(--ink)] uppercase transition-colors hover:text-[var(--accent)]"
            >
              <ArrowLeft size={14} />
              <span>BACK TO SELECTED WORK</span>
            </button>

            <span className="cs-kicker inline-flex items-center gap-2 font-mono-tech text-[11px] tracking-[0.2em] text-[var(--accent)] uppercase">
              <span className="h-2 w-2 bg-[var(--accent)]" aria-hidden="true" />
              {study.index} / SELECTED WORK · {study.category}
            </span>
          </div>

          {/* Title + Ghosted Number */}
          <div className="relative mt-8 flex items-end justify-between gap-6">
            <div className="max-w-5xl">
              <p className="cs-kicker font-mono-tech text-xs tracking-[0.2em] text-[var(--muted)] uppercase">
                {study.subtitle}
              </p>
              <h1 className="cs-title font-display mt-3 text-[clamp(3.6rem,11vw,9.8rem)] leading-[0.84] text-[var(--ink)]">
                {study.name}
              </h1>
            </div>

            <div
              className="cs-ghost font-display text-outline-ghost pointer-events-none hidden select-none text-[clamp(7rem,16vw,14rem)] leading-none md:block"
              aria-hidden="true"
            >
              {study.index}
            </div>
          </div>

          <p className="cs-hero-sub font-editorial mt-7 max-w-3xl text-2xl leading-[1.25] text-[var(--ink)] not-italic sm:text-3xl">
            {study.summary}
          </p>

          {/* Hero Primary Action Links: Visit Live Website + View Source on GitHub */}
          <div className="cs-hero-sub mt-7 flex flex-wrap items-center gap-4">
            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-skew inline-flex items-center gap-2 bg-[var(--ink)] px-6 py-3.5 font-mono-tech text-xs tracking-[0.18em] text-[var(--cream-ink)] uppercase transition-colors hover:bg-[var(--accent)]"
              >
                <span>VISIT LIVE WEBSITE</span>
                <ArrowUpRight size={14} />
              </a>
            )}
            <a
              href={study.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[var(--ink)] px-5 py-3.5 font-mono-tech text-xs tracking-[0.18em] text-[var(--ink)] uppercase transition-colors hover:bg-[var(--ink)] hover:text-[var(--cream-ink)]"
            >
              <span>VIEW SOURCE ON GITHUB</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* 02 — HORIZONTAL METADATA STRIP */}
          <dl className="cs-hero-sub mt-10 grid grid-cols-2 gap-6 border-t border-[var(--ink)] pt-6 sm:grid-cols-3 lg:grid-cols-6">
            <div>
              <dt className="font-mono-tech text-[10px] tracking-[0.18em] text-[var(--muted)] uppercase">
                PROJECT
              </dt>
              <dd className="mt-1 font-mono-tech text-xs font-semibold uppercase">
                {study.index} // {study.name}
              </dd>
            </div>
            <div>
              <dt className="font-mono-tech text-[10px] tracking-[0.18em] text-[var(--muted)] uppercase">
                TYPE
              </dt>
              <dd className="mt-1 font-mono-tech text-xs uppercase">
                {study.category}
              </dd>
            </div>
            <div>
              <dt className="font-mono-tech text-[10px] tracking-[0.18em] text-[var(--muted)] uppercase">
                ROLE
              </dt>
              <dd className="mt-1 font-mono-tech text-xs uppercase">
                {study.role}
              </dd>
            </div>
            <div className="col-span-2 sm:col-span-1 lg:col-span-1">
              <dt className="font-mono-tech text-[10px] tracking-[0.18em] text-[var(--muted)] uppercase">
                REPOSITORY
              </dt>
              <dd className="mt-1">
                <a
                  href={study.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono-tech text-xs font-semibold text-[var(--accent)] uppercase hover:underline"
                >
                  <span>GITHUB</span>
                  <ArrowUpRight size={13} />
                </a>
              </dd>
            </div>
            {study.liveUrl && (
              <div>
                <dt className="font-mono-tech text-[10px] tracking-[0.18em] text-[var(--muted)] uppercase">
                  LIVE DEMO
                </dt>
                <dd className="mt-1">
                  <a
                    href={study.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono-tech text-xs font-semibold text-[var(--ink)] uppercase hover:text-[var(--accent)]"
                  >
                    <span>OPEN LIVE</span>
                    <ArrowUpRight size={13} />
                  </a>
                </dd>
              </div>
            )}
            <div className="col-span-2 sm:col-span-3 lg:col-span-1">
              <dt className="font-mono-tech text-[10px] tracking-[0.18em] text-[var(--muted)] uppercase">
                PRIMARY STACK
              </dt>
              <dd className="mt-1 font-mono-tech text-[11px] uppercase">
                {study.stack.slice(0, 4).join(" · ")}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 03 — HERO PRODUCT VISUAL (In Project-Specific Visual Identity) */}
      <section
        className="relative border-b border-[var(--ink)] py-12 sm:py-16"
        style={{ backgroundColor: study.theme.bg, color: study.theme.text }}
      >
        <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-14">
          <div className="cs-hero-media">
            <MediaFrame media={study.heroMedia} study={study} priority />
          </div>
        </div>
      </section>

      {/* 04 — PROJECT OVERVIEW + EDITORIAL PROBLEM / APPROACH SPREAD */}
      <section className="relative border-b border-[var(--ink)] bg-[var(--paper)] py-16 sm:py-24">
        <div className="paper-grain-light absolute inset-0 z-0" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-14">
          {/* Overview 3-column summary */}
          <div className="cs-reveal mb-14 grid grid-cols-1 gap-6 border-b border-[var(--ink)] pb-12 md:grid-cols-3">
            <div className="border border-[var(--ink)] p-6">
              <p className="font-mono-tech text-[10px] tracking-[0.18em] text-[var(--accent)] uppercase">
                01 // WHAT IS THIS PROJECT
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]/85">
                {study.overview.whatItIs}
              </p>
            </div>
            <div className="border border-[var(--ink)] p-6">
              <p className="font-mono-tech text-[10px] tracking-[0.18em] text-[var(--accent)] uppercase">
                02 // WHO IT IS FOR
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]/85">
                {study.overview.whoItIsFor}
              </p>
            </div>
            <div className="border border-[var(--ink)] p-6">
              <p className="font-mono-tech text-[10px] tracking-[0.18em] text-[var(--accent)] uppercase">
                03 // WHAT MAKES IT DIFFERENT
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]/85">
                {study.overview.whatMakesItDifferent}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="cs-reveal lg:col-span-5">
              <p className="font-mono-tech text-[11px] tracking-[0.2em] text-[var(--accent)] uppercase">
                // PROBLEM &amp; SOLUTION
              </p>
              <h2 className="font-editorial mt-3 text-4xl leading-[1.06] text-[var(--ink)] not-italic sm:text-5xl">
                {study.problemHeading}
              </h2>
            </div>

            <div className="cs-reveal space-y-6 text-base leading-relaxed text-[var(--ink)]/85 sm:text-lg lg:col-span-7">
              <div>
                <h3 className="font-mono-tech text-[11px] tracking-[0.18em] text-[var(--muted)] uppercase">
                  THE PROBLEM
                </h3>
                <p className="mt-2">{study.problem}</p>
              </div>
              <div className="border-t border-[var(--rule)] pt-5">
                <h3 className="font-mono-tech text-[11px] tracking-[0.18em] text-[var(--muted)] uppercase">
                  THE SOLUTION
                </h3>
                <p className="mt-2">{study.approach}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — BESPOKE PROJECT IDENTITY: ARCHITECTURE & SYSTEM BREAKDOWN */}
      <section
        className="relative py-16 sm:py-24"
        style={{ backgroundColor: study.theme.bg, color: study.theme.text }}
      >
        <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-14">
          {/* Architecture Map */}
          <div className="cs-reveal">
            <p
              className="font-mono-tech text-[11px] tracking-[0.2em] uppercase"
              style={{ color: study.theme.accent }}
            >
              // SYSTEM ARCHITECTURE
            </p>
            <h2 className="font-display mt-2 text-4xl sm:text-6xl">
              {study.architectureTitle}
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {study.architectureNodes.map((node, i) => (
                <div
                  key={node.step}
                  className="relative border p-5"
                  style={{
                    backgroundColor: study.theme.surface,
                    borderColor: study.theme.border,
                  }}
                >
                  <div className="flex items-center justify-between font-mono-tech text-[10px] tracking-[0.16em]">
                    <span style={{ color: study.theme.accent }}>
                      NODE {node.step}
                    </span>
                    {i < study.architectureNodes.length - 1 && (
                      <span style={{ color: study.theme.accentSecondary }}>→</span>
                    )}
                  </div>
                  <h3 className="font-display mt-3 text-2xl">{node.label}</h3>
                  <p
                    className="mt-2 font-mono-tech text-xs leading-relaxed"
                    style={{ color: study.theme.muted }}
                  >
                    {node.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Numbered Feature Breakdown */}
          <div className="cs-feature-list mt-16 border-t pt-12" style={{ borderColor: study.theme.border }}>
            <p
              className="font-mono-tech text-[11px] tracking-[0.2em] uppercase"
              style={{ color: study.theme.accent }}
            >
              // VERIFIED CAPABILITIES
            </p>
            <div className="mt-6 divide-y" style={{ borderColor: study.theme.border }}>
              {study.sections.map((sec) => (
                <div
                  key={sec.num}
                  className="cs-feature-row grid grid-cols-1 items-baseline gap-4 py-6 lg:grid-cols-12"
                >
                  <div className="flex items-center gap-4 lg:col-span-5">
                    <span
                      className="px-2 py-0.5 font-mono-tech text-[11px] font-bold text-black"
                      style={{ backgroundColor: study.theme.accent }}
                    >
                      {sec.num}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl">
                      {sec.title}
                    </h3>
                  </div>
                  <div className="lg:col-span-2">
                    <span
                      className="font-mono-tech text-[10px] tracking-[0.16em] uppercase"
                      style={{ color: study.theme.accentSecondary }}
                    >
                      {sec.tag}
                    </span>
                  </div>
                  <p
                    className="text-sm leading-relaxed sm:text-base lg:col-span-5"
                    style={{ color: study.theme.muted }}
                  >
                    {sec.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Full Stack Chips */}
          <div className="mt-12 border-t pt-8" style={{ borderColor: study.theme.border }}>
            <p
              className="font-mono-tech text-[10px] tracking-[0.18em] uppercase"
              style={{ color: study.theme.muted }}
            >
              VERIFIED REPOSITORY STACK
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {study.stack.map((tech) => (
                <span
                  key={tech}
                  className="border px-3 py-1.5 font-mono-tech text-xs"
                  style={{
                    borderColor: study.theme.border,
                    backgroundColor: study.theme.surface,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 06 — GALLERY / PRODUCT EVIDENCE */}
      {study.gallery.length > 0 && (
        <section
          className="border-t py-16 sm:py-24"
          style={{
            backgroundColor: study.theme.surface,
            borderColor: study.theme.border,
            color: study.theme.text,
          }}
        >
          <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-14">
            <p
              className="font-mono-tech text-[11px] tracking-[0.2em] uppercase"
              style={{ color: study.theme.accent }}
            >
              // PRODUCT EVIDENCE &amp; INTERFACES
            </p>
            <h2 className="font-display mt-2 text-4xl sm:text-5xl">
              INSIDE {study.name}
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-8">
              {study.gallery.map((item, idx) => (
                <MediaFrame
                  key={idx}
                  media={item}
                  study={study}
                  onExpand={openLightbox}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 07 — CLOSING PROJECT PANEL (Crimson Accent) */}
      <section className="relative border-t border-[var(--ink)] bg-[var(--accent)] py-16 text-[var(--cream-ink)] sm:py-24">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-14">
          <p className="font-mono-tech text-[11px] tracking-[0.2em] uppercase opacity-80">
            // CHAPTER {study.index} COMPLETE
          </p>
          <h2 className="font-display mt-3 max-w-4xl text-[clamp(2.6rem,6.5vw,5.5rem)] leading-[0.88]">
            {study.closingLine}
          </h2>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-skew inline-flex items-center gap-2 bg-[var(--ink)] px-6 py-3.5 font-mono-tech text-xs tracking-[0.18em] text-[var(--cream-ink)] uppercase transition-colors hover:bg-[var(--cream-ink)] hover:text-[var(--ink)]"
              >
                <span>VISIT LIVE WEBSITE</span>
                <ArrowUpRight size={14} />
              </a>
            )}

            <a
              href={study.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[var(--cream-ink)] px-5 py-3.5 font-mono-tech text-xs tracking-[0.18em] uppercase transition-colors hover:bg-[var(--cream-ink)] hover:text-[var(--ink)]"
            >
              <span>VIEW SOURCE ON GITHUB</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Next Volume + Back to Selected Work */}
          <div className="mt-14 flex flex-col justify-between gap-6 border-t border-[var(--cream-ink)]/30 pt-8 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() =>
                navigateWithTransition("/#volumes", {
                  index: "16",
                  title: "PROJECT VOLUMES",
                })
              }
              className="inline-flex items-center gap-2 font-mono-tech text-xs tracking-[0.18em] uppercase hover:underline"
            >
              <ArrowLeft size={14} />
              <span>BACK TO 16-VOLUME ARCHIVE</span>
            </button>

            <button
              type="button"
              onClick={() =>
                navigateWithTransition(`/work/${nextStudy.slug}`, {
                  index: nextStudy.index,
                  title: nextStudy.name,
                })
              }
              className="group inline-flex items-center gap-3 text-right"
            >
              <div>
                <div className="font-mono-tech text-[10px] tracking-[0.18em] uppercase opacity-75">
                  NEXT VOLUME
                </div>
                <div className="font-display text-3xl sm:text-4xl">
                  VOL. {nextStudy.index} — {nextStudy.name}
                </div>
              </div>
              <ArrowRight
                size={22}
                className="transition-transform group-hover:translate-x-1.5"
              />
            </button>
          </div>
        </div>
      </section>

      {/* 08 — COLOPHON FOOTER */}
      <footer className="bg-[var(--charcoal-deep)] py-12 text-[var(--cream-ink)]">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-6 px-5 font-mono-tech text-xs sm:px-10 lg:px-14">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center bg-[var(--accent)] font-display text-sm">
              {study.index}
            </span>
            <span className="tracking-[0.16em] uppercase">
              END OF CASE STUDY · {PROFILE.name}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 tracking-[0.14em] uppercase">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent-bright)]"
            >
              GITHUB
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent-bright)]"
            >
              LINKEDIN
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="hover:text-[var(--accent-bright)]"
            >
              EMAIL
            </a>
          </div>
        </div>
      </footer>

      {/* Native Accessible Lightbox Dialog */}
      <dialog
        ref={dialogRef}
        onClick={(e) => {
          if (e.target === dialogRef.current) closeLightbox();
        }}
        aria-label={lightboxMedia ? lightboxMedia.alt : "Image lightbox"}
        className="m-auto max-h-[90vh] max-w-[92vw] border border-[var(--cream-ink)]/30 bg-[#0b0a09] p-0 text-[var(--cream-ink)] backdrop:bg-black/85"
      >
        {lightboxMedia && lightboxMedia.src && (
          <div className="relative flex flex-col">
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close lightbox"
              className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center border border-white/30 bg-black/80 text-white hover:bg-[var(--accent)]"
            >
              <X size={16} />
            </button>
            <img
              src={lightboxMedia.src}
              alt={lightboxMedia.alt}
              className="max-h-[80vh] w-auto object-contain"
            />
            <p className="border-t border-white/15 px-4 py-3 font-mono-tech text-xs text-white/80">
              {lightboxMedia.caption}
            </p>
          </div>
        )}
      </dialog>
    </div>
  );
}
