"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolio } from "./PortfolioContext";

gsap.registerPlugin(ScrollTrigger);

const CHAPTER_MAP: { id: string; label: string }[] = [
  { id: "hero", label: "01 / 08 — OPENING" },
  { id: "work", label: "02 / 08 — SELECTED WORK" },
  { id: "volumes", label: "03 / 08 — VOLUMES" },
  { id: "stack", label: "04 / 08 — THE STACK" },
  { id: "about", label: "05 / 08 — THE AUTHOR" },
  { id: "receipts", label: "06 / 08 — RECEIPTS" },
  { id: "for-hire", label: "07 / 08 — FOR HIRE" },
  { id: "contact", label: "08 / 08 — CONTACT" },
];

export function SmoothScrollController() {
  const { motionEnabled, setActiveChapter } = usePortfolio();

  useEffect(() => {
    let lenis: Lenis | null = null;
    let tickerFn: ((time: number) => void) | null = null;

    if (motionEnabled) {
      lenis = new Lenis({
        lerp: 0.12,
        smoothWheel: true,
        touchMultiplier: 1.4,
      });

      lenis.on("scroll", ScrollTrigger.update);

      tickerFn = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
    }

    // Chapter observation for nav & side chrome
    const triggers = CHAPTER_MAP.map(({ id, label }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: "top 45%",
        end: "bottom 45%",
        onEnter: () => setActiveChapter(label),
        onEnterBack: () => setActiveChapter(label),
      });
    }).filter(Boolean);

    // Refresh ScrollTrigger after fonts & images settle
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 600);

    return () => {
      window.clearTimeout(refreshTimer);
      triggers.forEach((t) => t?.kill());
      if (tickerFn) gsap.ticker.remove(tickerFn);
      lenis?.destroy();
    };
  }, [motionEnabled, setActiveChapter]);

  return null;
}
