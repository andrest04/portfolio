"use client";

import { useEffect } from "react";

/**
 * Lets each band settle once, the first time it enters the viewport. The start state
 * only exists under html.motion; this tells the inline guard in the layout that the
 * page hydrated, so the guard leaves that class in place.
 */
export default function SettleObserver({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.dataset.motion = "ready";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-settled");
          observer.unobserve(entry.target);
        }
      },
      /* A band settles once a little of it is inside the viewport, not at the very edge. */
      { rootMargin: "0px 0px -8% 0px" },
    );

    document
      .querySelectorAll("[data-settle]:not(.is-settled)")
      .forEach((band) => observer.observe(band));

    return () => observer.disconnect();
  }, [locale]);

  return null;
}
