import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Stats from "@/components/sections/Stats";
import AboutSkills from "@/components/sections/AboutSkills";
import Contact from "@/components/sections/Contact";
import { getDictionary } from "@/lib/i18n";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getDictionary(lang as "es" | "en");

  return (
    <>
      <Hero t={t} />
      <Projects t={t} />
      <Experience t={t} />
      <Stats t={t} />
      <AboutSkills t={t} />
      <Contact t={t} />
    </>
  );
}
