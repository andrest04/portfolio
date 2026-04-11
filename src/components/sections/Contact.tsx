"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import MagneticWrap from "@/components/ui/MagneticWrap";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Check,
  Copy,
  ArrowUpRight,
} from "lucide-react";
import { Dictionary } from "@/types/i18n";

type ContactProps = { t: Dictionary; lang: string };

export default function Contact({ t, lang }: ContactProps) {
  const [copied, setCopied] = useState(false);
  const c = t.contact;
  const isEs = lang === "es";

  const email = "andresalbertotorresgarcia@gmail.com";
  const phoneDisplay = "+51 984 300 217";
  const phoneHref = "+51984300217";
  const linkedin = "https://linkedin.com/in/andres-torres-garcia";
  const github = "https://github.com/andrest04";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24">
      <ScrollReveal>
        <div className="text-center">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-text-primary sm:text-4xl">
            {c.title}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-text-secondary sm:text-lg">
            {c.cardSubtitle}
          </p>
        </div>
      </ScrollReveal>

      <div className="mx-auto mt-10 max-w-4xl">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Email — spans 2 cols on lg */}
          <ScrollReveal delay={0.05} className="lg:col-span-2">
            <GlassCard
              hover={false}
              variant="solid"
              className="group relative h-full overflow-hidden p-5 sm:p-6 transition-all duration-300 hover:border-accent-primary/30 hover:shadow-[var(--shadow-glow-primary-md)]"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent-primary/10 text-accent-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-text-primary">
                    {c.emailLabel}
                  </p>
                </div>
                <button
                  onClick={handleCopy}
                  className="cursor-pointer rounded-lg border border-border-default bg-surface-default p-2.5 min-h-11 min-w-11 flex items-center justify-center text-text-tertiary transition-all hover:border-border-strong hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary-glow"
                  aria-label={isEs ? "Copiar email" : "Copy email"}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              <p className="mt-3 break-all text-sm text-text-secondary">
                {email}
              </p>

              {copied && (
                <p className="mt-2 text-xs font-medium text-green-400 animate-in fade-in duration-200">
                  {isEs ? "¡Copiado al portapapeles!" : "Copied to clipboard!"}
                </p>
              )}

              <div className="mt-4">
                <MagneticWrap>
                  <Button
                    asChild
                    size="sm"
                    className="rounded-xl bg-accent-primary hover:shadow-[var(--shadow-glow-primary-md)] hover:scale-[1.02]"
                  >
                    <a href={`mailto:${email}`}>
                      {isEs ? "Enviar email" : "Send email"}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </MagneticWrap>
              </div>
            </GlassCard>
          </ScrollReveal>

          {/* Phone */}
          <ScrollReveal delay={0.1}>
            <GlassCard
              hover={false}
              variant="solid"
              className="h-full p-5 sm:p-6 transition-all duration-300 hover:border-accent-secondary/30 hover:shadow-[var(--shadow-glow-secondary-sm)]"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent-secondary/10 text-accent-secondary">
                  <Phone className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium text-text-primary">
                  {c.phoneLabel}
                </p>
              </div>
              <a
                href={`tel:${phoneHref}`}
                className="mt-3 block cursor-pointer text-sm text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary-glow rounded-sm"
              >
                {phoneDisplay}
              </a>
            </GlassCard>
          </ScrollReveal>

          {/* Location */}
          <ScrollReveal delay={0.15}>
            <GlassCard hover={false} variant="solid" className="h-full p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent-tertiary/10 text-accent-tertiary">
                  <MapPin className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium text-text-primary">
                  {c.locationLabel}
                </p>
              </div>
              <p className="mt-3 text-sm text-text-secondary">
                {c.locationValue}
              </p>
            </GlassCard>
          </ScrollReveal>

          {/* LinkedIn */}
          <ScrollReveal delay={0.2}>
            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              className="block h-full"
            >
              <GlassCard
                hover={false}
                className="group h-full p-6 transition-all duration-300 hover:border-[#0A66C2]/30 hover:shadow-[0_0_24px_rgba(10,102,194,0.15)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#0A66C2]/10 text-[#0A66C2]">
                      <Linkedin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        {c.linkedinLabel}
                      </p>
                      <p className="text-xs text-text-tertiary">
                        andres-torres-garcia
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-text-tertiary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text-secondary" />
                </div>
              </GlassCard>
            </a>
          </ScrollReveal>

          {/* GitHub */}
          <ScrollReveal delay={0.25}>
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="block h-full"
            >
              <GlassCard
                hover={false}
                className="group h-full p-6 transition-all duration-300 hover:border-text-primary/20 hover:shadow-[0_0_24px_rgba(255,255,255,0.08)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-surface-strong text-text-primary">
                      <Github className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        {c.githubLabel}
                      </p>
                      <p className="text-xs text-text-tertiary">andrest04</p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-text-tertiary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text-secondary" />
                </div>
              </GlassCard>
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
