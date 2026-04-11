"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { gsap } from "@/lib/gsap";

function useHasLoaded() {
  const subscribe = useCallback((cb: () => void) => {
    window.addEventListener("storage", cb);
    return () => window.removeEventListener("storage", cb);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => sessionStorage.getItem("loaded") === "1",
    () => false
  );
}

export default function PageLoader() {
  const hasLoaded = useHasLoaded();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasLoaded || !overlayRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("loaded", "1");
        overlayRef.current?.remove();
      },
    });

    tl.fromTo(
      ".loader-logo",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
    )
      .to(".loader-logo", {
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        delay: 0.6,
        ease: "power2.in",
      })
      .to(
        overlayRef.current,
        {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.6,
          ease: "power3.inOut",
        },
        "-=0.2"
      );
  }, [hasLoaded]);

  if (hasLoaded) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[rgb(var(--bg))]"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <div className="loader-logo flex flex-col items-center gap-3 opacity-0">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-surface-medium text-2xl font-semibold text-text-primary shadow-[var(--shadow-glow-primary-md)] border border-border-medium">
          AT.
        </div>
        <div className="h-0.5 w-12 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary" />
      </div>
    </div>
  );
}
