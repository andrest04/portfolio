"use client";

import { RefObject, useEffect } from "react";
import { gsap } from "@/lib/gsap";

export function useNavIndicator(
  navRef: RefObject<HTMLElement | null>,
  indicatorRef: RefObject<HTMLDivElement | null>,
  activeSection: string
) {
  useEffect(() => {
    if (!indicatorRef.current || !navRef.current) return;

    const activeLink = navRef.current.querySelector(
      `[data-section="${activeSection}"]`
    ) as HTMLElement | null;

    if (!activeLink) return;

    const navRect = navRef.current.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    gsap.to(indicatorRef.current, {
      x: linkRect.left - navRect.left,
      width: linkRect.width,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [activeSection, indicatorRef, navRef]);
}
