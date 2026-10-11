"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const VPrism = dynamic(() => import("@/components/block/v-prism"), {
  ssr: false,
});

const EDGE_FADE =
  "linear-gradient(to bottom, transparent, black 14%, black 80%, transparent)";

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return false;
    // Release the probe context right away so it does not count against the browser limit.
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/**
 * Full-bleed Hero background. Renders the v-prism WebGL scene only while the
 * hero is near the viewport, and a static glow when motion is reduced or
 * WebGL is unavailable. The presets' background (#000 / #fff) already equals
 * the page background token (--bg), so only the vertical edges need a fade.
 */
export default function HeroPrismBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const [canRender, setCanRender] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setCanRender(!media.matches && supportsWebGL());
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canRender) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px 0px" },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      setInView(false);
    };
  }, [canRender]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2"
    >
      {canRender && inView ? (
        <div
          className="absolute inset-0"
          style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
        >
          <VPrism className="absolute inset-0 h-full w-full" />
        </div>
      ) : (
        <div className="absolute left-[60%] top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(var(--surface)/0.10),rgb(var(--surface)/0.04)_55%,transparent_80%)] blur-3xl" />
      )}
      {/* Scrim keeps the text column readable over bright rays, in both themes. */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/45 to-transparent lg:via-background/30" />
    </div>
  );
}
