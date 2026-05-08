"use client";

import { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

export function useTimelineAnimation(lineRef: RefObject<HTMLDivElement | null>) {
  useGSAP(() => {
    if (!lineRef.current) return;

    if (prefersReducedMotion()) {
      gsap.set(lineRef.current, { scaleY: 1 });
      return;
    }

    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 0.5,
        },
      }
    );
  });
}
