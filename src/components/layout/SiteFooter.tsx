import type { Dictionary } from "@/types/i18n";

export default function SiteFooter({ t }: { t: Dictionary }) {
  return (
    <footer className="site-footer">
      <p>{t.footer.description}</p>
      <p>© {new Date().getFullYear()}</p>
    </footer>
  );
}
