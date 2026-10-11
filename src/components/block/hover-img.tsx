"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import "@/components/block/hover-img.css";

/*
 * Vendored from the ObsidianUI `hover-img` block. Patches:
 * - items accept an optional `content` node rendered below the row header
 *   (title + label); the header is wrapped in `.hover-img-project-header`;
 * - `imageSrc` is optional: without it the thumbnail slot renders a theme-aware
 *   placeholder panel (no `<img>`), so the stack keeps one slot per item;
 * - thumbnails are decorative (`aria-hidden`, empty `alt`);
 * - row titles render as `h3` instead of `h2` to keep a valid heading order
 *   under the section `h2`;
 * - the demo `defaultProjects` were removed, so `projects` is required;
 * - the hovered-row `opacity` dimming was removed (rows can hold links) and the
 *   title/label shift only applies to rows without `content`;
 * - with `prefers-reduced-motion: reduce` no listeners are attached, so the
 *   thumbnail stays hidden and nothing animates.
 * Everything else (gsap logic, `isContained`, `compact`) is unchanged.
 */
export interface HoverImgItem {
  title: string;
  label: string;
  imageSrc?: string;
  content?: React.ReactNode;
}

interface HoverImgProps {
  projects: HoverImgItem[];
  className?: string;
  isContained?: boolean; // New prop for grid previews
  compact?: boolean; // New prop for compact layout
}

export function HoverImg({ projects, className, isContained = false, compact = false }: HoverImgProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const xToRef = useRef<gsap.QuickToFunc | null>(null);
  const yToRef = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    const projectThumbnail = thumbnailRef.current;
    const projectsContainer = containerRef.current?.querySelector(
      ".hover-img-projects"
    ) as HTMLElement | null;

    if (!projectThumbnail || !projectsContainer) return;

    const projectElements = gsap.utils.toArray(
      ".hover-img-project",
      projectsContainer
    ) as HTMLElement[];
    const thumbnails = gsap.utils.toArray(
      ".hover-img-thumbnail",
      projectThumbnail
    ) as HTMLElement[];

    gsap.set(projectThumbnail, { scale: 0, xPercent: -50, yPercent: -50 });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    xToRef.current = gsap.quickTo(projectThumbnail, "x", {
      duration: 0.4,
      ease: "power3.out",
    });
    yToRef.current = gsap.quickTo(projectThumbnail, "y", {
      duration: 0.4,
      ease: "power3.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      let x = e.clientX;
      let y = e.clientY;

      if (isContained && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const halfWidth = projectThumbnail.offsetWidth / 2;
        const halfHeight = projectThumbnail.offsetHeight / 2;
        const inset = 16;
        x = Math.max(halfWidth + inset, Math.min(rect.width - halfWidth - inset, e.clientX - rect.left));
        y = Math.max(halfHeight + inset, Math.min(rect.height - halfHeight - inset, e.clientY - rect.top));
      }

      xToRef.current?.(x);
      yToRef.current?.(y);
    };

    const handleMouseLeave = () => {
      gsap.to(projectThumbnail, {
        scale: 0,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    projectsContainer.addEventListener("mousemove", handleMouseMove);
    projectsContainer.addEventListener("mouseleave", handleMouseLeave);

    const projectListeners: Array<() => void> = [];

    projectElements.forEach((project, index) => {
      const handleMouseEnter = () => {
        gsap.to(projectThumbnail, {
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });

        gsap.to(thumbnails, {
          yPercent: -100 * index,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      project.addEventListener("mouseenter", handleMouseEnter);
      projectListeners.push(() =>
        project.removeEventListener("mouseenter", handleMouseEnter)
      );
    });

    return () => {
      projectsContainer.removeEventListener("mousemove", handleMouseMove);
      projectsContainer.removeEventListener("mouseleave", handleMouseLeave);
      projectListeners.forEach((cleanup) => cleanup());
    };
  }, [projects, isContained]);

  return (
    <div className={`hover-img-container ${compact ? "hover-img-compact" : ""} ${className || ""}`} ref={containerRef}>
      <div className="hover-img-projects">
        {projects.map((project, index) => (
          <div
            className={`hover-img-project${project.content ? " hover-img-project--has-body" : ""}`}
            key={index}
          >
            <div className="hover-img-project-header">
              <h3>{project.title}</h3>
              <p>{project.label}</p>
            </div>
            {project.content ? (
              <div className="hover-img-project-body">{project.content}</div>
            ) : null}
          </div>
        ))}
      </div>

      <div
        className="hover-img-thumbnail-wrapper"
        ref={thumbnailRef}
        aria-hidden="true"
        style={isContained ? { position: "absolute" } : undefined}
      >
        {projects.map((project, index) => (
          <div className="hover-img-thumbnail" key={index}>
            {project.imageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={project.imageSrc} alt="" />
            ) : (
              <div className="hover-img-placeholder">
                <span>{project.title}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HoverImg;
