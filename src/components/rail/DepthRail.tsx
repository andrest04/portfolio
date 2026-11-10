"use client";

import { useEffect, useRef, useState } from "react";
import LangSwitch from "@/components/layout/LangSwitch";
import { ArrowDownIcon, ChevronIcon } from "@/components/strata/Icons";
import type { Locale } from "@/lib/i18n";
import type { Dictionary, Tick } from "@/types/i18n";

export type RailStop = {
  /** The band the tick links to. */
  id: string;
  /** The element whose top edge decides when the band has been reached: its head. */
  headId: string;
  /** The employer or kind of work, in a word or two. */
  name: string;
  tick: Tick;
};

type DepthRailProps = {
  stops: RailStop[];
  labels: Dictionary["rail"];
  contactId: string;
  /** Shown at the top of the column as the way back to the start. */
  home: string;
  locale: Locale;
  language: { label: string; accessibleLabel: string };
};

/** A band becomes the current one when its head has risen to this share of the viewport height. */
const READING_LINE = 0.38;

const MENU_ID = "rail-menu";

/**
 * The persistent way around the page. The server renders every link, so the rail works
 * without script; script adds the current-period marker and the small-screen jump menu.
 * Until script runs the rail names no period, because it cannot know where the reader is.
 */
export default function DepthRail({ stops, labels, contactId, home, locale, language }: DepthRailProps) {
  const [current, setCurrent] = useState(stops[0]?.id);
  /* False until the position has been read once: before that no link claims to be the current one. */
  const [tracked, setTracked] = useState(false);
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const column = useRef<HTMLOListElement>(null);
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const heads = [...stops.map((stop) => ({ id: stop.id, head: document.getElementById(stop.headId) })), { id: contactId, head: document.getElementById(contactId) }];

    /* The current band is the last one whose head has crossed the reading line. A head
       still waiting at the bottom of the viewport is below the line, so it does not count. */
    const read = () => {
      const line = window.innerHeight * READING_LINE;
      let reached = heads[0].id;
      for (const { id, head } of heads) {
        if (head && head.getBoundingClientRect().top <= line) reached = id;
      }
      setCurrent(reached);
      setTracked(true);
    };

    /* Read on scroll, once per frame: a jump can carry a head past the line without it
       ever resting there, so watching for the crossing alone would miss it. */
    let frame = 0;
    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        read();
      });
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
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

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      toggle.current?.focus();
      setOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const currentStop = stops.find((stop) => stop.id === current);
  const marks = (id: string) => (tracked && id === current ? "location" : undefined);

  const ticks = stops.map((stop) => (
    <li key={stop.id}>
      <a href={`#${stop.id}`} className="tick" aria-current={marks(stop.id)} onClick={() => setOpen(false)}>
        <span className="tick__name">{stop.name}</span>{" "}
        <span className="tick__when">
          {stop.tick.year} · {stop.tick.note}
        </span>
      </a>
    </li>
  ));

  return (
    <nav className="rail tone--basalt" aria-label={labels.label}>
      <a href="#top" className="rail__home">
        {home}
      </a>

      {/* Focus or a press leaving the menu and its button closes it, so it never covers the focused control. */}
      <div
        className="rail__jump"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
        }}
      >
        <button
          type="button"
          className="rail__toggle"
          ref={toggle}
          aria-expanded={open}
          aria-controls={MENU_ID}
          onClick={() => setOpen((wasOpen) => !wasOpen)}
        >
          <span className="sr-only">{labels.jump}: </span>
          <span className="rail__now">{currentStop ? currentStop.name : labels.contact}</span>
          <ChevronIcon />
        </button>
        <ol className="rail__menu" id={MENU_ID} data-open={open}>
          {ticks}
          <li>
            <a href={`#${contactId}`} className="tick" aria-current={marks(contactId)} onClick={() => setOpen(false)}>
              <span className="tick__name">{labels.contact}</span>
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
          <a href="/api/cv" className="link" download>
            {labels.cv}
            <ArrowDownIcon />
          </a>
        </li>
        <li className="rail__contact">
          <a href={`#${contactId}`} className="link" aria-current={marks(contactId)}>
            {labels.contact}
          </a>
        </li>
        <li className="rail__language">
          <LangSwitch locale={locale} label={language.label} accessibleLabel={language.accessibleLabel} />
        </li>
      </ul>
    </nav>
  );
}
