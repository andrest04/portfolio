"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Linkedin, Github, Check, Copy } from "lucide-react";
import { Dictionary } from "@/types/i18n";

type ContactProps = { t: Dictionary };

export default function Contact({ t }: ContactProps) {
  const [copied, setCopied] = useState(false);
  const c = t.contact;

  const email = "andresalbertotorresgarcia@gmail.com";
  const phoneDisplay = "+51 984 300 217";
  const phoneHref = "+51984300217";
  const linkedin = "https://linkedin.com/in/andres-torres-garcia";
  const github = "https://github.com/andrest04";
  const location = c.locationValue;

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24">
      <ScrollReveal>
        <h2 className="text-center text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          {c.title}
        </h2>
      </ScrollReveal>

      <div className="mx-auto mt-8 max-w-3xl">
        <ScrollReveal delay={0.1} y={40}>
          <GlassCard variant="solid" className="p-6 sm:p-8">
            <div>
              <h3 className="text-lg font-semibold text-text-primary">
                {c.cardTitle}
              </h3>
              <p className="mt-1 text-sm text-text-secondary">
                {c.cardSubtitle}
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-4">
                <IconBox aria-hidden="true">
                  <Mail className="h-4 w-4" />
                </IconBox>
                <div>
                  <p className="text-sm font-medium text-text-primary">{c.emailLabel}</p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(email);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="group cursor-pointer break-all text-sm text-text-secondary underline-offset-4 transition-colors duration-200 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary-glow rounded-sm inline-flex items-center gap-2"
                  >
                    <span className="hover:underline">{email}</span>
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-green-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 opacity-0 group-hover:opacity-60 transition-opacity" />
                    )}
                  </button>
                  {copied && (
                    <span className="text-xs text-green-400 animate-in fade-in slide-in-from-left-2 duration-200">
                      {t.contact.locationLabel === "Ubicación" ? "¡Copiado!" : "Copied!"}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <IconBox aria-hidden="true">
                  <Phone className="h-4 w-4" />
                </IconBox>
                <div>
                  <p className="text-sm font-medium text-text-primary">{c.phoneLabel}</p>
                  <a
                    href={`tel:${phoneHref}`}
                    className="cursor-pointer text-sm text-text-secondary underline-offset-4 transition-colors duration-200 hover:text-text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary-glow rounded-sm"
                  >
                    {phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <IconBox aria-hidden="true">
                  <MapPin className="h-4 w-4" />
                </IconBox>
                <div>
                  <p className="text-sm font-medium text-text-primary">{c.locationLabel}</p>
                  <p className="text-sm text-text-secondary">{location}</p>
                </div>
              </div>
            </div>

            <div className="my-6 h-px w-full bg-border-default" />

            <div>
              <p className="text-sm font-semibold text-text-primary">
                {c.socialTitle}
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <SocialBtn href={linkedin} label={c.linkedinLabel}>
                  <Linkedin className="h-4 w-4" />
                </SocialBtn>

                <SocialBtn href={github} label={c.githubLabel}>
                  <Github className="h-4 w-4" />
                </SocialBtn>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </div>
    </section>
  );
}

function IconBox({ children, "aria-hidden": ariaHidden }: { children: React.ReactNode; "aria-hidden"?: boolean | "true" | "false" }) {
  return (
    <div aria-hidden={ariaHidden} className="mt-0.5 grid h-11 w-11 place-items-center rounded-2xl border border-border-default bg-surface-default text-accent-primary backdrop-blur-[var(--glass-backdrop)]">
      {children}
    </div>
  );
}

function SocialBtn({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      asChild
      className="rounded-2xl"
    >
      <a href={href} target="_blank" rel="noreferrer" className="cursor-pointer">
        <span className="text-accent-primary">{children}</span>
        <span className="text-text-secondary">{label}</span>
        <span className="sr-only">(opens in new tab)</span>
      </a>
    </Button>
  );
}
