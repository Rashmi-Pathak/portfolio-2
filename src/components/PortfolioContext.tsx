"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import type { AccentTheme } from "@/data/portfolio";

interface TransitionMeta {
  index?: string;
  title?: string;
}

interface PortfolioContextValue {
  accent: AccentTheme;
  setAccent: (theme: AccentTheme) => void;
  motionEnabled: boolean;
  toggleMotion: () => void;
  activeChapter: string;
  setActiveChapter: (chapter: string) => void;
  navigateWithTransition: (href: string, meta?: TransitionMeta) => void;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState<AccentTheme>("crimson");
  const [motionEnabled, setMotionEnabled] = useState<boolean>(true);
  const [activeChapter, setActiveChapter] = useState<string>(
    "01 / 08 — OPENING"
  );
  const [transitionMeta, setTransitionMeta] = useState<TransitionMeta | null>(
    null
  );

  const overlayRef = useRef<HTMLDivElement>(null);
  const isTransitioning = useRef(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setMotionEnabled(false);
    }
    const handleChange = (e: MediaQueryListEvent) => {
      setMotionEnabled(!e.matches);
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-accent", accent);
  }, [accent]);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-motion",
      motionEnabled ? "on" : "off"
    );
  }, [motionEnabled]);

  // Exit wipe once the new route renders
  useEffect(() => {
    if (!isTransitioning.current || !overlayRef.current) return;
    const el = overlayRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        isTransitioning.current = false;
        setTransitionMeta(null);
        gsap.set(el, { display: "none", xPercent: 100 });
      },
    });
    tl.to(el, {
      xPercent: -100,
      duration: 0.48,
      ease: "power4.inOut",
      delay: 0.06,
    });
  }, [pathname]);

  const navigateWithTransition = useCallback(
    (href: string, meta?: TransitionMeta) => {
      if (!motionEnabled || !overlayRef.current) {
        router.push(href);
        return;
      }

      if (isTransitioning.current) return;
      isTransitioning.current = true;
      setTransitionMeta(meta ?? null);

      const el = overlayRef.current;
      gsap.set(el, { display: "flex", xPercent: 100 });
      gsap.to(el, {
        xPercent: 0,
        duration: 0.42,
        ease: "power4.inOut",
        onComplete: () => {
          router.push(href);
        },
      });
    },
    [motionEnabled, router]
  );

  const setAccent = (theme: AccentTheme) => setAccentState(theme);
  const toggleMotion = () => setMotionEnabled((prev) => !prev);

  return (
    <PortfolioContext.Provider
      value={{
        accent,
        setAccent,
        motionEnabled,
        toggleMotion,
        activeChapter,
        setActiveChapter,
        navigateWithTransition,
      }}
    >
      {children}

      {/* Full-screen editorial slide/wipe transition curtain */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9990] hidden flex-col justify-between border-l-4 border-[var(--accent)] bg-[var(--charcoal-deep)] p-8 text-[var(--cream-ink)] sm:p-14"
      >
        <div className="flex items-center justify-between font-mono-tech text-xs tracking-[0.2em] uppercase opacity-70">
          <span>RASHMI PATHAK // ARCHIVE</span>
          <span>LOADING CHAPTER</span>
        </div>

        <div>
          {transitionMeta?.index && (
            <p className="font-mono-tech text-xs tracking-[0.22em] text-[var(--accent-bright)] uppercase">
              CHAPTER // {transitionMeta.index}
            </p>
          )}
          <p className="font-display mt-2 text-[clamp(3.2rem,9vw,8rem)] leading-[0.86]">
            {transitionMeta?.title ?? "SELECTED WORK"}
          </p>
        </div>

        <div className="h-[2px] w-full bg-[var(--accent)]" />
      </div>
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error("usePortfolio must be used inside PortfolioProvider");
  }
  return ctx;
}
