"use client";

import { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

type HeroRefs = {
  section: RefObject<HTMLElement | null>;
  header: RefObject<HTMLDivElement | null>;
  title: RefObject<HTMLHeadingElement | null>;
  titleBefore: RefObject<HTMLSpanElement | null>;
  titleGradient: RefObject<HTMLSpanElement | null>;
  titleAfter: RefObject<HTMLSpanElement | null>;
  subtitle: RefObject<HTMLParagraphElement | null>;
  cta: RefObject<HTMLDivElement | null>;
  stack: RefObject<HTMLDivElement | null>;
  position: RefObject<HTMLDivElement | null>;
  scrollIndicator: RefObject<HTMLDivElement | null>;
};

export function useHeroAnimation(refs: HeroRefs) {
  useGSAP(
    () => {
      if (!refs.section.current || !refs.title.current) return;

      if (prefersReducedMotion()) {
        gsap.set(
          [
            refs.header.current,
            refs.title.current,
            refs.subtitle.current,
            refs.cta.current,
            refs.stack.current,
            refs.position.current,
            refs.scrollIndicator.current,
          ],
          { opacity: 1, y: 0 }
        );
        return;
      }

      const splitBefore = refs.titleBefore.current
        ? SplitText.create(refs.titleBefore.current, {
            type: "words,chars",
            mask: "words",
          })
        : null;
      const splitAfter = refs.titleAfter.current
        ? SplitText.create(refs.titleAfter.current, {
            type: "words,chars",
            mask: "words",
          })
        : null;

      gsap.set(refs.title.current, { opacity: 1 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        refs.header.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      );

      if (splitBefore?.chars?.length) {
        tl.fromTo(
          splitBefore.chars,
          { y: "100%" },
          { y: "0%", duration: 0.7, stagger: 0.02 },
          "-=0.3"
        );
      }

      tl.fromTo(
        refs.titleGradient.current,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "power2.inOut" },
        "-=0.2"
      );

      if (splitAfter?.chars?.length) {
        tl.fromTo(
          splitAfter.chars,
          { y: "100%" },
          { y: "0%", duration: 0.7, stagger: 0.02 },
          "-=0.4"
        );
      }

      tl
        .fromTo(
          refs.subtitle.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          refs.cta.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2"
        )
        .fromTo(
          refs.stack.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2"
        )
        .fromTo(
          refs.position.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          refs.scrollIndicator.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.1"
        );

      gsap.to(refs.scrollIndicator.current, {
        y: 8,
        duration: 1.5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2,
      });
    },
    { scope: refs.section }
  );
}
