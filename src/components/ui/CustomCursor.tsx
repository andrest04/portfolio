"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isCoarsePointer || prefersReducedMotion) {
      dot.style.display = "none";
      ring.style.display = "none";
      return;
    }

    document.documentElement.classList.add("custom-cursor-active");

    const xDot = gsap.quickTo(dot, "x", { duration: 0.05, ease: "none" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.05, ease: "none" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.08, ease: "power2.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.08, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const isInteractive = (el: Element | null): boolean => {
      if (!el) return false;
      return !!el.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor-hover]"
      );
    };

    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target as Element)) {
        gsap.to(ring, { scale: 1.8, opacity: 0.6, duration: 0.3 });
        gsap.to(dot, { scale: 0.5, duration: 0.3 });
      }
    };

    const onOut = (e: MouseEvent) => {
      if (isInteractive(e.target as Element)) {
        gsap.to(ring, { scale: 1, opacity: 0.4, duration: 0.3 });
        gsap.to(dot, { scale: 1, duration: 0.3 });
      }
    };

    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.8, duration: 0.15 });
      gsap.to(dot, { scale: 1.3, duration: 0.15 });
    };

    const onMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.15 });
      gsap.to(dot, { scale: 1, duration: 0.15 });
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <div className="h-2 w-2 rounded-full bg-accent-secondary shadow-[0_0_12px_var(--accent-secondary)]" />
      </div>
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2 opacity-40"
        aria-hidden="true"
      >
        <div className="h-8 w-8 rounded-full border border-accent-secondary/60" />
      </div>
    </>
  );
}
