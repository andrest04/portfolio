import ExternalLink from "@/components/layout/ExternalLink";
import { ArrowOutIcon } from "@/components/strata/Icons";
import SamplePicture from "@/components/strata/SamplePicture";
import type { NumberedSample } from "@/components/strata/samples";
import type { Dictionary } from "@/types/i18n";

type SampleProps = {
  sample: NumberedSample;
  t: Dictionary;
};

export default function Sample({ sample, t }: SampleProps) {
  const { project, number } = sample;
  const { record } = t;
  const titleId = `sample-${project.id}-title`;
  const links = [
    { href: project.links.live, label: record.live },
    { href: project.links.github, label: record.github },
  ];

  return (
    <article id={`sample-${project.id}`} className="sample" aria-labelledby={titleId}>
      <div className="sample__text">
        <h3 id={titleId} className="sample__title">
          <span className="tag">
            {record.sample} {number}
          </span>{" "}
          {project.name}
        </h3>
        <p className="sample__period">{project.period}</p>
        <p className="sample__what">{project.what}</p>

        <dl className="sample__record">
          <div>
            <dt className="label">{record.did}</dt>
            <dd>{project.did}</dd>
          </div>
          <div>
            <dt className="label">{record.facts}</dt>
            <dd>
              <ul>
                {project.facts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt className="label">{record.tech}</dt>
            <dd>{project.tech.join(", ")}</dd>
          </div>
        </dl>

        <p className="sample__links">
          {links.map(
            (link) =>
              link.href && (
                <ExternalLink key={link.label} href={link.href} notice={t.meta.newTab} className="link">
                  {link.label}
                  <span className="sr-only">: {project.name}</span>
                  <ArrowOutIcon />
                </ExternalLink>
              ),
          )}
        </p>
      </div>

      <SamplePicture image={project.image} copy={record.missingPicture} />
    </article>
  );
}
