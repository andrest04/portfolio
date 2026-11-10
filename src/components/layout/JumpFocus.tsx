"use client";

import { useEffect } from "react";

/**
 * After an in-page link is followed, moves keyboard focus to the place it leads to, so the
 * next Tab continues from there and not from the top of the page. The browser still does
 * the scrolling; the target takes focus without a ring because nothing was activated on it.
 */
export default function JumpFocus() {
  useEffect(() => {
    const follow = (event: MouseEvent) => {
      if (event.defaultPrevented || !(event.target instanceof Element)) return;

      const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
      const id = link?.getAttribute("href")?.slice(1);
      if (!id) return;

      const landing = document.getElementById(id) ?? (id === "top" ? document.querySelector("main") : null);
      if (!(landing instanceof HTMLElement)) return;

      /* A landing point may name the region it stands for; that region takes the focus. */
      const named = landing.dataset.focus ? document.getElementById(landing.dataset.focus) : null;
      const target = named ?? landing;

      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      /* After the browser has followed the link: following it clears focus when the
         landing point itself cannot take it. */
      window.setTimeout(() => target.focus({ preventScroll: true }), 0);
    };

    document.addEventListener("click", follow);
    return () => document.removeEventListener("click", follow);
  }, []);

  return null;
}
