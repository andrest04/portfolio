import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { Dictionary } from "@/types/i18n";

type FooterProps = { t: Dictionary };

const EMAIL = "andresalbertotorresgarcia@gmail.com";
const LINKEDIN = "https://linkedin.com/in/andres-torres-garcia";
const GITHUB = "https://github.com/andrest04";

export default function Footer({ t }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-border-subtle">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-text-primary">
              © {year} {t.hero.name}
            </p>
            <p className="text-xs text-text-secondary">{t.footer.rights}</p>
          </div>

          <nav
            aria-label="Social links"
            className="flex items-center gap-2"
          >
            <Link
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border-subtle text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <Github className="h-4 w-4" />
            </Link>
            <Link
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border-subtle text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
            <a
              href={`mailto:${EMAIL}`}
              aria-label="Email"
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border-subtle text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <Mail className="h-4 w-4" />
            </a>
          </nav>
        </div>

        <div className="border-t border-border-subtle py-4">
          <p className="text-center text-xs text-text-secondary">
            {t.footer.text}
          </p>
        </div>
      </div>
    </footer>
  );
}
