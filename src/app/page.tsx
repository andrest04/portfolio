import SiteNav from "@/components/layout/SiteNav";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getLocale } from "next-intl/server";

export default async function Page() {
  const locale = (await getLocale()) as Locale;
  const t = await getDictionary(locale);

  return (
    <main id="main" tabIndex={-1}>
      <SiteNav t={t} locale={locale} />
      <Hero t={t} locale={locale} />
      <Work t={t} />
    </main>
  );
}
