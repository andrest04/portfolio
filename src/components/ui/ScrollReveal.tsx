"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  y = 30,
  duration = 0.8,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      gsap.fromTo(
        el,
        { opacity: 0, y },
        { opacity: 1, y: 0, duration, delay, ease: "power3.out" }
      );
    };

    const reset = () => {
      played = false;
      gsap.to(el, { opacity: 0, y, duration: 0.3, ease: "power2.in" });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            play();
            if (once) observer.unobserve(el);
          } else if (!once) {
            reset();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [delay, duration, once, y]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
