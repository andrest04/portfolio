"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

type MorphingBlobProps = {
  className?: string;
};

const SHAPES = [
  "63% 37% 54% 46% / 55% 48% 52% 45%",
  "44% 56% 68% 32% / 57% 38% 62% 43%",
  "58% 42% 33% 67% / 39% 58% 42% 61%",
  "52% 48% 47% 53% / 64% 41% 59% 36%",
  "37% 63% 51% 49% / 46% 64% 36% 54%",
];

export default function MorphingBlob({ className }: MorphingBlobProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.borderRadius = SHAPES[0];
      return;
    }

    let i = 0;
    el.style.borderRadius = SHAPES[0];
    const id = window.setInterval(() => {
      i = (i + 1) % SHAPES.length;
      el.style.borderRadius = SHAPES[i];
    }, 7000);

    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute -z-10 ${className ?? ""}`}
    >
      <div
        ref={ref}
        className="h-full w-full bg-[radial-gradient(closest-side,rgb(var(--surface)/0.18),rgb(var(--surface)/0.06)_55%,transparent_75%)] blur-3xl transition-[border-radius] duration-[7000ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-safe:animate-[blob-drift_28s_ease-in-out_infinite]"
        style={{ borderRadius: SHAPES[0] }}
      />
    </div>
  );
}
