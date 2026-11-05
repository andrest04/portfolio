"use client";

import { useEffect } from "react";

/**
 * Opening a row closes the exclusive row above it, which would pull the opened row up
 * from under the pointer. This toggles the row itself so it can correct the scroll in
 * the same task, with no animation or painted jump. Enter and Space reach this as clicks,
 * and without script the native accordion still works.
 */
export default function LedgerRowAnchor() {
  useEffect(() => {
    const ledger = document.querySelector(".ledger");
    if (!ledger) return;

    const handleClick = (event: Event) => {
      const summary = (event.target as Element).closest("summary");
      const details = summary?.parentElement;
      if (!summary || !(details instanceof HTMLDetailsElement)) return;

      const before = summary.getBoundingClientRect().top;
      event.preventDefault();
      details.open = !details.open;

      const shift = summary.getBoundingClientRect().top - before;
      if (shift !== 0) {
        window.scrollBy({ top: shift, behavior: "instant" });
      }
    };

    ledger.addEventListener("click", handleClick);
    return () => ledger.removeEventListener("click", handleClick);
  }, []);

  return null;
}
