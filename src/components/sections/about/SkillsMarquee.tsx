"use client";

import { useMemo } from "react";
import { DraggableMarquee } from "@/components/block/draggable-marquee";

type SkillsMarqueeProps = {
  skills: string[];
  label: string;
};

export default function SkillsMarquee({ skills, label }: SkillsMarqueeProps) {
  // The block re-runs its effect when `items` changes identity, so memoize.
  const items = useMemo(
    () =>
      Array.from(new Set(skills)).map((name) => ({
        id: name,
        // Symbolic only: renderItem below never hands it to next/image.
        src: "#",
        alt: name,
      })),
    [skills],
  );

  return (
    <DraggableMarquee
      items={items}
      label={label}
      speed={0.6}
      gapClassName="gap-2"
      itemClassName=""
      renderItem={(item) => (
        <span className="block select-none rounded-xl border border-border-default bg-surface-default px-3 py-1.5 text-xs text-text-secondary sm:text-sm">
          {String(item.id)}
        </span>
      )}
    />
  );
}
