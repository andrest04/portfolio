import StratumEdge from "@/components/strata/StratumEdge";

type StripProps = {
  /** The band this strip opens; the strip links to it and names it. */
  bandId: string;
  tone: string;
  title: string;
  when: string;
  edge: number;
  /** How many strips come after this one: the ones it rests on while it waits at the fold. */
  below: number;
};

/** The id of the band's heading, which also takes focus when a link to the band is followed. */
export function stripId(bandId: string): string {
  return `${bandId}-title`;
}

/**
 * The head of a band, and the only place its name appears. On wide, tall screens it waits
 * at the bottom edge of the viewport, stacked on the heads of the bands after it, until
 * the reader reaches its band; everywhere else it simply sits at the top of the band.
 */
export default function Strip({ bandId, tone, title, when, edge, below }: StripProps) {
  return (
    <>
      {/* Links to the band land here, just above its head: a head that is still waiting
          at the fold is not where the band is, so it cannot be the target itself. */}
      <div id={bandId} data-focus={stripId(bandId)} />
      <div className={`strip tone--${tone}`} style={{ "--below": below } as React.CSSProperties}>
        <StratumEdge variant={edge} />
        <div className="strip__row">
          <h2 id={stripId(bandId)} className="strip__name" tabIndex={-1}>
            <a href={`#${bandId}`}>{title}</a>
          </h2>
          <p className="strip__when">{when}</p>
        </div>
      </div>
    </>
  );
}
