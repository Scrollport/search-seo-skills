import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { checkRepository, validateRepository } from "../scripts/validate.mjs";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));

function fixture({ frontmatter = true, secret = false, undeclared = false, mutateManifest } = {}) {
  const dir = mkdtempSync(join(tmpdir(), "scrollport-skill-test-"));
  const skillDir = join(dir, "skills", "fixture-skill");
  mkdirSync(skillDir, { recursive: true });
  const credential = secret ? `sp_${"live"}_${"A".repeat(24)}` : "ordinary-state";
  const dependencyLine = undeclared ? "Use `other.lookup`." : "Use `demo.lookup`.";
  writeFileSync(join(dir, "registry.json"), JSON.stringify({ schema_version: 2, repository: "https://github.com/Scrollport/web-research-extraction-skills", skills: [{ id: "fixture-skill", path: "skills/fixture-skill", status: "verified", customer_proven: false }] }));
  const manifest = {
    schema_version: 2,
    id: "fixture-skill",
    title: "Fixture Skill",
    version: "1.0.0",
    status: "verified",
    customer_proven: false,
    summary: "Fixture",
    outcome: "Fixture outcome",
    boundary: "Fixture boundary",
    category: "web-research-extraction",
    capabilities: [{ id: "web-search", tool_ids: ["demo.lookup"] }],
    license: "MIT",
    instruction_path: "SKILL.md",
    changelog_path: "CHANGELOG.md",
    dependencies: {
      scrollport_control_tools: ["search_tools", "inspect_tool", "run_tool", "get_run", "list_apps", "get_wallet"],
      catalog_tools: [{ tool_id: "demo.lookup", required: true, purpose: "Fixture lookup" }],
      connected_apps: [],
    },
    inputs: ["Input"],
    outputs: ["Output"],
    cost: { currency: "USD", model: "Per call", trial_safe_max_usd: "0.010000", notes: "Fixture" },
    approvals: ["Approve cost"],
    compatibility: ["Agent Skills host"],
    evidence: { verified_at: new Date().toISOString().slice(0, 10), review_due_at: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10), summary_path: "EVIDENCE.md", customer_proof_path: null },
  };
  mutateManifest?.(manifest);
  writeFileSync(join(skillDir, "skill.json"), JSON.stringify(manifest));
  const yaml = frontmatter ? "---\nname: fixture-skill\ndescription: Run a fixture lookup when testing independent Skill installation.\nlicense: MIT\n---\n" : "";
  writeFileSync(join(skillDir, "SKILL.md"), `${yaml}# Fixture\n\nCall search_tools, inspect_tool, run_tool, get_run, list_apps and get_wallet. ${dependencyLine}\n\nState: ${credential}\n`);
  writeFileSync(join(skillDir, "CHANGELOG.md"), "# Changelog\n");
  writeFileSync(join(skillDir, "EVIDENCE.md"), "# Evidence\n");
  return dir;
}

test("the canonical repository satisfies its publication contract", () => {
  assert.deepEqual(validateRepository(root), []);
});

test("the generated export includes the shared installation guide", () => {
  const install = readFileSync(join(root, "INSTALL.md"), "utf8");
  assert(install.includes("https://scrollport.com/start"));
  assert(install.includes("select every"));
  assert(readFileSync(join(root, "scripts", "build-exports.mjs"), "utf8").includes('join(out, "INSTALL.md")'));
});

test("runtime Skills use GitHub manifests as their only version authority", () => {
  const source = JSON.parse(readFileSync(join(root, "registry.json"), "utf8"));
  for (const entry of source.skills) {
    const instruction = readFileSync(join(root, entry.path, entry.status === "verified" ? "SKILL.md" : "DRAFT.md"), "utf8");
    assert(!instruction.includes("scrollport-version:"), `${entry.id} repeats its canonical version`);
    assert(!instruction.includes("AUTHORING.md"), `${entry.id} loads maintainer-only authoring guidance`);
  }
});

