# Search and SEO Skills

Know which pages to fix or write next, then get each new page briefed and
drafted, without paying for separate SEO tools.

This package is for founders and small teams who do their own marketing with an
AI agent. Scrollport supplies live search data through one connection and one
prepaid wallet; each Skill shows its maximum cost and waits for your yes before
it spends anything.

## Start with the outcome

| If you need to... | Use | What you get |
| --- | --- | --- |
| Decide which pages to fix or write next | [Next SEO Moves](skills/seo-opportunity-map/SKILL.md) (`seo-opportunity-map`) | Your next five SEO moves: which page to fix or write, the exact edit, and why |
| Write one article that can rank | [Article Brief + Draft](skills/seo-content-brief/SKILL.md) (`seo-content-brief`) | A winnable angle for one topic, a cited brief and a first draft to edit |
| Understand how ChatGPT describes a business for buyer questions | [`ai-visibility-review`](skills/ai-visibility-review/SKILL.md) | Repeated answer/citation baseline and specific page changes to test |

The first two work together: every new page in Next SEO Moves ends with "Brief
this page", which hands its keyword, results page and rivals to Article Brief +
Draft, so nothing is bought twice.

Install the complete package to make all three outcomes available. Native Skill
discovery selects the relevant outcome Skill for each request.

## Inspect the proof before installing

- [Latest Next SEO Moves verification](skills/seo-opportunity-map/evidence/2026-10-12-reverification.md): run on version 4.0.1, then called Organic Opportunity Map. Two existing-page updates and one hold for a software business, each checked against live results and the pages involved. Version 5.1.0 changes the result format and adds checks; its own verification evidence is pending.
- [Latest AI Visibility Review verification](skills/ai-visibility-review/evidence/2026-10-12-reverification.md): a complete nine-answer ChatGPT panel, separate branded and unbranded coding, and two inspected page actions.
- [Latest Article Brief + Draft verification](skills/seo-content-brief/evidence/2026-10-12-reverification.md): run on version 3.0.1, which produced a brief only. A UK brief whose topic was chosen for reader fit over volume, with every claim tied to a source and an outline mapped to those sources. Version 4.1.0 adds phrase expansion, today's results, a ChatGPT check and the first draft; its own verification evidence is pending.

Earlier public synthetic examples from August 2026 remain available for
context. They show the older result formats:

- [Next SEO Moves, August 2026 excerpt](examples/organic-opportunity-map-verified-excerpt.md)
  shows the accepted decision, evidence labels, cost and sampling limit from
  the public synthetic rehearsal.
- [Article Brief + Draft, August 2026 excerpt](examples/evidence-led-content-brief-verified-excerpt.md)
  shows the accepted topic choice, source roles, outline shape and cost from
  the public synthetic rehearsal.

These examples prove bounded execution on public synthetic inputs. They do not
claim customer demand, rankings or Customer-proven status.

## Why this package is different

- **The answer first:** each result opens with what to do next; sources, costs
  and limits sit in a Details section at the end.
- **Live data you can check:** every number says where and when it was seen,
  and a missing number reads "too small to measure", never 0.
- **Cost approved up front:** each Skill works out its maximum from today's
  prices and waits for your yes; default runs cost cents.
- **No double charges:** a retry reads or reuses the original run instead of
  paying again.
- **Honest scope:** no ranking or traffic promises, full audits, publishing or
  continuous monitoring.

## Install

Give your agent the package setup prompt from Scrollport to install every
published outcome Skill.

Or add the repository as a Claude Code marketplace and install the package:

```text
/plugin marketplace add Scrollport/search-seo-skills
/plugin install search-seo-skills@scrollport-search-seo
```

For commit-pinned installation, readiness checks and approval boundaries, read
[INSTALL.md](INSTALL.md).

## Bundle decisions

[ICP and jobs](docs/ICP-AND-JOBS.md) records the customer, job ranking, current
coverage and evidence gates that determine what belongs here. Keyword clustering,
page mapping, page refresh diagnosis, AI visibility and link-gap work are not
added merely because tools exist; each needs an independently valuable artifact
and an accepted complete rehearsal first.

## Contribute

Published Skills live under `skills/`; unverified work belongs under
`candidates/`. Read [the authoring contract](docs/AUTHORING.md),
[contribution guide](CONTRIBUTING.md) and [security policy](SECURITY.md).

The category repository was renamed from `seo-search-skills` to
`search-seo-skills`; GitHub keeps existing repository links working. Outcome
Skill ids are unchanged. When updating an older Claude plugin installation,
replace its old marketplace/plugin registration with the renamed package so
that the same outcome Skills are not installed twice.
