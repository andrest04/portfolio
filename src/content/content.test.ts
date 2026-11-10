import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

type Project = {
  id: string;
  role: string;
  facts: string[];
  links: { live: string | null; github: string | null };
  image: { src: string; alt: string; width: number; height: number };
};

type Content = {
  record: Record<string, string>;
  strata: Array<{ id: string; short: string; projects: string[] }>;
  projects: Project[];
};

const LOCALES = ["en", "es"] as const;

/** Claims the repositories do not support, so project copy must never make them. */
const BANNED_IN_PROJECT_COPY = ["2FA", "Cloudinary", "e-commerce"];

function load(name: string): Json {
  return JSON.parse(readFileSync(new URL(name, import.meta.url), "utf8")) as Json;
}

function loadContent(locale: string): Content {
  return load(`./${locale}.json`) as unknown as Content;
}

/**
 * Reduces a dictionary to its shape: object keys, array lengths, and value types,
 * so a difference is reported by its path without comparing the translated text.
 */
function shape(value: Json, path = "$"): string[] {
  if (Array.isArray(value)) {
    return [`${path}: array(${value.length})`, ...value.flatMap((item, index) => shape(item, `${path}[${index}]`))];
  }
  if (value !== null && typeof value === "object") {
    return Object.keys(value)
      .sort()
      .flatMap((key) => shape(value[key], `${path}.${key}`));
  }
  return [`${path}: ${value === null ? "null" : typeof value}`];
}

function isHttpsUrlOrNull(value: unknown): boolean {
  return value === null || (typeof value === "string" && value.startsWith("https://"));
}

test("en.json and es.json have the same keys, array lengths, and value types", () => {
  assert.deepEqual(shape(load("./es.json")), shape(load("./en.json")));
});

for (const locale of LOCALES) {
  test(`${locale}: every project states both links as an https URL or an explicit null`, () => {
    const { projects } = loadContent(locale);
    assert.ok(Array.isArray(projects) && projects.length > 0, "projects must be a non-empty array");

    for (const project of projects) {
      for (const key of ["live", "github"] as const) {
        assert.ok(key in project.links, `${project.id}: links.${key} must be present`);
        assert.ok(isHttpsUrlOrNull(project.links[key]), `${project.id}: links.${key} must be https or null`);
      }
    }
  });

  test(`${locale}: every project has a described picture in /work`, () => {
    for (const project of loadContent(locale).projects) {
      assert.ok(project.image, `${project.id}: image must be present`);
      assert.match(project.image.src, /^\/work\/[\w-]+\.(png|webp)$/, `${project.id}: image.src`);
      assert.ok(project.image.alt.trim().length > 0, `${project.id}: image.alt`);
      assert.ok(project.image.width > 0 && project.image.height > 0, `${project.id}: image size`);
    }
  });

  test(`${locale}: strata reference existing projects, and each project sits in exactly one stratum`, () => {
    const { strata, projects } = loadContent(locale);
    assert.ok(Array.isArray(strata) && strata.length > 0, "strata must be a non-empty array");

    const known = projects.map((project) => project.id);
    assert.equal(new Set(known).size, known.length, "project ids must be unique");

    const placed = strata.flatMap((stratum) => stratum.projects);
    for (const id of placed) {
      assert.ok(known.includes(id), `stratum references unknown project "${id}"`);
    }
    assert.deepEqual([...placed].sort(), [...known].sort());
  });

  test(`${locale}: project copy makes no claim the repositories do not support`, () => {
    for (const project of loadContent(locale).projects) {
      const copy = JSON.stringify(project).toLowerCase();
      for (const word of BANNED_IN_PROJECT_COPY) {
        assert.ok(!copy.includes(word.toLowerCase()), `${project.id}: contains "${word}"`);
      }
    }
  });
}

/** Every run of digits in a text, with thousands separators and decimal points removed. */
function numbersIn(text: string): string[] {
  return (text.match(/\d[\d.,]*\d|\d/g) ?? []).map((run) => run.replace(/[.,]/g, ""));
}

for (const locale of LOCALES) {
  test(`${locale}: projects are named, not numbered`, () => {
    const content = loadContent(locale);
    assert.ok(content.record.project, "record.project must label a project");
    assert.ok(!("sample" in content.record), "record.sample must be gone");

    const everything = readFileSync(new URL(`./${locale}.json`, import.meta.url), "utf8");
    assert.doesNotMatch(everything, /(Sample|Muestra) ?\d/, "no numbered sample label may remain");
    for (const project of content.projects) {
      assert.ok(!("number" in project), `${project.id}: must not carry a number`);
    }
  });

  test(`${locale}: every project states a short role and every period a short name`, () => {
    const { projects, strata } = loadContent(locale);
    for (const project of projects) {
      assert.ok(typeof project.role === "string" && project.role.trim().length > 0, `${project.id}: role`);
      assert.ok(project.role.split(/\s+/).length <= 7, `${project.id}: role must stay short`);
    }
    for (const stratum of strata) {
      assert.ok(typeof stratum.short === "string" && stratum.short.trim().length > 0, `${stratum.id}: short`);
    }
  });
}

test("project facts carry the same numbers in both languages, each in its own format", () => {
  const [en, es] = LOCALES.map(loadContent);
  for (const project of en.projects) {
    const other = es.projects.find((candidate) => candidate.id === project.id);
    assert.ok(other, `${project.id}: missing in Spanish`);
    assert.deepEqual(numbersIn(other.facts.join(" ")), numbersIn(project.facts.join(" ")), `${project.id}: numbers differ`);
  }

  const facts = (content: Content) => content.projects.flatMap((project) => project.facts).join(" ");
  assert.match(facts(en), /1,180/, "English groups thousands with a comma");
  assert.match(facts(es), /1\.180/, "Spanish groups thousands with a point");
  assert.doesNotMatch(facts(en) + facts(es), /\b\d{4,}\b(?<!20\d\d)/, "no ungrouped number of four digits or more, years aside");
});

test("both languages place the same projects in the same strata, with the same links and pictures", () => {
  const [en, es] = LOCALES.map(loadContent);
  const facts = (content: Content) => ({
    strata: content.strata.map(({ id, projects }) => ({ id, projects })),
    projects: content.projects.map(({ id, links, image }) => ({
      id,
      links,
      image: { src: image.src, width: image.width, height: image.height },
    })),
  });

  assert.deepEqual(facts(es), facts(en));
});
