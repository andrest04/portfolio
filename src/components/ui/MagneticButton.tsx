"use client";

import { useRef, ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/motion";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export default function MagneticButton({
  children,
  className,
  strength = 0.25,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate3d(0, 0, 0)";
  }

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`inline-block ${className ?? ""}`}
    >
      <div
        ref={ref}
        className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}