test("generated runtime packages exclude maintainer provenance", () => {
  const build = readFileSync(join(root, "scripts", "build-exports.mjs"), "utf8");
  assert(!build.includes('join(out, "AUTHORING.md")'));
  assert(!build.includes("cpSync(sourceDir, targetDir, { recursive: true })"));
  assert(build.includes('for (const runtimeDirectory of ["assets", "references", "scripts"])'));
});

test("a complete fixture Skill validates independently", () => {
  assert.deepEqual(validateRepository(fixture()), []);
});

test("malformed frontmatter is rejected", () => {
  assert(validateRepository(fixture({ frontmatter: false })).some((error) => error.includes("YAML frontmatter")));
});

test("secret-bearing instructions are rejected", () => {
  assert(validateRepository(fixture({ secret: true })).some((error) => error.includes("Scrollport credential")));
});

test("undeclared catalog dependencies are rejected", () => {
  assert(validateRepository(fixture({ undeclared: true })).some((error) => error.includes("undeclared catalog tool other.lookup")));
});

test("non-canonical Skill categories are rejected", () => {
  assert(validateRepository(fixture({ mutateManifest: (manifest) => { manifest.category = "miscellaneous"; } })).some((error) => error.includes("canonical Scrollport category")));
});

test("capabilities cannot reference undeclared catalog tools", () => {
  assert(validateRepository(fixture({ mutateManifest: (manifest) => { manifest.capabilities[0].tool_ids = ["other.lookup"]; } })).some((error) => error.includes("references undeclared catalog tool other.lookup")));
});

test("every catalog dependency must have a capability association", () => {
  assert(validateRepository(fixture({ mutateManifest: (manifest) => { manifest.capabilities[0].tool_ids = ["demo.lookup"]; manifest.dependencies.catalog_tools.push({ tool_id: "extra.lookup", required: false, purpose: "Extra lookup" }); } })).some((error) => error.includes("catalog dependency extra.lookup has no capability association")));
});

test("duplicate capability declarations are rejected", () => {
  assert(validateRepository(fixture({ mutateManifest: (manifest) => { manifest.capabilities.push({ id: "web-search", tool_ids: ["demo.lookup"] }); } })).some((error) => error.includes("duplicate capability web-search")));
});

test("build output excludes candidates", () => {
  const source = JSON.parse(readFileSync(join(root, "registry.json"), "utf8"));
  assert(!source.skills.filter((entry) => entry.status === "verified").some((entry) => entry.path.startsWith("candidates/")));
});

test("the three verified search outcomes and the Rival Watch draft are explicit in the registry", () => {
  const source = JSON.parse(readFileSync(join(root, "registry.json"), "utf8"));
  assert.deepEqual(
    source.skills.map(({ id, status, customer_proven }) => ({ id, status, customer_proven })),
    [
      { id: "seo-opportunity-map", status: "verified", customer_proven: false },
      { id: "seo-content-brief", status: "verified", customer_proven: false },
      { id: "ai-visibility-review", status: "verified", customer_proven: false },
      { id: "rival-watch", status: "draft", customer_proven: false },
    ],
  );
});

test("Rival Watch stays a private draft candidate until a verification run promotes it", () => {
  const dir = join(root, "candidates", "rival-watch");
  const manifest = JSON.parse(readFileSync(join(dir, "skill.json"), "utf8"));
  assert.equal(manifest.status, "draft");
  assert.equal(manifest.instruction_path, "DRAFT.md");
  assert.equal(manifest.evidence.verified_at, null);
  assert.throws(() => readFileSync(join(dir, "SKILL.md")), /ENOENT/);
});

