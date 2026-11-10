import Masthead from "@/components/layout/Masthead";
import SettleObserver from "@/components/motion/SettleObserver";
import DepthRail, { type RailStop } from "@/components/rail/DepthRail";
import Bedrock from "@/components/strata/Bedrock";
import Close from "@/components/strata/Close";
import Hero from "@/components/strata/Hero";
import Stratum from "@/components/strata/Stratum";
import { numberSamples } from "@/components/strata/samples";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getLocale } from "next-intl/server";

/** The tone each period wears, from the surface down. Bedrock and the close set their own. */
const TONES = ["ochre", "oxide", "slate", "chalk"];

/** The anchor of the first entry, below the opening screen. */
const RECORD_ID = "record";

/** How many of the strata under the surface show their top edge on the opening screen. */
const EDGES_BELOW_SURFACE = 2;

export default async function Page() {
  const locale = (await getLocale()) as Locale;
  const t = await getDictionary(locale);

  const numbered = numberSamples(t);
  const strata = t.strata.map((stratum, index) => ({ stratum, tone: TONES[index % TONES.length] }));
  const [surface, ...deeper] = strata;

  const stops: RailStop[] = [
    ...t.strata.map(({ id, tick, company }) => ({ id, tick, title: company })),
    { id: t.bedrock.id, tick: t.bedrock.tick, title: t.bedrock.school },
  ];

  return (
    <>
      <Masthead
        t={t}
        locale={locale}
        targets={{ experience: RECORD_ID, education: t.bedrock.id, contact: t.contact.id }}
      />
      <DepthRail stops={stops} labels={t.rail} contactId={t.contact.id} />

      <main id="main" tabIndex={-1}>
        <Stratum
          stratum={surface.stratum}
          tone={surface.tone}
          edge={EDGES_BELOW_SURFACE}
          numbered={numbered}
          t={t}
          entryId={RECORD_ID}
          lead={
            <Hero
              t={t}
              recordId={RECORD_ID}
              below={deeper.slice(0, EDGES_BELOW_SURFACE)}
              numbered={numbered}
            />
          }
        />
        {deeper.map(({ stratum, tone }, index) => (
          <Stratum key={stratum.id} stratum={stratum} tone={tone} edge={index} numbered={numbered} t={t} />
        ))}
        <Bedrock t={t.bedrock} edge={deeper.length} />
        <Close t={t} edge={deeper.length + 1} />
        <SettleObserver locale={locale} />
      </main>
    </>
  );
}
