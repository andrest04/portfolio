import Entry from "@/components/strata/Entry";
import type { Dictionary, Stratum as StratumContent } from "@/types/i18n";

type StratumProps = {
  stratum: StratumContent;
  tone: string;
  t: Dictionary;
};

/** The body of a band. Its heading is the strip rendered just before it in the page. */
export default function Stratum({ stratum, tone, t }: StratumProps) {
  return (
    <div className={`stratum tone--${tone}`} data-settle>
      <div className="stratum__inner">
        <Entry stratum={stratum} t={t} />
      </div>
    </div>
  );
}
