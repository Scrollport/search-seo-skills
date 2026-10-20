import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

test("AEO report validates evidence, coverage, comparisons and safe private exports", () => {
  execFileSync("python3", ["-B", "-m", "unittest", "discover", "-s", "tests", "-p", "aeo_report_test.py"], {
    cwd: root, encoding: "utf8", env: { ...process.env, PYTHONDONTWRITEBYTECODE: "1" },
  });
});

test("pending AEO revision cannot replace or enter the verified export", () => {
  execFileSync(process.execPath, ["scripts/build-exports.mjs"], { cwd: root });
  const exported = JSON.parse(readFileSync(new URL("../dist/registry.json", import.meta.url)));
  const current = exported.skills.filter((skill) => skill.id === "ai-visibility-review");
  assert.equal(current.length, 1);
  assert.equal(current[0].version, "3.0.0");
  assert(!current[0].dependencies.catalog_tools.some((tool) => tool.tool_id.startsWith("cloro.")));
  assert(!readFileSync(new URL("../dist/skills/ai-visibility-review/SKILL.md", import.meta.url), "utf8").includes("cloro.gemini-search"));
});
