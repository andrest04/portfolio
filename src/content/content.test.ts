import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

function load(name: string): Json {
  return JSON.parse(readFileSync(new URL(name, import.meta.url), "utf8")) as Json;
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

test("en.json and es.json have the same keys, array lengths, and value types", () => {
  assert.deepEqual(shape(load("./es.json")), shape(load("./en.json")));
});
