import type { Dictionary } from "@/types/i18n";

export default function SiteFooter({ t }: { t: Dictionary }) {
  return (
    <footer className="site-footer tone--basalt">
      <p>
        <strong>{t.footer.signature}</strong>
      </p>
      <p>{t.footer.status}</p>
      <p>© {new Date().getFullYear()}</p>
    </footer>
  );
}
