"use client";

import { useRef, useCallback } from "react";
import { gsap } from "@/lib/gsap";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export default function TiltCard({
  children,
  className = "",
  intensity = 12,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      const glare = glareRef.current;
      if (!card || !glare) return;

      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotateY: x * intensity,
        rotateX: -y * intensity,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(glare, {
        opacity: 0.15,
        x: `${x * 100}%`,
        y: `${y * 100}%`,
        duration: 0.4,
        ease: "power2.out",
      });
    },
    [intensity]
  );

  const handleLeave = useCallback(() => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;

    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "power3.out",
    });

    gsap.to(glare, {
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className={className} style={{ perspective: "800px" }}>
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.25), transparent 60%)",
          }}
          aria-hidden="true"
        />
        {children}
      </div>
    </div>
  );
}
