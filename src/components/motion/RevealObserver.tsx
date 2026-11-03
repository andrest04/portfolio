"use client";

import { useEffect } from "react";

/**
 * Marks [data-reveal] elements once they enter the viewport, and pauses the one
 * looping picture while it is off screen. The hidden start state only applies under
 * html.js, and the inline script in the layout removes that class if this never runs.
 */
export default function RevealObserver({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.dataset.reveal = "ready";

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            reveal.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    document
      .querySelectorAll("[data-reveal]:not(.is-in)")
      .forEach((element) => reveal.observe(element));

    const loop = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        entry.target.classList.toggle("is-playing", entry.isIntersecting);
      }
    });
    document.querySelectorAll(".ledger").forEach((element) => loop.observe(element));

    return () => {
      reveal.disconnect();
      loop.disconnect();
    };
  }, [locale]);

  return null;
}
