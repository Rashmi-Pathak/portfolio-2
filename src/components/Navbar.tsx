"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { usePortfolio } from "./PortfolioContext";
import type { AccentTheme } from "@/data/portfolio";
import { getCaseStudyBySlug } from "@/data/caseStudies";

const NAV_LINKS = [
  { href: "/#work", num: "02", label: "WORK" },
  { href: "/#stack", num: "04", label: "STACK" },
  { href: "/#about", num: "05", label: "ABOUT" },
  { href: "/#contact", num: "08", label: "CONTACT" },
];

const SWATCHES: { id: AccentTheme; label: string; color: string }[] = [
  { id: "crimson", label: "Crimson accent", color: "#b51f2b" },
  { id: "terracotta", label: "Terracotta accent", color: "#9e3528" },
  { id: "cobalt", label: "Cobalt accent", color: "#1d498f" },
  { id: "forest", label: "Forest accent", color: "#226142" },
];

export function Navbar() {
  const {
    accent,
    setAccent,
    motionEnabled,
    toggleMotion,
    activeChapter,
    navigateWithTransition,
  } = usePortfolio();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isWorkDetail = pathname.startsWith("/work/");
  const slug = isWorkDetail ? pathname.replace("/work/", "") : "";
  const activeStudy = slug ? getCaseStudyBySlug(slug) : undefined;
  const activeNum = isWorkDetail ? "02" : activeChapter.slice(0, 2);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--ink)] bg-[var(--paper)]">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4 sm:px-8 lg:px-12">
        {/* Left: RP Monogram + Name + Case Study Breadcrumb */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            onClick={(e) => {
              if (isWorkDetail) {
                e.preventDefault();
                navigateWithTransition("/", { index: "01", title: "RASHMI PATHAK" });
              }
            }}
            className="group flex items-center gap-3 focus-visible:outline-none"
            aria-label="Rashmi Pathak — Back to home"
          >
            <span className="flex h-7 w-7 items-center justify-center bg-[var(--ink)] font-display text-sm tracking-tight text-[var(--cream-ink)] transition-transform duration-200 group-hover:scale-105">
              RP
            </span>
            <span className="font-mono-tech text-[11px] tracking-[0.2em] text-[var(--ink)] uppercase">
              RASHMI PATHAK
            </span>
          </Link>

          {activeStudy && (
            <span className="hidden items-center gap-2 border-l border-[var(--rule)] pl-3 font-mono-tech text-[10px] tracking-[0.18em] text-[var(--accent)] uppercase sm:inline-flex">
              <span>WORK / {activeStudy.index}</span>
            </span>
          )}
        </div>

        {/* Desktop Right Nav */}
        <div className="hidden items-center gap-7 md:flex">
          <nav aria-label="Primary" className="flex items-center gap-6">
            {NAV_LINKS.map((link) => {
              const isActive = activeNum === link.num;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`font-mono-tech text-[11px] tracking-[0.16em] uppercase transition-colors ${
                    isActive
                      ? "text-[var(--accent)] font-semibold"
                      : "text-[var(--ink)] hover:text-[var(--accent)]"
                  }`}
                >
                  <span className="mr-1.5 text-[10px] opacity-55">
                    {link.num}
                  </span>
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Swatches */}
          <div
            className="flex items-center gap-2 border-l border-[var(--rule)] pl-5"
            role="group"
            aria-label="Accent color theme"
          >
            {SWATCHES.map((sw) => {
              const selected = accent === sw.id;
              return (
                <button
                  key={sw.id}
                  type="button"
                  onClick={() => setAccent(sw.id)}
                  aria-label={sw.label}
                  aria-pressed={selected}
                  className={`relative flex h-6 w-6 items-center justify-center rounded-full transition-transform hover:scale-110 ${
                    selected ? "ring-1 ring-[var(--ink)] ring-offset-1 ring-offset-[var(--paper)]" : ""
                  }`}
                >
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: sw.color }}
                  />
                </button>
              );
            })}
          </div>

          {/* Motion Toggle */}
          <button
            type="button"
            onClick={toggleMotion}
            aria-label={
              motionEnabled
                ? "Motion ON — click to pause non-essential animations"
                : "Motion OFF — click to enable animations"
            }
            className="flex items-center gap-2 border-l border-[var(--rule)] pl-5 font-mono-tech text-[11px] tracking-[0.16em] text-[var(--ink)] uppercase transition-colors hover:text-[var(--accent)]"
          >
            <span
              className={`h-2 w-2 rounded-full ${
                motionEnabled ? "bg-[var(--accent)]" : "bg-[var(--muted)]"
              }`}
              aria-hidden="true"
            />
            <span>MOTION {motionEnabled ? "ON" : "OFF"}</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={toggleMotion}
            aria-label={motionEnabled ? "Turn motion off" : "Turn motion on"}
            className="flex items-center gap-1.5 font-mono-tech text-[10px] tracking-[0.14em] uppercase"
          >
            <span
              className={`h-2 w-2 rounded-full ${
                motionEnabled ? "bg-[var(--accent)]" : "bg-[var(--muted)]"
              }`}
            />
            {motionEnabled ? "ON" : "OFF"}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center border border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)]"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-[var(--ink)] bg-[var(--paper)] px-6 py-5 md:hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between border-b border-[var(--rule)] pb-2 font-mono-tech text-xs tracking-[0.18em] uppercase"
              >
                <span>
                  <span className="mr-2 text-[var(--accent)]">{link.num}</span>
                  {link.label}
                </span>
                <span aria-hidden="true">→</span>
              </a>
            ))}
          </nav>
          <div className="mt-4 flex items-center justify-between">
            <span className="font-mono-tech text-[10px] tracking-[0.16em] text-[var(--muted)] uppercase">
              INK SWATCH
            </span>
            <div className="flex items-center gap-3">
              {SWATCHES.map((sw) => (
                <button
                  key={sw.id}
                  type="button"
                  onClick={() => setAccent(sw.id)}
                  aria-label={sw.label}
                  aria-pressed={accent === sw.id}
                  className={`flex h-7 w-7 items-center justify-center rounded-full ${
                    accent === sw.id ? "ring-1 ring-[var(--ink)]" : ""
                  }`}
                >
                  <span
                    className="h-3.5 w-3.5 rounded-full"
                    style={{ backgroundColor: sw.color }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
