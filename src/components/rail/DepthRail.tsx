"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownIcon, ChevronIcon } from "@/components/strata/Icons";
import type { Dictionary, Tick } from "@/types/i18n";

export type RailStop = {
  id: string;
  tick: Tick;
  /** Who or what the period belongs to: the employer, or the school. */
  title: string;
};

type DepthRailProps = {
  stops: RailStop[];
  labels: Dictionary["rail"];
  contactId: string;
};

/** A line just above the middle of the viewport: the band crossing it is the current one. */
const READING_LINE = "-45% 0px -55% 0px";

/**
 * The persistent way around the page. It is rendered on the server with the first
 * period marked, so every link works without script; script only moves the marker.
 */
export default function DepthRail({ stops, labels, contactId }: DepthRailProps) {
  const [current, setCurrent] = useState(stops[0]?.id);
  const jump = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(entry.target.id);
        }
      },
      { rootMargin: READING_LINE },
    );

    for (const id of [...stops.map((stop) => stop.id), contactId]) {
      const band = document.getElementById(id);
      if (band) observer.observe(band);
    }

    return () => observer.disconnect();
  }, [stops, contactId]);

  useEffect(() => {
    const closeFromOutside = (event: Event) => {
      const menu = jump.current;
      if (!menu?.open) return;
      const pressedEscape = event instanceof KeyboardEvent && event.key === "Escape";
      const pressedOutside = event.type === "pointerdown" && !menu.contains(event.target as Node);
      if (pressedEscape || pressedOutside) menu.open = false;
    };

    document.addEventListener("pointerdown", closeFromOutside);
    document.addEventListener("keydown", closeFromOutside);
    return () => {
      document.removeEventListener("pointerdown", closeFromOutside);
      document.removeEventListener("keydown", closeFromOutside);
    };
  }, []);

  const closeMenu = () => {
    if (jump.current) jump.current.open = false;
  };

  const currentStop = stops.find((stop) => stop.id === current);

  const ticks = stops.map((stop) => (
    <li key={stop.id}>
      <a
        href={`#${stop.id}`}
        className="tick"
        aria-current={stop.id === current ? "location" : undefined}
        onClick={closeMenu}
      >
        <span className="tick__year">{stop.tick.year}</span>
        <span className="tick__note">{stop.tick.note}</span>
        <span className="tick__title">{stop.title}</span>
      </a>
    </li>
  ));

  return (
    <nav className="rail tone--basalt" aria-label={labels.label}>
      <p className="rail__title label">
        {labels.title.map((line) => (
          <span key={line} className="block">
            {line}{" "}
          </span>
        ))}
      </p>

      <details className="rail__jump" ref={jump}>
        <summary>
          <span className="sr-only">{labels.jump}: </span>
          {currentStop ? (
            <span className="rail__now">
              <b>{currentStop.tick.year}</b>
              <span className="label">{currentStop.tick.note}</span>
            </span>
          ) : (
            <span className="rail__now label">{labels.contact}</span>
          )}
          <ChevronIcon />
        </summary>
        <ol className="rail__menu">
          {ticks}
          <li>
            <a
              href={`#${contactId}`}
              className="tick"
              aria-current={current === contactId ? "location" : undefined}
              onClick={closeMenu}
            >
              <span className="tick__word">{labels.contact}</span>
            </a>
          </li>
        </ol>
      </details>

      <ol className="rail__ticks">{ticks}</ol>

      <ul className="rail__actions">
        <li>
          <a href="/api/cv" className="link">
            {labels.cv}
            <ArrowDownIcon />
          </a>
        </li>
        <li className="rail__contact">
          <a
            href={`#${contactId}`}
            className="link"
            aria-current={current === contactId ? "location" : undefined}
          >
            {labels.contact}
          </a>
        </li>
      </ul>
    </nav>
  );
}
