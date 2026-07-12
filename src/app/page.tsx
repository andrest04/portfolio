import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import AboutSkills from "@/components/sections/AboutSkills";
import Contact from "@/components/sections/Contact";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "next-intl/server";

export default async function Page() {
  const locale = await getLocale();
  const t = await getDictionary(locale as "es" | "en");

  return (
    <>
      <Hero t={t} />
      <Projects t={t} />
      <Experience t={t} />
      <AboutSkills t={t} />
      <Contact t={t} />
    </>
  );
}
