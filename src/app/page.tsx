import { Fragment } from "react";
import JumpFocus from "@/components/layout/JumpFocus";
import Masthead from "@/components/layout/Masthead";
import SettleObserver from "@/components/motion/SettleObserver";
import DepthRail, { type RailStop } from "@/components/rail/DepthRail";
import Bedrock from "@/components/strata/Bedrock";
import Close from "@/components/strata/Close";
import Stratum from "@/components/strata/Stratum";
import Strip, { stripId } from "@/components/strata/Strip";
import Surface from "@/components/strata/Surface";
import { stratumTitle } from "@/components/strata/samples";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getLocale } from "next-intl/server";

/** The tone each period wears, from the surface down. Education and the close set their own. */
const TONES = ["ochre", "oxide", "slate", "chalk"];

/** The anchor of the first entry, below the opening screen. */
const RECORD_ID = "record";

export default async function Page() {
  const locale = (await getLocale()) as Locale;
  const t = await getDictionary(locale);

  const [surface, ...deeper] = t.strata;

  /* Every band under the surface, in page order, with the head that opens it. */
  const bands = [
    ...deeper.map((stratum, index) => ({
      id: stratum.id,
      tone: TONES[(index + 1) % TONES.length],
      title: stratumTitle(stratum.company, stratum.role),
      when: `${stratum.period}, ${stratum.location}`,
      body: <Stratum stratum={stratum} tone={TONES[(index + 1) % TONES.length]} t={t} />,
    })),
    {
      id: t.bedrock.id,
      tone: "basalt",
      title: stratumTitle(t.bedrock.school, t.bedrock.degree),
      when: t.bedrock.period,
      body: <Bedrock t={t.bedrock} />,
    },
  ];

  const stops: RailStop[] = [
    { id: surface.id, headId: surface.id, name: surface.short, tick: surface.tick },
    ...deeper.map(({ id, short, tick }) => ({ id, headId: stripId(id), name: short, tick })),
    { id: t.bedrock.id, headId: stripId(t.bedrock.id), name: t.bedrock.short, tick: t.bedrock.tick },
  ];

  return (
    <>
      <Masthead
        t={t}
        locale={locale}
        targets={{ experience: RECORD_ID, education: t.bedrock.id, contact: t.contact.id }}
      />
      <DepthRail
        stops={stops}
        labels={t.rail}
        contactId={t.contact.id}
        home={t.hero.name}
        locale={locale}
        language={{ label: t.meta.otherLanguage, accessibleLabel: t.meta.switchLanguage }}
      />

      {/* The heads are children of main itself, because a head can only wait at the fold
          while the element that contains it is still on screen. */}
      <main id="main" tabIndex={-1} style={{ "--strips": bands.length } as React.CSSProperties}>
        <Surface stratum={surface} tone={TONES[0]} recordId={RECORD_ID} t={t} />
        {bands.flatMap((band, index) => [
          <Strip
            key={`${band.id}-head`}
            bandId={band.id}
            tone={band.tone}
            title={band.title}
            when={band.when}
            edge={index}
            below={bands.length - 1 - index}
          />,
          <Fragment key={band.id}>{band.body}</Fragment>,
        ])}
        <Close t={t} edge={bands.length} />
        <SettleObserver locale={locale} />
        <JumpFocus />
      </main>
    </>
  );
}
