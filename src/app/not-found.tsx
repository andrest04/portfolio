import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { getDictionary, type Locale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const { notFound: t, hero } = await getDictionary(locale);

  return { title: `${t.title} - ${hero.name}` };
}

export default async function NotFound() {
  const locale = (await getLocale()) as Locale;
  const { notFound: t } = await getDictionary(locale);

  return (
    <main id="main" tabIndex={-1} className="fault tone--ochre">
      <h1>{t.title}</h1>
      <p>{t.body}</p>
      <Link href="/" className="button">
        {t.home}
      </Link>
    </main>
  );
}
