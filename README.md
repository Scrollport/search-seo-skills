# Search and SEO Skills

Know which pages to fix or write next, then get each new page briefed and
drafted, without paying for separate SEO tools.

Your AI agent does the research and the writing. Scrollport supplies live
search data through one connection and one prepaid wallet; each Skill shows its
maximum cost and waits for your yes before it spends anything.

## Start with the outcome

| If you need to... | Use | What you get |
| --- | --- | --- |
| Decide which pages to fix or write next | [Next SEO Moves](skills/seo-opportunity-map/SKILL.md) (`seo-opportunity-map`) | Your next five SEO moves: which page to fix or write, the exact edit, and why |
| Write one article that can rank | [Article Brief + Draft](skills/seo-content-brief/SKILL.md) (`seo-content-brief`) | A winnable angle for one topic, a cited brief and a first draft to edit |
| See how often ChatGPT recommends you when buyers ask, and who it names instead | [ChatGPT Recommendation Check](skills/ai-visibility-review/SKILL.md) (`ai-visibility-review`) | A one-screen scorecard from 25 buyer answers, the pages ChatGPT used and three fixes to test |

The first two work together: every new page in Next SEO Moves ends with "Brief
this page", which hands its keyword, results page and rivals to Article Brief +
Draft, so nothing is bought twice.

Install the complete package to make all three outcomes available. Native Skill
discovery selects the relevant outcome Skill for each request.

## Inspect the proof before installing

- [Latest Next SEO Moves verification](skills/seo-opportunity-map/evidence/2026-10-14-verification.md): version 5.1.1 on two public sites. A large scheduling platform tested sample cleaning, striking-distance updates and dated positions; a site that ranks for 17 phrases tested the rivals'-gap path and the new-page hand-off to Article Brief + Draft. About $0.26 a run.
- [Latest ChatGPT Recommendation Check verification](skills/ai-visibility-review/evidence/2026-10-14-verification.md): version 3.0.0 on a privacy-focused analytics product. 33 separate ChatGPT answers (25 buyer answers, 3 by name, 5 source-pass), none failed or collapsed, a scorecard with plain-English ranges and three fixes built on opened pages. Spend $0.214500.
- [Latest Article Brief + Draft verification](skills/seo-content-brief/evidence/2026-10-14-verification.md): version 4.1.0 on a US topic whose seed phrase Google reads as CPU scheduling. Ideas were filtered to the topic, the target was re-picked once, and the site search found existing pages, so the brief and a cited first draft update the site's sales-specific page instead of adding another. Spend $0.114500.

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
