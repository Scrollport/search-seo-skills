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

test("Rival Watch reports only what its tools return: top 10 positions and whole sitemaps", () => {
  const draft = readFileSync(join(root, "candidates", "rival-watch", "DRAFT.md"), "utf8");
  assert(!/top 20|num 20/.test(draft), "searches return the top 10 only");
  assert(draft.includes("100,000 characters"), "a cut-off sitemap must fall back to the site-map tool");
});

test("the ChatGPT check keeps its id, scope, honest run time and repeat rules", () => {
  const dir = join(root, "skills", "ai-visibility-review");
  const manifest = JSON.parse(readFileSync(join(dir, "skill.json"), "utf8"));
  const instructions = readFileSync(join(dir, "SKILL.md"), "utf8");
  assert.equal(manifest.id, "ai-visibility-review");
  assert.equal(manifest.title, "ChatGPT Recommendation Check");
  assert(instructions.includes("Not checked: Google AI, Gemini, Claude, Perplexity"));
  assert(instructions.includes("20–30 minutes") && !instructions.includes("5–15 minutes"), "state the verified run time");
  assert(instructions.includes("listed first"), "the scorecard reports how often the brand is listed first");
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
  const moves = readFileSync(join(root, "skills", "seo-opportunity-map", "assets", "opportunity-map-template.md"), "utf8");
  assert(moves.startsWith("# Your next 5 SEO moves"), "Next SEO Moves opens with the numbered moves");
  assert(moves.includes("[Brief this page]"), "new-page moves hand off to the brief");
  assert(moves.indexOf("Held:") < moves.indexOf("## Details"), "the held list comes before Details");
  assert(moves.slice(moves.indexOf("## Details")).includes("### Costs and runs"), "run ids and costs live in Details");
  const brief = readFileSync(join(root, "skills", "seo-content-brief", "assets", "content-brief-template.md"), "utf8");
  assert(brief.startsWith("# Brief:"), "Article Brief + Draft opens with the brief");
  assert(brief.indexOf("Angle:") < brief.indexOf("[Draft it now]"), "the angle leads and drafting is the next step");
  assert(brief.indexOf("## First draft") < brief.indexOf("## Details"), "the draft comes before Details");
  assert(brief.slice(brief.indexOf("## Details")).includes("### Costs and runs"), "run ids and costs live in Details");
});

test("Next SEO Moves and Article Brief + Draft lead with the result in plain words", () => {
  const banned = ["page ownership", "page-action queue", "research receipt", "ledger", "evidence-led", "measurement plan"];
  const expected = {
    "seo-opportunity-map": {
      title: "Next SEO Moves",
      outcome: "Your next five SEO moves: which page to fix or write, the exact edit, and why.",
      template: "opportunity-map-template.md",
    },
    "seo-content-brief": {
      title: "Article Brief + Draft",
      outcome: "Pick a winnable angle for one topic, then get a cited brief and a first draft to edit.",
      template: "content-brief-template.md",
    },
  };
  for (const [id, { title, outcome, template }] of Object.entries(expected)) {
    const manifest = JSON.parse(readFileSync(join(root, "skills", id, "skill.json"), "utf8"));
    const instructions = readFileSync(join(root, "skills", id, "SKILL.md"), "utf8").replace(/\s+/g, " ");
    const result = readFileSync(join(root, "skills", id, "assets", template), "utf8");
    assert(result.includes("## Details"), `${id} keeps proof in a Details appendix`);
    const firstScreen = result.slice(0, result.indexOf("## Details")).toLowerCase();
    const customerText = [manifest.title, manifest.summary, manifest.outcome, manifest.boundary, ...manifest.inputs, ...manifest.outputs, ...manifest.approvals].join(" ").toLowerCase();
    assert.equal(manifest.title, title);
    assert.equal(manifest.outcome, outcome);
    assert(instructions.includes(`**Promise:** ${outcome}`), `${id} states its promise`);
    assert(manifest.inputs.length <= 5 && manifest.outputs.length <= 5, `${id} keeps inputs and outputs to five`);
    // The Skills serve anyone doing their own SEO, so the summary names no audience (18 Oct 2026).
    assert(!/seo agenc|founders and small teams/i.test(manifest.summary), `${id} summary names an audience`);
    for (const term of banned) {
      assert(!customerText.includes(term), `${id} manifest says "${term}"`);
      assert(!firstScreen.includes(term), `${id} result says "${term}" before Details`);
    }
    assert(instructions.includes("too small to measure"), `${id} never prints missing volume as 0`);
    assert(instructions.includes("without `--new`") && instructions.includes("idempotency_key"), `${id} retries without a second charge`);
    assert(instructions.includes("scrollport-brief-plan"), `${id} shares the Brief this page plan file`);
  }
});

test("fixes from the paid verification runs stay in place", () => {
  const moves = readFileSync(join(root, "skills", "seo-opportunity-map", "SKILL.md"), "utf8").replace(/\s+/g, " ");
  const movesResult = readFileSync(join(root, "skills", "seo-opportunity-map", "assets", "opportunity-map-template.md"), "utf8");
  const brief = readFileSync(join(root, "skills", "seo-content-brief", "SKILL.md"), "utf8").replace(/\s+/g, " ");
  assert(moves.includes("about 10–15 minutes") && !moves.includes("under 10 minutes"), "Next SEO Moves states an honest time");
  assert(moves.includes("pages made by the site's users") && moves.includes("other brands' navigational searches"), "samples drop users' pages and other brands' searches");
  assert(moves.includes("with its data date"), "sample positions that today's results page does not confirm carry their data date");
  assert(moves.includes("at least two CREATE candidates"), "the shortlist keeps two new-page candidates");
  assert(!movesResult.slice(movesResult.indexOf("## Details")).includes("### Sources"), "Details does not repeat the moves table as a sources list");
  assert(brief.includes("research about 3 minutes") && brief.includes("6–8 minutes"), "Article Brief + Draft states an honest time");
  assert(!brief.includes("search_volume,desc") && brief.includes("key terms"), "keyword ideas are not sorted by volume and keep the seed's key terms");
  assert(brief.includes("Check for a page you already have"), "the brief checks for an existing page before briefing");
  assert(brief.includes("Re-pick only once"), "the target can be re-picked once after reading the results page");
  assert(moves.includes("whether it is one of the five or held") && moves.includes("[Brief this page] after its reason in the Held line"), "held new-page topics keep their plan file and hand-off");
  assert(moves.includes("drop that CREATE only when today's results page shows a different page type wins"), "a new page stays in the five unless another page type wins");
  assert(movesResult.includes("Held: {topic} ({reason}) [Brief this page]"), "the result template shows the hand-off on held new pages");
  assert(brief.includes("update the one closest to the reader and recommend linking the others to it"), "with several existing pages, the brief updates the closest and links the rest");
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
