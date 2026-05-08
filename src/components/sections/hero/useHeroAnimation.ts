"use client";

import { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

type HeroRefs = {
  section: RefObject<HTMLElement | null>;
  eyebrow: RefObject<HTMLDivElement | null>;
  title: RefObject<HTMLHeadingElement | null>;
  subtitle: RefObject<HTMLParagraphElement | null>;
  cta: RefObject<HTMLDivElement | null>;
  portrait: RefObject<HTMLDivElement | null>;
  scrollIndicator: RefObject<HTMLDivElement | null>;
};

export function useHeroAnimation(refs: HeroRefs) {
  useGSAP(
    () => {
      const titleEl = refs.title.current;
      const ambient = [
        refs.eyebrow.current,
        refs.subtitle.current,
        refs.cta.current,
        refs.scrollIndicator.current,
      ].filter((el): el is HTMLDivElement | HTMLParagraphElement => el !== null);
      const portraitEl = refs.portrait.current;

      if (prefersReducedMotion()) {
        if (titleEl) gsap.set(titleEl, { opacity: 1 });
        if (portraitEl) gsap.set(portraitEl, { opacity: 1, scale: 1 });
        if (ambient.length) gsap.set(ambient, { opacity: 1, y: 0 });
        return;
      }

      if (portraitEl) {
        gsap.set(portraitEl, { opacity: 0, scale: 0.92, filter: "blur(12px)" });
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (titleEl) {
        const split = new SplitText(titleEl, { type: "chars,words" });
        gsap.set(titleEl, { opacity: 1 });
        gsap.set(split.chars, {
          opacity: 0,
          yPercent: 60,
          filter: "blur(8px)",
        });
        tl.to(split.chars, {
          opacity: 1,
          yPercent: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.018,
        });
      }

      if (portraitEl) {
        tl.to(
          portraitEl,
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "power2.out",
          },
          "-=0.7"
        );
      }

      if (ambient.length) {
        tl.fromTo(
          ambient,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
          },
          "-=0.6"
        );
      }
    },
    { scope: refs.section }
  );
}
