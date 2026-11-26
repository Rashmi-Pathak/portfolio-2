"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface TargetCursorProps {
  targetSelector?: string;
  spinDuration?: number;
  hideDefaultCursor?: boolean;
}

export function TargetCursor({
  targetSelector = "a, button, [role='button'], .cursor-target",
  spinDuration = 2.6,
  hideDefaultCursor = true,
}: TargetCursorProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;

    const root = rootRef.current;
    const dot = dotRef.current;
    const corners = cornersRef.current.filter(Boolean) as HTMLDivElement[];
    if (!root || !dot || corners.length !== 4) return;

    if (hideDefaultCursor) {
      document.documentElement.style.cursor = "none";
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let activeTarget: HTMLElement | null = null;
    let cachedRect: DOMRect | null = null;
    let spinAngle = 0;
    let needsFrame = false;

    const cornerSize = 12;
    const idleRadius = 15;
    const padding = 6;

    const snapToRect = (rect: DOMRect) => {
      const targetOffsets = [
        { x: rect.left - padding, y: rect.top - padding },
        { x: rect.right + padding - cornerSize, y: rect.top - padding },
        {
          x: rect.right + padding - cornerSize,
          y: rect.bottom + padding - cornerSize,
        },
        { x: rect.left - padding, y: rect.bottom + padding - cornerSize },
      ];
      corners.forEach((c, i) => {
        gsap.to(c, {
          x: targetOffsets[i].x,
          y: targetOffsets[i].y,
          rotation: 0,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    const updateTicker = () => {
      if (activeTarget) {
        if (needsFrame) {
          dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
          needsFrame = false;
        }
        return;
      }

      spinAngle = (spinAngle + 360 / (spinDuration * 60)) % 360;
      const rad = (spinAngle * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);

      const offsets = [
        { x: -idleRadius, y: -idleRadius },
        { x: idleRadius - cornerSize, y: -idleRadius },
        { x: idleRadius - cornerSize, y: idleRadius - cornerSize },
        { x: -idleRadius, y: idleRadius - cornerSize },
      ];

      for (let i = 0; i < 4; i++) {
        const ox = offsets[i].x;
        const oy = offsets[i].y;
        const rx = mouseX + (ox * cos - oy * sin);
        const ry = mouseY + (ox * sin + oy * cos);
        corners[i].style.transform = `translate3d(${rx}px, ${ry}px, 0) rotate(${spinAngle}deg)`;
      }

      if (needsFrame) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        needsFrame = false;
      }
    };

    gsap.ticker.add(updateTicker);

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      needsFrame = true;
      if (root.style.opacity !== "1") root.style.opacity = "1";

      const el = (e.target as HTMLElement | null)?.closest(
        targetSelector
      ) as HTMLElement | null;

      if (el !== activeTarget) {
        activeTarget = el;
        if (el) {
          cachedRect = el.getBoundingClientRect();
          snapToRect(cachedRect);
        } else {
          cachedRect = null;
          gsap.killTweensOf(corners);
        }
      }
    };

    const onScroll = () => {
      if (activeTarget) {
        cachedRect = activeTarget.getBoundingClientRect();
        snapToRect(cachedRect);
      }
    };

    const onMouseLeave = () => {
      root.style.opacity = "0";
      activeTarget = null;
      cachedRect = null;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      gsap.ticker.remove(updateTicker);
      gsap.killTweensOf(corners);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onMouseLeave);
      if (hideDefaultCursor) {
        document.documentElement.style.cursor = "";
      }
    };
  }, [targetSelector, spinDuration, hideDefaultCursor]);

  return (
    <div
      ref={rootRef}
      className="target-cursor hidden opacity-0 lg:block"
      aria-hidden="true"
    >
      <div
        ref={(el) => {
          cornersRef.current[0] = el;
        }}
        className="target-cursor__corner target-cursor__corner--tl"
      />
      <div
        ref={(el) => {
          cornersRef.current[1] = el;
        }}
        className="target-cursor__corner target-cursor__corner--tr"
      />
      <div
        ref={(el) => {
          cornersRef.current[2] = el;
        }}
        className="target-cursor__corner target-cursor__corner--br"
      />
      <div
        ref={(el) => {
          cornersRef.current[3] = el;
        }}
        className="target-cursor__corner target-cursor__corner--bl"
      />
      <div ref={dotRef} className="target-cursor__dot" />
      <div className="target-cursor__label" />
    </div>
  );
}
