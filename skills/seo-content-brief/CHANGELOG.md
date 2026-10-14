# Changelog

## 4.0.0 — 2026-10-14

- Rename the Skill to Article Brief + Draft (id unchanged) with the promise
  "Pick a winnable angle for one topic, then get a cited brief and a first
  draft to edit."
- Expand the topic into real search phrases with `dataforseo.keyword-ideas`
  (up to 50) before the 20-phrase overview. When no phrase has volume, offer
  one `dataforseo.google-ads-search-volume` check after a separate yes, and
  label anything still empty "too small to measure, not zero".
- Read today's results: the top 10 and whether an AI Overview shows
  (`dataforseo.google-serp-organic`), related questions
  (`serper.google-search`), the top three pages (`brightdata.web-scrape`,
  with `firecrawl.web-scrape` as a backup reader) and one ChatGPT answer with
  the sources it cites (`dataforseo.chatgpt-search`).
- Research rules: two searches, up to 10 sources, at most 2 per publisher and
  at least 1 primary source; ask the user for first-party data and examples.
- Lead with the angle, the headings and what each must prove with its source,
  the questions to answer and "only you can add"; no target word counts.
  Sources, run ids, costs and limits move to a Details appendix.
- Add "Draft it now" as the default next step: a first draft with inline
  citations, placeholders for the user's own examples and a meta title,
  labelled for human editing, with a 28-day Search Console re-check.
- Accept the plan file from Next SEO Moves and reuse its keyword, results page
  and page reads.
- New defaults: up to 50 ideas from one seed, a 20-phrase overview, one
  results page plus three page reads, one ChatGPT answer and two searches of
  five sources. Maximum $0.104200 at 14 October 2026 prices plus the optional
  $0.126000 demand check; above $0.15 needs a new approval.
- Retries reuse the original run: `get_run`, or the identical CLI command
  without `--new` (MCP/HTTP: the same idempotency key). Drop the unused
  `list_apps` control dependency.
- The 12 October 2026 evidence verified version 3.0.1; this version awaits its
  own paid verification run.

## 3.0.1 — 2026-10-12

- Request the keyword overview's opt-in SERP summary and record its snapshot
  date, so the brief keeps the SERP context it promises.
- Estimate the keyword overview from its per-keyword charge, not the base price
  alone.
- Reverify the same two-tool route with a public UK rehearsal using these
  settings.

## 2.1.0 — 2026-08-31

- Add context-first intake and discriminating activation phrases.
- Add a reusable writer-ready brief template and handoff quality checks.
- Keep the verified tool route, cost ceiling and rehearsal evidence unchanged.

## 2.0.0 — 2026-08-31

- Move the canonical package into the SEO and search category repository.
- Rename the Skill id to `seo-content-brief` and retain the former public id as
  an alias.
- Keep the verified workflow, approval boundaries and evidence contract
  unchanged.

> Historical through 28 August 2026. Git history and GitHub releases are the
> canonical change record from version 1.1.0 onward.

## 1.1.0 — 2026-08-28

- Remove maintainer-only authoring guidance and redundant version metadata from
  the runtime package.

## 1.0.1 — 2026-08-28

- Adopt the shared Scrollport outcome category and capability-to-tool contract.
- Combine the public summary into one concise description.

## 1.0.0 — 2026-08-27

- Publish the first verified Evidence-led Content Brief workflow.
- Bound trial research to five topics and five current public sources.
- Require a claim ledger that distinguishes provider evidence, source role and
  editorial judgement.
