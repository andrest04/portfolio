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

const MENU_ID = "rail-menu";

/**
 * The persistent way around the page. The server renders every link, so the rail works
 * without script; script adds the current-period marker and the small-screen jump menu.
 * Until script runs the rail names no period, because it cannot know where the reader is.
 */
export default function DepthRail({ stops, labels, contactId }: DepthRailProps) {
  const [current, setCurrent] = useState(stops[0]?.id);
  /* False until the observer has reported once: before that no link claims to be the current one. */
  const [tracked, setTracked] = useState(false);
  const [open, setOpen] = useState(false);
  const rail = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const column = useRef<HTMLOListElement>(null);
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(entry.target.id);
        }
        setTracked(true);
      },
      { rootMargin: READING_LINE },
    );

    for (const id of [...stops.map((stop) => stop.id), contactId]) {
      const band = document.getElementById(id);
      if (band) observer.observe(band);
    }

    return () => observer.disconnect();
  }, [stops, contactId]);

  /* The marker is one bar that travels to the current tick, so a change of period reads as movement. */
  useEffect(() => {
    const place = () => {
      const bar = marker.current;
      const tick = column.current?.querySelector<HTMLElement>('[aria-current="location"]');
      if (!bar) return;
      bar.dataset.parked = tick ? "false" : "true";
      if (tick) bar.style.transform = `translateY(${tick.offsetTop}px)`;
    };

    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [current, tracked]);

  useEffect(() => {
    if (!open) return;

    const close = (event: Event) => {
      if (event instanceof KeyboardEvent) {
        if (event.key !== "Escape") return;
        toggle.current?.focus();
      } else if (rail.current?.contains(event.target as Node)) {
        return;
      }
      setOpen(false);
    };

    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  const currentStop = stops.find((stop) => stop.id === current);
  const marks = (id: string) => (tracked && id === current ? "location" : undefined);

  const ticks = stops.map((stop) => (
    <li key={stop.id}>
      <a
        href={`#${stop.id}`}
        className="tick"
        aria-current={marks(stop.id)}
        onClick={() => setOpen(false)}
      >
        <span className="tick__year">{stop.tick.year}</span>
        <span className="tick__note">{stop.tick.note}</span>
        <span className="tick__title">{stop.title}</span>
      </a>
    </li>
  ));

  return (
    <nav className="rail tone--basalt" aria-label={labels.label} ref={rail}>
      <p className="rail__title">
        {labels.title.map((line) => (
          <span key={line} className="block">
            {line}{" "}
          </span>
        ))}
      </p>

      <div className="rail__jump">
        <button
          type="button"
          className="rail__toggle"
          ref={toggle}
          aria-expanded={open}
          aria-controls={MENU_ID}
          onClick={() => setOpen((wasOpen) => !wasOpen)}
        >
          <span className="sr-only">{labels.jump}: </span>
          {currentStop ? (
            <span className="rail__now">
              <b>{currentStop.tick.year}</b>
              <span className="tick__note">{currentStop.tick.note}</span>
            </span>
          ) : (
            <span className="rail__now">
              <b>{labels.contact}</b>
            </span>
          )}
          <ChevronIcon />
        </button>
        <ol className="rail__menu" id={MENU_ID} data-open={open}>
          {ticks}
          <li>
            <a
              href={`#${contactId}`}
              className="tick"
              aria-current={marks(contactId)}
              onClick={() => setOpen(false)}
            >
              <span className="tick__word">{labels.contact}</span>
            </a>
          </li>
        </ol>
      </div>

      <ol className="rail__ticks" ref={column}>
        {ticks}
        <li aria-hidden="true">
          <span className="rail__marker" ref={marker} />
        </li>
      </ol>

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
            aria-current={marks(contactId)}
          >
            {labels.contact}
          </a>
        </li>
      </ul>
    </nav>
  );
}
