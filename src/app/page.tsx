import SiteNav from "@/components/layout/SiteNav";
import RevealObserver from "@/components/motion/RevealObserver";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
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
      <section className="record">
        <Experience t={t.experience} />
        <Skills t={t.skills} />
      </section>
      <About t={t} />
      <Contact t={t} />
      <RevealObserver locale={locale} />
    </main>
  );
}
