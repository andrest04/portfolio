import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import FooterBlock from "@/components/block/footer";
import { Dictionary } from "@/types/i18n";

type FooterProps = { t: Dictionary };

const EMAIL = "andresalbertotorresgarcia@gmail.com";
const LINKEDIN = "https://linkedin.com/in/andres-torres-garcia";
const GITHUB = "https://github.com/andrest04";

const LINK_CLASS =
  "inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border-subtle text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--text)/0.5)]";

export default function Footer({ t }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <FooterBlock
      className="mt-16"
      wordmark={t.hero.name}
      intro={
        <p className="text-sm leading-relaxed text-text-secondary max-w-md">
          {t.footer.text}
        </p>
      }
      legal={
        <div className="flex flex-col gap-1">
          <p className="text-sm text-text-primary">
            © {year} {t.hero.name}
          </p>
          <p className="text-xs text-text-secondary">{t.footer.rights}</p>
        </div>
      }
    >
      <nav aria-label="Social links" className="flex items-center gap-2">
        <Link
          href={GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className={LINK_CLASS}
        >
          <Github className="h-4 w-4" />
        </Link>
        <Link
          href={LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className={LINK_CLASS}
        >
          <Linkedin className="h-4 w-4" />
        </Link>
        <a href={`mailto:${EMAIL}`} aria-label="Email" className={LINK_CLASS}>
          <Mail className="h-4 w-4" />
        </a>
      </nav>
    </FooterBlock>
  );
}
