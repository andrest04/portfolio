import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import { getDictionary } from "@/lib/i18n";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getDictionary(lang as "es" | "en");

  return (
    <>
      <Hero t={t} />
      <Projects t={t} />
      <About t={t} />
      <Skills t={t} />
      <Contact t={t} />
    </>
  );
}
