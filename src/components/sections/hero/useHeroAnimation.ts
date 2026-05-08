"use client";

import { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

type HeroRefs = {
  section: RefObject<HTMLElement | null>;
  header: RefObject<HTMLDivElement | null>;
  title: RefObject<HTMLHeadingElement | null>;
  subtitle: RefObject<HTMLParagraphElement | null>;
  cta: RefObject<HTMLDivElement | null>;
  stack: RefObject<HTMLDivElement | null>;
  position: RefObject<HTMLDivElement | null>;
  scrollIndicator: RefObject<HTMLDivElement | null>;
};

export function useHeroAnimation(refs: HeroRefs) {
  useGSAP(
    () => {
      const targets = [
        refs.header.current,
        refs.title.current,
        refs.subtitle.current,
        refs.cta.current,
        refs.stack.current,
        refs.position.current,
        refs.scrollIndicator.current,
      ].filter((el): el is HTMLElement => el !== null);

      if (targets.length === 0) return;

      if (prefersReducedMotion()) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        targets,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.06,
        }
      );
    },
    { scope: refs.section }
  );
}