test("the ChatGPT check keeps its id, names the engines it skips and makes every repeat a new paid run", () => {
  const dir = join(root, "skills", "ai-visibility-review");
  const manifest = JSON.parse(readFileSync(join(dir, "skill.json"), "utf8"));
  const instructions = readFileSync(join(dir, "SKILL.md"), "utf8");
  assert.equal(manifest.id, "ai-visibility-review");
  assert.equal(manifest.title, "ChatGPT Recommendation Check");
  assert(instructions.includes("Not checked: Google AI, Gemini, Claude, Perplexity"));
  assert(instructions.includes("--input @<file> --new"), "intentional repeats must start new paid runs");
  assert(instructions.includes("without `--new`"), "a retry after a lost response must reuse the saved run");
  assert(instructions.includes("force_web_search false"), "counted answers must not force web search");
});

test("renamed SEO Skills retain the former public ids as aliases", () => {
  const opportunity = JSON.parse(readFileSync(join(root, "skills", "seo-opportunity-map", "skill.json"), "utf8"));
  const brief = JSON.parse(readFileSync(join(root, "skills", "seo-content-brief", "skill.json"), "utf8"));
  assert(opportunity.aliases.includes("scrollport-organic-opportunity-map"));
  assert(brief.aliases.includes("scrollport-evidence-led-content-brief"));
});

test("the public package includes proof, templates and a Claude marketplace", () => {
  const plugin = JSON.parse(readFileSync(join(root, ".claude-plugin", "plugin.json"), "utf8"));
  const marketplace = JSON.parse(readFileSync(join(root, ".claude-plugin", "marketplace.json"), "utf8"));
  assert.equal(plugin.name, "search-seo-skills");
  assert.equal(plugin.version, marketplace.plugins[0].version);
  assert.equal(marketplace.plugins[0].source, "./");
  assert(/not\s+Customer-proven/.test(readFileSync(join(root, "examples", "organic-opportunity-map-verified-excerpt.md"), "utf8")));
  assert(readFileSync(join(root, "skills", "seo-opportunity-map", "assets", "opportunity-map-template.md"), "utf8").includes("Research receipt"));
  assert(readFileSync(join(root, "skills", "seo-content-brief", "assets", "content-brief-template.md"), "utf8").includes("Evidence and claim ledger"));
});

// A due date remains current through the end of that UTC day.
test("publication rejects invalid and future verification and withholds an overdue review", () => {
  const now = new Date("2026-09-07T23:59:59Z");
  for (const [verified_at, review_due_at, valid, withheld] of [
    ["2026-09-01", "2026-09-07", true, false],
    ["2026-09-01", "2026-09-06", true, true],
    ["2026-09-08", "2026-10-08", false, false],
    ["2026-09-07", "2026-09-01", false, false],
    ["2026-02-30", "2026-10-01", false, false],
  ]) {
    const dir = fixture({ mutateManifest: (manifest) => { manifest.evidence = { verified_at, review_due_at }; } });
    const result = checkRepository(dir, { now });
    assert.equal(result.errors.length === 0, valid, `${verified_at} / ${review_due_at}`);
    assert.equal(result.withheld.some((skill) => skill.id === "fixture-skill" && skill.reason === "review_overdue"), withheld, `withheld ${verified_at} / ${review_due_at}`);
  }
  const aligned = fixture({ mutateManifest: (manifest) => { manifest.category = "search-seo"; } });
  const registry = JSON.parse(readFileSync(join(aligned, "registry.json"), "utf8"));
  registry.repository = "https://github.com/Scrollport/search-seo-skills";
  writeFileSync(join(aligned, "registry.json"), JSON.stringify(registry));
  assert.deepEqual(validateRepository(aligned), []);
  registry.repository = "https://github.com/Scrollport/media-creation-skills";
  writeFileSync(join(aligned, "registry.json"), JSON.stringify(registry));
  assert(validateRepository(aligned).some((error) => error.includes("must match its owning repository")));
  assert(validateRepository(fixture({ mutateManifest: (manifest) => { manifest.category = "seo-search"; } })).length > 0);
});
